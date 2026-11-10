import { GRUPOS, type GrupoMeta } from '../data/grupos-meta';
import { carregarConteudoAdmin } from './conteudo';

/** Grupos padrão + grupos criados pelo administrador. */
export function listarGrupos(): GrupoMeta[] {
  const extras = carregarConteudoAdmin().gruposExtras.map((g, i) => ({
    ...g,
    icone: 'pasta',
    ordem: 100 + i,
  }));
  return [...GRUPOS, ...extras];
}
