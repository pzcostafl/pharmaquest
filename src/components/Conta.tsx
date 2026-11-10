import { useState } from 'react';
import { cadastrar, entrar, recuperarSenha, sair, sincronizarAgora, useConta } from '../lib/nuvem';
import { Icone } from './Icone';

const ROTULO_STATUS: Record<string, string> = {
  local: 'Somente neste aparelho',
  desconectado: 'Sem conta conectada',
  sincronizando: 'Sincronizando…',
  sincronizado: 'Progresso salvo na nuvem',
  pendente: 'Alterações aguardando envio',
  erro: 'Erro ao sincronizar',
};

/** Indicador compacto para o cabeçalho. */
export function IndicadorSync() {
  const c = useConta();
  if (c.status === 'local' || c.status === 'desconectado') return null;
  const cor = c.status === 'sincronizado' ? 'text-acerto-500' : c.status === 'erro' ? 'text-erro-500' : 'text-parcial-500';
  return (
    <span className={`flex h-10 w-8 items-center justify-center ${cor}`} title={ROTULO_STATUS[c.status] + (c.erro ? `: ${c.erro}` : '')} aria-label={ROTULO_STATUS[c.status]}>
      <Icone nome={c.status === 'sincronizando' ? 'repetir' : c.status === 'erro' ? 'alerta' : 'check'} className={`h-4 w-4 ${c.status === 'sincronizando' ? 'animate-spin' : ''}`} />
    </span>
  );
}

/** Login, cadastro e estado da sincronização. */
export function FormConta({ compacto = false }: { compacto?: boolean }) {
  const c = useConta();
  const [modo, setModo] = useState<'entrar' | 'cadastrar' | 'recuperar'>('entrar');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [msg, setMsg] = useState<{ tipo: 'erro' | 'ok'; texto: string } | null>(null);
  const [ocupado, setOcupado] = useState(false);

  if (c.sessao) {
    return (
      <div className="space-y-3 text-sm">
        <p>Conectado como <strong>{c.nome}</strong> <span className="text-slate-500">({c.sessao.user.email})</span>{c.papel === 'admin' && <span className="selo ml-2 bg-petroleo-100 text-petroleo-800">administrador</span>}</p>
        <p className="text-slate-500">
          {ROTULO_STATUS[c.status]}
          {c.ultimaSync && c.status === 'sincronizado' && ` · ${new Date(c.ultimaSync).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`}
          {c.erro && c.status === 'erro' && ` — ${c.erro}`}
        </p>
        <p className="text-xs text-slate-500">Entre com a mesma conta no celular e no iPad: o progresso é mesclado automaticamente, sem perder nada de nenhum dos aparelhos.</p>
        <div className="flex flex-wrap gap-2">
          <button className="btn-secundario" onClick={() => sincronizarAgora()}><Icone nome="repetir" className="h-4 w-4" /> Sincronizar agora</button>
          <button className="btn-fantasma text-erro-600" onClick={() => sair()}>Sair da conta</button>
        </div>
      </div>
    );
  }

  const enviar = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setOcupado(true); setMsg(null);
    try {
      if (modo === 'entrar') {
        const e = await entrar(email.trim(), senha);
        if (e) setMsg({ tipo: 'erro', texto: e });
      } else if (modo === 'cadastrar') {
        if (!nome.trim()) { setMsg({ tipo: 'erro', texto: 'Informe seu nome.' }); return; }
        const r = await cadastrar(nome.trim(), email.trim(), senha);
        if (r.erro) setMsg({ tipo: 'erro', texto: r.erro });
        else if (r.confirmar) setMsg({ tipo: 'ok', texto: 'Conta criada! Abra o link de confirmação enviado ao seu e-mail e depois entre aqui.' });
      } else {
        const e = await recuperarSenha(email.trim());
        setMsg(e ? { tipo: 'erro', texto: e } : { tipo: 'ok', texto: 'Se o e-mail tiver conta, você receberá um link para redefinir a senha.' });
      }
    } catch {
      setMsg({ tipo: 'erro', texto: 'Sem conexão com o servidor. Você pode continuar estudando; o progresso fica salvo neste aparelho.' });
    } finally {
      setOcupado(false);
    }
  };

  return (
    <form onSubmit={enviar} className="space-y-3">
      <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800" role="tablist">
        {(['entrar', 'cadastrar'] as const).map((m) => (
          <button type="button" key={m} role="tab" aria-selected={modo === m} onClick={() => { setModo(m); setMsg(null); }} className={`rounded-lg py-2 text-sm font-semibold transition ${modo === m ? 'bg-white text-petroleo-800 shadow-sm dark:bg-slate-900 dark:text-petroleo-200' : 'text-slate-500'}`}>
            {m === 'entrar' ? 'Entrar' : 'Criar conta'}
          </button>
        ))}
      </div>
      {modo === 'cadastrar' && <input className="campo" placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" />}
      <input className="campo" type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" inputMode="email" autoCapitalize="none" required />
      {modo !== 'recuperar' && <input className="campo" type="password" placeholder="Senha (mín. 6 caracteres)" value={senha} onChange={(e) => setSenha(e.target.value)} autoComplete={modo === 'entrar' ? 'current-password' : 'new-password'} minLength={6} required />}
      {msg && <p className={`rounded-lg p-2.5 text-sm ${msg.tipo === 'erro' ? 'bg-erro-50 text-erro-700 dark:bg-erro-700/20 dark:text-erro-100' : 'bg-acerto-50 text-acerto-700 dark:bg-acerto-700/20 dark:text-acerto-100'}`}>{msg.texto}</p>}
      <button className="btn-primario w-full" disabled={ocupado}>{ocupado ? 'Aguarde…' : modo === 'entrar' ? 'Entrar' : modo === 'cadastrar' ? 'Criar conta' : 'Enviar link de redefinição'}</button>
      {!compacto && (
        <button type="button" className="w-full text-center text-xs text-slate-500 underline" onClick={() => setModo(modo === 'recuperar' ? 'entrar' : 'recuperar')}>
          {modo === 'recuperar' ? 'Voltar para o login' : 'Esqueci minha senha'}
        </button>
      )}
    </form>
  );
}
