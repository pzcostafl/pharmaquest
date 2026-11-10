import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBanco } from '../lib/hooks';
import { listarGrupos } from '../lib/grupos';
import { statsGrupo, useEstado, medConcluido, cicloDe } from '../lib/progresso';
import { Icone } from '../components/Icone';
import { Barra, pct } from '../components/ui';
import { Pagina } from '../components/Layout';
import { EscolhaModo } from '../components/EscolhaModo';
import { selecionarRevisao } from '../lib/conquistas';

export function Home() {
  const banco = useBanco();
  const e = useEstado();
  const nav = useNavigate();
  const [escolher, setEscolher] = useState<string | null>(null);
  const grupos = listarGrupos();

  const totalMeds = new Set([...banco.porGrupo.values()].flat().map((m) => m.id)).size;
  const todos = grupos.map((g) => ({ g, meds: (banco.porGrupo.get(g.id) ?? []).map((m) => m.id) }));
  const concl = todos.reduce((s, x) => s + x.meds.filter((m) => medConcluido(e, x.g.id, m)).length, 0);
  const totalVinc = todos.reduce((s, x) => s + x.meds.length, 0);
  const resp = Object.values(e.itens);
  const acertos = resp.reduce((s, i) => s + i.acertos, 0);
  const tent = resp.reduce((s, i) => s + i.tentativas, 0);
  const pendentesRev = selecionarRevisao(e, 999).filter((k) => (e.itens[k]?.srs.proxima ?? 0) <= Date.now()).length;

  const iniciar = (g: string) => {
    if (!e.modoEscolhido) setEscolher(g);
    else nav(`/modulo/${g}`);
  };

  return (
    <Pagina>
      {/* Título e apresentação — y 12–25% */}
      <section className="surgir mb-6 sm:mb-8">
        <p className="rotulo text-petroleo-700 dark:text-petroleo-300">Aprendizagem progressiva em três fases</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">Pharma Ju Sales — Desafio da Farmacologia</h1>
        <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">
          Escolha uma pasta terapêutica e domine cada princípio ativo: <strong>grupo terapêutico</strong> → <strong>classe farmacológica e mecanismo</strong> → <strong>nomes comerciais e efeitos adversos</strong>.
        </p>
      </section>

      {/* Indicadores gerais — y 27–39% */}
      <section className="mb-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {[
          { r: 'Medicamentos concluídos', v: `${concl}/${totalVinc}`, s: <Barra valor={totalVinc ? concl / totalVinc : 0} className="mt-2 h-1.5" />, i: 'check' },
          { r: 'Taxa de acerto', v: tent ? pct(acertos / tent) : '—', s: <span className="text-xs text-slate-500">{tent} respostas</span>, i: 'alvo' },
          { r: 'Pontuação', v: e.pontos.toLocaleString('pt-BR'), s: <span className="text-xs text-slate-500">{Object.keys(e.conquistas).length} conquistas</span>, i: 'estrela' },
          { r: 'Revisões pendentes', v: String(pendentesRev), s: pendentesRev ? <Link to="/revisao" className="text-xs font-semibold text-petroleo-700 underline dark:text-petroleo-300">Revisar agora</Link> : <span className="text-xs text-slate-500">em dia</span>, i: 'relogio' },
        ].map((k) => (
          <div key={k.r} className="cartao p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-slate-500">{k.r}</p>
              <Icone nome={k.i} className="h-4 w-4 text-petroleo-500" />
            </div>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{k.v}</p>
            {k.s}
          </div>
        ))}
      </section>

      {/* Grade das pastas — y 42–94%, 3 colunas */}
      <section>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Pastas terapêuticas</h2>
          <p className="text-sm text-slate-500">{totalMeds} princípios ativos disponíveis · modo: <Link to="/config" className="font-medium text-petroleo-700 underline dark:text-petroleo-300">{e.modo === 'mc' ? 'múltipla escolha' : e.modo === 'dis' ? 'dissertativo' : 'misto'}</Link></p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {todos.map(({ g, meds }, idx) => {
            const s = statsGrupo(e, g.id, meds);
            const pos = e.posicao[g.id];
            const desbloq = !!e.gruposConcluidos[g.id];
            const ciclo = cicloDe(e, g.id);
            return (
              <article key={g.id} className="cartao surgir group flex flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-md" style={{ animationDelay: `${idx * 30}ms` }}>
                <div className="flex items-start gap-3.5">
                  <span className="rounded-2xl bg-petroleo-50 p-3 text-petroleo-700 dark:bg-petroleo-900/50 dark:text-petroleo-200"><Icone nome={g.icone} className="h-6 w-6" /></span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold leading-snug text-slate-900 dark:text-white">{g.nome}</h3>
                    <p className="mt-0.5 text-xs text-slate-500">{g.descricao}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span>{meds.length} medicamentos{ciclo > 0 ? ` · ciclo ${ciclo + 1}` : ''}</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{pct(s.pct)} concluído</span>
                </div>
                <Barra valor={s.pct} className="mt-1.5 h-1.5" />
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-acerto-50 py-1.5 dark:bg-acerto-700/15"><p className="text-sm font-bold text-acerto-700 dark:text-acerto-100">{s.acertos}</p><p className="text-[10px] text-slate-500">acertos</p></div>
                  <div className="rounded-lg bg-erro-50 py-1.5 dark:bg-erro-700/15"><p className="text-sm font-bold text-erro-700 dark:text-erro-100">{s.erros}</p><p className="text-[10px] text-slate-500">erros</p></div>
                  <div className="rounded-lg bg-slate-100 py-1.5 dark:bg-slate-800"><p className="text-sm font-bold text-slate-800 dark:text-slate-100">{s.nivel}</p><p className="text-[10px] text-slate-500">domínio {pct(s.dominio)}</p></div>
                </div>
                <div className="mt-4 flex gap-2 pt-1">
                  <button className="btn-primario flex-1" disabled={!meds.length} onClick={() => iniciar(g.id)}>
                    {!meds.length ? 'Em preparação' : pos || s.concluidos ? 'Continuar' : 'Iniciar estudos'}
                  </button>
                  <Link
                    to={desbloq ? `/resumo/${g.id}` : '#'}
                    onClick={(ev) => { if (!desbloq) ev.preventDefault(); }}
                    aria-disabled={!desbloq}
                    className={`btn-secundario px-3 ${desbloq ? '' : 'cursor-not-allowed opacity-50'}`}
                    title={desbloq ? 'Painel de Revisão Farmacológica' : 'Conclua todos os medicamentos da pasta para desbloquear o resumo'}
                  >
                    <Icone nome="livro" className="h-4 w-4" /> Resumo
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      {escolher && <EscolhaModo onFechar={() => setEscolher(null)} onEscolhido={() => nav(`/modulo/${escolher}`)} />}
    </Pagina>
  );
}
