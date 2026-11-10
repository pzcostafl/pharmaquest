import type { ModuloDados, NomeComercial, Termo } from '../types';

// =====================================================================
// Grupo: Antimicrobianos e antibióticos
// Conteúdo educacional redigido a partir de referências-padrão.
// Marcas: todas 'pendente_anvisa' (nenhuma conferida no Bulário).
// =====================================================================

const DATA = '10/nov/2026';
const RDC = 'Antimicrobiano — retenção de receita (RDC 471/2021)';

const FAM_BETA = 'Antibacterianos — betalactâmicos';
const FAM_OUTROS = 'Antibacterianos — outros';
const FAM_FUNGI = 'Antifúngicos';
const FAM_VIRUS = 'Antivirais';

const REF_GG = 'Brunton LL, Knollmann BC (eds.). Goodman & Gilman: As Bases Farmacológicas da Terapêutica, 14ª ed. (2023)';
const REF_KATZUNG = 'Katzung BG, Vanderah TW. Farmacologia Básica e Clínica, 15ª ed. (2021)';
const REF_RANG = 'Ritter JM et al. Rang & Dale Farmacologia, 9ª ed. (2020)';
const REF_RENAME = 'Ministério da Saúde. RENAME 2022 e Formulário Terapêutico Nacional';
const REF_AWARE = 'OMS. The WHO AWaRe (Access, Watch, Reserve) Antibiotic Book (2022)';
const REF_RDC = 'Anvisa. RDC nº 471/2021 — controle de antimicrobianos (retenção de receita)';
const REF_IST = 'Ministério da Saúde. PCDT para Atenção Integral às Pessoas com IST (2022)';
const REF_PAC = 'Metlay JP et al. ATS/IDSA Guideline — Community-acquired Pneumonia in Adults (2019)';
const REF_SBPT = 'SBPT. Recomendações para o manejo da pneumonia adquirida na comunidade (2018)';
const REF_FARINGITE = 'Shulman ST et al. IDSA Guideline — Group A Streptococcal Pharyngitis (2012)';
const REF_PELE = 'Stevens DL et al. IDSA Guideline — Skin and Soft Tissue Infections (2014)';
const REF_ITU = 'Gupta K et al. IDSA/ESCMID Guideline — Acute Uncomplicated Cystitis and Pyelonephritis in Women (2011)';
const REF_CDI = 'Johnson S et al. IDSA/SHEA Focused Update — Clostridioides difficile Infection (2021)';
const REF_INFLUENZA = 'Ministério da Saúde. Guia/Protocolo de Tratamento de Influenza (2023)';
const REF_FDA_FQ = 'FDA Drug Safety Communications — fluoroquinolonas (2016, 2018)';

const pend = (nome: string, tipo: NomeComercial['tipo'], extra: Partial<NomeComercial> = {}): NomeComercial => ({
  nome,
  tipo,
  verificacao: 'pendente_anvisa',
  ...extra,
});

// Termos reutilizados ------------------------------------------------
const T_DIARREIA: Termo = { termo: 'Diarreia', sinonimos: ['fezes amolecidas', 'evacuacoes liquidas', 'diarreia associada a antibiotico'] };
const T_NAUSEA: Termo = { termo: 'Náuseas e vômitos', sinonimos: ['nausea', 'vomito', 'enjoo', 'emese'] };
const T_ANAFILAXIA: Termo = {
  termo: 'Anafilaxia',
  sinonimos: ['choque anafilatico', 'reacao anafilatica', 'hipersensibilidade imediata', 'reacao alergica grave', 'alergia grave'],
};
const T_CDI: Termo = {
  termo: 'Colite por Clostridioides difficile',
  sinonimos: ['colite pseudomembranosa', 'c difficile', 'clostridium difficile', 'cdi', 'diarreia por c difficile'],
};
const T_QT: Termo = {
  termo: 'Prolongamento do intervalo QT',
  sinonimos: ['qt longo', 'torsades de pointes', 'arritmia ventricular', 'aumento do qt', 'prolongamento do qtc'],
};
const T_SJS: Termo = {
  termo: 'Síndrome de Stevens-Johnson / necrólise epidérmica tóxica',
  sinonimos: ['stevens johnson', 'sjs', 'net', 'necrolise epidermica toxica', 'sindrome de lyell', 'farmacodermia grave'],
};
const T_HEPATO: Termo = {
  termo: 'Hepatotoxicidade',
  sinonimos: ['lesao hepatica', 'hepatite medicamentosa', 'elevacao de transaminases', 'aumento de tgo e tgp', 'dano ao figado'],
};

const dados: ModuloDados = {
  // =================================================================
  // CLASSES
  // =================================================================
  classes: [
    // ---- Betalactâmicos ----
    {
      id: 'penicilinas',
      nome: 'Penicilinas',
      grupoId: 'antimicrobianos',
      familia: FAM_BETA,
      mecanismoCurto:
        'Betalactâmicos que se ligam às proteínas ligadoras de penicilina (PBPs) e inibem a transpeptidação do peptidoglicano, enfraquecendo a parede bacteriana e levando à lise (bactericidas).',
      sinonimos: ['penicilina', 'betalactamico', 'beta-lactamico', 'penicillins', 'aminopenicilinas', 'aminopenicilina'],
    },
    {
      id: 'cefalosporinas',
      nome: 'Cefalosporinas',
      grupoId: 'antimicrobianos',
      familia: FAM_BETA,
      mecanismoCurto:
        'Betalactâmicos com anel cefem que inibem as PBPs e a síntese da parede celular; organizadas em gerações conforme o espectro (de mais Gram-positivo na 1ª a mais Gram-negativo/Pseudomonas na 3ª–4ª).',
      sinonimos: ['cefalosporina', 'cephalosporins', 'cefalosporinicos', 'betalactamico', 'cefem'],
    },
    {
      id: 'carbapenemicos',
      nome: 'Carbapenêmicos',
      grupoId: 'antimicrobianos',
      familia: FAM_BETA,
      mecanismoCurto:
        'Betalactâmicos de espectro muito amplo, estáveis à maioria das betalactamases (inclusive ESBL e AmpC), que inibem as PBPs e a síntese da parede.',
      sinonimos: ['carbapenem', 'carbapenemico', 'carbapenems', 'carbapeneme', 'penems'],
    },
    {
      id: 'monobactamicos',
      nome: 'Monobactâmicos',
      grupoId: 'antimicrobianos',
      familia: FAM_BETA,
      mecanismoCurto:
        'Betalactâmicos monocíclicos (aztreonam) que se ligam à PBP3 de bacilos Gram-negativos aeróbios; sem atividade contra Gram-positivos ou anaeróbios.',
      sinonimos: ['monobactamico', 'monobactam', 'aztreonam'],
    },
    // ---- Outros antibacterianos ----
    {
      id: 'macrolideos',
      nome: 'Macrolídeos',
      grupoId: 'antimicrobianos',
      familia: FAM_OUTROS,
      mecanismoCurto:
        'Ligam-se ao RNA ribossômico 23S da subunidade 50S e bloqueiam a translocação/saída do peptídeo nascente, inibindo a síntese proteica (geralmente bacteriostáticos).',
      sinonimos: ['macrolideo', 'macrolides', 'inibidor da subunidade 50s', 'azalida'],
    },
    {
      id: 'fluoroquinolonas',
      nome: 'Fluoroquinolonas',
      grupoId: 'antimicrobianos',
      familia: FAM_OUTROS,
      mecanismoCurto:
        'Inibem a DNA-girase (topoisomerase II) e a topoisomerase IV bacterianas, estabilizando quebras do DNA e bloqueando a replicação (bactericidas, concentração-dependentes).',
      sinonimos: ['quinolonas', 'quinolona', 'fluoroquinolona', 'fq', 'inibidor da dna girase', 'inibidores da topoisomerase'],
    },
    {
      id: 'tetraciclinas',
      nome: 'Tetraciclinas',
      grupoId: 'antimicrobianos',
      familia: FAM_OUTROS,
      mecanismoCurto:
        'Ligam-se à subunidade ribossômica 30S e impedem a fixação do aminoacil-tRNA ao sítio A, inibindo a síntese proteica (bacteriostáticas).',
      sinonimos: ['tetraciclina', 'tetracyclines', 'ciclinas', 'inibidor da subunidade 30s'],
    },
    {
      id: 'lincosamidas',
      nome: 'Lincosamidas',
      grupoId: 'antimicrobianos',
      familia: FAM_OUTROS,
      mecanismoCurto:
        'Ligam-se à subunidade 50S (sítio que se sobrepõe ao dos macrolídeos) e inibem a formação da ligação peptídica; ativas contra Gram-positivos e anaeróbios.',
      sinonimos: ['lincosamida', 'lincosamides', 'lincomicinas'],
    },
    {
      id: 'aminoglicosideos',
      nome: 'Aminoglicosídeos',
      grupoId: 'antimicrobianos',
      familia: FAM_OUTROS,
      mecanismoCurto:
        'Ligam-se irreversivelmente à subunidade 30S, causando leitura errada do mRNA e proteínas defeituosas; bactericidas concentração-dependentes contra Gram-negativos aeróbios.',
      sinonimos: ['aminoglicosideo', 'aminoglycosides', 'aminoglicosidios'],
    },
    {
      id: 'glicopeptideos',
      nome: 'Glicopeptídeos',
      grupoId: 'antimicrobianos',
      familia: FAM_OUTROS,
      mecanismoCurto:
        'Ligam-se ao terminal D-alanil-D-alanina dos precursores do peptidoglicano e impedem sua polimerização e reticulação; ativos apenas contra Gram-positivos (inclusive MRSA).',
      sinonimos: ['glicopeptideo', 'glycopeptides', 'glicopeptidios'],
    },
    {
      id: 'sulfonamida-inibidor-dhfr',
      nome: 'Sulfonamida + inibidor da di-hidrofolato redutase',
      sigla: 'SMX-TMP',
      grupoId: 'antimicrobianos',
      familia: FAM_OUTROS,
      mecanismoCurto:
        'Bloqueio sequencial da síntese bacteriana de folato: a sulfonamida inibe a di-hidropteroato sintase e a trimetoprima inibe a di-hidrofolato redutase (DHFR).',
      sinonimos: [
        'sulfonamidas',
        'sulfonamida',
        'sulfas',
        'antifolatos',
        'inibidores da sintese de folato',
        'sulfonamida e trimetoprima',
        'cotrimoxazol',
        'inibidor da dhfr',
      ],
    },
    {
      id: 'nitroimidazois',
      nome: 'Nitroimidazóis',
      grupoId: 'antimicrobianos',
      familia: FAM_OUTROS,
      mecanismoCurto:
        'Pró-fármacos cujo grupo nitro é reduzido apenas em anaeróbios e protozoários, gerando radicais tóxicos que fragmentam o DNA.',
      sinonimos: ['nitroimidazol', 'nitroimidazoles', '5-nitroimidazois', 'nitroimidazolicos'],
    },
    // ---- Antifúngicos ----
    {
      id: 'azois-antifungicos',
      nome: 'Azóis antifúngicos (triazóis)',
      grupoId: 'antimicrobianos',
      familia: FAM_FUNGI,
      mecanismoCurto:
        'Inibem a 14α-desmetilase de lanosterol (CYP51) fúngica, reduzindo o ergosterol e acumulando esteróis tóxicos na membrana (fungistáticos contra Candida).',
      sinonimos: ['azois', 'azol', 'triazois', 'triazol', 'azoles', 'imidazois', 'inibidores da sintese de ergosterol'],
    },
    {
      id: 'polienos',
      nome: 'Polienos',
      grupoId: 'antimicrobianos',
      familia: FAM_FUNGI,
      mecanismoCurto:
        'Ligam-se ao ergosterol da membrana fúngica e formam poros, com perda de íons e morte celular (fungicidas); a afinidade residual pelo colesterol explica a toxicidade.',
      sinonimos: ['polieno', 'polyenes', 'antifungicos polienicos', 'macrolideos polienicos'],
    },
    {
      id: 'equinocandinas',
      nome: 'Equinocandinas',
      grupoId: 'antimicrobianos',
      familia: FAM_FUNGI,
      mecanismoCurto:
        'Inibem a β-(1,3)-D-glucana sintase e a síntese da parede celular fúngica (caspofungina, micafungina, anidulafungina).',
      sinonimos: ['equinocandina', 'echinocandins', 'inibidores da glucana sintase'],
    },
    // ---- Antivirais ----
    {
      id: 'analogos-nucleosideo-antiherpeticos',
      nome: 'Análogos de nucleosídeo anti-herpéticos',
      grupoId: 'antimicrobianos',
      familia: FAM_VIRUS,
      mecanismoCurto:
        'Análogos da guanosina fosforilados pela timidina-cinase viral; o trifosfato inibe a DNA-polimerase do herpesvírus e termina a cadeia de DNA.',
      sinonimos: [
        'analogos de nucleosideo',
        'analogo de nucleosideo',
        'analogos da guanosina',
        'inibidores da dna polimerase viral',
        'antiherpeticos',
        'anti-herpeticos',
        'nucleoside analogues',
      ],
    },
    {
      id: 'inibidores-neuraminidase',
      nome: 'Inibidores da neuraminidase',
      grupoId: 'antimicrobianos',
      familia: FAM_VIRUS,
      mecanismoCurto:
        'Análogos do ácido siálico que inibem a neuraminidase dos vírus influenza A e B, impedindo a liberação dos vírions da célula infectada.',
      sinonimos: ['inibidor da neuraminidase', 'neuraminidase inhibitors', 'antiinfluenza', 'anti-influenza'],
    },
  ],

  // =================================================================
  // MEDICAMENTOS
  // =================================================================
  medicamentos: [
    // ---------------------------------------------------------- AMOXICILINA
    {
      id: 'amoxicilina',
      nome: 'Amoxicilina',
      sinonimos: ['amoxicillin', 'amoxicilina tri-hidratada', 'amoxil'],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'penicilinas',
          subclasse: 'Aminopenicilina',
          contexto: 'infecções respiratórias altas e baixas comunitárias, otite e sinusite',
          explicacaoFase1:
            'Antibiótico de primeira linha para faringite estreptocócica, otite média aguda, sinusite bacteriana e pneumonia comunitária em adulto sem comorbidades; também compõe esquemas contra H. pylori.',
        },
      ],
      mecanismo:
        'Aminopenicilina que se liga às PBPs e inibe a transpeptidação do peptidoglicano, causando lise bacteriana. O grupo amino amplia a penetração em alguns Gram-negativos (H. influenzae, E. coli sensível). É hidrolisada por betalactamases, por isso é associada ao clavulanato quando há produção dessas enzimas.',
      indicacoes: [
        'Faringoamigdalite estreptocócica',
        'Otite média aguda e sinusite bacteriana aguda',
        'Pneumonia adquirida na comunidade (ambulatorial)',
        'Infecções do trato urinário por germes sensíveis',
        'Erradicação de Helicobacter pylori (em associação)',
        'Profilaxia de endocardite infecciosa em procedimentos odontológicos de risco',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['amoxicillin'],
      nomesComerciais: [
        pend('Amoxil', 'referencia', { fabricante: 'GSK' }),
        pend('Novocilin', 'marca', { fabricante: 'Aché' }),
        pend('Clavulin', 'combinacao', { composicao: 'amoxicilina + clavulanato de potássio', fabricante: 'GSK' }),
      ],
      generico: true,
      eaComuns: [
        T_DIARREIA,
        T_NAUSEA,
        {
          termo: 'Exantema maculopapular (especialmente na mononucleose)',
          sinonimos: ['rash', 'exantema', 'erupcao cutanea', 'manchas na pele', 'rash na mononucleose', 'exantema morbiliforme'],
        },
      ],
      eaGraves: [T_ANAFILAXIA, T_CDI],
      eaCaracteristico: 'Exantema maculopapular (especialmente na mononucleose)',
      distratoresEA: ['Ototoxicidade', 'Tendinopatia e ruptura de tendão', 'Fotossensibilidade', 'Síndrome do homem vermelho'],
      contraindicacoes: ['Hipersensibilidade a penicilinas ou histórico de anafilaxia a betalactâmicos'],
      precaucoes: [
        'Mononucleose infecciosa (alta incidência de exantema não alérgico)',
        'Ajustar dose na insuficiência renal grave',
        'Associação com clavulanato aumenta diarreia e risco de hepatite colestática',
      ],
      interacoes: [
        'Alopurinol: aumenta a incidência de exantema',
        'Metotrexato: redução da depuração renal, risco de toxicidade',
        'Probenecida: reduz a secreção tubular e eleva os níveis de amoxicilina',
        'Varfarina: possível aumento do INR',
      ],
      explicacaoFase2:
        'É uma penicilina (aminopenicilina): bloqueia as PBPs que fazem as ligações cruzadas da parede bacteriana, e a bactéria se rompe. Por ser betalactâmico, é destruída por betalactamases.',
      explicacaoFase3:
        'O exantema maculopapular é frequente e muito mais comum em pacientes com mononucleose (vírus Epstein-Barr), geralmente sem mecanismo IgE; deve ser distinguido da alergia verdadeira tipo I (urticária, anafilaxia).',
      referencias: [REF_GG, REF_KATZUNG, REF_RENAME, REF_AWARE, REF_FARINGITE, REF_PAC],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: RDC,
    },
    // ---------------------------------------------------------- AMPICILINA
    {
      id: 'ampicilina',
      nome: 'Ampicilina',
      sinonimos: ['ampicillin', 'ampicilina sodica'],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'penicilinas',
          subclasse: 'Aminopenicilina',
          contexto: 'infecções hospitalares por enterococo e Listeria; meningite neonatal',
          explicacaoFase1:
            'Usada principalmente por via parenteral contra Enterococcus faecalis e Listeria monocytogenes (por exemplo, na meningite em neonatos, idosos e imunossuprimidos) e, associada ao sulbactam, em infecções mistas.',
        },
      ],
      mecanismo:
        'Aminopenicilina que inibe as PBPs e a reticulação do peptidoglicano. Tem espectro semelhante ao da amoxicilina, porém menor biodisponibilidade oral, por isso é usada sobretudo IV. É inativada por betalactamases; o sulbactam protege a molécula.',
      indicacoes: [
        'Infecções por Enterococcus faecalis sensível (incluindo endocardite, com aminoglicosídeo)',
        'Meningite por Listeria monocytogenes e esquemas empíricos de meningite neonatal',
        'Infecções do trato urinário e intra-abdominais por germes sensíveis',
        'Associada ao sulbactam: infecções mistas, pneumonia aspirativa, pé diabético',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['ampicillin'],
      nomesComerciais: [
        pend('Binotal', 'referencia', { fabricante: 'Bayer' }),
        pend('Unasyn', 'combinacao', { composicao: 'ampicilina + sulbactam', fabricante: 'Pfizer', obs: 'uso hospitalar' }),
      ],
      generico: true,
      eaComuns: [
        T_DIARREIA,
        {
          termo: 'Exantema maculopapular (especialmente na mononucleose)',
          sinonimos: ['rash', 'exantema', 'erupcao cutanea', 'rash na mononucleose', 'exantema morbiliforme'],
        },
        { termo: 'Flebite no local de infusão', sinonimos: ['flebite', 'dor no acesso venoso', 'tromboflebite'] },
      ],
      eaGraves: [T_ANAFILAXIA, T_CDI],
      eaCaracteristico: 'Exantema maculopapular (especialmente na mononucleose)',
      distratoresEA: ['Nefrotoxicidade cumulativa', 'Descoloração dentária', 'Prolongamento do intervalo QT', 'Gosto metálico'],
      contraindicacoes: ['Hipersensibilidade a penicilinas'],
      precaucoes: ['Mononucleose infecciosa', 'Ajuste de dose na insuficiência renal'],
      interacoes: [
        'Alopurinol: aumenta a incidência de exantema',
        'Aminoglicosídeos: sinergismo contra enterococo, mas não devem ser misturados no mesmo frasco (inativação)',
        'Probenecida: eleva níveis séricos',
        'Metotrexato: redução da depuração',
      ],
      explicacaoFase2:
        'Penicilina do subgrupo das aminopenicilinas: impede a montagem da parede celular ao inibir as PBPs, causando lise da bactéria.',
      explicacaoFase3:
        'Como a amoxicilina, causa exantema não alérgico com grande frequência na mononucleose; essa reação deve ser diferenciada da alergia IgE-mediada.',
      referencias: [REF_GG, REF_KATZUNG, REF_RENAME, REF_AWARE],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: RDC,
    },
    // ---------------------------------------------------------- PENICILINA G
    {
      id: 'benzilpenicilina',
      nome: 'Penicilina G (benzilpenicilina)',
      sinonimos: [
        'penicilina g',
        'benzilpenicilina',
        'benzylpenicillin',
        'penicillin g',
        'penicilina benzatina',
        'benzilpenicilina benzatina',
        'benzetacil',
        'penicilina cristalina',
        'penicilina g potassica',
        'benzilpenicilina potassica',
        'penicilina procaina',
        'benzilpenicilina procaina',
      ],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'penicilinas',
          subclasse: 'Penicilina natural',
          contexto: 'sífilis, faringite estreptocócica e profilaxia da febre reumática',
          explicacaoFase1:
            'A forma benzatina (IM de depósito) é o tratamento de escolha da sífilis, inclusive na gestação, da faringite estreptocócica e da profilaxia secundária da febre reumática; a forma cristalina (IV) trata neurossífilis, sífilis congênita e infecções estreptocócicas graves.',
        },
      ],
      mecanismo:
        'Penicilina natural que inibe as PBPs e a transpeptidação do peptidoglicano, com ação bactericida. Tem espectro estreito, principalmente Gram-positivos (estreptococos), Treponema pallidum, Neisseria meningitidis e alguns anaeróbios. É inativada pelas betalactamases e pelo ácido gástrico, por isso é usada IM ou IV. Os sais benzatina e procaína liberam o fármaco lentamente.',
      indicacoes: [
        'Sífilis adquirida, sífilis na gestação e sífilis congênita (benzatina IM; neurossífilis e congênita com cristalina IV)',
        'Faringoamigdalite por Streptococcus pyogenes (benzatina IM, dose única)',
        'Profilaxia secundária da febre reumática (benzatina a cada 21 dias)',
        'Infecções estreptocócicas e pneumocócicas graves, endocardite por estreptococo sensível, meningococcemia (cristalina IV)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['benzylpenicillin'],
      nomesComerciais: [pend('Benzetacil', 'referencia', { fabricante: 'Eurofarma', obs: 'benzilpenicilina benzatina, uso IM' })],
      generico: true,
      eaComuns: [
        { termo: 'Dor no local da injeção', sinonimos: ['dor na aplicacao', 'dor intramuscular', 'reacao local'] },
        {
          termo: 'Reação de Jarisch-Herxheimer',
          sinonimos: ['jarisch herxheimer', 'herxheimer', 'febre apos tratar sifilis', 'reacao de herxheimer'],
        },
      ],
      eaGraves: [
        T_ANAFILAXIA,
        {
          termo: 'Síndrome de Nicolau (necrose por injeção intra-arterial acidental)',
          sinonimos: ['sindrome de nicolau', 'embolia cutis medicamentosa', 'necrose no local da injecao'],
        },
        { termo: 'Convulsões em altas doses IV', sinonimos: ['convulsao', 'neurotoxicidade', 'crise convulsiva'] },
      ],
      eaCaracteristico: 'Anafilaxia',
      distratoresEA: ['Ototoxicidade', 'Síndrome do bebê cinzento', 'Fotossensibilidade', 'Prolongamento do intervalo QT'],
      contraindicacoes: [
        'Hipersensibilidade grave a penicilinas (na gestante com sífilis, a conduta é dessensibilização, pois só a penicilina trata o feto)',
        'Benzatina: nunca administrar por via intravenosa',
      ],
      precaucoes: [
        'Altas doses de penicilina G potássica: risco de hipercalemia e convulsões na insuficiência renal',
        'Aplicação IM profunda, no glúteo, com técnica adequada',
      ],
      interacoes: [
        'Probenecida: prolonga os níveis séricos (usada intencionalmente em alguns esquemas)',
        'Antibacterianos bacteriostáticos (tetraciclinas): possível antagonismo teórico',
        'Metotrexato: redução da depuração',
      ],
      explicacaoFase2:
        'É a penicilina natural: como todo betalactâmico, inibe as PBPs e a síntese da parede celular. Tem espectro estreito, ótimo contra estreptococos e o treponema da sífilis.',
      explicacaoFase3:
        'O efeito adverso grave típico é a hipersensibilidade imediata (IgE) ao núcleo betalactâmico, que pode chegar à anafilaxia; ainda assim a anafilaxia verdadeira é rara e não justifica deixar de tratar sífilis na atenção básica.',
      referencias: [REF_GG, REF_KATZUNG, REF_IST, REF_RENAME, REF_AWARE, REF_FARINGITE],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: RDC,
    },
    // ---------------------------------------------------------- OXACILINA
    {
      id: 'oxacilina',
      nome: 'Oxacilina',
      sinonimos: ['oxacillin', 'oxacilina sodica', 'penicilina antiestafilococica'],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'penicilinas',
          subclasse: 'Penicilina resistente à penicilinase (antiestafilocócica)',
          contexto: 'infecções graves por Staphylococcus aureus sensível à oxacilina (MSSA)',
          explicacaoFase1:
            'Usada IV em infecções graves por S. aureus sensível à meticilina/oxacilina (MSSA), como bacteremia, endocardite, osteomielite e celulite grave; a resistência a ela define o MRSA.',
        },
      ],
      mecanismo:
        'Penicilina com cadeia lateral volumosa que impede a hidrólise pela penicilinase estafilocócica, mantendo a inibição das PBPs. Não age contra MRSA, que expressa a PBP2a (gene mecA) de baixa afinidade pelos betalactâmicos, nem contra enterococos e a maioria dos Gram-negativos.',
      indicacoes: [
        'Bacteremia e endocardite por S. aureus sensível à oxacilina',
        'Osteomielite, artrite séptica e infecções graves de pele e partes moles por MSSA',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['oxacillin'],
      nomesComerciais: [],
      generico: true,
      eaComuns: [{ termo: 'Flebite no local de infusão', sinonimos: ['flebite', 'tromboflebite', 'dor no acesso venoso'] }],
      eaGraves: [
        { ...T_HEPATO, termo: 'Hepatotoxicidade (elevação de transaminases)' },
        { termo: 'Neutropenia', sinonimos: ['leucopenia', 'queda dos neutrofilos', 'granulocitopenia'] },
        { termo: 'Nefrite intersticial aguda', sinonimos: ['nefrite intersticial', 'nia', 'lesao renal alergica'] },
        T_ANAFILAXIA,
      ],
      eaCaracteristico: 'Hepatotoxicidade (elevação de transaminases)',
      distratoresEA: ['Ototoxicidade', 'Síndrome do homem vermelho', 'Tendinopatia e ruptura de tendão', 'Gosto metálico'],
      contraindicacoes: ['Hipersensibilidade a penicilinas'],
      precaucoes: ['Monitorar hemograma e enzimas hepáticas em tratamentos prolongados (endocardite, osteomielite)'],
      interacoes: ['Probenecida: eleva níveis séricos', 'Metotrexato: redução da depuração'],
      explicacaoFase2:
        'Penicilina antiestafilocócica: tem uma cadeia lateral que a protege da penicilinase do estafilococo, então continua bloqueando as PBPs e a síntese de parede do S. aureus sensível.',
      explicacaoFase3:
        'Em cursos prolongados de altas doses IV, a oxacilina associa-se a elevação de transaminases/hepatite, além de neutropenia e nefrite intersticial, exigindo monitoramento laboratorial semanal.',
      referencias: [REF_GG, REF_KATZUNG, REF_RENAME],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: RDC,
    },
    // ---------------------------------------------------------- CEFALEXINA
    {
      id: 'cefalexina',
      nome: 'Cefalexina',
      sinonimos: ['cephalexin', 'cefalexin', 'cefalexina monoidratada'],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'cefalosporinas',
          subclasse: 'Cefalosporina de 1ª geração',
          contexto: 'infecções de pele e partes moles não complicadas (celulite, impetigo)',
          explicacaoFase1:
            'Cefalosporina oral de primeira linha para celulite não purulenta e outras infecções de pele por estreptococo e S. aureus sensível; também é opção na faringite e na cistite em gestantes.',
        },
      ],
      mecanismo:
        'Cefalosporina de 1ª geração que inibe as PBPs e a síntese do peptidoglicano. Tem boa atividade contra cocos Gram-positivos (estreptococos, MSSA) e atividade limitada contra alguns Gram-negativos comunitários (E. coli, Proteus, Klebsiella). Não atua contra MRSA nem enterococos.',
      indicacoes: [
        'Infecções de pele e partes moles (celulite não purulenta, impetigo, erisipela)',
        'Faringoamigdalite estreptocócica (alternativa em alergia não grave à penicilina)',
        'Infecções do trato urinário por germes sensíveis, inclusive na gestação',
        'Infecções ósseas por germes sensíveis (continuação oral)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['cephalexin'],
      nomesComerciais: [pend('Keflex', 'referencia')],
      generico: true,
      eaComuns: [
        T_DIARREIA,
        T_NAUSEA,
        { termo: 'Reação de hipersensibilidade cutânea (exantema, urticária)', sinonimos: ['rash', 'urticaria', 'alergia na pele', 'exantema'] },
      ],
      eaGraves: [T_ANAFILAXIA, T_CDI],
      eaCaracteristico: 'Reação de hipersensibilidade cutânea (exantema, urticária)',
      distratoresEA: ['Ototoxicidade', 'Tendinopatia e ruptura de tendão', 'Síndrome do homem vermelho', 'Gosto metálico'],
      contraindicacoes: ['Hipersensibilidade a cefalosporinas', 'Histórico de anafilaxia a penicilinas (evitar; risco de reação cruzada)'],
      precaucoes: ['Ajustar dose na insuficiência renal', 'Reatividade cruzada com penicilinas é baixa, mas maior nas cefalosporinas de 1ª geração'],
      interacoes: ['Probenecida: eleva níveis séricos', 'Metformina: a cefalexina pode elevar os níveis de metformina por competição na secreção tubular'],
      explicacaoFase2:
        'É uma cefalosporina de 1ª geração: betalactâmico que inibe a síntese da parede celular, com espectro focado em cocos Gram-positivos.',
      explicacaoFase3:
        'O efeito mais característico de toda cefalosporina é a hipersensibilidade (exantema, urticária e raramente anafilaxia), com pequena reatividade cruzada com penicilinas, relacionada à semelhança das cadeias laterais.',
      referencias: [REF_GG, REF_KATZUNG, REF_RENAME, REF_AWARE, REF_PELE],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: RDC,
    },
    // ---------------------------------------------------------- CEFUROXIMA
    {
      id: 'cefuroxima',
      nome: 'Cefuroxima',
      sinonimos: ['cefuroxime', 'cefuroxima axetil', 'cefuroxima sodica', 'cefuroxime axetil'],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'cefalosporinas',
          subclasse: 'Cefalosporina de 2ª geração',
          contexto: 'infecções respiratórias comunitárias e profilaxia cirúrgica',
          explicacaoFase1:
            'Usada em sinusite, otite e pneumonia comunitária (inclusive H. influenzae e Moraxella produtores de betalactamase), em infecções urinárias e na profilaxia cirúrgica; a forma axetil é oral e a sódica, parenteral.',
        },
      ],
      mecanismo:
        'Cefalosporina de 2ª geração que inibe as PBPs. Mantém atividade contra Gram-positivos e é mais estável que a 1ª geração frente a betalactamases de H. influenzae e Moraxella catarrhalis, ampliando a cobertura respiratória.',
      indicacoes: [
        'Sinusite, otite média e exacerbações bacterianas de DPOC',
        'Pneumonia adquirida na comunidade',
        'Infecções do trato urinário e de pele por germes sensíveis',
        'Doença de Lyme inicial',
        'Profilaxia cirúrgica (forma parenteral)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['cefuroxime'],
      nomesComerciais: [
        pend('Zinnat', 'referencia', { fabricante: 'GSK', obs: 'cefuroxima axetil, oral' }),
        pend('Zinacef', 'referencia', { fabricante: 'GSK', obs: 'cefuroxima sódica, parenteral; uso hospitalar' }),
      ],
      generico: true,
      eaComuns: [T_DIARREIA, T_NAUSEA],
      eaGraves: [T_ANAFILAXIA, T_CDI],
      eaCaracteristico: 'Diarreia',
      distratoresEA: ['Ototoxicidade', 'Fotossensibilidade', 'Tendinopatia e ruptura de tendão', 'Hipercalemia'],
      contraindicacoes: ['Hipersensibilidade a cefalosporinas', 'Histórico de anafilaxia a penicilinas (evitar)'],
      precaucoes: ['Comprimido axetil deve ser tomado com alimento (aumenta a absorção)', 'Ajuste de dose na insuficiência renal'],
      interacoes: [
        'Antiácidos e bloqueadores H2/IBP: reduzem a absorção da cefuroxima axetil',
        'Probenecida: eleva níveis séricos',
      ],
      explicacaoFase2:
        'Cefalosporina de 2ª geração: inibe a síntese da parede bacteriana e resiste melhor às betalactamases de germes respiratórios como H. influenzae.',
      explicacaoFase3:
        'A diarreia é o efeito mais frequente, ligada à alteração da microbiota intestinal e à fração não absorvida do éster axetil; em casos graves, investigar C. difficile.',
      referencias: [REF_GG, REF_KATZUNG, REF_AWARE],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: RDC,
    },
    // ---------------------------------------------------------- CEFTRIAXONA
    {
      id: 'ceftriaxona',
      nome: 'Ceftriaxona',
      sinonimos: ['ceftriaxone', 'ceftriaxona sodica', 'rocefin'],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'cefalosporinas',
          subclasse: 'Cefalosporina de 3ª geração',
          contexto: 'pneumonia hospitalizada, meningite bacteriana, gonorreia e pielonefrite',
          explicacaoFase1:
            'Cefalosporina parenteral de uso amplo: pneumonia comunitária internada (com macrolídeo), meningite bacteriana empírica, pielonefrite, gonorreia (IM) e neurossífilis em alérgicos selecionados.',
        },
      ],
      mecanismo:
        'Cefalosporina de 3ª geração que inibe as PBPs, com boa atividade contra Enterobacterales não produtoras de ESBL, pneumococo, Haemophilus, Neisseria e alta penetração no líquor. Tem meia-vida longa (dose única diária) e excreção biliar e renal. Não cobre Pseudomonas, enterococos nem MRSA.',
      indicacoes: [
        'Pneumonia adquirida na comunidade em pacientes internados',
        'Meningite bacteriana (empírica, associada à vancomicina quando indicado)',
        'Gonorreia e doença inflamatória pélvica',
        'Pielonefrite e infecções urinárias complicadas',
        'Infecções intra-abdominais (com metronidazol) e sepse de foco comunitário',
        'Doença de Lyme com acometimento neurológico ou cardíaco',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['ceftriaxone'],
      nomesComerciais: [pend('Rocefin', 'referencia', { fabricante: 'Roche', obs: 'uso IM/IV' })],
      generico: true,
      eaComuns: [
        T_DIARREIA,
        { termo: 'Dor no local da injeção', sinonimos: ['dor na aplicacao', 'flebite', 'reacao local'] },
        {
          termo: 'Pseudolitíase biliar (precipitação de ceftriaxona-cálcio)',
          sinonimos: ['pseudolitiase', 'barro biliar', 'lama biliar', 'calculo biliar', 'precipitado na vesicula', 'colelitiase'],
        },
      ],
      eaGraves: [
        T_ANAFILAXIA,
        T_CDI,
        {
          termo: 'Precipitação ceftriaxona-cálcio em neonatos',
          sinonimos: ['precipitacao com calcio', 'precipitado pulmonar e renal', 'kernicterus'],
        },
      ],
      eaCaracteristico: 'Pseudolitíase biliar (precipitação de ceftriaxona-cálcio)',
      distratoresEA: ['Ototoxicidade', 'Síndrome do homem vermelho', 'Descoloração dentária', 'Tendinopatia e ruptura de tendão'],
      contraindicacoes: [
        'Hipersensibilidade a cefalosporinas',
        'Neonatos com hiperbilirrubinemia (desloca a bilirrubina da albumina)',
        'Neonatos recebendo soluções IV com cálcio',
      ],
      precaucoes: [
        'Não misturar nem infundir simultaneamente com soluções contendo cálcio (Ringer lactato) na mesma via',
        'Histórico de anafilaxia a penicilinas',
      ],
      interacoes: ['Soluções com cálcio: precipitação', 'Varfarina: possível aumento do INR'],
      explicacaoFase2:
        'Cefalosporina de 3ª geração: inibe as PBPs, com espectro deslocado para Gram-negativos, boa cobertura de pneumococo e meninges, e posologia uma vez ao dia.',
      explicacaoFase3:
        'Como é muito excretada pela bile, a ceftriaxona pode precipitar com o cálcio na vesícula, formando a pseudolitíase biliar, geralmente reversível após suspensão; o mesmo fenômeno explica o risco de precipitação em neonatos que recebem cálcio IV.',
      referencias: [REF_GG, REF_KATZUNG, REF_IST, REF_PAC, REF_AWARE, REF_RENAME],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: RDC,
    },
    // ---------------------------------------------------------- CEFEPIMA
    {
      id: 'cefepima',
      nome: 'Cefepima',
      sinonimos: ['cefepime', 'cloridrato de cefepima', 'cefepime hydrochloride'],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'cefalosporinas',
          subclasse: 'Cefalosporina de 4ª geração',
          contexto: 'infecções hospitalares por Gram-negativos incluindo Pseudomonas; neutropenia febril',
          explicacaoFase1:
            'Antibiótico hospitalar para pneumonia hospitalar, neutropenia febril e infecções por Pseudomonas aeruginosa e Enterobacterales com AmpC, conforme perfil local.',
        },
      ],
      mecanismo:
        'Cefalosporina de 4ª geração (zwitteriônica) que penetra rapidamente a membrana externa de Gram-negativos e inibe as PBPs. É mais estável frente às betalactamases AmpC cromossômicas, cobre Pseudomonas aeruginosa e mantém boa ação contra Gram-positivos (MSSA, estreptococos). É hidrolisada por ESBL e carbapenemases.',
      indicacoes: [
        'Pneumonia hospitalar e associada à ventilação',
        'Neutropenia febril (empírica)',
        'Infecções urinárias complicadas, intra-abdominais (com metronidazol) e de pele por Gram-negativos sensíveis',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['cefepime'],
      nomesComerciais: [pend('Maxcef', 'referencia', { fabricante: 'Bristol-Myers Squibb', obs: 'uso hospitalar' })],
      generico: true,
      eaComuns: [T_DIARREIA, { termo: 'Flebite no local de infusão', sinonimos: ['flebite', 'tromboflebite'] }],
      eaGraves: [
        {
          termo: 'Neurotoxicidade (encefalopatia, mioclonia, estado de mal não convulsivo)',
          sinonimos: [
            'neurotoxicidade',
            'encefalopatia',
            'confusao mental',
            'mioclonia',
            'convulsoes',
            'estado de mal nao convulsivo',
            'rebaixamento de consciencia',
          ],
        },
        T_ANAFILAXIA,
        T_CDI,
      ],
      eaCaracteristico: 'Neurotoxicidade (encefalopatia, mioclonia, estado de mal não convulsivo)',
      distratoresEA: ['Ototoxicidade', 'Pseudolitíase biliar', 'Fotossensibilidade', 'Síndrome do homem vermelho'],
      contraindicacoes: ['Hipersensibilidade a cefalosporinas ou anafilaxia a betalactâmicos'],
      precaucoes: ['Ajuste obrigatório de dose na insuficiência renal (acúmulo causa neurotoxicidade)', 'Idosos'],
      interacoes: ['Aminoglicosídeos e diuréticos de alça: potencial aumento de nefrotoxicidade'],
      explicacaoFase2:
        'Cefalosporina de 4ª geração: atravessa bem a membrana dos Gram-negativos, resiste às betalactamases AmpC e cobre Pseudomonas, além de Gram-positivos.',
      explicacaoFase3:
        'Os betalactâmicos antagonizam o receptor GABA-A em altas concentrações; com a cefepima isso aparece sobretudo em idosos e renais sem ajuste de dose, como encefalopatia, mioclonia e estado de mal não convulsivo.',
      referencias: [REF_GG, REF_KATZUNG, REF_AWARE, 'FDA. Cefepime — Drug Safety Communication on non-convulsive status epilepticus (2012)'],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: RDC,
    },
    // ---------------------------------------------------------- MEROPENÉM
    {
      id: 'meropenem',
      nome: 'Meropeném',
      sinonimos: ['meropenem', 'meropeneme', 'meropenem tri-hidratado'],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'carbapenemicos',
          contexto: 'infecções hospitalares graves por Gram-negativos multirresistentes (ESBL)',
          explicacaoFase1:
            'Reservado para infecções graves hospitalares, especialmente por Enterobacterales produtoras de ESBL, além de meningite nosocomial e neutropenia febril grave; seu uso é monitorado por programas de stewardship.',
        },
      ],
      mecanismo:
        'Carbapenêmico que inibe as PBPs com afinidade alta e é estável à maioria das betalactamases, incluindo ESBL e AmpC. Cobre Gram-positivos (não MRSA), Gram-negativos incluindo Pseudomonas e anaeróbios. É inativado por carbapenemases (KPC, NDM, OXA-48).',
      indicacoes: [
        'Infecções intra-abdominais complicadas e sepse de foco hospitalar',
        'Pneumonia hospitalar e associada à ventilação',
        'Meningite bacteriana (inclusive nosocomial)',
        'Neutropenia febril',
        'Infecções por Enterobacterales produtoras de ESBL',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['meropenem'],
      nomesComerciais: [pend('Meronem', 'referencia', { fabricante: 'AstraZeneca', obs: 'uso hospitalar' })],
      generico: true,
      eaComuns: [T_DIARREIA, T_NAUSEA, { termo: 'Cefaleia', sinonimos: ['dor de cabeca'] }],
      eaGraves: [
        {
          termo: 'Convulsões (menor risco que imipeném)',
          sinonimos: ['convulsao', 'crise convulsiva', 'crise epileptica', 'neurotoxicidade'],
        },
        T_ANAFILAXIA,
        T_CDI,
      ],
      eaCaracteristico: 'Convulsões (menor risco que imipeném)',
      distratoresEA: ['Ototoxicidade', 'Síndrome do homem vermelho', 'Fotossensibilidade', 'Pseudolitíase biliar'],
      contraindicacoes: ['Hipersensibilidade a carbapenêmicos', 'Anafilaxia prévia a outros betalactâmicos'],
      precaucoes: ['Ajuste de dose na insuficiência renal', 'Doenças do SNC ou epilepsia', 'Seleção de resistência (KPC) com uso indiscriminado'],
      interacoes: [
        'Ácido valproico: queda acentuada dos níveis de valproato com risco de convulsões (evitar a associação)',
        'Probenecida: eleva níveis do meropeném',
      ],
      explicacaoFase2:
        'É um carbapenêmico: betalactâmico de espectro muito amplo, resistente à maioria das betalactamases, inclusive ESBL, que inibe a síntese da parede bacteriana.',
      explicacaoFase3:
        'Por antagonismo do GABA-A no SNC, os carbapenêmicos podem causar convulsões, sobretudo em renais e pacientes com lesão neurológica; o meropeném tem risco menor que o imipeném.',
      referencias: [REF_GG, REF_KATZUNG, REF_AWARE, REF_RENAME],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: RDC,
    },
    // ---------------------------------------------------------- AZITROMICINA
    {
      id: 'azitromicina',
      nome: 'Azitromicina',
      sinonimos: ['azithromycin', 'azitromicina di-hidratada', 'azalida'],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'macrolideos',
          subclasse: 'Azalida',
          contexto: 'pneumonia comunitária (atípicos), clamídia e uretrites',
          explicacaoFase1:
            'Cobre germes atípicos (Mycoplasma, Chlamydophila, Legionella) na pneumonia comunitária, trata clamídia e uretrites e é alternativa na faringite em alérgicos graves à penicilina.',
        },
      ],
      mecanismo:
        'Azalida (macrolídeo de 15 átomos) que se liga ao 23S rRNA da subunidade 50S e bloqueia a síntese proteica. Concentra-se intensamente nos tecidos e fagócitos, o que permite esquemas curtos (3–5 dias) e meia-vida longa. Inibe pouco o CYP3A4, ao contrário de eritromicina e claritromicina.',
      indicacoes: [
        'Pneumonia adquirida na comunidade (associada a betalactâmico, ou isolada em situações selecionadas)',
        'Infecção por Chlamydia trachomatis, uretrite e cervicite (PCDT IST)',
        'Faringite, sinusite e otite em alérgicos à penicilina',
        'Coqueluche',
        'Exacerbações de DPOC',
      ],
      offLabel: ['Profilaxia de exacerbações em DPOC e bronquiectasias (uso contínuo, off-label)'],
      tipoMolecula: 'pequena',
      pubchem: ['azithromycin'],
      nomesComerciais: [pend('Zitromax', 'referencia', { fabricante: 'Pfizer' }), pend('Astro', 'marca', { fabricante: 'Eurofarma' })],
      generico: true,
      eaComuns: [T_DIARREIA, T_NAUSEA, { termo: 'Dor abdominal', sinonimos: ['colica abdominal', 'dor de barriga'] }],
      eaGraves: [T_QT, T_HEPATO],
      eaCaracteristico: 'Prolongamento do intervalo QT',
      distratoresEA: ['Nefrotoxicidade', 'Síndrome do homem vermelho', 'Pseudolitíase biliar', 'Descoloração dentária'],
      contraindicacoes: ['Hipersensibilidade a macrolídeos', 'Histórico de icterícia colestática associada ao uso prévio de azitromicina'],
      precaucoes: [
        'QT longo congênito ou adquirido, hipocalemia, hipomagnesemia, bradicardia',
        'Miastenia gravis (pode exacerbar)',
        'Doença hepática',
      ],
      interacoes: [
        'Outros fármacos que prolongam o QT (antiarrítmicos classe IA/III, antipsicóticos, fluoroquinolonas)',
        'Varfarina: possível aumento do INR',
        'Antiácidos com alumínio/magnésio: reduzem o pico sérico',
      ],
      explicacaoFase2:
        'Macrolídeo (azalida): liga-se à subunidade 50S do ribossomo e bloqueia a síntese de proteínas bacterianas; acumula-se nos tecidos, por isso o tratamento é curto.',
      explicacaoFase3:
        'Os macrolídeos bloqueiam canais de potássio hERG da repolarização ventricular, prolongando o QT; a azitromicina tem alerta da FDA para morte cardiovascular em pacientes de risco.',
      referencias: [REF_GG, REF_KATZUNG, REF_IST, REF_PAC, REF_AWARE, 'FDA Drug Safety Communication — azithromycin and QT prolongation (2013)'],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: RDC,
    },
    // ---------------------------------------------------------- CLARITROMICINA
    {
      id: 'claritromicina',
      nome: 'Claritromicina',
      sinonimos: ['clarithromycin'],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'macrolideos',
          contexto: 'erradicação do H. pylori, pneumonia comunitária e micobactérias atípicas',
          explicacaoFase1:
            'Usada na terapia tripla contra Helicobacter pylori (com amoxicilina e IBP), em pneumonia comunitária, infecções respiratórias em alérgicos e no complexo Mycobacterium avium.',
        },
      ],
      mecanismo:
        'Macrolídeo semissintético (14 átomos) que se liga à subunidade 50S e inibe a síntese proteica. É mais estável em meio ácido e mais ativo contra H. pylori e micobactérias atípicas que a eritromicina. É potente inibidor do CYP3A4 e da glicoproteína P.',
      indicacoes: [
        'Erradicação de Helicobacter pylori (terapia tripla)',
        'Pneumonia adquirida na comunidade, sinusite e faringite',
        'Infecções de pele não complicadas',
        'Tratamento e profilaxia do complexo Mycobacterium avium',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['clarithromycin'],
      nomesComerciais: [pend('Klaricid', 'referencia', { fabricante: 'Abbott' })],
      generico: true,
      eaComuns: [
        { termo: 'Disgeusia (gosto metálico ou amargo)', sinonimos: ['gosto metalico', 'gosto amargo', 'alteracao do paladar', 'disgeusia'] },
        T_DIARREIA,
        T_NAUSEA,
      ],
      eaGraves: [T_QT, T_HEPATO],
      eaCaracteristico: 'Disgeusia (gosto metálico ou amargo)',
      distratoresEA: ['Fotossensibilidade', 'Nefrotoxicidade', 'Síndrome do homem vermelho', 'Tendinopatia e ruptura de tendão'],
      contraindicacoes: [
        'Hipersensibilidade a macrolídeos',
        'Uso com sinvastatina ou lovastatina, ergotamínicos, pimozida, cisaprida, ticagrelor ou colchicina em insuficiência renal/hepática',
        'QT longo ou hipocalemia não corrigida',
      ],
      precaucoes: ['Insuficiência renal (ajuste de dose)', 'Doença coronariana (aumento de mortalidade cardiovascular em seguimento longo)'],
      interacoes: [
        'Sinvastatina/lovastatina: rabdomiólise (inibição do CYP3A4)',
        'Colchicina: toxicidade grave (inibição de CYP3A4 e P-gp)',
        'Digoxina: aumento dos níveis (inibição da P-gp)',
        'Bloqueadores de canal de cálcio: hipotensão',
        'Varfarina: aumento do INR',
        'Fármacos que prolongam o QT',
      ],
      explicacaoFase2:
        'Macrolídeo: bloqueia a síntese proteica na subunidade 50S. Comparada à eritromicina, é mais estável no estômago e mais ativa contra H. pylori.',
      explicacaoFase3:
        'A alteração do paladar (gosto metálico/amargo) é a queixa mais característica; clinicamente, porém, o maior risco são as interações por inibição do CYP3A4.',
      referencias: [REF_GG, REF_KATZUNG, REF_AWARE, 'FBG. IV Consenso Brasileiro sobre Infecção por Helicobacter pylori (2018)'],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: RDC,
    },
    // ---------------------------------------------------------- ERITROMICINA
    {
      id: 'eritromicina',
      nome: 'Eritromicina',
      sinonimos: ['erythromycin', 'estolato de eritromicina', 'estearato de eritromicina', 'etilsuccinato de eritromicina'],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'macrolideos',
          contexto: 'alternativa em alérgicos à penicilina; protótipo dos macrolídeos',
          explicacaoFase1:
            'Primeiro macrolídeo, hoje menos usado por intolerância gastrointestinal e interações; é alternativa à penicilina em alérgicos, trata coqueluche e infecções por clamídia, e é usado como procinético (off-label).',
        },
      ],
      mecanismo:
        'Macrolídeo natural (14 átomos) que se liga ao 23S rRNA da subunidade 50S e bloqueia a translocação, inibindo a síntese proteica. É instável em meio ácido, exigindo sais ou revestimento entérico. Também é agonista do receptor de motilina no trato gastrointestinal e inibidor do CYP3A4.',
      indicacoes: [
        'Infecções por estreptococos em alérgicos à penicilina',
        'Coqueluche',
        'Infecções por Chlamydia trachomatis, inclusive conjuntivite neonatal',
        'Difteria (erradicação do estado de portador)',
        'Acne (tópica)',
      ],
      offLabel: ['Procinético na gastroparesia e antes de endoscopia digestiva alta (agonismo do receptor de motilina)'],
      tipoMolecula: 'pequena',
      pubchem: ['erythromycin'],
      nomesComerciais: [pend('Ilosone', 'referencia', { obs: 'estolato de eritromicina' })],
      generico: true,
      eaComuns: [
        {
          termo: 'Intolerância gastrointestinal (cólicas, náuseas, diarreia)',
          sinonimos: [
            'colica abdominal',
            'dor abdominal',
            'intolerancia gastrointestinal',
            'aumento da motilidade intestinal',
            'efeitos gastrointestinais',
          ],
        },
      ],
      eaGraves: [
        { termo: 'Hepatite colestática (estolato)', sinonimos: ['ictericia colestatica', 'colestase', 'hepatite'] },
        T_QT,
        {
          termo: 'Estenose hipertrófica do piloro em lactentes',
          sinonimos: ['estenose do piloro', 'estenose pilorica'],
        },
      ],
      eaCaracteristico: 'Intolerância gastrointestinal (cólicas, náuseas, diarreia)',
      distratoresEA: ['Nefrotoxicidade', 'Ruptura de tendão', 'Fotossensibilidade', 'Síndrome do homem vermelho'],
      contraindicacoes: [
        'Hipersensibilidade a macrolídeos',
        'Uso com sinvastatina/lovastatina, ergotamínicos, pimozida ou cisaprida',
        'Estolato: doença hepática',
      ],
      precaucoes: ['QT longo e distúrbios eletrolíticos', 'Lactentes nas primeiras semanas de vida'],
      interacoes: [
        'Inibe o CYP3A4: aumenta níveis de teofilina, carbamazepina, ciclosporina, estatinas, varfarina',
        'Fármacos que prolongam o QT',
        'Clindamicina e cloranfenicol: antagonismo no ribossomo 50S',
      ],
      explicacaoFase2:
        'Macrolídeo protótipo: liga-se à subunidade 50S e inibe a síntese de proteínas da bactéria.',
      explicacaoFase3:
        'A eritromicina estimula o receptor de motilina e acelera o trânsito gastrointestinal, por isso causa cólicas, náuseas e diarreia com muita frequência (efeito explorado como procinético).',
      referencias: [REF_GG, REF_KATZUNG, REF_RANG, REF_AWARE],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: RDC,
    },
    // ---------------------------------------------------------- CIPROFLOXACINO
    {
      id: 'ciprofloxacino',
      nome: 'Ciprofloxacino',
      sinonimos: ['ciprofloxacina', 'ciprofloxacin', 'cloridrato de ciprofloxacino', 'cipro'],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'fluoroquinolonas',
          subclasse: 'Fluoroquinolona de 2ª geração',
          contexto: 'pielonefrite, infecções urinárias complicadas e infecções por Gram-negativos',
          explicacaoFase1:
            'Fluoroquinolona com foco em Gram-negativos, inclusive Pseudomonas: pielonefrite, ITU complicada, diarreia bacteriana e infecções ósseas; deve ser poupada na cistite não complicada.',
        },
      ],
      mecanismo:
        'Inibe a DNA-girase (principal alvo em Gram-negativos) e a topoisomerase IV, formando complexos enzima-DNA que geram quebras e morte bacteriana. Tem excelente atividade contra Enterobacterales e Pseudomonas, mas atividade fraca contra pneumococo, por isso não é considerada "quinolona respiratória". Alta biodisponibilidade oral.',
      indicacoes: [
        'Pielonefrite e infecções urinárias complicadas',
        'Prostatite bacteriana',
        'Diarreia bacteriana (Shigella, Salmonella, Campylobacter sensíveis)',
        'Infecções ósseas e articulares por Gram-negativos',
        'Infecções por Pseudomonas aeruginosa (oral)',
        'Antraz (profilaxia pós-exposição)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['ciprofloxacin'],
      nomesComerciais: [pend('Cipro', 'referencia', { fabricante: 'Bayer' })],
      generico: true,
      eaComuns: [T_NAUSEA, T_DIARREIA, { termo: 'Tontura e cefaleia', sinonimos: ['tontura', 'cefaleia', 'dor de cabeca', 'vertigem'] }],
      eaGraves: [
        {
          termo: 'Tendinopatia e ruptura de tendão',
          sinonimos: ['ruptura do tendao de aquiles', 'tendinite', 'tendinopatia', 'ruptura de tendao', 'lesao de tendao'],
        },
        T_QT,
        { termo: 'Neuropatia periférica', sinonimos: ['neuropatia', 'parestesia', 'formigamento'] },
        { termo: 'Disglicemia (hipo ou hiperglicemia)', sinonimos: ['hipoglicemia', 'hiperglicemia', 'alteracao da glicemia'] },
        { termo: 'Aneurisma e dissecção de aorta', sinonimos: ['aneurisma de aorta', 'disseccao de aorta'] },
        T_CDI,
      ],
      eaCaracteristico: 'Tendinopatia e ruptura de tendão',
      distratoresEA: ['Síndrome do homem vermelho', 'Pseudolitíase biliar', 'Ototoxicidade', 'Hipercalemia'],
      contraindicacoes: [
        'Hipersensibilidade a quinolonas',
        'Histórico de tendinopatia associada a fluoroquinolonas',
        'Uso concomitante de tizanidina',
      ],
      precaucoes: [
        'Miastenia gravis (pode exacerbar fraqueza)',
        'Idosos, transplantados e uso de corticoide (maior risco de ruptura de tendão)',
        'Crianças, gestantes e lactantes (evitar, salvo ausência de alternativa)',
        'Epilepsia, QT longo, aneurisma de aorta conhecido',
      ],
      interacoes: [
        'Cátions polivalentes (antiácidos com Al/Mg, cálcio, ferro, zinco, sucralfato, leite): quelação e queda da absorção',
        'Teofilina, cafeína e tizanidina: aumento dos níveis (inibição do CYP1A2)',
        'Corticoides: maior risco de ruptura de tendão',
        'Varfarina: aumento do INR',
        'Fármacos que prolongam o QT',
      ],
      explicacaoFase2:
        'Fluoroquinolona: inibe as topoisomerases bacterianas (DNA-girase e topoisomerase IV), impedindo o desenrolamento e a replicação do DNA da bactéria.',
      explicacaoFase3:
        'As fluoroquinolonas lesam o colágeno e os tenócitos (efeito quelante e oxidativo sobre a matriz), causando tendinite e ruptura, típica do tendão de Aquiles; a FDA emitiu alerta em caixa sobre efeitos musculoesqueléticos e neurológicos incapacitantes.',
      referencias: [REF_GG, REF_KATZUNG, REF_FDA_FQ, REF_ITU, REF_AWARE],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: RDC,
    },
    // ---------------------------------------------------------- LEVOFLOXACINO
    {
      id: 'levofloxacino',
      nome: 'Levofloxacino',
      sinonimos: ['levofloxacina', 'levofloxacin', 'levofloxacino hemi-hidratado'],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'fluoroquinolonas',
          subclasse: 'Fluoroquinolona respiratória (3ª geração)',
          contexto: 'pneumonia comunitária (quinolona respiratória) e infecções urinárias complicadas',
          explicacaoFase1:
            'Quinolona respiratória, opção em monoterapia para pneumonia comunitária em pacientes com comorbidades ou alergia a betalactâmicos; também usada em pielonefrite e prostatite.',
        },
      ],
      mecanismo:
        'Isômero L do ofloxacino que inibe a DNA-girase e a topoisomerase IV. Em relação ao ciprofloxacino, tem maior atividade contra Streptococcus pneumoniae e germes atípicos, mantendo atividade contra Gram-negativos. Dose única diária e biodisponibilidade oral próxima de 100%.',
      indicacoes: [
        'Pneumonia adquirida na comunidade',
        'Sinusite bacteriana aguda e exacerbação de bronquite crônica (quando não há alternativa)',
        'Pielonefrite, ITU complicada e prostatite',
        'Infecções de pele e partes moles',
        'Tuberculose multirresistente (componente de esquemas especiais)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['levofloxacin'],
      nomesComerciais: [pend('Levaquin', 'referencia', { fabricante: 'Janssen' }), pend('Tavanic', 'marca', { fabricante: 'Sanofi' })],
      generico: true,
      eaComuns: [T_NAUSEA, T_DIARREIA, { termo: 'Cefaleia e insônia', sinonimos: ['cefaleia', 'dor de cabeca', 'insonia', 'tontura'] }],
      eaGraves: [
        {
          termo: 'Tendinopatia e ruptura de tendão',
          sinonimos: ['ruptura do tendao de aquiles', 'tendinite', 'tendinopatia', 'ruptura de tendao'],
        },
        T_QT,
        { termo: 'Disglicemia (hipo ou hiperglicemia)', sinonimos: ['hipoglicemia', 'hiperglicemia', 'alteracao da glicemia'] },
        { termo: 'Neuropatia periférica', sinonimos: ['neuropatia', 'parestesia'] },
        T_CDI,
      ],
      eaCaracteristico: 'Tendinopatia e ruptura de tendão',
      distratoresEA: ['Síndrome do homem vermelho', 'Ototoxicidade', 'Descoloração dentária', 'Pseudolitíase biliar'],
      contraindicacoes: [
        'Hipersensibilidade a quinolonas',
        'Histórico de tendinopatia associada a fluoroquinolonas',
        'Epilepsia (contraindicação em bula)',
        'Crianças, adolescentes em crescimento, gestantes e lactantes',
      ],
      precaucoes: [
        'Miastenia gravis',
        'Diabéticos em uso de insulina ou sulfonilureia (disglicemia)',
        'Idosos e usuários de corticoide',
        'Ajuste de dose na insuficiência renal',
      ],
      interacoes: [
        'Cátions polivalentes (antiácidos, ferro, zinco, cálcio, sucralfato): queda da absorção',
        'Corticoides: maior risco de ruptura de tendão',
        'Antidiabéticos (insulina, sulfonilureias): disglicemia',
        'Fármacos que prolongam o QT',
        'Varfarina: aumento do INR',
      ],
      explicacaoFase2:
        'Fluoroquinolona respiratória: inibe a DNA-girase e a topoisomerase IV, com melhor cobertura de pneumococo e atípicos que o ciprofloxacino.',
      explicacaoFase3:
        'Como as demais fluoroquinolonas, causa tendinopatia e ruptura de tendão, sobretudo em idosos, transplantados e usuários de corticoide.',
      referencias: [REF_GG, REF_KATZUNG, REF_FDA_FQ, REF_PAC, REF_SBPT, REF_AWARE],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: RDC,
    },
    // ---------------------------------------------------------- MOXIFLOXACINO
    {
      id: 'moxifloxacino',
      nome: 'Moxifloxacino',
      sinonimos: ['moxifloxacina', 'moxifloxacin', 'cloridrato de moxifloxacino'],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'fluoroquinolonas',
          subclasse: 'Fluoroquinolona respiratória (4ª geração)',
          contexto: 'pneumonia comunitária, sinusite e infecções com anaeróbios',
          explicacaoFase1:
            'Quinolona respiratória para pneumonia comunitária e sinusite, com cobertura adicional de anaeróbios; é usada ainda em esquemas de tuberculose resistente e, em colírio, na conjuntivite bacteriana.',
        },
      ],
      mecanismo:
        'Fluoroquinolona que inibe a DNA-girase e a topoisomerase IV com alta afinidade por Gram-positivos (pneumococo), atípicos e anaeróbios. Tem atividade menor contra Pseudomonas e baixa concentração urinária (metabolismo hepático), por isso não é usada em ITU.',
      indicacoes: [
        'Pneumonia adquirida na comunidade',
        'Sinusite bacteriana aguda e exacerbação de bronquite crônica',
        'Infecções complicadas de pele e intra-abdominais',
        'Conjuntivite bacteriana (colírio)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['moxifloxacin'],
      nomesComerciais: [
        pend('Avalox', 'referencia', { fabricante: 'Bayer' }),
        pend('Vigamox', 'marca', { fabricante: 'Alcon', obs: 'colírio oftálmico' }),
      ],
      generico: true,
      eaComuns: [T_NAUSEA, T_DIARREIA, { termo: 'Tontura', sinonimos: ['vertigem', 'cefaleia'] }],
      eaGraves: [
        T_QT,
        { termo: 'Tendinopatia e ruptura de tendão', sinonimos: ['ruptura de tendao', 'tendinite', 'tendinopatia'] },
        T_HEPATO,
        { termo: 'Disglicemia (hipo ou hiperglicemia)', sinonimos: ['hipoglicemia', 'hiperglicemia'] },
        T_CDI,
      ],
      eaCaracteristico: 'Prolongamento do intervalo QT',
      distratoresEA: ['Síndrome do homem vermelho', 'Ototoxicidade', 'Nefrotoxicidade', 'Pseudolitíase biliar'],
      contraindicacoes: [
        'Hipersensibilidade a quinolonas',
        'QT longo congênito ou adquirido, hipocalemia não corrigida, bradicardia ou insuficiência cardíaca sintomática',
        'Uso com outros fármacos que prolongam o QT',
        'Insuficiência hepática grave',
        'Histórico de tendinopatia por quinolonas; crianças, gestantes e lactantes',
      ],
      precaucoes: ['Miastenia gravis', 'Idosos', 'Diabéticos'],
      interacoes: [
        'Antiarrítmicos IA/III, antipsicóticos, macrolídeos e outros que prolongam o QT',
        'Cátions polivalentes: queda da absorção',
        'Corticoides: risco de ruptura de tendão',
      ],
      explicacaoFase2:
        'Fluoroquinolona respiratória: bloqueia as topoisomerases bacterianas e, além de pneumococo e atípicos, cobre anaeróbios.',
      explicacaoFase3:
        'Entre as fluoroquinolonas de uso atual, o moxifloxacino é o que mais prolonga o QT (bloqueio dos canais hERG), por isso é contraindicado com outros fármacos que prolongam o QT.',
      referencias: [REF_GG, REF_KATZUNG, REF_FDA_FQ, REF_PAC, REF_AWARE],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: RDC,
    },
    // ---------------------------------------------------------- DOXICICLINA
    {
      id: 'doxiciclina',
      nome: 'Doxiciclina',
      sinonimos: ['doxycycline', 'hiclato de doxiciclina', 'doxiciclina monoidratada'],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'tetraciclinas',
          contexto: 'infecções por atípicos, riquetsioses, IST e MRSA comunitário',
          explicacaoFase1:
            'Usada em riquetsioses (febre maculosa), leptospirose, doença de Lyme, clamídia, sífilis em alérgicos à penicilina (fora da gestação), pneumonia comunitária, acne e infecções de pele por MRSA comunitário.',
        },
      ],
      mecanismo:
        'Tetraciclina lipofílica que se liga à subunidade 30S e bloqueia a ligação do aminoacil-tRNA ao sítio A, inibindo a síntese proteica (bacteriostática). Tem amplo espectro, incluindo atípicos, riquétsias, espiroquetas e parte dos S. aureus resistentes à meticilina. Boa absorção oral e eliminação predominantemente não renal.',
      indicacoes: [
        'Riquetsioses (febre maculosa brasileira) e doença de Lyme',
        'Infecção por Chlamydia trachomatis e alternativa na sífilis em não gestantes alérgicos à penicilina',
        'Pneumonia adquirida na comunidade ambulatorial',
        'Leptospirose e profilaxia da leptospirose',
        'Acne inflamatória e rosácea',
        'Profilaxia da malária por P. falciparum em viajantes',
        'Infecções de pele por MRSA comunitário',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['doxycycline'],
      nomesComerciais: [pend('Vibramicina', 'referencia', { fabricante: 'Pfizer' })],
      generico: true,
      eaComuns: [
        { termo: 'Fotossensibilidade', sinonimos: ['fotossensibilizacao', 'queimadura solar exagerada', 'reacao fototoxica', 'fototoxicidade'] },
        T_NAUSEA,
        { termo: 'Esofagite e úlcera esofágica', sinonimos: ['esofagite', 'ulcera de esofago', 'dor ao engolir', 'odinofagia'] },
      ],
      eaGraves: [
        {
          termo: 'Descoloração dentária e hipoplasia do esmalte em crianças',
          sinonimos: ['dentes manchados', 'descoloracao dos dentes', 'manchas dentarias', 'hipoplasia do esmalte'],
        },
        { termo: 'Hipertensão intracraniana idiopática', sinonimos: ['pseudotumor cerebral', 'hipertensao intracraniana benigna'] },
        T_HEPATO,
      ],
      eaCaracteristico: 'Fotossensibilidade',
      distratoresEA: ['Síndrome do homem vermelho', 'Ototoxicidade', 'Tendinopatia e ruptura de tendão', 'Pseudolitíase biliar'],
      contraindicacoes: [
        'Hipersensibilidade a tetraciclinas',
        'Gestação (especialmente 2ª metade) e lactação',
        'Crianças menores de 8 anos, exceto quando o benefício supera o risco (por exemplo, febre maculosa)',
      ],
      precaucoes: [
        'Tomar com bastante água e em posição ortostática (risco de esofagite)',
        'Evitar exposição solar intensa',
        'Doença hepática',
      ],
      interacoes: [
        'Antiácidos, cálcio, ferro, magnésio, zinco, bismuto: quelação e queda da absorção',
        'Isotretinoína e retinoides: risco de hipertensão intracraniana',
        'Carbamazepina, fenitoína e barbitúricos: reduzem a meia-vida da doxiciclina',
        'Varfarina: aumento do efeito anticoagulante',
      ],
      explicacaoFase2:
        'É uma tetraciclina: liga-se à subunidade 30S do ribossomo e impede a entrada do tRNA, bloqueando a síntese proteica bacteriana.',
      explicacaoFase3:
        'A doxiciclina absorve luz UV na pele e gera reação fototóxica (queimadura exagerada); as tetraciclinas também quelam cálcio e se depositam em dentes e ossos em formação, motivo da restrição em crianças pequenas e gestantes.',
      referencias: [REF_GG, REF_KATZUNG, REF_IST, REF_PAC, REF_AWARE, REF_RENAME],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: RDC,
    },
    // ---------------------------------------------------------- CLINDAMICINA
    {
      id: 'clindamicina',
      nome: 'Clindamicina',
      sinonimos: ['clindamycin', 'cloridrato de clindamicina', 'fosfato de clindamicina'],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'lincosamidas',
          contexto: 'infecções de pele, ósseas e por anaeróbios; alternativa em alergia à penicilina',
          explicacaoFase1:
            'Usada em infecções de pele e partes moles (inclusive MRSA comunitário sensível), infecções odontogênicas e por anaeróbios acima do diafragma, e como adjuvante antitoxina em fasciite necrosante estreptocócica.',
        },
      ],
      mecanismo:
        'Lincosamida que se liga à subunidade 50S, em sítio sobreposto ao dos macrolídeos, e inibe a formação da ligação peptídica. Atua contra estreptococos, estafilococos (incluindo parte dos MRSA) e anaeróbios. Por inibir a síntese proteica, reduz a produção de toxinas estreptocócicas e estafilocócicas.',
      indicacoes: [
        'Infecções de pele e partes moles, inclusive por MRSA comunitário sensível',
        'Infecções odontogênicas e abscessos por anaeróbios',
        'Fasciite necrosante e síndrome do choque tóxico estreptocócico (com betalactâmico, efeito antitoxina)',
        'Faringite estreptocócica em alérgicos graves à penicilina',
        'Osteomielite',
        'Acne (tópica) e vaginose bacteriana (creme vaginal)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['clindamycin'],
      nomesComerciais: [pend('Dalacin C', 'referencia', { fabricante: 'Pfizer' })],
      generico: true,
      eaComuns: [
        T_DIARREIA,
        { termo: 'Exantema', sinonimos: ['rash', 'erupcao cutanea'] },
        { termo: 'Gosto metálico (via IV)', sinonimos: ['gosto metalico', 'disgeusia'] },
      ],
      eaGraves: [
        {
          termo: 'Colite pseudomembranosa por Clostridioides difficile',
          sinonimos: ['colite pseudomembranosa', 'c difficile', 'clostridium difficile', 'cdi', 'colite'],
        },
        T_SJS,
      ],
      eaCaracteristico: 'Colite pseudomembranosa por Clostridioides difficile',
      distratoresEA: ['Ototoxicidade', 'Fotossensibilidade', 'Tendinopatia e ruptura de tendão', 'Nefrotoxicidade'],
      contraindicacoes: ['Hipersensibilidade a lincosamidas', 'Histórico de colite associada a antibióticos'],
      precaucoes: ['Suspender e investigar C. difficile se surgir diarreia', 'Doença inflamatória intestinal'],
      interacoes: [
        'Bloqueadores neuromusculares: potencialização do bloqueio',
        'Eritromicina: antagonismo por competição no sítio 50S',
      ],
      explicacaoFase2:
        'Lincosamida: liga-se à subunidade 50S e impede a formação das ligações peptídicas; cobre Gram-positivos e anaeróbios e diminui a produção de toxinas.',
      explicacaoFase3:
        'Por eliminar intensamente a microbiota anaeróbia do cólon, a clindamicina é um dos antibióticos de maior risco para supercrescimento de C. difficile e colite pseudomembranosa.',
      referencias: [REF_GG, REF_KATZUNG, REF_PELE, REF_FARINGITE, REF_CDI, REF_AWARE],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: RDC,
    },
    // ---------------------------------------------------------- GENTAMICINA
    {
      id: 'gentamicina',
      nome: 'Gentamicina',
      sinonimos: ['gentamicin', 'sulfato de gentamicina', 'garamicina'],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'aminoglicosideos',
          contexto: 'infecções graves por Gram-negativos e sinergismo na endocardite',
          explicacaoFase1:
            'Aminoglicosídeo parenteral para infecções graves por bacilos Gram-negativos (pielonefrite, sepse), em sinergia com betalactâmicos na endocardite por enterococo e estreptococo, e em uso tópico/oftálmico.',
        },
      ],
      mecanismo:
        'Aminoglicosídeo que entra na bactéria por transporte dependente de oxigênio e se liga irreversivelmente à subunidade 30S, causando leitura errada do mRNA e síntese de proteínas defeituosas. É bactericida concentração-dependente, com efeito pós-antibiótico, o que favorece dose única diária. Não atua contra anaeróbios (transporte depende de O2).',
      indicacoes: [
        'Infecções graves por bacilos Gram-negativos aeróbios (pielonefrite, sepse, infecções intra-abdominais em associação)',
        'Endocardite por enterococo, estreptococo ou estafilococo (sinergismo com betalactâmico ou vancomicina)',
        'Peste e tularemia',
        'Infecções oculares e cutâneas (uso tópico)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['gentamicin'],
      nomesComerciais: [pend('Garamicina', 'referencia', { obs: 'injetável de uso hospitalar; também apresentações tópicas' })],
      generico: true,
      eaComuns: [
        {
          termo: 'Nefrotoxicidade (necrose tubular aguda)',
          sinonimos: ['nefrotoxicidade', 'insuficiencia renal aguda', 'lesao renal', 'aumento da creatinina', 'necrose tubular aguda'],
        },
      ],
      eaGraves: [
        {
          termo: 'Ototoxicidade (coclear e vestibular)',
          sinonimos: ['ototoxicidade', 'surdez', 'perda auditiva', 'zumbido', 'tinnitus', 'vertigem', 'lesao vestibular'],
        },
        {
          termo: 'Bloqueio neuromuscular',
          sinonimos: ['paralisia respiratoria', 'apneia', 'fraqueza muscular', 'bloqueio da juncao neuromuscular'],
        },
      ],
      eaCaracteristico: 'Ototoxicidade (coclear e vestibular)',
      distratoresEA: ['Fotossensibilidade', 'Tendinopatia e ruptura de tendão', 'Pseudolitíase biliar', 'Gosto metálico'],
      contraindicacoes: ['Hipersensibilidade a aminoglicosídeos', 'Miastenia gravis (relativa)'],
      precaucoes: [
        'Monitorar creatinina e nível sérico (vale) do fármaco',
        'Idosos, insuficiência renal, desidratação e tratamentos prolongados',
        'Gestação: risco de ototoxicidade fetal',
        'Antecedente familiar de surdez por aminoglicosídeo (mutação mitocondrial m.1555A>G)',
      ],
      interacoes: [
        'Vancomicina, anfotericina B, cisplatina, polimixinas e AINEs: somam nefrotoxicidade',
        'Diuréticos de alça (furosemida): somam ototoxicidade',
        'Bloqueadores neuromusculares: potencialização do bloqueio',
        'Betalactâmicos: sinergismo terapêutico, mas inativação se misturados no mesmo frasco',
      ],
      explicacaoFase2:
        'Aminoglicosídeo: liga-se de modo irreversível à subunidade 30S e faz o ribossomo ler errado o mRNA, gerando proteínas defeituosas e morte da bactéria.',
      explicacaoFase3:
        'Os aminoglicosídeos acumulam-se nas células ciliadas da cóclea/vestíbulo e no túbulo proximal renal: a ototoxicidade costuma ser irreversível, enquanto a nefrotoxicidade geralmente é reversível.',
      referencias: [REF_GG, REF_KATZUNG, REF_RANG, REF_AWARE, REF_RENAME],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: RDC,
    },
    // ---------------------------------------------------------- VANCOMICINA
    {
      id: 'vancomicina',
      nome: 'Vancomicina',
      sinonimos: ['vancomycin', 'cloridrato de vancomicina', 'vanco'],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'glicopeptideos',
          contexto: 'infecções graves por MRSA e Gram-positivos resistentes; C. difficile (oral)',
          explicacaoFase1:
            'Tratamento de referência de infecções graves por MRSA (bacteremia, pneumonia, osteomielite), parte da cobertura empírica de meningite bacteriana e, por via oral, da colite por C. difficile.',
        },
      ],
      mecanismo:
        'Glicopeptídeo que se liga ao terminal D-alanil-D-alanina dos precursores do peptidoglicano, impedindo transglicosilação e transpeptidação. Por ser grande, não atravessa a membrana externa dos Gram-negativos e só age contra Gram-positivos. A resistência dos enterococos (VRE) ocorre pela troca do terminal por D-Ala-D-lactato.',
      indicacoes: [
        'Infecções graves por Staphylococcus aureus resistente à meticilina (MRSA)',
        'Endocardite por Gram-positivos em alérgicos a betalactâmicos',
        'Meningite bacteriana empírica (com ceftriaxona) quando há risco de pneumococo resistente',
        'Colite por Clostridioides difficile (via oral)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['vancomycin'],
      nomesComerciais: [pend('Vancocina', 'marca', { obs: 'uso hospitalar' })],
      generico: true,
      eaComuns: [
        {
          termo: 'Reação infusional (síndrome do homem vermelho)',
          sinonimos: [
            'sindrome do homem vermelho',
            'sindrome do pescoco vermelho',
            'red man syndrome',
            'rubor',
            'flushing',
            'reacao infusional',
            'vermelhidao no rosto e pescoco',
          ],
        },
        { termo: 'Flebite no local de infusão', sinonimos: ['flebite', 'tromboflebite'] },
      ],
      eaGraves: [
        { termo: 'Nefrotoxicidade', sinonimos: ['lesao renal aguda', 'insuficiencia renal', 'aumento da creatinina'] },
        { termo: 'Ototoxicidade', sinonimos: ['perda auditiva', 'zumbido', 'surdez'] },
        { termo: 'Neutropenia', sinonimos: ['leucopenia', 'queda dos neutrofilos'] },
        {
          termo: 'DRESS (reação a droga com eosinofilia e sintomas sistêmicos)',
          sinonimos: ['dress', 'sindrome dress', 'reacao com eosinofilia'],
        },
      ],
      eaCaracteristico: 'Reação infusional (síndrome do homem vermelho)',
      distratoresEA: ['Fotossensibilidade', 'Tendinopatia e ruptura de tendão', 'Pseudolitíase biliar', 'Gosto metálico'],
      contraindicacoes: ['Hipersensibilidade à vancomicina'],
      precaucoes: [
        'Infundir em pelo menos 60 minutos (velocidades maiores precipitam a reação infusional)',
        'Monitorar nível sérico (AUC ou vale) e função renal',
        'Insuficiência renal, idosos e uso de outros nefrotóxicos',
      ],
      interacoes: [
        'Aminoglicosídeos, anfotericina B, polimixinas e contrastes: somam nefrotoxicidade',
        'Piperacilina-tazobactam: maior incidência de lesão renal aguda na associação',
        'Diuréticos de alça: soma de ototoxicidade',
      ],
      explicacaoFase2:
        'Glicopeptídeo: "abraça" o terminal D-Ala-D-Ala dos tijolos da parede celular e impede sua montagem; só alcança o alvo em Gram-positivos.',
      explicacaoFase3:
        'A infusão rápida provoca liberação direta (não IgE) de histamina pelos mastócitos, com rubor em face, pescoço e tronco, prurido e hipotensão; previne-se infundindo devagar e, se preciso, com anti-histamínico.',
      referencias: [
        REF_GG,
        REF_KATZUNG,
        REF_AWARE,
        REF_CDI,
        'Rybak MJ et al. ASHP/IDSA/PIDS/SIDP — Therapeutic monitoring of vancomycin (2020)',
      ],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: RDC,
    },
    // ---------------------------------------------------------- SMX-TMP
    {
      id: 'sulfametoxazol-trimetoprima',
      nome: 'Sulfametoxazol + trimetoprima',
      sinonimos: [
        'sulfametoxazol e trimetoprima',
        'sulfametoxazol trimetoprima',
        'cotrimoxazol',
        'co-trimoxazol',
        'smx-tmp',
        'smx tmp',
        'trimethoprim-sulfamethoxazole',
        'tmp-smx',
        'bactrim',
      ],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'sulfonamida-inibidor-dhfr',
          contexto: 'cistite, MRSA comunitário e pneumocistose',
          explicacaoFase1:
            'Usado na cistite não complicada (onde a resistência local é baixa), em infecções de pele por MRSA comunitário e no tratamento e profilaxia da pneumonia por Pneumocystis jirovecii e da toxoplasmose em imunossuprimidos.',
        },
      ],
      mecanismo:
        'Associação que bloqueia duas etapas sequenciais da síntese de folato bacteriano: o sulfametoxazol, análogo do PABA, inibe a di-hidropteroato sintase, e a trimetoprima inibe a di-hidrofolato redutase bacteriana com seletividade muito maior que pela enzima humana. Sem tetra-hidrofolato, a bactéria não sintetiza purinas e timidina. Isoladamente cada um é bacteriostático; juntos são sinérgicos e frequentemente bactericidas.',
      indicacoes: [
        'Cistite não complicada e infecções urinárias por germes sensíveis',
        'Tratamento e profilaxia de pneumonia por Pneumocystis jirovecii',
        'Profilaxia de toxoplasmose em pessoas vivendo com HIV',
        'Infecções de pele por MRSA comunitário',
        'Infecções por Stenotrophomonas maltophilia e Nocardia',
        'Diarreia por Shigella e outras enterobactérias sensíveis',
      ],
      tipoMolecula: 'associacao',
      pubchem: ['sulfamethoxazole', 'trimethoprim'],
      nomesComerciais: [pend('Bactrim', 'referencia', { fabricante: 'Roche', obs: 'apresentações Bactrim e Bactrim F (dose dobrada)' })],
      generico: true,
      eaComuns: [
        T_NAUSEA,
        { termo: 'Exantema', sinonimos: ['rash', 'erupcao cutanea', 'alergia a sulfa'] },
        {
          termo: 'Hipercalemia',
          sinonimos: ['hiperpotassemia', 'potassio alto', 'aumento do potassio', 'hipercalemia por trimetoprima'],
        },
      ],
      eaGraves: [
        T_SJS,
        {
          termo: 'Mielossupressão (anemia megaloblástica, leucopenia, trombocitopenia)',
          sinonimos: ['mielossupressao', 'anemia megaloblastica', 'pancitopenia', 'leucopenia', 'trombocitopenia'],
        },
        { termo: 'Anemia hemolítica na deficiência de G6PD', sinonimos: ['hemolise', 'anemia hemolitica', 'deficiencia de g6pd'] },
        { termo: 'Kernicterus em neonatos', sinonimos: ['kernicterus', 'ictericia nuclear'] },
        T_HEPATO,
      ],
      eaCaracteristico: 'Síndrome de Stevens-Johnson / necrólise epidérmica tóxica',
      distratoresEA: ['Ototoxicidade', 'Tendinopatia e ruptura de tendão', 'Síndrome do homem vermelho', 'Pseudolitíase biliar'],
      contraindicacoes: [
        'Hipersensibilidade a sulfonamidas ou trimetoprima',
        'Anemia megaloblástica por deficiência de folato',
        'Gestação a termo e neonatos com menos de 2 meses (risco de kernicterus)',
        'Insuficiência hepática grave',
        'Insuficiência renal grave quando não for possível monitorar níveis',
      ],
      precaucoes: [
        'Deficiência de G6PD',
        'Idosos, desnutridos e etilistas (deficiência de folato)',
        'Pessoas vivendo com HIV (maior incidência de reações cutâneas)',
        'Monitorar potássio e creatinina (trimetoprima reduz a secreção tubular de creatinina)',
      ],
      interacoes: [
        'Varfarina: aumento importante do INR (inibição do CYP2C9 e deslocamento proteico)',
        'IECA, BRA, espironolactona e suplementos de potássio: hipercalemia',
        'Metotrexato: mielotoxicidade grave (antifolato aditivo e redução da excreção)',
        'Sulfonilureias: hipoglicemia',
        'Fenitoína: aumento dos níveis',
      ],
      explicacaoFase2:
        'É uma associação de sulfonamida com inibidor da DHFR: os dois componentes bloqueiam etapas sucessivas da via do ácido fólico da bactéria, um bloqueio sequencial sinérgico.',
      explicacaoFase3:
        'O componente sulfonamida é causa clássica de farmacodermias graves (Stevens-Johnson/NET), de mecanismo imunológico; já a trimetoprima bloqueia o canal ENaC do néfron distal, como a amilorida, e pode causar hipercalemia.',
      referencias: [REF_GG, REF_KATZUNG, REF_ITU, REF_PELE, REF_AWARE, REF_RENAME],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: RDC,
    },
    // ---------------------------------------------------------- METRONIDAZOL
    {
      id: 'metronidazol',
      nome: 'Metronidazol',
      sinonimos: ['metronidazole', 'benzoilmetronidazol', 'flagyl'],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'nitroimidazois',
          contexto: 'infecções por anaeróbios, vaginose bacteriana e protozoários',
          explicacaoFase1:
            'Antimicrobiano de escolha para anaeróbios abaixo do diafragma (infecção intra-abdominal, com outro agente), vaginose bacteriana, tricomoníase, giardíase e amebíase.',
        },
      ],
      mecanismo:
        'Pró-fármaco que entra passivamente na célula e tem o grupo nitro reduzido por proteínas de baixo potencial redox (ferredoxina), presentes apenas em anaeróbios e protozoários. Os intermediários reativos lesam e fragmentam o DNA, com ação bactericida. Organismos aeróbios não fazem essa redução, o que explica a seletividade.',
      indicacoes: [
        'Infecções por anaeróbios (intra-abdominais, pélvicas, abscesso cerebral), em associação conforme o caso',
        'Vaginose bacteriana e tricomoníase',
        'Amebíase e giardíase',
        'Erradicação de H. pylori (esquemas alternativos)',
        'Colite por C. difficile (somente quando vancomicina oral e fidaxomicina não estão disponíveis)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['metronidazole'],
      nomesComerciais: [pend('Flagyl', 'referencia', { fabricante: 'Sanofi' })],
      generico: true,
      eaComuns: [
        { termo: 'Gosto metálico (disgeusia)', sinonimos: ['gosto metalico', 'disgeusia', 'alteracao do paladar', 'gosto amargo'] },
        T_NAUSEA,
        { termo: 'Urina escurecida', sinonimos: ['urina escura', 'urina avermelhada', 'urina marrom'] },
      ],
      eaGraves: [
        {
          termo: 'Neuropatia periférica',
          sinonimos: ['neuropatia', 'parestesia', 'formigamento', 'dormencia nas extremidades'],
        },
        {
          termo: 'Encefalopatia e convulsões',
          sinonimos: ['convulsao', 'encefalopatia', 'neurotoxicidade', 'ataxia', 'sindrome cerebelar'],
        },
        {
          termo: 'Reação tipo dissulfiram com álcool',
          sinonimos: ['efeito antabuse', 'efeito dissulfiram', 'reacao com alcool', 'intolerancia ao alcool', 'efeito antabuse-like'],
        },
      ],
      eaCaracteristico: 'Gosto metálico (disgeusia)',
      distratoresEA: ['Ototoxicidade', 'Tendinopatia e ruptura de tendão', 'Síndrome do homem vermelho', 'Fotossensibilidade'],
      contraindicacoes: [
        'Hipersensibilidade a nitroimidazóis',
        'Uso de dissulfiram nas últimas 2 semanas (reações psicóticas)',
        'Ingestão de álcool durante o tratamento e até 72 h após',
      ],
      precaucoes: [
        'Primeiro trimestre da gestação (evitar quando houver alternativa)',
        'Insuficiência hepática grave (reduzir dose)',
        'Doenças do SNC; tratamentos prolongados (neuropatia)',
      ],
      interacoes: [
        'Álcool: reação tipo dissulfiram (rubor, náuseas, taquicardia)',
        'Varfarina: aumento importante do INR (inibição do CYP2C9)',
        'Dissulfiram: confusão e psicose',
        'Lítio: aumento dos níveis séricos',
        'Bussulfano: aumento da toxicidade',
      ],
      explicacaoFase2:
        'Nitroimidazol: só é ativado dentro de micro-organismos anaeróbios, que reduzem seu grupo nitro e geram radicais que destroem o DNA.',
      explicacaoFase3:
        'O gosto metálico é a queixa mais típica do metronidazol; ele também pode causar reação tipo dissulfiram com álcool e, em uso prolongado, neurotoxicidade.',
      referencias: [REF_GG, REF_KATZUNG, REF_IST, REF_CDI, REF_AWARE, REF_RENAME],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
      regulatorio: RDC,
    },
    // ---------------------------------------------------------- FLUCONAZOL
    {
      id: 'fluconazol',
      nome: 'Fluconazol',
      sinonimos: ['fluconazole'],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'azois-antifungicos',
          subclasse: 'Triazol',
          contexto: 'candidíases e manutenção da criptococose',
          explicacaoFase1:
            'Antifúngico oral de escolha para candidíase vulvovaginal (dose única de 150 mg), orofaríngea e esofágica, candidemia por espécies sensíveis (após estabilização) e fase de consolidação/manutenção da meningite criptocócica.',
        },
      ],
      mecanismo:
        'Triazol hidrossolúvel que inibe a 14α-desmetilase de lanosterol (CYP51) fúngica, bloqueando a síntese de ergosterol e acumulando esteróis metilados tóxicos na membrana. Tem excelente biodisponibilidade oral, penetração no líquor e excreção renal na forma inalterada. Não cobre fungos filamentosos (Aspergillus) e tem atividade reduzida contra Candida glabrata e C. krusei (resistência intrínseca).',
      indicacoes: [
        'Candidíase vulvovaginal, orofaríngea e esofágica',
        'Candidemia e candidíase invasiva por espécies sensíveis',
        'Meningite criptocócica (consolidação e manutenção)',
        'Profilaxia de candidíase em transplantados e neutropênicos selecionados',
        'Dermatofitoses e pitiríase versicolor (alternativa)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['fluconazole'],
      nomesComerciais: [pend('Zoltec', 'referencia', { fabricante: 'Pfizer' })],
      generico: true,
      eaComuns: [
        { termo: 'Cefaleia', sinonimos: ['dor de cabeca'] },
        T_NAUSEA,
        { termo: 'Dor abdominal', sinonimos: ['dor de barriga', 'desconforto abdominal'] },
      ],
      eaGraves: [T_HEPATO, T_QT, T_SJS],
      eaCaracteristico: 'Hepatotoxicidade',
      distratoresEA: ['Nefrotoxicidade', 'Ototoxicidade', 'Tendinopatia e ruptura de tendão', 'Síndrome do homem vermelho'],
      contraindicacoes: [
        'Hipersensibilidade a azóis',
        'Uso com fármacos que prolongam o QT metabolizados pelo CYP3A4 (cisaprida, pimozida, quinidina, eritromicina)',
      ],
      precaucoes: [
        'Doença hepática (monitorar enzimas)',
        'Ajuste de dose na insuficiência renal',
        'Gestação: evitar doses altas e prolongadas (relatos de malformações)',
      ],
      interacoes: [
        'Inibe CYP2C9, CYP2C19 e CYP3A4: aumenta varfarina (INR), fenitoína, sulfonilureias, ciclosporina, tacrolimo',
        'Fármacos que prolongam o QT',
        'Rifampicina: reduz os níveis de fluconazol',
      ],
      explicacaoFase2:
        'Azol (triazol): inibe a enzima fúngica que fabrica o ergosterol, principal esterol da membrana do fungo, deixando-a defeituosa.',
      explicacaoFase3:
        'Por também interferir em enzimas do citocromo P450 hepático, os azóis podem causar elevação de transaminases e hepatite medicamentosa, além de muitas interações.',
      referencias: [
        REF_GG,
        REF_KATZUNG,
        REF_IST,
        'Pappas PG et al. IDSA Clinical Practice Guideline for the Management of Candidiasis (2016)',
        REF_RENAME,
      ],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
    },
    // ---------------------------------------------------------- ITRACONAZOL
    {
      id: 'itraconazol',
      nome: 'Itraconazol',
      sinonimos: ['itraconazole'],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'azois-antifungicos',
          subclasse: 'Triazol',
          contexto: 'micoses endêmicas (histoplasmose, paracoccidioidomicose, esporotricose) e onicomicoses',
          explicacaoFase1:
            'Antifúngico de escolha para paracoccidioidomicose e esporotricose, para histoplasmose leve a moderada e em onicomicoses; também ativo contra Aspergillus.',
        },
      ],
      mecanismo:
        'Triazol lipofílico que inibe a CYP51 fúngica e a síntese de ergosterol, com espectro mais amplo que o fluconazol, incluindo fungos dimórficos e Aspergillus. A absorção da cápsula depende de acidez gástrica e de alimento; tem metabolismo hepático extenso e é potente inibidor do CYP3A4. Penetração no líquor é baixa.',
      indicacoes: [
        'Paracoccidioidomicose',
        'Esporotricose',
        'Histoplasmose e blastomicose não graves',
        'Onicomicoses e dermatofitoses extensas',
        'Aspergilose (alternativa)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['itraconazole'],
      nomesComerciais: [pend('Sporanox', 'referencia', { fabricante: 'Janssen' })],
      generico: true,
      eaComuns: [T_NAUSEA, { termo: 'Cefaleia', sinonimos: ['dor de cabeca'] }, { termo: 'Exantema', sinonimos: ['rash'] }],
      eaGraves: [
        {
          termo: 'Insuficiência cardíaca (efeito inotrópico negativo)',
          sinonimos: [
            'insuficiencia cardiaca',
            'piora da insuficiencia cardiaca',
            'inotropismo negativo',
            'edema e dispneia',
            'icc',
          ],
        },
        T_HEPATO,
        T_QT,
        { termo: 'Hipocalemia e edema', sinonimos: ['hipocalemia', 'potassio baixo', 'edema periferico'] },
      ],
      eaCaracteristico: 'Insuficiência cardíaca (efeito inotrópico negativo)',
      distratoresEA: ['Nefrotoxicidade', 'Ototoxicidade', 'Síndrome do homem vermelho', 'Tendinopatia e ruptura de tendão'],
      contraindicacoes: [
        'Insuficiência cardíaca ou disfunção ventricular (no tratamento de onicomicose)',
        'Gestação (no tratamento de onicomicose)',
        'Uso com substratos do CYP3A4 de risco: sinvastatina, lovastatina, midazolam oral, triazolam, pimozida, quinidina, dofetilida, ergotamínicos',
        'Hipersensibilidade a azóis',
      ],
      precaucoes: ['Doença hepática', 'Monitorar enzimas hepáticas em tratamento prolongado', 'Tomar cápsula com refeição'],
      interacoes: [
        'Inibidor potente do CYP3A4: estatinas (rabdomiólise), benzodiazepínicos, bloqueadores de canal de cálcio, ciclosporina, tacrolimo',
        'IBP, antagonistas H2 e antiácidos: reduzem a absorção da cápsula',
        'Rifampicina, fenitoína e carbamazepina: reduzem muito os níveis do itraconazol',
        'Fármacos que prolongam o QT',
      ],
      explicacaoFase2:
        'Azol (triazol) de espectro ampliado: bloqueia a síntese do ergosterol da membrana fúngica e atinge também fungos dimórficos e Aspergillus.',
      explicacaoFase3:
        'O itraconazol tem efeito inotrópico negativo e pode precipitar ou piorar insuficiência cardíaca (alerta em caixa da FDA), por isso não deve ser usado para onicomicose em cardiopatas.',
      referencias: [
        REF_GG,
        REF_KATZUNG,
        'Shikanai-Yasuda MA et al. II Consenso Brasileiro em Paracoccidioidomicose (2017)',
        'FDA. Sporanox (itraconazole) — prescribing information, boxed warning',
      ],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
    },
    // ---------------------------------------------------------- ANFOTERICINA B
    {
      id: 'anfotericina-b',
      nome: 'Anfotericina B',
      sinonimos: [
        'amphotericin b',
        'anfotericina',
        'anfo b',
        'anfotericina b desoxicolato',
        'anfotericina b lipossomal',
        'anfotericina b complexo lipidico',
      ],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'polienos',
          contexto: 'micoses invasivas graves (criptococose, mucormicose, histoplasmose disseminada) e leishmaniose',
          explicacaoFase1:
            'Antifúngico IV de amplo espectro para micoses sistêmicas graves: indução da meningite criptocócica, mucormicose, histoplasmose e paracoccidioidomicose graves; também trata leishmaniose visceral.',
        },
      ],
      mecanismo:
        'Polieno que se liga ao ergosterol da membrana fúngica e forma poros, com extravasamento de íons e morte celular (fungicida). A afinidade, menor, pelo colesterol das membranas humanas explica a toxicidade. As formulações lipídicas (lipossomal, complexo lipídico) reduzem a exposição renal e a nefrotoxicidade.',
      indicacoes: [
        'Meningite criptocócica (indução, com flucitosina)',
        'Mucormicose',
        'Histoplasmose, paracoccidioidomicose e candidíase invasiva graves',
        'Aspergilose invasiva (alternativa)',
        'Leishmaniose visceral e tegumentar (formulação lipossomal ou desoxicolato)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['amphotericin B'],
      nomesComerciais: [
        pend('Fungizon', 'referencia', { fabricante: 'Bristol-Myers Squibb', obs: 'desoxicolato; uso hospitalar' }),
        pend('AmBisome', 'marca', { obs: 'formulação lipossomal; uso hospitalar' }),
      ],
      generico: false,
      eaComuns: [
        {
          termo: 'Reação infusional (febre, calafrios, tremores)',
          sinonimos: ['febre', 'calafrios', 'tremores', 'reacao infusional', 'shake and bake'],
        },
        { termo: 'Hipocalemia e hipomagnesemia', sinonimos: ['hipocalemia', 'potassio baixo', 'hipomagnesemia', 'magnesio baixo'] },
        { termo: 'Flebite', sinonimos: ['tromboflebite'] },
      ],
      eaGraves: [
        {
          termo: 'Nefrotoxicidade',
          sinonimos: ['insuficiencia renal', 'lesao renal aguda', 'aumento da creatinina', 'acidose tubular renal', 'nefrotoxica'],
        },
        { termo: 'Anemia normocítica', sinonimos: ['anemia', 'queda de hemoglobina'] },
        { termo: 'Arritmias por distúrbio eletrolítico', sinonimos: ['arritmia'] },
      ],
      eaCaracteristico: 'Nefrotoxicidade',
      distratoresEA: ['Tendinopatia e ruptura de tendão', 'Fotossensibilidade', 'Pseudolitíase biliar', 'Gosto metálico'],
      contraindicacoes: ['Hipersensibilidade à anfotericina B (salvo infecção potencialmente fatal sem alternativa)'],
      precaucoes: [
        'Hidratação com soro fisiológico antes da infusão (reduz nefrotoxicidade)',
        'Monitorar creatinina, potássio e magnésio diariamente',
        'Formulações não são intercambiáveis em dose (desoxicolato x lipossomal)',
      ],
      interacoes: [
        'Aminoglicosídeos, vancomicina, ciclosporina, tacrolimo, polimixinas: somam nefrotoxicidade',
        'Corticoides e diuréticos: agravam a hipocalemia',
        'Digoxina: maior risco de toxicidade digitálica por hipocalemia',
        'Bloqueadores neuromusculares: efeito potencializado pela hipocalemia',
      ],
      explicacaoFase2:
        'Polieno: liga-se ao ergosterol da membrana do fungo e abre poros, fazendo a célula perder íons e morrer.',
      explicacaoFase3:
        'A anfotericina causa vasoconstrição da arteríola aferente e lesão direta do túbulo renal (por ligação ao colesterol), levando a queda da filtração, acidose tubular e perda de potássio e magnésio; as formulações lipídicas reduzem esse efeito.',
      referencias: [
        REF_GG,
        REF_KATZUNG,
        REF_RANG,
        'OMS. Guidelines for diagnosing, preventing and managing cryptococcal disease (2022)',
        REF_RENAME,
      ],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
    },
    // ---------------------------------------------------------- ACICLOVIR
    {
      id: 'aciclovir',
      nome: 'Aciclovir',
      sinonimos: ['acyclovir', 'aciclovir sodico', 'acicloguanosina'],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'analogos-nucleosideo-antiherpeticos',
          contexto: 'herpes simples, herpes-zóster, varicela e encefalite herpética',
          explicacaoFase1:
            'Antiviral contra herpes simples (labial e genital), varicela e herpes-zóster; por via IV, é o tratamento da encefalite herpética e de infecções herpéticas graves em imunossuprimidos.',
        },
      ],
      mecanismo:
        'Análogo acíclico da guanosina que é monofosforilado pela timidina-cinase do HSV/VZV e depois convertido em trifosfato por cinases celulares. O trifosfato compete com o dGTP, inibe a DNA-polimerase viral e, incorporado, termina a cadeia de DNA. Como a primeira fosforilação depende da enzima viral, o fármaco concentra-se nas células infectadas. Biodisponibilidade oral baixa (15–30%).',
      indicacoes: [
        'Herpes genital (primeiro episódio, recorrências e supressão)',
        'Herpes labial e mucocutâneo',
        'Herpes-zóster e varicela',
        'Encefalite herpética e infecção neonatal por HSV (IV)',
        'Profilaxia de HSV em transplantados e quimioterapia',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['acyclovir'],
      nomesComerciais: [pend('Zovirax', 'referencia', { fabricante: 'GSK' })],
      generico: true,
      eaComuns: [
        T_NAUSEA,
        T_DIARREIA,
        { termo: 'Cefaleia', sinonimos: ['dor de cabeca'] },
        { termo: 'Flebite (IV)', sinonimos: ['flebite', 'tromboflebite', 'dor no acesso venoso'] },
      ],
      eaGraves: [
        {
          termo: 'Nefropatia por cristais (lesão renal aguda)',
          sinonimos: [
            'cristaluria',
            'nefropatia por cristais',
            'insuficiencia renal aguda',
            'lesao renal aguda',
            'nefrotoxicidade',
            'nefropatia obstrutiva',
          ],
        },
        {
          termo: 'Neurotoxicidade (confusão, tremores, alucinações)',
          sinonimos: ['neurotoxicidade', 'confusao mental', 'alucinacoes', 'tremores', 'delirium', 'encefalopatia'],
        },
      ],
      eaCaracteristico: 'Nefropatia por cristais (lesão renal aguda)',
      distratoresEA: ['Ototoxicidade', 'Fotossensibilidade', 'Tendinopatia e ruptura de tendão', 'Síndrome do homem vermelho'],
      contraindicacoes: ['Hipersensibilidade a aciclovir ou valaciclovir'],
      precaucoes: [
        'Hidratação adequada e infusão lenta (IV)',
        'Ajuste de dose na insuficiência renal e em idosos',
        'Uso com outros nefrotóxicos',
      ],
      interacoes: [
        'Probenecida e cimetidina: reduzem a depuração renal do aciclovir',
        'Nefrotóxicos (aminoglicosídeos, ciclosporina, tacrolimo): soma de nefrotoxicidade',
        'Micofenolato: aumento mútuo dos níveis',
      ],
      explicacaoFase2:
        'Análogo de nucleosídeo: só é ativado pela timidina-cinase do herpesvírus; a forma trifosfato bloqueia a DNA-polimerase viral e interrompe a cópia do DNA do vírus.',
      explicacaoFase3:
        'O aciclovir é pouco solúvel na urina; em doses IV altas, com desidratação ou insuficiência renal, cristaliza nos túbulos e causa nefropatia obstrutiva, prevenida com hidratação e infusão lenta.',
      referencias: [REF_GG, REF_KATZUNG, REF_IST, REF_RENAME],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
    },
    // ---------------------------------------------------------- VALACICLOVIR
    {
      id: 'valaciclovir',
      nome: 'Valaciclovir',
      sinonimos: ['valacyclovir', 'cloridrato de valaciclovir', 'valaciclovir hydrochloride'],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'analogos-nucleosideo-antiherpeticos',
          contexto: 'herpes-zóster e herpes genital por via oral',
          explicacaoFase1:
            'Pró-fármaco oral do aciclovir para herpes-zóster, herpes genital (tratamento e supressão, inclusive para reduzir transmissão) e herpes labial, com posologia menos frequente.',
        },
      ],
      mecanismo:
        'Éster L-valil do aciclovir, absorvido pelo transportador de peptídeos intestinal e convertido em aciclovir no primeiro passagem hepático e intestinal, atingindo biodisponibilidade de cerca de 55%. A partir daí age como o aciclovir: fosforilação pela timidina-cinase viral e inibição da DNA-polimerase do herpesvírus.',
      indicacoes: [
        'Herpes-zóster',
        'Herpes genital (episódios, recorrências e terapia supressiva)',
        'Herpes labial',
        'Profilaxia de citomegalovírus após transplante renal (alta dose)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['valacyclovir'],
      nomesComerciais: [pend('Valtrex', 'referencia', { fabricante: 'GSK' })],
      generico: true,
      eaComuns: [{ termo: 'Cefaleia', sinonimos: ['dor de cabeca'] }, T_NAUSEA, { termo: 'Dor abdominal', sinonimos: ['dor de barriga'] }],
      eaGraves: [
        {
          termo: 'Neurotoxicidade (confusão, alucinações) em idosos e nefropatas',
          sinonimos: ['neurotoxicidade', 'confusao mental', 'alucinacoes', 'delirium', 'agitacao', 'encefalopatia'],
        },
        { termo: 'Lesão renal aguda', sinonimos: ['insuficiencia renal aguda', 'nefrotoxicidade', 'cristaluria'] },
        {
          termo: 'Microangiopatia trombótica (PTT/SHU) em imunossuprimidos com doses altas',
          sinonimos: ['ptt', 'shu', 'purpura trombocitopenica trombotica', 'sindrome hemolitico-uremica', 'microangiopatia trombotica'],
        },
      ],
      eaCaracteristico: 'Neurotoxicidade (confusão, alucinações) em idosos e nefropatas',
      distratoresEA: ['Ototoxicidade', 'Fotossensibilidade', 'Tendinopatia e ruptura de tendão', 'Síndrome do homem vermelho'],
      contraindicacoes: ['Hipersensibilidade a valaciclovir ou aciclovir'],
      precaucoes: ['Ajustar dose na insuficiência renal e em idosos', 'Manter hidratação adequada'],
      interacoes: [
        'Nefrotóxicos: soma de nefrotoxicidade',
        'Probenecida e cimetidina: aumento da exposição ao aciclovir',
      ],
      explicacaoFase2:
        'É um pró-fármaco do aciclovir (análogo de nucleosídeo): após virar aciclovir, inibe a DNA-polimerase do herpesvírus nas células infectadas.',
      explicacaoFase3:
        'Por gerar níveis altos de aciclovir, o valaciclovir pode acumular em idosos e em insuficiência renal e causar neurotoxicidade (confusão, agitação, alucinações), reversível com suspensão ou ajuste de dose.',
      referencias: [REF_GG, REF_KATZUNG, REF_IST],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
    },
    // ---------------------------------------------------------- OSELTAMIVIR
    {
      id: 'oseltamivir',
      nome: 'Oseltamivir',
      sinonimos: ['fosfato de oseltamivir', 'oseltamivir phosphate', 'tamiflu'],
      vinculos: [
        {
          grupoId: 'antimicrobianos',
          classeId: 'inibidores-neuraminidase',
          contexto: 'tratamento e profilaxia da influenza (gripe)',
          explicacaoFase1:
            'Antiviral oral para influenza A e B: indicado na síndrome gripal com fatores de risco e em toda síndrome respiratória aguda grave, idealmente nas primeiras 48 h, e na quimioprofilaxia de contatos de risco.',
        },
      ],
      mecanismo:
        'Pró-fármaco (éster etílico) convertido no fígado em carboxilato de oseltamivir, análogo do ácido siálico. Inibe a neuraminidase viral, enzima que cliva o ácido siálico da superfície celular para liberar os novos vírions; sem ela, os vírus ficam agregados à célula e a disseminação diminui. Não tem ação contra outros vírus respiratórios.',
      indicacoes: [
        'Tratamento da influenza A e B (síndrome gripal com fatores de risco e SRAG)',
        'Quimioprofilaxia pós-exposição em pessoas de alto risco',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['oseltamivir'],
      nomesComerciais: [pend('Tamiflu', 'referencia', { fabricante: 'Roche' })],
      generico: false,
      eaComuns: [
        { ...T_NAUSEA, sinonimos: [...T_NAUSEA.sinonimos, 'nauseas', 'vomitos'] },
        { termo: 'Cefaleia', sinonimos: ['dor de cabeca'] },
        { termo: 'Dor abdominal', sinonimos: ['dor de barriga'] },
      ],
      eaGraves: [
        {
          termo: 'Eventos neuropsiquiátricos (delirium, alteração de comportamento)',
          sinonimos: ['delirium', 'confusao', 'alucinacoes', 'comportamento anormal', 'eventos neuropsiquiatricos', 'autoagressao'],
        },
        T_SJS,
      ],
      eaCaracteristico: 'Náuseas e vômitos',
      distratoresEA: ['Nefropatia por cristais', 'Ototoxicidade', 'Fotossensibilidade', 'Síndrome do homem vermelho'],
      contraindicacoes: ['Hipersensibilidade ao oseltamivir'],
      precaucoes: [
        'Ajustar dose na insuficiência renal',
        'Monitorar comportamento em crianças e adolescentes',
        'Não substitui a vacinação anual contra influenza',
      ],
      interacoes: [
        'Vacina de influenza de vírus vivo atenuado (intranasal): o antiviral pode reduzir a resposta; evitar uso próximo',
        'Probenecida: aumenta a exposição ao metabólito ativo',
      ],
      explicacaoFase2:
        'Inibidor da neuraminidase: bloqueia a enzima que o vírus da gripe usa para se soltar da célula infectada, reduzindo a disseminação do vírus.',
      explicacaoFase3:
        'O efeito mais característico é a intolerância gastrointestinal (náuseas e vômitos), atenuada quando o fármaco é tomado com alimento.',
      referencias: [REF_GG, REF_KATZUNG, REF_INFLUENZA, 'Uyeki TM et al. IDSA Clinical Practice Guidelines — Seasonal Influenza (2018)'],
      dataRevisao: DATA,
      validacao: 'revisado_referencias',
    },
  ],

  vinculosExtras: [],

  // =================================================================
  // RESUMO DO GRUPO
  // =================================================================
  resumos: [
    {
      grupoId: 'antimicrobianos',
      visaoGeral: [
        'Antimicrobianos são fármacos que matam ou inibem micro-organismos e se dividem, conforme o alvo, em antibacterianos, antifúngicos, antivirais e antiparasitários. O termo "antibiótico", em sentido estrito, designa substâncias produzidas por micro-organismos (como a penicilina, de Penicillium) que agem contra bactérias; na prática clínica é usado para todos os antibacterianos, inclusive os sintéticos (fluoroquinolonas, sulfonamidas). Ou seja, todo antibiótico é um antimicrobiano, mas nem todo antimicrobiano é antibiótico: aciclovir e fluconazol, por exemplo, não tratam bactérias.',
        'A toxicidade seletiva explora diferenças entre o micro-organismo e o hospedeiro. Os antibacterianos atuam na parede de peptidoglicano (betalactâmicos, glicopeptídeos), no ribossomo 70S (macrolídeos, lincosamidas e cloranfenicol na 50S; tetraciclinas e aminoglicosídeos na 30S), nas topoisomerases (fluoroquinolonas), na via do folato (sulfonamidas e trimetoprima) ou no DNA de anaeróbios (nitroimidazóis). Os antifúngicos atingem o ergosterol (azóis inibem sua síntese; polienos se ligam a ele) ou a β-glucana da parede (equinocandinas). Os antivirais atuam em etapas do ciclo viral, como a DNA-polimerase dos herpesvírus (aciclovir) e a liberação dos vírions da influenza (oseltamivir). Antibacterianos não têm efeito sobre vírus: prescrevê-los em resfriado, gripe ou bronquite aguda viral apenas seleciona resistência.',
        'A resistência antimicrobiana é uma das principais ameaças à saúde pública. Mecanismos centrais: betalactamases (penicilinases, ESBL que hidrolisam cefalosporinas de 3ª geração, AmpC, e carbapenemases como KPC, NDM e OXA-48), alteração do alvo (PBP2a codificada pelo mecA no MRSA; troca de D-Ala-D-Ala por D-Ala-D-Lac no VRE; mutações nas topoisomerases), bombas de efluxo, redução de porinas e metilação ribossômica. O uso racional (stewardship) inclui: tratar apenas infecção bacteriana provável, colher culturas antes da primeira dose quando indicado, escolher o espectro mais estreito eficaz, usar a dose e a duração corretas (cursos curtos quando validados), fazer descalonamento após o antibiograma e trocar a via IV pela oral quando possível.',
        'A OMS classifica os antibióticos na lista AWaRe: Access (primeira escolha, menor potencial de resistência — amoxicilina, penicilina G, cefalexina, doxiciclina, SMX-TMP, metronidazol, clindamicina, gentamicina), Watch (maior potencial de resistência, uso priorizado e monitorado — macrolídeos, fluoroquinolonas, cefalosporinas de 2ª a 4ª geração, carbapenêmicos, vancomicina) e Reserve (último recurso para multirresistentes — por exemplo, polimixinas, ceftazidima-avibactam, linezolida). No Brasil, a RDC 471/2021 da Anvisa exige a retenção da 2ª via da receita de antimicrobianos listados na farmácia, com validade de 10 dias a partir da emissão.',
      ],
      mecanismos: [
        {
          titulo: 'Betalactâmicos (penicilinas, cefalosporinas, carbapenêmicos, monobactâmicos)',
          texto:
            'Têm o anel betalactâmico, que imita o terminal D-Ala-D-Ala e acila de forma covalente as PBPs (transpeptidases), impedindo a reticulação do peptidoglicano. A parede enfraquecida e a atividade de autolisinas causam lise: são bactericidas tempo-dependentes (o que importa é o tempo acima da CIM, daí doses fracionadas ou infusão prolongada). As penicilinas vão do espectro estreito (penicilina G) às aminopenicilinas (amoxicilina, ampicilina) e antiestafilocócicas (oxacilina); as cefalosporinas ganham cobertura de Gram-negativos da 1ª à 3ª geração e a 4ª associa Pseudomonas e Gram-positivos; os carbapenêmicos resistem a ESBL e AmpC. Os inibidores de betalactamase (clavulanato, sulbactam, tazobactam, avibactam) protegem o betalactâmico. Nenhum betalactâmico clássico age contra MRSA (PBP2a) ou germes sem parede (Mycoplasma).',
        },
        {
          titulo: 'Glicopeptídeos (vancomicina)',
          texto:
            'Ligam-se diretamente ao substrato, o terminal D-Ala-D-Ala do precursor do peptidoglicano, e não à enzima, bloqueando transglicosilação e transpeptidação. São moléculas grandes que não atravessam a membrana externa, por isso só agem contra Gram-positivos, incluindo MRSA e Clostridioides difficile (via oral, que não é absorvida). São bactericidas lentos, com efeito dependente da AUC/CIM, e exigem monitoramento sérico. O VRE altera o terminal para D-Ala-D-Lac, com afinidade mil vezes menor.',
        },
        {
          titulo: 'Inibidores da síntese proteica (macrolídeos, lincosamidas, tetraciclinas, aminoglicosídeos)',
          texto:
            'Aproveitam a diferença entre ribossomo bacteriano 70S (30S + 50S) e humano 80S. Macrolídeos e clindamicina ligam-se ao 23S rRNA da 50S e bloqueiam a translocação e a formação da ligação peptídica (bacteriostáticos); a metilação do sítio (gene erm) confere resistência cruzada MLSB. Tetraciclinas ligam-se à 30S e impedem a entrada do aminoacil-tRNA no sítio A. Aminoglicosídeos também se ligam à 30S, mas causam leitura errada do código e são bactericidas concentração-dependentes; dependem de transporte ativo dependente de O2, por isso não agem em anaeróbios e têm sinergismo com betalactâmicos, que facilitam sua entrada.',
        },
        {
          titulo: 'Fluoroquinolonas',
          texto:
            'Inibem a DNA-girase (topoisomerase II, alvo principal em Gram-negativos) e a topoisomerase IV (alvo principal em Gram-positivos), estabilizando o complexo enzima-DNA clivado e gerando quebras letais. São bactericidas concentração-dependentes, com excelente biodisponibilidade oral e penetração tecidual. O ciprofloxacino é mais ativo contra Gram-negativos e Pseudomonas; levofloxacino e moxifloxacino são "respiratórias" (pneumococo e atípicos). A resistência surge por mutações nas topoisomerases e por efluxo, e cresce rapidamente com o uso excessivo; seus efeitos adversos incapacitantes levaram a FDA a restringir o uso em infecções leves.',
        },
        {
          titulo: 'Antifolatos (sulfametoxazol + trimetoprima) e nitroimidazóis (metronidazol)',
          texto:
            'Bactérias precisam sintetizar o folato a partir do PABA, enquanto humanos o obtêm da dieta. O sulfametoxazol compete com o PABA na di-hidropteroato sintase e a trimetoprima inibe a DHFR bacteriana; o bloqueio sequencial é sinérgico e reduz a seleção de resistência. O metronidazol é um pró-fármaco ativado por redução do grupo nitro por ferredoxinas de anaeróbios e protozoários; os radicais formados fragmentam o DNA, o que explica a atividade restrita a anaeróbios (Bacteroides, Clostridioides) e protozoários (Trichomonas, Giardia, Entamoeba).',
        },
        {
          titulo: 'Antifúngicos (azóis e polienos) e antivirais (análogos de nucleosídeo e inibidores da neuraminidase)',
          texto:
            'O ergosterol é o esterol da membrana fúngica (o humano é o colesterol). Os azóis inibem a 14α-desmetilase (CYP51) e reduzem o ergosterol; por inibirem também CYPs humanos, geram muitas interações. Os polienos (anfotericina B) ligam-se ao ergosterol e abrem poros; a ligação residual ao colesterol explica a nefrotoxicidade. O aciclovir é fosforilado primeiro pela timidina-cinase do herpesvírus e, como trifosfato, inibe a DNA-polimerase viral e termina a cadeia; a resistência vem de mutações na timidina-cinase. O oseltamivir, análogo do ácido siálico, inibe a neuraminidase da influenza e impede a liberação dos novos vírus; o benefício é maior quanto mais cedo é iniciado.',
        },
      ],
      fluxogramas: [
        {
          titulo: 'Síntese da parede bacteriana e alvos dos antibióticos',
          passos: [
            'Precursor UDP-NAM-pentapeptídeo com terminal D-Ala-D-Ala (citoplasma)',
            'Transporte pela membrana (bactoprenol)',
            'Transglicosilação: alongamento das cadeias de glicano (← vancomicina se liga ao D-Ala-D-Ala e bloqueia)',
            'Transpeptidação pelas PBPs: ligações cruzadas entre cadeias (← betalactâmicos acilam as PBPs)',
            'Betalactamases hidrolisam o anel betalactâmico (← clavulanato, sulbactam, tazobactam, avibactam protegem)',
            'Parede sem reticulação + autolisinas → lise osmótica da bactéria (efeito bactericida)',
          ],
        },
        {
          titulo: 'Via do folato bacteriano — bloqueio sequencial',
          passos: [
            'PABA + pteridina',
            'Di-hidropteroato sintase (← sulfametoxazol, análogo do PABA)',
            'Ácido di-hidrofólico',
            'Di-hidrofolato redutase bacteriana (← trimetoprima)',
            'Ácido tetra-hidrofólico',
            'Síntese de purinas e timidina → DNA bacteriano',
          ],
        },
        {
          titulo: 'Ativação seletiva do aciclovir em célula infectada por herpesvírus',
          passos: [
            'Aciclovir (ou valaciclovir → aciclovir no fígado/intestino)',
            'Timidina-cinase viral (HSV/VZV): aciclovir-monofosfato — etapa ausente em células não infectadas',
            'Cinases celulares: aciclovir-difosfato → aciclovir-trifosfato',
            'Inibição competitiva da DNA-polimerase viral',
            'Incorporação ao DNA viral → terminação da cadeia (falta o grupo 3′-OH)',
          ],
        },
      ],
      eaFrequentes: [
        {
          efeito: 'Diarreia associada a antibiótico',
          classes: 'Praticamente todos os antibacterianos, em especial amoxicilina-clavulanato, cefalosporinas, clindamicina',
          mecanismo: 'Desequilíbrio da microbiota intestinal; o clavulanato estimula a motilidade',
        },
        {
          efeito: 'Exantema maculopapular',
          classes: 'Aminopenicilinas (sobretudo na mononucleose), sulfonamidas, cefalosporinas',
          mecanismo: 'Reação de hipersensibilidade tardia mediada por linfócitos T, na maioria das vezes não IgE',
        },
        {
          efeito: 'Intolerância gastrointestinal',
          classes: 'Macrolídeos (principalmente eritromicina), metronidazol, tetraciclinas, oseltamivir',
          mecanismo: 'Eritromicina é agonista do receptor de motilina; tetraciclinas irritam a mucosa esofágica',
        },
        {
          efeito: 'Gosto metálico (disgeusia)',
          classes: 'Metronidazol, claritromicina, clindamicina IV',
        },
        {
          efeito: 'Fotossensibilidade',
          classes: 'Tetraciclinas (doxiciclina), fluoroquinolonas, sulfonamidas',
          mecanismo: 'Reação fototóxica: o fármaco absorve UV na pele e gera espécies reativas',
        },
        {
          efeito: 'Reação infusional (síndrome do homem vermelho)',
          classes: 'Vancomicina',
          mecanismo: 'Liberação direta de histamina por mastócitos quando infundida rapidamente; não é alergia IgE',
        },
        {
          efeito: 'Hipocalemia e hipomagnesemia',
          classes: 'Anfotericina B',
          mecanismo: 'Lesão tubular com perda renal de potássio e magnésio',
        },
      ],
      eaGraves: [
        {
          efeito: 'Anafilaxia',
          classes: 'Betalactâmicos (penicilinas > cefalosporinas > carbapenêmicos), sulfonamidas, quinolonas',
          mecanismo: 'Hipersensibilidade tipo I (IgE) ao núcleo ou à cadeia lateral do fármaco',
        },
        {
          efeito: 'Colite por Clostridioides difficile',
          classes: 'Clindamicina, fluoroquinolonas, cefalosporinas, amoxicilina-clavulanato, carbapenêmicos',
          mecanismo: 'Supressão da microbiota anaeróbia protetora e proliferação de C. difficile toxigênico',
        },
        {
          efeito: 'Ototoxicidade e nefrotoxicidade',
          classes: 'Aminoglicosídeos (oto irreversível), vancomicina, anfotericina B (nefro)',
          mecanismo: 'Acúmulo nas células ciliadas e no túbulo proximal; vasoconstrição aferente e lesão tubular (anfotericina)',
        },
        {
          efeito: 'Prolongamento do intervalo QT e torsades de pointes',
          classes: 'Macrolídeos, fluoroquinolonas (moxifloxacino > levofloxacino > ciprofloxacino), azóis',
          mecanismo: 'Bloqueio de canais de potássio hERG (IKr); somado a hipocalemia e outros fármacos',
        },
        {
          efeito: 'Tendinopatia/ruptura de tendão, neuropatia periférica, disglicemia, aneurisma de aorta',
          classes: 'Fluoroquinolonas',
          mecanismo: 'Lesão de tenócitos e da matriz de colágeno; risco maior em idosos e com corticoides',
        },
        {
          efeito: 'Stevens-Johnson / necrólise epidérmica tóxica',
          classes: 'Sulfonamidas (SMX-TMP), betalactâmicos, azóis (raros)',
          mecanismo: 'Reação imune tardia mediada por linfócitos T citotóxicos',
        },
        {
          efeito: 'Neurotoxicidade e convulsões',
          classes: 'Cefepima, carbapenêmicos (imipeném > meropeném), penicilina G em altas doses, metronidazol, aciclovir',
          mecanismo: 'Antagonismo do receptor GABA-A pelos betalactâmicos; acúmulo na insuficiência renal',
        },
        {
          efeito: 'Hepatotoxicidade',
          classes: 'Azóis, amoxicilina-clavulanato, macrolídeos (estolato de eritromicina), oxacilina',
        },
        {
          efeito: 'Insuficiência cardíaca',
          classes: 'Itraconazol',
          mecanismo: 'Efeito inotrópico negativo',
        },
      ],
      primeirasLinhas: [
        {
          condicao: 'Faringoamigdalite estreptocócica (S. pyogenes)',
          recomendacao:
            'Amoxicilina VO por 10 dias ou penicilina G benzatina IM em dose única. Alergia não anafilática: cefalexina. Alergia anafilática: clindamicina ou azitromicina/claritromicina.',
          observacao: 'O objetivo inclui a prevenção da febre reumática; a maioria das faringites é viral e não exige antibiótico.',
          fonte: 'IDSA 2012 (Shulman et al.); OMS AWaRe Antibiotic Book 2022',
        },
        {
          condicao: 'Pneumonia adquirida na comunidade — ambulatorial, sem comorbidades',
          recomendacao: 'Amoxicilina em alta dose; alternativas: doxiciclina ou macrolídeo (este se resistência pneumocócica local < 25%).',
          fonte: 'ATS/IDSA 2019; SBPT 2018',
        },
        {
          condicao: 'Pneumonia adquirida na comunidade — ambulatorial, com comorbidades',
          recomendacao:
            'Amoxicilina-clavulanato ou cefalosporina (cefuroxima) + macrolídeo ou doxiciclina; ou fluoroquinolona respiratória (levofloxacino, moxifloxacino) em monoterapia.',
          fonte: 'ATS/IDSA 2019; SBPT 2018',
        },
        {
          condicao: 'Pneumonia adquirida na comunidade — internação em enfermaria',
          recomendacao: 'Betalactâmico (ceftriaxona ou ampicilina-sulbactam) + macrolídeo (azitromicina), ou fluoroquinolona respiratória.',
          observacao: 'Cobertura de MRSA ou Pseudomonas apenas com fatores de risco ou isolamento prévio.',
          fonte: 'ATS/IDSA 2019; SBPT 2018',
        },
        {
          condicao: 'Cistite não complicada em mulher',
          recomendacao:
            'Nitrofurantoína por 5 dias, fosfomicina-trometamol 3 g em dose única ou SMX-TMP por 3 dias (se resistência local < 20%).',
          observacao: 'Fluoroquinolonas devem ser reservadas para outras infecções (efeitos adversos e resistência).',
          fonte: 'IDSA/ESCMID 2011 (Gupta et al.); FDA 2016; OMS AWaRe 2022',
        },
        {
          condicao: 'Sífilis (primária, secundária e latente recente)',
          recomendacao:
            'Penicilina G benzatina 2,4 milhões UI IM em dose única; latente tardia ou de duração ignorada: 2,4 milhões UI semanais por 3 semanas. Neurossífilis: penicilina G cristalina IV por 14 dias.',
          observacao:
            'Na gestação, só a penicilina é considerada tratamento adequado para prevenir sífilis congênita; em alergia, dessensibilizar. Doxiciclina é alternativa apenas fora da gestação.',
          fonte: 'PCDT IST — Ministério da Saúde (2022)',
        },
        {
          condicao: 'Gonorreia e uretrite/cervicite',
          recomendacao: 'Ceftriaxona 500 mg IM dose única + azitromicina 1 g VO dose única (cobre gonococo e clamídia).',
          fonte: 'PCDT IST — Ministério da Saúde (2022)',
        },
        {
          condicao: 'Celulite e erisipela não purulentas',
          recomendacao:
            'Cefalexina VO (ou penicilina/amoxicilina na erisipela); casos graves: cefazolina ou oxacilina IV.',
          fonte: 'IDSA 2014 — Skin and Soft Tissue Infections',
        },
        {
          condicao: 'Abscesso cutâneo / celulite purulenta com risco de MRSA comunitário',
          recomendacao:
            'Drenagem é a base; quando há indicação de antibiótico: SMX-TMP ou doxiciclina (ou clindamicina se sensível). Infecção grave ou hospitalizada: vancomicina IV.',
          fonte: 'IDSA 2014 — Skin and Soft Tissue Infections',
        },
        {
          condicao: 'Colite por Clostridioides difficile',
          recomendacao: 'Fidaxomicina ou vancomicina oral; metronidazol oral apenas em episódio não grave quando as anteriores não estiverem disponíveis.',
          fonte: 'IDSA/SHEA 2021',
        },
        {
          condicao: 'Vaginose bacteriana e tricomoníase',
          recomendacao: 'Metronidazol 500 mg VO 12/12 h por 7 dias (alternativa na vaginose: metronidazol gel vaginal ou clindamicina creme).',
          fonte: 'PCDT IST — Ministério da Saúde (2022)',
        },
        {
          condicao: 'Candidíase vulvovaginal não complicada',
          recomendacao: 'Fluconazol 150 mg VO em dose única ou antifúngico azólico tópico vaginal.',
          observacao: 'Na gestação, preferir a via tópica.',
          fonte: 'PCDT IST — Ministério da Saúde (2022)',
        },
        {
          condicao: 'Meningite criptocócica',
          recomendacao:
            'Indução com anfotericina B (preferencialmente lipossomal) + flucitosina; consolidação e manutenção com fluconazol.',
          fonte: 'OMS 2022 — Cryptococcal disease guidelines',
        },
        {
          condicao: 'Herpes genital e herpes-zóster',
          recomendacao: 'Aciclovir ou valaciclovir VO; zóster: iniciar idealmente em até 72 h. Encefalite herpética: aciclovir IV.',
          fonte: 'PCDT IST — Ministério da Saúde (2022); Goodman & Gilman 14ª ed.',
        },
        {
          condicao: 'Influenza (síndrome gripal com fator de risco ou SRAG)',
          recomendacao: 'Oseltamivir VO por 5 dias, iniciado o mais cedo possível, de preferência em até 48 h do início dos sintomas.',
          observacao: 'Em grupos de risco e SRAG, tratar mesmo após 48 h; não esperar confirmação laboratorial.',
          fonte: 'Ministério da Saúde — Protocolo de Tratamento de Influenza (2023)',
        },
      ],
      contraindicacoes: [
        'Anafilaxia prévia a penicilina contraindica penicilinas; cefalosporinas e carbapenêmicos exigem avaliação (reatividade cruzada baixa, ligada às cadeias laterais)',
        'Tetraciclinas: gestação, lactação e crianças menores de 8 anos (dentes e ossos), salvo indicação específica como febre maculosa',
        'Fluoroquinolonas: histórico de tendinopatia por quinolona; evitar em crianças, gestantes, miastenia gravis e infecções leves com alternativas',
        'SMX-TMP: gestação a termo e neonatos (kernicterus), deficiência de folato, alergia a sulfonamidas',
        'Ceftriaxona: neonatos com hiperbilirrubinemia ou recebendo cálcio IV',
        'Metronidazol: uso de álcool e de dissulfiram',
        'Itraconazol: insuficiência cardíaca (para onicomicose); azóis com substratos do CYP3A4 de índice terapêutico estreito',
        'Claritromicina e eritromicina: uso com sinvastatina/lovastatina, ergotamínicos, pimozida, colchicina em insuficiência renal',
      ],
      interacoes: [
        'Quelação: fluoroquinolonas e tetraciclinas + antiácidos, cálcio, ferro, zinco, magnésio → absorção muito reduzida (separar as tomadas)',
        'Inibição do CYP3A4: claritromicina, eritromicina e itraconazol aumentam estatinas (rabdomiólise), colchicina, benzodiazepínicos, ciclosporina, tacrolimo',
        'Varfarina: SMX-TMP, metronidazol, fluconazol, macrolídeos e quinolonas elevam o INR',
        'Prolongamento do QT aditivo: macrolídeos + fluoroquinolonas + azóis + antipsicóticos + antiarrítmicos',
        'Nefrotoxicidade aditiva: aminoglicosídeos + vancomicina + anfotericina B + diuréticos de alça + contrastes; vancomicina + piperacilina-tazobactam',
        'Carbapenêmicos reduzem drasticamente os níveis de ácido valproico (risco de convulsão)',
        'SMX-TMP + IECA/BRA/espironolactona → hipercalemia; SMX-TMP + metotrexato → mielotoxicidade',
        'Ciprofloxacino inibe CYP1A2: teofilina, tizanidina e cafeína',
        'Metronidazol + álcool → reação tipo dissulfiram',
      ],
      comparacoes: [
        {
          titulo: 'Antibiótico x antimicrobiano; bactericida x bacteriostático',
          texto:
            'Antimicrobiano é a categoria ampla (antibacterianos, antifúngicos, antivirais, antiparasitários); antibiótico refere-se aos antibacterianos. Bactericidas (betalactâmicos, glicopeptídeos, aminoglicosídeos, quinolonas, metronidazol) matam a bactéria e são preferidos em endocardite, meningite e neutropenia; bacteriostáticos (macrolídeos, tetraciclinas, clindamicina, sulfonamidas isoladas) inibem o crescimento e dependem da imunidade do hospedeiro. Tempo-dependentes (betalactâmicos, vancomicina) x concentração-dependentes (aminoglicosídeos, quinolonas) orientam o esquema posológico.',
        },
        {
          titulo: 'Gerações de cefalosporinas',
          texto:
            '1ª geração (cefalexina, cefazolina): cocos Gram-positivos, pele e profilaxia cirúrgica. 2ª (cefuroxima): acrescenta H. influenzae e Moraxella, uso respiratório. 3ª (ceftriaxona, cefotaxima, ceftazidima): foco em Gram-negativos e meninges; só a ceftazidima cobre Pseudomonas. 4ª (cefepima): Gram-negativos incluindo Pseudomonas, estável a AmpC, mantendo Gram-positivos. 5ª (ceftarolina): ativa contra MRSA. Nenhuma cobre enterococo.',
        },
        {
          titulo: 'Ciprofloxacino x levofloxacino x moxifloxacino',
          texto:
            'Ciprofloxacino: melhor contra Gram-negativos e Pseudomonas, fraco contra pneumococo — uso urinário e intestinal. Levofloxacino: quinolona respiratória que mantém boa concentração urinária. Moxifloxacino: melhor contra Gram-positivos e anaeróbios, porém sem concentração urinária útil e com maior prolongamento do QT. Todos compartilham os alertas de tendinopatia, neuropatia, disglicemia e efeitos no SNC.',
        },
        {
          titulo: 'Azitromicina x claritromicina x eritromicina',
          texto:
            'A eritromicina tem pior tolerância gastrointestinal (agonista da motilina), meia-vida curta e muitas interações (CYP3A4). A claritromicina é mais estável em ácido, tem melhor ação contra H. pylori e micobactérias atípicas, mas também inibe fortemente o CYP3A4. A azitromicina tem meia-vida longa e alta concentração tecidual (cursos de 3–5 dias), quase sem inibição do CYP3A4; os três prolongam o QT.',
        },
        {
          titulo: 'Fluconazol x itraconazol x anfotericina B',
          texto:
            'Fluconazol: oral/IV, hidrossolúvel, ótimo para Candida sensível e criptococo (penetra no líquor), sem ação contra Aspergillus. Itraconazol: lipofílico, cobre fungos dimórficos (paracoccidioidomicose, histoplasmose, esporotricose) e Aspergillus, absorção errática e risco de insuficiência cardíaca. Anfotericina B: fungicida de espectro mais amplo, IV, reservada às formas graves, com nefrotoxicidade e distúrbios eletrolíticos (menores na formulação lipossomal).',
        },
        {
          titulo: 'Aciclovir x valaciclovir; antivirais x antibióticos',
          texto:
            'O valaciclovir é pró-fármaco do aciclovir com biodisponibilidade cerca de 3 a 5 vezes maior, permitindo menos tomadas diárias; o aciclovir IV é o escolhido em encefalite e doença grave. Nenhum dos dois age contra influenza; o oseltamivir, por sua vez, não age contra herpesvírus. Antibacterianos não tratam infecções virais.',
        },
        {
          titulo: 'Vancomicina x oxacilina no S. aureus',
          texto:
            'Para MSSA, a oxacilina (ou cefazolina) é superior à vancomicina, com menor mortalidade em bacteremia; a vancomicina deve ser reservada ao MRSA ou à alergia grave a betalactâmicos. É um exemplo de descalonamento guiado por antibiograma.',
        },
      ],
      memorizar: [
        'Todo antibiótico é antimicrobiano, mas antifúngicos e antivirais não tratam bactérias — e antibacterianos não tratam vírus.',
        'Betalactâmicos inibem as PBPs; vancomicina se liga ao D-Ala-D-Ala; ambos atuam na parede celular.',
        'MRSA = PBP2a (mecA): resistente a quase todos os betalactâmicos; tratar com vancomicina (grave) ou SMX-TMP/doxiciclina (pele, comunitário).',
        'ESBL hidrolisa cefalosporinas de 3ª geração → carbapenêmico; KPC/NDM destroem carbapenêmicos → antibióticos Reserve.',
        'VRE: troca D-Ala-D-Ala por D-Ala-D-Lac.',
        'Penicilina G benzatina é o tratamento da sífilis, e o único adequado na gestação.',
        'Amoxicilina + mononucleose = exantema maculopapular (não é necessariamente alergia).',
        'Ceftriaxona: pseudolitíase biliar; não usar com cálcio IV em neonatos.',
        'Cefepima e carbapenêmicos: neurotoxicidade/convulsões, sobretudo sem ajuste renal; meropeném derruba o valproato.',
        'Aminoglicosídeos: ototoxicidade (irreversível) + nefrotoxicidade + bloqueio neuromuscular; não agem em anaeróbios.',
        'Vancomicina infundida rápido → síndrome do homem vermelho (histamina, não IgE).',
        'Fluoroquinolonas: tendão, QT, neuropatia, disglicemia, aorta; quelação com cátions; poupar na cistite.',
        'Doxiciclina: fotossensibilidade, esofagite e dentes em crianças; clindamicina: C. difficile; metronidazol: gosto metálico e efeito com álcool.',
        'SMX-TMP: Stevens-Johnson, hipercalemia (trimetoprima ~ amilorida), interação com varfarina e metotrexato.',
        'Anfotericina B = nefrotoxicidade e hipocalemia; itraconazol = insuficiência cardíaca; azóis = interações por CYP.',
        'RDC 471/2021: farmácia retém a 2ª via da receita de antimicrobiano; validade de 10 dias.',
      ],
      fontes: [
        REF_GG,
        REF_KATZUNG,
        REF_RANG,
        REF_AWARE,
        REF_RDC,
        REF_RENAME,
        REF_IST,
        REF_PAC,
        REF_SBPT,
        REF_FARINGITE,
        REF_PELE,
        REF_ITU,
        REF_CDI,
        REF_INFLUENZA,
        REF_FDA_FQ,
        'OMS. Guidelines for diagnosing, preventing and managing cryptococcal disease (2022)',
      ],
      dataRevisao: DATA,
    },
  ],
};

export default dados;
