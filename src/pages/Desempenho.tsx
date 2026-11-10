import { useBanco } from '../lib/hooks';
import { useEstado } from '../lib/progresso';
import { listarGrupos } from '../lib/grupos';
import { statsGrupo } from '../lib/progresso';
import { CONQUISTAS } from '../lib/conquistas';
import { parseChave, ROTULO_FASE } from '../lib/questoes';
import { Pagina } from '../components/Layout';
import { Barra, pct, Secao, Vazio } from '../components/ui';
import { Icone } from '../components/Icone';
import { Link } from 'react-router-dom';
import { aproveitamentoPorGrupo } from '../lib/desafio';
import { GraficoGrupos } from './Desafio';

/** Taxa de acerto por semana (últimas 8 semanas). */
export function Evolucao() {
  const e = useEstado();
  const SEM = 7 * 86_400_000;
  const agora = Date.now();
  const semanas = Array.from({ length: 8 }, (_, i) => {
    const ini = agora - (8 - i) * SEM, fim = ini + SEM;
    const evs = e.historico.filter((h) => h.ts >= ini && h.ts < fim);
    const ac = evs.filter((h) => h.resultado === 'certo').length + 0.5 * evs.filter((h) => h.resultado === 'parcial').length;
    return { rot: new Date(fim).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }), n: evs.length, taxa: evs.length ? ac / evs.length : 0 };
  });
  if (!e.historico.length) return <Vazio>Responda algumas questões para ver sua evolução.</Vazio>;
  return (
    <div>
      <div className="flex h-40 items-end gap-2" role="img" aria-label="Taxa de acerto por semana">
        {semanas.map((s, i) => (
          <div key={i} className="flex flex-1 flex-col items-center justify-end gap-1" title={`${s.n} respostas · ${pct(s.taxa)}`}>
            <span className="text-[10px] text-slate-500">{s.n ? pct(s.taxa) : ''}</span>
            <div className="w-full rounded-t-md bg-petroleo-500 dark:bg-petroleo-400" style={{ height: `${Math.max(s.n ? 4 : 0, s.taxa * 100)}%`, opacity: s.n ? 1 : 0.15 }} />
          </div>
        ))}
      </div>
      <div className="mt-1 flex gap-2">{semanas.map((s, i) => <span key={i} className="flex-1 text-center text-[10px] text-slate-400">{s.rot}</span>)}</div>
      <p className="mt-2 text-xs text-slate-500">Taxa de acerto semanal (parcial = meio acerto), últimas 8 semanas.</p>
    </div>
  );
}

export function Desempenho() {
  const banco = useBanco();
  const e = useEstado();
  const grupos = listarGrupos();
  const recentes = [...e.historico].reverse().slice(0, 30);

  return (
    <Pagina>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Desempenho</h1>
      <p className="mt-1 text-slate-500">{e.pontos.toLocaleString('pt-BR')} pontos · melhor sequência sem erros: {e.melhorSequencia} medicamentos · sequência atual: {e.sequenciaSemErro}</p>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <Secao titulo="Domínio do conhecimento por grupo">
          <p className="mb-3 text-xs text-slate-500">O domínio combina a acurácia acumulada, o resultado mais recente e a estabilidade da memória (acertos repetidos ao longo do tempo) em todas as fases — não apenas a quantidade de questões respondidas.</p>
          <ul className="space-y-3">
            {grupos.map((g) => {
              const ids = (banco.porGrupo.get(g.id) ?? []).map((m) => m.id);
              const s = statsGrupo(e, g.id, ids);
              return (
                <li key={g.id}>
                  <div className="mb-1 flex justify-between text-sm"><span className="font-medium">{g.nomeCurto}</span><span className="text-slate-500">{s.nivel} · {pct(s.dominio)}</span></div>
                  <Barra valor={s.dominio} className="h-2" cor={s.dominio >= 0.75 ? 'bg-acerto-500' : 'bg-petroleo-600 dark:bg-petroleo-400'} />
                </li>
              );
            })}
          </ul>
        </Secao>
        <Secao titulo="Evolução"><Evolucao /></Secao>
        <Secao titulo={`Conquistas (${Object.keys(e.conquistas).length}/${CONQUISTAS.length})`}>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {CONQUISTAS.map((c) => {
              const ok = e.conquistas[c.id];
              return (
                <div key={c.id} className={`flex items-start gap-3 rounded-xl border p-3 ${ok ? 'border-petroleo-200 bg-petroleo-50 dark:border-petroleo-800 dark:bg-petroleo-950/50' : 'border-slate-200 opacity-60 dark:border-slate-800'}`}>
                  <span className={`rounded-lg p-2 ${ok ? 'bg-petroleo-700 text-white' : 'bg-slate-200 text-slate-500 dark:bg-slate-800'}`}><Icone nome={c.icone} className="h-4 w-4" /></span>
                  <div>
                    <p className="text-sm font-semibold">{c.titulo}</p>
                    <p className="text-xs text-slate-500">{c.descricao}</p>
                    {ok && <p className="mt-0.5 text-[10px] text-petroleo-700 dark:text-petroleo-300">desbloqueada em {new Date(ok).toLocaleDateString('pt-BR')}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </Secao>
        <Secao titulo="Histórico recente">
          {!recentes.length ? <Vazio>Sem respostas ainda.</Vazio> : (
            <ul className="max-h-96 divide-y divide-slate-100 overflow-y-auto text-sm dark:divide-slate-800">
              {recentes.map((h, i) => {
                const p = parseChave(h.chave);
                return (
                  <li key={i} className="flex items-center gap-2.5 py-2">
                    <span className={`h-2 w-2 shrink-0 rounded-full ${h.resultado === 'certo' ? 'bg-acerto-500' : h.resultado === 'parcial' ? 'bg-parcial-500' : 'bg-erro-500'}`} />
                    <span className="font-medium">{banco.medicamentos.get(p.medId)?.nome}</span>
                    <span className="truncate text-slate-500">{ROTULO_FASE[p.fase]} · {h.formato === 'mc' ? 'múltipla escolha' : 'dissertativa'}</span>
                    <span className="ml-auto shrink-0 text-xs text-slate-400">{new Date(h.ts).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </Secao>
        <Secao titulo="Desafio Geral — acertos por grupo" acao={<Link to="/desafio" className="btn-secundario py-2 text-xs">Jogar</Link>}>
          {(() => {
            const linhas = aproveitamentoPorGrupo(e, banco).map((x) => ({ id: x.grupo.id, nome: x.grupo.nomeCurto, acertos: x.acertos, total: x.total }));
            const rod = e.desafios ?? [];
            if (!linhas.some((l) => l.total)) return <Vazio>Jogue o Desafio Geral para ver em quais grupos você mais acerta.</Vazio>;
            return (
              <>
                <p className="mb-3 text-xs text-slate-500">Todas as respostas de grupo terapêutico já dadas · {rod.length} rodada(s){rod.length ? `, a última com ${Math.round((rod[rod.length - 1].acertos / rod[rod.length - 1].total) * 100)}% de acerto` : ''}.</p>
                <GraficoGrupos linhas={linhas} />
              </>
            );
          })()}
        </Secao>
        <Secao titulo="Simulados">
          {!e.simulados.length ? <Vazio>Nenhum simulado realizado.</Vazio> : (
            <ul className="space-y-1 text-sm">{[...e.simulados].reverse().map((s, i) => <li key={i} className="flex justify-between"><span>{grupos.find((g) => g.id === s.grupoId)?.nomeCurto}</span><span>{s.acertos}/{s.total} ({pct(s.acertos / s.total)}) · {new Date(s.ts).toLocaleDateString('pt-BR')}</span></li>)}</ul>
          )}
        </Secao>
      </div>
    </Pagina>
  );
}
