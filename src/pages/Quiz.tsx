import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useBanco } from '../lib/hooks';
import { atualizar, getEstado, registrarResposta, useEstado, type EventoHist } from '../lib/progresso';
import { FASES_MODULO, chaveItem, formatoPara, gerarQuestao, gerarQuestaoInversa, parseChave, ROTULO_FASE, type Correcao, type Questao, type Resultado } from '../lib/questoes';
import { selecionarRevisao, verificarConquistas } from '../lib/conquistas';
import { listarGrupos } from '../lib/grupos';
import { QuestaoCard } from '../components/QuestaoCard';
import { Molecula } from '../components/Molecula';
import { Barra, avisar, pct, Vazio } from '../components/ui';
import { Icone } from '../components/Icone';
import { Pagina } from '../components/Layout';
import type { Banco } from '../data/banco';

function embaralhar<T>(a: T[]) { return [...a].sort(() => Math.random() - 0.5); }

function montarQuestoes(banco: Banco, chaves: string[], modo: 'mc' | 'dis' | 'misto'): Questao[] {
  return chaves.flatMap((k, i) => {
    const { grupoId, medId, fase } = parseChave(k);
    const m = banco.medicamentos.get(medId);
    if (!m || !(banco.porGrupo.get(grupoId) ?? []).includes(m)) return [];
    return [gerarQuestao(m, grupoId, fase, formatoPara(modo, fase, i))];
  });
}

/** Simulado final: questões variadas de todo o grupo (inclui questões inversas). */
function montarSimulado(banco: Banco, g: string, n: number, modo: 'mc' | 'dis' | 'misto'): Questao[] {
  const meds = embaralhar(banco.porGrupo.get(g) ?? []);
  const qs: Questao[] = [];
  let i = 0;
  while (qs.length < n && i < n * 3) {
    const m = meds[i % meds.length];
    const tipo = i % 5;
    if (tipo === 4) {
      const inv = gerarQuestaoInversa(m, g);
      if (inv) qs.push(inv);
    } else {
      const fase = FASES_MODULO[(i + Math.floor(i / meds.length)) % FASES_MODULO.length];
      qs.push(gerarQuestao(m, g, fase, formatoPara(modo, fase, i)));
    }
    i++;
  }
  return qs;
}

export function Quiz({ simulado = false }: { simulado?: boolean }) {
  const banco = useBanco();
  const e = useEstado();
  const [sp] = useSearchParams();
  const params = useParams();
  const g = simulado ? params.g ?? '' : sp.get('g') ?? '';
  const tipo = simulado ? 'simulado' : sp.get('tipo') ?? 'revisao';
  const n = Number(sp.get('n') ?? (simulado ? 20 : 10));
  const grupo = listarGrupos().find((x) => x.id === g);
  const [sessao, setSessao] = useState(0);

  const questoes = useMemo(() => {
    const st = getEstado();
    if (tipo === 'simulado') return montarSimulado(banco, g, n, st.modo);
    let chaves: string[] = [];
    if (tipo === 'erradas') {
      const meds = (banco.porGrupo.get(g) ?? []).map((m) => m.id);
      chaves = meds.flatMap((m) => FASES_MODULO.map((f) => chaveItem(g, m, f))).filter((k) => st.itens[k] && st.itens[k].ultimo !== 'certo');
    } else if (tipo === 'salvas') chaves = [...st.salvas];
    else if (tipo === 'efeitos') chaves = Object.keys(st.itens).filter((k) => k.endsWith('|f3b') && st.itens[k].ultimo !== 'certo');
    else if (tipo === 'med') {
      const med = sp.get('med')!;
      chaves = Object.keys(st.itens).filter((k) => parseChave(k).medId === med);
      if (!chaves.length) { const m = banco.medicamentos.get(med); if (m) chaves = FASES_MODULO.map((f) => chaveItem(m.vinculos[0].grupoId, med, f)); }
    } else if (tipo === 'classe') {
      const cl = sp.get('classe');
      chaves = Object.keys(st.itens).filter((k) => {
        const { medId, grupoId } = parseChave(k);
        const m = banco.medicamentos.get(medId);
        return m?.vinculos.some((v) => v.grupoId === grupoId && v.classeId === cl);
      });
    } else chaves = selecionarRevisao(st, n, g || undefined);
    return montarQuestoes(banco, embaralhar(chaves).slice(0, tipo === 'revisao' ? n : 60), st.modo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipo, g, n, sessao]);

  const [i, setI] = useState(0);
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [fim, setFim] = useState(false);

  const titulo = tipo === 'simulado' ? `Simulado final — ${grupo?.nome}` : tipo === 'erradas' ? `Questões erradas — ${grupo?.nomeCurto}` : tipo === 'salvas' ? 'Questões salvas' : tipo === 'efeitos' ? 'Efeitos adversos a memorizar' : tipo === 'classe' ? `Revisão da classe ${banco.classes.get(sp.get('classe') ?? '')?.sigla ?? ''}` : tipo === 'med' ? `Revisão: ${banco.medicamentos.get(sp.get('med') ?? '')?.nome}` : `Revisão rápida (${n} questões)`;

  if (simulado && !e.gruposConcluidos[g]) {
    return <Pagina estreita><Vazio>O simulado final é desbloqueado ao concluir todos os medicamentos da pasta. <Link to={`/modulo/${g}`} className="underline">Ir para o módulo</Link></Vazio></Pagina>;
  }
  if (!questoes.length) {
    return <Pagina estreita><Vazio>Não há questões para esta revisão no momento. {tipo === 'revisao' && 'Estude alguns medicamentos primeiro — as questões respondidas entram na repetição espaçada.'} <Link to="/revisao" className="underline">Voltar</Link></Vazio></Pagina>;
  }

  const origem: EventoHist['origem'] = tipo === 'simulado' ? 'simulado' : tipo === 'erradas' ? 'erradas' : 'revisao';
  const q = questoes[i];
  const med = banco.medicamentos.get(q.medId)!;

  const aoCorrigir = (c: Correcao) => {
    setResultados((r) => [...r, c.resultado]);
    const pts = registrarResposta(q.chave, c.resultado, c.pontosFracao, q.formato, origem);
    if (pts) avisar(`+${pts} pontos`, undefined, 'estrela');
  };
  const avancar = () => {
    if (i + 1 < questoes.length) { setI(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const acertos = [...resultados].filter((r) => r === 'certo').length;
    atualizar((s) => {
      if (tipo === 'simulado') s.simulados.push({ ts: Date.now(), grupoId: g, acertos, total: questoes.length });
      if (tipo === 'revisao') s.revisoesRapidas++;
    });
    verificarConquistas().forEach((c) => avisar(`Conquista: ${c.titulo}`, c.descricao, c.icone));
    setFim(true);
  };

  if (fim) {
    const ac = resultados.filter((r) => r === 'certo').length;
    const pa = resultados.filter((r) => r === 'parcial').length;
    return (
      <Pagina estreita>
        <div className="cartao surgir p-6 sm:p-8">
          <p className="rotulo">{titulo}</p>
          <h1 className="mt-1 text-2xl font-bold">Resultado: {ac}/{questoes.length} corretas{pa ? ` · ${pa} parciais` : ''}</h1>
          <Barra valor={ac / questoes.length} className="mt-4 h-2.5" cor={ac / questoes.length >= 0.7 ? 'bg-acerto-500' : 'bg-parcial-500'} />
          <p className="mt-2 text-sm text-slate-500">Aproveitamento de {pct(ac / questoes.length)}. As questões erradas foram reagendadas na repetição espaçada.</p>
          <ul className="mt-5 divide-y divide-slate-100 text-sm dark:divide-slate-800">
            {questoes.map((x, k) => (
              <li key={k} className="flex items-center gap-3 py-2">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${resultados[k] === 'certo' ? 'bg-acerto-500' : resultados[k] === 'parcial' ? 'bg-parcial-500' : 'bg-erro-500'}`} />
                <span className="font-medium">{banco.medicamentos.get(x.medId)?.nome}</span>
                <span className="text-slate-500">{ROTULO_FASE[x.fase]}</span>
                <Link to={`/ficha/${x.medId}?g=${x.grupoId}`} className="ml-auto text-xs text-petroleo-700 underline dark:text-petroleo-300">ficha</Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            <button className="btn-primario" onClick={() => { setI(0); setResultados([]); setFim(false); setSessao((s) => s + 1); }}><Icone nome="repetir" className="h-4 w-4" /> Nova sessão</button>
            <Link to={simulado ? `/resumo/${g}` : '/revisao'} className="btn-secundario">{simulado ? 'Voltar ao resumo' : 'Minha Revisão'}</Link>
            <Link to="/" className="btn-fantasma">Módulos</Link>
          </div>
        </div>
      </Pagina>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-6 lg:w-[70%] lg:px-0">
      <div className="flex items-center justify-between pt-4">
        <Link to={simulado ? `/resumo/${g}` : '/revisao'} className="btn-fantasma -ml-3 px-3"><Icone nome="voltar" className="h-4 w-4" /> Sair</Link>
        <span className="text-sm text-slate-500">Questão {i + 1} de {questoes.length}</span>
      </div>
      <Barra valor={i / questoes.length} className="mt-2 h-1.5" />
      <div key={`${sessao}-${i}`} className="surgir">
        <div className="mt-6 text-center">
          <p className="rotulo">{titulo} · {ROTULO_FASE[q.fase]}</p>
          {!q.enunciado.startsWith('Qual dos princípios ativos') && <h1 className="mt-1 text-3xl font-bold text-petroleo-900 dark:text-petroleo-100">{med.nome}</h1>}
        </div>
        {!q.enunciado.startsWith('Qual dos princípios ativos') && <div className="mx-auto mt-4 w-full sm:w-[80%] lg:w-[57%]"><Molecula med={med} compacta /></div>}
        <div className="mx-auto mt-6 w-full lg:w-[86%]">
          <QuestaoCard q={q} onCorrigido={aoCorrigir} acoes={() => (
            <button className="btn-primario sm:min-w-44" onClick={avancar}>{i + 1 < questoes.length ? 'Próxima questão' : 'Ver resultado'} <Icone nome="avancar" className="h-4 w-4" /></button>
          )} />
        </div>
      </div>
    </div>
  );
}
