// Camada de conteúdo editável pelo painel administrativo.
// Fluxo: edição → RASCUNHO (pendente de validação) → validação por docente → PUBLICADO.
// Somente o que está publicado entra no jogo.
import type { Classe, Medicamento } from '../data/types';

export interface RegistroAdmin {
  rascunho?: Medicamento;
  publicado?: Medicamento;
  historico: { ts: number; acao: string; autor: string }[];
}

export interface GrupoExtra {
  id: string;
  nome: string;
  nomeCurto: string;
  descricao: string;
  sinonimos: string[];
}

export interface ConteudoAdmin {
  medicamentos: Record<string, RegistroAdmin>;
  classes: Classe[];
  desativados: string[];
  gruposExtras: GrupoExtra[];
}

const CHAVE = 'pq:conteudo-admin';

export function carregarConteudoAdmin(): ConteudoAdmin {
  try {
    const raw = localStorage.getItem(CHAVE);
    if (raw) {
      const d = JSON.parse(raw);
      return { medicamentos: {}, classes: [], desativados: [], gruposExtras: [], ...d };
    }
  } catch {
    /* armazenamento indisponível */
  }
  return { medicamentos: {}, classes: [], desativados: [], gruposExtras: [] };
}

export function salvarConteudoAdmin(c: ConteudoAdmin) {
  localStorage.setItem(CHAVE, JSON.stringify(c));
}
