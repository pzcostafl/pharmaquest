// Estado persistente do estudante (por perfil), salvo no armazenamento local do navegador.
import { useSyncExternalStore } from 'react';
import type { Fase, Formato, Resultado } from './questoes';
import { chaveItem, FASES, parseChave } from './questoes';

export type Modo = 'mc' | 'dis' | 'misto';
export type Tema = 'claro' | 'escuro' | 'sistema';

export interface SRS {
  repeticoes: number;
  intervalo: number; // dias
  facilidade: number;
  proxima: number; // timestamp
}

export interface ItemStat {
  tentativas: number;
  acertos: number;
  parciais: number;
  erros: number;
  ultimo: Resultado;
  primeiro: Resultado;
  ultimaData: number;
  srs: SRS;
}

export interface EventoHist {
  ts: number;
  chave: string;
  resultado: Resultado;
  formato: Formato;
  pontos: number;
  origem: 'estudo' | 'revisao' | 'simulado' | 'erradas';
}

export interface Perfil {
  id: string;
  nome: string;
  criadoEm: number;
}

export interface Estado {
  versao: 1;
  modo: Modo;
  modoEscolhido: boolean;
  pontos: number;
  itens: Record<string, ItemStat>;
  /** conclusões de medicamento por grupo e ciclo: "grupo|med" -> ciclos concluídos */
  concluidos: Record<string, number[]>;
  /** ciclo atual de cada grupo (reiniciar incrementa e preserva o histórico) */
  ciclos: Record<string, number>;
  /** posição para "continuar de onde parou" */
  posicao: Record<string, { medId: string; fase: Fase | 'ficha' }>;
  /** medicamentos com erro no ciclo atual de estudo (para a sequência sem erros) */
  erroNoMed: Record<string, boolean>;
  sequenciaSemErro: number;
  melhorSequencia: number;
  gruposConcluidos: Record<string, number>;
  bonusPasta: Record<string, boolean>;
  bonusMed: Record<string, boolean>;
  historico: EventoHist[];
  favoritos: string[]; // medIds
  salvas: string[]; // chaves de questão
  conquistas: Record<string, number>;
  simulados: { ts: number; grupoId: string; acertos: number; total: number }[];
  revisoesRapidas: number;
  offline: string[]; // grupos baixados
}

const novoEstado = (): Estado => ({
  versao: 1, modo: 'mc', modoEscolhido: false, pontos: 0, itens: {}, concluidos: {}, ciclos: {}, posicao: {},
  erroNoMed: {}, sequenciaSemErro: 0, melhorSequencia: 0, gruposConcluidos: {}, bonusPasta: {}, bonusMed: {},
  historico: [], favoritos: [], salvas: [], conquistas: {}, simulados: [], revisoesRapidas: 0, offline: [],
});

// ---------------- perfis ----------------
const K_PERFIS = 'pq:perfis';
const K_ATUAL = 'pq:perfil-atual';
const kEstado = (id: string) => `pq:estado:${id}`;

function ler<T>(k: string, def: T): T {
  try {
    const r = localStorage.getItem(k);
    return r ? (JSON.parse(r) as T) : def;
  } catch {
    return def;
  }
}
function gravar(k: string, v: unknown) {
  try {
    localStorage.setItem(k, JSON.stringify(v));
    return true;
  } catch {
    return false;
  }
}

export const listarPerfis = () => ler<Perfil[]>(K_PERFIS, []);
export function criarPerfil(nome: string): Perfil {
  const p: Perfil = { id: Math.random().toString(36).slice(2, 10), nome: nome.trim(), criadoEm: Date.now() };
  gravar(K_PERFIS, [...listarPerfis(), p]);
  trocarPerfil(p.id);
  return p;
}
export function trocarPerfil(id: string) {
  gravar(K_ATUAL, id);
  perfilAtualId = id;
  estado = { ...novoEstado(), ...ler<Partial<Estado>>(kEstado(id), {}) };
  emitir();
}
export function excluirPerfil(id: string) {
  gravar(K_PERFIS, listarPerfis().filter((p) => p.id !== id));
  try { localStorage.removeItem(kEstado(id)); } catch { /* */ }
  if (perfilAtualId === id) {
    const outro = listarPerfis()[0];
    if (outro) trocarPerfil(outro.id);
    else { perfilAtualId = null; estado = novoEstado(); gravar(K_ATUAL, null); emitir(); }
  }
}
export const perfilAtual = () => listarPerfis().find((p) => p.id === perfilAtualId) ?? null;
/** estado salvo de qualquer perfil (para o desempenho agregado no painel admin) */
export const estadoDoPerfil = (id: string): Estado => ({ ...novoEstado(), ...ler<Partial<Estado>>(kEstado(id), {}) });

// ---------------- store ----------------
let perfilAtualId: string | null = ler<string | null>(K_ATUAL, null);
let estado: Estado = perfilAtualId ? { ...novoEstado(), ...ler<Partial<Estado>>(kEstado(perfilAtualId), {}) } : novoEstado();
let falhaGravacao = false;
const ouvintes = new Set<() => void>();
function emitir() { ouvintes.forEach((f) => f()); }

export function atualizar(fn: (e: Estado) => void) {
  const novo = structuredClone(estado);
  fn(novo);
  estado = novo;
  if (perfilAtualId) falhaGravacao = !gravar(kEstado(perfilAtualId), estado);
  emitir();
}
export const getEstado = () => estado;
export const houveFalhaGravacao = () => falhaGravacao;
export function useEstado(): Estado {
  return useSyncExternalStore((f) => { ouvintes.add(f); return () => ouvintes.delete(f); }, () => estado);
}
export function usePerfil() {
  useEstado();
  return perfilAtual();
}

// ---------------- repetição espaçada (SM-2 simplificado) ----------------
const DIA = 86_400_000;
function proximoSRS(s: SRS | undefined, r: Resultado, agora: number): SRS {
  const q = r === 'certo' ? 5 : r === 'parcial' ? 3 : 1;
  const atual = s ?? { repeticoes: 0, intervalo: 0, facilidade: 2.5, proxima: agora };
  let { repeticoes, intervalo, facilidade } = atual;
  facilidade = Math.max(1.3, facilidade + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
  if (q < 3) { repeticoes = 0; intervalo = 0; }
  else {
    repeticoes += 1;
    intervalo = repeticoes === 1 ? 1 : repeticoes === 2 ? 3 : Math.round(intervalo * facilidade);
    if (q === 3) intervalo = Math.max(1, Math.round(intervalo / 2));
  }
  // errado: volta em 10 minutos
  const proxima = intervalo === 0 ? agora + 10 * 60_000 : agora + intervalo * DIA;
  return { repeticoes, intervalo, facilidade, proxima };
}

export const PONTOS = { certo: 100, parcialMax: 50, med: 50, pasta: 500 };

/** Registra uma resposta. Retorna os pontos ganhos. Pontos só na primeira tentativa do item. */
export function registrarResposta(chave: string, resultado: Resultado, fracao: number, formato: Formato, origem: EventoHist['origem']): number {
  let ganhos = 0;
  atualizar((e) => {
    const agora = Date.now();
    const it = e.itens[chave];
    if (!it) {
      ganhos = resultado === 'certo' ? PONTOS.certo : resultado === 'parcial' ? Math.round(PONTOS.parcialMax * Math.min(1, fracao / 0.5)) : 0;
      if (origem === 'simulado') ganhos = 0;
    }
    const base: ItemStat = it ?? { tentativas: 0, acertos: 0, parciais: 0, erros: 0, ultimo: resultado, primeiro: resultado, ultimaData: agora, srs: undefined as unknown as SRS };
    base.tentativas++;
    if (resultado === 'certo') base.acertos++;
    else if (resultado === 'parcial') base.parciais++;
    else base.erros++;
    base.ultimo = resultado;
    base.ultimaData = agora;
    base.srs = proximoSRS(it?.srs, resultado, agora);
    e.itens[chave] = base;
    e.pontos += ganhos;
    e.historico.push({ ts: agora, chave, resultado, formato, pontos: ganhos, origem });
    if (e.historico.length > 5000) e.historico = e.historico.slice(-5000);
    if (origem === 'estudo' && resultado !== 'certo') {
      const { grupoId, medId } = parseChave(chave);
      e.erroNoMed[`${grupoId}|${medId}`] = true;
    }
  });
  return ganhos;
}

export const cicloDe = (e: Estado, g: string) => e.ciclos[g] ?? 0;
export const medConcluido = (e: Estado, g: string, m: string) => (e.concluidos[`${g}|${m}`] ?? []).includes(cicloDe(e, g));
export const medConcluidoAlgumaVez = (e: Estado, g: string, m: string) => (e.concluidos[`${g}|${m}`] ?? []).length > 0;

/** Marca o medicamento como concluído (após as fases 1, 2, 3A e 3B). Retorna bônus ganhos. */
export function concluirMedicamento(g: string, medId: string, todosDoGrupo: string[]): { bonusMed: number; bonusPasta: number; pastaConcluida: boolean } {
  const r = { bonusMed: 0, bonusPasta: 0, pastaConcluida: false };
  atualizar((e) => {
    const k = `${g}|${medId}`;
    const c = cicloDe(e, g);
    const lista = e.concluidos[k] ?? [];
    if (!lista.includes(c)) lista.push(c);
    e.concluidos[k] = lista;
    if (!e.bonusMed[k]) { e.bonusMed[k] = true; e.pontos += PONTOS.med; r.bonusMed = PONTOS.med; }
    // sequência de medicamentos sem erro
    if (e.erroNoMed[k]) e.sequenciaSemErro = 0;
    else e.sequenciaSemErro++;
    e.melhorSequencia = Math.max(e.melhorSequencia, e.sequenciaSemErro);
    delete e.erroNoMed[k];
    const todos = todosDoGrupo.every((m) => (e.concluidos[`${g}|${m}`] ?? []).includes(c));
    if (todos) {
      r.pastaConcluida = true;
      if (!e.gruposConcluidos[g]) e.gruposConcluidos[g] = Date.now();
      if (!e.bonusPasta[g]) { e.bonusPasta[g] = true; e.pontos += PONTOS.pasta; r.bonusPasta = PONTOS.pasta; }
    }
  });
  return r;
}

/** Reinicia o grupo: novo ciclo, sem apagar histórico, estatísticas nem o resumo desbloqueado. */
export function reiniciarGrupo(g: string) {
  atualizar((e) => {
    e.ciclos[g] = cicloDe(e, g) + 1;
    delete e.posicao[g];
  });
}

export function salvarPosicao(g: string, medId: string, fase: Fase | 'ficha') {
  atualizar((e) => { e.posicao[g] = { medId, fase }; });
}

export function alternarFavorito(medId: string) {
  atualizar((e) => {
    e.favoritos = e.favoritos.includes(medId) ? e.favoritos.filter((x) => x !== medId) : [...e.favoritos, medId];
  });
}
export function alternarSalva(chave: string) {
  atualizar((e) => {
    e.salvas = e.salvas.includes(chave) ? e.salvas.filter((x) => x !== chave) : [...e.salvas, chave];
  });
}

// ---------------- domínio do conhecimento ----------------
/** 0..1 — combina acurácia acumulada, último resultado e estabilidade da memória (SRS). */
export function dominioItem(it: ItemStat | undefined): number {
  if (!it) return 0;
  const acc = (it.acertos + 0.5 * it.parciais) / it.tentativas;
  const ult = it.ultimo === 'certo' ? 1 : it.ultimo === 'parcial' ? 0.5 : 0;
  const estab = Math.min(1, it.srs.repeticoes / 3);
  return 0.45 * acc + 0.35 * ult + 0.2 * estab;
}

export function dominioGrupo(e: Estado, g: string, medIds: string[]): number {
  if (!medIds.length) return 0;
  let s = 0;
  for (const m of medIds) for (const f of FASES) s += dominioItem(e.itens[chaveItem(g, m, f)]);
  return s / (medIds.length * FASES.length);
}

export function nivelDominio(d: number, iniciado: boolean): string {
  if (!iniciado) return 'Não iniciado';
  if (d < 0.25) return 'Iniciante';
  if (d < 0.5) return 'Aprendiz';
  if (d < 0.75) return 'Proficiente';
  if (d < 0.9) return 'Avançado';
  return 'Especialista';
}

export function statsGrupo(e: Estado, g: string, medIds: string[]) {
  let acertos = 0, erros = 0, parciais = 0;
  for (const m of medIds) for (const f of FASES) {
    const it = e.itens[chaveItem(g, m, f)];
    if (it) { acertos += it.acertos; erros += it.erros; parciais += it.parciais; }
  }
  const concl = medIds.filter((m) => medConcluido(e, g, m)).length;
  const iniciado = acertos + erros + parciais > 0;
  const dom = dominioGrupo(e, g, medIds);
  return { acertos, erros, parciais, concluidos: concl, total: medIds.length, pct: medIds.length ? concl / medIds.length : 0, dominio: dom, nivel: nivelDominio(dom, iniciado), iniciado };
}

export function exportarEstado(): string {
  return JSON.stringify({ perfil: perfilAtual(), estado }, null, 2);
}
export function importarEstado(json: string) {
  const d = JSON.parse(json);
  if (!d?.estado?.versao) throw new Error('Arquivo de progresso inválido.');
  atualizar((e) => Object.assign(e, novoEstado(), d.estado));
}
