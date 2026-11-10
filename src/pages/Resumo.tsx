import { Link, useParams } from 'react-router-dom';
import { useBanco } from '../lib/hooks';
import { listarGrupos } from '../lib/grupos';
import { useEstado } from '../lib/progresso';
import { vinculoNoGrupo } from '../data/banco';
import { Pagina } from '../components/Layout';
import { Secao, Vazio } from '../components/ui';
import { Icone } from '../components/Icone';

const SECOES = [
  ['visao', '1. Visão geral'], ['mecanismos', '2. Mecanismos de ação'], ['classificacao', '3. Classificação'],
  ['efeitos', '4. Efeitos adversos'], ['linhas', '5. Primeiras linhas'], ['contra', '6. Contraindicações e interações'],
  ['comparacao', '7. Comparações'], ['memorizar', '8. Para memorizar'], ['simulado', '9. Avaliação final'], ['fontes', '10. Fontes'],
];

export function Resumo() {
  const { g = '' } = useParams();
  const banco = useBanco();
  const e = useEstado();
  const grupo = listarGrupos().find((x) => x.id === g);
  const r = banco.resumos.get(g);
  const meds = banco.porGrupo.get(g) ?? [];

  if (!grupo) return <Pagina><Vazio>Grupo não encontrado.</Vazio></Pagina>;
  if (!e.gruposConcluidos[g]) {
    return (
      <Pagina estreita>
        <Vazio>
          <Icone nome="livro" className="mx-auto mb-2 h-8 w-8 text-slate-400" />
          O Painel de Revisão Farmacológica de <strong>{grupo.nome}</strong> é desbloqueado quando você concluir todos os {meds.length} medicamentos da pasta.{' '}
          <Link to={`/modulo/${g}`} className="font-semibold underline">Continuar estudando</Link>
        </Vazio>
      </Pagina>
    );
  }
  if (!r) return <Pagina><Vazio>O resumo deste grupo ainda não foi cadastrado.</Vazio></Pagina>;

  // Tabela gerada a partir do banco: Classe | Princípios ativos | Mecanismo
  const classesUsadas = [...new Set(meds.map((m) => vinculoNoGrupo(m, g).classeId))];
  const tabela = classesUsadas.map((cid) => {
    const c = banco.classes.get(cid)!;
    return { c, meds: meds.filter((m) => vinculoNoGrupo(m, g).classeId === cid) };
  });

  return (
    <Pagina>
      <Link to={`/modulo/${g}`} className="btn-fantasma -ml-3 mb-2 px-3"><Icone nome="voltar" className="h-4 w-4" /> {grupo.nomeCurto}</Link>
      <header className="mb-6">
        <p className="rotulo text-petroleo-700 dark:text-petroleo-300">Painel de Revisão Farmacológica</p>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{grupo.nome}</h1>
        <p className="mt-1 text-sm text-slate-500">Revisão científica: {r.dataRevisao} · {meds.length} princípios ativos · material educacional, não constitui prescrição</p>
      </header>
      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav className="hidden lg:block">
          <ol className="sticky top-24 space-y-1 text-sm">
            {SECOES.map(([id, t]) => <li key={id}><a href={`#${id}`} onClick={(ev) => { ev.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }} className="block rounded-lg px-3 py-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">{t}</a></li>)}
          </ol>
        </nav>
        <div className="min-w-0 space-y-5">
          <nav className="sem-barra sticky top-14 z-30 -mx-4 flex gap-2 overflow-x-auto bg-slate-50/95 px-4 py-2 backdrop-blur sm:top-16 lg:hidden dark:bg-slate-950/95" aria-label="Seções do resumo">
            {SECOES.map(([id, t]) => <button key={id} onClick={() => { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 120, behavior: 'smooth' }); }} className="selo shrink-0 border border-slate-200 bg-white py-1.5 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">{t.replace(/^\d+\. /, '')}</button>)}
          </nav>
          <Secao id="visao" titulo="1. Visão geral"><div className="prosa text-[15px] text-slate-700 dark:text-slate-300">{r.visaoGeral.map((p, i) => <p key={i}>{p}</p>)}</div></Secao>

          <Secao id="mecanismos" titulo="2. Mecanismos de ação">
            <div className="grid gap-4 md:grid-cols-2">
              {r.mecanismos.map((m) => (
                <div key={m.titulo} className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                  <h3 className="font-semibold text-petroleo-800 dark:text-petroleo-200">{m.titulo}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{m.texto}</p>
                </div>
              ))}
            </div>
            {r.fluxogramas.map((f) => (
              <figure key={f.titulo} className="mt-5">
                <figcaption className="mb-2 text-sm font-semibold">{f.titulo}</figcaption>
                <ol className="flex flex-col items-stretch gap-1.5 md:flex-row md:flex-wrap md:items-center">
                  {f.passos.map((p, i) => (
                    <li key={i} className="flex items-center gap-1.5 md:contents">
                      <span className="flex-1 rounded-lg border border-petroleo-200 bg-petroleo-50 px-3 py-2 text-center text-xs font-medium text-petroleo-900 md:flex-none dark:border-petroleo-800 dark:bg-petroleo-950/60 dark:text-petroleo-100">{p}</span>
                      {i < f.passos.length - 1 && <span className="text-petroleo-400" aria-hidden><span className="md:hidden">↓</span><span className="hidden md:inline">→</span></span>}
                    </li>
                  ))}
                </ol>
              </figure>
            ))}
          </Secao>

          <Secao id="classificacao" titulo="3. Classificação dos medicamentos">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead><tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-700"><th className="py-2 pr-3">Classe farmacológica</th><th className="py-2 pr-3">Princípios ativos</th><th className="py-2">Mecanismo de ação</th></tr></thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {tabela.map(({ c, meds: ms }) => (
                    <tr key={c.id} className="align-top">
                      <td className="py-2.5 pr-3 font-semibold">{c.sigla ?? c.nome}{c.sigla && <span className="block text-xs font-normal text-slate-500">{c.nome}</span>}{c.familia && <span className="block text-[11px] font-normal text-slate-400">{c.familia}</span>}</td>
                      <td className="py-2.5 pr-3">{ms.map((m, i) => <span key={m.id}>{i > 0 && ', '}<Link to={`/ficha/${m.id}?g=${g}`} className="underline decoration-dotted hover:text-petroleo-700">{m.nome}</Link></span>)}</td>
                      <td className="py-2.5 text-slate-600 dark:text-slate-300">{c.mecanismoCurto}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Secao>

          <Secao id="efeitos" titulo="4. Principais efeitos adversos">
            <div className="grid gap-5 md:grid-cols-2">
              {[['Frequentes', r.eaFrequentes, 'bg-parcial-50 dark:bg-parcial-700/15'], ['Graves', r.eaGraves, 'bg-erro-50 dark:bg-erro-700/15']].map(([t, lista, cor]) => (
                <div key={t as string}>
                  <h3 className="mb-2 font-semibold">{t as string}</h3>
                  <ul className="space-y-2">
                    {(lista as typeof r.eaFrequentes).map((x, i) => (
                      <li key={i} className={`rounded-xl p-3 text-sm ${cor}`}>
                        <strong>{x.efeito}</strong> <span className="text-slate-500">— {x.classes}</span>
                        {x.mecanismo && <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Mecanismo: {x.mecanismo}</p>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Secao>

          <Secao id="linhas" titulo="5. Primeiras linhas de tratamento">
            <p className="mb-3 text-sm text-slate-500">Não existe uma única primeira linha para todo o grupo: a escolha depende da indicação, do perfil do paciente, da gravidade, das comorbidades e da diretriz vigente.</p>
            <div className="space-y-2.5">
              {r.primeirasLinhas.map((p, i) => (
                <div key={i} className="rounded-xl border border-slate-200 p-3.5 text-sm dark:border-slate-700">
                  <p className="font-semibold text-petroleo-800 dark:text-petroleo-200">{p.condicao}</p>
                  <p className="mt-1 text-slate-700 dark:text-slate-300">{p.recomendacao}</p>
                  {p.observacao && <p className="mt-1 text-xs text-slate-500">{p.observacao}</p>}
                  {p.fonte && <p className="mt-1 text-[11px] italic text-slate-400">Fonte: {p.fonte}</p>}
                </div>
              ))}
            </div>
          </Secao>

          <Secao id="contra" titulo="6. Contraindicações, precauções e interações">
            <div className="grid gap-5 md:grid-cols-2">
              <div><h3 className="mb-2 font-semibold">Contraindicações e alertas</h3><ul className="list-disc space-y-1.5 pl-5 text-sm">{r.contraindicacoes.map((x, i) => <li key={i}>{x}</li>)}</ul></div>
              <div><h3 className="mb-2 font-semibold">Interações relevantes</h3><ul className="list-disc space-y-1.5 pl-5 text-sm">{r.interacoes.map((x, i) => <li key={i}>{x}</li>)}</ul></div>
            </div>
          </Secao>

          <Secao id="comparacao" titulo="7. Comparação entre medicamentos">
            <div className="space-y-3">{r.comparacoes.map((c) => <div key={c.titulo}><h3 className="font-semibold">{c.titulo}</h3><p className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{c.texto}</p></div>)}</div>
          </Secao>

          <Secao id="memorizar" titulo="8. Resumo para memorizar">
            <ul className="grid gap-2 sm:grid-cols-2">{r.memorizar.map((x, i) => <li key={i} className="flex gap-2 rounded-xl bg-petroleo-50 p-3 text-sm dark:bg-petroleo-950/50"><Icone nome="check" className="mt-0.5 h-4 w-4 shrink-0 text-petroleo-600" /> {x}</li>)}</ul>
          </Secao>

          <Secao id="simulado" titulo="9. Avaliação final">
            <p className="text-sm text-slate-600 dark:text-slate-300">Simulado com questões variadas de todo o grupo (grupo, classe, nomes comerciais, efeitos adversos e questões inversas “qual fármaco pertence à classe…”), no formato configurado.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[10, 20, 30].map((n) => <Link key={n} to={`/simulado/${g}?n=${n}`} className={n === 20 ? 'btn-primario' : 'btn-secundario'}>{n} questões</Link>)}
            </div>
            {e.simulados.filter((s) => s.grupoId === g).length > 0 && (
              <p className="mt-3 text-xs text-slate-500">Seus simulados: {e.simulados.filter((s) => s.grupoId === g).slice(-5).map((s) => `${s.acertos}/${s.total}`).join(' · ')}</p>
            )}
          </Secao>

          <Secao id="fontes" titulo="10. Fontes">
            <ul className="list-disc space-y-1 pl-5 text-sm">{r.fontes.map((x, i) => <li key={i}>{x}</li>)}</ul>
            <p className="mt-3 text-xs text-slate-500">Última revisão científica: {r.dataRevisao}. Conteúdo baseado em referências-padrão e aguardando revisão docente no painel administrativo; confirme sempre na bula vigente e nas diretrizes atualizadas.</p>
          </Secao>
        </div>
      </div>
    </Pagina>
  );
}
