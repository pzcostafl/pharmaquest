// =====================================================================
// PharmaQuest — esquema do banco farmacológico
// Toda informação aqui é conteúdo educacional. Nada é prescrição.
// =====================================================================

/** Grupos padrão + grupos criados no painel administrativo (string livre). */
export type GrupoId = GrupoIdPadrao | (string & {});

export type GrupoIdPadrao =
  | 'analgesicos'
  | 'antiinflamatorios'
  | 'antihipertensivos'
  | 'antimicrobianos'
  | 'antidepressivos'
  | 'broncodilatadores'
  | 'gastro'
  | 'antidiabeticos'
  | 'hipolipemiantes'
  | 'obesidade'
  | 'oncologicos';

/** Estado de validação científica do cadastro. */
export type EstadoValidacao =
  /** incompleto — nunca aparece no jogo */
  | 'rascunho'
  /** redigido a partir de referências-padrão, aguardando revisão de docente */
  | 'revisado_referencias'
  /** revisado e aprovado por docente/farmacêutico no painel administrativo */
  | 'validado_docente';

export interface Classe {
  /** slug único, ex.: 'ieca' */
  id: string;
  /** nome por extenso, ex.: 'Inibidores da enzima conversora de angiotensina' */
  nome: string;
  /** sigla usual, ex.: 'IECA' */
  sigla?: string;
  grupoId: GrupoId;
  /** subclasse/“família” opcional para agrupar classes no resumo (ex.: 'Betalactâmicos') */
  familia?: string;
  /** mecanismo de ação em 1–2 frases, linguagem acessível */
  mecanismoCurto: string;
  /** formas aceitas na resposta dissertativa (sem precisar de acento/caixa) */
  sinonimos: string[];
}

export interface NomeComercial {
  nome: string;
  /**
   * referencia = medicamento de referência (inovador) no Brasil
   * marca      = similar/marca comercial
   * combinacao = associação em dose fixa contendo o princípio ativo
   */
  tipo: 'referencia' | 'marca' | 'combinacao';
  /** obrigatório para 'combinacao': ex. 'enalapril + hidroclorotiazida' */
  composicao?: string;
  /** laboratório detentor, quando conhecido com segurança */
  fabricante?: string;
  /**
   * confirmado_anvisa = conferido no Bulário/Consultas Anvisa (por pessoa)
   * pendente_anvisa   = marca historicamente registrada no Brasil, situação atual não conferida
   */
  verificacao: 'confirmado_anvisa' | 'pendente_anvisa';
  /** ex.: 'comercialização descontinuada', 'uso hospitalar', 'controle especial (Portaria 344)' */
  obs?: string;
  /** se a marca só se aplica a um dos grupos (ex.: Wegovy → obesidade) */
  grupoId?: GrupoId;
}

export interface Termo {
  /** forma canônica exibida */
  termo: string;
  /** variações aceitas na resposta dissertativa */
  sinonimos: string[];
}

export interface VinculoGrupo {
  grupoId: GrupoId;
  classeId: string;
  /** subclasse específica, ex.: 'Diidropiridínico', 'Cefalosporina de 3ª geração' */
  subclasse?: string;
  /** contexto clínico deste vínculo — usado para desambiguar a pergunta da fase 1 */
  contexto: string;
  /** explicação curta mostrada após a fase 1 */
  explicacaoFase1: string;
}

export interface Medicamento {
  /** slug único sem acento, ex.: 'enalapril', 'acido-acetilsalicilico' */
  id: string;
  /** nome DCB em português, ex.: 'Enalapril' */
  nome: string;
  /** grafias alternativas / DCI / nomes em inglês, ex.: ['maleato de enalapril', 'enalapril maleate'] */
  sinonimos: string[];
  vinculos: VinculoGrupo[];
  /** mecanismo de ação, 2–4 frases */
  mecanismo: string;
  indicacoes: string[];
  /** usos off-label relevantes, rotulados como tal */
  offLabel?: string[];
  tipoMolecula: 'pequena' | 'peptideo' | 'proteina' | 'anticorpo' | 'inorganico' | 'associacao';
  /**
   * nome(s) em inglês para busca no PubChem (um por componente).
   * vazio para proteínas/anticorpos/insulinas, que não têm estrutura 2D útil.
   */
  pubchem: string[];
  nomesComerciais: NomeComercial[];
  /** existe genérico (identificado pelo princípio ativo) no mercado brasileiro? */
  generico: boolean;
  eaComuns: Termo[];
  eaGraves: Termo[];
  /** efeito característico usado como resposta correta da fase 3B (múltipla escolha) — deve ser o `termo` de um item de eaComuns ou eaGraves */
  eaCaracteristico: string;
  /** ≥3 efeitos plausíveis porém NÃO típicos deste fármaco (distratores da fase 3B) */
  distratoresEA: string[];
  contraindicacoes: string[];
  precaucoes: string[];
  interacoes: string[];
  /** explicação mostrada após a fase 2 (classe + mecanismo) */
  explicacaoFase2: string;
  /** explicação mostrada após a fase 3 (marcas + efeitos) */
  explicacaoFase3: string;
  referencias: string[];
  /** dd/mmm/aaaa */
  dataRevisao: string;
  validacao: EstadoValidacao;
  /** observação regulatória brasileira, ex.: 'Receita B2 (Portaria 344/98)' */
  regulatorio?: string;
}

/** Acrescenta vínculo de um fármaco já cadastrado em outro arquivo a outro grupo. */
export interface VinculoExtra {
  medicamentoId: string;
  vinculo: VinculoGrupo;
  nomesComerciais?: NomeComercial[];
  indicacoes?: string[];
}

export interface ResumoGrupo {
  grupoId: GrupoId;
  visaoGeral: string[];
  /** mecanismo por classe/família */
  mecanismos: { titulo: string; texto: string }[];
  /** fluxogramas esquemáticos (sequência de passos) */
  fluxogramas: { titulo: string; passos: string[] }[];
  eaFrequentes: { efeito: string; classes: string; mecanismo?: string }[];
  eaGraves: { efeito: string; classes: string; mecanismo?: string }[];
  /** primeira linha por condição — nunca uma única primeira linha para tudo */
  primeirasLinhas: { condicao: string; recomendacao: string; observacao?: string; fonte?: string }[];
  contraindicacoes: string[];
  interacoes: string[];
  comparacoes: { titulo: string; texto: string }[];
  memorizar: string[];
  fontes: string[];
  dataRevisao: string;
}

export interface ModuloDados {
  classes: Classe[];
  medicamentos: Medicamento[];
  vinculosExtras?: VinculoExtra[];
  resumos: ResumoGrupo[];
}
