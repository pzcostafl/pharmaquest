import type { ModuloDados, NomeComercial, Termo } from '../types';

// =====================================================================
// Grupo: oncologicos — Antineoplásicos e principais medicamentos oncológicos
// Conteúdo educacional. Nada aqui é prescrição: esquemas oncológicos dependem de
// estadiamento, biomarcadores, tratamentos prévios, performance status e decisão
// multidisciplinar.
// =====================================================================

const REV = '10/nov/2026';
const HOSP = 'uso hospitalar / restrito a serviço de terapia antineoplásica (RDC 220/2004)';

const REF_BASE = [
  'Brunton LL, Knollmann BC (eds.). Goodman & Gilman: As Bases Farmacológicas da Terapêutica, 14ª ed. (2023) — seção de quimioterapia das doenças neoplásicas',
  'Katzung BG, Vanderah TW. Farmacologia Básica e Clínica, 15ª ed. (2021) — cap. Quimioterapia do câncer e Imunofarmacologia',
  'Ritter JM et al. Rang & Dale Farmacologia, 9ª ed. (2020) — cap. Fármacos anticâncer',
];
const REF_MANIP = [
  'Ministério do Trabalho. NR 32 — Segurança e Saúde no Trabalho em Serviços de Saúde (item quimioterápicos antineoplásicos)',
  'Anvisa. RDC nº 220/2004 — Regulamento técnico de funcionamento dos serviços de terapia antineoplásica',
];

function marca(
  nome: string,
  tipo: NomeComercial['tipo'],
  fabricante?: string,
  obs?: string,
): NomeComercial {
  const m: NomeComercial = { nome, tipo, verificacao: 'pendente_anvisa' };
  if (fabricante) m.fabricante = fabricante;
  if (obs) m.obs = obs;
  return m;
}

function t(termo: string, ...sinonimos: string[]): Termo {
  return { termo, sinonimos };
}

// termos recorrentes
const MIELO = t(
  'Mielossupressão',
  'neutropenia',
  'leucopenia',
  'plaquetopenia',
  'trombocitopenia',
  'anemia',
  'pancitopenia',
  'aplasia medular',
  'queda das células do sangue',
  'imunossupressão medular',
);
const NAUSEA = t('Náuseas e vômitos', 'nausea', 'vomito', 'emese', 'enjoo', 'NVIQ', 'nausea e vomito induzidos por quimioterapia');
const ALOPECIA = t('Alopecia', 'queda de cabelo', 'perda de cabelo', 'calvicie');
const MUCOSITE = t('Mucosite oral (estomatite)', 'mucosite', 'estomatite', 'aftas', 'feridas na boca', 'ulceras orais');
const NEUTRO_FEBRIL = t('Neutropenia febril', 'febre neutropenica', 'infeccao com neutropenia', 'sepse neutropenica');
const FADIGA = t('Fadiga', 'cansaco', 'astenia', 'fraqueza');
const EXTRAVASAMENTO = t('Necrose tecidual por extravasamento (vesicante)', 'extravasamento', 'vesicante', 'necrose local', 'lesao no local da infusao');
const INFUSIONAL = t('Reações relacionadas à infusão', 'reacao infusional', 'reacao a infusao', 'febre e calafrios na infusao', 'hipersensibilidade infusional');

// irAEs (inibidores de checkpoint)
const IRAE_COMUNS = [
  FADIGA,
  t('Prurido e erupção cutânea imunomediada', 'rash', 'prurido', 'coceira', 'dermatite imunomediada', 'exantema'),
  t('Diarreia', 'evacuacoes liquidas', 'fezes amolecidas'),
  t('Hipotireoidismo imunomediado', 'hipotireoidismo', 'tireoidite', 'tireoide baixa', 'disfuncao tireoidiana imunomediada'),
  t('Artralgia', 'dor articular', 'dor nas juntas'),
];
const IRAE_GRAVES = [
  t('Pneumonite imunomediada', 'pneumonite', 'inflamacao pulmonar', 'doenca pulmonar intersticial imunomediada'),
  t('Colite imunomediada', 'colite', 'inflamacao do colon', 'diarreia grave imunomediada'),
  t('Hepatite imunomediada', 'hepatite', 'hepatotoxicidade imunomediada', 'elevacao de transaminases'),
  t('Hipofisite e insuficiência adrenal', 'hipofisite', 'insuficiencia adrenal', 'hipopituitarismo', 'endocrinopatia imunomediada'),
  t('Diabetes melito tipo 1 imunomediado', 'diabetes autoimune', 'cetoacidose', 'DM1 imunomediado'),
  t('Miocardite imunomediada', 'miocardite', 'inflamacao do coracao'),
  t('Nefrite imunomediada', 'nefrite', 'nefrite intersticial', 'lesao renal imunomediada'),
];
const IRAE_PREC = [
  'Eventos adversos imunomediados podem surgir a qualquer momento, inclusive meses após o término; manejo com suspensão e corticoide sistêmico conforme grau (diretrizes ESMO/ASCO de toxicidade de imunoterapia)',
  'Monitorar TSH/T4 livre, glicemia, função hepática e renal no início e periodicamente',
  'Doença autoimune ativa, transplante de órgão sólido e uso crônico de imunossupressores exigem avaliação risco-benefício cuidadosa',
  'Gestação: risco embriofetal; contracepção eficaz durante e após o tratamento conforme bula',
];
const IRAE_INTER = [
  'Corticoides sistêmicos e imunossupressores em dose alta antes do início podem reduzir a eficácia (no tratamento de irAE, o corticoide é indicado)',
  'Vacinas de vírus vivos: evitar durante a terapia oncológica sistêmica conforme orientação da equipe',
];
const IRAE_DISTR = [
  'Cistite hemorrágica',
  'Cardiotoxicidade dose-cumulativa por antraciclina',
  'Neuropatia aguda induzida pelo frio',
  'Síndrome mão-pé (eritrodisestesia palmoplantar)',
];

const dados: ModuloDados = {
  // ===================================================================
  // CLASSES
  // ===================================================================
  classes: [
    // ---------------- Quimioterapia citotóxica ----------------
    {
      id: 'antimetabolito-antifolato',
      nome: 'Antimetabólitos antifolatos',
      sigla: 'Antifolato',
      grupoId: 'oncologicos',
      familia: 'Quimioterapia citotóxica',
      mecanismoCurto:
        'Análogos do ácido fólico que inibem a di-hidrofolato redutase (DHFR), esgotando o tetra-hidrofolato necessário à síntese de timidilato e purinas; atuam na fase S do ciclo celular.',
      sinonimos: ['antifolato', 'antifolatos', 'antagonista do folato', 'antagonistas do acido folico', 'inibidor da DHFR', 'inibidor da diidrofolato redutase', 'antimetabolito', 'antimetabolitos', 'antifolate'],
    },
    {
      id: 'antimetabolito-pirimidina',
      nome: 'Antimetabólitos análogos de pirimidina',
      sigla: 'Análogo de pirimidina',
      grupoId: 'oncologicos',
      familia: 'Quimioterapia citotóxica',
      mecanismoCurto:
        'Análogos de bases ou nucleosídeos pirimidínicos (fluoropirimidinas, análogos de citidina) que inibem a timidilato sintase e/ou são incorporados ao DNA/RNA, bloqueando a síntese de DNA na fase S.',
      sinonimos: ['analogo de pirimidina', 'analogos de pirimidina', 'antagonista de pirimidina', 'fluoropirimidina', 'fluoropirimidinas', 'analogo de nucleosideo', 'analogo de citidina', 'antimetabolito', 'antimetabolitos', 'pyrimidine analog'],
    },
    {
      id: 'alquilante-mostarda-nitrogenada',
      nome: 'Agentes alquilantes — mostardas nitrogenadas (oxazafosforinas)',
      sigla: 'Alquilante',
      grupoId: 'oncologicos',
      familia: 'Quimioterapia citotóxica',
      mecanismoCurto:
        'Pró-fármacos ativados no fígado em mostardas fosforamídicas que transferem grupos alquila à guanina (N7), formando ligações cruzadas no DNA; ação ciclo-celular inespecífica.',
      sinonimos: ['alquilante', 'alquilantes', 'agente alquilante', 'mostarda nitrogenada', 'mostardas nitrogenadas', 'oxazafosforina', 'oxazafosforinas', 'alkylating agent', 'nitrogen mustard'],
    },
    {
      id: 'composto-platina',
      nome: 'Compostos de platina',
      sigla: 'Platinas',
      grupoId: 'oncologicos',
      familia: 'Quimioterapia citotóxica',
      mecanismoCurto:
        'Complexos de platina que, após aquação intracelular, se ligam covalentemente ao DNA formando adutos e ligações cruzadas intra e interfita (ação semelhante à alquilação); ciclo-celular inespecíficos.',
      sinonimos: ['platina', 'platinas', 'compostos de platina', 'derivados de platina', 'sais de platina', 'platinum compounds', 'agentes semelhantes a alquilantes', 'alquilante-like'],
    },
    {
      id: 'antraciclina',
      nome: 'Antraciclinas',
      grupoId: 'oncologicos',
      familia: 'Quimioterapia citotóxica',
      mecanismoCurto:
        'Antibióticos antitumorais que se intercalam no DNA, inibem a topoisomerase II (estabilizando o complexo clivável) e geram radicais livres; o estresse oxidativo e a ação na topoisomerase IIβ explicam a cardiotoxicidade.',
      sinonimos: ['antraciclina', 'antraciclinas', 'antibiotico antitumoral', 'antibioticos antitumorais', 'inibidor da topoisomerase II', 'intercalante', 'anthracycline'],
    },
    {
      id: 'taxano',
      nome: 'Taxanos — estabilizadores de microtúbulos',
      sigla: 'Taxanos',
      grupoId: 'oncologicos',
      familia: 'Quimioterapia citotóxica',
      mecanismoCurto:
        'Ligam-se à β-tubulina e estabilizam os microtúbulos, impedindo sua despolimerização; o fuso mitótico não se desfaz e a célula para em mitose (fase M).',
      sinonimos: ['taxano', 'taxanos', 'estabilizador de microtubulos', 'estabilizadores de microtubulos', 'inibidor de microtubulos', 'antimicrotubulo', 'taxane'],
    },
    {
      id: 'alcaloide-vinca',
      nome: 'Alcaloides da vinca — desestabilizadores de microtúbulos',
      sigla: 'Alcaloides da vinca',
      grupoId: 'oncologicos',
      familia: 'Quimioterapia citotóxica',
      mecanismoCurto:
        'Ligam-se à tubulina e impedem sua polimerização, desestruturando o fuso mitótico e bloqueando a célula na metáfase (fase M).',
      sinonimos: ['alcaloide da vinca', 'alcaloides da vinca', 'vinca', 'alcaloides de vinca', 'desestabilizador de microtubulos', 'inibidor da polimerizacao da tubulina', 'antimicrotubulo', 'vinca alkaloid'],
    },
    {
      id: 'inibidor-topoisomerase-i',
      nome: 'Inibidores da topoisomerase I (camptotecinas)',
      grupoId: 'oncologicos',
      familia: 'Quimioterapia citotóxica',
      mecanismoCurto:
        'Estabilizam o complexo topoisomerase I–DNA, impedindo a religação da fita simples clivada e gerando quebras letais durante a replicação (ex.: irinotecano, topotecano).',
      sinonimos: ['inibidor da topoisomerase I', 'inibidores da topoisomerase 1', 'camptotecina', 'camptotecinas', 'topoisomerase I inhibitor'],
    },
    // ---------------- Terapia-alvo ----------------
    {
      id: 'itk-bcr-abl',
      nome: 'Inibidores de tirosina-quinase BCR-ABL',
      sigla: 'TKI BCR-ABL',
      grupoId: 'oncologicos',
      familia: 'Terapia-alvo',
      mecanismoCurto:
        'Pequenas moléculas que ocupam o sítio de ligação do ATP da quinase de fusão BCR-ABL (e de KIT/PDGFR), bloqueando a sinalização proliferativa constitutiva das células com cromossomo Philadelphia.',
      sinonimos: ['inibidor de tirosina quinase', 'inibidores de tirosina quinase', 'inibidor de tirosinoquinase', 'TKI', 'ITK', 'inibidor de BCR-ABL', 'inibidor da BCR-ABL', 'tyrosine kinase inhibitor', 'terapia alvo'],
    },
    {
      id: 'itk-egfr',
      nome: 'Inibidores de tirosina-quinase do EGFR',
      sigla: 'TKI EGFR',
      grupoId: 'oncologicos',
      familia: 'Terapia-alvo',
      mecanismoCurto:
        'Pequenas moléculas que bloqueiam o domínio quinase intracelular do receptor do fator de crescimento epidérmico (EGFR) com mutações ativadoras, interrompendo as vias RAS-MAPK e PI3K-AKT.',
      sinonimos: ['inibidor de EGFR', 'inibidor do EGFR', 'TKI de EGFR', 'ITK de EGFR', 'inibidor de tirosina quinase do EGFR', 'inibidor de tirosina quinase', 'EGFR TKI', 'terapia alvo'],
    },
    {
      id: 'anticorpo-anti-her2',
      nome: 'Anticorpos monoclonais anti-HER2',
      sigla: 'Anti-HER2',
      grupoId: 'oncologicos',
      familia: 'Terapia-alvo',
      mecanismoCurto:
        'Anticorpos que se ligam ao domínio extracelular do receptor HER2 (ERBB2) superexpresso, inibindo sua sinalização e mediando citotoxicidade celular dependente de anticorpo (ADCC).',
      sinonimos: ['anti-HER2', 'anti HER2', 'anticorpo anti-HER2', 'anticorpo monoclonal anti-HER2', 'anti-ERBB2', 'bloqueador de HER2', 'terapia alvo anti-HER2', 'anticorpo monoclonal'],
    },
    {
      id: 'anticorpo-anti-vegf',
      nome: 'Anticorpos monoclonais anti-VEGF (antiangiogênicos)',
      sigla: 'Anti-VEGF',
      grupoId: 'oncologicos',
      familia: 'Terapia-alvo',
      mecanismoCurto:
        'Anticorpos que sequestram o VEGF-A circulante, impedindo sua ligação aos receptores VEGFR no endotélio e inibindo a angiogênese tumoral.',
      sinonimos: ['anti-VEGF', 'anti VEGF', 'antiangiogenico', 'antiangiogenicos', 'inibidor da angiogenese', 'anticorpo anti-VEGF', 'anticorpo monoclonal', 'terapia alvo antiangiogenica'],
    },
    {
      id: 'anticorpo-anti-cd20',
      nome: 'Anticorpos monoclonais anti-CD20',
      sigla: 'Anti-CD20',
      grupoId: 'oncologicos',
      familia: 'Terapia-alvo',
      mecanismoCurto:
        'Anticorpos contra o antígeno CD20 de linfócitos B que causam depleção de células B por ADCC, citotoxicidade dependente de complemento e apoptose.',
      sinonimos: ['anti-CD20', 'anti CD20', 'anticorpo anti-CD20', 'anticorpo monoclonal anti-CD20', 'depletor de linfocitos B', 'anticorpo monoclonal'],
    },
    // ---------------- Imunoterapia ----------------
    {
      id: 'anti-pd1',
      nome: 'Inibidores de checkpoint imunológico anti-PD-1',
      sigla: 'Anti-PD-1',
      grupoId: 'oncologicos',
      familia: 'Imunoterapia',
      mecanismoCurto:
        'Anticorpos que bloqueiam o receptor PD-1 do linfócito T, impedindo sua ligação a PD-L1/PD-L2 tumorais e liberando o freio imunológico sobre a resposta antitumoral.',
      sinonimos: ['anti-PD-1', 'anti PD1', 'inibidor de PD-1', 'inibidor de checkpoint', 'inibidores de checkpoint imunologico', 'bloqueador de PD-1', 'imunoterapia', 'checkpoint inhibitor', 'ICI'],
    },
    {
      id: 'anti-pd-l1',
      nome: 'Inibidores de checkpoint imunológico anti-PD-L1',
      sigla: 'Anti-PD-L1',
      grupoId: 'oncologicos',
      familia: 'Imunoterapia',
      mecanismoCurto:
        'Anticorpos que se ligam ao PD-L1 expresso pelo tumor e por células do microambiente, impedindo a interação com PD-1 (e B7.1) e restaurando a atividade do linfócito T.',
      sinonimos: ['anti-PD-L1', 'anti PDL1', 'inibidor de PD-L1', 'inibidor de checkpoint', 'inibidores de checkpoint imunologico', 'imunoterapia', 'checkpoint inhibitor', 'ICI'],
    },
    {
      id: 'anti-ctla4',
      nome: 'Inibidores de checkpoint imunológico anti-CTLA-4',
      sigla: 'Anti-CTLA-4',
      grupoId: 'oncologicos',
      familia: 'Imunoterapia',
      mecanismoCurto:
        'Anticorpos que bloqueiam o CTLA-4, receptor inibitório da fase de ativação do linfócito T no linfonodo, ampliando a coestimulação via CD28-B7 (ex.: ipilimumabe).',
      sinonimos: ['anti-CTLA-4', 'anti CTLA4', 'inibidor de CTLA-4', 'inibidor de checkpoint', 'imunoterapia', 'checkpoint inhibitor'],
    },
    // ---------------- Hormonioterapia ----------------
    {
      id: 'serm-oncologico',
      nome: 'Moduladores seletivos do receptor de estrogênio',
      sigla: 'SERM',
      grupoId: 'oncologicos',
      familia: 'Hormonioterapia',
      mecanismoCurto:
        'Ligam-se ao receptor de estrogênio com ação antagonista na mama e agonista parcial em osso e endométrio, bloqueando o estímulo estrogênico ao tumor RH+.',
      sinonimos: ['SERM', 'modulador seletivo do receptor de estrogenio', 'moduladores seletivos do receptor estrogenico', 'antiestrogenio', 'antiestrogenico', 'antagonista do receptor de estrogenio', 'hormonioterapia', 'selective estrogen receptor modulator'],
    },
    {
      id: 'inibidor-aromatase',
      nome: 'Inibidores da aromatase',
      sigla: 'IA',
      grupoId: 'oncologicos',
      familia: 'Hormonioterapia',
      mecanismoCurto:
        'Inibem a aromatase (CYP19A1), enzima que converte androgênios em estrogênios nos tecidos periféricos, reduzindo drasticamente o estrogênio circulante na pós-menopausa.',
      sinonimos: ['inibidor da aromatase', 'inibidores da aromatase', 'IA', 'IAs', 'inibidor de aromatase nao esteroidal', 'inibidor da CYP19', 'aromatase inhibitor', 'hormonioterapia'],
    },
    {
      id: 'agonista-gnrh',
      nome: 'Agonistas do hormônio liberador de gonadotrofinas',
      sigla: 'Agonista de GnRH',
      grupoId: 'oncologicos',
      familia: 'Hormonioterapia',
      mecanismoCurto:
        'Análogos peptídicos do GnRH que, em uso contínuo, dessensibilizam e regulam para baixo os receptores hipofisários, suprimindo LH/FSH e levando a níveis de castração de testosterona ou estradiol.',
      sinonimos: ['agonista de GnRH', 'agonistas do GnRH', 'analogo de GnRH', 'analogo do LHRH', 'agonista do LHRH', 'castracao quimica', 'privacao androgenica', 'supressao ovariana', 'GnRH agonist', 'hormonioterapia'],
    },
    {
      id: 'antiandrogenio',
      nome: 'Antiandrogênios / inibidores da via do receptor de androgênio',
      sigla: 'ARPI',
      grupoId: 'oncologicos',
      familia: 'Hormonioterapia',
      mecanismoCurto:
        'Bloqueiam o receptor de androgênio (bicalutamida, enzalutamida, apalutamida) ou a síntese de androgênios via CYP17 (abiraterona), potencializando a privação androgênica no câncer de próstata.',
      sinonimos: ['antiandrogenio', 'antiandrogenios', 'antagonista do receptor de androgenio', 'bloqueador androgenico', 'inibidor da via do receptor androgenico', 'ARPI', 'antiandrogen'],
    },
  ],

  // ===================================================================
  // MEDICAMENTOS
  // ===================================================================
  medicamentos: [
    // ------------------------------------------------------------- Metotrexato
    {
      id: 'metotrexato',
      nome: 'Metotrexato',
      sinonimos: ['methotrexate', 'MTX', 'ametopterina', 'metotrexato sodico'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'antimetabolito-antifolato',
          subclasse: 'Antifolato clássico',
          contexto: 'quimioterapia de leucemia linfoblástica aguda, osteossarcoma, linfomas e coriocarcinoma',
          explicacaoFase1:
            'Antimetabólito usado em LLA (inclusive profilaxia de SNC por via intratecal), osteossarcoma em altas doses, linfomas, câncer de mama e doença trofoblástica gestacional.',
        },
      ],
      mecanismo:
        'Inibe competitivamente a di-hidrofolato redutase (DHFR), impedindo a regeneração do tetra-hidrofolato. Sem esse cofator, a síntese de timidilato e de purinas cai e a replicação do DNA para na fase S. Os poliglutamatos intracelulares prolongam a ação. A leucovorina (ácido folínico) fornece folato reduzido "após" o bloqueio e é usada como resgate nas altas doses.',
      indicacoes: [
        'Leucemia linfoblástica aguda (indução/manutenção e profilaxia do SNC por via intratecal)',
        'Osteossarcoma (altas doses com resgate de leucovorina)',
        'Linfomas não Hodgkin',
        'Câncer de mama (esquemas como CMF)',
        'Neoplasia trofoblástica gestacional (coriocarcinoma)',
        'Câncer de cabeça e pescoço e de bexiga (esquemas específicos)',
        'Fora da oncologia, em baixas doses semanais: artrite reumatoide, psoríase grave e outras doenças autoimunes',
      ],
      offLabel: ['Gravidez ectópica (tratamento clínico) — uso consagrado, verificar bula vigente'],
      tipoMolecula: 'pequena',
      pubchem: ['methotrexate'],
      nomesComerciais: [],
      generico: true,
      eaComuns: [
        MUCOSITE,
        NAUSEA,
        t('Elevação de transaminases', 'hepatotoxicidade leve', 'alteracao hepatica', 'TGO e TGP elevadas'),
        ALOPECIA,
      ],
      eaGraves: [
        MIELO,
        t('Nefrotoxicidade por precipitação tubular (altas doses)', 'nefrotoxicidade', 'lesao renal aguda', 'insuficiencia renal', 'cristalizacao tubular'),
        t('Hepatotoxicidade crônica (fibrose/cirrose)', 'fibrose hepatica', 'cirrose', 'hepatotoxicidade'),
        t('Pneumonite intersticial', 'pneumonite', 'toxicidade pulmonar', 'doenca pulmonar intersticial'),
        t('Neurotoxicidade (leucoencefalopatia, aracnoidite química intratecal)', 'leucoencefalopatia', 'aracnoidite', 'neurotoxicidade'),
        t('Teratogenicidade', 'malformacao fetal', 'abortamento', 'embriotoxicidade'),
      ],
      eaCaracteristico: 'Mucosite oral (estomatite)',
      distratoresEA: [
        'Cistite hemorrágica',
        'Cardiotoxicidade dose-cumulativa por antraciclina',
        'Neuropatia aguda induzida pelo frio',
        'Ototoxicidade',
      ],
      contraindicacoes: [
        'Gestação e amamentação',
        'Insuficiência renal grave',
        'Hepatopatia grave ou etilismo (em uso não oncológico)',
        'Discrasias sanguíneas preexistentes / imunodeficiência grave',
      ],
      precaucoes: [
        'Altas doses: hiper-hidratação, alcalinização urinária (pH ≥ 7), dosagem sérica seriada e resgate com leucovorina; glucarpidase em toxicidade renal com níveis elevados',
        'Acúmulo em terceiro espaço (ascite, derrame pleural) prolonga a exposição e a toxicidade',
        'Erro de dose diária em vez de semanal (uso não oncológico) já causou óbitos — orientar o paciente',
        'Citotóxico: manipulação em cabine de segurança biológica com EPI, conforme NR 32 e RDC 220/2004',
      ],
      interacoes: [
        'AINEs, penicilinas, probenecida e inibidores da bomba de prótons reduzem a excreção renal → toxicidade (relevante sobretudo em altas doses)',
        'Sulfametoxazol-trimetoprima: efeito antifolato aditivo e menor excreção → mielossupressão grave',
        'Fármacos hepatotóxicos e álcool aumentam o risco hepático',
      ],
      explicacaoFase2:
        'É um antifolato: imita o ácido fólico e trava a enzima DHFR. Sem folato reduzido, a célula não fabrica timidina e purinas e não consegue copiar o DNA (fase S).',
      explicacaoFase3:
        'Os tecidos de renovação rápida (mucosa oral/intestinal e medula óssea) dependem de síntese contínua de DNA, por isso mucosite e mielossupressão são as toxicidades típicas — e são revertidas pela leucovorina.',
      referencias: [...REF_BASE, 'Bula do metotrexato injetável (Anvisa) e FDA label', ...REF_MANIP],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Fluorouracila
    {
      id: 'fluorouracila',
      nome: 'Fluorouracila',
      sinonimos: ['fluorouracil', '5-FU', '5FU', '5-fluorouracil', '5-fluorouracila', 'fluoruracila'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'antimetabolito-pirimidina',
          subclasse: 'Fluoropirimidina',
          contexto: 'quimioterapia de tumores gastrointestinais (colorretal, gástrico, pâncreas), mama e cabeça e pescoço',
          explicacaoFase1:
            'Fluoropirimidina intravenosa base dos esquemas para câncer colorretal (FOLFOX, FOLFIRI), gástrico, pancreático (FOLFIRINOX), de mama e de cabeça e pescoço; também há forma tópica para lesões cutâneas.',
        },
      ],
      mecanismo:
        'Pró-fármaco convertido em 5-FdUMP, que forma complexo ternário estável com a timidilato sintase e o 5,10-metilenotetra-hidrofolato, bloqueando a síntese de timidilato (dTMP). Seus metabólitos FUTP e FdUTP também são incorporados ao RNA e ao DNA. A leucovorina aumenta o pool de folato reduzido e estabiliza o complexo, potencializando o efeito. É degradado principalmente pela di-hidropirimidina desidrogenase (DPD).',
      indicacoes: [
        'Câncer colorretal (adjuvante e metastático — FOLFOX, FOLFIRI)',
        'Câncer gástrico e de esôfago',
        'Adenocarcinoma de pâncreas (FOLFIRINOX)',
        'Câncer de mama',
        'Carcinoma de cabeça e pescoço',
        'Uso tópico: ceratoses actínicas e carcinoma basocelular superficial',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['fluorouracil'],
      nomesComerciais: [
        marca('Fauldfluor', 'marca', 'Libbs', HOSP),
        marca('Efurix', 'marca', undefined, 'creme tópico (ceratose actínica) — não é uso hospitalar'),
      ],
      generico: true,
      eaComuns: [
        MUCOSITE,
        t('Diarreia', 'evacuacoes liquidas', 'enterite'),
        NAUSEA,
        t('Síndrome mão-pé (eritrodisestesia palmoplantar)', 'sindrome mao pe', 'eritrodisestesia palmoplantar', 'eritema palmoplantar', 'mao-pe'),
        ALOPECIA,
      ],
      eaGraves: [
        MIELO,
        t('Toxicidade grave na deficiência de DPD', 'deficiencia de DPD', 'deficiencia de diidropirimidina desidrogenase', 'toxicidade fatal por DPD', 'DPYD'),
        t('Vasoespasmo coronariano (dor torácica isquêmica)', 'cardiotoxicidade', 'angina', 'isquemia miocardica', 'vasoespasmo'),
        NEUTRO_FEBRIL,
      ],
      eaCaracteristico: 'Toxicidade grave na deficiência de DPD',
      distratoresEA: [
        'Cistite hemorrágica',
        'Ototoxicidade',
        'Neuropatia aguda induzida pelo frio',
        'Cardiotoxicidade dose-cumulativa por antraciclina',
      ],
      contraindicacoes: [
        'Deficiência completa conhecida de DPD',
        'Uso concomitante ou recente (4 semanas) de brivudina',
        'Gestação',
        'Mielossupressão grave preexistente',
      ],
      precaucoes: [
        'Considerar genotipagem de DPYD ou fenotipagem de DPD antes do início (recomendação EMA 2020); ajustar dose em deficiência parcial',
        'Infusão contínua favorece mucosite e síndrome mão-pé; bolus favorece mielossupressão',
        'Dor torácica durante a infusão: suspender e investigar vasoespasmo coronariano',
        'Citotóxico: manipulação em cabine de segurança biológica com EPI (NR 32; RDC 220/2004)',
      ],
      interacoes: [
        'Varfarina: aumento do INR — monitorar',
        'Brivudina/sorivudina: inibem a DPD → toxicidade potencialmente fatal',
        'Leucovorina: potencializa eficácia e toxicidade (interação intencional nos esquemas)',
        'Fenitoína: aumento de níveis séricos de fenitoína',
      ],
      explicacaoFase2:
        'É uma fluoropirimidina: um "falso uracil" que, ativado, trava a timidilato sintase e para a produção de timidina, além de entrar como base falsa no RNA e no DNA.',
      explicacaoFase3:
        'Cerca de 80% da dose é inativada pela DPD; quem tem deficiência genética dessa enzima acumula o fármaco e desenvolve mucosite, diarreia e mielossupressão graves, às vezes fatais.',
      referencias: [...REF_BASE, 'Bula da fluorouracila injetável (Anvisa) e FDA label', 'EMA/PRAC 2020 — testagem de DPD antes de fluoropirimidinas', ...REF_MANIP],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Capecitabina
    {
      id: 'capecitabina',
      nome: 'Capecitabina',
      sinonimos: ['capecitabine', 'XELOX', 'CAPOX'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'antimetabolito-pirimidina',
          subclasse: 'Fluoropirimidina (pró-fármaco oral)',
          contexto: 'quimioterapia oral de câncer colorretal, gástrico e de mama',
          explicacaoFase1:
            'Pró-fármaco oral do 5-FU usado no câncer colorretal (adjuvante e metastático, isolado ou em CAPOX), gástrico e de mama metastático, além de radiossensibilizante no reto.',
        },
      ],
      mecanismo:
        'Pró-fármaco oral convertido em três etapas (carboxilesterase hepática → citidina desaminase → timidina fosforilase) em 5-fluorouracila. A timidina fosforilase é mais expressa no tecido tumoral, o que concentra parcialmente a ativação no tumor. A partir daí, age como o 5-FU: inibe a timidilato sintase e se incorpora a RNA/DNA.',
      indicacoes: [
        'Câncer colorretal: adjuvante no estágio III e doença metastática (monoterapia ou com oxaliplatina — CAPOX)',
        'Câncer de reto localmente avançado, associado à radioterapia',
        'Câncer gástrico avançado (com platina)',
        'Câncer de mama metastático (monoterapia ou com docetaxel) e adjuvante pós-neoadjuvância com doença residual em triplo-negativo (CREATE-X)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['capecitabine'],
      nomesComerciais: [marca('Xeloda', 'referencia', 'Roche', 'comprimidos orais; prescrição oncológica')],
      generico: true,
      eaComuns: [
        t('Síndrome mão-pé (eritrodisestesia palmoplantar)', 'sindrome mao pe', 'eritrodisestesia palmoplantar', 'eritema palmoplantar', 'mao-pe'),
        t('Diarreia', 'evacuacoes liquidas', 'fezes amolecidas'),
        NAUSEA,
        MUCOSITE,
        FADIGA,
        t('Hiperbilirrubinemia', 'bilirrubina alta', 'ictericia leve'),
      ],
      eaGraves: [
        t('Toxicidade grave na deficiência de DPD', 'deficiencia de DPD', 'DPYD', 'toxicidade fatal por DPD'),
        MIELO,
        t('Cardiotoxicidade (vasoespasmo coronariano)', 'vasoespasmo', 'angina', 'isquemia miocardica'),
        t('Diarreia grave com desidratação', 'desidratacao', 'diarreia grau 3'),
      ],
      eaCaracteristico: 'Síndrome mão-pé (eritrodisestesia palmoplantar)',
      distratoresEA: [
        'Cistite hemorrágica',
        'Neuropatia aguda induzida pelo frio',
        'Ototoxicidade',
        'Retenção hídrica com derrames cavitários',
      ],
      contraindicacoes: [
        'Deficiência completa conhecida de DPD',
        'Uso de brivudina nas últimas 4 semanas',
        'Insuficiência renal grave (ClCr < 30 mL/min)',
        'Gestação',
      ],
      precaucoes: [
        'Ajustar dose em ClCr 30–50 mL/min',
        'Orientar suspensão e contato com a equipe diante de diarreia ≥ grau 2 ou síndrome mão-pé dolorosa; hidratação da pele',
        'Genotipagem de DPYD recomendada antes do início (EMA 2020)',
        'Medicamento oral citotóxico: não partir/triturar comprimidos; cuidadores devem usar luvas ao manipular',
      ],
      interacoes: [
        'Varfarina: aumento importante do INR e sangramentos — monitorar ou preferir anticoagulante alternativo',
        'Fenitoína: aumento de níveis séricos',
        'Brivudina: inibição de DPD → toxicidade fatal',
      ],
      explicacaoFase2:
        'É uma fluoropirimidina oral: o comprimido é um pró-fármaco que vira 5-FU dentro do organismo, preferencialmente no tumor, e bloqueia a timidilato sintase.',
      explicacaoFase3:
        'A exposição prolongada ao 5-FU (como em infusão contínua) lesa os capilares e queratinócitos de palmas e plantas, causando a síndrome mão-pé — a toxicidade mais típica da capecitabina.',
      referencias: [...REF_BASE, 'Bula Xeloda (Roche/Anvisa) e FDA label', 'EMA/PRAC 2020 — testagem de DPD'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Gencitabina
    {
      id: 'gencitabina',
      nome: 'Gencitabina',
      sinonimos: ['gemcitabine', 'gemcitabina', 'cloridrato de gencitabina'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'antimetabolito-pirimidina',
          subclasse: 'Análogo de nucleosídeo (citidina)',
          contexto: 'quimioterapia de câncer de pâncreas, pulmão, bexiga, mama e ovário',
          explicacaoFase1:
            'Análogo da citidina usado em adenocarcinoma de pâncreas (com nab-paclitaxel), CPNPC, carcinoma urotelial e de vias biliares (com cisplatina), mama e ovário.',
        },
      ],
      mecanismo:
        'Análogo difluorado da desoxicitidina, fosforilado intracelularmente a difosfato (inibe a ribonucleotídeo redutase e reduz o pool de dNTPs) e trifosfato (incorporado ao DNA, causando terminação "mascarada" da cadeia). Age principalmente na fase S. A redução de dCTP promove sua própria incorporação (autopotencialização).',
      indicacoes: [
        'Adenocarcinoma de pâncreas avançado (isolada ou com nab-paclitaxel)',
        'Câncer de pulmão não pequenas células (com platina)',
        'Carcinoma urotelial avançado (com cisplatina)',
        'Câncer de mama metastático (com paclitaxel)',
        'Câncer de ovário recidivado (com carboplatina)',
        'Câncer de vias biliares (com cisplatina — esquema reconhecido em diretrizes; verificar bula vigente)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['gemcitabine'],
      nomesComerciais: [marca('Gemzar', 'referencia', 'Eli Lilly', HOSP)],
      generico: true,
      eaComuns: [
        t('Síndrome gripal (febre, mialgia, calafrios)', 'sindrome gripal', 'febre', 'mialgia', 'sintomas gripais'),
        NAUSEA,
        t('Elevação de transaminases', 'hepatotoxicidade leve', 'TGO e TGP elevadas'),
        t('Edema periférico', 'inchaco', 'edema'),
        t('Exantema', 'rash', 'erupcao cutanea'),
      ],
      eaGraves: [
        t('Mielossupressão (sobretudo trombocitopenia e neutropenia)', 'mielossupressao', 'trombocitopenia', 'plaquetopenia', 'neutropenia', 'leucopenia'),
        t('Toxicidade pulmonar (pneumonite)', 'pneumonite', 'doenca pulmonar intersticial', 'SDRA'),
        t('Síndrome hemolítico-urêmica / microangiopatia trombótica', 'SHU', 'microangiopatia trombotica', 'sindrome hemolitico uremica'),
        t('Síndrome de extravasamento capilar', 'extravasamento capilar', 'capillary leak'),
      ],
      eaCaracteristico: 'Mielossupressão (sobretudo trombocitopenia e neutropenia)',
      distratoresEA: [
        'Cistite hemorrágica',
        'Cardiotoxicidade dose-cumulativa por antraciclina',
        'Neuropatia periférica com íleo paralítico',
        'Ototoxicidade',
      ],
      contraindicacoes: ['Hipersensibilidade à gencitabina', 'Gestação e amamentação', 'Mielossupressão grave'],
      precaucoes: [
        'Hemograma antes de cada dose (D1, D8, D15) com ajuste conforme contagens',
        'Infusões mais longas que 60 min e administração mais de 1x/semana aumentam a toxicidade',
        'Potente radiossensibilizante — cautela com radioterapia concomitante',
        'Citotóxico: manipulação conforme NR 32 e RDC 220/2004',
      ],
      interacoes: ['Radioterapia: radiossensibilização intensa (esofagite, pneumonite)', 'Outros mielossupressores: toxicidade hematológica aditiva'],
      explicacaoFase2:
        'É um análogo de nucleosídeo (citidina falsa): inibe a ribonucleotídeo redutase e entra no DNA, interrompendo a síntese na fase S.',
      explicacaoFase3:
        'Como depende da replicação ativa, atinge os precursores medulares, e a mielossupressão (com plaquetopenia marcante) é a toxicidade dose-limitante.',
      referencias: [...REF_BASE, 'Bula Gemzar (Eli Lilly/Anvisa) e FDA label', ...REF_MANIP],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Citarabina
    {
      id: 'citarabina',
      nome: 'Citarabina',
      sinonimos: ['cytarabine', 'Ara-C', 'arabinosideo de citosina', 'citosina arabinosideo', 'cytosine arabinoside'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'antimetabolito-pirimidina',
          subclasse: 'Análogo de nucleosídeo (citidina)',
          contexto: 'quimioterapia de leucemias agudas (LMA e LLA) e linfomas',
          explicacaoFase1:
            'Base da indução da leucemia mieloide aguda (esquema "7+3" com antraciclina) e da consolidação em altas doses; também usada em LLA, linfomas e por via intratecal.',
        },
      ],
      mecanismo:
        'Análogo da citidina com açúcar arabinose, fosforilado a ara-CTP, que inibe a DNA polimerase e é incorporado ao DNA, impedindo o alongamento da cadeia. É altamente específica da fase S. É inativada pela citidina desaminase, o que explica a meia-vida curta e o uso em infusão contínua ou altas doses.',
      indicacoes: [
        'Leucemia mieloide aguda — indução (7+3) e consolidação em altas doses',
        'Leucemia linfoblástica aguda',
        'Linfomas não Hodgkin (esquemas de resgate e de alta intensidade)',
        'Leucemia/linfoma meníngeo (via intratecal)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['cytarabine'],
      nomesComerciais: [marca('Aracytin', 'referencia', 'Pfizer', HOSP)],
      generico: true,
      eaComuns: [
        NAUSEA,
        MUCOSITE,
        t('Síndrome da citarabina (febre, mialgia, dor óssea, rash)', 'sindrome da citarabina', 'febre', 'mialgia', 'dor ossea'),
        t('Conjuntivite química (altas doses)', 'conjuntivite', 'ceratoconjuntivite', 'olho vermelho'),
        t('Elevação de transaminases', 'hepatotoxicidade leve'),
      ],
      eaGraves: [
        MIELO,
        t('Toxicidade cerebelar (altas doses)', 'ataxia', 'sindrome cerebelar', 'disartria', 'nistagmo', 'neurotoxicidade cerebelar'),
        NEUTRO_FEBRIL,
        t('Edema pulmonar não cardiogênico', 'SDRA', 'toxicidade pulmonar'),
      ],
      eaCaracteristico: 'Toxicidade cerebelar (altas doses)',
      distratoresEA: [
        'Cistite hemorrágica',
        'Ototoxicidade',
        'Neuropatia aguda induzida pelo frio',
        'Fibrose pulmonar por dose cumulativa de bleomicina',
      ],
      contraindicacoes: ['Hipersensibilidade', 'Mielossupressão não relacionada à leucemia', 'Gestação (1º trimestre)'],
      precaucoes: [
        'Altas doses: exame neurológico/cerebelar antes de cada dose (suspender se ataxia/nistagmo); risco maior em > 60 anos e com disfunção renal',
        'Altas doses: colírio de corticoide profilático para conjuntivite',
        'Formulações intratecais devem ser sem conservantes',
        'Citotóxico: manipulação conforme NR 32 e RDC 220/2004',
      ],
      interacoes: ['Outros mielossupressores: toxicidade aditiva', 'Pode reduzir absorção oral de digoxina e eficácia da flucitosina (descrito em bula)'],
      explicacaoFase2:
        'É um análogo de nucleosídeo: uma citidina "falsa" que, transformada em ara-CTP, bloqueia a DNA polimerase e trava a replicação na fase S.',
      explicacaoFase3:
        'Em altas doses, o fármaco atravessa a barreira hematoencefálica em concentrações tóxicas para as células de Purkinje, causando ataxia, disartria e nistagmo (toxicidade cerebelar).',
      referencias: [...REF_BASE, 'Bula Aracytin (Pfizer/Anvisa) e FDA label da citarabina', ...REF_MANIP],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Ciclofosfamida
    {
      id: 'ciclofosfamida',
      nome: 'Ciclofosfamida',
      sinonimos: ['cyclophosphamide', 'CTX', 'CFM', 'ciclofosfamida monoidratada'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'alquilante-mostarda-nitrogenada',
          subclasse: 'Oxazafosforina',
          contexto: 'quimioterapia de linfomas, leucemias, câncer de mama e sarcomas',
          explicacaoFase1:
            'Alquilante mais usado na oncologia: integra R-CHOP (linfomas), AC/EC e TC (mama), esquemas de leucemias e sarcomas pediátricos e condicionamento de transplante de medula.',
        },
      ],
      mecanismo:
        'Pró-fármaco ativado por CYP2B6/CYP3A4 hepáticas em 4-hidroxiciclofosfamida/aldofosfamida, que se decompõe em mostarda fosforamida (o alquilante ativo) e acroleína. A mostarda forma íons aziridínio que alquilam o N7 da guanina, gerando ligações cruzadas intra e interfitas no DNA e apoptose. Atua em todas as fases do ciclo (ciclo-celular inespecífica). A acroleína, excretada na urina, é responsável pela cistite hemorrágica.',
      indicacoes: [
        'Linfomas não Hodgkin (R-CHOP) e linfoma de Hodgkin (BEACOPP)',
        'Câncer de mama (AC, EC, TC)',
        'Leucemias agudas e LLC',
        'Mieloma múltiplo',
        'Sarcomas e tumores pediátricos (neuroblastoma, rabdomiossarcoma, Ewing)',
        'Condicionamento para transplante de células-tronco hematopoiéticas',
        'Doenças autoimunes graves (nefrite lúpica, vasculites ANCA) — indicação não oncológica',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['cyclophosphamide'],
      nomesComerciais: [marca('Genuxal', 'referencia', 'Baxter', HOSP + '; também há comprimidos orais')],
      generico: true,
      eaComuns: [NAUSEA, ALOPECIA, t('Amenorreia e infertilidade', 'infertilidade', 'falencia ovariana', 'azoospermia', 'amenorreia'), MUCOSITE],
      eaGraves: [
        t('Cistite hemorrágica', 'hematuria', 'cistite', 'sangue na urina', 'sangramento vesical'),
        MIELO,
        t('Cardiotoxicidade aguda (altas doses de condicionamento)', 'miocardite hemorragica', 'insuficiencia cardiaca aguda'),
        t('Neoplasias secundárias (LMA/SMD, câncer de bexiga)', 'leucemia secundaria', 'segunda neoplasia', 'cancer de bexiga'),
        t('Hiponatremia por SIADH', 'SIADH', 'hiponatremia', 'secrecao inapropriada de ADH'),
      ],
      eaCaracteristico: 'Cistite hemorrágica',
      distratoresEA: [
        'Ototoxicidade',
        'Neuropatia aguda induzida pelo frio',
        'Síndrome mão-pé (eritrodisestesia palmoplantar)',
        'Toxicidade cerebelar por altas doses de citarabina',
      ],
      contraindicacoes: ['Gestação e amamentação', 'Obstrução do fluxo urinário', 'Infecção ativa grave', 'Mielossupressão grave'],
      precaucoes: [
        'Hidratação vigorosa e esvaziamento vesical frequente; mesna obrigatória em altas doses',
        'Ajustar dose em insuficiência renal',
        'Preservação de fertilidade deve ser discutida antes do início',
        'Citotóxico: manipulação conforme NR 32 e RDC 220/2004; excretas são contaminadas por até 48 h',
      ],
      interacoes: [
        'Indutores de CYP (fenobarbital, rifampicina, fenitoína) aceleram a ativação e a toxicidade',
        'Antraciclinas e trastuzumabe: cardiotoxicidade aditiva',
        'Alopurinol pode aumentar a mielossupressão',
      ],
      explicacaoFase2:
        'É um agente alquilante (mostarda nitrogenada): depois de ativada no fígado, cola grupos alquila no DNA e forma pontes entre as fitas, que a célula não consegue separar para se dividir.',
      explicacaoFase3:
        'A ativação libera acroleína, metabólito excretado na urina que lesa o urotélio e causa cistite hemorrágica; a mesna, concentrada na bexiga, neutraliza a acroleína por seu grupo tiol.',
      referencias: [...REF_BASE, 'Bula Genuxal (Baxter/Anvisa) e FDA label da ciclofosfamida', ...REF_MANIP],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Ifosfamida
    {
      id: 'ifosfamida',
      nome: 'Ifosfamida',
      sinonimos: ['ifosfamide', 'IFO'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'alquilante-mostarda-nitrogenada',
          subclasse: 'Oxazafosforina',
          contexto: 'quimioterapia de sarcomas, tumores de células germinativas e linfomas em resgate',
          explicacaoFase1:
            'Alquilante usado em sarcomas de partes moles e ósseos, tumores germinativos testiculares recidivados (VIP, TIP) e linfomas em resgate (ICE), sempre com mesna.',
        },
      ],
      mecanismo:
        'Isômero estrutural da ciclofosfamida, também ativado por CYP3A4/CYP2B6 em mostarda isofosforamida, que forma ligações cruzadas no DNA. A ativação é mais lenta e gera mais metabólitos de cadeia lateral, como o cloroacetaldeído (neuro e nefrotóxico), além da acroleína.',
      indicacoes: [
        'Sarcomas de partes moles e osteossarcoma/sarcoma de Ewing',
        'Tumores de células germinativas testiculares recidivados/refratários',
        'Linfomas não Hodgkin e Hodgkin em resgate (ICE)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['ifosfamide'],
      nomesComerciais: [marca('Holoxane', 'referencia', 'Baxter', HOSP + '; administrar sempre com mesna')],
      generico: true,
      eaComuns: [NAUSEA, ALOPECIA, FADIGA],
      eaGraves: [
        t('Encefalopatia (neurotoxicidade central)', 'encefalopatia', 'confusao mental', 'sonolencia', 'neurotoxicidade', 'delirium', 'convulsao'),
        t('Cistite hemorrágica', 'hematuria', 'cistite', 'sangue na urina'),
        t('Nefrotoxicidade tubular (síndrome de Fanconi)', 'sindrome de Fanconi', 'tubulopatia', 'nefrotoxicidade', 'hipofosfatemia'),
        MIELO,
      ],
      eaCaracteristico: 'Encefalopatia (neurotoxicidade central)',
      distratoresEA: [
        'Ototoxicidade',
        'Cardiotoxicidade dose-cumulativa por antraciclina',
        'Neuropatia aguda induzida pelo frio',
        'Síndrome mão-pé (eritrodisestesia palmoplantar)',
      ],
      contraindicacoes: ['Obstrução urinária', 'Insuficiência renal grave', 'Gestação', 'Infecção ativa grave'],
      precaucoes: [
        'Mesna obrigatória em toda administração, além de hiper-hidratação',
        'Monitorar estado mental; azul de metileno é usado empiricamente no tratamento da encefalopatia',
        'Monitorar função tubular (fosfato, bicarbonato, glicosúria), sobretudo em crianças',
        'Citotóxico: manipulação conforme NR 32 e RDC 220/2004',
      ],
      interacoes: ['Indutores/inibidores de CYP3A4 alteram ativação e toxicidade (ex.: aprepitanto associado à encefalopatia)', 'Cisplatina prévia aumenta a nefrotoxicidade'],
      explicacaoFase2:
        'É uma mostarda nitrogenada, prima química da ciclofosfamida: pró-fármaco ativado no fígado que alquila o DNA e forma ligações cruzadas.',
      explicacaoFase3:
        'Sua via de metabolização produz cloroacetaldeído, que atravessa a barreira hematoencefálica e causa encefalopatia; a acroleína, como na ciclofosfamida, causa cistite hemorrágica (prevenida pela mesna).',
      referencias: [...REF_BASE, 'Bula Holoxane (Baxter/Anvisa) e FDA label da ifosfamida', ...REF_MANIP],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Cisplatina
    {
      id: 'cisplatina',
      nome: 'Cisplatina',
      sinonimos: ['cisplatin', 'CDDP', 'cis-diaminodicloroplatina', 'cis-platina'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'composto-platina',
          subclasse: 'Platina de 1ª geração',
          contexto: 'quimioterapia de tumores de testículo, pulmão, cabeça e pescoço, bexiga, colo do útero e ovário',
          explicacaoFase1:
            'Base do tratamento curativo de tumores germinativos de testículo (BEP), quimiorradioterapia de cabeça e pescoço e colo do útero, e esquemas para pulmão, bexiga e ovário.',
        },
      ],
      mecanismo:
        'No citoplasma (baixa concentração de cloreto) sofre aquação, tornando-se eletrófilo que se liga ao N7 de guaninas adjacentes. Forma adutos intrafita 1,2-d(GpG) e ligações cruzadas interfita que distorcem o DNA, bloqueiam replicação e transcrição e ativam apoptose. Ação ciclo-celular inespecífica. Acumula-se nas células tubulares proximais e nas células ciliadas da cóclea.',
      indicacoes: [
        'Tumores de células germinativas de testículo (BEP, EP)',
        'Câncer de pulmão de pequenas e não pequenas células',
        'Carcinoma de cabeça e pescoço (quimiorradioterapia)',
        'Câncer de colo do útero (quimiorradioterapia)',
        'Carcinoma urotelial de bexiga (neoadjuvante e avançado)',
        'Câncer de ovário',
        'Osteossarcoma e outros tumores sólidos',
      ],
      tipoMolecula: 'inorganico',
      pubchem: ['cisplatin'],
      nomesComerciais: [marca('Fauldcispla', 'marca', 'Libbs', HOSP)],
      generico: true,
      eaComuns: [
        t('Náuseas e vômitos intensos (altamente emetogênica)', 'nausea', 'vomito', 'emese', 'NVIQ', 'altamente emetogenica', 'emese tardia'),
        t('Hipomagnesemia', 'magnesio baixo', 'perda renal de magnesio'),
        t('Neuropatia periférica sensitiva (dose cumulativa)', 'neuropatia periferica', 'parestesia', 'formigamento'),
        MIELO,
      ],
      eaGraves: [
        t('Nefrotoxicidade', 'lesao renal aguda', 'insuficiencia renal', 'necrose tubular aguda', 'toxicidade renal'),
        t('Ototoxicidade', 'perda auditiva', 'surdez', 'zumbido', 'tinnitus', 'hipoacusia neurossensorial'),
        t('Hipersensibilidade/anafilaxia', 'anafilaxia', 'alergia'),
      ],
      eaCaracteristico: 'Nefrotoxicidade',
      distratoresEA: [
        'Cistite hemorrágica',
        'Cardiotoxicidade dose-cumulativa por antraciclina',
        'Neuropatia aguda induzida pelo frio',
        'Síndrome mão-pé (eritrodisestesia palmoplantar)',
      ],
      contraindicacoes: ['Insuficiência renal preexistente (ClCr reduzido)', 'Perda auditiva prévia significativa', 'Gestação e amamentação', 'Mielossupressão grave'],
      precaucoes: [
        'Hiper-hidratação com soro fisiológico antes e após; reposição de magnésio (e potássio); evitar outros nefrotóxicos',
        'Profilaxia antiemética tripla/quádrupla (antagonista 5-HT3 + antagonista NK1 + dexametasona ± olanzapina) — MASCC/ESMO e ASCO',
        'Audiometria basal e de seguimento (especialmente em crianças)',
        'Não usar equipamentos com alumínio no preparo (inativação)',
        'Citotóxico: manipulação conforme NR 32 e RDC 220/2004',
      ],
      interacoes: [
        'Aminoglicosídeos, vancomicina, anfotericina B, contraste iodado: nefrotoxicidade aditiva',
        'Diuréticos de alça: ototoxicidade aditiva',
        'Paclitaxel: dar o taxano antes da platina para reduzir mielossupressão',
      ],
      explicacaoFase2:
        'É um composto de platina: dentro da célula, liga-se às guaninas do DNA e cria pontes que dobram a dupla-hélice, impedindo replicação — ação parecida com a dos alquilantes.',
      explicacaoFase3:
        'A cisplatina é captada e concentrada nas células do túbulo proximal (via transportador OCT2), onde causa necrose tubular — por isso nefrotoxicidade e perda de magnésio são marcas do fármaco.',
      referencias: [...REF_BASE, 'Bula da cisplatina (Anvisa) e FDA label', 'MASCC/ESMO Antiemetic Guideline 2023', ...REF_MANIP],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Carboplatina
    {
      id: 'carboplatina',
      nome: 'Carboplatina',
      sinonimos: ['carboplatin', 'CBDCA', 'carbo'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'composto-platina',
          subclasse: 'Platina de 2ª geração',
          contexto: 'quimioterapia de câncer de ovário, pulmão, mama triplo-negativo e cabeça e pescoço',
          explicacaoFase1:
            'Platina com dose calculada pela fórmula de Calvert (AUC), usada em ovário e pulmão (com taxanos), mama triplo-negativo, cabeça e pescoço e quando a cisplatina não é tolerada.',
        },
      ],
      mecanismo:
        'Mesmo mecanismo da cisplatina (adutos e ligações cruzadas no DNA após aquação), mas o grupo de saída ciclobutanodicarboxilato torna a ativação mais lenta. Com isso, é bem menos nefro, oto e neurotóxica e menos emetogênica, porém mais mielotóxica. Eliminação renal: a dose é calculada pela fórmula de Calvert (dose = AUC-alvo × [TFG + 25]).',
      indicacoes: [
        'Câncer de ovário epitelial (com paclitaxel)',
        'Câncer de pulmão de não pequenas e de pequenas células',
        'Câncer de mama triplo-negativo (neoadjuvante, em associação)',
        'Carcinoma de cabeça e pescoço',
        'Tumores germinativos (seminoma estágio I, dose única) e outros tumores sólidos',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['carboplatin'],
      nomesComerciais: [
        marca('Paraplatin', 'referencia', 'Bristol-Myers Squibb', HOSP + '; comercialização possivelmente descontinuada — conferir'),
        marca('Fauldcarbo', 'marca', 'Libbs', HOSP),
      ],
      generico: true,
      eaComuns: [NAUSEA, FADIGA, t('Hipomagnesemia', 'magnesio baixo'), ALOPECIA],
      eaGraves: [
        t('Mielossupressão (trombocitopenia dose-limitante)', 'mielossupressao', 'trombocitopenia', 'plaquetopenia', 'neutropenia', 'anemia'),
        t('Reações de hipersensibilidade (após múltiplos ciclos)', 'anafilaxia', 'alergia a platina', 'hipersensibilidade'),
      ],
      eaCaracteristico: 'Mielossupressão (trombocitopenia dose-limitante)',
      distratoresEA: [
        'Cistite hemorrágica',
        'Neuropatia aguda induzida pelo frio',
        'Cardiotoxicidade dose-cumulativa por antraciclina',
        'Síndrome mão-pé (eritrodisestesia palmoplantar)',
      ],
      contraindicacoes: ['Mielossupressão grave', 'Insuficiência renal grave (ClCr ≤ 20 mL/min) conforme bula', 'Hipersensibilidade a platinas', 'Gestação'],
      precaucoes: [
        'Dose pela fórmula de Calvert com TFG estimada; hemograma antes de cada ciclo',
        'Risco de hipersensibilidade aumenta após o 6º–8º ciclo (re-tratamento em ovário) — dessensibilização em centros experientes',
        'Citotóxico: manipulação conforme NR 32 e RDC 220/2004',
      ],
      interacoes: ['Outros mielossupressores e radioterapia: toxicidade hematológica aditiva', 'Nefrotóxicos: alteram a depuração e aumentam a toxicidade'],
      explicacaoFase2:
        'É um composto de platina como a cisplatina — forma pontes no DNA —, mas sua ativação mais lenta poupa rim, ouvido e nervos.',
      explicacaoFase3:
        'O preço da menor toxicidade orgânica é uma mielotoxicidade maior: a plaquetopenia é a toxicidade dose-limitante da carboplatina.',
      referencias: [...REF_BASE, 'Bula da carboplatina (Anvisa) e FDA label (Paraplatin)', 'Calvert AH et al. J Clin Oncol 1989;7:1748-56', ...REF_MANIP],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Oxaliplatina
    {
      id: 'oxaliplatina',
      nome: 'Oxaliplatina',
      sinonimos: ['oxaliplatin', 'L-OHP', 'FOLFOX', 'oxali'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'composto-platina',
          subclasse: 'Platina de 3ª geração (DACH)',
          contexto: 'quimioterapia de câncer colorretal e de outros tumores gastrointestinais',
          explicacaoFase1:
            'Platina dos tumores gastrointestinais: associada a fluoropirimidina (FOLFOX/CAPOX) no câncer colorretal adjuvante e metastático, e em esquemas para estômago e pâncreas (FOLFIRINOX).',
        },
      ],
      mecanismo:
        'Platina com ligante diaminociclo-hexano (DACH), que forma adutos volumosos no DNA menos reconhecidos pelo sistema de reparo de pareamento incorreto (MMR). Isso explica a atividade em tumores colorretais resistentes à cisplatina e o sinergismo com o 5-FU. O oxalato liberado quelata cálcio e altera canais de sódio voltagem-dependentes nos nervos periféricos.',
      indicacoes: [
        'Câncer colorretal estágio III (adjuvante, FOLFOX ou CAPOX)',
        'Câncer colorretal metastático',
        'Câncer gástrico/junção esofagogástrica e pancreático em esquemas combinados (verificar bula vigente)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['oxaliplatin'],
      nomesComerciais: [marca('Eloxatin', 'referencia', 'Sanofi', HOSP)],
      generico: true,
      eaComuns: [
        t('Neuropatia aguda induzida pelo frio', 'disestesia ao frio', 'parestesia ao frio', 'formigamento com frio', 'disestesia faringolaringea', 'neuropatia aguda'),
        NAUSEA,
        t('Diarreia', 'evacuacoes liquidas'),
        FADIGA,
        t('Trombocitopenia leve a moderada', 'plaquetopenia', 'plaquetas baixas'),
      ],
      eaGraves: [
        t('Neuropatia periférica sensitiva crônica cumulativa', 'neuropatia cronica', 'neuropatia periferica', 'perda de sensibilidade', 'ataxia sensitiva'),
        t('Reações de hipersensibilidade/anafilaxia', 'anafilaxia', 'alergia a platina'),
        MIELO,
      ],
      eaCaracteristico: 'Neuropatia aguda induzida pelo frio',
      distratoresEA: [
        'Cistite hemorrágica',
        'Cardiotoxicidade dose-cumulativa por antraciclina',
        'Nefrotoxicidade grave com hipomagnesemia acentuada',
        'Hipotireoidismo imunomediado',
      ],
      contraindicacoes: ['Neuropatia periférica com comprometimento funcional prévia', 'Mielossupressão grave', 'Insuficiência renal grave', 'Gestação e amamentação'],
      precaucoes: [
        'Orientar evitar frio (bebidas geladas, contato com metais/ar frio) nos dias seguintes à infusão',
        'Reduzir dose ou suspender conforme grau da neuropatia; CAPOX por 3 meses tem menos neuropatia que 6 meses (estudo IDEA) em baixo risco',
        'Diluir em glicose 5% (incompatível com soluções salinas/cloreto)',
        'Citotóxico: manipulação conforme NR 32 e RDC 220/2004',
      ],
      interacoes: ['Fluoropirimidinas: sinergismo terapêutico e toxicidade aditiva', 'Fármacos que prolongam QT: relatos de prolongamento de QT (bula)'],
      explicacaoFase2:
        'É um composto de platina de 3ª geração: forma adutos volumosos no DNA que escapam do sistema de reparo, por isso funciona no câncer colorretal.',
      explicacaoFase3:
        'A oxaliplatina (via oxalato) altera canais de sódio dos nervos periféricos, que ficam hiperexcitáveis ao frio: formigamento nas mãos, boca e garganta logo após a infusão é a assinatura do fármaco.',
      referencias: [...REF_BASE, 'Bula Eloxatin (Sanofi/Anvisa) e FDA label', 'Grothey A et al. N Engl J Med 2018;378:1177-88 (IDEA)', ...REF_MANIP],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Doxorrubicina
    {
      id: 'doxorrubicina',
      nome: 'Doxorrubicina',
      sinonimos: ['doxorubicin', 'adriamicina', 'adriamycin', 'cloridrato de doxorrubicina', 'doxo'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'antraciclina',
          contexto: 'quimioterapia de câncer de mama, linfomas, sarcomas e leucemias',
          explicacaoFase1:
            'Antraciclina de amplo espectro: câncer de mama (AC), linfomas (R-CHOP, ABVD), sarcomas, leucemias agudas, mieloma e tumores pediátricos.',
        },
      ],
      mecanismo:
        'Intercala-se entre pares de bases do DNA e estabiliza o complexo clivável da topoisomerase II, gerando quebras de fita dupla. O anel quinona sofre ciclagem redox com geração de espécies reativas de oxigênio, potencializada por ferro. A cardiotoxicidade decorre do estresse oxidativo e da inibição da topoisomerase IIβ nos cardiomiócitos, com disfunção mitocondrial. Atua de forma ciclo-celular inespecífica, com efeito máximo em S/G2.',
      indicacoes: [
        'Câncer de mama (adjuvante/neoadjuvante — AC/EC; metastático)',
        'Linfoma não Hodgkin (R-CHOP) e linfoma de Hodgkin (ABVD)',
        'Sarcomas de partes moles e ósseos',
        'Leucemias agudas',
        'Tumores pediátricos (Wilms, neuroblastoma)',
        'Carcinomas de bexiga, ovário, tireoide e estômago',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['doxorubicin'],
      nomesComerciais: [
        marca('Adriblastina', 'referencia', 'Pfizer', HOSP),
        marca('Fauldoxo', 'marca', 'Libbs', HOSP),
      ],
      generico: true,
      eaComuns: [
        ALOPECIA,
        NAUSEA,
        MUCOSITE,
        t('Coloração avermelhada da urina', 'urina vermelha', 'urina alaranjada', 'urina rosada'),
      ],
      eaGraves: [
        t('Cardiotoxicidade dose-cumulativa (insuficiência cardíaca)', 'cardiotoxicidade', 'cardiomiopatia', 'insuficiencia cardiaca', 'queda da fracao de ejecao', 'cardiomiopatia dilatada'),
        MIELO,
        EXTRAVASAMENTO,
        t('Leucemia mieloide aguda secundária', 'leucemia secundaria', 'LMA secundaria', 'segunda neoplasia'),
      ],
      eaCaracteristico: 'Cardiotoxicidade dose-cumulativa (insuficiência cardíaca)',
      distratoresEA: ['Cistite hemorrágica', 'Ototoxicidade', 'Neuropatia aguda induzida pelo frio', 'Toxicidade cerebelar por altas doses de citarabina'],
      contraindicacoes: [
        'Insuficiência cardíaca ou FEVE reduzida',
        'Dose cumulativa máxima de antraciclinas já atingida',
        'Insuficiência hepática grave',
        'Mielossupressão grave',
        'Gestação',
      ],
      precaucoes: [
        'Ecocardiograma/FEVE basal e seriado; risco cresce acentuadamente acima de ~450–550 mg/m² cumulativos (limite usual 450–550 mg/m², menor com radioterapia mediastinal ou trastuzumabe)',
        'Dexrazoxano pode ser usado como cardioprotetor em situações selecionadas e no extravasamento',
        'Vesicante: acesso venoso seguro (preferir cateter central); protocolo de extravasamento',
        'Reduzir dose em hiperbilirrubinemia',
        'Citotóxico: manipulação conforme NR 32 e RDC 220/2004',
      ],
      interacoes: [
        'Trastuzumabe: cardiotoxicidade aditiva — evitar uso concomitante',
        'Ciclofosfamida em alta dose e radioterapia mediastinal: maior cardiotoxicidade',
        'Paclitaxel antes da doxorrubicina aumenta níveis de doxorrubicina',
        'Inibidores/indutores de CYP3A4 e P-gp alteram a exposição',
      ],
      explicacaoFase2:
        'É uma antraciclina: intercala-se no DNA e trava a topoisomerase II, provocando quebras na dupla-hélice; também gera radicais livres.',
      explicacaoFase3:
        'O coração tem poucas defesas antioxidantes e expressa topoisomerase IIβ: os radicais livres e a lesão mitocondrial se acumulam a cada ciclo, causando cardiomiopatia dependente da dose cumulativa.',
      referencias: [...REF_BASE, 'Bula Adriblastina (Pfizer/Anvisa) e FDA label da doxorrubicina', 'ESC Guidelines on cardio-oncology 2022', ...REF_MANIP],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Daunorrubicina
    {
      id: 'daunorrubicina',
      nome: 'Daunorrubicina',
      sinonimos: ['daunorubicin', 'daunomicina', 'rubidomicina', 'cloridrato de daunorrubicina'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'antraciclina',
          contexto: 'quimioterapia de indução de leucemias agudas',
          explicacaoFase1:
            'Antraciclina usada sobretudo na indução de leucemia mieloide aguda (7+3 com citarabina) e de leucemia linfoblástica aguda.',
        },
      ],
      mecanismo:
        'Como a doxorrubicina, intercala-se no DNA, inibe a topoisomerase II e gera radicais livres por ciclagem redox. Seu espectro clínico é concentrado nas leucemias agudas.',
      indicacoes: ['Leucemia mieloide aguda — indução (7+3 com citarabina)', 'Leucemia linfoblástica aguda — indução'],
      tipoMolecula: 'pequena',
      pubchem: ['daunorubicin'],
      nomesComerciais: [],
      generico: false,
      eaComuns: [ALOPECIA, NAUSEA, MUCOSITE, t('Coloração avermelhada da urina', 'urina vermelha', 'urina alaranjada')],
      eaGraves: [
        t('Cardiotoxicidade dose-cumulativa (insuficiência cardíaca)', 'cardiotoxicidade', 'cardiomiopatia', 'insuficiencia cardiaca', 'queda da fracao de ejecao'),
        MIELO,
        EXTRAVASAMENTO,
        NEUTRO_FEBRIL,
      ],
      eaCaracteristico: 'Cardiotoxicidade dose-cumulativa (insuficiência cardíaca)',
      distratoresEA: ['Cistite hemorrágica', 'Ototoxicidade', 'Neuropatia aguda induzida pelo frio', 'Síndrome mão-pé (eritrodisestesia palmoplantar)'],
      contraindicacoes: ['Insuficiência cardíaca ou FEVE reduzida', 'Dose cumulativa máxima de antraciclinas atingida', 'Insuficiência hepática ou renal grave', 'Gestação'],
      precaucoes: [
        'Monitorar FEVE; considerar a dose cumulativa total de todas as antraciclinas recebidas (doses equivalentes)',
        'Vesicante: acesso venoso seguro e protocolo de extravasamento',
        'Ajustar dose em disfunção hepática e renal',
        'Citotóxico: manipulação conforme NR 32 e RDC 220/2004',
      ],
      interacoes: ['Outros cardiotóxicos (trastuzumabe, ciclofosfamida em alta dose): toxicidade aditiva', 'Outros mielossupressores: toxicidade hematológica aditiva'],
      explicacaoFase2: 'É uma antraciclina: intercala-se no DNA, inibe a topoisomerase II e forma radicais livres — o mesmo mecanismo da doxorrubicina.',
      explicacaoFase3:
        'Compartilha com as outras antraciclinas a cardiotoxicidade por estresse oxidativo, que depende da dose total acumulada ao longo do tratamento.',
      referencias: [...REF_BASE, 'FDA label da daunorrubicina', ...REF_MANIP],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Paclitaxel
    {
      id: 'paclitaxel',
      nome: 'Paclitaxel',
      sinonimos: ['paclitaxel', 'taxol', 'paclitaxol'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'taxano',
          contexto: 'quimioterapia de câncer de mama, ovário, pulmão e outros tumores sólidos',
          explicacaoFase1:
            'Taxano usado em câncer de mama (adjuvante semanal após AC, metastático), ovário (com carboplatina), pulmão não pequenas células, estômago, esôfago, colo do útero e sarcoma de Kaposi.',
        },
      ],
      mecanismo:
        'Liga-se à subunidade β-tubulina na face interna do microtúbulo e promove polimerização com estabilização excessiva, impedindo a despolimerização dinâmica. O fuso mitótico torna-se não funcional e a célula para na transição metáfase–anáfase (fase M), evoluindo para apoptose. A formulação convencional usa Cremophor EL (óleo de rícino polioxietilado), responsável por reações de hipersensibilidade.',
      indicacoes: [
        'Câncer de mama (adjuvante, neoadjuvante e metastático)',
        'Câncer de ovário (com carboplatina)',
        'Câncer de pulmão de não pequenas células',
        'Sarcoma de Kaposi associado à aids',
        'Câncer gástrico, de esôfago, de colo do útero e de cabeça e pescoço em esquemas combinados (conforme diretrizes)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['paclitaxel'],
      nomesComerciais: [marca('Taxol', 'referencia', 'Bristol-Myers Squibb', HOSP)],
      generico: true,
      eaComuns: [
        t('Neuropatia periférica sensitiva', 'neuropatia periferica', 'parestesia', 'formigamento', 'dormencia em luva e bota'),
        ALOPECIA,
        t('Artralgia e mialgia', 'dor muscular', 'dor articular', 'mialgia'),
        NAUSEA,
      ],
      eaGraves: [
        t('Reações de hipersensibilidade infusional (Cremophor)', 'anafilaxia', 'hipersensibilidade', 'reacao infusional', 'broncoespasmo na infusao'),
        t('Neutropenia', 'mielossupressao', 'leucopenia', 'granulocitopenia'),
        NEUTRO_FEBRIL,
        t('Bradiarritmias', 'bradicardia', 'bloqueio atrioventricular'),
      ],
      eaCaracteristico: 'Neuropatia periférica sensitiva',
      distratoresEA: ['Cistite hemorrágica', 'Cardiotoxicidade dose-cumulativa por antraciclina', 'Ototoxicidade', 'Síndrome mão-pé (eritrodisestesia palmoplantar)'],
      contraindicacoes: ['Hipersensibilidade ao paclitaxel ou ao óleo de rícino polioxietilado', 'Neutrófilos < 1.500/mm³ (tumores sólidos)', 'Gestação e amamentação'],
      precaucoes: [
        'Pré-medicação obrigatória: dexametasona + anti-histamínico H1 + antagonista H2',
        'Usar equipo sem PVC (DEHP) com filtro em linha',
        'Ajustar ou suspender conforme neuropatia; reduzir dose em hepatopatia',
        'Citotóxico: manipulação conforme NR 32 e RDC 220/2004',
      ],
      interacoes: [
        'Metabolizado por CYP2C8 e CYP3A4: inibidores (cetoconazol, gemfibrozila, claritromicina) aumentam a toxicidade; indutores reduzem eficácia',
        'Cisplatina antes do paclitaxel reduz sua depuração — administrar o taxano primeiro',
        'Doxorrubicina: o paclitaxel aumenta a exposição à doxorrubicina',
      ],
      explicacaoFase2:
        'É um taxano: em vez de desmontar, "congela" os microtúbulos estabilizando-os; sem dinâmica do fuso, a célula não completa a mitose.',
      explicacaoFase3:
        'Os neurônios dependem de microtúbulos para o transporte axonal; a estabilização excessiva prejudica os axônios longos e causa neuropatia sensitiva em "luva e bota".',
      referencias: [...REF_BASE, 'Bula Taxol (BMS/Anvisa) e FDA label', ...REF_MANIP],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Docetaxel
    {
      id: 'docetaxel',
      nome: 'Docetaxel',
      sinonimos: ['docetaxel', 'docetaxol', 'taxotere'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'taxano',
          contexto: 'quimioterapia de câncer de mama, próstata, pulmão e estômago',
          explicacaoFase1:
            'Taxano usado em câncer de mama (TC, TCH, AC-T), próstata (metastático, com privação androgênica), pulmão não pequenas células, estômago (FLOT) e cabeça e pescoço.',
        },
      ],
      mecanismo:
        'Taxano semissintético que se liga à β-tubulina e estabiliza os microtúbulos, bloqueando a célula em mitose (fase M). Tem maior afinidade pela tubulina que o paclitaxel e é formulado com polissorbato 80 em vez de Cremophor. Metabolizado por CYP3A4.',
      indicacoes: [
        'Câncer de mama (adjuvante, neoadjuvante e metastático; com trastuzumabe no HER2+)',
        'Câncer de próstata metastático (resistente e sensível à castração, com privação androgênica)',
        'Câncer de pulmão de não pequenas células',
        'Adenocarcinoma gástrico/junção esofagogástrica (FLOT)',
        'Carcinoma de cabeça e pescoço (indução, TPF)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['docetaxel'],
      nomesComerciais: [marca('Taxotere', 'referencia', 'Sanofi', HOSP)],
      generico: true,
      eaComuns: [
        t('Retenção hídrica (edema periférico e derrames)', 'retencao de liquido', 'edema', 'inchaco', 'derrame pleural', 'retencao hidrica'),
        ALOPECIA,
        t('Alterações ungueais (onicólise)', 'onicolise', 'unhas', 'distrofia ungueal'),
        MUCOSITE,
        t('Neuropatia periférica sensitiva', 'neuropatia', 'parestesia', 'formigamento'),
      ],
      eaGraves: [
        t('Neutropenia', 'mielossupressao', 'leucopenia', 'granulocitopenia'),
        NEUTRO_FEBRIL,
        t('Reações de hipersensibilidade', 'anafilaxia', 'reacao infusional'),
        t('Alopecia permanente', 'alopecia irreversivel', 'perda de cabelo permanente'),
      ],
      eaCaracteristico: 'Retenção hídrica (edema periférico e derrames)',
      distratoresEA: ['Cistite hemorrágica', 'Cardiotoxicidade dose-cumulativa por antraciclina', 'Ototoxicidade', 'Neuropatia aguda induzida pelo frio'],
      contraindicacoes: ['Neutrófilos < 1.500/mm³', 'Insuficiência hepática grave (bilirrubina acima do limite / transaminases muito elevadas)', 'Hipersensibilidade ao docetaxel ou ao polissorbato 80', 'Gestação'],
      precaucoes: [
        'Pré-medicação com dexametasona oral (iniciada na véspera) reduz retenção hídrica e hipersensibilidade',
        'Avaliar função hepática antes de cada ciclo (toxicidade grave em hepatopatas)',
        'G-CSF profilático em esquemas de alto risco de neutropenia febril',
        'Citotóxico: manipulação conforme NR 32 e RDC 220/2004',
      ],
      interacoes: ['Inibidores fortes de CYP3A4 (cetoconazol, ritonavir, claritromicina): aumento da toxicidade — evitar ou reduzir dose', 'Indutores de CYP3A4: redução da eficácia'],
      explicacaoFase2:
        'É um taxano: estabiliza os microtúbulos e impede o desmonte do fuso mitótico, bloqueando a mitose — mesmo mecanismo do paclitaxel, com maior potência.',
      explicacaoFase3:
        'O docetaxel aumenta a permeabilidade capilar de forma cumulativa, levando a edema e derrames cavitários — uma toxicidade típica dele, atenuada pela pré-medicação com corticoide.',
      referencias: [...REF_BASE, 'Bula Taxotere (Sanofi/Anvisa) e FDA label', ...REF_MANIP],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Vincristina
    {
      id: 'vincristina',
      nome: 'Vincristina',
      sinonimos: ['vincristine', 'sulfato de vincristina', 'oncovin', 'VCR'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'alcaloide-vinca',
          contexto: 'quimioterapia de leucemia linfoblástica aguda, linfomas e tumores pediátricos',
          explicacaoFase1:
            'Alcaloide da vinca pouco mielotóxico, por isso fácil de combinar: LLA (indução), linfomas (R-CHOP, CHOP), Hodgkin e tumores pediátricos (Wilms, rabdomiossarcoma, neuroblastoma).',
        },
      ],
      mecanismo:
        'Liga-se à β-tubulina na extremidade do microtúbulo e impede a polimerização, desestruturando o fuso mitótico e bloqueando a célula em metáfase (fase M). Também compromete os microtúbulos axonais, responsáveis pelo transporte de organelas e neurotransmissores ao longo do nervo. É metabolizada por CYP3A4 e excretada pela bile.',
      indicacoes: [
        'Leucemia linfoblástica aguda',
        'Linfomas não Hodgkin (R-CHOP) e linfoma de Hodgkin',
        'Tumores pediátricos: tumor de Wilms, rabdomiossarcoma, neuroblastoma, sarcoma de Ewing',
        'Mieloma múltiplo e outros tumores em esquemas específicos',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['vincristine'],
      nomesComerciais: [marca('Fauldvincri', 'marca', 'Libbs', HOSP + '; EXCLUSIVAMENTE intravenosa — fatal por via intratecal')],
      generico: true,
      eaComuns: [
        t('Constipação', 'prisao de ventre', 'obstipacao', 'intestino preso'),
        t('Neuropatia periférica (sensitivo-motora e autonômica)', 'neuropatia periferica', 'parestesia', 'perda de reflexos', 'arreflexia', 'neuropatia', 'formigamento'),
        ALOPECIA,
        t('Dor mandibular', 'dor na mandibula', 'dor no maxilar'),
      ],
      eaGraves: [
        t('Íleo paralítico', 'ileo paralitico', 'ileo adinamico', 'obstrucao intestinal funcional'),
        t('Morte por administração intratecal inadvertida', 'via intratecal fatal', 'mielite ascendente', 'erro de via'),
        EXTRAVASAMENTO,
        t('Hiponatremia por SIADH', 'SIADH', 'hiponatremia'),
      ],
      eaCaracteristico: 'Neuropatia periférica (sensitivo-motora e autonômica)',
      distratoresEA: ['Mielossupressão grave dose-limitante', 'Cistite hemorrágica', 'Cardiotoxicidade dose-cumulativa por antraciclina', 'Nefrotoxicidade'],
      contraindicacoes: [
        'Via intratecal (fatal) — uso exclusivamente intravenoso',
        'Doença de Charcot-Marie-Tooth (forma desmielinizante)',
        'Neuropatia grave preexistente',
        'Uso concomitante de radioterapia hepática',
      ],
      precaucoes: [
        'Rotular "FATAL SE ADMINISTRADA POR OUTRAS VIAS — USO EXCLUSIVO INTRAVENOSO"; preparar em minibag (recomendação OMS/ISMP) em vez de seringa para evitar troca com intratecais',
        'Dose usualmente limitada a 2 mg por aplicação em adultos (cap de dose)',
        'Profilaxia de constipação (laxativos) desde o início',
        'Vesicante: acesso venoso seguro e protocolo de extravasamento',
        'Citotóxico: manipulação conforme NR 32 e RDC 220/2004',
      ],
      interacoes: [
        'Azólicos (itraconazol, posaconazol, voriconazol) e outros inibidores de CYP3A4: neurotoxicidade grave',
        'Outros neurotóxicos (bortezomibe, taxanos, platinas): neuropatia aditiva',
        'Asparaginase antes da vincristina pode reduzir sua depuração',
      ],
      explicacaoFase2:
        'É um alcaloide da vinca: impede a montagem dos microtúbulos (efeito oposto ao dos taxanos), e sem fuso mitótico a célula para na metáfase.',
      explicacaoFase3:
        'Os axônios dependem de microtúbulos para o transporte; ao bloqueá-los, a vincristina causa neuropatia periférica e autonômica (constipação, íleo). Por ser pouco mielotóxica, a neurotoxicidade é sua toxicidade dose-limitante — e pela via intratecal causa lesão do SNC fatal.',
      referencias: [...REF_BASE, 'Bula da vincristina (Anvisa) e FDA label', 'WHO/ISMP — Information Exchange System Alert: vincristine (minibag)', ...REF_MANIP],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Vimblastina
    {
      id: 'vimblastina',
      nome: 'Vimblastina',
      sinonimos: ['vinblastine', 'sulfato de vimblastina', 'vinblastina', 'VLB'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'alcaloide-vinca',
          contexto: 'quimioterapia de linfoma de Hodgkin e tumores germinativos',
          explicacaoFase1:
            'Alcaloide da vinca do esquema ABVD (linfoma de Hodgkin), de esquemas de tumores germinativos (VeIP) e de histiocitose de células de Langerhans e sarcoma de Kaposi.',
        },
      ],
      mecanismo:
        'Como a vincristina, liga-se à tubulina e inibe a polimerização dos microtúbulos, bloqueando a mitose em metáfase. Difere pelo perfil de toxicidade: é mais mielotóxica e menos neurotóxica.',
      indicacoes: [
        'Linfoma de Hodgkin (ABVD)',
        'Tumores de células germinativas de testículo (esquemas de resgate)',
        'Histiocitose de células de Langerhans',
        'Sarcoma de Kaposi e carcinoma urotelial (MVAC — esquema histórico)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['vinblastine'],
      nomesComerciais: [],
      generico: false,
      eaComuns: [ALOPECIA, NAUSEA, t('Constipação', 'prisao de ventre', 'obstipacao'), MUCOSITE],
      eaGraves: [
        t('Mielossupressão (dose-limitante)', 'mielossupressao', 'neutropenia', 'leucopenia', 'plaquetopenia'),
        EXTRAVASAMENTO,
        t('Morte por administração intratecal inadvertida', 'via intratecal fatal', 'erro de via'),
        t('Neuropatia periférica', 'neuropatia', 'parestesia'),
      ],
      eaCaracteristico: 'Mielossupressão (dose-limitante)',
      distratoresEA: ['Cistite hemorrágica', 'Cardiotoxicidade dose-cumulativa por antraciclina', 'Ototoxicidade', 'Síndrome mão-pé (eritrodisestesia palmoplantar)'],
      contraindicacoes: ['Via intratecal (fatal) — uso exclusivamente intravenoso', 'Leucopenia grave', 'Infecção bacteriana ativa não controlada'],
      precaucoes: [
        'Mesmas salvaguardas de via da vincristina (rotulagem "uso exclusivo IV", minibag)',
        'Hemograma antes de cada dose',
        'Vesicante: protocolo de extravasamento',
        'Citotóxico: manipulação conforme NR 32 e RDC 220/2004',
      ],
      interacoes: ['Inibidores de CYP3A4 (azólicos, macrolídeos): aumento da toxicidade', 'Outros mielossupressores: toxicidade aditiva'],
      explicacaoFase2: 'É um alcaloide da vinca: bloqueia a polimerização dos microtúbulos e impede a formação do fuso mitótico (fase M).',
      explicacaoFase3:
        'Apesar do mecanismo igual ao da vincristina, a vimblastina tem mais efeito sobre a medula óssea: a mielossupressão — e não a neuropatia — limita sua dose (memória: "vinBlastina → Blood/medula").',
      referencias: [...REF_BASE, 'FDA label da vimblastina', ...REF_MANIP],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Imatinibe
    {
      id: 'imatinibe',
      nome: 'Imatinibe',
      sinonimos: ['imatinib', 'mesilato de imatinibe', 'imatinib mesylate', 'STI-571', 'imatinib'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'itk-bcr-abl',
          subclasse: 'TKI de 1ª geração (BCR-ABL, KIT, PDGFR)',
          contexto: 'terapia-alvo oral de leucemia mieloide crônica Ph+ e GIST KIT+',
          explicacaoFase1:
            'Primeiro inibidor de tirosina-quinase da prática clínica: transformou a LMC Ph+ (BCR-ABL) em doença crônica controlável e é o tratamento do GIST com mutação de KIT (CD117).',
        },
      ],
      mecanismo:
        'Liga-se à conformação inativa do domínio quinase de ABL e ocupa o bolso do ATP, impedindo a fosforilação de substratos pela proteína de fusão BCR-ABL, produto da translocação t(9;22) (cromossomo Philadelphia). Também inibe KIT e PDGFR-α/β. Sem sinal proliferativo constitutivo, as células dependentes do oncogene entram em apoptose. Resistência por mutações no domínio quinase (ex.: T315I) motiva TKIs de 2ª/3ª geração.',
      indicacoes: [
        'Leucemia mieloide crônica Ph+ (BCR-ABL+) em fase crônica, acelerada ou blástica',
        'Leucemia linfoblástica aguda Ph+ (com quimioterapia)',
        'Tumor estromal gastrointestinal (GIST) KIT+ irressecável/metastático e adjuvante de alto risco',
        'Dermatofibrossarcoma protuberante',
        'Síndrome hipereosinofílica / leucemia eosinofílica crônica com FIP1L1-PDGFRA e mastocitose sistêmica sem mutação D816V de KIT',
        'Doenças mielodisplásicas/mieloproliferativas com rearranjo de PDGFR',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['imatinib'],
      nomesComerciais: [marca('Glivec', 'referencia', 'Novartis', 'comprimidos orais; prescrição oncológica')],
      generico: true,
      eaComuns: [
        t('Edema periorbital e retenção hídrica', 'edema periorbital', 'retencao hidrica', 'inchaco ao redor dos olhos', 'edema', 'edema periferico'),
        NAUSEA,
        t('Cãibras musculares', 'caibras', 'espasmos musculares', 'mialgia'),
        t('Diarreia', 'evacuacoes liquidas'),
        t('Exantema', 'rash', 'erupcao cutanea'),
        FADIGA,
      ],
      eaGraves: [
        MIELO,
        t('Hepatotoxicidade', 'hepatite', 'elevacao de transaminases', 'lesao hepatica'),
        t('Retenção hídrica grave (derrame pleural/pericárdico)', 'derrame pleural', 'derrame pericardico', 'anasarca'),
        t('Insuficiência cardíaca congestiva (rara)', 'insuficiencia cardiaca', 'cardiotoxicidade'),
        t('Hemorragia gastrointestinal (GIST)', 'sangramento digestivo', 'hemorragia tumoral'),
      ],
      eaCaracteristico: 'Edema periorbital e retenção hídrica',
      distratoresEA: ['Cistite hemorrágica', 'Neuropatia aguda induzida pelo frio', 'Cardiotoxicidade dose-cumulativa por antraciclina', 'Hipotireoidismo imunomediado'],
      contraindicacoes: ['Hipersensibilidade ao imatinibe', 'Gestação (teratogênico) e amamentação'],
      precaucoes: [
        'Tomar com alimento e um copo grande de água (reduz irritação GI)',
        'Hemograma semanal no primeiro mês, depois periódico; função hepática mensal no início',
        'Monitorar resposta molecular na LMC (BCR-ABL por PCR quantitativo, escala internacional) — marcos aos 3, 6 e 12 meses (ELN)',
        'Pesar regularmente (retenção hídrica)',
        'Aderência é determinante: falhas de doses comprometem a resposta',
      ],
      interacoes: [
        'Substrato de CYP3A4: inibidores (cetoconazol, claritromicina, toranja) aumentam níveis; indutores (rifampicina, carbamazepina, fenitoína, erva-de-são-joão) reduzem eficácia',
        'Inibe CYP3A4 e CYP2D6: aumenta níveis de sinvastatina, ciclosporina e outros substratos',
        'Paracetamol em doses altas: risco hepático (inibição da glicuronidação)',
      ],
      explicacaoFase2:
        'É um inibidor de tirosina-quinase: uma pequena molécula que entra no bolso de ATP da proteína anormal BCR-ABL e a desliga, interrompendo o sinal que faz as células da LMC proliferarem.',
      explicacaoFase3:
        'A inibição de PDGFR e KIT em tecidos normais altera a homeostase de fluidos intersticiais, causando edema — classicamente periorbital — e retenção hídrica.',
      referencias: [...REF_BASE, 'Bula Glivec (Novartis/Anvisa) e FDA label', 'Hochhaus A et al. European LeukemiaNet 2020 recommendations for CML. Leukemia 2020;34:966-84', 'NCCN Guidelines — Chronic Myeloid Leukemia (2025)'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Osimertinibe
    {
      id: 'osimertinibe',
      nome: 'Osimertinibe',
      sinonimos: ['osimertinib', 'mesilato de osimertinibe', 'AZD9291', 'osimertinib mesylate'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'itk-egfr',
          subclasse: 'TKI de EGFR de 3ª geração (irreversível; ativo contra T790M)',
          contexto: 'terapia-alvo oral do câncer de pulmão não pequenas células com mutação de EGFR',
          explicacaoFase1:
            'TKI oral para CPNPC com mutação ativadora de EGFR (deleção do éxon 19 ou L858R) — em primeira linha, após resistência por T790M e em adjuvância após ressecção.',
        },
      ],
      mecanismo:
        'Liga-se covalentemente (irreversivelmente) à cisteína 797 no sítio de ATP do EGFR, inibindo seletivamente as formas mutadas sensibilizantes (del19, L858R) e a mutação de resistência T790M, com relativa preservação do EGFR selvagem. Bloqueia as vias RAS-RAF-MEK-ERK e PI3K-AKT. Tem boa penetração no sistema nervoso central, relevante para metástases cerebrais. A mutação C797S é um mecanismo de resistência.',
      indicacoes: [
        'CPNPC avançado/metastático com mutação de EGFR (del19 ou L858R) — primeira linha (monoterapia ou com quimioterapia de platina-pemetrexede)',
        'CPNPC avançado com mutação T790M após progressão a TKI de EGFR anterior',
        'Adjuvante após ressecção completa de CPNPC estágios IB–IIIA com mutação de EGFR',
        'CPNPC estágio III irressecável com EGFR mutado após quimiorradioterapia (verificar aprovação na bula brasileira vigente)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['osimertinib'],
      nomesComerciais: [marca('Tagrisso', 'referencia', 'AstraZeneca', 'comprimidos orais; prescrição oncológica')],
      generico: false,
      eaComuns: [
        t('Diarreia', 'evacuacoes liquidas', 'fezes amolecidas'),
        t('Erupção acneiforme (rash)', 'rash acneiforme', 'acne', 'foliculite', 'rash', 'erupcao cutanea'),
        t('Pele seca e prurido', 'xerose', 'pele seca', 'coceira'),
        t('Paroníquia', 'paroniquia', 'inflamacao em volta da unha', 'unheiro'),
        MUCOSITE,
      ],
      eaGraves: [
        t('Doença pulmonar intersticial / pneumonite', 'pneumonite', 'doenca pulmonar intersticial', 'DPI'),
        t('Prolongamento do intervalo QT', 'QT longo', 'arritmia', 'torsades de pointes'),
        t('Redução da fração de ejeção / insuficiência cardíaca', 'insuficiencia cardiaca', 'queda da FEVE', 'cardiomiopatia'),
        t('Ceratite', 'inflamacao da cornea'),
      ],
      eaCaracteristico: 'Erupção acneiforme (rash)',
      distratoresEA: ['Cistite hemorrágica', 'Ototoxicidade', 'Neuropatia aguda induzida pelo frio', 'Edema periorbital por inibição de PDGFR'],
      contraindicacoes: ['Hipersensibilidade ao osimertinibe', 'Uso com erva-de-são-joão (indutor potente)', 'Gestação e amamentação'],
      precaucoes: [
        'Exige teste molecular de EGFR (tecido ou biópsia líquida) antes do início',
        'ECG e eletrólitos (K, Mg) basais e periódicos; ecocardiograma em pacientes com fatores de risco',
        'Suspender e investigar diante de sintomas respiratórios novos (DPI)',
      ],
      interacoes: [
        'Indutores fortes de CYP3A4 (rifampicina, carbamazepina, fenitoína) reduzem significativamente a exposição — evitar',
        'Outros fármacos que prolongam QT: risco aditivo',
        'Substratos de BCRP e P-gp (ex.: rosuvastatina) podem ter níveis aumentados',
      ],
      explicacaoFase2:
        'É um TKI de EGFR de 3ª geração: liga-se de forma irreversível ao EGFR mutado — inclusive com a mutação de resistência T790M — e desliga o sinal de crescimento do tumor.',
      explicacaoFase3:
        'O EGFR normal da pele e dos folículos também é parcialmente inibido, alterando a diferenciação de queratinócitos: daí o rash acneiforme, a pele seca e a paroníquia, típicos dos inibidores de EGFR.',
      referencias: [...REF_BASE, 'Bula Tagrisso (AstraZeneca/Anvisa) e FDA label', 'Soria JC et al. N Engl J Med 2018;378:113-25 (FLAURA)', 'Wu YL et al. N Engl J Med 2020;383:1711-23 (ADAURA)', 'NCCN Guidelines — Non-Small Cell Lung Cancer (2025)'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Trastuzumabe
    {
      id: 'trastuzumabe',
      nome: 'Trastuzumabe',
      sinonimos: ['trastuzumab', 'anti-HER2'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'anticorpo-anti-her2',
          contexto: 'terapia-alvo do câncer de mama e gástrico HER2-positivo',
          explicacaoFase1:
            'Anticorpo monoclonal para tumores com superexpressão/amplificação de HER2 (IHQ 3+ ou ISH+): câncer de mama inicial e metastático e adenocarcinoma gástrico metastático.',
        },
      ],
      mecanismo:
        'Anticorpo IgG1 humanizado que se liga ao subdomínio IV extracelular do HER2. Inibe a sinalização independente de ligante e a clivagem do domínio extracelular, reduz a ativação de PI3K-AKT e MAPK e recruta células NK, promovendo ADCC. Só é eficaz em tumores HER2-positivos, o que torna o biomarcador obrigatório.',
      indicacoes: [
        'Câncer de mama inicial HER2+ (neoadjuvante/adjuvante, por 1 ano no total, com quimioterapia ± pertuzumabe)',
        'Câncer de mama metastático HER2+ (com taxano e pertuzumabe em 1ª linha)',
        'Adenocarcinoma gástrico ou da junção esofagogástrica metastático HER2+ (com cisplatina e fluoropirimidina)',
      ],
      tipoMolecula: 'anticorpo',
      pubchem: [],
      nomesComerciais: [marca('Herceptin', 'referencia', 'Roche', HOSP + '; há apresentação IV e subcutânea; biossimilares registrados')],
      generico: false,
      eaComuns: [
        INFUSIONAL,
        t('Diarreia', 'evacuacoes liquidas'),
        FADIGA,
        t('Cefaleia', 'dor de cabeca'),
      ],
      eaGraves: [
        t('Disfunção ventricular esquerda (queda da FEVE)', 'cardiotoxicidade', 'queda da fracao de ejecao', 'insuficiencia cardiaca', 'disfuncao ventricular', 'cardiomiopatia'),
        t('Toxicidade embriofetal (oligoidrâmnio)', 'oligoidramnio', 'oligodramnio', 'toxicidade fetal'),
        t('Toxicidade pulmonar / pneumonite', 'pneumonite', 'doenca pulmonar intersticial'),
      ],
      eaCaracteristico: 'Disfunção ventricular esquerda (queda da FEVE)',
      distratoresEA: ['Cistite hemorrágica', 'Neuropatia aguda induzida pelo frio', 'Mielossupressão grave dose-limitante', 'Síndrome mão-pé (eritrodisestesia palmoplantar)'],
      contraindicacoes: ['Hipersensibilidade ao trastuzumabe ou a proteínas murinas', 'Dispneia grave em repouso por complicações da doença (bula)'],
      precaucoes: [
        'Confirmar HER2 positivo (IHQ 3+ ou ISH amplificado) em laboratório validado',
        'Ecocardiograma/FEVE basal e a cada 3 meses; suspender se queda significativa (é em geral reversível e não dose-dependente)',
        'Evitar uso concomitante com antraciclinas; considerar intervalo após antraciclina',
        'Contracepção eficaz durante e por 7 meses após (oligoidrâmnio)',
        'Não confundir com trastuzumabe entansina (T-DM1) nem trastuzumabe deruxtecana — produtos diferentes',
      ],
      interacoes: ['Antraciclinas: cardiotoxicidade aditiva', 'Ciclofosfamida e radioterapia torácica esquerda: cardiotoxicidade aumentada'],
      explicacaoFase2:
        'É um anticorpo monoclonal anti-HER2: reconhece o receptor HER2 em excesso na célula tumoral, bloqueia seu sinal de crescimento e marca a célula para destruição imune.',
      explicacaoFase3:
        'O HER2 participa da sobrevivência dos cardiomiócitos sob estresse; seu bloqueio causa disfunção ventricular (queda da FEVE), diferente da antraciclina por ser geralmente reversível e não ligada à dose cumulativa.',
      referencias: [...REF_BASE, 'Bula Herceptin (Roche/Anvisa) e FDA label', 'NCCN Guidelines — Breast Cancer (2025)', 'ESMO Clinical Practice Guideline — Early breast cancer (2024)'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Bevacizumabe
    {
      id: 'bevacizumabe',
      nome: 'Bevacizumabe',
      sinonimos: ['bevacizumab', 'anti-VEGF', 'beva'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'anticorpo-anti-vegf',
          contexto: 'terapia antiangiogênica de câncer colorretal metastático, pulmão, ovário, colo do útero, rim e fígado',
          explicacaoFase1:
            'Antiangiogênico usado em combinação: colorretal metastático (com quimioterapia), CPNPC não escamoso, ovário, colo do útero, carcinoma renal e hepatocarcinoma (com atezolizumabe).',
        },
      ],
      mecanismo:
        'Anticorpo IgG1 humanizado que se liga ao VEGF-A circulante e impede sua ligação a VEGFR-1 e VEGFR-2 no endotélio. Inibe a neoangiogênese, provoca regressão de vasos tumorais imaturos e "normaliza" a vasculatura, melhorando a entrega da quimioterapia. Não atua diretamente sobre a célula tumoral e não depende de biomarcador específico.',
      indicacoes: [
        'Câncer colorretal metastático (com fluoropirimidina ± oxaliplatina/irinotecano)',
        'CPNPC avançado não escamoso (com quimioterapia de platina)',
        'Câncer de ovário epitelial, trompa e peritônio (1ª linha e recidiva)',
        'Câncer de colo do útero persistente, recorrente ou metastático',
        'Carcinoma de células renais avançado (com interferon-alfa)',
        'Hepatocarcinoma irressecável (com atezolizumabe)',
        'Câncer de mama metastático (com paclitaxel — aprovação em algumas agências; verificar bula vigente)',
      ],
      offLabel: ['Uso intravítreo na degeneração macular relacionada à idade e no edema macular diabético (off-label consagrado)'],
      tipoMolecula: 'anticorpo',
      pubchem: [],
      nomesComerciais: [marca('Avastin', 'referencia', 'Roche', HOSP + '; biossimilares registrados')],
      generico: false,
      eaComuns: [
        t('Hipertensão arterial', 'hipertensao', 'pressao alta', 'HAS'),
        t('Proteinúria', 'proteina na urina', 'albuminuria'),
        t('Epistaxe e sangramentos mucocutâneos leves', 'epistaxe', 'sangramento nasal', 'sangramento leve'),
        FADIGA,
      ],
      eaGraves: [
        t('Perfuração gastrointestinal', 'perfuracao intestinal', 'perfuracao gastrointestinal', 'fistula'),
        t('Comprometimento da cicatrização de feridas', 'deiscencia', 'cicatrizacao prejudicada', 'ma cicatrizacao'),
        t('Hemorragia grave (incluindo hemoptise)', 'hemorragia', 'hemoptise', 'sangramento grave'),
        t('Tromboembolismo arterial (AVC, IAM)', 'tromboembolismo arterial', 'AVC', 'infarto', 'trombose arterial'),
        t('Síndrome nefrótica', 'proteinuria macica', 'nefrotica'),
        t('Síndrome de encefalopatia posterior reversível', 'PRES', 'encefalopatia posterior reversivel'),
      ],
      eaCaracteristico: 'Hipertensão arterial',
      distratoresEA: ['Cistite hemorrágica', 'Ototoxicidade', 'Neuropatia aguda induzida pelo frio', 'Alopecia intensa'],
      contraindicacoes: [
        'Cirurgia de grande porte recente (aguardar ≥ 28 dias antes e depois) ou ferida não cicatrizada',
        'Hemoptise recente / CPNPC de histologia escamosa (risco de hemorragia pulmonar)',
        'Perfuração GI prévia / fístula',
        'Gestação',
      ],
      precaucoes: [
        'Aferir pressão arterial antes de cada aplicação; tratar HAS com anti-hipertensivos',
        'Fita urinária/relação proteína-creatinina periódica',
        'Suspender ≥ 28 dias antes de cirurgia eletiva',
        'Não confundir apresentações oncológicas com preparações intravítreas fracionadas',
      ],
      interacoes: ['Antraciclinas e radioterapia torácica: possível aumento de cardiotoxicidade', 'Sunitinibe/TKIs anti-VEGF: anemia hemolítica microangiopática relatada (bula)'],
      explicacaoFase2:
        'É um anticorpo anti-VEGF: "sequestra" o fator de crescimento que os tumores usam para formar vasos novos, privando-os de suprimento sanguíneo.',
      explicacaoFase3:
        'O VEGF mantém a produção endotelial de óxido nítrico e a integridade dos capilares glomerulares; ao bloqueá-lo surgem hipertensão (efeito de classe) e proteinúria, além de sangramento e má cicatrização.',
      referencias: [...REF_BASE, 'Bula Avastin (Roche/Anvisa) e FDA label', 'NCCN Guidelines — Colon Cancer (2025)'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Rituximabe
    {
      id: 'rituximabe',
      nome: 'Rituximabe',
      sinonimos: ['rituximab', 'anti-CD20', 'R-CHOP'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'anticorpo-anti-cd20',
          contexto: 'terapia-alvo de linfomas não Hodgkin de células B CD20+ e leucemia linfocítica crônica',
          explicacaoFase1:
            'Anticorpo anti-CD20 que integra o tratamento de linfomas B CD20+ (difuso de grandes células B com R-CHOP, folicular, manto) e da LLC; fora da oncologia é usado em AR e vasculites ANCA.',
        },
      ],
      mecanismo:
        'Anticorpo IgG1 quimérico (murino/humano) dirigido ao CD20, antígeno de membrana de linfócitos B pré-B a maduros (ausente em células-tronco e plasmócitos). Depleta as células B por citotoxicidade dependente de complemento, ADCC/fagocitose por células efetoras e indução direta de apoptose. A preservação de células-tronco e plasmócitos permite a reconstituição posterior e mantém parte da imunidade humoral.',
      indicacoes: [
        'Linfoma não Hodgkin difuso de grandes células B CD20+ (com CHOP)',
        'Linfoma folicular (indução com quimioterapia e manutenção)',
        'Leucemia linfocítica crônica (com quimioterapia)',
        'Doenças não oncológicas: artrite reumatoide, granulomatose com poliangiite e poliangiite microscópica',
      ],
      tipoMolecula: 'anticorpo',
      pubchem: [],
      nomesComerciais: [marca('MabThera', 'referencia', 'Roche', HOSP + '; há apresentação IV e subcutânea; biossimilares registrados')],
      generico: false,
      eaComuns: [
        t('Reações relacionadas à infusão (sobretudo na 1ª infusão)', 'reacao infusional', 'reacao a infusao', 'febre e calafrios', 'sindrome de liberacao de citocinas', 'hipotensao na infusao'),
        t('Infecções respiratórias', 'infeccao', 'infeccoes'),
        t('Neutropenia', 'neutrofilos baixos', 'leucopenia'),
      ],
      eaGraves: [
        t('Reativação de hepatite B', 'reativacao do HBV', 'hepatite B fulminante', 'reativacao viral'),
        t('Leucoencefalopatia multifocal progressiva', 'LEMP', 'LMP', 'virus JC'),
        t('Síndrome de lise tumoral', 'lise tumoral', 'hiperuricemia', 'hipercalemia por lise'),
        t('Hipogamaglobulinemia e infecções graves', 'hipogamaglobulinemia', 'imunodeficiencia humoral'),
        t('Reações mucocutâneas graves (Stevens-Johnson/NET)', 'Stevens-Johnson', 'necrolise epidermica toxica'),
      ],
      eaCaracteristico: 'Reações relacionadas à infusão (sobretudo na 1ª infusão)',
      distratoresEA: ['Cistite hemorrágica', 'Cardiotoxicidade dose-cumulativa por antraciclina', 'Neuropatia aguda induzida pelo frio', 'Síndrome mão-pé (eritrodisestesia palmoplantar)'],
      contraindicacoes: ['Infecção ativa grave', 'Imunossupressão grave', 'Hipersensibilidade a proteínas murinas', 'Insuficiência cardíaca grave (indicações não oncológicas, conforme bula)'],
      precaucoes: [
        'Rastrear HBsAg e anti-HBc antes; profilaxia antiviral em portadores',
        'Pré-medicação com paracetamol, anti-histamínico (e corticoide); 1ª infusão em velocidade lenta e escalonada',
        'Alta carga tumoral: prevenção de lise tumoral (hidratação, alopurinol/rasburicase)',
        'Evitar vacinas de vírus vivos; resposta vacinal fica reduzida por meses',
      ],
      interacoes: ['Outros imunossupressores: risco infeccioso aditivo', 'Anti-hipertensivos: suspender 12 h antes da infusão pode ser considerado (hipotensão infusional)'],
      explicacaoFase2:
        'É um anticorpo monoclonal anti-CD20: liga-se a uma proteína presente só nos linfócitos B, que são então destruídos pelo complemento e por células do sistema imune.',
      explicacaoFase3:
        'Na primeira infusão, a destruição maciça de células B libera citocinas, causando febre, calafrios, hipotensão e broncoespasmo — as reações infusionais diminuem nas aplicações seguintes.',
      referencias: [...REF_BASE, 'Bula MabThera (Roche/Anvisa) e FDA label', 'NCCN Guidelines — B-Cell Lymphomas (2025)'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Pembrolizumabe
    {
      id: 'pembrolizumabe',
      nome: 'Pembrolizumabe',
      sinonimos: ['pembrolizumab', 'pembro', 'anti-PD-1', 'MK-3475'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'anti-pd1',
          contexto: 'imunoterapia de melanoma, câncer de pulmão, tumores MSI-H/dMMR e diversos tumores sólidos',
          explicacaoFase1:
            'Inibidor de checkpoint anti-PD-1 com amplo leque de indicações: melanoma, CPNPC (monoterapia se PD-L1 ≥ 50%), tumores MSI-H/dMMR (inclusive colorretal), mama triplo-negativo, cabeça e pescoço, urotelial, colo do útero, entre outros.',
        },
      ],
      mecanismo:
        'Anticorpo IgG4 humanizado que bloqueia o receptor PD-1 nos linfócitos T, impedindo sua ligação aos ligantes PD-L1 e PD-L2 expressos pelo tumor e pelo microambiente. Com isso, o "freio" periférico da resposta imune é removido e linfócitos T exaustos recuperam a capacidade citotóxica antitumoral. Não age diretamente sobre a célula tumoral; a resposta depende da imunogenicidade do tumor (PD-L1, carga mutacional, MSI-H/dMMR).',
      indicacoes: [
        'Melanoma avançado e adjuvante',
        'CPNPC: monoterapia em 1ª linha se PD-L1 (TPS) ≥ 50% sem driver; com quimioterapia de platina independentemente de PD-L1; perioperatório',
        'Tumores sólidos MSI-H/dMMR, incluindo câncer colorretal metastático em 1ª linha',
        'Câncer de mama triplo-negativo (neoadjuvante/adjuvante e metastático PD-L1 CPS ≥ 10)',
        'Carcinoma de cabeça e pescoço, urotelial, colo do útero, endométrio, esôfago/gástrico, carcinoma renal (com axitinibe) e linfoma de Hodgkin clássico (conforme bula vigente)',
      ],
      tipoMolecula: 'anticorpo',
      pubchem: [],
      nomesComerciais: [marca('Keytruda', 'referencia', 'MSD', HOSP)],
      generico: false,
      eaComuns: IRAE_COMUNS,
      eaGraves: IRAE_GRAVES,
      eaCaracteristico: 'Hipotireoidismo imunomediado',
      distratoresEA: IRAE_DISTR,
      contraindicacoes: ['Hipersensibilidade grave ao pembrolizumabe', 'Gestação (relativa — risco embriofetal)'],
      precaucoes: [...IRAE_PREC, 'Exigir biomarcador conforme indicação: PD-L1 (TPS/CPS com anticorpo 22C3) ou MSI-H/dMMR'],
      interacoes: IRAE_INTER,
      explicacaoFase2:
        'É um inibidor de checkpoint anti-PD-1: bloqueia o receptor que o tumor usa para "desligar" os linfócitos T, liberando o sistema imune para atacar o câncer.',
      explicacaoFase3:
        'Ao remover o freio imunológico, linfócitos T também atacam tecidos normais: a tireoidite com hipotireoidismo é o evento adverso imunomediado endócrino mais frequente — além de colite, pneumonite e hepatite.',
      referencias: [...REF_BASE, 'Bula Keytruda (MSD/Anvisa) e FDA label', 'Reck M et al. N Engl J Med 2016;375:1823-33 (KEYNOTE-024)', 'André T et al. N Engl J Med 2020;383:2207-18 (KEYNOTE-177)', 'ESMO Clinical Practice Guideline — Management of toxicities from immunotherapy (2022)'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Nivolumabe
    {
      id: 'nivolumabe',
      nome: 'Nivolumabe',
      sinonimos: ['nivolumab', 'nivo', 'anti-PD-1'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'anti-pd1',
          contexto: 'imunoterapia de melanoma, câncer de pulmão, carcinoma renal, linfoma de Hodgkin e tumores gastrointestinais',
          explicacaoFase1:
            'Anti-PD-1 usado em melanoma (adjuvante e avançado, isolado ou com ipilimumabe), CPNPC, carcinoma renal, linfoma de Hodgkin, cabeça e pescoço, urotelial, esôfago/gástrico e colorretal MSI-H.',
        },
      ],
      mecanismo:
        'Anticorpo IgG4 humano que se liga ao PD-1 e bloqueia sua interação com PD-L1/PD-L2, restaurando a atividade de linfócitos T antitumorais. Em associação ao anti-CTLA-4 ipilimumabe, atua em dois pontos distintos (ativação no linfonodo e fase efetora no tumor), com maior eficácia e maior toxicidade.',
      indicacoes: [
        'Melanoma irressecável/metastático (monoterapia ou com ipilimumabe) e adjuvante',
        'CPNPC (2ª linha; 1ª linha com ipilimumabe ± quimioterapia; neoadjuvante com quimioterapia)',
        'Carcinoma de células renais avançado (isolado após TKI, com ipilimumabe ou com cabozantinibe)',
        'Linfoma de Hodgkin clássico recidivado/refratário',
        'Carcinoma de cabeça e pescoço, urotelial, esôfago/gástrico e colorretal MSI-H/dMMR (conforme bula vigente)',
        'Mesotelioma pleural (com ipilimumabe)',
      ],
      tipoMolecula: 'anticorpo',
      pubchem: [],
      nomesComerciais: [marca('Opdivo', 'referencia', 'Bristol-Myers Squibb', HOSP)],
      generico: false,
      eaComuns: IRAE_COMUNS,
      eaGraves: IRAE_GRAVES,
      eaCaracteristico: 'Colite imunomediada',
      distratoresEA: IRAE_DISTR,
      contraindicacoes: ['Hipersensibilidade grave ao nivolumabe', 'Gestação (relativa — risco embriofetal)'],
      precaucoes: [...IRAE_PREC, 'Associação com ipilimumabe aumenta muito a incidência de irAEs graus 3–4'],
      interacoes: IRAE_INTER,
      explicacaoFase2:
        'É um anticorpo anti-PD-1 (inibidor de checkpoint): impede que o tumor iniba os linfócitos T pela via PD-1/PD-L1, reativando a resposta imune antitumoral.',
      explicacaoFase3:
        'Linfócitos T desinibidos podem atacar a mucosa intestinal: diarreia com dor abdominal e sangue sugere colite imunomediada, tratada com corticoide (e infliximabe nos casos refratários).',
      referencias: [...REF_BASE, 'Bula Opdivo (BMS/Anvisa) e FDA label', 'ESMO Clinical Practice Guideline — Management of toxicities from immunotherapy (2022)'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Atezolizumabe
    {
      id: 'atezolizumabe',
      nome: 'Atezolizumabe',
      sinonimos: ['atezolizumab', 'atezo', 'anti-PD-L1'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'anti-pd-l1',
          contexto: 'imunoterapia de câncer de pulmão (não pequenas e pequenas células) e hepatocarcinoma',
          explicacaoFase1:
            'Anti-PD-L1 usado em CPNPC (1ª linha com PD-L1 alto, adjuvante após ressecção com PD-L1 ≥ 1%, e com quimioterapia), câncer de pulmão de pequenas células extenso (com carboplatina-etoposídeo) e hepatocarcinoma (com bevacizumabe).',
        },
      ],
      mecanismo:
        'Anticorpo IgG1 humanizado com Fc modificado (sem ADCC) que se liga ao PD-L1 e bloqueia sua interação com PD-1 e com B7.1 (CD80), restaurando a atividade dos linfócitos T. Por agir no ligante, preserva a interação PD-L2/PD-1, o que teoricamente reduziria a autoimunidade pulmonar — sem diferença clínica claramente demonstrada.',
      indicacoes: [
        'CPNPC metastático em 1ª linha com alta expressão de PD-L1 (monoterapia) ou com quimioterapia ± bevacizumabe',
        'CPNPC estágios II–IIIA após ressecção e quimioterapia adjuvante, com PD-L1 ≥ 1%',
        'Câncer de pulmão de pequenas células estágio extenso (com carboplatina e etoposídeo)',
        'Carcinoma hepatocelular irressecável (com bevacizumabe)',
        'Outras indicações (urotelial, mama triplo-negativo) variam por agência — verificar bula vigente',
      ],
      tipoMolecula: 'anticorpo',
      pubchem: [],
      nomesComerciais: [marca('Tecentriq', 'referencia', 'Roche', HOSP)],
      generico: false,
      eaComuns: IRAE_COMUNS,
      eaGraves: IRAE_GRAVES,
      eaCaracteristico: 'Pneumonite imunomediada',
      distratoresEA: IRAE_DISTR,
      contraindicacoes: ['Hipersensibilidade grave ao atezolizumabe', 'Gestação (relativa — risco embriofetal)'],
      precaucoes: [...IRAE_PREC, 'No hepatocarcinoma com bevacizumabe: rastrear e tratar varizes esofágicas antes do início (risco de sangramento)'],
      interacoes: IRAE_INTER,
      explicacaoFase2:
        'É um anti-PD-L1: em vez de bloquear o receptor no linfócito, bloqueia o ligante que o tumor expressa para inibir o ataque imune.',
      explicacaoFase3:
        'A reativação imune pode atingir o pulmão — tosse e dispneia novas exigem investigar pneumonite imunomediada, evento grave, especialmente relevante em pacientes com câncer de pulmão.',
      referencias: [...REF_BASE, 'Bula Tecentriq (Roche/Anvisa) e FDA label', 'Finn RS et al. N Engl J Med 2020;382:1894-905 (IMbrave150)', 'Horn L et al. N Engl J Med 2018;379:2220-9 (IMpower133)'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Tamoxifeno
    {
      id: 'tamoxifeno',
      nome: 'Tamoxifeno',
      sinonimos: ['tamoxifen', 'citrato de tamoxifeno', 'tamoxifen citrate'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'serm-oncologico',
          subclasse: 'SERM trifeniletilênico',
          contexto: 'hormonioterapia do câncer de mama com receptor hormonal positivo',
          explicacaoFase1:
            'Hormonioterapia oral do câncer de mama RH+ (RE e/ou RP positivos), adjuvante por 5–10 anos em pré e pós-menopausa e na doença metastática; é a base na mulher pré-menopausa.',
        },
      ],
      mecanismo:
        'Pró-fármaco convertido pela CYP2D6 (e CYP3A4) em 4-hidroxitamoxifeno e endoxifeno, metabólitos de alta afinidade pelo receptor de estrogênio. Na mama, o complexo recruta correpressores e bloqueia a transcrição de genes proliferativos estrogênio-dependentes (antagonista). No endométrio, osso e fígado, recruta coativadores e age como agonista parcial — o que protege o osso na pós-menopausa, mas estimula o endométrio e a coagulação.',
      indicacoes: [
        'Câncer de mama RH+ adjuvante (pré e pós-menopausa)',
        'Câncer de mama RH+ metastático',
        'Carcinoma ductal in situ RH+ após cirurgia conservadora',
      ],
      offLabel: ['Redução de risco de câncer de mama em mulheres de alto risco (aprovado pela FDA; verificar bula brasileira)', 'Ginecomastia (uso off-label)'],
      tipoMolecula: 'pequena',
      pubchem: ['tamoxifen'],
      nomesComerciais: [marca('Nolvadex', 'referencia', 'AstraZeneca', 'comprimidos orais; comercialização pode ter sido descontinuada — conferir')],
      generico: true,
      eaComuns: [
        t('Fogachos', 'ondas de calor', 'calorao', 'sintomas vasomotores'),
        t('Corrimento e secura vaginal', 'corrimento vaginal', 'leucorreia', 'secura vaginal'),
        t('Irregularidade menstrual', 'alteracao menstrual', 'amenorreia'),
        t('Câimbras', 'caibras nas pernas'),
      ],
      eaGraves: [
        t('Câncer de endométrio', 'hiperplasia endometrial', 'carcinoma de endometrio', 'cancer de utero', 'sarcoma uterino', 'espessamento endometrial'),
        t('Tromboembolismo venoso', 'TEV', 'trombose venosa profunda', 'TVP', 'embolia pulmonar', 'TEP'),
        t('Catarata', 'opacificacao do cristalino'),
        t('Acidente vascular cerebral', 'AVC'),
      ],
      eaCaracteristico: 'Câncer de endométrio',
      distratoresEA: [
        'Perda de massa óssea acelerada na pós-menopausa',
        'Cistite hemorrágica',
        'Neuropatia aguda induzida pelo frio',
        'Exacerbação inicial (flare) por aumento transitório de testosterona',
      ],
      contraindicacoes: ['Gestação', 'História de tromboembolismo venoso (em uso preventivo)', 'Uso concomitante de anticoagulante cumarínico em uso preventivo', 'Hipersensibilidade'],
      precaucoes: [
        'Investigar qualquer sangramento vaginal anormal na pós-menopausa',
        'Avaliar risco tromboembólico; suspender antes de cirurgias com imobilização prolongada',
        'Contracepção não hormonal em pré-menopausa (teratogênico)',
      ],
      interacoes: [
        'Inibidores potentes de CYP2D6 (paroxetina, fluoxetina, bupropiona) reduzem a formação de endoxifeno — preferir venlafaxina/citalopram para fogachos',
        'Varfarina: potencialização do efeito anticoagulante',
        'Inibidores da aromatase: não associar (sem benefício adicional)',
      ],
      explicacaoFase2:
        'É um SERM: bloqueia o receptor de estrogênio na mama, impedindo que o hormônio estimule o tumor, mas age como estrogênio fraco em osso e útero.',
      explicacaoFase3:
        'Como é agonista parcial no endométrio, o estímulo estrogênico contínuo pode causar hiperplasia e câncer de endométrio — e, no fígado, aumenta fatores de coagulação (tromboembolismo).',
      referencias: [...REF_BASE, 'FDA label do tamoxifeno', 'NCCN Guidelines — Breast Cancer (2025)', 'EBCTCG. Lancet 2011;378:771-84'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Anastrozol
    {
      id: 'anastrozol',
      nome: 'Anastrozol',
      sinonimos: ['anastrozole', 'anastrazol'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'inibidor-aromatase',
          subclasse: 'Não esteroidal (triazólico, reversível)',
          contexto: 'hormonioterapia do câncer de mama RH+ na pós-menopausa',
          explicacaoFase1:
            'Inibidor da aromatase oral para câncer de mama RH+ em mulheres na pós-menopausa — adjuvante (5 anos ou sequencial) e metastático.',
        },
      ],
      mecanismo:
        'Inibidor não esteroidal, competitivo e reversível da aromatase (CYP19A1), que converte androstenediona e testosterona em estrona e estradiol no tecido adiposo, músculo e no próprio tumor. Na pós-menopausa essa é a principal fonte de estrogênio, que cai > 90%. Na pré-menopausa, a queda do estrogênio estimula o eixo hipotálamo-hipófise e o ovário compensa — por isso não funciona sem supressão ovariana.',
      indicacoes: [
        'Câncer de mama RH+ adjuvante em pós-menopausa',
        'Câncer de mama RH+ avançado/metastático em pós-menopausa',
      ],
      offLabel: ['Redução de risco de câncer de mama em mulheres pós-menopausa de alto risco (IBIS-II; verificar bula)'],
      tipoMolecula: 'pequena',
      pubchem: ['anastrozole'],
      nomesComerciais: [marca('Arimidex', 'referencia', 'AstraZeneca', 'comprimidos orais')],
      generico: true,
      eaComuns: [
        t('Artralgia e mialgia', 'dor articular', 'dor nas juntas', 'rigidez articular', 'dor muscular'),
        t('Fogachos', 'ondas de calor', 'sintomas vasomotores'),
        t('Secura vaginal', 'atrofia vaginal', 'dispareunia'),
        t('Hipercolesterolemia', 'colesterol alto', 'dislipidemia'),
      ],
      eaGraves: [
        t('Perda de massa óssea (osteopenia/osteoporose)', 'osteoporose', 'osteopenia', 'fratura', 'perda ossea'),
        t('Síndrome do túnel do carpo', 'tunel do carpo'),
      ],
      eaCaracteristico: 'Perda de massa óssea (osteopenia/osteoporose)',
      distratoresEA: ['Câncer de endométrio', 'Cistite hemorrágica', 'Neuropatia aguda induzida pelo frio', 'Exacerbação inicial (flare) por aumento transitório de testosterona'],
      contraindicacoes: ['Mulheres na pré-menopausa (sem supressão ovariana)', 'Gestação e amamentação', 'Insuficiência renal ou hepática grave (bula)'],
      precaucoes: [
        'Densitometria óssea basal e periódica; cálcio, vitamina D e bisfosfonato/denosumabe conforme risco',
        'Confirmar status menopausal (hormonal) quando duvidoso',
        'Perfil lipídico periódico',
      ],
      interacoes: ['Tamoxifeno e terapia estrogênica: antagonizam o efeito — não associar'],
      explicacaoFase2:
        'É um inibidor da aromatase: bloqueia a enzima que transforma androgênios em estrogênio nos tecidos periféricos, privando o tumor RH+ do hormônio na pós-menopausa.',
      explicacaoFase3:
        'O estrogênio freia a reabsorção óssea pelos osteoclastos; com sua depleção quase completa, a perda óssea acelera e aumenta o risco de osteoporose e fraturas.',
      referencias: [...REF_BASE, 'Bula Arimidex (AstraZeneca/Anvisa) e FDA label', 'NCCN Guidelines — Breast Cancer (2025)'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Letrozol
    {
      id: 'letrozol',
      nome: 'Letrozol',
      sinonimos: ['letrozole'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'inibidor-aromatase',
          subclasse: 'Não esteroidal (triazólico, reversível)',
          contexto: 'hormonioterapia do câncer de mama RH+ na pós-menopausa',
          explicacaoFase1:
            'Inibidor da aromatase para câncer de mama RH+ na pós-menopausa — adjuvante, adjuvante estendido após tamoxifeno e metastático (inclusive associado a inibidores de CDK4/6).',
        },
      ],
      mecanismo:
        'Inibidor não esteroidal e reversível da aromatase (CYP19A1) que se liga ao grupo heme da enzima, bloqueando a conversão de androgênios em estrogênios. Suprime o estradiol circulante de forma intensa na pós-menopausa. Assim como o anastrozol, não é eficaz isoladamente em mulheres com função ovariana preservada.',
      indicacoes: [
        'Câncer de mama RH+ adjuvante em pós-menopausa',
        'Adjuvância estendida após 5 anos de tamoxifeno',
        'Câncer de mama RH+ avançado/metastático em pós-menopausa (isolado ou com inibidor de CDK4/6)',
        'Neoadjuvante em pós-menopausa selecionada',
      ],
      offLabel: ['Indução de ovulação (síndrome dos ovários policísticos) — uso off-label no Brasil'],
      tipoMolecula: 'pequena',
      pubchem: ['letrozole'],
      nomesComerciais: [marca('Femara', 'referencia', 'Novartis', 'comprimidos orais')],
      generico: true,
      eaComuns: [
        t('Artralgia e mialgia', 'dor articular', 'dor nas juntas', 'rigidez articular', 'dor muscular'),
        t('Fogachos', 'ondas de calor', 'sintomas vasomotores'),
        FADIGA,
        t('Hipercolesterolemia', 'colesterol alto', 'dislipidemia'),
      ],
      eaGraves: [t('Perda de massa óssea (osteopenia/osteoporose)', 'osteoporose', 'osteopenia', 'fratura', 'perda ossea')],
      eaCaracteristico: 'Artralgia e mialgia',
      distratoresEA: ['Câncer de endométrio', 'Cistite hemorrágica', 'Tromboembolismo venoso por agonismo estrogênico hepático', 'Neuropatia aguda induzida pelo frio'],
      contraindicacoes: ['Mulheres na pré-menopausa (sem supressão ovariana)', 'Gestação e amamentação'],
      precaucoes: ['Densitometria óssea basal e periódica; suplementação de cálcio/vitamina D', 'Atividade física e analgesia simples para artralgia (causa frequente de abandono)', 'Perfil lipídico periódico'],
      interacoes: ['Tamoxifeno: reduz níveis de letrozol e não há benefício na associação', 'Estrogênios: antagonizam o efeito'],
      explicacaoFase2:
        'É um inibidor da aromatase não esteroidal: impede a produção periférica de estrogênio, principal fonte do hormônio após a menopausa.',
      explicacaoFase3:
        'A privação estrogênica profunda afeta cartilagem, sinóvia e tendões, levando a artralgia, rigidez e mialgia — a queixa mais comum e motivo frequente de interrupção dos IAs.',
      referencias: [...REF_BASE, 'Bula Femara (Novartis/Anvisa) e FDA label', 'NCCN Guidelines — Breast Cancer (2025)'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    // ------------------------------------------------------------- Leuprorrelina
    {
      id: 'leuprorrelina',
      nome: 'Leuprorrelina',
      sinonimos: ['leuprolide', 'leuprorelin', 'acetato de leuprorrelina', 'leuprolida', 'leuprolide acetate'],
      vinculos: [
        {
          grupoId: 'oncologicos',
          classeId: 'agonista-gnrh',
          contexto: 'privação androgênica no câncer de próstata avançado',
          explicacaoFase1:
            'Agonista de GnRH em depósito usado na privação androgênica do câncer de próstata (castração química) e, na mulher, para supressão ovariana no câncer de mama RH+ pré-menopausa.',
        },
      ],
      mecanismo:
        'Nonapeptídeo análogo do GnRH com maior potência e meia-vida. Inicialmente estimula os receptores hipofisários, elevando LH/FSH e testosterona por 1–2 semanas (flare). A estimulação contínua, não pulsátil, causa dessensibilização e redução dos receptores, suprimindo LH/FSH e levando a testosterona a níveis de castração em ~2–4 semanas (ou estradiol a níveis pós-menopausa).',
      indicacoes: [
        'Câncer de próstata localmente avançado ou metastático (privação androgênica)',
        'Câncer de próstata localizado de risco intermediário/alto, associado à radioterapia',
        'Indicações não oncológicas: endometriose, miomatose uterina e puberdade precoce central (conforme apresentação)',
      ],
      offLabel: ['Supressão ovariana no câncer de mama RH+ em pré-menopausa — recomendada em diretrizes (NCCN/ESMO); aprovação em bula varia conforme apresentação'],
      tipoMolecula: 'peptideo',
      pubchem: ['leuprolide'],
      nomesComerciais: [
        marca('Lupron Depot', 'referencia', 'AbbVie', 'suspensão injetável de depósito (IM)'),
        marca('Eligard', 'marca', undefined, 'injetável subcutâneo de depósito'),
      ],
      generico: false,
      eaComuns: [
        t('Fogachos', 'ondas de calor', 'calorao', 'sintomas vasomotores'),
        t('Disfunção erétil e redução da libido', 'impotencia', 'disfuncao eretil', 'perda da libido'),
        t('Reação no local da injeção', 'dor no local da injecao', 'nodulo no local'),
        FADIGA,
        t('Ginecomastia', 'aumento das mamas', 'mastalgia'),
      ],
      eaGraves: [
        t('Exacerbação inicial (flare) por aumento transitório de testosterona', 'flare', 'fenomeno de flare', 'surto de testosterona', 'piora inicial da dor ossea', 'compressao medular no inicio'),
        t('Perda de massa óssea (osteoporose)', 'osteoporose', 'osteopenia', 'fratura'),
        t('Síndrome metabólica e risco cardiovascular', 'diabetes', 'resistencia insulinica', 'dislipidemia', 'ganho de peso'),
        t('Prolongamento do intervalo QT', 'QT longo'),
      ],
      eaCaracteristico: 'Exacerbação inicial (flare) por aumento transitório de testosterona',
      distratoresEA: ['Câncer de endométrio', 'Cistite hemorrágica', 'Neuropatia aguda induzida pelo frio', 'Ototoxicidade'],
      contraindicacoes: ['Gestação', 'Hipersensibilidade a GnRH ou análogos', 'Sangramento vaginal não diagnosticado (indicações ginecológicas)'],
      precaucoes: [
        'Em doença metastática com risco de compressão medular ou obstrução urinária: antiandrogênio (ex.: bicalutamida) por 2–4 semanas iniciando antes da 1ª dose para bloquear o flare — ou preferir antagonista de GnRH',
        'Densitometria óssea, glicemia e lipídios periódicos; estímulo a exercício',
        'ECG em pacientes com risco de QT longo',
      ],
      interacoes: ['Fármacos que prolongam QT (antiarrítmicos classe IA/III, alguns antipsicóticos): risco aditivo'],
      explicacaoFase2:
        'É um agonista de GnRH: um peptídeo que, de tanto estimular a hipófise de forma contínua, faz com que ela pare de responder, derrubando LH, FSH e testosterona (castração química).',
      explicacaoFase3:
        'Antes da dessensibilização, a estimulação inicial eleva a testosterona por 1–2 semanas, podendo piorar dor óssea, obstrução urinária ou compressão medular — o fenômeno de flare.',
      referencias: [...REF_BASE, 'Bula Lupron Depot (AbbVie/Anvisa) e FDA label', 'NCCN Guidelines — Prostate Cancer (2025)', 'EAU-EANM-ESTRO-ESUR-ISUP-SIOG Guidelines on Prostate Cancer (2024)'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
  ],

  vinculosExtras: [],

  // ===================================================================
  // RESUMO DO GRUPO
  // ===================================================================
  resumos: [
    {
      grupoId: 'oncologicos',
      visaoGeral: [
        'Os antineoplásicos formam quatro grandes estratégias. A quimioterapia citotóxica (antimetabólitos, alquilantes, platinas, antraciclinas, inibidores de microtúbulos) ataca processos comuns a toda célula em divisão — síntese e integridade do DNA ou o fuso mitótico — e por isso tem baixo índice terapêutico: mielossupressão, mucosite, alopecia, náuseas e infertilidade refletem a lesão de tecidos normais de renovação rápida. A terapia-alvo bloqueia uma alteração molecular da qual o tumor depende ("adição oncogênica"), como BCR-ABL, EGFR mutado ou HER2 amplificado, com toxicidade mais restrita e ligada ao alvo. A hormonioterapia priva tumores hormônio-dependentes (mama RH+, próstata) do estímulo estrogênico ou androgênico. A imunoterapia com inibidores de checkpoint não ataca o tumor diretamente: libera o sistema imune do paciente, gerando respostas duráveis e eventos adversos imunomediados.',
        'Biomarcadores definem quem se beneficia: HER2 (IHQ 3+ ou ISH+) para anti-HER2; receptores de estrogênio/progesterona (RH) para hormonioterapia; mutações de EGFR (del19, L858R, T790M) para TKIs de EGFR; BCR-ABL/cromossomo Philadelphia para imatinibe e sucessores; KIT (CD117) no GIST; CD20 para rituximabe; e expressão de PD-L1 (TPS/CPS) e instabilidade de microssatélites/deficiência de reparo (MSI-H/dMMR) para imunoterapia. Tratar sem o biomarcador expõe o paciente à toxicidade sem benefício — e, no caso de RAS mutado no colorretal, anti-EGFR pode até piorar o desfecho.',
        'Especificidade de ciclo celular: antimetabólitos (fase S) e inibidores de microtúbulos (fase M) são ciclo-celular específicos — matam sobretudo células em divisão ativa, e sua eficácia depende mais do tempo de exposição (infusões contínuas, esquemas semanais). Alquilantes, platinas e, em grande parte, antraciclinas são ciclo-celular inespecíficos, lesando o DNA em qualquer fase, com efeito mais dependente da dose. Combinar fármacos com mecanismos e toxicidades diferentes (ex.: R-CHOP, FOLFOX, AC-T) aumenta a fração de células mortas, retarda a resistência e permite usar cada fármaco próximo de sua dose plena.',
        'Muitos destes fármacos são de uso hospitalar e todos exigem prescrição e acompanhamento por oncologista. Os citotóxicos são carcinogênicos, mutagênicos e teratogênicos também para quem os manipula: no Brasil, a NR 32 (Ministério do Trabalho) e a RDC 220/2004 (Anvisa) exigem preparo em área exclusiva, em cabine de segurança biológica classe II B2 (ou isolador), por farmacêutico capacitado, com EPIs (luvas duplas sem talco, avental impermeável de baixa permeabilidade, máscara, óculos), kit de derramamento, rotulagem, transporte em recipiente rígido e descarte como resíduo químico perigoso — além de vedar a atividade a gestantes e lactantes. Excretas de pacientes até ~48 h após a dose também devem ser manejadas com cuidado.',
      ],
      mecanismos: [
        {
          titulo: 'Antimetabólitos (antifolatos e análogos de pirimidina)',
          texto:
            'São análogos estruturais de metabólitos usados na síntese de nucleotídeos. O metotrexato inibe a di-hidrofolato redutase (DHFR) e esgota o tetra-hidrofolato, travando a síntese de timidilato e purinas; a leucovorina contorna o bloqueio (resgate). A fluorouracila é convertida em 5-FdUMP, que inibe a timidilato sintase; a capecitabina é seu pró-fármaco oral, ativado por três enzimas, a última (timidina fosforilase) mais expressa no tumor. Gencitabina e citarabina são análogos de citidina incorporados ao DNA (a gencitabina também inibe a ribonucleotídeo redutase). Todos atuam na fase S, e as toxicidades dominantes são mucosite, diarreia e mielossupressão. A deficiência de DPD torna as fluoropirimidinas potencialmente fatais.',
        },
        {
          titulo: 'Alquilantes (mostardas nitrogenadas/oxazafosforinas) e compostos de platina',
          texto:
            'Ciclofosfamida e ifosfamida são pró-fármacos ativados por CYP hepáticas em mostardas fosforamídicas que formam íons aziridínio e alquilam o N7 da guanina, gerando ligações cruzadas no DNA. A ativação libera acroleína, que lesa o urotélio (cistite hemorrágica), neutralizada pela mesna (tiol concentrado na urina); a ifosfamida gera ainda cloroacetaldeído (encefalopatia, nefrotoxicidade). As platinas sofrem aquação no citoplasma e formam adutos intra e interfita: a cisplatina é nefro, oto e neurotóxica e altamente emetogênica; a carboplatina é sobretudo mielotóxica (plaquetopenia) e dosada pela fórmula de Calvert; a oxaliplatina causa neuropatia aguda ao frio e cumulativa e é ativa no colorretal. Ambos os grupos são ciclo-celular inespecíficos e podem causar neoplasias secundárias.',
        },
        {
          titulo: 'Antraciclinas',
          texto:
            'Doxorrubicina e daunorrubicina intercalam-se no DNA, estabilizam o complexo topoisomerase II–DNA (quebras de fita dupla) e geram radicais livres via ciclagem redox do anel quinona. No coração, o estresse oxidativo e a inibição da topoisomerase IIβ levam a lesão mitocondrial e morte de cardiomiócitos, com cardiomiopatia dose-cumulativa (risco crescente acima de ~450–550 mg/m² de doxorrubicina), em geral irreversível. São vesicantes e coloram a urina de vermelho. Monitorar FEVE; o dexrazoxano é cardioprotetor em situações selecionadas.',
        },
        {
          titulo: 'Inibidores de microtúbulos (taxanos e alcaloides da vinca)',
          texto:
            'Ambos atuam na fase M, mas com efeitos opostos sobre a tubulina. Taxanos (paclitaxel, docetaxel) estabilizam os microtúbulos e impedem a despolimerização; alcaloides da vinca (vincristina, vimblastina) impedem a polimerização. Em ambos os casos o fuso não funciona e a célula para em mitose. Como os axônios dependem de microtúbulos, a neuropatia periférica é efeito de classe: dose-limitante na vincristina (também neuropatia autonômica, constipação e íleo), relevante no paclitaxel. A vimblastina é mais mielotóxica. O paclitaxel exige pré-medicação pelo Cremophor (hipersensibilidade); o docetaxel causa retenção hídrica. Vincristina e vimblastina são fatais por via intratecal.',
        },
        {
          titulo: 'Terapias-alvo (TKIs e anticorpos monoclonais)',
          texto:
            'Inibidores de tirosina-quinase são pequenas moléculas orais que ocupam o sítio do ATP de quinases oncogênicas: imatinibe (BCR-ABL, KIT, PDGFR) na LMC Ph+ e GIST; osimertinibe (EGFR mutado, inclusive T790M, ligação covalente à Cys797) no CPNPC. São metabolizados por CYP3A4 (interações) e a resistência surge por mutações no alvo. Anticorpos monoclonais (sufixo -mabe) agem fora da célula: trastuzumabe bloqueia HER2 e media ADCC; bevacizumabe sequestra o VEGF-A (antiangiogênico, sem biomarcador preditivo); rituximabe depleta linfócitos B CD20+ por complemento e ADCC. As toxicidades são ditadas pelo alvo: rash por EGFR na pele, edema por PDGFR, cardiotoxicidade por HER2, hipertensão e sangramento por VEGF, reações infusionais e reativação de hepatite B pelo anti-CD20.',
        },
        {
          titulo: 'Imunoterapia (inibidores de checkpoint) e hormonioterapia',
          texto:
            'PD-1 é um receptor inibitório do linfócito T; ao se ligar ao PD-L1 expresso pelo tumor, "desliga" a resposta antitumoral. Anti-PD-1 (pembrolizumabe, nivolumabe) e anti-PD-L1 (atezolizumabe) bloqueiam esse eixo e reativam linfócitos T; anti-CTLA-4 (ipilimumabe) atua na fase de ativação no linfonodo. A contrapartida são eventos adversos imunomediados (tireoidite, colite, pneumonite, hepatite, hipofisite, DM1, miocardite), manejados com suspensão e corticoide. Na hormonioterapia, o tamoxifeno (SERM) bloqueia o receptor de estrogênio na mama mas é agonista parcial no endométrio e no osso; anastrozol e letrozol inibem a aromatase e só funcionam na pós-menopausa (ou com supressão ovariana); a leuprorrelina, agonista de GnRH, dessensibiliza a hipófise e leva à castração química após um flare inicial.',
        },
      ],
      fluxogramas: [
        {
          titulo: 'Ciclo celular e sítio de ação dos citotóxicos',
          passos: [
            'G1 (crescimento) → ponto de checagem G1/S',
            'Fase S (síntese de DNA) ← antimetabólitos: metotrexato, 5-FU/capecitabina, gencitabina, citarabina',
            'G2 (preparação para mitose) ← topoisomerase II/antraciclinas (efeito máximo S/G2)',
            'Fase M (mitose): fuso de microtúbulos ← taxanos (estabilizam) e alcaloides da vinca (impedem a polimerização)',
            'Qualquer fase, inclusive G0 ← alquilantes (ciclofosfamida, ifosfamida) e platinas: ciclo-celular inespecíficos',
          ],
        },
        {
          titulo: 'Via do folato e da timidilato sintase',
          passos: [
            'Ácido fólico → di-hidrofolato (DHF)',
            'DHF → (DHFR ← metotrexato) → tetra-hidrofolato (THF)',
            'THF → 5,10-metilenotetra-hidrofolato (doador de carbono)',
            'dUMP → (timidilato sintase ← 5-FdUMP da fluorouracila/capecitabina) → dTMP',
            'dTMP → dTTP → síntese de DNA (fase S)',
            'Leucovorina (ácido folínico) fornece folato reduzido além do bloqueio da DHFR → resgate do MTX; com 5-FU, estabiliza o complexo e potencializa a inibição',
          ],
        },
        {
          titulo: 'Eixo hormonal e hormonioterapia',
          passos: [
            'Hipotálamo: GnRH pulsátil → hipófise: LH/FSH (← agonista de GnRH contínuo: flare inicial e depois dessensibilização)',
            'Testículo → testosterona → receptor de androgênio na próstata (← antiandrogênios/ARPI)',
            'Ovário (pré-menopausa) e aromatase periférica no tecido adiposo (pós-menopausa): androgênios → (aromatase/CYP19 ← anastrozol, letrozol) → estrona/estradiol',
            'Estradiol → receptor de estrogênio na célula tumoral da mama (← tamoxifeno, SERM)',
            'Transcrição de genes proliferativos → crescimento do tumor RH+',
          ],
        },
      ],
      eaFrequentes: [
        { efeito: 'Mielossupressão (neutropenia, plaquetopenia, anemia)', classes: 'Quase todos os citotóxicos (pouco na vincristina); carboplatina e vimblastina como toxicidade dose-limitante', mecanismo: 'Lesão de precursores hematopoiéticos em divisão rápida; nadir em geral 7–14 dias após a dose' },
        { efeito: 'Náuseas e vômitos', classes: 'Cisplatina (alto risco), ciclofosfamida em altas doses, antraciclinas + ciclofosfamida (AC)', mecanismo: 'Liberação de serotonina por células enterocromafins (5-HT3) e de substância P (NK1) com ativação da zona de gatilho quimiorreceptora' },
        { efeito: 'Mucosite e diarreia', classes: 'Antimetabólitos (MTX, 5-FU, capecitabina), antraciclinas, TKIs de EGFR', mecanismo: 'Lesão do epitélio de renovação rápida do trato gastrointestinal' },
        { efeito: 'Alopecia', classes: 'Antraciclinas, taxanos, ciclofosfamida', mecanismo: 'Lesão dos queratinócitos da matriz do folículo em fase anágena' },
        { efeito: 'Síndrome mão-pé', classes: 'Capecitabina, 5-FU em infusão contínua', mecanismo: 'Toxicidade cutânea palmoplantar por exposição prolongada à fluoropirimidina' },
        { efeito: 'Rash acneiforme e paroníquia', classes: 'TKIs de EGFR (osimertinibe) e anticorpos anti-EGFR', mecanismo: 'Inibição do EGFR em queratinócitos e folículos' },
        { efeito: 'Fogachos, artralgia e perda óssea', classes: 'Inibidores da aromatase, agonistas de GnRH; fogachos também com tamoxifeno', mecanismo: 'Privação estrogênica/androgênica' },
        { efeito: 'Hipotireoidismo e rash/prurido', classes: 'Anti-PD-1 e anti-PD-L1', mecanismo: 'Autoimunidade por remoção do checkpoint PD-1/PD-L1' },
      ],
      eaGraves: [
        { efeito: 'Neutropenia febril', classes: 'Citotóxicos em geral (sobretudo docetaxel, antraciclinas, esquemas de leucemia)', mecanismo: 'Emergência oncológica: antibiótico de amplo espectro em até 1 h; G-CSF profilático em esquemas de alto risco' },
        { efeito: 'Cardiotoxicidade dose-cumulativa (irreversível)', classes: 'Antraciclinas', mecanismo: 'Estresse oxidativo e inibição da topoisomerase IIβ em cardiomiócitos' },
        { efeito: 'Disfunção ventricular (geralmente reversível)', classes: 'Trastuzumabe (anti-HER2)', mecanismo: 'Perda da sinalização HER2 de sobrevivência do cardiomiócito; potencializada por antraciclinas' },
        { efeito: 'Cistite hemorrágica', classes: 'Ciclofosfamida, ifosfamida', mecanismo: 'Acroleína urinária; prevenção com hidratação e mesna' },
        { efeito: 'Nefrotoxicidade e ototoxicidade', classes: 'Cisplatina (nefro/oto), MTX em altas doses (nefro), ifosfamida (tubulopatia)', mecanismo: 'Acúmulo da platina em túbulo proximal e cóclea; precipitação tubular do MTX' },
        { efeito: 'Neurotoxicidade', classes: 'Vincristina (periférica/autonômica), oxaliplatina (aguda ao frio e cumulativa), taxanos, ifosfamida (encefalopatia), citarabina em altas doses (cerebelar)', mecanismo: 'Lesão de microtúbulos axonais, canais de sódio ou metabólitos neurotóxicos' },
        { efeito: 'Óbito por via intratecal inadvertida', classes: 'Vincristina e vimblastina', mecanismo: 'Neurotoxicidade ascendente do SNC — exclusivamente IV, preparo em minibag' },
        { efeito: 'Eventos adversos imunomediados graves (pneumonite, colite, hepatite, hipofisite, miocardite, DM1)', classes: 'Anti-PD-1, anti-PD-L1, anti-CTLA-4', mecanismo: 'Ativação de linfócitos T autorreativos; corticoide e suspensão conforme grau' },
        { efeito: 'Perfuração GI, sangramento, má cicatrização', classes: 'Bevacizumabe', mecanismo: 'Bloqueio do VEGF na reparação vascular e tecidual' },
        { efeito: 'Reativação de hepatite B e LEMP', classes: 'Rituximabe', mecanismo: 'Depleção profunda de linfócitos B' },
        { efeito: 'Câncer de endométrio e tromboembolismo', classes: 'Tamoxifeno', mecanismo: 'Agonismo estrogênico parcial em endométrio e fígado' },
        { efeito: 'Neoplasias secundárias (LMA/SMD)', classes: 'Alquilantes, antraciclinas (inibidores de topoisomerase II)', mecanismo: 'Mutagênese do DNA de células-tronco hematopoiéticas' },
      ],
      primeirasLinhas: [
        {
          condicao: 'Câncer de mama HER2+ inicial (estágios II–III)',
          recomendacao:
            'Neoadjuvância com quimioterapia (taxano associado a carboplatina ou esquema com antraciclina) + trastuzumabe + pertuzumabe; completar 1 ano de anti-HER2 e, se houver doença residual na cirurgia, trocar por trastuzumabe entansina (T-DM1).',
          observacao: 'Tumores pequenos (T1N0) podem receber paclitaxel semanal + trastuzumabe adjuvante. Monitorar FEVE. Decisão depende de estadiamento, RH concomitante e cardiopatia.',
          fonte: 'NCCN Breast Cancer (2025); ESMO Early Breast Cancer (2024); Diretrizes SBOC',
        },
        {
          condicao: 'Câncer de mama RH+/HER2− inicial em pós-menopausa',
          recomendacao:
            'Hormonioterapia adjuvante com inibidor da aromatase (anastrozol, letrozol, exemestano) por 5 anos (ou sequência tamoxifeno → IA), considerando estender até 7–10 anos em alto risco; quimioterapia conforme risco clínico/genômico; inibidor de CDK4/6 (abemaciclibe, ribociclibe) adjuvante em alto risco.',
          observacao: 'Densitometria e manejo ósseo com IA. Assinaturas genômicas (ex.: Oncotype DX) orientam a necessidade de quimioterapia.',
          fonte: 'NCCN Breast Cancer (2025); ESMO Early Breast Cancer (2024); Diretrizes SBOC',
        },
        {
          condicao: 'Câncer de mama RH+/HER2− inicial em pré-menopausa',
          recomendacao:
            'Tamoxifeno por 5–10 anos; em pacientes de maior risco, supressão ovariana (agonista de GnRH ou ooforectomia) associada a IA ou tamoxifeno.',
          observacao: 'IA isolado é ineficaz e contraindicado com ovário funcionante. Evitar inibidores fortes de CYP2D6 com tamoxifeno.',
          fonte: 'NCCN Breast Cancer (2025); ESMO (2024); estudos SOFT/TEXT',
        },
        {
          condicao: 'Câncer de mama RH+/HER2− metastático',
          recomendacao:
            'Hormonioterapia (inibidor da aromatase ou fulvestranto) + inibidor de CDK4/6 em primeira linha na maioria das pacientes; quimioterapia reservada para crise visceral ou resistência endócrina.',
          observacao: 'Pré-menopausa: associar supressão ovariana. Linhas posteriores guiadas por biomarcadores (ESR1, PIK3CA/AKT1/PTEN, BRCA).',
          fonte: 'NCCN Breast Cancer (2025); ESMO Metastatic Breast Cancer (2024)',
        },
        {
          condicao: 'Leucemia mieloide crônica Ph+ (BCR-ABL+) em fase crônica',
          recomendacao:
            'TKI de BCR-ABL: imatinibe ou TKI de 2ª geração (dasatinibe, nilotinibe, bosutinibe) — e asciminibe em algumas aprovações —, escolhido por escore de risco, comorbidades e perfil de toxicidade.',
          observacao: 'Monitorar resposta molecular (BCR-ABL IS por qPCR) aos 3, 6 e 12 meses; falha → pesquisar mutações (ex.: T315I → ponatinibe/asciminibe). Descontinuação só em resposta molecular profunda sustentada.',
          fonte: 'European LeukemiaNet 2020; NCCN CML (2025)',
        },
        {
          condicao: 'CPNPC avançado com mutação ativadora de EGFR (del19/L858R)',
          recomendacao:
            'Osimertinibe em primeira linha (monoterapia ou com quimioterapia de platina-pemetrexede); amivantamabe + lazertinibe é alternativa aprovada em diretrizes.',
          observacao: 'Exige genotipagem tumoral (tecido ou biópsia líquida) antes da imunoterapia. Inibidores de checkpoint isolados têm pouco benefício em EGFR mutado.',
          fonte: 'NCCN NSCLC (2025); ESMO Oncogene-addicted metastatic NSCLC (2023)',
        },
        {
          condicao: 'CPNPC avançado sem alteração driver',
          recomendacao:
            'PD-L1 (TPS) ≥ 50%: anti-PD-1/PD-L1 em monoterapia (pembrolizumabe, atezolizumabe, cemiplimabe) ou associado à quimioterapia; PD-L1 < 50%: quimioterapia de platina + pembrolizumabe (ou outros esquemas com imunoterapia).',
          observacao: 'Histologia (escamoso x não escamoso) define o parceiro da platina (pemetrexede apenas em não escamoso). Bevacizumabe é contraindicado no escamoso.',
          fonte: 'NCCN NSCLC (2025); ESMO Non-oncogene-addicted metastatic NSCLC (2023)',
        },
        {
          condicao: 'Linfoma difuso de grandes células B (CD20+)',
          recomendacao:
            'R-CHOP (rituximabe, ciclofosfamida, doxorrubicina, vincristina, prednisona) por 6 ciclos na maioria; Pola-R-CHP (polatuzumabe vedotina substituindo a vincristina) é opção para IPI ≥ 2.',
          observacao: 'Doença localizada pode receber menos ciclos ± radioterapia. Rastrear hepatite B; profilaxia de lise tumoral em alta carga; FEVE antes da antraciclina.',
          fonte: 'NCCN B-Cell Lymphomas (2025); ESMO DLBCL; Diretrizes SBOC',
        },
        {
          condicao: 'Câncer colorretal metastático',
          recomendacao:
            'MSI-H/dMMR: imunoterapia em primeira linha (pembrolizumabe ou nivolumabe ± ipilimumabe). pMMR/MSS: quimioterapia com fluoropirimidina (FOLFOX, CAPOX ou FOLFIRI) + biológico — anti-EGFR (cetuximabe/panitumumabe) se RAS e BRAF selvagens e primário à esquerda, ou bevacizumabe.',
          observacao: 'Testar RAS (KRAS/NRAS), BRAF, MSI/MMR e HER2 antes da 1ª linha. Testar DPD antes de fluoropirimidinas. Intenção de ressecção de metástases muda a estratégia.',
          fonte: 'NCCN Colon Cancer (2025); ESMO mCRC (2023); Diretrizes SBOC',
        },
        {
          condicao: 'Câncer de cólon estágio III (adjuvante)',
          recomendacao:
            'Fluoropirimidina + oxaliplatina: CAPOX por 3 meses em baixo risco (T1–3 N1) ou FOLFOX/CAPOX por 6 meses em alto risco (T4 e/ou N2).',
          observacao: 'A duração busca equilibrar benefício e neuropatia cumulativa da oxaliplatina (estudo IDEA). Idosos/frágeis: fluoropirimidina isolada.',
          fonte: 'NCCN Colon Cancer (2025); ESMO localised colon cancer (2020)',
        },
        {
          condicao: 'Câncer de próstata metastático sensível à castração',
          recomendacao:
            'Privação androgênica (agonista de GnRH como leuprorrelina, ou antagonista) contínua + inibidor da via do receptor androgênico (abiraterona, enzalutamida ou apalutamida), com ou sem docetaxel (terapia tripla em alto volume).',
          observacao: 'Com agonista de GnRH, cobrir o flare com antiandrogênio em doença sintomática ou com risco de compressão medular. Manejo ósseo e metabólico.',
          fonte: 'NCCN Prostate Cancer (2025); EAU Guidelines (2024); ESMO (2023)',
        },
        {
          condicao: 'GIST com mutação de KIT/PDGFRA',
          recomendacao:
            'Ressecção cirúrgica; imatinibe adjuvante por 3 anos nos de alto risco de recidiva; imatinibe na doença irressecável/metastática.',
          observacao: 'Mutação PDGFRA D842V é resistente ao imatinibe (avapritinibe); mutação no éxon 9 de KIT pode requerer dose maior.',
          fonte: 'NCCN GIST/Soft Tissue Sarcoma (2025); ESMO-EURACAN GIST (2022)',
        },
        {
          condicao: 'Tumores de células germinativas de testículo avançados',
          recomendacao: 'Esquemas baseados em cisplatina (BEP — bleomicina, etoposídeo, cisplatina; ou EP), com alto potencial de cura mesmo na doença metastática.',
          observacao: 'Número de ciclos conforme grupo de risco IGCCCG; audiometria e função pulmonar/renal.',
          fonte: 'NCCN Testicular Cancer (2025); EAU Guidelines (2024)',
        },
      ],
      contraindicacoes: [
        'Gestação: a maioria dos antineoplásicos é teratogênica (MTX, fluoropirimidinas, alquilantes, TKIs, tamoxifeno, trastuzumabe — oligoidrâmnio); contracepção eficaz durante e após o tratamento',
        'Mielossupressão grave preexistente (neutrófilos < 1.500/mm³, plaquetas < 100.000/mm³ como regra para citotóxicos em tumores sólidos)',
        'Antraciclinas: FEVE reduzida ou dose cumulativa máxima atingida',
        'Fluoropirimidinas: deficiência completa de DPD; uso de brivudina',
        'Cisplatina: insuficiência renal e perda auditiva significativa',
        'Vincristina/vimblastina: nunca por via intratecal',
        'Bevacizumabe: cirurgia recente, ferida aberta, hemoptise/histologia escamosa pulmonar',
        'Inibidores da aromatase: pré-menopausa sem supressão ovariana',
        'Inibidores de checkpoint: cautela em autoimunidade ativa e transplante de órgão sólido',
      ],
      interacoes: [
        'CYP3A4: TKIs (imatinibe, osimertinibe), taxanos e alcaloides da vinca têm níveis aumentados por azólicos/macrolídeos e reduzidos por rifampicina, carbamazepina, fenitoína e erva-de-são-joão',
        'Metotrexato + AINEs, penicilinas, IBP ou sulfametoxazol-trimetoprima: redução da excreção e mielossupressão grave',
        'Fluoropirimidinas + varfarina: aumento do INR; + brivudina: toxicidade fatal por inibição da DPD',
        'Tamoxifeno + inibidores fortes de CYP2D6 (paroxetina, fluoxetina, bupropiona): menos endoxifeno e possível perda de eficácia',
        'Antraciclinas + trastuzumabe: cardiotoxicidade aditiva — evitar uso simultâneo',
        'Cisplatina + aminoglicosídeos/vancomicina/diuréticos de alça: nefro e ototoxicidade aditivas',
        'Corticoide em dose imunossupressora antes de iniciar inibidores de checkpoint pode reduzir a resposta',
        'Vacinas de vírus vivos são contraindicadas durante quimioterapia/anti-CD20',
      ],
      comparacoes: [
        {
          titulo: 'Quimioterapia citotóxica x terapia-alvo x hormonioterapia x imunoterapia',
          texto:
            'Citotóxicos: alvo inespecífico (DNA/fuso), atingem qualquer célula em proliferação, toxicidade previsível em medula, mucosa e folículos, administração em ciclos IV. Terapia-alvo: exige biomarcador, inibe uma via oncogênica específica, toxicidade ligada ao alvo, resistência por mutação secundária; TKIs são orais e diários, anticorpos são IV/SC. Hormonioterapia: limitada a tumores hormônio-dependentes (RH+, próstata), oral ou depot, toxicidade de privação hormonal, uso prolongado por anos. Imunoterapia: atua sobre o linfócito T e não sobre o tumor, respostas podem demorar e ser duradouras, toxicidade autoimune de qualquer órgão e a qualquer tempo.',
        },
        {
          titulo: 'Cisplatina x carboplatina x oxaliplatina',
          texto:
            'Cisplatina: nefrotoxicidade, ototoxicidade, hipomagnesemia e emese intensa — exige hiper-hidratação. Carboplatina: menos tóxica para rim, ouvido e nervo, mas mais mielotóxica (plaquetopenia); dose por AUC (Calvert). Oxaliplatina: ativa no colorretal (adutos que escapam do MMR), neuropatia aguda desencadeada pelo frio e neuropatia sensitiva cumulativa; pouca nefrotoxicidade; diluir em glicose 5%.',
        },
        {
          titulo: 'Taxanos x alcaloides da vinca; vincristina x vimblastina',
          texto:
            'Taxanos estabilizam e alcaloides da vinca desestabilizam os microtúbulos — efeitos opostos com o mesmo resultado: parada em mitose. Paclitaxel: neuropatia e hipersensibilidade (Cremophor), pré-medicação obrigatória. Docetaxel: retenção hídrica, neutropenia e alterações ungueais. Vincristina: neurotoxicidade dose-limitante, pouca mielossupressão (por isso entra em tantos esquemas). Vimblastina: mielossupressão dose-limitante. Ambas as vincas: vesicantes e fatais por via intratecal.',
        },
        {
          titulo: 'Ciclofosfamida x ifosfamida',
          texto:
            'Ambas são oxazafosforinas ativadas no fígado e geram acroleína (cistite hemorrágica). A ifosfamida produz mais cloroacetaldeído, causando encefalopatia e tubulopatia (síndrome de Fanconi), e sempre requer mesna; a ciclofosfamida requer mesna em altas doses. A ciclofosfamida tem uso muito mais amplo (linfomas, mama, autoimunes), a ifosfamida concentra-se em sarcomas, tumores germinativos e resgate de linfomas.',
        },
        {
          titulo: 'Fluorouracila x capecitabina',
          texto:
            'Mesma molécula ativa (5-FU). A fluorouracila é IV (bolus → mais mielossupressão; infusão contínua → mais mucosite e síndrome mão-pé). A capecitabina é oral, imita a infusão contínua e tem a síndrome mão-pé como toxicidade típica; exige ajuste renal. Ambas são inativadas pela DPD e interagem com varfarina.',
        },
        {
          titulo: 'Tamoxifeno x inibidores da aromatase',
          texto:
            'Tamoxifeno bloqueia o receptor de estrogênio, serve na pré e na pós-menopausa, protege o osso na pós-menopausa, mas aumenta câncer de endométrio e tromboembolismo. Inibidores da aromatase reduzem a produção de estrogênio, são um pouco mais eficazes na pós-menopausa, mas só funcionam sem ovário ativo e causam artralgia, perda óssea e dislipidemia, sem risco endometrial.',
        },
        {
          titulo: 'Anti-PD-1 x anti-PD-L1; antraciclina x trastuzumabe (cardiotoxicidade)',
          texto:
            'Anti-PD-1 bloqueia o receptor no linfócito (inibe ligação a PD-L1 e PD-L2); anti-PD-L1 bloqueia o ligante no tumor — perfis de toxicidade imunomediada semelhantes, com indicações definidas por estudo. Cardiotoxicidade: a da antraciclina é tipo I (lesão estrutural, dose-cumulativa, em geral irreversível); a do trastuzumabe é tipo II (disfunção funcional, não dose-dependente, geralmente reversível com suspensão).',
        },
      ],
      memorizar: [
        'Fase S: antimetabólitos (MTX, 5-FU, capecitabina, gencitabina, citarabina). Fase M: taxanos e vincas. Inespecíficos: alquilantes e platinas.',
        'Metotrexato inibe DHFR; leucovorina resgata. 5-FU inibe timidilato sintase; deficiência de DPD = toxicidade fatal.',
        'Capecitabina = pró-fármaco oral do 5-FU → síndrome mão-pé.',
        'Citarabina em altas doses → toxicidade cerebelar e conjuntivite.',
        'Ciclofosfamida/ifosfamida → acroleína → cistite hemorrágica → mesna. Ifosfamida → encefalopatia.',
        'Cisplatina: rim, ouvido, magnésio, vômitos. Carboplatina: plaquetas (Calvert). Oxaliplatina: neuropatia ao frio.',
        'Antraciclinas: cardiotoxicidade dose-cumulativa, urina vermelha, vesicantes.',
        'Vincristina: neuropatia e constipação, pouca mielossupressão; FATAL por via intratecal. Vimblastina: medula.',
        'Paclitaxel: pré-medicação (Cremophor) e neuropatia. Docetaxel: retenção hídrica.',
        'Biomarcador antes da terapia-alvo: BCR-ABL (imatinibe), EGFR del19/L858R/T790M (osimertinibe), HER2 (trastuzumabe), CD20 (rituximabe), PD-L1 e MSI-H/dMMR (imunoterapia), RH (hormonioterapia).',
        'Toxicidades on-target: EGFR → rash acneiforme; PDGFR/KIT → edema periorbital; HER2 → queda reversível da FEVE; VEGF → hipertensão, proteinúria, sangramento; CD20 → reação infusional e reativação de HBV.',
        'Inibidores de checkpoint → eventos imunomediados (tireoide, cólon, pulmão, fígado, hipófise); tratar com corticoide.',
        'Tamoxifeno: câncer de endométrio e TEV; cuidado com inibidores de CYP2D6. IA: só pós-menopausa; artralgia e osteoporose.',
        'Agonista de GnRH (leuprorrelina): flare inicial de testosterona → cobrir com antiandrogênio.',
        'Citotóxicos: preparo em cabine de segurança biológica, EPI e descarte como resíduo químico (NR 32; RDC 220/2004).',
      ],
      fontes: [
        'Brunton LL, Knollmann BC (eds.). Goodman & Gilman: As Bases Farmacológicas da Terapêutica, 14ª ed. (2023)',
        'Katzung BG, Vanderah TW. Farmacologia Básica e Clínica, 15ª ed. (2021)',
        'Ritter JM et al. Rang & Dale Farmacologia, 9ª ed. (2020)',
        'NCCN Clinical Practice Guidelines in Oncology (2025): Breast, NSCLC, Colon, CML, B-Cell Lymphomas, Prostate, Testicular, GIST',
        'ESMO Clinical Practice Guidelines (2020–2024): early e metastatic breast cancer, NSCLC, mCRC, DLBCL, GIST, toxicidades de imunoterapia (2022)',
        'Sociedade Brasileira de Oncologia Clínica (SBOC). Diretrizes de tratamentos oncológicos (edição vigente)',
        'European LeukemiaNet 2020 recommendations for CML',
        'ESC Guidelines on cardio-oncology (2022)',
        'MASCC/ESMO Antiemetic Guideline (2023)',
        'Bulas Anvisa e FDA labels dos produtos citados',
        'Ministério do Trabalho. NR 32 — Segurança e Saúde no Trabalho em Serviços de Saúde',
        'Anvisa. RDC nº 220/2004 — Serviços de terapia antineoplásica; RDC nº 222/2018 — Gerenciamento de resíduos de serviços de saúde',
      ],
      dataRevisao: REV,
    },
  ],
};

export default dados;
