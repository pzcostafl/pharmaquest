// Monta o banco farmacológico em memória: módulos de conteúdo + edições publicadas do painel admin.
import type { Classe, GrupoId, Medicamento, ModuloDados, NomeComercial, ResumoGrupo, VinculoGrupo } from './types';
import { GRUPOS } from './grupos-meta';
import pubchemRaw from './pubchem.json';
import { carregarConteudoAdmin } from '../lib/conteudo';

export interface PubchemInfo {
  nome: string;
  cid: number;
  formula: string;
  peso: string;
  imagem: string; // caminho relativo em public/
  iupac?: string;
}
const PUBCHEM = pubchemRaw as Record<string, PubchemInfo | { erro: string }>;

const modulos = import.meta.glob<{ default: ModuloDados }>('./grupos/*.ts', { eager: true });

export interface Banco {
  classes: Map<string, Classe>;
  medicamentos: Map<string, Medicamento>;
  resumos: Map<GrupoId, ResumoGrupo>;
  /** medicamentos jogáveis por grupo (já filtrados pela regra de elegibilidade), ordenados */
  porGrupo: Map<GrupoId, Medicamento[]>;
  /** medicamentos cadastrados mas ocultos, com o motivo */
  ocultos: { med: Medicamento; motivos: string[] }[];
  gruposExtras: { id: string; nome: string }[];
}

/** Verifica se um medicamento tem conteúdo para TODAS as fases. Retorna a lista de pendências. */
export function pendencias(m: Medicamento, classes: Map<string, Classe>): string[] {
  const p: string[] = [];
  if (m.validacao === 'rascunho') p.push('cadastro em rascunho');
  if (!m.vinculos.length) p.push('sem grupo terapêutico');
  for (const v of m.vinculos) {
    if (!classes.has(v.classeId)) p.push(`classe "${v.classeId}" inexistente`);
    if (!v.explicacaoFase1) p.push('sem explicação da fase 1');
  }
  if (!m.mecanismo || !m.explicacaoFase2) p.push('sem mecanismo/explicação da fase 2');
  if (!m.nomesComerciais.length) p.push('sem nome comercial cadastrado (fase 3A)');
  const eas = [...m.eaComuns, ...m.eaGraves];
  if (!eas.length) p.push('sem efeitos adversos (fase 3B)');
  if (!eas.some((e) => e.termo === m.eaCaracteristico)) p.push('efeito característico não está na lista de efeitos');
  if (m.distratoresEA.length < 3) p.push('menos de 3 distratores de efeito adverso');
  if (!m.referencias.length) p.push('sem referência bibliográfica');
  return p;
}

export function pubchemDe(m: Medicamento): PubchemInfo[] {
  return m.pubchem
    .map((n) => PUBCHEM[n.toLowerCase()])
    .filter((x): x is PubchemInfo => !!x && !('erro' in x));
}

/** Marcas válidas para o contexto de um grupo. */
export function marcasNoGrupo(m: Medicamento, g: GrupoId): NomeComercial[] {
  return m.nomesComerciais.filter((n) => !n.grupoId || n.grupoId === g);
}

export function vinculoNoGrupo(m: Medicamento, g: GrupoId): VinculoGrupo {
  return m.vinculos.find((v) => v.grupoId === g) ?? m.vinculos[0];
}

let cache: { versao: number; banco: Banco } | null = null;
let versao = 0;
const ouvintes = new Set<() => void>();
export function invalidarBanco() {
  versao++;
  cache = null;
  ouvintes.forEach((f) => f());
}
export function ouvirBanco(f: () => void) {
  ouvintes.add(f);
  return () => ouvintes.delete(f);
}
export const versaoBanco = () => versao;

export function getBanco(): Banco {
  if (cache && cache.versao === versao) return cache.banco;
  const classes = new Map<string, Classe>();
  const medicamentos = new Map<string, Medicamento>();
  const resumos = new Map<GrupoId, ResumoGrupo>();
  const extras: ModuloDados['vinculosExtras'] = [];

  for (const mod of Object.values(modulos)) {
    const d = mod.default;
    if (!d) continue;
    d.classes.forEach((c) => classes.set(c.id, c));
    d.medicamentos.forEach((m) => medicamentos.set(m.id, structuredClone(m)));
    d.resumos.forEach((r) => resumos.set(r.grupoId, r));
    extras.push(...(d.vinculosExtras ?? []));
  }
  for (const e of extras) {
    const m = medicamentos.get(e.medicamentoId);
    if (!m) continue;
    if (!m.vinculos.some((v) => v.grupoId === e.vinculo.grupoId)) m.vinculos.push(e.vinculo);
    for (const n of e.nomesComerciais ?? []) {
      if (!m.nomesComerciais.some((x) => x.nome === n.nome)) m.nomesComerciais.push({ ...n, grupoId: n.grupoId ?? e.vinculo.grupoId });
    }
    for (const i of e.indicacoes ?? []) if (!m.indicacoes.includes(i)) m.indicacoes.push(i);
  }

  // Edições do painel administrativo — somente as PUBLICADAS (validadas)
  const admin = carregarConteudoAdmin();
  for (const c of admin.classes) classes.set(c.id, c);
  for (const [id, reg] of Object.entries(admin.medicamentos)) {
    if (reg.publicado) medicamentos.set(id, structuredClone(reg.publicado));
  }

  const porGrupo = new Map<GrupoId, Medicamento[]>();
  const ocultos: Banco['ocultos'] = [];
  const ordemClasse = [...classes.keys()];
  for (const m of medicamentos.values()) {
    const motivos = pendencias(m, classes);
    if (admin.desativados.includes(m.id)) motivos.unshift('desativado pelo administrador');
    if (motivos.length) {
      ocultos.push({ med: m, motivos });
      continue;
    }
    for (const v of m.vinculos) {
      const arr = porGrupo.get(v.grupoId) ?? [];
      arr.push(m);
      porGrupo.set(v.grupoId, arr);
    }
  }
  for (const [g, arr] of porGrupo) {
    arr.sort((a, b) => {
      const ca = ordemClasse.indexOf(vinculoNoGrupo(a, g).classeId);
      const cb = ordemClasse.indexOf(vinculoNoGrupo(b, g).classeId);
      return ca - cb || a.nome.localeCompare(b.nome, 'pt-BR');
    });
  }
  const banco: Banco = { classes, medicamentos, resumos, porGrupo, ocultos, gruposExtras: admin.gruposExtras };
  cache = { versao, banco };
  return banco;
}

export const todosGrupos = () => GRUPOS;
