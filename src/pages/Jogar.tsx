import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useBanco } from '../lib/hooks';
import { listarGrupos } from '../lib/grupos';
import { atualizar, concluirMedicamento, getEstado, medConcluido, registrarResposta, salvarPosicao, useEstado } from '../lib/progresso';
import { FASES_MODULO, formatoPara, gerarQuestao, NUMERO_FASE, ROTULO_FASE, ROTULO_FASE_CURTO, type Correcao, type Fase } from '../lib/questoes';
import { verificarConquistas } from '../lib/conquistas';
import { QuestaoCard } from '../components/QuestaoCard';
import { Molecula } from '../components/Molecula';
import { Ficha } from '../components/Ficha';
import { Barra, avisar, Vazio } from '../components/ui';
import { Icone } from '../components/Icone';
import { Pagina } from '../components/Layout';

type Etapa = Fase | 'ficha' | 'fim';
const PRIMEIRA: Fase = FASES_MODULO[0];
/** Posições e links antigos apontavam para a fase do grupo, que saiu das pastas. */
const ajustar = (et: string | null | undefined): Etapa => (!et || et === 'f1' ? PRIMEIRA : (et as Etapa));

export function Jogar() {
  const { g = '' } = useParams();
  const [sp] = useSearchParams();
  const nav = useNavigate();
  const banco = useBanco();
  const e = useEstado();
  const meds = banco.porGrupo.get(g) ?? [];
  const grupo = listarGrupos().find((x) => x.id === g);

  // ponto de partida: ?med= → posição salva → primeiro não concluído
  const inicial = useMemo(() => {
    const st = getEstado();
    const pedido = sp.get('med');
    if (pedido && meds.some((m) => m.id === pedido)) return { idx: meds.findIndex((m) => m.id === pedido), etapa: ajustar(sp.get('fase')) };
    const pos = st.posicao[g];
    if (pos && meds.some((m) => m.id === pos.medId)) return { idx: meds.findIndex((m) => m.id === pos.medId), etapa: ajustar(pos.fase) };
    const i = meds.findIndex((m) => !medConcluido(st, g, m.id));
    return { idx: i < 0 ? 0 : i, etapa: PRIMEIRA as Etapa };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [g, sp.get('med')]);

  const [idx, setIdx] = useState(inicial.idx);
  const [etapa, setEtapa] = useState<Etapa>(inicial.etapa);
  const [tentativa, setTentativa] = useState(0);
  const [respondida, setRespondida] = useState(false);
  const [fimInfo, setFimInfo] = useState<{ bonusPasta: number } | null>(null);
  useEffect(() => { setIdx(inicial.idx); setEtapa(inicial.etapa); }, [inicial]);

  const med = meds[idx];
  const fase = (FASES_MODULO as string[]).includes(etapa) ? (etapa as Fase) : null;
  const q = useMemo(() => (med && fase ? gerarQuestao(med, g, fase, formatoPara(e.modo, fase, idx)) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [med?.id, fase, tentativa, e.modo, g]);

  useEffect(() => { setRespondida(false); }, [q]);
  useEffect(() => { if (med && etapa !== 'fim') salvarPosicao(g, med.id, etapa as Fase | 'ficha'); }, [med?.id, etapa, g]);

  if (!grupo || !meds.length) return <Pagina estreita><Vazio>Nenhum medicamento disponível neste grupo. <Link to="/" className="underline">Voltar aos módulos</Link></Vazio></Pagina>;

  const aoCorrigir = (c: Correcao) => {
    setRespondida(true);
    const pts = registrarResposta(q!.chave, c.resultado, c.pontosFracao, q!.formato, 'estudo');
    if (pts > 0) avisar(`+${pts} pontos`, c.resultado === 'parcial' ? 'Resposta parcialmente correta' : 'Primeira tentativa correta', 'estrela');
  };

  const irPara = (et: Etapa) => {
    if (et === 'ficha' && med) {
      const r = concluirMedicamento(g, med.id, meds.map((m) => m.id));
      if (r.bonusMed) avisar(`+${r.bonusMed} pontos`, `${med.nome} concluído`, 'check');
      if (r.bonusPasta) avisar(`+${r.bonusPasta} pontos`, `Pasta concluída: ${grupo.nome}`, 'trofeu');
      verificarConquistas().forEach((c) => avisar(`Conquista: ${c.titulo}`, c.descricao, c.icone));
      if (r.pastaConcluida) setFimInfo({ bonusPasta: r.bonusPasta });
    }
    setEtapa(et);
    setTentativa((t) => t + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const proximoMed = () => {
    const st = getEstado();
    // próximo não concluído após o atual; senão, tela final
    const ordem = [...meds.slice(idx + 1), ...meds.slice(0, idx + 1)];
    const prox = ordem.find((m) => !medConcluido(st, g, m.id));
    if (!prox || fimInfo) { setEtapa('fim'); salvarPosicaoFim(); return; }
    setIdx(meds.indexOf(prox));
    setEtapa(PRIMEIRA);
    setTentativa((t) => t + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const salvarPosicaoFim = () => {
    // pasta concluída: não há posição para continuar
    atualizar((s) => { delete s.posicao[g]; });
  };

  const concluidos = meds.filter((m) => medConcluido(e, g, m.id)).length;
  const nEtapas = FASES_MODULO.length + 1;
  const faseIdx = fase ? FASES_MODULO.indexOf(fase) : etapa === 'ficha' ? FASES_MODULO.length : 0;
  const progresso = (concluidos + (medConcluido(e, g, med.id) ? 0 : faseIdx / nEtapas)) / meds.length;

  if (etapa === 'fim') {
    return (
      <Pagina estreita>
        <div className="cartao surgir p-8 text-center">
          <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-acerto-100 text-acerto-700"><Icone nome="trofeu" className="h-8 w-8" /></span>
          <h1 className="text-2xl font-bold">Pasta concluída: {grupo.nome}</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Você completou as fases de todos os {meds.length} princípios ativos.{fimInfo?.bonusPasta ? ` Bônus de ${fimInfo.bonusPasta} pontos!` : ''}</p>
          <p className="mt-1 text-sm text-slate-500">O Painel de Revisão Farmacológica e o simulado final estão desbloqueados e permanecerão acessíveis.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Link to={`/resumo/${g}`} className="btn-primario"><Icone nome="livro" className="h-4 w-4" /> Abrir resumo do grupo</Link>
            <Link to={`/simulado/${g}`} className="btn-secundario"><Icone nome="diploma" className="h-4 w-4" /> Fazer o simulado</Link>
            <Link to="/" className="btn-fantasma">Voltar aos módulos</Link>
          </div>
        </div>
      </Pagina>
    );
  }

  const proximaEtapa: Record<Fase, Etapa> = { f1: 'f2', f2: 'f3a', f3a: 'f3b', f3b: 'ficha' };
  const rotuloProx: Record<Fase, string> = { f1: 'Ir para a fase 1', f2: 'Ir para a fase 2A', f3a: 'Ir para a fase 2B', f3b: 'Ver ficha de revisão' };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-6 lg:w-[70%] lg:px-0">
      {/* Cabeçalho e navegação — y 0–9% */}
      <div className="flex items-center justify-between gap-2 pt-4">
        <Link to={`/modulo/${g}`} className="btn-fantasma -ml-3 px-3"><Icone nome="voltar" className="h-4 w-4" /> {grupo.nomeCurto}</Link>
        <span className="text-sm text-slate-500">Medicamento {idx + 1} de {meds.length}</span>
      </div>

      {/* Indicadores da fase — y 11–18% */}
      <div className="mt-2">
        <Barra valor={progresso} className="h-1.5" rotulo="Progresso no grupo" />
        <ol className="mt-3 grid grid-cols-4 gap-1.5 text-center text-[11px] font-medium sm:text-xs">
          {[...FASES_MODULO, 'ficha' as const].map((f, i) => {
            const atual = etapa === f;
            const feito = i < faseIdx;
            return (
              <li key={f} className={`rounded-lg px-1 py-1.5 transition ${atual ? 'bg-petroleo-700 text-white dark:bg-petroleo-400 dark:text-slate-950' : feito ? 'bg-petroleo-100 text-petroleo-800 dark:bg-petroleo-900/60 dark:text-petroleo-200' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`} aria-current={atual ? 'step' : undefined}>
                {f === 'ficha' ? 'Revisão' : <><span className="hidden sm:inline">{NUMERO_FASE[f]} · </span>{ROTULO_FASE_CURTO[f]}</>}
              </li>
            );
          })}
        </ol>
      </div>

      {etapa === 'ficha' ? (
        <div className="surgir mt-6 space-y-4">
          <Ficha med={med} grupoId={g} />
          <div className="sticky bottom-0 flex flex-wrap justify-end gap-2 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent pt-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] dark:from-slate-950 dark:via-slate-950">
            <button className="btn-secundario" onClick={() => irPara(PRIMEIRA)}><Icone nome="repetir" className="h-4 w-4" /> Refazer as fases</button>
            <button className="btn-secundario" onClick={() => nav('/')}>Voltar aos módulos</button>
            <button className="btn-primario" onClick={proximoMed}>{fimInfo ? 'Concluir pasta' : 'Próximo princípio ativo'} <Icone nome="avancar" className="h-4 w-4" /></button>
          </div>
        </div>
      ) : (
        q && (
          <div key={`${med.id}-${etapa}-${tentativa}`} className="surgir">
            {/* Nome do princípio ativo — y 20–27% */}
            <div className="mt-6 text-center">
              <p className="rotulo">{ROTULO_FASE[fase!]}</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-petroleo-900 sm:text-4xl dark:text-petroleo-100">{med.nome}</h1>
            </div>
            {/* Representação molecular — y 28–49% (x 30–70%) */}
            <div className="mx-auto mt-4 w-full sm:w-[80%] lg:w-[57%]">
              <Molecula med={med} />
            </div>
            {/* Enunciado + alternativas + confirmação — y 51–96% */}
            <div className="mx-auto mt-6 w-full lg:w-[86%]">
              <QuestaoCard
                q={q}
                onCorrigido={aoCorrigir}
                acoes={(c) => (
                  <>
                    <button className="btn-secundario" onClick={() => setTentativa((t) => t + 1)}><Icone nome="repetir" className="h-4 w-4" /> Repetir fase</button>
                    <button className="btn-primario sm:min-w-44" onClick={() => irPara(proximaEtapa[fase!])} disabled={!respondida}>
                      {rotuloProx[fase!]} <Icone nome="avancar" className="h-4 w-4" />
                    </button>
                    {c.resultado !== 'certo' && <p className="w-full text-right text-xs text-slate-500">Você pode avançar ou repetir a fase. A questão errada entra na sua revisão espaçada.</p>}
                  </>
                )}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
}
