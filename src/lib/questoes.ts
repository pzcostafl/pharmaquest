// Geração das questões a partir do banco farmacológico.
import type { GrupoId, Medicamento } from '../data/types';
import { getBanco, marcasNoGrupo, vinculoNoGrupo } from '../data/banco';
import { listarGrupos } from './grupos';
import { compararFormas, conceitosEncontrados, normalizar, type Conceito } from './corretor';

export type Fase = 'f1' | 'f2' | 'f3a' | 'f3b';
export type Formato = 'mc' | 'dis';
export const FASES: Fase[] = ['f1', 'f2', 'f3a', 'f3b'];
export const ROTULO_FASE: Record<Fase, string> = {
  f1: 'Fase 1 · Grupo terapêutico',
  f2: 'Fase 2 · Classe farmacológica',
  f3a: 'Fase 3A · Nomes comerciais',
  f3b: 'Fase 3B · Efeitos adversos',
};
export const ROTULO_FASE_CURTO: Record<Fase, string> = { f1: 'Grupo', f2: 'Classe', f3a: 'Marcas', f3b: 'Efeitos' };

export interface Questao {
  chave: string; // grupo:med:fase
  grupoId: GrupoId;
  medId: string;
  fase: Fase;
  formato: Formato;
  enunciado: string;
  dica?: string;
  alternativas?: string[];
  correta?: number;
  explicacao: string;
}

export type Resultado = 'certo' | 'parcial' | 'errado';
export interface Correcao {
  resultado: Resultado;
  pontosFracao: number; // 0..1 (1 = 100 pts, parcial até 0,5)
  mensagem: string;
  esperado: string;
}

export const chaveItem = (g: string, m: string, f: Fase) => `${g}|${m}|${f}`;
export function parseChave(k: string) {
  const [grupoId, medId, fase] = k.split('|');
  return { grupoId, medId, fase: fase as Fase };
}

function embaralhar<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const pegar = <T,>(arr: T[], n: number) => embaralhar(arr).slice(0, n);

function nomeClasse(id: string) {
  const c = getBanco().classes.get(id);
  if (!c) return id;
  return c.sigla && !c.nome.includes(c.sigla) ? `${c.nome} (${c.sigla})` : c.nome;
}

function montarMC(correta: string, distratores: string[]): { alternativas: string[]; correta: number } {
  const vistos = new Set([normalizar(correta)]);
  const ds: string[] = [];
  for (const d of embaralhar(distratores)) {
    const n = normalizar(d);
    if (vistos.has(n)) continue;
    vistos.add(n);
    ds.push(d);
    if (ds.length === 3) break;
  }
  const alternativas = embaralhar([correta, ...ds]);
  return { alternativas, correta: alternativas.indexOf(correta) };
}

export function gerarQuestao(m: Medicamento, g: GrupoId, fase: Fase, formato: Formato): Questao {
  const banco = getBanco();
  const grupos = listarGrupos();
  const v = vinculoNoGrupo(m, g);
  const multi = m.vinculos.length > 1;
  const base = { chave: chaveItem(g, m.id, fase), grupoId: g, medId: m.id, fase, formato };
  const nomeGrupo = grupos.find((x) => x.id === g)?.nome ?? g;

  if (fase === 'f1') {
    const enunciado = multi
      ? `Considerando o uso do ${m.nome.toLowerCase()} no(a) ${v.contexto}, a qual grupo terapêutico ele pertence?`
      : `A qual grupo terapêutico pertence o(a) ${m.nome.toLowerCase()}?`;
    const q: Questao = { ...base, enunciado, explicacao: v.explicacaoFase1 };
    if (formato === 'mc') {
      const proprios = new Set(m.vinculos.map((x) => x.grupoId));
      const ds = grupos.filter((x) => !proprios.has(x.id)).map((x) => x.nome);
      Object.assign(q, montarMC(nomeGrupo, ds));
    } else q.dica = 'Ex.: "anti-inflamatório", "antibiótico"…';
    return q;
  }

  if (fase === 'f2') {
    const enunciado = `Dentro do grupo ${nomeGrupo.toLowerCase()}, a qual classe farmacológica pertence o(a) ${m.nome.toLowerCase()}?`;
    const q: Questao = { ...base, enunciado, explicacao: m.explicacaoFase2 };
    if (formato === 'mc') {
      const mesmoGrupo = [...banco.classes.values()].filter((c) => c.grupoId === g && c.id !== v.classeId);
      const cl = banco.classes.get(v.classeId);
      // prioriza classes da mesma família (mais plausíveis)
      const mesmaFam = mesmoGrupo.filter((c) => cl?.familia && c.familia === cl.familia);
      let ds = [...pegar(mesmaFam, 2), ...embaralhar(mesmoGrupo)].map((c) => nomeClasse(c.id));
      if (new Set(ds).size < 3) ds = ds.concat([...banco.classes.values()].filter((c) => c.id !== v.classeId).map((c) => nomeClasse(c.id)));
      // não usar como distrator outra classe a que o fármaco também pertença
      const propria = new Set(m.vinculos.map((x) => nomeClasse(x.classeId)));
      Object.assign(q, montarMC(nomeClasse(v.classeId), ds.filter((d) => !propria.has(d)).slice(0, 12)));
    } else q.dica = 'Pode usar a sigla (ex.: IECA, ISRS, AINE) ou o nome por extenso.';
    return q;
  }

  if (fase === 'f3a') {
    const marcas = marcasNoGrupo(m, g);
    const q: Questao = {
      ...base,
      enunciado:
        formato === 'mc'
          ? `Qual dos nomes comerciais abaixo corresponde a um produto contendo ${m.nome.toLowerCase()}?`
          : `Escreva um ou mais nomes comerciais de produtos que contêm ${m.nome.toLowerCase()}.`,
      explicacao: m.explicacaoFase3,
    };
    if (formato === 'mc') {
      const correta = pegar(marcas.filter((x) => x.tipo !== 'combinacao'), 1)[0] ?? pegar(marcas, 1)[0];
      const nomeM = normalizar(m.nome);
      const proprias = new Set(m.nomesComerciais.map((x) => normalizar(x.nome)));
      const pool = (banco.porGrupo.get(g) ?? []).filter((o) => o.id !== m.id);
      let ds = pool.flatMap((o) => o.nomesComerciais)
        .filter((x) => !proprias.has(normalizar(x.nome)) && !normalizar(x.composicao ?? '').includes(nomeM))
        .map((x) => x.nome);
      if (ds.length < 3) {
        ds = ds.concat([...banco.porGrupo.values()].flat().filter((o) => o.id !== m.id).flatMap((o) => o.nomesComerciais)
          .filter((x) => !proprias.has(normalizar(x.nome)) && !normalizar(x.composicao ?? '').includes(nomeM)).map((x) => x.nome));
      }
      Object.assign(q, montarMC(correta.nome, ds));
    } else q.dica = 'Basta um nome correto; marcas de associações também valem.';
    return q;
  }

  // f3b
  const q: Questao = {
    ...base,
    enunciado:
      formato === 'mc'
        ? `Qual dos efeitos adversos abaixo é caracteristicamente associado ao uso de ${m.nome.toLowerCase()}?`
        : `Cite dois ou três efeitos adversos relevantes associados ao(à) ${m.nome.toLowerCase()}.`,
    explicacao: m.explicacaoFase3,
  };
  if (formato === 'mc') Object.assign(q, montarMC(m.eaCaracteristico, m.distratoresEA));
  else q.dica = 'Separe por vírgulas. Termos leigos equivalentes são aceitos.';
  return q;
}

/** Corrige uma resposta. Para múltipla escolha, `resposta` é o índice da alternativa (string). */
export function corrigir(q: Questao, resposta: string): Correcao {
  const banco = getBanco();
  const m = banco.medicamentos.get(q.medId)!;
  const g = q.grupoId;
  const v = vinculoNoGrupo(m, g);
  const grupos = listarGrupos();
  const cl = banco.classes.get(v.classeId);

  const esperado = (() => {
    switch (q.fase) {
      case 'f1': return m.vinculos.map((x) => grupos.find((y) => y.id === x.grupoId)?.nome ?? x.grupoId).join(' · ');
      case 'f2': return nomeClasse(v.classeId) + (v.subclasse ? ` — ${v.subclasse}` : '');
      case 'f3a': return marcasNoGrupo(m, g).map((x) => x.nome).join(', ');
      case 'f3b': return [...m.eaComuns, ...m.eaGraves].map((x) => x.termo).join(', ');
    }
  })();

  if (q.formato === 'mc') {
    const ok = Number(resposta) === q.correta;
    return {
      resultado: ok ? 'certo' : 'errado',
      pontosFracao: ok ? 1 : 0,
      mensagem: ok ? 'Resposta correta!' : `Resposta incorreta. A alternativa correta é: ${q.alternativas![q.correta!]}.`,
      esperado,
    };
  }

  const r = resposta.trim();
  if (!r) return { resultado: 'errado', pontosFracao: 0, mensagem: 'Resposta em branco.', esperado };

  if (q.fase === 'f1') {
    for (const x of m.vinculos) {
      const gm = grupos.find((y) => y.id === x.grupoId);
      if (!gm) continue;
      const res = compararFormas(r, [gm.nome, gm.nomeCurto, ...gm.sinonimos]);
      if (res.score === 1) {
        const outro = x.grupoId !== g ? ` (Neste módulo, o foco é: ${grupos.find((y) => y.id === g)?.nome}.)` : '';
        return { resultado: 'certo', pontosFracao: 1, mensagem: `Correto — ${gm.nome}.${outro}`, esperado };
      }
    }
    // respondeu a classe em vez do grupo?
    if (cl && compararFormas(r, [cl.nome, cl.sigla ?? '', ...cl.sinonimos].filter(Boolean)).score === 1) {
      return { resultado: 'parcial', pontosFracao: 0.5, mensagem: `Você citou a CLASSE farmacológica (${nomeClasse(cl.id)}), que está correta, mas a pergunta pede o GRUPO terapêutico: ${esperado}.`, esperado };
    }
    return { resultado: 'errado', pontosFracao: 0, mensagem: `Não reconheci um grupo terapêutico compatível. Esperado: ${esperado}.`, esperado };
  }

  if (q.fase === 'f2') {
    const formasDe = (id: string) => {
      const c = banco.classes.get(id);
      return c ? [c.nome, c.sigla ?? '', ...c.sinonimos].filter(Boolean) : [id];
    };
    const ids = [v.classeId, ...m.vinculos.map((x) => x.classeId).filter((x) => x !== v.classeId)];
    for (const id of ids) {
      const res = compararFormas(r, formasDe(id));
      if (res.score === 1) {
        const sub = v.subclasse && compararFormas(r, [v.subclasse]).score < 1 ? ` Subclasse: ${v.subclasse}.` : '';
        return { resultado: 'certo', pontosFracao: 1, mensagem: `Correto — ${nomeClasse(id)}.${sub}`, esperado };
      }
    }
    // respondeu o grupo em vez da classe?
    const gm = grupos.find((y) => y.id === g);
    if (gm && compararFormas(r, [gm.nome, ...gm.sinonimos]).score === 1) {
      return { resultado: 'errado', pontosFracao: 0, mensagem: `Isso é o GRUPO terapêutico. A pergunta pede a CLASSE farmacológica (mecanismo): ${esperado}.`, esperado };
    }
    // acertou apenas a subclasse ou a família?
    if (v.subclasse && compararFormas(r, [v.subclasse]).score === 1) {
      return { resultado: 'parcial', pontosFracao: 0.5, mensagem: `Você acertou a subclasse (${v.subclasse}), mas faltou nomear a classe: ${nomeClasse(v.classeId)}.`, esperado };
    }
    if (cl?.familia && compararFormas(r, [cl.familia.replace(/^.*—\s*/, '')]).score === 1) {
      return { resultado: 'parcial', pontosFracao: 0.4, mensagem: `Você indicou a família (${cl.familia}), mas a classe específica é: ${nomeClasse(cl.id)}.`, esperado };
    }
    const parcial = compararFormas(r, formasDe(v.classeId));
    if (parcial.score >= 0.5) {
      return { resultado: 'parcial', pontosFracao: 0.5 * parcial.score, mensagem: `Parcialmente correto: há termos-chave da classe, mas a denominação está incompleta. Forma completa: ${esperado}.`, esperado };
    }
    // confundiu com outra classe?
    for (const c of banco.classes.values()) {
      if (c.id !== v.classeId && compararFormas(r, [c.nome, c.sigla ?? '', ...c.sinonimos].filter(Boolean)).score === 1) {
        return { resultado: 'errado', pontosFracao: 0, mensagem: `Você respondeu ${nomeClasse(c.id)}, mas o(a) ${m.nome.toLowerCase()} é ${esperado}.`, esperado };
      }
    }
    return { resultado: 'errado', pontosFracao: 0, mensagem: `Resposta não corresponde à classe. Esperado: ${esperado}.`, esperado };
  }

  if (q.fase === 'f3a') {
    const marcas: Conceito[] = marcasNoGrupo(m, g).map((x) => ({ rotulo: x.nome, formas: [] }));
    const { achados } = conceitosEncontrados(r, marcas);
    if (achados.length) {
      return { resultado: 'certo', pontosFracao: 1, mensagem: `Correto: ${achados.map((a) => a.rotulo).join(', ')}.`, esperado };
    }
    if (compararFormas(r, [m.nome, ...m.sinonimos]).score === 1) {
      return { resultado: 'parcial', pontosFracao: 0.25, mensagem: `Você escreveu o princípio ativo (o nome do genérico). A pergunta pede nomes comerciais, como: ${esperado}.`, esperado };
    }
    return { resultado: 'errado', pontosFracao: 0, mensagem: `Nome comercial não reconhecido para este princípio ativo. Exemplos: ${esperado}.`, esperado };
  }

  // f3b — efeitos adversos
  const todos = [...m.eaComuns, ...m.eaGraves];
  const conceitos: Conceito[] = todos.map((t) => ({ rotulo: t.termo, formas: t.sinonimos }));
  const { achados, parciais } = conceitosEncontrados(r, conceitos);
  const falsos = conceitosEncontrados(r, m.distratoresEA.map((d) => ({ rotulo: d, formas: [] }))).achados;
  const aviso = falsos.length ? ` Atenção: "${falsos.map((f) => f.rotulo).join('", "')}" não é efeito típico deste fármaco.` : '';
  if (achados.length >= 2) {
    return { resultado: 'certo', pontosFracao: 1, mensagem: `Correto: ${achados.map((a) => a.rotulo).join(', ')}.${aviso}`, esperado };
  }
  if (achados.length === 1) {
    return { resultado: 'parcial', pontosFracao: 0.5, mensagem: `Parcialmente correto: você citou ${achados[0].rotulo}. Faltou pelo menos mais um efeito relevante (ex.: ${todos.filter((t) => t.termo !== achados[0].rotulo).slice(0, 3).map((t) => t.termo).join(', ')}).${aviso}`, esperado };
  }
  if (parciais.length) {
    return { resultado: 'parcial', pontosFracao: 0.25, mensagem: `Há termos relacionados a ${parciais.map((p) => p.rotulo).join(', ')}, mas a descrição ficou incompleta.${aviso}`, esperado };
  }
  return { resultado: 'errado', pontosFracao: 0, mensagem: `Nenhum efeito adverso característico reconhecido.${aviso}`, esperado };
}

/** Formato da fase de acordo com a configuração. No modo misto, alterna entre as fases e os medicamentos. */
export function formatoPara(modo: 'mc' | 'dis' | 'misto', fase: Fase, indiceMed: number): Formato {
  if (modo !== 'misto') return modo;
  return (FASES.indexOf(fase) + indiceMed) % 2 === 0 ? 'mc' : 'dis';
}

/** Questão "inversa" para o simulado: dada a classe, escolher o fármaco. */
export function gerarQuestaoInversa(m: Medicamento, g: GrupoId): Questao | null {
  const banco = getBanco();
  const v = vinculoNoGrupo(m, g);
  const outros = (banco.porGrupo.get(g) ?? []).filter((o) => vinculoNoGrupo(o, g).classeId !== v.classeId);
  if (outros.length < 3) return null;
  return {
    chave: chaveItem(g, m.id, 'f2'),
    grupoId: g, medId: m.id, fase: 'f2', formato: 'mc',
    enunciado: `Qual dos princípios ativos abaixo pertence à classe ${nomeClasse(v.classeId)}?`,
    ...montarMC(m.nome, outros.map((o) => o.nome)),
    explicacao: m.explicacaoFase2,
  };
}
