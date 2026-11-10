import type { ModuloDados, Termo } from '../types';

// =====================================================================
// Grupos: 'antidiabeticos' e 'obesidade'
// Conteúdo educacional redigido a partir de referências-padrão.
// Aguardando revisão de docente — nada aqui é prescrição.
// =====================================================================

const DATA = '10/nov/2026';

const REF_LIVROS = [
  'Brunton LL, Knollmann BC (eds.). Goodman & Gilman: As Bases Farmacológicas da Terapêutica, 14ª ed. — cap. Hormônios pancreáticos e fármacos para o diabetes',
  'Katzung BG, Vanderah TW. Farmacologia Básica e Clínica, 15ª ed. — cap. Hormônios pancreáticos e fármacos antidiabéticos',
  'Rang HP, Dale MM et al. Rang & Dale Farmacologia, 9ª ed. — cap. O controle da glicemia e o tratamento do diabetes melito',
];
const REF_SBD = 'Sociedade Brasileira de Diabetes. Diretriz Oficial da SBD 2024/2025 — Tratamento farmacológico da hiperglicemia no DM2; Insulinoterapia no DM1; Diabetes na gestação';
const REF_ADA = 'American Diabetes Association. Standards of Care in Diabetes—2025. Diabetes Care 2025;48(Suppl 1) — seções 9 (Pharmacologic Approaches), 10 (Cardiovascular Disease), 11 (CKD) e 15 (Pregnancy)';
const REF_ADA_OB = 'American Diabetes Association. Standards of Care in Diabetes—2025, seção 8 (Obesity and Weight Management)';
const REF_ABESO = 'ABESO. Diretrizes Brasileiras de Obesidade, 4ª ed. (2016) e posicionamentos ABESO/SBEM posteriores';
const REF_RENAME = 'Ministério da Saúde. RENAME 2024 e Formulário Terapêutico Nacional';
const REF_344 = 'Portaria SVS/MS nº 344/1998 e atualizações (listas de substâncias sob controle especial)';

// Termos de efeitos adversos reutilizados
const HIPOGLICEMIA: Termo = {
  termo: 'Hipoglicemia',
  sinonimos: ['glicose baixa', 'açúcar baixo', 'glicemia baixa', 'hipoglicemia grave', 'queda da glicose', 'hypoglycemia'],
};
const GANHO_PESO: Termo = {
  termo: 'Ganho de peso',
  sinonimos: ['aumento de peso', 'engordar', 'ganho ponderal', 'weight gain'],
};
const NAUSEA_GLP1: Termo = {
  termo: 'Náuseas e vômitos',
  sinonimos: ['náusea', 'enjoo', 'vômito', 'vômitos', 'efeitos gastrointestinais', 'intolerância gastrointestinal', 'nausea'],
};
const DIARREIA_GLP1: Termo = {
  termo: 'Diarreia ou constipação',
  sinonimos: ['diarreia', 'constipação', 'prisão de ventre', 'intestino solto'],
};
const PANCREATITE: Termo = {
  termo: 'Pancreatite aguda',
  sinonimos: ['pancreatite', 'inflamação do pâncreas', 'pancreatitis'],
};
const COLELITIASE: Termo = {
  termo: 'Colelitíase e colecistite',
  sinonimos: ['cálculo biliar', 'pedra na vesícula', 'colelitiase', 'doença da vesícula biliar', 'colecistite'],
};
const CA_TIREOIDE: Termo = {
  termo: 'Tumores de células C da tireoide (risco observado em roedores)',
  sinonimos: ['carcinoma medular de tireoide', 'câncer medular de tireoide', 'tumor de células C', 'câncer de tireoide'],
};
const INFEC_GENITAL: Termo = {
  termo: 'Infecção genital micótica',
  sinonimos: ['candidíase genital', 'candidíase vulvovaginal', 'micose genital', 'balanite', 'infecção fúngica genital', 'vulvovaginite'],
};
const ITU: Termo = {
  termo: 'Infecção do trato urinário',
  sinonimos: ['ITU', 'infecção urinária', 'cistite'],
};
const POLIURIA: Termo = {
  termo: 'Poliúria e depleção de volume',
  sinonimos: ['aumento da diurese', 'urinar muito', 'hipovolemia', 'desidratação', 'hipotensão postural', 'depleção volêmica'],
};
const CAD_EUGLIC: Termo = {
  termo: 'Cetoacidose diabética euglicêmica',
  sinonimos: ['cetoacidose euglicêmica', 'cetoacidose', 'CAD euglicêmica', 'euglycemic ketoacidosis'],
};
const FOURNIER: Termo = {
  termo: 'Gangrena de Fournier (fasceíte necrosante do períneo)',
  sinonimos: ['gangrena de fournier', 'fasceíte necrosante perineal', 'fournier'],
};
const LIPODISTROFIA: Termo = {
  termo: 'Lipo-hipertrofia no local de aplicação',
  sinonimos: ['lipodistrofia', 'lipohipertrofia', 'nódulo no local da aplicação', 'caroço no local da injeção', 'lipoatrofia'],
};
const HIPOCALEMIA_INS: Termo = {
  termo: 'Hipocalemia',
  sinonimos: ['hipopotassemia', 'potássio baixo', 'queda do potássio'],
};
const REACAO_LOCAL: Termo = {
  termo: 'Reação no local da injeção',
  sinonimos: ['vermelhidão no local', 'dor no local da aplicação', 'eritema local', 'prurido no local'],
};

const DIST_SECRETAGOGO = ['Infecção genital micótica', 'Acidose lática', 'Esteatorreia e evacuação oleosa', 'Tosse seca'];
const DIST_INSULINA = ['Infecção genital micótica', 'Acidose lática', 'Esteatorreia e evacuação oleosa', 'Tosse seca persistente'];
const DIST_GLP1 = ['Infecção genital micótica', 'Acidose lática', 'Edema por retenção hídrica', 'Ganho de peso'];
const DIST_SGLT2 = ['Ganho de peso', 'Edema por retenção hídrica', 'Deficiência de vitamina B12', 'Esteatorreia e evacuação oleosa'];

const INTER_HIPOGLICEMIA = 'Betabloqueadores — podem mascarar sintomas adrenérgicos da hipoglicemia (tremor, taquicardia) e retardar a recuperação';
const INTER_HIPERGLICEMIANTES = 'Corticoides, diuréticos tiazídicos, antipsicóticos atípicos e simpaticomiméticos — elevam a glicemia e reduzem o efeito hipoglicemiante';

const dados: ModuloDados = {
  // ===================================================================
  // CLASSES
  // ===================================================================
  classes: [
    // ---------------- antidiabéticos ----------------
    {
      id: 'biguanida',
      nome: 'Biguanidas',
      grupoId: 'antidiabeticos',
      familia: 'Antidiabéticos orais',
      mecanismoCurto:
        'Reduzem a produção hepática de glicose (gliconeogênese), em parte por ação mitocondrial com ativação da AMPK, e aumentam a captação periférica de glicose, sem estimular a secreção de insulina.',
      sinonimos: ['biguanida', 'biguanidas', 'biguanide'],
    },
    {
      id: 'sulfonilureia',
      nome: 'Sulfonilureias',
      sigla: 'SU',
      grupoId: 'antidiabeticos',
      familia: 'Secretagogos de insulina',
      mecanismoCurto:
        'Ligam-se à subunidade SUR1 do canal de potássio sensível ao ATP (K-ATP) da célula β, fechando-o; a despolarização abre canais de cálcio e dispara a secreção de insulina, independentemente da glicemia.',
      sinonimos: ['sulfonilureia', 'sulfonilureias', 'SU', 'secretagogo de insulina', 'secretagogos', 'sulfonylurea', 'bloqueador do canal K-ATP'],
    },
    {
      id: 'glinida',
      nome: 'Glinidas (meglitinidas)',
      grupoId: 'antidiabeticos',
      familia: 'Secretagogos de insulina',
      mecanismoCurto:
        'Fecham o canal K-ATP da célula β em sítio distinto das sulfonilureias, com início rápido e curta duração — estimulam a secreção prandial de insulina (ex.: repaglinida, nateglinida).',
      sinonimos: ['glinida', 'glinidas', 'meglitinida', 'meglitinidas', 'secretagogo de ação rápida'],
    },
    {
      id: 'idpp4',
      nome: 'Inibidores da dipeptidil peptidase-4',
      sigla: 'iDPP-4',
      grupoId: 'antidiabeticos',
      familia: 'Terapias baseadas em incretinas',
      mecanismoCurto:
        'Inibem a enzima DPP-4, que degrada GLP-1 e GIP endógenos; prolongam a ação das incretinas, aumentando a secreção de insulina e reduzindo o glucagon de forma glicose-dependente.',
      sinonimos: ['iDPP4', 'iDPP-4', 'inibidor da DPP-4', 'inibidores da DPP4', 'gliptina', 'gliptinas', 'DPP-4 inhibitor', 'inibidor da dipeptidil peptidase 4'],
    },
    {
      id: 'isglt2',
      nome: 'Inibidores do cotransportador sódio-glicose tipo 2',
      sigla: 'iSGLT2',
      grupoId: 'antidiabeticos',
      familia: 'Antidiabéticos orais',
      mecanismoCurto:
        'Bloqueiam o SGLT2 no túbulo contorcido proximal, impedindo a reabsorção de glicose e sódio filtrados; causam glicosúria e natriurese, com efeito independente da insulina.',
      sinonimos: ['iSGLT2', 'inibidor do SGLT2', 'inibidores do SGLT-2', 'gliflozina', 'gliflozinas', 'glicosúrico', 'SGLT2 inhibitor', 'inibidor do cotransportador sodio glicose 2'],
    },
    {
      id: 'agonista-glp1',
      nome: 'Agonistas do receptor de GLP-1',
      sigla: 'aGLP-1',
      grupoId: 'antidiabeticos',
      familia: 'Terapias baseadas em incretinas',
      mecanismoCurto:
        'Ativam o receptor do peptídeo semelhante ao glucagon 1 (GLP-1), resistindo à degradação pela DPP-4: aumentam a insulina e reduzem o glucagon de modo glicose-dependente, retardam o esvaziamento gástrico e aumentam a saciedade no SNC.',
      sinonimos: ['agonista de GLP-1', 'agonistas do GLP-1', 'aGLP1', 'análogo de GLP-1', 'GLP-1 RA', 'incretinomimético', 'agonista do receptor de GLP1', 'agonista do peptídeo semelhante ao glucagon 1'],
    },
    {
      id: 'agonista-gip-glp1',
      nome: 'Agonistas duplos dos receptores de GIP e GLP-1',
      grupoId: 'antidiabeticos',
      familia: 'Terapias baseadas em incretinas',
      mecanismoCurto:
        'Uma única molécula ativa os receptores do GIP (polipeptídeo insulinotrópico dependente de glicose) e do GLP-1, somando efeito insulinotrópico, redução do glucagon, saciedade e retardo do esvaziamento gástrico.',
      sinonimos: ['agonista duplo GIP/GLP-1', 'agonista dual GIP GLP-1', 'coagonista GIP/GLP-1', 'twincretina', 'agonista GIP e GLP-1', 'dual GIP/GLP-1 receptor agonist'],
    },
    {
      id: 'tiazolidinediona',
      nome: 'Tiazolidinedionas (agonistas PPAR-γ)',
      sigla: 'TZD',
      grupoId: 'antidiabeticos',
      familia: 'Sensibilizadores de insulina',
      mecanismoCurto:
        'Agonistas do receptor nuclear PPAR-γ (principalmente no tecido adiposo): alteram a transcrição de genes do metabolismo de glicose e lipídios e aumentam a sensibilidade à insulina no músculo, fígado e tecido adiposo.',
      sinonimos: ['tiazolidinediona', 'tiazolidinedionas', 'glitazona', 'glitazonas', 'TZD', 'agonista PPAR gama', 'agonista do PPAR-γ', 'sensibilizador de insulina'],
    },
    {
      id: 'inibidor-alfa-glicosidase',
      nome: 'Inibidores da α-glicosidase intestinal',
      grupoId: 'antidiabeticos',
      familia: 'Antidiabéticos orais',
      mecanismoCurto:
        'Inibem competitivamente as α-glicosidases da borda em escova do intestino delgado, retardando a digestão de carboidratos complexos e reduzindo a glicemia pós-prandial (ex.: acarbose).',
      sinonimos: ['inibidor da alfa-glicosidase', 'inibidores da alfa glicosidase', 'acarbose', 'alpha-glucosidase inhibitor'],
    },
    {
      id: 'insulina-acao-ultrarrapida',
      nome: 'Análogos de insulina de ação ultrarrápida',
      grupoId: 'antidiabeticos',
      familia: 'Insulinas',
      mecanismoCurto:
        'Insulinas com modificação de aminoácidos que impede a formação de hexâmeros no tecido subcutâneo: absorção rápida (início em 5–15 min, pico em 1–2 h, duração de 3–5 h), usadas no bolus prandial e na correção.',
      sinonimos: ['insulina ultrarrápida', 'análogo ultrarrápido', 'análogo de ação rápida', 'insulina prandial', 'insulina de bolus', 'rapid-acting insulin analog'],
    },
    {
      id: 'insulina-acao-rapida',
      nome: 'Insulina de ação rápida (regular / curta)',
      grupoId: 'antidiabeticos',
      familia: 'Insulinas',
      mecanismoCurto:
        'Insulina humana idêntica à endógena, que forma hexâmeros no subcutâneo e precisa dissociar-se antes de absorvida: início em 30–60 min, pico em 2–3 h, duração de 5–8 h; é a insulina de escolha por via intravenosa.',
      sinonimos: ['insulina regular', 'insulina rápida', 'insulina de ação curta', 'insulina simples', 'short-acting insulin', 'insulina humana regular'],
    },
    {
      id: 'insulina-acao-intermediaria',
      nome: 'Insulina de ação intermediária (NPH)',
      grupoId: 'antidiabeticos',
      familia: 'Insulinas',
      mecanismoCurto:
        'Insulina humana complexada à protamina e ao zinco (isófana), que se dissolve lentamente no subcutâneo: início em 2–4 h, pico em 4–10 h, duração de 10–18 h; usada como basal em 1–3 aplicações diárias.',
      sinonimos: ['insulina intermediária', 'NPH', 'insulina NPH', 'insulina isófana', 'intermediate-acting insulin', 'neutral protamine Hagedorn'],
    },
    {
      id: 'insulina-acao-longa',
      nome: 'Análogos de insulina de ação longa (basais)',
      grupoId: 'antidiabeticos',
      familia: 'Insulinas',
      mecanismoCurto:
        'Análogos modificados para absorção lenta e contínua (precipitação no subcutâneo, ligação à albumina ou formação de multi-hexâmeros): perfil sem pico pronunciado e duração ≥24 h, com menos hipoglicemia noturna que a NPH.',
      sinonimos: ['insulina de ação longa', 'análogo basal', 'insulina basal', 'insulina prolongada', 'long-acting insulin', 'análogo de longa duração'],
    },

    // ---------------- obesidade ----------------
    {
      id: 'inibidor-lipases',
      nome: 'Inibidores de lipases gastrointestinais',
      grupoId: 'obesidade',
      familia: 'Ação periférica (intestinal)',
      mecanismoCurto:
        'Ligam-se de forma covalente às lipases gástrica e pancreática no lúmen intestinal, impedindo a hidrólise dos triglicerídeos da dieta; cerca de 30% da gordura ingerida é eliminada nas fezes.',
      sinonimos: ['inibidor de lipase', 'inibidores das lipases', 'inibidor da lipase pancreática', 'antilipase', 'lipase inhibitor'],
    },
    {
      id: 'irsn-acao-central-obesidade',
      nome: 'Inibidores da recaptação de serotonina e noradrenalina de ação central (sacietógenos)',
      grupoId: 'obesidade',
      familia: 'Ação central',
      mecanismoCurto:
        'Inibem a recaptação de serotonina e noradrenalina (e, em menor grau, dopamina) no hipotálamo, aumentando a saciedade e reduzindo a ingestão alimentar; o tônus noradrenérgico periférico eleva PA e frequência cardíaca.',
      sinonimos: ['inibidor da recaptação de serotonina e noradrenalina', 'sacietógeno', 'sacietogeno', 'IRSN central', 'anorexígeno serotoninérgico e noradrenérgico', 'SNRI'],
    },
    {
      id: 'antagonista-opioide-bupropiona',
      nome: 'Associação antagonista opioide + inibidor da recaptação de dopamina e noradrenalina',
      grupoId: 'obesidade',
      familia: 'Ação central',
      mecanismoCurto:
        'A bupropiona estimula neurônios POMC do núcleo arqueado (liberação de α-MSH, que ativa MC4R e gera saciedade); a naltrexona bloqueia o receptor μ-opioide que mediaria a autoinibição desses neurônios pela β-endorfina, sustentando o efeito e modulando a via de recompensa.',
      sinonimos: ['naltrexona + bupropiona', 'antagonista opioide com bupropiona', 'associação naltrexona bupropiona', 'antagonista opioide e inibidor da recaptação de dopamina'],
    },
    {
      id: 'agonista-glp1-obesidade',
      nome: 'Agonistas do receptor de GLP-1',
      sigla: 'aGLP-1',
      grupoId: 'obesidade',
      familia: 'Terapias baseadas em incretinas',
      mecanismoCurto:
        'Em doses mais altas que as usadas no DM2, ativam receptores de GLP-1 no hipotálamo e no tronco encefálico (saciedade, menor apetite) e retardam o esvaziamento gástrico, reduzindo a ingestão calórica.',
      sinonimos: ['agonista de GLP-1', 'aGLP1', 'análogo de GLP-1', 'GLP-1 RA', 'incretinomimético', 'agonista do receptor de GLP1'],
    },
    {
      id: 'agonista-gip-glp1-obesidade',
      nome: 'Agonistas duplos dos receptores de GIP e GLP-1',
      grupoId: 'obesidade',
      familia: 'Terapias baseadas em incretinas',
      mecanismoCurto:
        'Coagonismo dos receptores de GIP e GLP-1: soma efeito central sobre saciedade e apetite ao retardo do esvaziamento gástrico, produzindo as maiores perdas ponderais entre os fármacos orais/injetáveis disponíveis.',
      sinonimos: ['agonista duplo GIP/GLP-1', 'agonista dual', 'coagonista GIP/GLP-1', 'twincretina', 'agonista GIP e GLP-1'],
    },
    {
      id: 'anorexigeno-simpaticomimetico',
      nome: 'Anorexígenos simpaticomiméticos (catecolaminérgicos)',
      grupoId: 'obesidade',
      familia: 'Ação central',
      mecanismoCurto:
        'Derivados anfetamínicos que liberam noradrenalina (e dopamina) e/ou inibem sua recaptação no hipotálamo, reduzindo o apetite (ex.: anfepramona, femproporex, mazindol, fentermina); risco de dependência, HAS e taquicardia.',
      sinonimos: ['anorexígeno', 'anorexigeno anfetamínico', 'simpaticomimético', 'derivado anfetamínico', 'catecolaminérgico', 'anfetamínico'],
    },
  ],

  // ===================================================================
  // MEDICAMENTOS
  // ===================================================================
  medicamentos: [
    // ---------------- METFORMINA ----------------
    {
      id: 'metformina',
      nome: 'Metformina',
      sinonimos: ['cloridrato de metformina', 'metformin', 'metformin hydrochloride', 'dimetilbiguanida'],
      vinculos: [
        {
          grupoId: 'antidiabeticos',
          classeId: 'biguanida',
          contexto: 'tratamento inicial da maioria dos pacientes com diabetes melito tipo 2',
          explicacaoFase1:
            'A metformina é o antidiabético oral de base no DM2: reduz a glicemia sem causar hipoglicemia em monoterapia, é neutra ou levemente favorável no peso e tem baixo custo.',
        },
      ],
      mecanismo:
        'Reduz a produção hepática de glicose, principalmente pela inibição da gliconeogênese; o mecanismo envolve ação no complexo I mitocondrial, alteração do estado energético do hepatócito e ativação da AMPK. Também aumenta a captação periférica de glicose e tem efeitos intestinais (maior utilização de glicose e secreção de GLP-1). Não estimula a secreção de insulina, por isso não causa hipoglicemia quando usada isoladamente.',
      indicacoes: [
        'Diabetes melito tipo 2 em adultos, em monoterapia ou associada a outros antidiabéticos e à insulina',
        'Diabetes melito tipo 2 em crianças a partir de 10 anos (conforme bula)',
      ],
      offLabel: [
        'Síndrome dos ovários policísticos com resistência insulínica — off-label (verificar bula do produto)',
        'Prevenção de DM2 em pré-diabetes de alto risco (recomendação ADA; a indicação em bula varia por produto)',
        'Atenuação do ganho de peso induzido por antipsicóticos — off-label',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['metformin'],
      nomesComerciais: [
        { nome: 'Glifage', tipo: 'referencia', fabricante: 'Merck', verificacao: 'pendente_anvisa' },
        { nome: 'Glifage XR', tipo: 'marca', fabricante: 'Merck', verificacao: 'pendente_anvisa', obs: 'liberação prolongada (1 tomada diária)' },
        { nome: 'Janumet', tipo: 'combinacao', composicao: 'sitagliptina + metformina', fabricante: 'MSD', verificacao: 'pendente_anvisa' },
        { nome: 'Xigduo XR', tipo: 'combinacao', composicao: 'dapagliflozina + metformina', fabricante: 'AstraZeneca', verificacao: 'pendente_anvisa' },
      ],
      generico: true,
      eaComuns: [
        {
          termo: 'Diarreia e desconforto gastrointestinal',
          sinonimos: ['diarreia', 'náusea', 'dor abdominal', 'flatulência', 'intolerância gastrointestinal', 'efeitos gastrointestinais'],
        },
        { termo: 'Gosto metálico', sinonimos: ['disgeusia', 'sabor metálico', 'alteração do paladar'] },
        {
          termo: 'Deficiência de vitamina B12',
          sinonimos: ['deficiência de B12', 'B12 baixa', 'hipovitaminose B12', 'má absorção de B12', 'deficiência de cobalamina'],
        },
      ],
      eaGraves: [
        {
          termo: 'Acidose lática',
          sinonimos: ['acidose láctica', 'acidose metabólica por lactato', 'lactic acidosis', 'hiperlactatemia'],
        },
      ],
      eaCaracteristico: 'Acidose lática',
      distratoresEA: ['Hipoglicemia grave em monoterapia', 'Ganho de peso', 'Infecção genital micótica', 'Edema por retenção hídrica'],
      contraindicacoes: [
        'TFGe < 30 mL/min/1,73 m² (início não recomendado entre 30 e 45)',
        'Acidose metabólica aguda ou crônica, incluindo cetoacidose diabética',
        'Condições com hipóxia tecidual: choque, sepse, IC descompensada, insuficiência respiratória, IAM recente',
        'Insuficiência hepática grave e intoxicação alcoólica aguda/alcoolismo',
      ],
      precaucoes: [
        'Suspender antes de contraste iodado em pacientes com TFGe 30–60, hepatopatia, alcoolismo ou IC, e antes de cirurgias maiores; reavaliar função renal em 48 h antes de reiniciar',
        'Iniciar com dose baixa às refeições e titular (ou usar liberação prolongada) para reduzir intolerância gastrointestinal',
        'Dosar vitamina B12 periodicamente em uso prolongado, sobretudo se houver neuropatia ou anemia',
        'Na gestação atravessa a placenta; pode ser alternativa no DMG quando a insulina não é viável, mas não é primeira escolha (SBD/ADA)',
      ],
      interacoes: [
        'Contraste iodado — risco de nefropatia aguda e acúmulo de metformina com acidose lática',
        'Álcool — potencializa o risco de acidose lática',
        'Inibidores do transportador renal OCT2/MATE (cimetidina, dolutegravir, ranolazina) — aumentam os níveis de metformina',
        INTER_HIPERGLICEMIANTES,
      ],
      explicacaoFase2:
        'É uma biguanida: atua principalmente no fígado, diminuindo a produção de glicose (gliconeogênese), e melhora a ação da insulina nos tecidos, sem aumentar sua secreção.',
      explicacaoFase3:
        'Ao inibir a respiração mitocondrial e a gliconeogênese a partir do lactato, a metformina pode, quando se acumula (insuficiência renal) ou há hipóxia, levar à acidose lática — rara, porém grave. Os efeitos gastrointestinais são os mais frequentes.',
      referencias: [...REF_LIVROS, REF_SBD, REF_ADA, 'Bula Glifage/Glifage XR (Merck) — Bulário Anvisa', 'FDA — Drug Safety Communication: metformin in renal impairment (2016)', REF_RENAME],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
    },

    // ---------------- SULFONILUREIAS ----------------
    {
      id: 'glibenclamida',
      nome: 'Glibenclamida',
      sinonimos: ['glyburide', 'glibenclamide', 'gliburida'],
      vinculos: [
        {
          grupoId: 'antidiabeticos',
          classeId: 'sulfonilureia',
          subclasse: '2ª geração — longa ação, metabólitos ativos',
          contexto: 'tratamento do diabetes melito tipo 2 como secretagogo de insulina',
          explicacaoFase1:
            'A glibenclamida é uma sulfonilureia barata e potente, usada no DM2 quando é preciso aumentar a secreção de insulina; está na RENAME, mas tem o maior risco de hipoglicemia da classe.',
        },
      ],
      mecanismo:
        'Liga-se à subunidade SUR1 do canal K-ATP da membrana da célula β pancreática e fecha o canal. A despolarização abre canais de cálcio voltagem-dependentes e o influxo de Ca²⁺ dispara a exocitose de insulina, mesmo com glicemia normal. Requer células β funcionantes; tem metabólitos ativos de eliminação renal, o que prolonga o efeito.',
      indicacoes: ['Diabetes melito tipo 2 em adultos, em monoterapia ou associação (exceto com outro secretagogo)'],
      tipoMolecula: 'pequena',
      pubchem: ['glyburide'],
      nomesComerciais: [
        { nome: 'Daonil', tipo: 'referencia', fabricante: 'Sanofi', verificacao: 'pendente_anvisa' },
      ],
      generico: true,
      eaComuns: [
        HIPOGLICEMIA,
        GANHO_PESO,
        { termo: 'Náuseas e desconforto epigástrico', sinonimos: ['náusea', 'dispepsia', 'dor epigástrica'] },
      ],
      eaGraves: [
        {
          termo: 'Hipoglicemia grave e prolongada',
          sinonimos: ['hipoglicemia prolongada', 'hipoglicemia recorrente', 'coma hipoglicêmico'],
        },
        {
          termo: 'Reações cutâneas graves e de hipersensibilidade',
          sinonimos: ['reação alérgica cutânea', 'fotossensibilidade', 'Stevens-Johnson'],
        },
        {
          termo: 'Anemia hemolítica em deficiência de G6PD',
          sinonimos: ['hemólise', 'anemia hemolítica', 'deficiência de G6PD'],
        },
      ],
      eaCaracteristico: 'Hipoglicemia grave e prolongada',
      distratoresEA: DIST_SECRETAGOGO,
      contraindicacoes: [
        'Diabetes melito tipo 1 e cetoacidose diabética',
        'Insuficiência renal ou hepática graves',
        'Gestação e lactação (SBD recomenda insulina no DMG)',
        'Hipersensibilidade a sulfonilureias ou sulfonamidas',
        'Uso concomitante de bosentana',
      ],
      precaucoes: [
        'Evitar em idosos (Critérios de Beers) e em DRC — preferir gliclazida ou glimepirida se for necessária uma SU',
        'Orientar sobre reconhecimento da hipoglicemia e regularidade das refeições; atenção ao álcool e ao exercício',
        'Perda de eficácia ao longo do tempo (falência secundária) pela progressiva perda de função β',
      ],
      interacoes: [
        'Inibidores do CYP2C9 (fluconazol, amiodarona) e sulfametoxazol-trimetoprima — potencializam a hipoglicemia',
        'Insulina e outros secretagogos — somam risco de hipoglicemia',
        INTER_HIPOGLICEMIA,
        'Álcool — hipoglicemia e, raramente, reação dissulfiram-símile',
        'Bosentana — aumento de transaminases (associação contraindicada)',
      ],
      explicacaoFase2:
        'Como sulfonilureia, fecha o canal de potássio dependente de ATP da célula β; a célula despolariza, entra cálcio e a insulina é liberada — por isso funciona só se ainda houver produção pancreática.',
      explicacaoFase3:
        'Como a liberação de insulina ocorre independentemente da glicemia e a glibenclamida tem meia-vida longa com metabólitos ativos renais, a hipoglicemia pode ser grave e prolongada, especialmente em idosos e renais crônicos.',
      referencias: [...REF_LIVROS, REF_SBD, REF_ADA, 'Bula Daonil (Sanofi) — Bulário Anvisa', 'American Geriatrics Society Beers Criteria (2023)', REF_RENAME],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
    },
    {
      id: 'gliclazida',
      nome: 'Gliclazida',
      sinonimos: ['gliclazide', 'gliclazida MR', 'gliclazida de liberação modificada'],
      vinculos: [
        {
          grupoId: 'antidiabeticos',
          classeId: 'sulfonilureia',
          subclasse: '2ª geração — menor risco de hipoglicemia',
          contexto: 'tratamento do diabetes melito tipo 2 como secretagogo de insulina',
          explicacaoFase1:
            'A gliclazida é a sulfonilureia preferida quando se opta por um secretagogo no DM2, pois tem menor risco de hipoglicemia que a glibenclamida; também consta da RENAME.',
        },
      ],
      mecanismo:
        'Fecha o canal K-ATP (SUR1) da célula β, despolarizando a membrana e promovendo influxo de cálcio e secreção de insulina. É metabolizada no fígado em metabólitos inativos, o que reduz o risco de hipoglicemia prolongada; a forma de liberação modificada permite uma tomada diária.',
      indicacoes: ['Diabetes melito tipo 2 em adultos, em monoterapia ou associação com outros antidiabéticos'],
      tipoMolecula: 'pequena',
      pubchem: ['gliclazide'],
      nomesComerciais: [
        { nome: 'Diamicron MR', tipo: 'referencia', fabricante: 'Servier', verificacao: 'pendente_anvisa' },
        { nome: 'Azukon MR', tipo: 'marca', fabricante: 'Torrent', verificacao: 'pendente_anvisa' },
      ],
      generico: true,
      eaComuns: [
        HIPOGLICEMIA,
        GANHO_PESO,
        { termo: 'Distúrbios gastrointestinais', sinonimos: ['náusea', 'dor abdominal', 'diarreia', 'constipação'] },
      ],
      eaGraves: [
        { termo: 'Hipoglicemia grave', sinonimos: ['hipoglicemia severa', 'coma hipoglicêmico', 'neuroglicopenia'] },
        {
          termo: 'Reações cutâneas graves e de hipersensibilidade',
          sinonimos: ['reação alérgica cutânea', 'Stevens-Johnson', 'erupção cutânea grave'],
        },
      ],
      eaCaracteristico: 'Hipoglicemia',
      distratoresEA: DIST_SECRETAGOGO,
      contraindicacoes: [
        'Diabetes melito tipo 1, cetoacidose e pré-coma diabético',
        'Insuficiência renal ou hepática graves',
        'Gestação e lactação',
        'Hipersensibilidade a sulfonilureias ou sulfonamidas',
      ],
      precaucoes: [
        'Orientar sobre hipoglicemia, sobretudo em idosos, desnutridos e com ingestão alimentar irregular',
        'Deficiência de G6PD: risco de hemólise com sulfonilureias',
        'Tomar no café da manhã (forma MR); não partir/mastigar o comprimido de liberação modificada salvo se sulcado para isso',
      ],
      interacoes: [
        'Inibidores do CYP2C9 (fluconazol, miconazol) — potencializam a hipoglicemia (miconazol sistêmico/gel oral é contraindicado em várias bulas)',
        'Insulina e outros secretagogos — somam risco de hipoglicemia',
        INTER_HIPOGLICEMIA,
        INTER_HIPERGLICEMIANTES,
      ],
      explicacaoFase2:
        'É uma sulfonilureia: bloqueia o canal K-ATP da célula β e estimula a secreção de insulina; seus metabólitos são inativos, o que a torna mais segura que a glibenclamida.',
      explicacaoFase3:
        'Por estimular a liberação de insulina independentemente da glicose, o efeito adverso típico é a hipoglicemia — menos frequente que com glibenclamida, mas ainda o principal risco da classe, ao lado do ganho de peso.',
      referencias: [...REF_LIVROS, REF_SBD, REF_ADA, 'Bula Diamicron MR (Servier) — Bulário Anvisa', 'ADVANCE Collaborative Group. N Engl J Med 2008;358:2560-72', REF_RENAME],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
    },
    {
      id: 'glimepirida',
      nome: 'Glimepirida',
      sinonimos: ['glimepiride'],
      vinculos: [
        {
          grupoId: 'antidiabeticos',
          classeId: 'sulfonilureia',
          subclasse: '2ª/3ª geração — dose única diária',
          contexto: 'tratamento do diabetes melito tipo 2 como secretagogo de insulina',
          explicacaoFase1:
            'A glimepirida é uma sulfonilureia de uma tomada diária usada no DM2 para aumentar a secreção de insulina, com risco de hipoglicemia menor que a glibenclamida.',
        },
      ],
      mecanismo:
        'Liga-se ao SUR1 do canal K-ATP da célula β, fechando-o; a despolarização leva ao influxo de cálcio e à secreção de insulina. Tem meia-vida que permite dose única diária e é metabolizada pelo CYP2C9.',
      indicacoes: ['Diabetes melito tipo 2 em adultos, em monoterapia ou associada à metformina ou à insulina'],
      tipoMolecula: 'pequena',
      pubchem: ['glimepiride'],
      nomesComerciais: [
        { nome: 'Amaryl', tipo: 'referencia', fabricante: 'Sanofi', verificacao: 'pendente_anvisa' },
        { nome: 'Azulix', tipo: 'marca', fabricante: 'Torrent', verificacao: 'pendente_anvisa' },
      ],
      generico: true,
      eaComuns: [
        HIPOGLICEMIA,
        GANHO_PESO,
        { termo: 'Náuseas e dor abdominal', sinonimos: ['náusea', 'dor abdominal', 'dispepsia'] },
        { termo: 'Tontura e cefaleia', sinonimos: ['tontura', 'dor de cabeça', 'cefaleia'] },
      ],
      eaGraves: [
        { termo: 'Hipoglicemia grave', sinonimos: ['hipoglicemia severa', 'coma hipoglicêmico'] },
        {
          termo: 'Discrasias sanguíneas',
          sinonimos: ['trombocitopenia', 'leucopenia', 'agranulocitose', 'anemia hemolítica'],
        },
      ],
      eaCaracteristico: 'Hipoglicemia',
      distratoresEA: DIST_SECRETAGOGO,
      contraindicacoes: [
        'Diabetes melito tipo 1 e cetoacidose diabética',
        'Insuficiência renal ou hepática graves',
        'Gestação e lactação',
        'Hipersensibilidade a sulfonilureias ou sulfonamidas',
      ],
      precaucoes: [
        'Iniciar com 1 mg e titular; tomar antes ou durante o café da manhã',
        'Idosos e DRC moderada: maior sensibilidade à hipoglicemia',
        'Deficiência de G6PD: risco de hemólise',
      ],
      interacoes: [
        'Inibidores do CYP2C9 (fluconazol, amiodarona) — aumentam o risco de hipoglicemia',
        'Insulina e outros secretagogos — risco aditivo de hipoglicemia',
        INTER_HIPOGLICEMIA,
        INTER_HIPERGLICEMIANTES,
      ],
      explicacaoFase2:
        'Sulfonilureia que fecha o canal K-ATP da célula β e libera insulina; o uso em dose única diária facilita a adesão.',
      explicacaoFase3:
        'Ao liberar insulina mesmo com glicemia normal, causa hipoglicemia — o efeito adverso típico de todo secretagogo —, além de ganho de peso.',
      referencias: [...REF_LIVROS, REF_SBD, REF_ADA, 'Bula Amaryl (Sanofi) — Bulário Anvisa'],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
    },

    // ---------------- iDPP-4 ----------------
    {
      id: 'sitagliptina',
      nome: 'Sitagliptina',
      sinonimos: ['fosfato de sitagliptina', 'sitagliptin'],
      vinculos: [
        {
          grupoId: 'antidiabeticos',
          classeId: 'idpp4',
          contexto: 'tratamento oral do diabetes melito tipo 2 com baixo risco de hipoglicemia',
          explicacaoFase1:
            'A sitagliptina é usada no DM2, geralmente associada à metformina, quando se quer reduzir a glicemia com baixo risco de hipoglicemia e sem efeito no peso; é útil em idosos.',
        },
      ],
      mecanismo:
        'Inibe seletivamente a dipeptidil peptidase-4, enzima que inativa GLP-1 e GIP em minutos. Com mais incretina ativa, aumenta a secreção de insulina e reduz a de glucagon somente quando a glicemia está elevada — por isso o risco de hipoglicemia é baixo. É eliminada majoritariamente inalterada pelos rins.',
      indicacoes: ['Diabetes melito tipo 2 em adultos, em monoterapia ou associada a metformina, sulfonilureia, TZD ou insulina'],
      tipoMolecula: 'pequena',
      pubchem: ['sitagliptin'],
      nomesComerciais: [
        { nome: 'Januvia', tipo: 'referencia', fabricante: 'MSD', verificacao: 'pendente_anvisa' },
        { nome: 'Janumet', tipo: 'combinacao', composicao: 'sitagliptina + metformina', fabricante: 'MSD', verificacao: 'pendente_anvisa' },
        { nome: 'Janumet XR', tipo: 'combinacao', composicao: 'sitagliptina + metformina de liberação prolongada', fabricante: 'MSD', verificacao: 'pendente_anvisa' },
      ],
      generico: false,
      eaComuns: [
        { termo: 'Nasofaringite e infecção de vias aéreas superiores', sinonimos: ['nasofaringite', 'resfriado', 'IVAS', 'infecção respiratória alta'] },
        { termo: 'Cefaleia', sinonimos: ['dor de cabeça'] },
      ],
      eaGraves: [
        PANCREATITE,
        { termo: 'Penfigoide bolhoso', sinonimos: ['penfigoide', 'bolhas na pele', 'dermatose bolhosa'] },
        { termo: 'Reações de hipersensibilidade graves', sinonimos: ['angioedema', 'anafilaxia', 'Stevens-Johnson'] },
        { termo: 'Artralgia intensa', sinonimos: ['dor articular grave', 'artralgia'] },
      ],
      eaCaracteristico: 'Pancreatite aguda',
      distratoresEA: ['Infecção genital micótica', 'Acidose lática', 'Ganho de peso', 'Edema por retenção hídrica'],
      contraindicacoes: ['Hipersensibilidade à sitagliptina', 'Diabetes melito tipo 1 e cetoacidose diabética'],
      precaucoes: [
        'Ajustar a dose pela TFGe (redução em DRC moderada a grave)',
        'Suspender se houver suspeita de pancreatite; cautela em história de pancreatite',
        'Ao associar a SU ou insulina, considerar reduzir a dose destas pelo risco de hipoglicemia',
        'Neutro em desfechos CV (TECOS) — não reduz eventos CV nem hospitalização por IC',
      ],
      interacoes: [
        'Sulfonilureias e insulina — aumento do risco de hipoglicemia',
        'Digoxina — pequeno aumento da concentração (monitorar)',
      ],
      explicacaoFase2:
        'É um inibidor da DPP-4 (gliptina): impede a degradação das incretinas GLP-1 e GIP, que estimulam a insulina e inibem o glucagon apenas quando a glicose está alta.',
      explicacaoFase3:
        'Por ser glicose-dependente, quase não causa hipoglicemia; o alerta característico das gliptinas é a pancreatite aguda (dor abdominal intensa irradiada para o dorso), além de penfigoide bolhoso e artralgia.',
      referencias: [...REF_LIVROS, REF_SBD, REF_ADA, 'Bula Januvia (MSD) — Bulário Anvisa', 'Green JB et al. TECOS. N Engl J Med 2015;373:232-42'],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
    },
    {
      id: 'linagliptina',
      nome: 'Linagliptina',
      sinonimos: ['linagliptin'],
      vinculos: [
        {
          grupoId: 'antidiabeticos',
          classeId: 'idpp4',
          contexto: 'tratamento oral do diabetes melito tipo 2, inclusive na doença renal crônica sem ajuste de dose',
          explicacaoFase1:
            'A linagliptina é uma gliptina usada no DM2; sua vantagem é a eliminação predominantemente biliar, dispensando ajuste de dose na doença renal crônica.',
        },
      ],
      mecanismo:
        'Inibe a DPP-4 e prolonga a ação de GLP-1 e GIP endógenos, aumentando a insulina e reduzindo o glucagon de maneira glicose-dependente. Diferentemente das demais gliptinas, é eliminada sobretudo pela via enterohepática (fezes), com mínima excreção renal.',
      indicacoes: ['Diabetes melito tipo 2 em adultos, em monoterapia ou associação, inclusive em insuficiência renal'],
      tipoMolecula: 'pequena',
      pubchem: ['linagliptin'],
      nomesComerciais: [
        { nome: 'Trayenta', tipo: 'referencia', fabricante: 'Boehringer Ingelheim', verificacao: 'pendente_anvisa' },
        { nome: 'Trayenta Duo', tipo: 'combinacao', composicao: 'linagliptina + metformina', fabricante: 'Boehringer Ingelheim', verificacao: 'pendente_anvisa' },
        { nome: 'Glyxambi', tipo: 'combinacao', composicao: 'empagliflozina + linagliptina', fabricante: 'Boehringer Ingelheim', verificacao: 'pendente_anvisa' },
      ],
      generico: false,
      eaComuns: [
        { termo: 'Nasofaringite', sinonimos: ['resfriado', 'IVAS', 'infecção respiratória alta'] },
        { termo: 'Tosse', sinonimos: ['tosse'] },
      ],
      eaGraves: [
        { termo: 'Penfigoide bolhoso', sinonimos: ['penfigoide', 'bolhas na pele', 'dermatose bolhosa'] },
        PANCREATITE,
        { termo: 'Reações de hipersensibilidade graves', sinonimos: ['angioedema', 'anafilaxia', 'urticária grave'] },
      ],
      eaCaracteristico: 'Penfigoide bolhoso',
      distratoresEA: ['Infecção genital micótica', 'Acidose lática', 'Ganho de peso', 'Edema por retenção hídrica'],
      contraindicacoes: ['Hipersensibilidade à linagliptina', 'Diabetes melito tipo 1 e cetoacidose diabética'],
      precaucoes: [
        'Não requer ajuste renal nem hepático',
        'Suspender se houver bolhas cutâneas (penfigoide) ou suspeita de pancreatite',
        'Neutra em desfechos CV e renais (CARMELINA, CAROLINA) — sem benefício cardiorrenal adicional',
      ],
      interacoes: [
        'Indutores potentes de P-gp/CYP3A4 (rifampicina) — reduzem a eficácia',
        'Sulfonilureias e insulina — risco aditivo de hipoglicemia',
      ],
      explicacaoFase2:
        'Gliptina (inibidor da DPP-4): aumenta a disponibilidade das incretinas, estimulando a insulina e reduzindo o glucagon conforme a glicemia.',
      explicacaoFase3:
        'A modulação imune associada à inibição da DPP-4 (CD26) é implicada no penfigoide bolhoso, reação característica das gliptinas descrita com a linagliptina; pancreatite é outro alerta da classe.',
      referencias: [...REF_LIVROS, REF_SBD, REF_ADA, 'Bula Trayenta (Boehringer Ingelheim) — Bulário Anvisa', 'Rosenstock J et al. CARMELINA. JAMA 2019;321:69-79'],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
    },

    // ---------------- iSGLT2 ----------------
    {
      id: 'empagliflozina',
      nome: 'Empagliflozina',
      sinonimos: ['empagliflozin'],
      vinculos: [
        {
          grupoId: 'antidiabeticos',
          classeId: 'isglt2',
          contexto: 'tratamento do DM2 com proteção cardiovascular e renal; também usada na insuficiência cardíaca e na DRC',
          explicacaoFase1:
            'A empagliflozina reduz a glicemia no DM2 e, sobretudo, reduz morte cardiovascular, hospitalização por insuficiência cardíaca e progressão da doença renal — por isso é prioritária em DCV, IC e DRC.',
        },
      ],
      mecanismo:
        'Inibe seletivamente o SGLT2 no túbulo proximal, responsável por ~90% da reabsorção de glicose filtrada. A glicosúria (~60–80 g/dia) reduz glicemia, peso e PA; a natriurese restaura o feedback tubuloglomerular, reduz a pressão intraglomerular e a pré-carga. A ação independe da insulina, portanto o efeito glicêmico cai quando a TFG é baixa, mas a proteção cardiorrenal persiste.',
      indicacoes: [
        'Diabetes melito tipo 2 — controle glicêmico e redução de morte CV em DCV estabelecida (EMPA-REG OUTCOME)',
        'Insuficiência cardíaca com fração de ejeção reduzida ou preservada, com ou sem diabetes (EMPEROR-Reduced/Preserved)',
        'Doença renal crônica, com ou sem diabetes (EMPA-KIDNEY)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['empagliflozin'],
      nomesComerciais: [
        { nome: 'Jardiance', tipo: 'referencia', fabricante: 'Boehringer Ingelheim', verificacao: 'pendente_anvisa' },
        { nome: 'Glyxambi', tipo: 'combinacao', composicao: 'empagliflozina + linagliptina', fabricante: 'Boehringer Ingelheim', verificacao: 'pendente_anvisa' },
      ],
      generico: false,
      eaComuns: [INFEC_GENITAL, ITU, POLIURIA],
      eaGraves: [CAD_EUGLIC, FOURNIER, { termo: 'Lesão renal aguda por hipovolemia', sinonimos: ['insuficiência renal aguda', 'LRA', 'piora da função renal'] }],
      eaCaracteristico: 'Infecção genital micótica',
      distratoresEA: DIST_SGLT2,
      contraindicacoes: [
        'Diabetes melito tipo 1 (não indicada — risco de cetoacidose)',
        'Diálise',
        'Hipersensibilidade à empagliflozina',
      ],
      precaucoes: [
        'Suspender 3 dias antes de cirurgias programadas e em doença aguda, jejum prolongado ou dieta cetogênica (risco de CAD euglicêmica)',
        'Queda inicial e reversível da TFGe (~3–5 mL/min) é esperada e não indica suspensão',
        'Para controle glicêmico, eficácia reduzida com TFGe < 45; para proteção renal/cardíaca, iniciar com TFGe ≥ 20',
        'Orientar higiene genital e hidratação; cautela em idosos frágeis e uso de diuréticos de alça',
      ],
      interacoes: [
        'Diuréticos (alça, tiazídicos) — efeito aditivo sobre volume e PA',
        'Insulina e sulfonilureias — risco de hipoglicemia (considerar reduzir a dose destes)',
        'Lítio — a natriurese pode reduzir os níveis séricos de lítio',
      ],
      explicacaoFase2:
        'É um inibidor do SGLT2 (gliflozina): bloqueia a reabsorção renal de glicose e sódio, fazendo o excesso de glicose sair na urina, sem depender da insulina.',
      explicacaoFase3:
        'A glicosúria transforma a urina num meio rico em glicose para fungos — por isso a candidíase genital é o efeito adverso típico das gliflozinas. A diurese osmótica explica poliúria e hipovolemia.',
      referencias: [
        ...REF_LIVROS,
        REF_SBD,
        REF_ADA,
        'Bula Jardiance (Boehringer Ingelheim) — Bulário Anvisa',
        'Zinman B et al. EMPA-REG OUTCOME. N Engl J Med 2015;373:2117-28',
        'Packer M et al. EMPEROR-Reduced. N Engl J Med 2020;383:1413-24',
        'EMPA-KIDNEY Collaborative Group. N Engl J Med 2023;388:117-27',
        '2023 ESC Guidelines for the management of cardiovascular disease in patients with diabetes',
      ],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
    },
    {
      id: 'dapagliflozina',
      nome: 'Dapagliflozina',
      sinonimos: ['dapagliflozin', 'propanodiol dapagliflozina'],
      vinculos: [
        {
          grupoId: 'antidiabeticos',
          classeId: 'isglt2',
          contexto: 'tratamento do DM2 com proteção renal e cardíaca; também usada na insuficiência cardíaca e na DRC',
          explicacaoFase1:
            'A dapagliflozina é uma gliflozina usada no DM2 e, independentemente do diabetes, na IC e na DRC; reduz hospitalização por IC e progressão renal. Foi incorporada ao SUS para DM2.',
        },
      ],
      mecanismo:
        'Bloqueia o SGLT2 no túbulo contorcido proximal, causando glicosúria e natriurese. Reduz glicemia, peso e PA, diminui a hiperfiltração glomerular (restabelecendo o feedback tubuloglomerular) e reduz a pré e a pós-carga cardíacas. O efeito independe da insulina e da função β.',
      indicacoes: [
        'Diabetes melito tipo 2 — controle glicêmico e redução de hospitalização por IC (DECLARE-TIMI 58)',
        'Insuficiência cardíaca com fração de ejeção reduzida ou preservada (DAPA-HF, DELIVER)',
        'Doença renal crônica, com ou sem diabetes (DAPA-CKD)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['dapagliflozin'],
      nomesComerciais: [
        { nome: 'Forxiga', tipo: 'referencia', fabricante: 'AstraZeneca', verificacao: 'pendente_anvisa' },
        { nome: 'Xigduo XR', tipo: 'combinacao', composicao: 'dapagliflozina + metformina', fabricante: 'AstraZeneca', verificacao: 'pendente_anvisa' },
      ],
      generico: false,
      eaComuns: [INFEC_GENITAL, ITU, POLIURIA],
      eaGraves: [CAD_EUGLIC, FOURNIER, { termo: 'Lesão renal aguda por hipovolemia', sinonimos: ['insuficiência renal aguda', 'LRA', 'piora da função renal'] }],
      eaCaracteristico: 'Infecção genital micótica',
      distratoresEA: DIST_SGLT2,
      contraindicacoes: [
        'Diabetes melito tipo 1 (indicação retirada na Europa em 2021 — risco de cetoacidose)',
        'Diálise',
        'Hipersensibilidade à dapagliflozina',
      ],
      precaucoes: [
        'Suspender ≥3 dias antes de cirurgias e em doença aguda, jejum ou desidratação (CAD euglicêmica)',
        'Queda inicial e reversível da TFGe é esperada',
        'Proteção renal/cardíaca com início em TFGe ≥ 25 (DAPA-CKD); eficácia glicêmica pequena com TFGe < 45',
        'Orientar higiene genital; atenção a sinais de fasceíte perineal (Fournier)',
      ],
      interacoes: [
        'Diuréticos de alça e tiazídicos — depleção de volume e hipotensão',
        'Insulina e sulfonilureias — risco de hipoglicemia',
        'Lítio — redução dos níveis séricos',
      ],
      explicacaoFase2:
        'É uma gliflozina (inibidor do SGLT2): faz o rim eliminar glicose e sódio na urina, baixando a glicemia sem depender de insulina.',
      explicacaoFase3:
        'A glicose presente na urina favorece o crescimento de Candida na região genital; por isso a infecção genital micótica é o efeito adverso mais característico, seguido de ITU e depleção de volume.',
      referencias: [
        ...REF_LIVROS,
        REF_SBD,
        REF_ADA,
        'Bula Forxiga (AstraZeneca) — Bulário Anvisa',
        'Wiviott SD et al. DECLARE-TIMI 58. N Engl J Med 2019;380:347-57',
        'McMurray JJV et al. DAPA-HF. N Engl J Med 2019;381:1995-2008',
        'Heerspink HJL et al. DAPA-CKD. N Engl J Med 2020;383:1436-46',
        'CONITEC — Relatório de recomendação: dapagliflozina para DM2 (2020)',
      ],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
    },
    {
      id: 'canagliflozina',
      nome: 'Canagliflozina',
      sinonimos: ['canagliflozin'],
      vinculos: [
        {
          grupoId: 'antidiabeticos',
          classeId: 'isglt2',
          contexto: 'tratamento do DM2, com redução de eventos cardiovasculares e da progressão da nefropatia diabética',
          explicacaoFase1:
            'A canagliflozina é uma gliflozina usada no DM2; reduziu eventos CV (CANVAS) e progressão da doença renal diabética com albuminúria (CREDENCE).',
        },
      ],
      mecanismo:
        'Inibe o SGLT2 no túbulo proximal (e fracamente o SGLT1 intestinal), causando glicosúria e natriurese. Reduz glicemia, peso, PA e pressão intraglomerular. É glicuronidada (UGT1A9/2B4), o que explica a interação com indutores de UGT.',
      indicacoes: [
        'Diabetes melito tipo 2 em adultos — controle glicêmico',
        'Redução de risco de eventos CV maiores e de progressão renal em DM2 (CANVAS, CREDENCE — conferir indicação na bula brasileira vigente)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['canagliflozin'],
      nomesComerciais: [
        { nome: 'Invokana', tipo: 'referencia', fabricante: 'Janssen', verificacao: 'pendente_anvisa', obs: 'situação de comercialização atual no Brasil não conferida' },
      ],
      generico: false,
      eaComuns: [INFEC_GENITAL, ITU, POLIURIA],
      eaGraves: [
        {
          termo: 'Amputação de membros inferiores',
          sinonimos: ['amputação', 'amputação de dedos', 'amputação do pé', 'risco de amputação'],
        },
        { termo: 'Fraturas ósseas', sinonimos: ['fratura', 'redução da densidade óssea'] },
        CAD_EUGLIC,
        FOURNIER,
      ],
      eaCaracteristico: 'Amputação de membros inferiores',
      distratoresEA: DIST_SGLT2,
      contraindicacoes: ['Diabetes melito tipo 1', 'Diálise', 'Hipersensibilidade à canagliflozina'],
      precaucoes: [
        'Avaliar risco de amputação (DAOP, úlcera prévia, neuropatia); suspender se surgir úlcera ou infecção no pé — o alerta em tarja da FDA foi retirado em 2020, mas a precaução permanece',
        'Suspender antes de cirurgias e em doença aguda (CAD euglicêmica)',
        'Ajustar dose pela TFGe',
      ],
      interacoes: [
        'Indutores de UGT (rifampicina, fenitoína, ritonavir) — reduzem exposição; considerar dose maior',
        'Digoxina — aumento discreto dos níveis (monitorar)',
        'Diuréticos — depleção de volume',
        'Insulina e sulfonilureias — risco de hipoglicemia',
      ],
      explicacaoFase2:
        'Inibidor do SGLT2: bloqueia a reabsorção de glicose e sódio no rim, aumentando a glicosúria independentemente da insulina.',
      explicacaoFase3:
        'Além dos efeitos de classe ligados à glicosúria (candidíase genital, ITU), o programa CANVAS mostrou aumento de amputações de membros inferiores, sobretudo de dedos — alerta característico da canagliflozina.',
      referencias: [
        ...REF_LIVROS,
        REF_ADA,
        'Neal B et al. CANVAS Program. N Engl J Med 2017;377:644-57',
        'Perkovic V et al. CREDENCE. N Engl J Med 2019;380:2295-306',
        'FDA Drug Safety Communication — remoção do boxed warning de amputação da canagliflozina (2020)',
      ],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
    },

    // ---------------- aGLP-1 ----------------
    {
      id: 'semaglutida',
      nome: 'Semaglutida',
      sinonimos: ['semaglutide', 'semaglutida oral', 'semaglutida injetável'],
      vinculos: [
        {
          grupoId: 'antidiabeticos',
          classeId: 'agonista-glp1',
          contexto: 'tratamento do DM2 com redução de peso e de eventos cardiovasculares (injetável semanal ou oral diária)',
          explicacaoFase1:
            'A semaglutida é um agonista de GLP-1 de alta eficácia no DM2: reduz HbA1c e peso de forma marcante e diminui eventos CV maiores (SUSTAIN-6); é prioritária em DCV aterosclerótica e obesidade.',
        },
      ],
      mecanismo:
        'Análogo de GLP-1 com 94% de homologia, acilado com ácido graxo que se liga à albumina, resistente à DPP-4 — meia-vida de ~1 semana. Estimula a insulina e inibe o glucagon de forma glicose-dependente, retarda o esvaziamento gástrico e atua no hipotálamo e no tronco encefálico aumentando a saciedade. A forma oral usa o promotor de absorção SNAC.',
      indicacoes: [
        'Diabetes melito tipo 2 em adultos — controle glicêmico (injetável semanal; comprimido diário)',
        'Redução de eventos CV maiores em DM2 com DCV estabelecida (SUSTAIN-6; formulação injetável)',
      ],
      offLabel: ['Benefício renal no DM2 com DRC demonstrado no FLOW (2024) — conferir se a indicação consta da bula brasileira vigente'],
      tipoMolecula: 'peptideo',
      pubchem: ['semaglutide'],
      nomesComerciais: [
        { nome: 'Ozempic', tipo: 'referencia', fabricante: 'Novo Nordisk', verificacao: 'pendente_anvisa', grupoId: 'antidiabeticos', obs: 'injetável semanal' },
        { nome: 'Rybelsus', tipo: 'marca', fabricante: 'Novo Nordisk', verificacao: 'pendente_anvisa', grupoId: 'antidiabeticos', obs: 'comprimido oral diário' },
      ],
      generico: false,
      eaComuns: [NAUSEA_GLP1, DIARREIA_GLP1, { termo: 'Redução do apetite e saciedade precoce', sinonimos: ['falta de apetite', 'hiporexia', 'saciedade precoce'] }],
      eaGraves: [
        PANCREATITE,
        COLELITIASE,
        {
          termo: 'Piora de retinopatia diabética',
          sinonimos: ['complicações de retinopatia', 'piora da retinopatia', 'hemorragia vítrea'],
        },
        CA_TIREOIDE,
      ],
      eaCaracteristico: 'Náuseas e vômitos',
      distratoresEA: DIST_GLP1,
      contraindicacoes: [
        'História pessoal ou familiar de carcinoma medular de tireoide ou neoplasia endócrina múltipla tipo 2 (NEM2)',
        'Diabetes melito tipo 1 e cetoacidose (não substitui insulina)',
        'Gestação (suspender ≥2 meses antes de engravidar)',
        'Hipersensibilidade à semaglutida',
      ],
      precaucoes: [
        'Titulação lenta da dose para reduzir efeitos gastrointestinais',
        'Retinopatia diabética preexistente: monitorar, sobretudo com queda rápida da HbA1c',
        'Suspender se suspeita de pancreatite; cautela em gastroparesia grave',
        'Risco de aspiração em anestesia/sedação pelo retardo do esvaziamento gástrico — avaliar jejum ampliado',
        'Rybelsus: tomar em jejum com até 120 mL de água e aguardar 30 min antes de comer ou tomar outros medicamentos',
        'Desde 2025, a Anvisa passou a exigir retenção da receita para agonistas de GLP-1 — conferir a norma vigente',
      ],
      interacoes: [
        'Insulina e sulfonilureias — risco de hipoglicemia (reduzir a dose destes ao iniciar)',
        'Fármacos orais de índice terapêutico estreito (varfarina, levotiroxina) — absorção alterada pelo retardo gástrico; monitorar INR/TSH',
      ],
      explicacaoFase2:
        'É um agonista do receptor de GLP-1: imita a incretina intestinal, aumentando a insulina e reduzindo o glucagon quando a glicose sobe, retardando o esvaziamento do estômago e aumentando a saciedade.',
      explicacaoFase3:
        'A ativação de receptores de GLP-1 no tronco encefálico (área postrema) e o retardo do esvaziamento gástrico explicam náuseas e vômitos, efeitos mais típicos da classe e maiores no início/escalonamento da dose.',
      referencias: [
        ...REF_LIVROS,
        REF_SBD,
        REF_ADA,
        'Bulas Ozempic e Rybelsus (Novo Nordisk) — Bulário Anvisa',
        'Marso SP et al. SUSTAIN-6. N Engl J Med 2016;375:1834-44',
        'Perkovic V et al. FLOW. N Engl J Med 2024;391:109-21',
      ],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: 'Venda sob prescrição; retenção de receita para agonistas de GLP-1 exigida pela Anvisa desde 2025 (conferir norma vigente)',
    },
    {
      id: 'liraglutida',
      nome: 'Liraglutida',
      sinonimos: ['liraglutide'],
      vinculos: [
        {
          grupoId: 'antidiabeticos',
          classeId: 'agonista-glp1',
          contexto: 'tratamento do DM2 com redução de eventos cardiovasculares (injeção subcutânea diária)',
          explicacaoFase1:
            'A liraglutida é um agonista de GLP-1 de aplicação diária usado no DM2; reduziu morte CV e eventos maiores no LEADER e favorece perda de peso.',
        },
      ],
      mecanismo:
        'Análogo de GLP-1 humano (97% de homologia) com cadeia de ácido graxo que promove ligação à albumina e auto-associação, resistindo à DPP-4 — meia-vida de ~13 h, permitindo uma aplicação diária. Aumenta a secreção de insulina e reduz o glucagon de forma glicose-dependente, retarda o esvaziamento gástrico e aumenta a saciedade.',
      indicacoes: [
        'Diabetes melito tipo 2 em adultos e crianças a partir de 10 anos (Victoza, até 1,8 mg/dia)',
        'Redução de eventos CV maiores em DM2 com DCV estabelecida (LEADER)',
      ],
      tipoMolecula: 'peptideo',
      pubchem: ['liraglutide'],
      nomesComerciais: [
        { nome: 'Victoza', tipo: 'referencia', fabricante: 'Novo Nordisk', verificacao: 'pendente_anvisa', grupoId: 'antidiabeticos' },
      ],
      generico: false,
      eaComuns: [NAUSEA_GLP1, DIARREIA_GLP1, { termo: 'Dispepsia', sinonimos: ['má digestão', 'azia'] }],
      eaGraves: [PANCREATITE, COLELITIASE, CA_TIREOIDE, { termo: 'Taquicardia', sinonimos: ['aumento da frequência cardíaca'] }],
      eaCaracteristico: 'Náuseas e vômitos',
      distratoresEA: DIST_GLP1,
      contraindicacoes: [
        'História pessoal ou familiar de carcinoma medular de tireoide ou NEM2',
        'Diabetes melito tipo 1 e cetoacidose',
        'Gestação',
        'Hipersensibilidade à liraglutida',
      ],
      precaucoes: [
        'Titular semanalmente a dose para reduzir náuseas',
        'Suspender se suspeita de pancreatite',
        'Hidratação: vômitos/diarreia podem causar desidratação e lesão renal aguda',
        'Retenção de receita para agonistas de GLP-1 exigida pela Anvisa desde 2025 (conferir norma vigente)',
      ],
      interacoes: [
        'Insulina e sulfonilureias — risco de hipoglicemia',
        'Medicamentos orais dependentes de absorção rápida — retardo da absorção pelo esvaziamento gástrico lento',
      ],
      explicacaoFase2:
        'Agonista do receptor de GLP-1: reproduz a ação da incretina, estimulando a insulina e reduzindo o glucagon apenas com glicemia elevada, e aumenta a saciedade.',
      explicacaoFase3:
        'Os receptores de GLP-1 no centro do vômito e o retardo do esvaziamento gástrico explicam as náuseas e vômitos, efeito mais típico, que costuma diminuir com o tempo.',
      referencias: [
        ...REF_LIVROS,
        REF_SBD,
        REF_ADA,
        'Bula Victoza (Novo Nordisk) — Bulário Anvisa',
        'Marso SP et al. LEADER. N Engl J Med 2016;375:311-22',
      ],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: 'Venda sob prescrição; retenção de receita para agonistas de GLP-1 exigida pela Anvisa desde 2025 (conferir norma vigente)',
    },
    {
      id: 'dulaglutida',
      nome: 'Dulaglutida',
      sinonimos: ['dulaglutide'],
      vinculos: [
        {
          grupoId: 'antidiabeticos',
          classeId: 'agonista-glp1',
          contexto: 'tratamento do DM2 com aplicação subcutânea semanal e benefício cardiovascular',
          explicacaoFase1:
            'A dulaglutida é um agonista de GLP-1 semanal usado no DM2; reduziu eventos CV maiores no REWIND, inclusive em pacientes sem DCV estabelecida.',
        },
      ],
      mecanismo:
        'Proteína de fusão: duas moléculas de análogo de GLP-1 resistentes à DPP-4 ligadas a um fragmento Fc de IgG4 modificado, o que aumenta o tamanho (menor depuração renal) e prolonga a meia-vida para ~5 dias. Ativa o receptor de GLP-1: insulina glicose-dependente, menos glucagon, esvaziamento gástrico mais lento e saciedade.',
      indicacoes: [
        'Diabetes melito tipo 2 em adultos (aplicação semanal)',
        'Redução de eventos CV maiores em DM2 com DCV ou múltiplos fatores de risco (REWIND)',
      ],
      tipoMolecula: 'proteina',
      pubchem: [],
      nomesComerciais: [
        { nome: 'Trulicity', tipo: 'referencia', fabricante: 'Eli Lilly', verificacao: 'pendente_anvisa' },
      ],
      generico: false,
      eaComuns: [NAUSEA_GLP1, DIARREIA_GLP1, { termo: 'Redução do apetite', sinonimos: ['falta de apetite', 'hiporexia'] }],
      eaGraves: [PANCREATITE, COLELITIASE, CA_TIREOIDE],
      eaCaracteristico: 'Náuseas e vômitos',
      distratoresEA: DIST_GLP1,
      contraindicacoes: [
        'História pessoal ou familiar de carcinoma medular de tireoide ou NEM2',
        'Diabetes melito tipo 1 e cetoacidose',
        'Gestação',
      ],
      precaucoes: [
        'Gastroparesia grave e doença inflamatória intestinal grave: não recomendada',
        'Suspender se suspeita de pancreatite',
        'Retenção de receita para agonistas de GLP-1 exigida pela Anvisa desde 2025 (conferir norma vigente)',
      ],
      interacoes: [
        'Insulina e sulfonilureias — risco de hipoglicemia',
        'Fármacos orais de janela terapêutica estreita — absorção alterada pelo esvaziamento gástrico lento',
      ],
      explicacaoFase2:
        'Agonista do receptor de GLP-1 ligado a um fragmento de anticorpo (Fc), o que permite aplicação semanal; estimula insulina e saciedade e reduz glucagon.',
      explicacaoFase3:
        'Como todos os aGLP-1, ativa receptores centrais ligados à náusea e retarda o esvaziamento gástrico — náuseas e vômitos são o efeito adverso característico.',
      referencias: [
        ...REF_LIVROS,
        REF_SBD,
        REF_ADA,
        'Bula Trulicity (Eli Lilly) — Bulário Anvisa',
        'Gerstein HC et al. REWIND. Lancet 2019;394:121-30',
      ],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: 'Venda sob prescrição; retenção de receita para agonistas de GLP-1 exigida pela Anvisa desde 2025 (conferir norma vigente)',
    },

    // ---------------- TIRZEPATIDA ----------------
    {
      id: 'tirzepatida',
      nome: 'Tirzepatida',
      sinonimos: ['tirzepatide'],
      vinculos: [
        {
          grupoId: 'antidiabeticos',
          classeId: 'agonista-gip-glp1',
          contexto: 'tratamento do DM2 com redução muito expressiva de HbA1c e de peso (injeção semanal)',
          explicacaoFase1:
            'A tirzepatida é o primeiro agonista duplo GIP/GLP-1; no DM2 reduz HbA1c e peso mais que a semaglutida 1 mg (SURPASS-2), sendo opção de altíssima eficácia quando a obesidade é prioridade.',
        },
      ],
      mecanismo:
        'Peptídeo de 39 aminoácidos baseado na sequência do GIP, acilado com diácido graxo (ligação à albumina, meia-vida ~5 dias). Ativa o receptor de GIP (com maior afinidade) e o de GLP-1: aumenta a secreção de insulina glicose-dependente, reduz glucagon, melhora a sensibilidade à insulina, retarda o esvaziamento gástrico e reduz o apetite.',
      indicacoes: [
        'Diabetes melito tipo 2 em adultos (aplicação semanal), como adjuvante a dieta e exercício',
      ],
      tipoMolecula: 'peptideo',
      pubchem: ['tirzepatide'],
      nomesComerciais: [
        {
          nome: 'Mounjaro',
          tipo: 'referencia',
          fabricante: 'Eli Lilly',
          verificacao: 'pendente_anvisa',
          obs: 'no Brasil a mesma marca é usada no DM2 (aprovação Anvisa em 2023) e no controle de peso (indicação aprovada em 2025) — conferir bula vigente',
        },
      ],
      generico: false,
      eaComuns: [NAUSEA_GLP1, DIARREIA_GLP1, { termo: 'Redução do apetite', sinonimos: ['falta de apetite', 'hiporexia'] }, { termo: 'Dispepsia', sinonimos: ['má digestão', 'azia'] }],
      eaGraves: [PANCREATITE, COLELITIASE, CA_TIREOIDE],
      eaCaracteristico: 'Náuseas e vômitos',
      distratoresEA: DIST_GLP1,
      contraindicacoes: [
        'História pessoal ou familiar de carcinoma medular de tireoide ou NEM2',
        'Diabetes melito tipo 1 e cetoacidose',
        'Gestação',
        'Hipersensibilidade à tirzepatida',
      ],
      precaucoes: [
        'Escalonamento de 2,5 mg a cada 4 semanas para reduzir efeitos gastrointestinais',
        'Contraceptivos orais: exposição reduzida — usar método não oral ou adicionar barreira por 4 semanas após o início e após cada aumento de dose',
        'Suspender se suspeita de pancreatite; retinopatia diabética preexistente requer monitoramento',
        'Retenção de receita para agonistas incretínicos exigida pela Anvisa desde 2025 (conferir norma vigente)',
      ],
      interacoes: [
        'Contraceptivos hormonais orais — redução da exposição (ver precauções)',
        'Insulina e sulfonilureias — risco de hipoglicemia',
        'Fármacos orais de índice terapêutico estreito — absorção alterada pelo esvaziamento gástrico lento',
      ],
      explicacaoFase2:
        'Pertence a uma classe própria: agonista duplo dos receptores de GIP e GLP-1. Ao ativar as duas incretinas, aumenta a insulina, reduz o glucagon e a fome e retarda o esvaziamento gástrico.',
      explicacaoFase3:
        'O componente GLP-1 (ação central e gástrica) explica náuseas, vômitos e diarreia, os efeitos mais comuns, que predominam no período de escalonamento da dose.',
      referencias: [
        ...REF_LIVROS,
        REF_SBD,
        REF_ADA,
        'Bula Mounjaro (Eli Lilly) — Anvisa/FDA',
        'Frías JP et al. SURPASS-2. N Engl J Med 2021;385:503-15',
      ],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: 'Venda sob prescrição; retenção de receita exigida pela Anvisa desde 2025 (conferir norma vigente)',
    },

    // ---------------- PIOGLITAZONA ----------------
    {
      id: 'pioglitazona',
      nome: 'Pioglitazona',
      sinonimos: ['cloridrato de pioglitazona', 'pioglitazone'],
      vinculos: [
        {
          grupoId: 'antidiabeticos',
          classeId: 'tiazolidinediona',
          contexto: 'tratamento do DM2 com resistência insulínica acentuada, inclusive com esteato-hepatite associada',
          explicacaoFase1:
            'A pioglitazona é um sensibilizador de insulina oral usado no DM2, de baixo risco de hipoglicemia e efeito duradouro; tem benefício na esteato-hepatite metabólica (MASH).',
        },
      ],
      mecanismo:
        'Agonista do receptor nuclear PPAR-γ, expresso principalmente no tecido adiposo. Modula genes que aumentam a captação de glicose (GLUT4), a diferenciação de adipócitos e a adiponectina, redistribuindo gordura do fígado e músculo para o subcutâneo e reduzindo a resistência à insulina. O efeito máximo leva 6–12 semanas.',
      indicacoes: ['Diabetes melito tipo 2 em adultos, em monoterapia ou associada a metformina, sulfonilureia ou insulina'],
      offLabel: ['Esteato-hepatite associada à disfunção metabólica (MASH/NASH) em pacientes com ou sem DM2 — recomendada em diretrizes (ADA 2025), mas off-label em bula'],
      tipoMolecula: 'pequena',
      pubchem: ['pioglitazone'],
      nomesComerciais: [
        { nome: 'Actos', tipo: 'referencia', fabricante: 'Takeda', verificacao: 'pendente_anvisa', obs: 'situação de comercialização atual não conferida' },
      ],
      generico: true,
      eaComuns: [
        {
          termo: 'Edema e retenção hídrica',
          sinonimos: ['edema', 'inchaço', 'retenção de líquidos', 'edema periférico', 'edema de membros inferiores'],
        },
        GANHO_PESO,
      ],
      eaGraves: [
        {
          termo: 'Insuficiência cardíaca (desencadeamento ou piora)',
          sinonimos: ['insuficiência cardíaca', 'IC', 'descompensação cardíaca', 'piora da IC'],
        },
        { termo: 'Fraturas ósseas (principalmente em mulheres)', sinonimos: ['fratura', 'osteoporose', 'fraturas distais'] },
        { termo: 'Câncer de bexiga', sinonimos: ['neoplasia de bexiga', 'tumor de bexiga'] },
        { termo: 'Edema macular', sinonimos: ['edema de mácula'] },
      ],
      eaCaracteristico: 'Edema e retenção hídrica',
      distratoresEA: ['Infecção genital micótica', 'Acidose lática', 'Náuseas e vômitos por retardo do esvaziamento gástrico', 'Hipoglicemia grave em monoterapia'],
      contraindicacoes: [
        'Insuficiência cardíaca sintomática (NYHA III–IV; bulas europeias contraindicam qualquer grau de IC)',
        'Câncer de bexiga ativo ou prévio e hematúria macroscópica não investigada',
        'Hepatopatia ativa ou ALT > 2,5× o limite superior',
        'Diabetes melito tipo 1 e cetoacidose',
      ],
      precaucoes: [
        'Monitorar sinais de IC, edema e ganho de peso rápido, sobretudo associada à insulina',
        'Avaliar risco de fratura em mulheres pós-menopausa',
        'Monitorar enzimas hepáticas',
        'Pode induzir ovulação em mulheres anovulatórias (orientar contracepção)',
      ],
      interacoes: [
        'Insulina — maior risco de edema e IC',
        'Genfibrozila (inibidor do CYP2C8) — aumenta muito a exposição à pioglitazona',
        'Rifampicina (indutor do CYP2C8) — reduz a eficácia',
      ],
      explicacaoFase2:
        'É uma tiazolidinediona (glitazona): ativa o receptor nuclear PPAR-γ e muda a expressão de genes, tornando músculo, fígado e gordura mais sensíveis à insulina.',
      explicacaoFase3:
        'A ativação de PPAR-γ no néfron distal aumenta a reabsorção de sódio e água, e há vasodilatação com aumento da permeabilidade: o resultado é edema e retenção hídrica, que podem precipitar insuficiência cardíaca.',
      referencias: [
        ...REF_LIVROS,
        REF_SBD,
        REF_ADA,
        'Bula Actos (Takeda) — Bulário Anvisa',
        'Dormandy JA et al. PROactive. Lancet 2005;366:1279-89',
        'Kernan WN et al. IRIS. N Engl J Med 2016;374:1321-31',
      ],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
    },

    // ---------------- INSULINAS ----------------
    {
      id: 'insulina-regular',
      nome: 'Insulina regular',
      sinonimos: ['insulina humana regular', 'insulina R', 'insulina simples', 'insulina cristalina', 'regular insulin', 'insulin human regular'],
      vinculos: [
        {
          grupoId: 'antidiabeticos',
          classeId: 'insulina-acao-rapida',
          contexto: 'insulina prandial e de correção no DM1/DM2/DMG e insulina intravenosa nas emergências hiperglicêmicas',
          explicacaoFase1:
            'A insulina regular é usada antes das refeições (30 min) e para correção no DM1, no DM2 e no diabetes gestacional; por via IV é a escolha na cetoacidose e no estado hiperosmolar. É fornecida pelo SUS.',
        },
      ],
      mecanismo:
        'Insulina humana obtida por DNA recombinante. Liga-se ao receptor de insulina (tirosina-quinase), ativando PI3K/Akt: translocação de GLUT4 no músculo e tecido adiposo, síntese de glicogênio, inibição da gliconeogênese, da lipólise e da cetogênese. No subcutâneo forma hexâmeros que precisam dissociar-se em monômeros, o que explica o início em 30–60 min e a duração de 5–8 h.',
      indicacoes: [
        'Diabetes melito tipo 1 (componente prandial/correção do esquema basal-bolus)',
        'Diabetes melito tipo 2 com necessidade de insulina prandial',
        'Diabetes melito gestacional e diabetes pré-gestacional',
        'Cetoacidose diabética e estado hiperglicêmico hiperosmolar (infusão intravenosa)',
      ],
      offLabel: ['Tratamento emergencial da hipercalemia (com glicose IV) — uso consagrado em protocolos, fora do escopo antidiabético'],
      tipoMolecula: 'proteina',
      pubchem: [],
      nomesComerciais: [
        { nome: 'Humulin R', tipo: 'referencia', fabricante: 'Eli Lilly', verificacao: 'pendente_anvisa' },
        { nome: 'Novolin R', tipo: 'marca', fabricante: 'Novo Nordisk', verificacao: 'pendente_anvisa' },
        { nome: 'Humulin 70/30', tipo: 'combinacao', composicao: 'insulina NPH 70% + insulina regular 30%', fabricante: 'Eli Lilly', verificacao: 'pendente_anvisa' },
        { nome: 'Novolin 70/30', tipo: 'combinacao', composicao: 'insulina NPH 70% + insulina regular 30%', fabricante: 'Novo Nordisk', verificacao: 'pendente_anvisa' },
      ],
      generico: false,
      eaComuns: [HIPOGLICEMIA, GANHO_PESO, LIPODISTROFIA, REACAO_LOCAL],
      eaGraves: [
        { termo: 'Hipoglicemia grave com neuroglicopenia', sinonimos: ['coma hipoglicêmico', 'convulsão por hipoglicemia', 'hipoglicemia grave'] },
        HIPOCALEMIA_INS,
      ],
      eaCaracteristico: 'Hipoglicemia',
      distratoresEA: DIST_INSULINA,
      contraindicacoes: ['Hipoglicemia em curso', 'Hipersensibilidade à insulina ou excipientes'],
      precaucoes: [
        'Aplicar 30 minutos antes da refeição (diferente dos análogos ultrarrápidos)',
        'Na infusão IV da cetoacidose, monitorar e repor potássio (insulina desloca K⁺ para dentro da célula)',
        'Rodiziar os locais de aplicação para evitar lipo-hipertrofia (absorção errática)',
        'Ajustar doses em DRC (menor depuração da insulina) e em atividade física',
      ],
      interacoes: [
        INTER_HIPOGLICEMIA,
        INTER_HIPERGLICEMIANTES,
        'Álcool, IECA, sulfonilureias e outros antidiabéticos — potencializam a hipoglicemia',
        'Pioglitazona — maior risco de edema e IC',
      ],
      explicacaoFase2:
        'É insulina humana de ação rápida (curta): substitui a insulina endógena, levando glicose para músculo e gordura e bloqueando a produção hepática de glicose; começa a agir em 30–60 min.',
      explicacaoFase3:
        'Por ser o próprio hormônio, o excesso de dose em relação à ingestão ou ao exercício reduz a glicemia abaixo do normal — a hipoglicemia é o efeito adverso típico de toda insulina.',
      referencias: [...REF_LIVROS, REF_SBD, REF_ADA, 'Bulas Humulin R (Eli Lilly) e Novolin R (Novo Nordisk) — Bulário Anvisa', REF_RENAME],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
    },
    {
      id: 'insulina-nph',
      nome: 'Insulina NPH',
      sinonimos: ['insulina isófana', 'insulina humana NPH', 'insulina N', 'NPH', 'neutral protamine Hagedorn', 'isophane insulin', 'insulina intermediária'],
      vinculos: [
        {
          grupoId: 'antidiabeticos',
          classeId: 'insulina-acao-intermediaria',
          contexto: 'insulina basal no DM1, no DM2 e na gestação, de baixo custo e disponível no SUS',
          explicacaoFase1:
            'A NPH é a insulina basal mais usada no SUS: no DM2 costuma iniciar-se com dose noturna, e no DM1 integra o esquema basal-bolus; é segura e de escolha também na gestação.',
        },
      ],
      mecanismo:
        'Insulina humana cristalizada com protamina e zinco (suspensão isófana), que se dissolve lentamente no tecido subcutâneo. Ativa o receptor de insulina como a regular, mas com início em 2–4 h, pico em 4–10 h e duração de 10–18 h. O pico explica o maior risco de hipoglicemia noturna em comparação aos análogos basais.',
      indicacoes: [
        'Diabetes melito tipo 1 (componente basal)',
        'Diabetes melito tipo 2 com necessidade de insulina basal',
        'Diabetes melito gestacional e pré-gestacional',
      ],
      tipoMolecula: 'proteina',
      pubchem: [],
      nomesComerciais: [
        { nome: 'Humulin N', tipo: 'referencia', fabricante: 'Eli Lilly', verificacao: 'pendente_anvisa' },
        { nome: 'Novolin N', tipo: 'marca', fabricante: 'Novo Nordisk', verificacao: 'pendente_anvisa' },
        { nome: 'Humulin 70/30', tipo: 'combinacao', composicao: 'insulina NPH 70% + insulina regular 30%', fabricante: 'Eli Lilly', verificacao: 'pendente_anvisa' },
      ],
      generico: false,
      eaComuns: [HIPOGLICEMIA, GANHO_PESO, LIPODISTROFIA, REACAO_LOCAL],
      eaGraves: [
        { termo: 'Hipoglicemia noturna grave', sinonimos: ['hipoglicemia noturna', 'hipoglicemia durante o sono', 'coma hipoglicêmico'] },
        HIPOCALEMIA_INS,
      ],
      eaCaracteristico: 'Hipoglicemia noturna grave',
      distratoresEA: DIST_INSULINA,
      contraindicacoes: ['Hipoglicemia em curso', 'Hipersensibilidade à insulina ou à protamina', 'Uso intravenoso (é suspensão)'],
      precaucoes: [
        'Homogeneizar a suspensão (rolar o frasco/caneta) antes da aplicação — aspecto leitoso',
        'Na dose noturna, preferir ao deitar para reduzir hipoglicemia de madrugada',
        'Rodiziar os locais de aplicação',
        'Pode ser misturada na mesma seringa com insulina regular (aspirar primeiro a regular)',
      ],
      interacoes: [INTER_HIPOGLICEMIA, INTER_HIPERGLICEMIANTES, 'Álcool e outros antidiabéticos — potencializam a hipoglicemia'],
      explicacaoFase2:
        'É insulina de ação intermediária: a protamina retarda a absorção, gerando um efeito que começa em poucas horas e dura até cerca de 18 h — por isso faz papel de insulina basal.',
      explicacaoFase3:
        'O pico de ação 4–10 h após a aplicação coincide com a madrugada quando aplicada à noite, o que explica a hipoglicemia noturna, seu efeito adverso mais característico.',
      referencias: [...REF_LIVROS, REF_SBD, REF_ADA, 'Bulas Humulin N (Eli Lilly) e Novolin N (Novo Nordisk) — Bulário Anvisa', REF_RENAME],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
    },
    {
      id: 'insulina-glargina',
      nome: 'Insulina glargina',
      sinonimos: ['glargina', 'insulin glargine', 'glargina U100', 'glargina U300', 'análogo basal'],
      vinculos: [
        {
          grupoId: 'antidiabeticos',
          classeId: 'insulina-acao-longa',
          contexto: 'insulina basal de uma aplicação diária no DM1 e no DM2, com menos hipoglicemia noturna que a NPH',
          explicacaoFase1:
            'A glargina é um análogo basal de aplicação única diária usado no DM1 e no DM2; mantém insulinemia estável por ~24 h, reduzindo hipoglicemias noturnas em relação à NPH.',
        },
      ],
      mecanismo:
        'Análogo de insulina com substituição de asparagina por glicina na posição A21 e duas argininas acrescidas à cadeia B, o que desloca o ponto isoelétrico para pH neutro. Solúvel em pH ácido no frasco, precipita em microcristais no subcutâneo e é liberada lentamente — perfil sem pico pronunciado, duração de ~24 h (U100) e mais prolongada na forma concentrada U300.',
      indicacoes: [
        'Diabetes melito tipo 1 em adultos e crianças (componente basal)',
        'Diabetes melito tipo 2 com necessidade de insulina basal',
      ],
      tipoMolecula: 'proteina',
      pubchem: [],
      nomesComerciais: [
        { nome: 'Lantus', tipo: 'referencia', fabricante: 'Sanofi', verificacao: 'pendente_anvisa' },
        { nome: 'Toujeo', tipo: 'marca', fabricante: 'Sanofi', verificacao: 'pendente_anvisa', obs: 'glargina concentrada 300 U/mL' },
        { nome: 'Basaglar', tipo: 'marca', fabricante: 'Eli Lilly', verificacao: 'pendente_anvisa', obs: 'insulina glargina biossimilar' },
      ],
      generico: false,
      eaComuns: [HIPOGLICEMIA, GANHO_PESO, LIPODISTROFIA, { termo: 'Dor no local da injeção', sinonimos: ['ardência ao aplicar', 'dor local'] }],
      eaGraves: [{ termo: 'Hipoglicemia grave', sinonimos: ['coma hipoglicêmico', 'neuroglicopenia', 'hipoglicemia severa'] }, HIPOCALEMIA_INS],
      eaCaracteristico: 'Hipoglicemia',
      distratoresEA: DIST_INSULINA,
      contraindicacoes: ['Hipoglicemia em curso', 'Hipersensibilidade à insulina glargina', 'Não deve ser misturada ou diluída com outras insulinas nem usada por via IV'],
      precaucoes: [
        'Aplicar no mesmo horário todos os dias',
        'Não é insulina para cetoacidose (usar regular IV)',
        'Na troca U100 ↔ U300 a conversão não é exatamente 1:1 — seguir a bula e monitorar',
        'Na gestação pode ser mantida/usada; NPH e detemir têm a maior base de evidência (SBD)',
      ],
      interacoes: [INTER_HIPOGLICEMIA, INTER_HIPERGLICEMIANTES, 'Álcool e outros antidiabéticos — potencializam a hipoglicemia'],
      explicacaoFase2:
        'É um análogo de insulina de ação longa: forma um depósito de microcristais sob a pele e libera insulina lenta e continuamente por cerca de 24 h, sem pico, imitando a secreção basal.',
      explicacaoFase3:
        'Mesmo sem pico, qualquer excesso de insulina basal em relação à necessidade causa hipoglicemia — efeito típico de toda insulina, embora menos noturno que com a NPH.',
      referencias: [
        ...REF_LIVROS,
        REF_SBD,
        REF_ADA,
        'Bulas Lantus/Toujeo (Sanofi) e Basaglar (Eli Lilly) — Bulário Anvisa',
        'CONITEC — Insulinas análogas de ação prolongada para DM1 (2019)',
      ],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
    },
    {
      id: 'insulina-lispro',
      nome: 'Insulina lispro',
      sinonimos: ['lispro', 'insulin lispro', 'análogo ultrarrápido'],
      vinculos: [
        {
          grupoId: 'antidiabeticos',
          classeId: 'insulina-acao-ultrarrapida',
          contexto: 'insulina prandial (bolus) e de correção no DM1 e no DM2, inclusive em bomba de infusão',
          explicacaoFase1:
            'A lispro é um análogo ultrarrápido aplicado imediatamente antes das refeições para cobrir a glicemia pós-prandial no esquema basal-bolus do DM1 e do DM2; é usada também em bombas de insulina.',
        },
      ],
      mecanismo:
        'Análogo de insulina com inversão das posições B28 (prolina) e B29 (lisina), o que enfraquece a associação em dímeros/hexâmeros. Monômeros são absorvidos rapidamente: início em ~15 min, pico em 1–2 h e duração de 3–5 h, imitando a primeira fase da secreção prandial.',
      indicacoes: [
        'Diabetes melito tipo 1 e tipo 2 — insulina prandial e de correção',
        'Uso em sistemas de infusão contínua subcutânea (bomba de insulina)',
      ],
      tipoMolecula: 'proteina',
      pubchem: [],
      nomesComerciais: [
        { nome: 'Humalog', tipo: 'referencia', fabricante: 'Eli Lilly', verificacao: 'pendente_anvisa' },
        { nome: 'Humalog Mix 25', tipo: 'combinacao', composicao: 'insulina lispro 25% + insulina lispro protamina 75%', fabricante: 'Eli Lilly', verificacao: 'pendente_anvisa' },
      ],
      generico: false,
      eaComuns: [HIPOGLICEMIA, GANHO_PESO, LIPODISTROFIA, REACAO_LOCAL],
      eaGraves: [{ termo: 'Hipoglicemia grave', sinonimos: ['coma hipoglicêmico', 'neuroglicopenia', 'hipoglicemia severa'] }, HIPOCALEMIA_INS],
      eaCaracteristico: 'Hipoglicemia',
      distratoresEA: DIST_INSULINA,
      contraindicacoes: ['Hipoglicemia em curso', 'Hipersensibilidade à insulina lispro'],
      precaucoes: [
        'Aplicar de 0 a 15 minutos antes da refeição — aplicar sem comer em seguida causa hipoglicemia precoce',
        'Na bomba, falha de infusão leva rapidamente à cetoacidose (não há depósito de insulina de longa ação)',
        'Rodiziar locais de aplicação',
      ],
      interacoes: [INTER_HIPOGLICEMIA, INTER_HIPERGLICEMIANTES, 'Álcool e outros antidiabéticos — potencializam a hipoglicemia'],
      explicacaoFase2:
        'É um análogo de insulina de ação ultrarrápida: a troca de dois aminoácidos faz a molécula ficar monomérica e ser absorvida em minutos, cobrindo a glicose da refeição.',
      explicacaoFase3:
        'Como o pico chega em 1–2 h, se a refeição for pequena, atrasada ou omitida após a aplicação, ocorre hipoglicemia — o efeito adverso característico das insulinas.',
      referencias: [...REF_LIVROS, REF_SBD, REF_ADA, 'Bula Humalog (Eli Lilly) — Bulário Anvisa', 'CONITEC — Insulinas análogas de ação rápida para DM1 (2017)'],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
    },
    {
      id: 'insulina-asparte',
      nome: 'Insulina asparte',
      sinonimos: ['asparte', 'aspart', 'insulin aspart', 'fast-acting insulin aspart'],
      vinculos: [
        {
          grupoId: 'antidiabeticos',
          classeId: 'insulina-acao-ultrarrapida',
          contexto: 'insulina prandial (bolus) e de correção no DM1, DM2 e gestação, inclusive em bomba de infusão',
          explicacaoFase1:
            'A asparte é um análogo ultrarrápido usado antes das refeições no esquema basal-bolus do DM1 e do DM2; tem bons dados de segurança na gestação.',
        },
      ],
      mecanismo:
        'Análogo de insulina em que a prolina B28 foi substituída por ácido aspártico, gerando repulsão de cargas que reduz a formação de hexâmeros. A absorção é rápida (início em 10–15 min, pico em 1–2 h, duração de 3–5 h); a formulação com niacinamida (Fiasp) é absorvida ainda mais cedo.',
      indicacoes: [
        'Diabetes melito tipo 1 e tipo 2 — insulina prandial e de correção',
        'Diabetes na gestação (pré-gestacional e gestacional) quando indicada insulina prandial',
        'Uso em sistemas de infusão contínua subcutânea',
      ],
      tipoMolecula: 'proteina',
      pubchem: [],
      nomesComerciais: [
        { nome: 'NovoRapid', tipo: 'referencia', fabricante: 'Novo Nordisk', verificacao: 'pendente_anvisa' },
        { nome: 'Fiasp', tipo: 'marca', fabricante: 'Novo Nordisk', verificacao: 'pendente_anvisa', obs: 'asparte com niacinamida — início mais rápido' },
        { nome: 'NovoMix 30', tipo: 'combinacao', composicao: 'insulina asparte 30% + insulina asparte protamina 70%', fabricante: 'Novo Nordisk', verificacao: 'pendente_anvisa' },
      ],
      generico: false,
      eaComuns: [HIPOGLICEMIA, GANHO_PESO, LIPODISTROFIA, REACAO_LOCAL],
      eaGraves: [{ termo: 'Hipoglicemia grave', sinonimos: ['coma hipoglicêmico', 'neuroglicopenia', 'hipoglicemia severa'] }, HIPOCALEMIA_INS],
      eaCaracteristico: 'Hipoglicemia',
      distratoresEA: DIST_INSULINA,
      contraindicacoes: ['Hipoglicemia em curso', 'Hipersensibilidade à insulina asparte'],
      precaucoes: [
        'Aplicar imediatamente antes (0–10 min) da refeição; Fiasp pode ser aplicada até 20 min após o início da refeição',
        'Em bomba, falha de infusão leva rapidamente à cetoacidose',
        'Rodiziar locais de aplicação',
      ],
      interacoes: [INTER_HIPOGLICEMIA, INTER_HIPERGLICEMIANTES, 'Álcool e outros antidiabéticos — potencializam a hipoglicemia'],
      explicacaoFase2:
        'Análogo de insulina ultrarrápido: a troca de um aminoácido impede a agregação em hexâmeros e acelera a absorção, permitindo aplicar logo antes de comer.',
      explicacaoFase3:
        'O efeito rápido e intenso, se não acompanhado de ingestão de carboidratos proporcional, reduz demais a glicemia — hipoglicemia é o efeito adverso característico.',
      referencias: [...REF_LIVROS, REF_SBD, REF_ADA, 'Bulas NovoRapid e Fiasp (Novo Nordisk) — Bulário Anvisa'],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
    },

    // ---------------- OBESIDADE ----------------
    {
      id: 'orlistate',
      nome: 'Orlistate',
      sinonimos: ['orlistat', 'tetra-hidrolipstatina', 'tetrahidrolipstatina'],
      vinculos: [
        {
          grupoId: 'obesidade',
          classeId: 'inibidor-lipases',
          contexto: 'tratamento da obesidade por redução da absorção intestinal de gordura',
          explicacaoFase1:
            'O orlistate é usado no tratamento da obesidade (IMC ≥ 30 ou ≥ 27 com comorbidades) associado a dieta hipocalórica; atua só no intestino, sem efeito central, e reduziu a incidência de DM2 no estudo XENDOS.',
        },
      ],
      mecanismo:
        'Derivado hidrogenado da lipstatina que se liga covalentemente ao sítio ativo (serina) das lipases gástrica e pancreática no lúmen intestinal. Sem hidrólise, os triglicerídeos da dieta não são absorvidos e cerca de 30% da gordura ingerida é eliminada nas fezes. A absorção sistêmica é mínima.',
      indicacoes: [
        'Obesidade (IMC ≥ 30 kg/m²) ou sobrepeso (IMC ≥ 27 kg/m²) com comorbidades, associado a dieta levemente hipocalórica',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['orlistat'],
      nomesComerciais: [
        { nome: 'Xenical', tipo: 'referencia', verificacao: 'pendente_anvisa', obs: 'referência originalmente da Roche; detentor atual do registro não conferido' },
      ],
      generico: true,
      eaComuns: [
        {
          termo: 'Esteatorreia e evacuação oleosa',
          sinonimos: ['esteatorreia', 'fezes gordurosas', 'fezes oleosas', 'manchas de óleo', 'evacuação oleosa', 'diarreia gordurosa'],
        },
        {
          termo: 'Urgência fecal e flatulência com descarga',
          sinonimos: ['urgência para evacuar', 'flatulência', 'incontinência fecal', 'gases com escape oleoso'],
        },
        { termo: 'Dor e desconforto abdominal', sinonimos: ['dor abdominal', 'cólica'] },
      ],
      eaGraves: [
        {
          termo: 'Deficiência de vitaminas lipossolúveis (A, D, E, K)',
          sinonimos: ['deficiência de vitamina D', 'deficiência de vitamina K', 'má absorção de vitaminas', 'hipovitaminose'],
        },
        { termo: 'Lesão hepática grave (rara)', sinonimos: ['hepatotoxicidade', 'hepatite', 'insuficiência hepática'] },
        { termo: 'Nefropatia por oxalato e litíase renal', sinonimos: ['cálculo renal', 'hiperoxalúria', 'nefrolitíase'] },
      ],
      eaCaracteristico: 'Esteatorreia e evacuação oleosa',
      distratoresEA: ['Aumento da pressão arterial e taquicardia', 'Boca seca e insônia', 'Convulsões', 'Náuseas e vômitos por retardo do esvaziamento gástrico'],
      contraindicacoes: [
        'Síndrome de má absorção crônica',
        'Colestase',
        'Gestação e lactação',
        'Hipersensibilidade ao orlistate',
      ],
      precaucoes: [
        'Tomar 120 mg junto a cada refeição principal com gordura (até 3×/dia); omitir se a refeição não contiver gordura',
        'Suplementar multivitamínico com vitaminas lipossolúveis ao deitar (≥2 h de distância da dose)',
        'Os efeitos gastrointestinais pioram com dietas ricas em gordura — funcionam como "reforço" comportamental',
        'Histórico de hiperoxalúria ou litíase por oxalato',
      ],
      interacoes: [
        'Ciclosporina — redução da absorção (separar ≥3 h e monitorar níveis)',
        'Levotiroxina — redução da absorção, risco de hipotireoidismo (separar ≥4 h)',
        'Varfarina — menor absorção de vitamina K, alteração do INR',
        'Antiepilépticos e antirretrovirais — relatos de perda de eficácia (redução da absorção)',
        'Amiodarona — redução da absorção',
      ],
      explicacaoFase2:
        'É um inibidor das lipases gastrointestinais: bloqueia as enzimas que digerem a gordura da dieta, que então é eliminada nas fezes em vez de absorvida.',
      explicacaoFase3:
        'A gordura não digerida chega ao cólon e sai nas fezes: por isso o efeito típico é a esteatorreia, com fezes oleosas, manchas de óleo e urgência fecal.',
      referencias: [
        ...REF_LIVROS,
        REF_ABESO,
        REF_ADA_OB,
        'Bula Xenical — Bulário Anvisa; EMA SmPC Xenical',
        'Torgerson JS et al. XENDOS. Diabetes Care 2004;27:155-61',
      ],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
    },
    {
      id: 'sibutramina',
      nome: 'Sibutramina',
      sinonimos: ['cloridrato de sibutramina', 'sibutramine', 'sibutramina monoidratada'],
      vinculos: [
        {
          grupoId: 'obesidade',
          classeId: 'irsn-acao-central-obesidade',
          contexto: 'tratamento da obesidade em pacientes sem doença cardiovascular, sob controle especial',
          explicacaoFase1:
            'A sibutramina é um sacietógeno de ação central ainda comercializado no Brasil para obesidade (IMC ≥ 30), sob receita B2; foi retirada dos EUA e da Europa em 2010 após o estudo SCOUT mostrar aumento de eventos cardiovasculares.',
        },
      ],
      mecanismo:
        'Seus metabólitos ativos (aminas primária e secundária) inibem a recaptação de serotonina e noradrenalina (e fracamente de dopamina) nos neurônios hipotalâmicos. O aumento desses neurotransmissores na fenda sináptica antecipa e prolonga a saciedade, reduzindo a ingestão alimentar, e há discreto aumento do gasto energético. Não libera monoaminas como as anfetaminas.',
      indicacoes: [
        'Obesidade (IMC ≥ 30 kg/m²) como adjuvante de dieta e atividade física, conforme restrições da regulamentação brasileira',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['sibutramine'],
      nomesComerciais: [
        { nome: 'Reductil', tipo: 'referencia', fabricante: 'Abbott', verificacao: 'pendente_anvisa', obs: 'referência retirada do mercado (Abbott, 2010) — comercialização descontinuada; controle especial B2' },
        { nome: 'Plenty', tipo: 'marca', verificacao: 'pendente_anvisa', obs: 'controle especial (Lista B2, Portaria 344/98)' },
      ],
      generico: true,
      eaComuns: [
        { termo: 'Boca seca', sinonimos: ['xerostomia', 'secura na boca'] },
        { termo: 'Insônia', sinonimos: ['dificuldade para dormir', 'falta de sono'] },
        { termo: 'Constipação intestinal', sinonimos: ['prisão de ventre', 'intestino preso', 'constipação'] },
        { termo: 'Cefaleia', sinonimos: ['dor de cabeça'] },
        {
          termo: 'Aumento da pressão arterial e da frequência cardíaca',
          sinonimos: ['hipertensão', 'aumento da pressão', 'taquicardia', 'palpitações', 'aumento da frequência cardíaca'],
        },
      ],
      eaGraves: [
        {
          termo: 'Infarto do miocárdio e AVC não fatais em pacientes com doença cardiovascular',
          sinonimos: ['infarto', 'AVC', 'evento cardiovascular', 'risco cardiovascular', 'derrame'],
        },
        { termo: 'Síndrome serotoninérgica', sinonimos: ['toxicidade serotoninérgica', 'excesso de serotonina'] },
        { termo: 'Arritmias e prolongamento do QT', sinonimos: ['arritmia', 'QT longo'] },
      ],
      eaCaracteristico: 'Aumento da pressão arterial e da frequência cardíaca',
      distratoresEA: ['Esteatorreia e evacuação oleosa', 'Infecção genital micótica', 'Hipoglicemia', 'Acidose lática'],
      contraindicacoes: [
        'Doença cardiovascular estabelecida: doença arterial coronariana, AVC/AIT, insuficiência cardíaca, arritmias, doença arterial periférica',
        'Hipertensão arterial não controlada',
        'DM2 com pelo menos outro fator de risco cardiovascular (restrição das bulas brasileiras pós-2011 — conferir bula vigente)',
        'IMC < 30 kg/m² e idade > 65 anos (restrições regulatórias brasileiras)',
        'Uso de IMAO (últimas 2 semanas) e de outros fármacos de ação central para perda de peso',
        'Transtornos alimentares (anorexia, bulimia), transtornos psiquiátricos graves, glaucoma de ângulo fechado, feocromocitoma, hipertireoidismo',
      ],
      precaucoes: [
        'Medir PA e FC antes e periodicamente; suspender se elevação sustentada',
        'Suspender se perda < 2 kg nas primeiras 4 semanas (bula) ou ausência de resposta',
        'Dose máxima de 15 mg/dia; exige Notificação de Receita B2 e Termo de Responsabilidade do Prescritor (RDC 52/2011 e RDC 50/2014)',
        'Risco de abuso e dependência é baixo, mas a substância é controlada',
      ],
      interacoes: [
        'IMAO — crise hipertensiva/síndrome serotoninérgica (contraindicado)',
        'ISRS, IRSN, triptanos, tramadol, lítio, linezolida — risco de síndrome serotoninérgica',
        'Inibidores do CYP3A4 (cetoconazol, eritromicina, claritromicina) — aumentam os níveis dos metabólitos ativos',
        'Simpaticomiméticos e descongestionantes — somam aumento de PA e FC',
      ],
      explicacaoFase2:
        'É um inibidor da recaptação de serotonina e noradrenalina de ação central: aumenta esses neurotransmissores no hipotálamo, o que antecipa a saciedade e reduz o quanto se come.',
      explicacaoFase3:
        'A noradrenalina extra também atua no sistema simpático periférico, elevando a pressão arterial e a frequência cardíaca — mecanismo do aumento de eventos CV não fatais observado no SCOUT em pacientes com doença cardiovascular.',
      referencias: [
        ...REF_LIVROS,
        REF_ABESO,
        REF_344,
        'Anvisa — RDC nº 52/2011 e RDC nº 50/2014 (controle de anorexígenos e sibutramina)',
        'James WPT et al. SCOUT. N Engl J Med 2010;363:905-17',
        'EMA — suspensão das autorizações de sibutramina (2010); FDA — retirada voluntária de Meridia (2010)',
      ],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: 'Lista B2 (psicotrópicos anorexígenos) — Notificação de Receita B2 + Termo de Responsabilidade do Prescritor (Portaria SVS/MS 344/98; RDC 52/2011; RDC 50/2014)',
    },
    {
      id: 'naltrexona-bupropiona',
      nome: 'Naltrexona + bupropiona',
      sinonimos: ['naltrexona/bupropiona', 'naltrexona e bupropiona', 'naltrexone bupropion', 'naltrexone-bupropion', 'NB'],
      vinculos: [
        {
          grupoId: 'obesidade',
          classeId: 'antagonista-opioide-bupropiona',
          contexto: 'tratamento da obesidade com ação central sobre apetite e compulsão alimentar (associação em dose fixa)',
          explicacaoFase1:
            'A associação naltrexona + bupropiona é aprovada no exterior (EUA/UE) para obesidade ou sobrepeso com comorbidades; atua no controle do apetite e no sistema de recompensa, sendo útil quando há componente de "fissura" alimentar.',
        },
      ],
      mecanismo:
        'A bupropiona, inibidor da recaptação de dopamina e noradrenalina, estimula neurônios POMC do núcleo arqueado do hipotálamo, que liberam α-MSH (ativação do receptor MC4R → saciedade) e β-endorfina. A β-endorfina, via receptor μ-opioide, inibe o próprio neurônio POMC (alça de autoinibição); a naltrexona bloqueia essa alça e sustenta a ativação POMC. A dupla também modula o circuito mesolímbico de recompensa alimentar.',
      indicacoes: [
        'Obesidade (IMC ≥ 30 kg/m²) ou sobrepeso (IMC ≥ 27 kg/m²) com comorbidade, associada a dieta e atividade física (FDA/EMA)',
      ],
      tipoMolecula: 'associacao',
      pubchem: ['naltrexone', 'bupropion'],
      nomesComerciais: [],
      generico: false,
      eaComuns: [
        NAUSEA_GLP1,
        { termo: 'Constipação', sinonimos: ['prisão de ventre', 'intestino preso'] },
        { termo: 'Cefaleia', sinonimos: ['dor de cabeça'] },
        { termo: 'Insônia', sinonimos: ['dificuldade para dormir'] },
        { termo: 'Boca seca', sinonimos: ['xerostomia'] },
        { termo: 'Tontura', sinonimos: ['vertigem', 'tonteira'] },
      ],
      eaGraves: [
        {
          termo: 'Convulsões',
          sinonimos: ['convulsão', 'crise convulsiva', 'redução do limiar convulsivo', 'crise epiléptica'],
        },
        {
          termo: 'Ideação suicida e alterações neuropsiquiátricas',
          sinonimos: ['pensamentos suicidas', 'suicídio', 'alteração de humor', 'agitação'],
        },
        { termo: 'Elevação da pressão arterial', sinonimos: ['hipertensão', 'aumento da pressão'] },
        { termo: 'Hepatotoxicidade', sinonimos: ['lesão hepática', 'hepatite'] },
      ],
      eaCaracteristico: 'Convulsões',
      distratoresEA: ['Esteatorreia e evacuação oleosa', 'Infecção genital micótica', 'Acidose lática', 'Edema por retenção hídrica'],
      contraindicacoes: [
        'Epilepsia ou história de convulsões; transtornos alimentares (bulimia, anorexia)',
        'Hipertensão arterial não controlada',
        'Uso crônico de opioides ou agonistas opioides, e abstinência aguda de opioides',
        'Retirada abrupta de álcool, benzodiazepínicos, barbitúricos ou antiepilépticos',
        'Uso de IMAO nos últimos 14 dias e de outros produtos contendo bupropiona',
        'Insuficiência hepática grave e DRC terminal; gestação',
      ],
      precaucoes: [
        'Situação regulatória no Brasil não confirmada nesta revisão: não foi identificada com segurança marca registrada/comercializada no país (no exterior: Contrave nos EUA e Mysimba na UE) — por isso nomesComerciais está vazio até verificação por docente',
        'O componente bupropiona é substância de controle especial no Brasil (Lista C1, Portaria 344/98) — conferir enquadramento de eventual produto registrado',
        'Titulação em 4 semanas até 32 mg/360 mg/dia; reavaliar após 12 semanas na dose de manutenção e suspender se perda < 5% do peso',
        'Alerta de suicidalidade (bupropiona): monitorar humor, sobretudo em jovens',
        'Opioides são ineficazes durante o uso (bloqueio μ); suspender antes de procedimentos com necessidade de analgesia opioide',
      ],
      interacoes: [
        'Opioides — bloqueio do efeito analgésico; tentativa de superar o bloqueio com doses altas pode causar intoxicação',
        'IMAO — risco de crise hipertensiva (contraindicado)',
        'Substratos do CYP2D6 (metoprolol, antidepressivos tricíclicos, antipsicóticos, tamoxifeno) — a bupropiona inibe o CYP2D6',
        'Fármacos que reduzem o limiar convulsivo (antipsicóticos, tramadol, teofilina, corticoides sistêmicos)',
        'Inibidores/indutores do CYP2B6 (ticlopidina, clopidogrel / carbamazepina, efavirenz) — alteram os níveis de bupropiona',
      ],
      explicacaoFase2:
        'Associa um antagonista opioide (naltrexona) a um inibidor da recaptação de dopamina e noradrenalina (bupropiona): juntos mantêm ativos os neurônios hipotalâmicos da saciedade e reduzem a busca compulsiva por comida.',
      explicacaoFase3:
        'A bupropiona reduz o limiar convulsivo de forma dose-dependente; por isso convulsão é o efeito grave característico e epilepsia/transtornos alimentares são contraindicações. Náuseas são o efeito comum mais frequente.',
      referencias: [
        ...REF_LIVROS,
        REF_ADA_OB,
        'FDA Prescribing Information — Contrave (naltrexone HCl/bupropion HCl extended-release)',
        'EMA — SmPC Mysimba',
        'Apovian CM et al. COR-II. Obesity 2013;21:935-43',
        REF_344,
      ],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: 'Componente bupropiona: Lista C1 — Receita de Controle Especial em duas vias (Portaria SVS/MS 344/98); situação de registro da associação no Brasil a confirmar',
    },
  ],

  // ===================================================================
  // VÍNCULOS EXTRAS — aGLP-1 e tirzepatida no grupo obesidade
  // ===================================================================
  vinculosExtras: [
    {
      medicamentoId: 'liraglutida',
      vinculo: {
        grupoId: 'obesidade',
        classeId: 'agonista-glp1-obesidade',
        contexto: 'tratamento da obesidade em adultos e adolescentes com liraglutida 3,0 mg/dia',
        explicacaoFase1:
          'Na dose de 3,0 mg/dia, a liraglutida é aprovada para controle crônico de peso em adultos com IMC ≥ 30 (ou ≥ 27 com comorbidade) e em adolescentes a partir de 12 anos, promovendo perda média de ~5–8% do peso (programa SCALE).',
      },
      nomesComerciais: [
        { nome: 'Saxenda', tipo: 'referencia', fabricante: 'Novo Nordisk', verificacao: 'pendente_anvisa', grupoId: 'obesidade', obs: 'liraglutida 3,0 mg — controle de peso; retenção de receita exigida pela Anvisa desde 2025 (conferir norma)' },
      ],
      indicacoes: [
        'Controle crônico de peso: obesidade (IMC ≥ 30 kg/m²) ou sobrepeso (IMC ≥ 27 kg/m²) com comorbidade, em adultos',
        'Obesidade em adolescentes de 12 a 17 anos (conforme bula)',
      ],
    },
    {
      medicamentoId: 'semaglutida',
      vinculo: {
        grupoId: 'obesidade',
        classeId: 'agonista-glp1-obesidade',
        contexto: 'tratamento da obesidade com semaglutida 2,4 mg semanal',
        explicacaoFase1:
          'Na dose de 2,4 mg/semana, a semaglutida é aprovada para controle crônico de peso, com perda média de ~15% no STEP-1; no SELECT reduziu eventos CV maiores em pessoas com obesidade e DCV sem diabetes.',
      },
      nomesComerciais: [
        { nome: 'Wegovy', tipo: 'referencia', fabricante: 'Novo Nordisk', verificacao: 'pendente_anvisa', grupoId: 'obesidade', obs: 'semaglutida 2,4 mg — controle de peso; retenção de receita exigida pela Anvisa desde 2025 (conferir norma)' },
      ],
      indicacoes: [
        'Controle crônico de peso: obesidade (IMC ≥ 30 kg/m²) ou sobrepeso (IMC ≥ 27 kg/m²) com comorbidade, em adultos e adolescentes a partir de 12 anos',
        'Redução de eventos CV maiores em adultos com DCV estabelecida e obesidade/sobrepeso (SELECT) — conferir se consta da bula brasileira vigente',
      ],
    },
    {
      medicamentoId: 'tirzepatida',
      vinculo: {
        grupoId: 'obesidade',
        classeId: 'agonista-gip-glp1-obesidade',
        contexto: 'tratamento da obesidade com o agonista duplo GIP/GLP-1 de aplicação semanal',
        explicacaoFase1:
          'A tirzepatida produz as maiores perdas de peso entre os antiobesidade atuais (~20% na dose de 15 mg no SURMOUNT-1); no Brasil a indicação de controle de peso foi aprovada em 2025 sob a mesma marca usada no DM2.',
      },
      nomesComerciais: [],
      indicacoes: [
        'Controle crônico de peso: obesidade (IMC ≥ 30 kg/m²) ou sobrepeso (IMC ≥ 27 kg/m²) com comorbidade, em adultos (indicação aprovada no Brasil em 2025 — conferir bula vigente)',
      ],
    },
  ],

  // ===================================================================
  // RESUMOS
  // ===================================================================
  resumos: [
    // ---------------- ANTIDIABÉTICOS ----------------
    {
      grupoId: 'antidiabeticos',
      visaoGeral: [
        'Diabetes melito (DM) é um grupo de doenças caracterizadas por hiperglicemia crônica. No DM tipo 1 (DM1) há destruição autoimune das células β e deficiência absoluta de insulina: a insulinoterapia é obrigatória desde o diagnóstico e antidiabéticos orais não a substituem. No DM tipo 2 (DM2), mais de 90% dos casos, coexistem resistência à insulina (músculo, fígado, tecido adiposo) e falência progressiva da célula β, com contribuição de redução do efeito incretínico, aumento do glucagon e maior reabsorção renal de glicose. O diabetes melito gestacional (DMG) é a hiperglicemia diagnosticada na gestação sem critérios de diabetes prévio; a primeira medida é nutricional e, quando o controle não é atingido, a insulina é o fármaco de escolha.',
        'Os antidiabéticos não insulínicos atuam em alvos distintos do "octeto ominoso" do DM2: a metformina reduz a produção hepática de glicose; sulfonilureias e glinidas aumentam a secreção de insulina (risco de hipoglicemia); as terapias incretínicas (iDPP-4, agonistas de GLP-1 e o agonista duplo GIP/GLP-1) aumentam a insulina e reduzem o glucagon de forma glicose-dependente; os iSGLT2 eliminam glicose pela urina; as tiazolidinedionas aumentam a sensibilidade à insulina; e os inibidores da α-glicosidase retardam a absorção de carboidratos.',
        'A escolha deixou de ser apenas "glicocêntrica". Desde os grandes estudos de desfecho cardiovascular (EMPA-REG, LEADER, SUSTAIN-6, DECLARE, CANVAS, REWIND) e renal (CREDENCE, DAPA-CKD, EMPA-KIDNEY, FLOW), a SBD 2024/2025 e a ADA 2025 recomendam escolher o fármaco pelo perfil do paciente: em DCV aterosclerótica, aGLP-1 ou iSGLT2 com benefício comprovado; em insuficiência cardíaca, iSGLT2; em DRC, iSGLT2 (e aGLP-1 como adicional); na obesidade, aGLP-1 de alta eficácia ou tirzepatida — independentemente da HbA1c e do uso de metformina.',
        'As insulinas são classificadas pelo perfil de ação: ultrarrápidas (lispro, asparte, glulisina), rápida/regular, intermediária (NPH) e análogos de ação longa (glargina, detemir, degludeca). O esquema basal-bolus (basal + prandial) é o padrão no DM1; no DM2, a insulina é iniciada quando a HbA1c permanece acima da meta apesar de terapia combinada, ou de imediato em hiperglicemia grave sintomática/catabolismo. O SUS fornece NPH e regular e, por protocolos, análogos para DM1.',
      ],
      mecanismos: [
        {
          titulo: 'Biguanidas (metformina)',
          texto:
            'A metformina reduz a gliconeogênese hepática ao inibir o complexo I mitocondrial e alterar a relação AMP/ATP, com ativação da AMPK e inibição da sinalização do glucagon. Aumenta a captação periférica de glicose e tem ações intestinais (maior secreção de GLP-1, alteração da microbiota). Como não estimula a secreção de insulina, não causa hipoglicemia em monoterapia e não aumenta o peso. É eliminada inalterada pelos rins, daí a restrição em TFGe < 30 e a relação com acidose lática quando acumulada.',
        },
        {
          titulo: 'Secretagogos: sulfonilureias e glinidas',
          texto:
            'Ligam-se ao SUR1 do canal K-ATP da célula β. Normalmente o ATP gerado pelo metabolismo da glicose fecha esse canal; os secretagogos "pulam" essa etapa, despolarizam a célula, abrem canais de Ca²⁺ tipo L e disparam a exocitose de insulina mesmo com glicemia baixa — por isso causam hipoglicemia e ganho de peso. Exigem célula β funcionante e perdem eficácia com a progressão do DM2. Glibenclamida tem metabólitos ativos e maior risco; gliclazida e glimepirida são preferidas. Glinidas têm início rápido e curta duração (uso prandial).',
        },
        {
          titulo: 'Incretinas: iDPP-4, agonistas de GLP-1 e agonista duplo GIP/GLP-1',
          texto:
            'GLP-1 e GIP são liberados pelo intestino após a refeição e amplificam a secreção de insulina glicose-dependente (efeito incretínico, reduzido no DM2); o GLP-1 também suprime o glucagon, retarda o esvaziamento gástrico e induz saciedade. Ambos são degradados pela DPP-4 em minutos. Os iDPP-4 elevam modestamente as incretinas endógenas (HbA1c −0,5 a −0,8%, peso neutro, sem benefício CV). Os aGLP-1 resistem à DPP-4 e produzem níveis farmacológicos (HbA1c −1 a −1,8%, perda de peso, alguns com redução de eventos CV). A tirzepatida ativa GIP e GLP-1 e alcança a maior redução de HbA1c e peso.',
        },
        {
          titulo: 'Inibidores do SGLT2 (gliflozinas)',
          texto:
            'O SGLT2 do túbulo proximal reabsorve ~90% da glicose filtrada junto com sódio. Seu bloqueio produz glicosúria (perda de ~240–320 kcal/dia), natriurese e diurese osmótica. Os efeitos glicêmicos dependem da carga filtrada (menores com TFG baixa), mas os efeitos cardiorrenais persistem: restauração do feedback tubuloglomerular com vasoconstrição da arteríola aferente e queda da pressão intraglomerular, redução de pré e pós-carga, menor ativação simpática e mudança do substrato energético miocárdico. A geração de corpos cetônicos explica o risco de cetoacidose euglicêmica.',
        },
        {
          titulo: 'Tiazolidinedionas (pioglitazona)',
          texto:
            'Agonistas do PPAR-γ, receptor nuclear que, heterodimerizado com o RXR, regula genes da diferenciação adipocitária e do metabolismo de glicose e lipídios. Aumentam a captação de ácidos graxos pelo tecido adiposo subcutâneo, reduzindo a lipotoxicidade no fígado e no músculo, e elevam a adiponectina, melhorando a sensibilidade à insulina. O efeito é lento (semanas) e durável. A retenção renal de sódio (PPAR-γ no ducto coletor) explica edema e risco de IC.',
        },
        {
          titulo: 'Insulinas e análogos',
          texto:
            'Todas ativam o receptor de insulina (tirosina-quinase) → IRS → PI3K/Akt: translocação do GLUT4, glicogênese, lipogênese e síntese proteica, com inibição da gliconeogênese, glicogenólise, lipólise e cetogênese. As diferenças são farmacocinéticas: a insulina humana regular forma hexâmeros e demora a ser absorvida; os análogos ultrarrápidos (lispro B28/B29 invertidas; asparte B28 Asp) ficam monoméricos; a NPH depende da dissolução do complexo com protamina; a glargina precipita em pH neutro no subcutâneo, liberando insulina sem pico por ~24 h.',
        },
      ],
      fluxogramas: [
        {
          titulo: 'Secreção de insulina na célula β e alvos dos fármacos',
          passos: [
            'Glicose entra na célula β (GLUT2) → glicólise e metabolismo mitocondrial → ↑ ATP/ADP',
            '↑ ATP fecha o canal K-ATP (SUR1/Kir6.2) ← sulfonilureias e glinidas fecham diretamente',
            'Despolarização da membrana → abertura de canais de Ca²⁺ tipo L → influxo de Ca²⁺',
            'Exocitose dos grânulos de insulina',
            'GLP-1/GIP (receptores acoplados a Gs → ↑ AMPc) amplificam a exocitose apenas com glicose alta ← aGLP-1, tirzepatida e iDPP-4 (↑ incretina endógena)',
          ],
        },
        {
          titulo: 'Eixo das incretinas',
          passos: [
            'Refeição → células L (GLP-1) e K (GIP) intestinais liberam incretinas',
            'DPP-4 degrada GLP-1 e GIP em minutos ← iDPP-4 (gliptinas) bloqueiam',
            'GLP-1 ativa receptores no pâncreas (↑ insulina, ↓ glucagon), estômago (↓ esvaziamento) e SNC (↑ saciedade) ← aGLP-1 (semaglutida, liraglutida, dulaglutida) mimetizam com resistência à DPP-4',
            'GIP + GLP-1 ativados simultaneamente ← tirzepatida (agonista duplo)',
            'Resultado: ↓ glicemia pós-prandial e de jejum com baixo risco de hipoglicemia; ↓ peso (aGLP-1/tirzepatida)',
          ],
        },
        {
          titulo: 'Rim e glicose: alvo dos iSGLT2',
          passos: [
            'Glicose filtrada no glomérulo (~180 g/dia)',
            'Túbulo proximal S1–S2: SGLT2 reabsorve ~90% (com Na⁺) ← iSGLT2 bloqueiam',
            'S3: SGLT1 reabsorve o restante',
            'Com SGLT2 bloqueado → glicosúria + natriurese → mais Na⁺ na mácula densa',
            'Feedback tubuloglomerular → vasoconstrição aferente → ↓ pressão intraglomerular (nefroproteção) e ↓ volume/pré-carga (proteção na IC)',
          ],
        },
      ],
      eaFrequentes: [
        { efeito: 'Diarreia, náusea e gosto metálico', classes: 'Biguanidas (metformina)', mecanismo: 'Efeito local intestinal; atenuado com titulação e liberação prolongada' },
        { efeito: 'Hipoglicemia', classes: 'Sulfonilureias, glinidas e insulinas', mecanismo: 'Insulina liberada/administrada independentemente da glicemia' },
        { efeito: 'Ganho de peso', classes: 'Sulfonilureias, insulinas e tiazolidinedionas', mecanismo: 'Efeito anabólico da insulina, menor glicosúria; retenção hídrica e expansão adiposa nas TZD' },
        { efeito: 'Náuseas, vômitos, diarreia ou constipação', classes: 'Agonistas de GLP-1 e tirzepatida', mecanismo: 'Ação na área postrema e retardo do esvaziamento gástrico; predominam no escalonamento' },
        { efeito: 'Infecção genital micótica e ITU', classes: 'iSGLT2', mecanismo: 'Glicosúria favorece crescimento de Candida' },
        { efeito: 'Poliúria e depleção de volume', classes: 'iSGLT2', mecanismo: 'Diurese osmótica e natriurese' },
        { efeito: 'Edema', classes: 'Tiazolidinedionas', mecanismo: 'Reabsorção de Na⁺ no ducto coletor via PPAR-γ' },
        { efeito: 'Lipo-hipertrofia', classes: 'Insulinas', mecanismo: 'Efeito lipogênico local por aplicações repetidas no mesmo sítio' },
      ],
      eaGraves: [
        { efeito: 'Acidose lática', classes: 'Metformina', mecanismo: 'Inibição da gliconeogênese a partir do lactato e da respiração mitocondrial, com acúmulo na DRC grave ou hipóxia' },
        { efeito: 'Hipoglicemia grave e prolongada', classes: 'Sulfonilureias (sobretudo glibenclamida) e insulinas', mecanismo: 'Meia-vida longa e metabólitos ativos; erro de dose ou omissão de refeição' },
        { efeito: 'Cetoacidose diabética euglicêmica', classes: 'iSGLT2', mecanismo: 'Glicemia normal com menor insulina e maior glucagon, favorecendo cetogênese — risco em cirurgia, jejum, doença aguda e DM1' },
        { efeito: 'Gangrena de Fournier', classes: 'iSGLT2', mecanismo: 'Infecção perineal necrosante, rara' },
        { efeito: 'Amputação de membros inferiores', classes: 'Canagliflozina (CANVAS)', mecanismo: 'Mecanismo incerto; possivelmente depleção de volume em membro isquêmico' },
        { efeito: 'Pancreatite aguda', classes: 'iDPP-4, aGLP-1 e tirzepatida', mecanismo: 'Associação rara; suspender diante de suspeita' },
        { efeito: 'Colelitíase', classes: 'aGLP-1 e tirzepatida', mecanismo: 'Perda de peso rápida e redução da motilidade da vesícula' },
        { efeito: 'Tumores de células C da tireoide', classes: 'aGLP-1 de longa ação e tirzepatida', mecanismo: 'Observados em roedores; contraindicados em história de carcinoma medular ou NEM2' },
        { efeito: 'Insuficiência cardíaca, fraturas e câncer de bexiga', classes: 'Pioglitazona', mecanismo: 'Retenção hídrica; desvio da diferenciação de células mesenquimais para adipócitos em vez de osteoblastos' },
        { efeito: 'Hipocalemia', classes: 'Insulinas (principalmente IV)', mecanismo: 'Ativação da Na⁺/K⁺-ATPase desloca potássio para o intracelular' },
      ],
      primeirasLinhas: [
        {
          condicao: 'DM2 sem DCV, IC, DRC ou obesidade como prioridade',
          recomendacao: 'Metformina + mudança de estilo de vida; associar segundo fármaco se HbA1c > 1,5% acima da meta ao diagnóstico (terapia combinada inicial)',
          observacao: 'A escolha do segundo agente considera peso, risco de hipoglicemia, custo e acesso (SUS: metformina, gliclazida/glibenclamida, dapagliflozina, NPH/regular)',
          fonte: 'Diretriz SBD 2024/2025; ADA Standards of Care 2025, seção 9',
        },
        {
          condicao: 'DM2 com doença cardiovascular aterosclerótica estabelecida (ou alto risco CV)',
          recomendacao: 'aGLP-1 com benefício CV comprovado (semaglutida, liraglutida, dulaglutida) e/ou iSGLT2 (empagliflozina, dapagliflozina, canagliflozina), independentemente da HbA1c e do uso de metformina',
          fonte: 'Diretriz SBD 2024/2025; ADA Standards of Care 2025, seções 9 e 10',
        },
        {
          condicao: 'DM2 com insuficiência cardíaca (FE reduzida ou preservada)',
          recomendacao: 'iSGLT2 (dapagliflozina ou empagliflozina) — reduz hospitalização por IC e morte CV',
          observacao: 'Evitar pioglitazona; saxagliptina associou-se a mais hospitalização por IC (SAVOR) — não usar como gliptina de escolha',
          fonte: 'Diretriz SBD 2024/2025; ADA Standards of Care 2025, seção 10; ESC 2023',
        },
        {
          condicao: 'DM2 com doença renal crônica (TFGe ≥ 20 e/ou albuminúria)',
          recomendacao: 'iSGLT2 com benefício renal (dapagliflozina, empagliflozina, canagliflozina); adicionar aGLP-1 (semaglutida — FLOW) para controle glicêmico e proteção adicional',
          observacao: 'Manter iSGLT2 mesmo quando a TFGe cai abaixo do limiar de eficácia glicêmica; ajustar metformina (suspender se TFGe < 30) e gliptinas (exceto linagliptina)',
          fonte: 'Diretriz SBD 2024/2025; ADA Standards of Care 2025, seção 11; KDIGO 2022',
        },
        {
          condicao: 'DM2 com obesidade (perda de peso como objetivo terapêutico)',
          recomendacao: 'aGLP-1 de alta eficácia (semaglutida) ou agonista duplo GIP/GLP-1 (tirzepatida)',
          observacao: 'Evitar ou minimizar sulfonilureias, insulina e pioglitazona, que aumentam o peso',
          fonte: 'Diretriz SBD 2024/2025; ADA Standards of Care 2025, seções 8 e 9',
        },
        {
          condicao: 'DM2 com hiperglicemia grave sintomática (HbA1c > 10% ou glicemia ≥ 300 mg/dL, perda de peso, catabolismo)',
          recomendacao: 'Iniciar insulina (basal ± prandial); reavaliar e simplificar após controle da glicotoxicidade',
          fonte: 'Diretriz SBD 2024/2025; ADA Standards of Care 2025, seção 9',
        },
        {
          condicao: 'DM2 com esteato-hepatite metabólica (MASH)',
          recomendacao: 'Pioglitazona e/ou aGLP-1 (semaglutida) ou tirzepatida, com benefício histológico demonstrado',
          fonte: 'ADA Standards of Care 2025, seção 4; Diretriz SBD 2024/2025',
        },
        {
          condicao: 'Diabetes melito tipo 1',
          recomendacao: 'Insulinoterapia intensiva basal-bolus (MDI) ou bomba de infusão contínua, preferencialmente com análogos (basal de longa ação + ultrarrápido prandial)',
          observacao: 'Antidiabéticos orais não substituem a insulina; iSGLT2 não são indicados (cetoacidose)',
          fonte: 'Diretriz SBD 2024/2025; ADA Standards of Care 2025, seção 9',
        },
        {
          condicao: 'Diabetes melito gestacional (sem controle com dieta e atividade física) e diabetes pré-gestacional',
          recomendacao: 'Insulina (NPH e regular; análogos asparte, lispro e detemir também são seguros)',
          observacao: 'Metformina atravessa a placenta e é alternativa somente quando a insulina não é viável; glibenclamida não é recomendada (hipoglicemia neonatal, macrossomia)',
          fonte: 'Diretriz SBD 2024/2025 — Diabetes na gestação; ADA Standards of Care 2025, seção 15',
        },
        {
          condicao: 'Cetoacidose diabética / estado hiperglicêmico hiperosmolar',
          recomendacao: 'Hidratação venosa + insulina regular IV em infusão contínua, com reposição de potássio',
          fonte: 'Diretriz SBD 2024/2025; ADA Hyperglycemic Crises Consensus 2024',
        },
      ],
      contraindicacoes: [
        'Metformina: TFGe < 30, acidose, hipóxia tecidual, hepatopatia grave e alcoolismo; suspender antes de contraste iodado em pacientes de risco',
        'Sulfonilureias: DM1, gestação, DRC/hepatopatia graves; glibenclamida em idosos',
        'iSGLT2: DM1, diálise; suspender antes de cirurgias e em doenças agudas',
        'aGLP-1 e tirzepatida: história pessoal/familiar de carcinoma medular de tireoide ou NEM2, gestação, DM1 como monoterapia',
        'Pioglitazona: IC sintomática, câncer de bexiga, hepatopatia ativa',
        'Insulinas: hipoglicemia em curso; NPH e glargina não podem ser usadas IV',
        'Na gestação: preferir insulina; suspender aGLP-1/tirzepatida antes da concepção; evitar iSGLT2, iDPP-4, SU e TZD',
      ],
      interacoes: [
        'Betabloqueadores mascaram os sintomas adrenérgicos da hipoglicemia (exceto sudorese)',
        'Corticoides, tiazídicos, antipsicóticos atípicos e inibidores de protease elevam a glicemia',
        'Inibidores do CYP2C9 (fluconazol, amiodarona) e sulfametoxazol-trimetoprima potencializam sulfonilureias',
        'Genfibrozila aumenta muito a pioglitazona (CYP2C8)',
        'Contraste iodado + metformina: risco de acidose lática em pacientes com TFGe reduzida',
        'aGLP-1/tirzepatida retardam a absorção de medicamentos orais; tirzepatida reduz a eficácia de contraceptivos orais',
        'iSGLT2 + diuréticos: depleção de volume; iSGLT2 reduzem o lítio sérico',
        'Associar aGLP-1, iSGLT2 ou iDPP-4 a SU/insulina exige reduzir a dose destas pelo risco de hipoglicemia',
        'Não associar iDPP-4 com aGLP-1 (mesma via, sem ganho adicional)',
      ],
      comparacoes: [
        {
          titulo: 'iDPP-4 × aGLP-1',
          texto:
            'Ambos agem pela via incretínica, mas os iDPP-4 apenas preservam o GLP-1 endógeno (níveis fisiológicos), são orais, têm eficácia modesta, peso neutro e desfechos CV neutros. Os aGLP-1 atingem níveis farmacológicos: maior redução de HbA1c e de peso, benefício CV (liraglutida, semaglutida, dulaglutida) e renal (semaglutida), porém com mais efeitos gastrointestinais e, na maioria, via injetável.',
        },
        {
          titulo: 'iSGLT2 × aGLP-1 na proteção cardiorrenal',
          texto:
            'iSGLT2 se destacam na insuficiência cardíaca (reduzem hospitalização) e na DRC (reduzem progressão), com efeito glicêmico moderado e dependente da TFG. aGLP-1 se destacam na redução de eventos ateroscleróticos (IAM, AVC) e no peso. Na DCV aterosclerótica qualquer um com benefício comprovado é aceitável, e a associação dos dois é racional por mecanismos complementares.',
        },
        {
          titulo: 'Glibenclamida × gliclazida × glimepirida',
          texto:
            'Todas fecham o canal K-ATP. A glibenclamida tem metabólitos ativos renais e maior risco de hipoglicemia prolongada (evitar em idosos e DRC). A gliclazida tem metabólitos inativos e menor taxa de hipoglicemia (ADVANCE); a glimepirida tem dose única diária e risco intermediário.',
        },
        {
          titulo: 'Sitagliptina × linagliptina',
          texto:
            'Mesma eficácia glicêmica e segurança CV neutra. A sitagliptina é eliminada pelos rins e exige ajuste pela TFGe; a linagliptina tem eliminação biliar e dispensa ajuste renal.',
        },
        {
          titulo: 'Semaglutida × liraglutida × dulaglutida × tirzepatida',
          texto:
            'Liraglutida é diária; semaglutida, dulaglutida e tirzepatida são semanais (semaglutida também oral). Em eficácia sobre HbA1c e peso: tirzepatida > semaglutida > dulaglutida ≈ liraglutida. Todas as três aGLP-1 têm estudo de desfecho CV positivo; a dulaglutida é uma proteína de fusão Fc (não é peptídeo pequeno).',
        },
        {
          titulo: 'Perfis das insulinas',
          texto:
            'Ultrarrápidas (lispro, asparte): início 5–15 min, pico 1–2 h, duração 3–5 h — aplicar logo antes da refeição. Regular: início 30–60 min, pico 2–3 h, duração 5–8 h — aplicar 30 min antes; única de uso IV rotineiro. NPH: início 2–4 h, pico 4–10 h, duração 10–18 h — mais hipoglicemia noturna. Glargina: sem pico, ~24 h (U300 > 24 h) — uma aplicação diária.',
        },
        {
          titulo: 'Pioglitazona × metformina como sensibilizadores',
          texto:
            'A metformina age principalmente no fígado e é neutra no peso; a pioglitazona age no tecido adiposo, músculo e fígado via PPAR-γ, tem efeito mais durável e benefício na MASH, mas causa ganho de peso, edema, IC e fraturas.',
        },
      ],
      memorizar: [
        'DM1 = deficiência absoluta de insulina → insulina sempre (basal-bolus); DMG → insulina é a primeira escolha farmacológica.',
        'Metformina: não causa hipoglicemia isolada; risco raro de acidose lática; suspender se TFGe < 30; dosar B12.',
        'Sulfonilureias: fecham K-ATP → hipoglicemia + ganho de peso; glibenclamida é a pior em idosos/DRC.',
        'iDPP-4 (-gliptinas): orais, peso neutro, CV neutros; alerta de pancreatite e penfigoide bolhoso; linagliptina não exige ajuste renal.',
        'iSGLT2 (-gliflozinas): glicosúria → candidíase genital; CAD euglicêmica; prioridade em IC e DRC.',
        'aGLP-1 (-glutidas): náuseas/vômitos; perda de peso; benefício CV; contraindicados em carcinoma medular/NEM2.',
        'Tirzepatida = agonista duplo GIP/GLP-1 (classe própria) — maior redução de HbA1c e peso; reduz eficácia de contraceptivos orais.',
        'Pioglitazona: PPAR-γ → edema, ganho de peso, IC, fraturas, câncer de bexiga; útil na MASH.',
        'Escolha por perfil: DCV aterosclerótica → aGLP-1 ou iSGLT2; IC → iSGLT2; DRC → iSGLT2 (+ semaglutida); obesidade → semaglutida/tirzepatida.',
        'Insulina regular IV é a insulina da cetoacidose — sempre monitorar e repor potássio.',
        'NPH = pico → hipoglicemia noturna; glargina = sem pico, 1×/dia.',
        'Ultrarrápidas (lispro/asparte) aplicam-se 0–15 min antes da refeição; regular, 30 min antes.',
        'Betabloqueadores mascaram a hipoglicemia; corticoides e tiazídicos pioram a glicemia.',
        'Ao associar terapias incretínicas/iSGLT2 a SU ou insulina, reduzir a dose destas.',
      ],
      fontes: [
        ...REF_LIVROS,
        REF_SBD,
        REF_ADA,
        '2023 ESC Guidelines for the management of cardiovascular disease in patients with diabetes',
        'KDIGO 2022 Clinical Practice Guideline for Diabetes Management in CKD',
        REF_RENAME,
        'Bulas dos medicamentos de referência — Bulário Anvisa; FDA Prescribing Information',
      ],
      dataRevisao: DATA,
    },

    // ---------------- OBESIDADE ----------------
    {
      grupoId: 'obesidade',
      visaoGeral: [
        'A obesidade é uma doença crônica, multifatorial e recidivante, definida operacionalmente por IMC ≥ 30 kg/m² (sobrepeso: 25–29,9), em que o excesso de adiposidade — sobretudo visceral — aumenta o risco de DM2, hipertensão, dislipidemia, DCV, apneia do sono, esteatose hepática, osteoartrite e alguns cânceres. A regulação do peso depende de um sistema homeostático (hipotálamo: neurônios POMC/CART anorexígenos e NPY/AgRP orexígenos, sinalizados por leptina, insulina, grelina e GLP-1) e de um sistema hedônico (recompensa mesolímbica). Após a perda de peso, adaptações hormonais e metabólicas favorecem o reganho, o que justifica o tratamento farmacológico de longo prazo.',
        'O tratamento farmacológico é indicado como adjuvante de mudança de estilo de vida em adultos com IMC ≥ 30 kg/m² ou ≥ 27 kg/m² com comorbidade relacionada ao peso, quando as medidas não farmacológicas não foram suficientes. Uma resposta clinicamente relevante é perda ≥ 5% do peso em cerca de 3 meses na dose de manutenção; sem ela, o fármaco deve ser revisto. Os fármacos atuam reduzindo a absorção de gordura (orlistate) ou, principalmente, no sistema nervoso central, aumentando a saciedade e reduzindo o apetite (sibutramina, naltrexona + bupropiona, agonistas de GLP-1 e o agonista duplo GIP/GLP-1).',
        'Os agonistas incretínicos transformaram o campo: semaglutida 2,4 mg produz perda média de ~15% (STEP-1) e tirzepatida até ~20% (SURMOUNT-1), aproximando-se de resultados cirúrgicos; a semaglutida reduziu eventos CV maiores em pessoas com obesidade e DCV sem diabetes (SELECT). Liraglutida, semaglutida e tirzepatida estão cadastradas no grupo dos antidiabéticos e aparecem aqui nas doses e marcas específicas de obesidade (Saxenda, Wegovy; Mounjaro tem a mesma marca nas duas indicações no Brasil). Desde 2025 a Anvisa exige retenção de receita para esses agonistas.',
        'O Brasil tem histórico regulatório particular. Em 2011, a RDC 52/2011 cancelou os registros dos anorexígenos anfetamínicos anfepramona, femproporex e mazindol e manteve a sibutramina com restrições (receita B2, Termo de Responsabilidade do Prescritor, contraindicação em DCV). Um decreto legislativo de 2014 sustou essa RDC e a Anvisa editou a RDC 50/2014 com novas regras de controle; a Lei 13.454/2017 autorizou a produção e venda desses anorexígenos, mas foi declarada inconstitucional pelo STF em 2021 (ADI 5779). A sibutramina foi retirada dos EUA e da Europa em 2010 após o estudo SCOUT, mas segue comercializada no Brasil sob controle especial. A situação vigente de cada substância deve ser conferida na Anvisa.',
      ],
      mecanismos: [
        {
          titulo: 'Inibidores de lipases (orlistate)',
          texto:
            'O orlistate liga-se covalentemente ao resíduo de serina do sítio ativo das lipases gástrica e pancreática, no lúmen intestinal. Os triglicerídeos da dieta não são hidrolisados em ácidos graxos livres e monoglicerídeos e, portanto, não são absorvidos: ~30% da gordura ingerida é eliminada nas fezes. A absorção sistêmica é mínima, sem efeitos centrais. Os efeitos adversos (esteatorreia, urgência fecal) decorrem diretamente do mecanismo e aumentam com dietas gordurosas.',
        },
        {
          titulo: 'Sacietógeno de ação central (sibutramina)',
          texto:
            'Os metabólitos ativos da sibutramina inibem a recaptação de serotonina e noradrenalina (e fracamente dopamina) nas sinapses hipotalâmicas, intensificando a sinalização de saciedade (receptores 5-HT2C e α1/β1 adrenérgicos no núcleo paraventricular). Também aumenta discretamente a termogênese. Diferente das anfetaminas, não promove liberação de monoaminas, por isso tem menor potencial de abuso. A ação noradrenérgica periférica eleva PA e frequência cardíaca, base do aumento de eventos CV no SCOUT.',
        },
        {
          titulo: 'Naltrexona + bupropiona',
          texto:
            'A bupropiona (inibidor da recaptação de dopamina e noradrenalina) ativa neurônios POMC do núcleo arqueado, que clivam POMC em α-MSH (agonista do MC4R → saciedade, ↑ gasto energético) e β-endorfina. A β-endorfina atua em receptores μ-opioides do próprio neurônio POMC, uma alça de autoinibição que limita o efeito. A naltrexona bloqueia essa alça e potencializa a ativação POMC; ambas também modulam o circuito dopaminérgico de recompensa, reduzindo a "fissura" por alimentos.',
        },
        {
          titulo: 'Agonistas de GLP-1 e agonista duplo GIP/GLP-1',
          texto:
            'Em doses maiores que as do DM2 (liraglutida 3,0 mg/dia; semaglutida 2,4 mg/semana), os aGLP-1 atuam em receptores do hipotálamo (ativam POMC/CART e inibem NPY/AgRP) e do tronco encefálico (área postrema, núcleo do trato solitário), aumentando a saciedade e reduzindo a fome e a preferência por alimentos calóricos; o retardo do esvaziamento gástrico contribui. A tirzepatida soma o agonismo do receptor de GIP, que potencializa a redução de ingestão e melhora o manejo de lipídios no tecido adiposo, resultando nas maiores perdas ponderais.',
        },
        {
          titulo: 'Anorexígenos simpaticomiméticos (contexto histórico)',
          texto:
            'Anfepramona (dietilpropiona), femproporex, mazindol e fentermina são derivados ou análogos anfetamínicos que aumentam noradrenalina (e dopamina) no hipotálamo, por liberação e/ou inibição da recaptação, reduzindo o apetite. Têm eficácia de curto prazo, potencial de abuso e efeitos simpáticos (HAS, taquicardia, insônia, ansiedade). No Brasil foram alvo de cancelamento de registro em 2011 e de disputas legislativas e judiciais posteriores.',
        },
      ],
      fluxogramas: [
        {
          titulo: 'Controle hipotalâmico do apetite e alvos farmacológicos',
          passos: [
            'Sinais periféricos (leptina, insulina, GLP-1, GIP) e grelina chegam ao núcleo arqueado',
            'Neurônios POMC/CART (anorexígenos) ← ativados por bupropiona, serotonina (sibutramina) e aGLP-1/tirzepatida',
            'POMC → α-MSH → receptor MC4R no núcleo paraventricular → saciedade e ↑ gasto energético',
            'POMC → β-endorfina → receptor μ-opioide → autoinibição do POMC ← naltrexona bloqueia',
            'Neurônios NPY/AgRP (orexígenos) ← inibidos por aGLP-1 e leptina',
            'Resultado: ↓ ingestão alimentar e perda de peso',
          ],
        },
        {
          titulo: 'Digestão e absorção de gordura: alvo do orlistate',
          passos: [
            'Triglicerídeos da dieta chegam ao estômago e duodeno',
            'Lipases gástrica e pancreática hidrolisam triglicerídeos ← orlistate inibe covalentemente',
            'Ácidos graxos livres + monoglicerídeos formam micelas com sais biliares',
            'Absorção pelo enterócito → quilomícrons → linfa',
            'Com orlistate: ~30% da gordura permanece intacta → eliminada nas fezes (esteatorreia) e menor absorção de vitaminas A, D, E, K',
          ],
        },
      ],
      eaFrequentes: [
        { efeito: 'Esteatorreia, fezes oleosas, urgência fecal, flatulência com descarga', classes: 'Inibidores de lipases (orlistate)', mecanismo: 'Gordura não digerida no cólon' },
        { efeito: 'Boca seca, insônia, constipação, cefaleia', classes: 'Sibutramina', mecanismo: 'Efeito noradrenérgico/anticolinérgico-símile e central' },
        { efeito: 'Aumento de PA e frequência cardíaca', classes: 'Sibutramina; em menor grau naltrexona + bupropiona', mecanismo: 'Aumento do tônus simpático' },
        { efeito: 'Náuseas, constipação, cefaleia, tontura, insônia', classes: 'Naltrexona + bupropiona', mecanismo: 'Ações centrais da bupropiona e da naltrexona' },
        { efeito: 'Náuseas, vômitos, diarreia, constipação', classes: 'aGLP-1 e tirzepatida', mecanismo: 'Área postrema e retardo do esvaziamento gástrico; dose-dependentes' },
      ],
      eaGraves: [
        { efeito: 'Eventos CV não fatais (IAM, AVC) em pacientes com DCV', classes: 'Sibutramina (SCOUT)', mecanismo: 'Aumento sustentado de PA e FC' },
        { efeito: 'Síndrome serotoninérgica', classes: 'Sibutramina (com ISRS, triptanos, IMAO)', mecanismo: 'Excesso de serotonina sináptica' },
        { efeito: 'Convulsões', classes: 'Naltrexona + bupropiona', mecanismo: 'Bupropiona reduz o limiar convulsivo de forma dose-dependente' },
        { efeito: 'Ideação suicida', classes: 'Naltrexona + bupropiona', mecanismo: 'Alerta de antidepressivos (bupropiona), especialmente em jovens' },
        { efeito: 'Deficiência de vitaminas lipossolúveis; nefropatia por oxalato', classes: 'Orlistate', mecanismo: 'Má absorção de gordura; ácidos graxos livres ligam cálcio e liberam oxalato para absorção' },
        { efeito: 'Pancreatite, colelitíase', classes: 'aGLP-1 e tirzepatida', mecanismo: 'Associação rara; perda de peso rápida favorece cálculos' },
        { efeito: 'Dependência e efeitos simpaticomiméticos', classes: 'Anorexígenos anfetamínicos (contexto histórico)', mecanismo: 'Liberação de catecolaminas e dopamina' },
      ],
      primeirasLinhas: [
        {
          condicao: 'Obesidade (IMC ≥ 30) ou sobrepeso (IMC ≥ 27) com comorbidade — base de todo tratamento',
          recomendacao: 'Mudança intensiva de estilo de vida (dieta com déficit calórico, atividade física, terapia comportamental); fármaco como adjuvante quando não se atingem as metas',
          fonte: 'ABESO — Diretrizes Brasileiras de Obesidade; ADA Standards of Care 2025, seção 8',
        },
        {
          condicao: 'Obesidade com DM2 ou pré-diabetes',
          recomendacao: 'Preferir agonista de GLP-1 de alta eficácia (semaglutida) ou tirzepatida, que tratam peso e glicemia simultaneamente',
          observacao: 'Na indisponibilidade/custo, orlistate tem dados de prevenção de DM2 (XENDOS)',
          fonte: 'ADA Standards of Care 2025, seção 8; Diretriz SBD 2024/2025',
        },
        {
          condicao: 'Obesidade/sobrepeso com doença cardiovascular aterosclerótica estabelecida (sem diabetes)',
          recomendacao: 'Semaglutida 2,4 mg semanal, com redução de eventos CV maiores (SELECT)',
          observacao: 'Sibutramina é contraindicada em DCV',
          fonte: 'Lincoff AM et al. SELECT, N Engl J Med 2023; ADA Standards of Care 2025, seção 8',
        },
        {
          condicao: 'Obesidade sem comorbidades CV/metabólicas que priorizem incretinas, ou quando custo/acesso limitam',
          recomendacao: 'Opções orais: orlistate (ação periférica, sem efeito central) ou, no Brasil, sibutramina em pacientes selecionados sem DCV e com PA controlada (receita B2)',
          observacao: 'Eficácia menor (~3–5% de perda adicional ao placebo); avaliar resposta em 3 meses',
          fonte: 'ABESO — Diretrizes Brasileiras de Obesidade 2016 e posicionamentos posteriores',
        },
        {
          condicao: 'Obesidade com compulsão alimentar/"fissura" ou tabagismo e sem epilepsia',
          recomendacao: 'Naltrexona + bupropiona é opção nas diretrizes internacionais',
          observacao: 'Disponibilidade de produto registrado no Brasil a confirmar; contraindicada em epilepsia, transtornos alimentares, uso de opioides e HAS não controlada',
          fonte: 'ADA Standards of Care 2025, seção 8; FDA/EMA',
        },
        {
          condicao: 'Gestação e lactação',
          recomendacao: 'Não usar fármacos antiobesidade; suspender aGLP-1/tirzepatida antes da concepção',
          fonte: 'Bulas Anvisa/FDA; ADA Standards of Care 2025, seção 8',
        },
      ],
      contraindicacoes: [
        'Orlistate: má absorção crônica, colestase, gestação',
        'Sibutramina: DCV (DAC, AVC, IC, arritmia, DAOP), HAS não controlada, uso de IMAO, transtornos alimentares e psiquiátricos graves, IMC < 30 (regra brasileira)',
        'Naltrexona + bupropiona: epilepsia, bulimia/anorexia, uso de opioides, HAS não controlada, IMAO, retirada abrupta de álcool/benzodiazepínicos',
        'aGLP-1 e tirzepatida: história pessoal/familiar de carcinoma medular de tireoide ou NEM2, gestação',
        'Todos: gestação e lactação',
      ],
      interacoes: [
        'Orlistate reduz a absorção de ciclosporina, levotiroxina, amiodarona, antiepilépticos e vitaminas lipossolúveis; altera INR com varfarina',
        'Sibutramina + ISRS/IRSN/triptanos/tramadol/linezolida: síndrome serotoninérgica; + IMAO: contraindicado',
        'Sibutramina + inibidores do CYP3A4 (cetoconazol, claritromicina): aumento dos metabólitos ativos',
        'Naltrexona bloqueia o efeito de analgésicos opioides',
        'Bupropiona inibe CYP2D6 (metoprolol, tricíclicos, tamoxifeno) e soma risco convulsivo com outros fármacos pró-convulsivantes',
        'Tirzepatida reduz a exposição a contraceptivos orais; aGLP-1 alteram a absorção de fármacos orais',
      ],
      comparacoes: [
        {
          titulo: 'Eficácia relativa (perda média adicional ao placebo, aproximada)',
          texto:
            'Tirzepatida (até ~18–20% total) > semaglutida 2,4 mg (~12–15%) > liraglutida 3,0 mg (~5%) ≈ naltrexona + bupropiona (~4–5%) ≈ sibutramina (~4–5%) > orlistate (~3%). A resposta é individual e o reganho é esperado após a suspensão.',
        },
        {
          titulo: 'Ação periférica × central',
          texto:
            'O orlistate age apenas no intestino, sem efeitos sobre SNC, PA ou FC, mas tem eficácia modesta e efeitos gastrointestinais limitantes. Os demais agem no SNC: sibutramina (monoaminas), naltrexona + bupropiona (POMC e recompensa) e incretinas (hipotálamo e tronco encefálico).',
        },
        {
          titulo: 'Sibutramina × anfetamínicos',
          texto:
            'A sibutramina inibe a recaptação de serotonina e noradrenalina, sem liberar monoaminas, com baixo potencial de abuso; anfepramona, femproporex e mazindol são simpaticomiméticos com maior potencial de dependência. Ambos elevam PA e FC.',
        },
        {
          titulo: 'Liraglutida 3,0 mg × semaglutida 2,4 mg × tirzepatida',
          texto:
            'Liraglutida: aplicação diária e menor perda de peso. Semaglutida: semanal, perda ~15% e benefício CV em obesidade sem diabetes (SELECT). Tirzepatida: semanal, agonista duplo, maior perda de peso; superior à semaglutida em comparação direta (SURMOUNT-5).',
        },
        {
          titulo: 'Doses: DM2 × obesidade',
          texto:
            'O mesmo princípio ativo pode ter marca e dose diferentes por indicação: liraglutida até 1,8 mg (Victoza, DM2) × 3,0 mg (Saxenda, obesidade); semaglutida até 2 mg (Ozempic) ou oral (Rybelsus) no DM2 × 2,4 mg (Wegovy) na obesidade; tirzepatida usa a marca Mounjaro nas duas indicações no Brasil.',
        },
      ],
      memorizar: [
        'Indicação farmacológica: IMC ≥ 30 ou ≥ 27 com comorbidade, sempre associada a mudança de estilo de vida.',
        'Resposta mínima esperada: ≥ 5% de perda em ~3 meses na dose plena; se não, rever o tratamento.',
        'Orlistate: inibe lipases → esteatorreia; suplementar vitaminas A, D, E, K; separar levotiroxina e ciclosporina.',
        'Sibutramina: IRSN central → ↑ PA e FC; contraindicada em DCV (SCOUT); Lista B2 + Termo de Responsabilidade.',
        'Sibutramina foi retirada dos EUA/Europa em 2010, mas continua no Brasil sob controle especial.',
        'Naltrexona + bupropiona: ativa POMC e bloqueia a autoinibição opioide; risco de convulsão; não usar com opioides.',
        'Semaglutida 2,4 mg (Wegovy): ~15% de perda; reduziu eventos CV em obesidade sem diabetes (SELECT).',
        'Liraglutida 3,0 mg (Saxenda): diária; aprovada também em adolescentes.',
        'Tirzepatida: agonista duplo GIP/GLP-1, maior perda de peso; Mounjaro no Brasil serve às duas indicações.',
        'aGLP-1/tirzepatida: náuseas/vômitos; contraindicados em carcinoma medular de tireoide/NEM2 e gestação.',
        'RDC 52/2011 cancelou anfepramona, femproporex e mazindol; histórico posterior incluiu RDC 50/2014, Lei 13.454/2017 e ADI 5779 (STF, 2021).',
        'Nenhum antiobesidade deve ser usado na gestação.',
      ],
      fontes: [
        ...REF_LIVROS,
        REF_ABESO,
        REF_ADA_OB,
        REF_344,
        'Anvisa — RDC nº 52/2011 e RDC nº 50/2014',
        'Wilding JPH et al. STEP-1. N Engl J Med 2021;384:989-1002',
        'Jastreboff AM et al. SURMOUNT-1. N Engl J Med 2022;387:205-16',
        'Lincoff AM et al. SELECT. N Engl J Med 2023;389:2221-32',
        'James WPT et al. SCOUT. N Engl J Med 2010;363:905-17',
        'Torgerson JS et al. XENDOS. Diabetes Care 2004;27:155-61',
        'FDA Prescribing Information — Contrave; EMA SmPC — Mysimba',
      ],
      dataRevisao: DATA,
    },
  ],
};

export default dados;
