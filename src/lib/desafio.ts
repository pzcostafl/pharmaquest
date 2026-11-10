// Desafio Geral: princípios ativos de todos os grupos, embaralhados, para identificar o grupo terapêutico.
import type { Banco } from '../data/banco';
import type { Medicamento } from '../data/types';
import { listarGrupos } from './grupos';
import { chaveItem, gerarQuestao, type Questao } from './questoes';
import type { Estado, Modo } from './progresso';

export const POR_GRUPO_COMPLETO = 5;
export const TAMANHOS = [10, 20, 30, 55] as const;

/**
 * Representantes de cada grupo, em ordem de prioridade (relevância clínica e frequência de uso).
 * Os 5 primeiros são os "principais"; os seguintes entram às vezes, para variar as rodadas.
 * Só referencia fármacos já cadastrados; o que não estiver jogável é ignorado.
 */
export const PRINCIPAIS: Record<string, string[]> = {
  analgesicos: ['paracetamol', 'dipirona', 'morfina', 'tramadol', 'codeina', 'fentanila', 'oxicodona'],
  antiinflamatorios: ['ibuprofeno', 'diclofenaco', 'nimesulida', 'prednisona', 'dexametasona', 'cetoprofeno', 'naproxeno', 'meloxicam', 'celecoxibe', 'prednisolona'],
  antihipertensivos: ['losartana', 'enalapril', 'captopril', 'anlodipino', 'hidroclorotiazida', 'atenolol', 'propranolol', 'carvedilol', 'furosemida', 'espironolactona'],
  antimicrobianos: ['amoxicilina', 'azitromicina', 'cefalexina', 'ciprofloxacino', 'sulfametoxazol-trimetoprima', 'ceftriaxona', 'metronidazol', 'fluconazol', 'aciclovir', 'doxiciclina'],
  antidepressivos: ['fluoxetina', 'sertralina', 'escitalopram', 'amitriptilina', 'clonazepam', 'alprazolam', 'diazepam', 'venlafaxina', 'bupropiona', 'duloxetina'],
  broncodilatadores: ['salbutamol', 'fenoterol', 'formoterol', 'ipratropio', 'tiotropio', 'salmeterol', 'budesonida', 'beclometasona', 'montelucaste', 'teofilina'],
  gastro: ['omeprazol', 'pantoprazol', 'esomeprazol', 'hidroxido-de-aluminio', 'sucralfato', 'lansoprazol', 'hidroxido-de-magnesio', 'alginato-de-sodio'],
  antidiabeticos: ['metformina', 'glibenclamida', 'gliclazida', 'insulina-nph', 'dapagliflozina', 'sitagliptina', 'empagliflozina', 'insulina-regular', 'insulina-glargina', 'glimepirida'],
  hipolipemiantes: ['sinvastatina', 'atorvastatina', 'rosuvastatina', 'ezetimiba', 'fenofibrato', 'ciprofibrato', 'bezafibrato', 'pravastatina'],
  obesidade: ['orlistate', 'sibutramina', 'liraglutida', 'semaglutida', 'tirzepatida'],
  oncologicos: ['tamoxifeno', 'cisplatina', 'ciclofosfamida', 'doxorrubicina', 'paclitaxel', 'fluorouracila', 'imatinibe', 'vincristina', 'anastrozol', 'trastuzumabe', 'carboplatina'],
};

export interface ItemDesafio { grupoId: string; medId: string }

/** Grupos que entram no desafio (os que têm medicamentos jogáveis). */
export const gruposDoDesafio = (banco: Banco) => listarGrupos().filter((g) => (banco.porGrupo.get(g.id)?.length ?? 0) > 0);

/** Quantas questões cada grupo recebe: exatamente 5 na rodada completa; equilibrado e aleatório nas menores. */
export function cotas(grupos: string[], n: number): Record<string, number> {
  const base = Math.floor(n / grupos.length);
  const extras = new Set(embaralhar(grupos).slice(0, n % grupos.length));
  return Object.fromEntries(grupos.map((g) => [g, base + (extras.has(g) ? 1 : 0)]));
}

function embaralhar<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Sorteio ponderado sem reposição (Efraimidis–Spirakis). */
function sortearPonderado<T>(itens: { v: T; peso: number }[], n: number): T[] {
  return itens
    .filter((x) => x.peso > 0)
    .map((x) => ({ v: x.v, chave: Math.random() ** (1 / x.peso) }))
    .sort((a, b) => b.chave - a.chave)
    .slice(0, n)
    .map((x) => x.v);
}

/** O aluno já errou (ou acertou só em parte) o grupo deste fármaco? */
function errouGrupo(e: Estado, m: Medicamento) {
  return m.vinculos.some((v) => {
    const it = e.itens[chaveItem(v.grupoId, m.id, 'f1')];
    return it && it.ultimo !== 'certo';
  });
}

/**
 * Monta a rodada. Os principais têm peso alto e os secundários entram às vezes, para variar.
 * Com `priorizarErros`, os fármacos cujo grupo o aluno já errou ganham prioridade.
 * Fármacos de mais de um grupo não se repetem na mesma rodada.
 */
export function selecionarDesafio(banco: Banco, e: Estado, n: number, priorizarErros: boolean): ItemDesafio[] {
  const grupos = gruposDoDesafio(banco).map((g) => g.id);
  const cota = cotas(grupos, n);
  const usados = new Set<string>();
  const itens: ItemDesafio[] = [];
  // grupos com menos opções escolhem primeiro, para não perderem fármacos compartilhados
  const ordem = [...grupos].sort((a, b) => (banco.porGrupo.get(a)?.length ?? 0) - (banco.porGrupo.get(b)?.length ?? 0));
  for (const g of ordem) {
    const lista = PRINCIPAIS[g] ?? [];
    const candidatos = (banco.porGrupo.get(g) ?? []).filter((m) => !usados.has(m.id)).map((m) => {
      const pos = lista.indexOf(m.id);
      let peso = pos < 0 ? 1 : pos < POR_GRUPO_COMPLETO ? 12 : 3;
      if (m.vinculos.length > 1 && pos < 0) peso = 0.2; // compartilhado e pouco típico deste grupo
      return { v: m, peso, errou: priorizarErros && errouGrupo(e, m) };
    });
    // os que o aluno errou entram primeiro; o restante da cota segue o sorteio ponderado
    const errados = sortearPonderado(candidatos.filter((c) => c.errou), cota[g]);
    const resto = sortearPonderado(candidatos.filter((c) => !c.errou), cota[g] - errados.length);
    for (const m of [...errados, ...resto]) {
      usados.add(m.id);
      itens.push({ grupoId: g, medId: m.id });
    }
  }
  return embaralhar(itens);
}

/** Gera as questões (só a fase do grupo terapêutico). No modo misto, alterna os formatos. */
export function questoesDoDesafio(banco: Banco, itens: ItemDesafio[], modo: Modo): Questao[] {
  return itens.flatMap((it, i) => {
    const m = banco.medicamentos.get(it.medId);
    if (!m) return [];
    return [gerarQuestao(m, it.grupoId, 'f1', modo === 'misto' ? (i % 2 === 0 ? 'mc' : 'dis') : modo)];
  });
}

/** Aproveitamento acumulado por grupo (todas as respostas de grupo terapêutico já dadas). */
export function aproveitamentoPorGrupo(e: Estado, banco: Banco) {
  const r = new Map<string, { acertos: number; parciais: number; total: number }>();
  for (const [k, it] of Object.entries(e.itens)) {
    if (!k.endsWith('|f1')) continue;
    const g = k.split('|')[0];
    const x = r.get(g) ?? { acertos: 0, parciais: 0, total: 0 };
    x.acertos += it.acertos; x.parciais += it.parciais; x.total += it.tentativas;
    r.set(g, x);
  }
  return gruposDoDesafio(banco).map((g) => ({ grupo: g, ...(r.get(g.id) ?? { acertos: 0, parciais: 0, total: 0 }) }));
}
