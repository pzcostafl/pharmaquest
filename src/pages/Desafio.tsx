import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useBanco } from '../lib/hooks';
import { chaveItem, type Correcao, type Questao, type Resultado } from '../lib/questoes';
import { registrarDesafio, registrarResposta, useEstado, type Modo } from '../lib/progresso';
import { verificarConquistas } from '../lib/conquistas';
import { gruposDoDesafio, POR_GRUPO_COMPLETO, questoesDoDesafio, selecionarDesafio, TAMANHOS, type ItemDesafio } from '../lib/desafio';
import { listarGrupos } from '../lib/grupos';
import { SeletorModo } from '../components/EscolhaModo';
import { QuestaoCard } from '../components/QuestaoCard';
import { Molecula } from '../components/Molecula';
import { Barra, avisar, pct, Secao, Vazio } from '../components/ui';
import { Icone } from '../components/Icone';
import { Pagina } from '../components/Layout';

const DESCRICAO_TAMANHO: Record<number, string> = { 10: 'Treino rápido', 20: 'Intermediário', 30: 'Avançado', 55: 'Desafio completo' };

interface Resposta { item: ItemDesafio; resultado: Resultado; resposta: string }
interface Rodada { itens: ItemDesafio[]; questoes: Questao[]; revisaoDeErros: boolean }

/** Gráfico de barras horizontais: % de acerto por grupo. */
export function GraficoGrupos({ linhas }: { linhas: { id: string; nome: string; acertos: number; total: number }[] }) {
  return (
    <ul className="space-y-2.5" role="img" aria-label="Percentual de acertos por grupo terapêutico">
      {linhas.map((l) => {
        const v = l.total ? l.acertos / l.total : 0;
        return (
          <li key={l.id}>
            <div className="mb-1 flex justify-between gap-2 text-sm">
              <span className="truncate font-medium">{l.nome}</span>
              <span className="shrink-0 tabular-nums text-slate-500">{l.total ? `${pct(v)} · ${l.acertos}/${l.total}` : '—'}</span>
            </div>
            <Barra valor={v} className="h-2.5" cor={!l.total ? 'bg-slate-300' : v >= 0.8 ? 'bg-acerto-500' : v >= 0.5 ? 'bg-parcial-500' : 'bg-erro-500'} />
          </li>
        );
      })}
    </ul>
  );
}

export function Desafio() {
  const banco = useBanco();
  const e = useEstado();
  const nav = useNavigate();
  const loc = useLocation();
  const grupos = gruposDoDesafio(banco);
  const nomeGrupo = (id: string) => listarGrupos().find((g) => g.id === id)?.nome ?? id;

  const [modo, setModo] = useState<Modo>(e.modo);
  const [n, setN] = useState<number>(20);
  const [priorizar, setPriorizar] = useState(false);
  const [rodada, setRodada] = useState<Rodada | null>(null);
  const [i, setI] = useState(0);
  const [respostas, setRespostas] = useState<Resposta[]>([]);
  const [fim, setFim] = useState(false);

  const jogando = loc.pathname.startsWith('/desafio/jogar');
  // Recarregou no meio da rodada: volta para a configuração.
  useEffect(() => { if (jogando && !rodada) nav('/desafio', { replace: true }); }, [jogando, rodada, nav]);

  const errosAntigos = Object.entries(e.itens).filter(([k, it]) => k.endsWith('|f1') && it.ultimo !== 'certo').length;

  const comecar = (itens: ItemDesafio[], revisaoDeErros = false) => {
    setRodada({ itens, questoes: questoesDoDesafio(banco, itens, modo), revisaoDeErros });
    setI(0); setRespostas([]); setFim(false);
    nav('/desafio/jogar');
    window.scrollTo({ top: 0 });
  };
  const novaRodada = () => comecar(selecionarDesafio(banco, e, n, priorizar));

  // ---------------- configuração ----------------
  if (!jogando && !fim) {
    const ultimas = [...(e.desafios ?? [])].reverse().slice(0, 5);
    return (
      <Pagina estreita>
        <Link to="/" className="btn-fantasma -ml-3 mb-2 px-3"><Icone nome="voltar" className="h-4 w-4" /> Módulos</Link>
        <header className="mb-6">
          <p className="rotulo text-petroleo-700 dark:text-petroleo-300">Todos os grupos terapêuticos</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">Desafio Geral</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Você recebe princípios ativos de todas as pastas, misturados, e diz a qual <strong>grupo terapêutico</strong> cada um pertence, sem saber de que pasta ele veio.</p>
        </header>

        <div className="space-y-5">
          <Secao titulo="Quantidade de questões">
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4" role="radiogroup">
              {TAMANHOS.map((t) => (
                <button key={t} role="radio" aria-checked={n === t} onClick={() => setN(t)}
                  className={`rounded-2xl border p-3.5 text-left transition ${n === t ? 'border-petroleo-600 bg-petroleo-50 ring-2 ring-petroleo-200 dark:bg-petroleo-900/40 dark:ring-petroleo-800' : 'border-slate-200 hover:border-petroleo-300 dark:border-slate-700'}`}>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{t}</p>
                  <p className="text-xs text-slate-500">{DESCRICAO_TAMANHO[t]}</p>
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-500">
              {n >= grupos.length * POR_GRUPO_COMPLETO
                ? `Exatamente ${POR_GRUPO_COMPLETO} princípios ativos de cada um dos ${grupos.length} grupos.`
                : `As questões são distribuídas da forma mais equilibrada possível entre os ${grupos.length} grupos.`}{' '}
              A ordem é embaralhada a cada rodada, e os principais representantes de cada grupo aparecem com mais frequência.
            </p>
          </Secao>

          <Secao titulo="Formato das respostas">
            <SeletorModo valor={modo} onChange={setModo} />
          </Secao>

          <label className={`cartao flex cursor-pointer items-start gap-3 p-4 ${errosAntigos ? '' : 'cursor-not-allowed opacity-60'}`}>
            <input type="checkbox" className="mt-1 h-5 w-5 accent-petroleo-600" checked={priorizar} disabled={!errosAntigos} onChange={(ev) => setPriorizar(ev.target.checked)} />
            <span>
              <span className="block font-semibold text-slate-900 dark:text-white">Priorizar o que eu errei</span>
              <span className="text-sm text-slate-500">{errosAntigos ? `Os ${errosAntigos} princípios ativos cujo grupo você já errou entram primeiro.` : 'Disponível depois que você errar alguma questão de grupo terapêutico.'}</span>
            </span>
          </label>

          <button className="btn-primario w-full py-3.5 text-base" onClick={novaRodada}><Icone nome="avancar" className="h-5 w-5" /> Iniciar desafio · {n} questões</button>

          {ultimas.length > 0 && (
            <Secao titulo="Suas últimas rodadas">
              <ul className="space-y-1.5 text-sm">
                {ultimas.map((d) => (
                  <li key={d.ts} className="flex items-center justify-between gap-3">
                    <span className="text-slate-500">{new Date(d.ts).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} · {d.total} questões</span>
                    <span className="font-semibold tabular-nums">{d.acertos}/{d.total} ({pct(d.acertos / d.total)})</span>
                  </li>
                ))}
              </ul>
            </Secao>
          )}
        </div>
      </Pagina>
    );
  }

  // ---------------- resultado ----------------
  if (fim && rodada) {
    const total = respostas.length;
    const acertos = respostas.filter((r) => r.resultado === 'certo').length;
    const parciais = respostas.filter((r) => r.resultado === 'parcial').length;
    const erros = total - acertos - parciais;
    const porGrupo = new Map<string, { acertos: number; total: number }>();
    for (const r of respostas) {
      const x = porGrupo.get(r.item.grupoId) ?? { acertos: 0, total: 0 };
      x.total++; if (r.resultado === 'certo') x.acertos++;
      porGrupo.set(r.item.grupoId, x);
    }
    const linhas = grupos.filter((g) => porGrupo.has(g.id)).map((g) => ({ id: g.id, nome: g.nomeCurto, ...porGrupo.get(g.id)! }))
      .sort((a, b) => a.acertos / a.total - b.acertos / b.total);
    const revisar = linhas.filter((l) => l.acertos / l.total < 0.7);
    const confusoes = respostas.filter((r) => r.resultado !== 'certo');
    const erradas = confusoes.map((r) => r.item);

    return (
      <Pagina estreita>
        <div className="surgir space-y-5">
          <div className="cartao p-6 sm:p-8">
            <p className="rotulo">{rodada.revisaoDeErros ? 'Desafio Geral · revisão dos erros' : 'Desafio Geral'}</p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Aproveitamento de {pct(total ? acertos / total : 0)}</h1>
            <Barra valor={total ? acertos / total : 0} className="mt-4 h-3" cor={acertos / total >= 0.7 ? 'bg-acerto-500' : 'bg-parcial-500'} />
            <div className="mt-5 grid grid-cols-2 gap-2.5 text-center sm:grid-cols-4">
              {[
                { r: 'respondidas', v: total, c: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100' },
                { r: 'acertos', v: acertos, c: 'bg-acerto-50 text-acerto-700 dark:bg-acerto-700/15 dark:text-acerto-100' },
                { r: 'parciais', v: parciais, c: 'bg-parcial-50 text-parcial-700 dark:bg-parcial-700/15 dark:text-parcial-100' },
                { r: 'erros', v: erros, c: 'bg-erro-50 text-erro-700 dark:bg-erro-700/15 dark:text-erro-100' },
              ].map((k) => <div key={k.r} className={`rounded-xl py-3 ${k.c}`}><p className="text-2xl font-bold">{k.v}</p><p className="text-xs opacity-80">{k.r}</p></div>)}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {erradas.length > 0 && <button className="btn-primario" onClick={() => comecar(erradas, true)}><Icone nome="repetir" className="h-4 w-4" /> Revisar meus erros ({erradas.length})</button>}
              <button className={erradas.length ? 'btn-secundario' : 'btn-primario'} onClick={() => { setFim(false); nav('/desafio'); }}>Nova rodada</button>
              <Link to="/" className="btn-fantasma">Módulos</Link>
            </div>
          </div>

          <Secao titulo="Acertos por grupo terapêutico">
            <GraficoGrupos linhas={linhas} />
          </Secao>

          {revisar.length > 0 && (
            <Secao titulo="Grupos que precisam de revisão">
              <ul className="space-y-2">
                {revisar.map((l) => (
                  <li key={l.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                    <span className="text-sm"><strong>{nomeGrupo(l.id)}</strong> <span className="text-slate-500">· {l.acertos}/{l.total}</span></span>
                    <Link to={`/modulo/${l.id}`} className="btn-secundario py-2 text-xs"><Icone nome="livro" className="h-4 w-4" /> Estudar este grupo</Link>
                  </li>
                ))}
              </ul>
            </Secao>
          )}

          <Secao titulo="O que você confundiu">
            {!confusoes.length ? <Vazio>Nenhuma confusão nesta rodada. Excelente!</Vazio> : (
              <ul className="divide-y divide-slate-100 text-sm dark:divide-slate-800">
                {confusoes.map((r, k) => (
                  <li key={k} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2.5">
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${r.resultado === 'parcial' ? 'bg-parcial-500' : 'bg-erro-500'}`} />
                    <span className="font-semibold">{banco.medicamentos.get(r.item.medId)?.nome}</span>
                    <span className="text-slate-500">você: <em>{r.resposta || '—'}</em> → <strong className="text-slate-700 dark:text-slate-200">{nomeGrupo(r.item.grupoId)}</strong></span>
                    <Link to={`/ficha/${r.item.medId}?g=${r.item.grupoId}`} className="ml-auto text-xs text-petroleo-700 underline dark:text-petroleo-300">ficha</Link>
                  </li>
                ))}
              </ul>
            )}
          </Secao>
        </div>
      </Pagina>
    );
  }

  // ---------------- rodada ----------------
  if (!rodada || !rodada.questoes.length) return <Pagina estreita><Vazio>Não há princípios ativos disponíveis para o desafio. <Link to="/" className="underline">Voltar</Link></Vazio></Pagina>;
  const q = rodada.questoes[i];
  const med = banco.medicamentos.get(q.medId)!;
  const item = rodada.itens[i];

  const aoCorrigir = (c: Correcao, resposta: string) => {
    const texto = q.formato === 'mc' ? q.alternativas![Number(resposta)] : resposta.trim();
    setRespostas((r) => [...r, { item, resultado: c.resultado, resposta: texto }]);
    const pts = registrarResposta(chaveItem(item.grupoId, item.medId, 'f1'), c.resultado, c.pontosFracao, q.formato, 'desafio');
    if (pts) avisar(`+${pts} pontos`, undefined, 'estrela');
  };
  const avancar = () => {
    if (i + 1 < rodada.questoes.length) { setI(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    if (!rodada.revisaoDeErros) {
      const porGrupo: Record<string, { acertos: number; total: number }> = {};
      for (const r of respostas) {
        const x = (porGrupo[r.item.grupoId] ??= { acertos: 0, total: 0 });
        x.total++; if (r.resultado === 'certo') x.acertos++;
      }
      registrarDesafio({
        total: respostas.length,
        acertos: respostas.filter((r) => r.resultado === 'certo').length,
        parciais: respostas.filter((r) => r.resultado === 'parcial').length,
        completo: respostas.length >= grupos.length * POR_GRUPO_COMPLETO,
        porGrupo,
      });
    }
    verificarConquistas().forEach((c) => avisar(`Conquista: ${c.titulo}`, c.descricao, c.icone));
    setFim(true);
    nav('/desafio/resultado', { replace: true });
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-6 lg:w-[70%] lg:px-0">
      {/* Cabeçalho — y 0–9% */}
      <div className="flex items-center justify-between pt-4">
        <button className="btn-fantasma -ml-3 px-3" onClick={() => { setRodada(null); nav('/desafio'); }}><Icone nome="voltar" className="h-4 w-4" /> Sair</button>
        <span className="text-sm text-slate-500">Questão {i + 1} de {rodada.questoes.length}</span>
      </div>
      {/* Progresso — y 11–17% */}
      <Barra valor={i / rodada.questoes.length} className="mx-auto mt-2 h-1.5 lg:w-[86%]" rotulo="Progresso no desafio" />
      <div key={i} className="surgir">
        {/* Princípio ativo — y 19–27% */}
        <div className="mt-6 text-center">
          <p className="rotulo">Desafio Geral · Grupo terapêutico</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-petroleo-900 sm:text-4xl dark:text-petroleo-100">{med.nome}</h1>
        </div>
        {/* Estrutura molecular — y 29–49% (x 30–70%) */}
        <div className="mx-auto mt-4 w-full sm:w-[80%] lg:w-[57%]"><Molecula med={med} compacta /></div>
        {/* Pergunta, alternativas e confirmação — y 51–96% */}
        <div className="mx-auto mt-6 w-full lg:w-[86%]">
          <QuestaoCard q={q} onCorrigido={aoCorrigir} acoes={() => (
            <button className="btn-primario sm:min-w-44" onClick={avancar}>{i + 1 < rodada.questoes.length ? 'Próxima questão' : 'Ver resultado'} <Icone nome="avancar" className="h-4 w-4" /></button>
          )} />
        </div>
      </div>
    </div>
  );
}
