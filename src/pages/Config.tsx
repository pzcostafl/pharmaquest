import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { atualizar, criarPerfil, excluirPerfil, exportarEstado, importarEstado, listarPerfis, trocarPerfil, useEstado, usePerfil } from '../lib/progresso';
import { aplicarTema, lerTema, Pagina, type TemaPref } from '../components/Layout';
import { SeletorModo } from '../components/EscolhaModo';
import { avisar, Secao } from '../components/ui';
import { FormConta } from '../components/Conta';
import { nuvemAtiva } from '../lib/supabase';

export function Config() {
  const e = useEstado();
  const perfil = usePerfil();
  const [tema, setTema] = useState<TemaPref>(lerTema());
  const [novo, setNovo] = useState('');
  const arq = useRef<HTMLInputElement>(null);

  const baixar = () => {
    const blob = new Blob([exportarEstado()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `pharmaquest-progresso-${perfil?.nome ?? 'perfil'}.json`;
    a.click();
  };

  return (
    <Pagina estreita>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Configurações</h1>
      <div className="mt-6 space-y-5">
        {nuvemAtiva() && <Secao titulo="Conta e sincronização"><FormConta /></Secao>}
        <Secao titulo="Formato das questões">
          <SeletorModo valor={e.modo} onChange={(m) => { atualizar((s) => { s.modo = m; s.modoEscolhido = true; }); avisar('Formato atualizado', 'Vale para todas as fases a partir da próxima questão.', 'check'); }} />
        </Secao>
        <Secao titulo="Aparência">
          <div className="flex flex-wrap gap-2" role="radiogroup">
            {([['escuro', 'Preto'], ['claro', 'Claro'], ['sistema', 'Seguir o sistema']] as const).map(([v, r]) => (
              <button key={v} role="radio" aria-checked={tema === v} className={tema === v ? 'btn-primario' : 'btn-secundario'} onClick={() => { setTema(v); aplicarTema(v); }}>{r}</button>
            ))}
          </div>
        </Secao>
        <Secao titulo="Perfil do estudante">
          <p className="mb-3 text-sm text-slate-500">O progresso fica salvo neste dispositivo, separado por perfil, e funciona sem internet. Para levar seu progresso para outro aparelho, exporte e importe o arquivo.</p>
          <ul className="mb-3 divide-y divide-slate-100 text-sm dark:divide-slate-800">
            {listarPerfis().map((p) => (
              <li key={p.id} className="flex items-center gap-2 py-2">
                <span className="font-medium">{p.nome}</span>
                {p.id === perfil?.id ? <span className="selo bg-petroleo-50 text-petroleo-700">atual</span> : <button className="btn-fantasma px-2 py-1 text-xs" onClick={() => trocarPerfil(p.id)}>Usar este perfil</button>}
                <button className="btn-fantasma ml-auto px-2 py-1 text-xs text-erro-600" onClick={() => { if (confirm(`Excluir o perfil "${p.nome}" e todo o seu progresso? Esta ação não pode ser desfeita.`)) excluirPerfil(p.id); }}>Excluir</button>
              </li>
            ))}
          </ul>
          <form className="flex gap-2" onSubmit={(ev) => { ev.preventDefault(); if (novo.trim()) { criarPerfil(novo); setNovo(''); } }}>
            <input className="campo" placeholder="Nome do novo perfil" value={novo} onChange={(ev) => setNovo(ev.target.value)} />
            <button className="btn-secundario shrink-0">Criar perfil</button>
          </form>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="btn-secundario" onClick={baixar}>Exportar progresso (.json)</button>
            <button className="btn-secundario" onClick={() => arq.current?.click()}>Importar progresso</button>
            <input ref={arq} type="file" accept="application/json" className="hidden" onChange={async (ev) => {
              const f = ev.target.files?.[0];
              if (!f) return;
              try { importarEstado(await f.text()); avisar('Progresso importado', undefined, 'check'); } catch (err) { avisar('Arquivo inválido', String((err as Error).message), 'alerta'); }
              ev.target.value = '';
            }} />
          </div>
        </Secao>
        <Secao titulo="Instalar no celular ou iPad">
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-slate-600 dark:text-slate-300">
            <li><strong>iPhone/iPad (Safari):</strong> toque em Compartilhar → <em>Adicionar à Tela de Início</em>. O app abre em tela cheia, como um aplicativo.</li>
            <li><strong>Android (Chrome):</strong> menu ⋮ → <em>Instalar app</em> ou <em>Adicionar à tela inicial</em>.</li>
            <li>Para estudar sem internet, abra cada módulo e toque em <em>Baixar para offline</em>.</li>
          </ul>
        </Secao>
        <Link to="/admin" className="btn-fantasma w-full justify-center text-slate-500">Área administrativa (professores)</Link>
      </div>
    </Pagina>
  );
}

/** Tela de boas-vindas: entrar com conta (sincroniza celular e iPad) ou estudar só neste aparelho. */
export function BoasVindas() {
  const [nome, setNome] = useState('');
  const [semConta, setSemConta] = useState(!nuvemAtiva());
  return (
    <div className="flex min-h-dvh items-center justify-center bg-gradient-to-br from-petroleo-50 to-slate-50 p-4 pt-[max(1rem,env(safe-area-inset-top))] dark:from-petroleo-950 dark:to-slate-950">
      <div className="cartao surgir w-full max-w-md p-6 sm:p-7">
        <img src="./icone.png" alt="" className="h-16 w-16 rounded-full" />
        <h1 className="mt-4 text-2xl font-bold">Pharma Ju Sales</h1>
        <p className="text-sm text-slate-500">Desafio da Farmacologia</p>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Estude os principais princípios ativos em três fases: grupo terapêutico, classe farmacológica e mecanismo, nomes comerciais e efeitos adversos.</p>
        {!semConta ? (
          <div className="mt-5">
            <FormConta />
            <p className="mt-4 text-center text-xs text-slate-500">Com conta, seu progresso fica salvo e sincronizado entre celular, iPad e computador.</p>
            <button className="btn-fantasma mt-2 w-full" onClick={() => setSemConta(true)}>Estudar sem conta (só neste aparelho)</button>
          </div>
        ) : (
          <form onSubmit={(ev) => { ev.preventDefault(); if (nome.trim()) criarPerfil(nome); }}>
            <label className="mt-5 block text-sm font-medium" htmlFor="nome">Como podemos te chamar?</label>
            <input id="nome" className="campo mt-1.5" value={nome} onChange={(ev) => setNome(ev.target.value)} placeholder="Seu nome" autoFocus />
            <button className="btn-primario mt-4 w-full" disabled={!nome.trim()}>Começar a estudar</button>
            <p className="mt-3 text-xs text-slate-500">O progresso fica salvo neste aparelho e funciona offline.{nuvemAtiva() && ' Você pode criar uma conta depois, em Ajustes, sem perder nada.'}</p>
            {nuvemAtiva() && <button type="button" className="btn-fantasma mt-2 w-full" onClick={() => setSemConta(false)}>Voltar para entrar com conta</button>}
          </form>
        )}
      </div>
    </div>
  );
}
