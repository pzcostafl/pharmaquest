// Conta e sincronização com o Supabase (offline-first).
// O progresso continua salvo no aparelho; quando há conta e internet, é mesclado com a nuvem.
import { useSyncExternalStore } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { getEstado, ouvirAlteracoes, perfilAtualIdAtual, substituirEstado, vincularConta, type Estado, type ItemStat } from './progresso';
import { aoSalvarConteudo, salvarConteudoAdmin, type ConteudoAdmin } from './conteudo';
import { avisar } from '../components/ui';
import { invalidarBanco } from '../data/banco';

export type StatusSync = 'local' | 'desconectado' | 'sincronizando' | 'sincronizado' | 'pendente' | 'erro';

interface Conta {
  sessao: Session | null;
  nome: string;
  papel: 'estudante' | 'admin' | null;
  status: StatusSync;
  ultimaSync: number | null;
  erro?: string;
}

let conta: Conta = { sessao: null, nome: '', papel: null, status: supabase ? 'desconectado' : 'local', ultimaSync: null };
const ouv = new Set<() => void>();
function set(p: Partial<Conta>) {
  conta = { ...conta, ...p };
  ouv.forEach((f) => f());
}
export function useConta(): Conta {
  return useSyncExternalStore((f) => { ouv.add(f); return () => ouv.delete(f); }, () => conta);
}
export const getConta = () => conta;
export const ehAdminNuvem = () => conta.papel === 'admin';

// ---------------- mesclagem de progresso ----------------
const maisRecente = (a: ItemStat, b: ItemStat) => (b.ultimaData > a.ultimaData ? b : a);
const uniao = <T,>(a: T[], b: T[]) => [...new Set([...a, ...b])];

/** Mescla dois estados sem perder progresso de nenhum aparelho. */
export function mesclar(a: Estado, b: Estado): Estado {
  const r: Estado = structuredClone(a.atualizadoEm >= b.atualizadoEm ? a : b);
  const outro = r === a ? b : a;
  for (const [k, it] of Object.entries(outro.itens)) r.itens[k] = r.itens[k] ? maisRecente(r.itens[k], it) : it;
  for (const [k, cs] of Object.entries(outro.concluidos)) r.concluidos[k] = uniao(r.concluidos[k] ?? [], cs);
  for (const [k, v] of Object.entries(outro.ciclos)) r.ciclos[k] = Math.max(r.ciclos[k] ?? 0, v);
  for (const obj of ['gruposConcluidos', 'conquistas'] as const) for (const [k, v] of Object.entries(outro[obj])) r[obj][k] = Math.min(r[obj][k] ?? Infinity, v);
  for (const obj of ['bonusPasta', 'bonusMed'] as const) for (const k of Object.keys(outro[obj])) r[obj][k] = true;
  r.favoritos = uniao(r.favoritos, outro.favoritos);
  r.salvas = uniao(r.salvas, outro.salvas);
  r.offline = uniao(r.offline, outro.offline);
  const hist = new Map([...a.historico, ...b.historico].map((h) => [`${h.ts}|${h.chave}`, h]));
  r.historico = [...hist.values()].sort((x, y) => x.ts - y.ts).slice(-5000);
  const sims = new Map([...a.simulados, ...b.simulados].map((s) => [`${s.ts}|${s.grupoId}`, s]));
  r.simulados = [...sims.values()].sort((x, y) => x.ts - y.ts);
  const des = new Map([...(a.desafios ?? []), ...(b.desafios ?? [])].map((d) => [d.ts, d]));
  r.desafios = [...des.values()].sort((x, y) => x.ts - y.ts);
  r.pontos = Math.max(a.pontos, b.pontos);
  r.melhorSequencia = Math.max(a.melhorSequencia, b.melhorSequencia);
  r.revisoesRapidas = Math.max(a.revisoesRapidas, b.revisoesRapidas);
  r.atualizadoEm = Math.max(a.atualizadoEm, b.atualizadoEm);
  return r;
}

// ---------------- progresso ----------------
let timer: ReturnType<typeof setTimeout> | null = null;
const K_PENDENTE = 'pq:sync-pendente';

async function enviarProgresso() {
  if (!supabase || !conta.sessao || perfilAtualIdAtual() !== conta.sessao.user.id) return;
  if (!navigator.onLine) { set({ status: 'pendente' }); localStorage.setItem(K_PENDENTE, '1'); return; }
  set({ status: 'sincronizando' });
  const { error } = await supabase.from('progresso').upsert({ user_id: conta.sessao.user.id, estado: getEstado(), atualizado_em: new Date().toISOString() });
  if (error) { set({ status: 'erro', erro: error.message }); localStorage.setItem(K_PENDENTE, '1'); return; }
  localStorage.removeItem(K_PENDENTE);
  set({ status: 'sincronizado', ultimaSync: Date.now(), erro: undefined });
}

export async function sincronizarAgora() {
  if (!supabase || !conta.sessao) return;
  if (!navigator.onLine) { set({ status: 'pendente' }); return; }
  set({ status: 'sincronizando' });
  const { data, error } = await supabase.from('progresso').select('estado').eq('user_id', conta.sessao.user.id).maybeSingle();
  if (error) { set({ status: 'erro', erro: error.message }); return; }
  if (data?.estado) substituirEstado(mesclar(getEstado(), data.estado as Estado));
  await enviarProgresso();
  await baixarConteudo();
}

// ---------------- conteúdo (painel administrativo) ----------------
export async function baixarConteudo() {
  if (!supabase) return;
  const { data } = await supabase.from('conteudo').select('dados').eq('id', 'global').maybeSingle();
  if (data?.dados) {
    salvarConteudoAdmin(data.dados as ConteudoAdmin, false);
    invalidarBanco();
  }
}

/** Envia o conteúdo editado pelo admin à nuvem (a RLS recusa se a conta não for admin). */
async function enviarConteudo(c: ConteudoAdmin) {
  if (!supabase || !conta.sessao) return;
  if (conta.papel !== 'admin') { avisar('Edição salva só neste aparelho', 'Sua conta não é administradora no servidor.', 'alerta'); return; }
  const { error } = await supabase.from('conteudo').update({ dados: c, atualizado_por: conta.sessao.user.id, atualizado_em: new Date().toISOString() }).eq('id', 'global');
  if (error) { avisar('Falha ao salvar no servidor', error.message, 'alerta'); return; }
  await supabase.from('conteudo_historico').insert({ acao: 'conteúdo atualizado' });
}

/** Progresso de todos os estudantes (somente admin, garantido pela RLS). */
export async function progressoDeTodos(): Promise<{ id: string; nome: string; estado: Estado }[] | null> {
  if (!supabase || conta.papel !== 'admin') return null;
  const [{ data: perfis }, { data: prog }] = await Promise.all([
    supabase.from('perfis').select('id, nome'),
    supabase.from('progresso').select('user_id, estado'),
  ]);
  if (!perfis || !prog) return [];
  return prog.map((p) => ({ id: p.user_id, nome: perfis.find((x) => x.id === p.user_id)?.nome ?? '—', estado: p.estado as Estado }));
}

// ---------------- autenticação ----------------
async function aoEntrar(sessao: Session) {
  const { data: perfil } = await supabase!.from('perfis').select('nome, papel').eq('id', sessao.user.id).maybeSingle();
  const nome = perfil?.nome || (sessao.user.user_metadata?.nome as string) || sessao.user.email?.split('@')[0] || 'Estudante';
  set({ sessao, nome, papel: (perfil?.papel as Conta['papel']) ?? 'estudante' });
  vincularConta(sessao.user.id, nome);
  await sincronizarAgora();
}

export async function entrar(email: string, senha: string) {
  const { error } = await supabase!.auth.signInWithPassword({ email, password: senha });
  return error ? traduzir(error.message) : null;
}
export async function cadastrar(nome: string, email: string, senha: string) {
  const { data, error } = await supabase!.auth.signUp({ email, password: senha, options: { data: { nome } } });
  if (error) return { erro: traduzir(error.message), confirmar: false };
  return { erro: null, confirmar: !data.session };
}
export async function recuperarSenha(email: string) {
  const { error } = await supabase!.auth.resetPasswordForEmail(email, { redirectTo: location.origin + location.pathname });
  return error ? traduzir(error.message) : null;
}
export async function sair() {
  await enviarProgresso();
  await supabase?.auth.signOut();
  set({ sessao: null, papel: null, nome: '', status: 'desconectado' });
}

function traduzir(m: string) {
  if (/invalid login/i.test(m)) return 'E-mail ou senha incorretos.';
  if (/already registered/i.test(m)) return 'Este e-mail já tem conta. Use “Entrar”.';
  if (/at least 6/i.test(m)) return 'A senha precisa ter pelo menos 6 caracteres.';
  if (/email not confirmed/i.test(m)) return 'Confirme o e-mail pelo link enviado antes de entrar.';
  if (/rate limit/i.test(m)) return 'Muitas tentativas. Aguarde alguns minutos.';
  if (/failed to fetch|network|load failed|fetch/i.test(m)) return 'Sem conexão com o servidor. Verifique a internet — enquanto isso, você pode estudar normalmente; o progresso fica salvo neste aparelho.';
  return m;
}

/** Inicializa: restaura a sessão, escuta login/logout e envia alterações com atraso de 2 s. */
export function iniciarNuvem() {
  if (!supabase) return;
  aoSalvarConteudo(enviarConteudo);
  supabase.auth.getSession().then(({ data }) => { if (data.session) aoEntrar(data.session); else baixarConteudo(); });
  supabase.auth.onAuthStateChange((ev, sessao) => {
    if (ev === 'SIGNED_IN' && sessao && sessao.user.id !== conta.sessao?.user.id) aoEntrar(sessao);
    if (ev === 'TOKEN_REFRESHED' && sessao) set({ sessao });
    if (ev === 'SIGNED_OUT') set({ sessao: null, papel: null, status: 'desconectado' });
  });
  ouvirAlteracoes(() => {
    if (!conta.sessao) return;
    set({ status: 'pendente' });
    if (timer) clearTimeout(timer);
    timer = setTimeout(enviarProgresso, 2000);
  });
  addEventListener('online', () => { if (conta.sessao) sincronizarAgora(); });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && conta.sessao && conta.status === 'pendente') enviarProgresso(); });
}
