import type { ModuloDados } from '../types';

// =====================================================================
// Grupos: 'analgesicos' (Analgésicos e antitérmicos) e
//         'antiinflamatorios' (Anti-inflamatórios)
// Conteúdo educacional redigido a partir de referências-padrão.
// =====================================================================

const REV = '10/nov/2026';

const REF_GG = 'Brunton LL, Knollmann BC. Goodman & Gilman: As Bases Farmacológicas da Terapêutica. 14ª ed. AMGH; 2023.';
const REF_KATZUNG = 'Katzung BG, Vanderah TW. Farmacologia Básica e Clínica. 15ª ed. AMGH; 2023.';
const REF_RANG = 'Rang HP, Ritter JM, Flower RJ, Henderson G. Rang & Dale Farmacologia. 9ª ed. Elsevier; 2020.';
const REF_FTN = 'Brasil. Ministério da Saúde. Formulário Terapêutico Nacional / RENAME 2024.';
const REF_344 = 'Brasil. ANVISA. Portaria SVS/MS nº 344/1998 e atualizações (listas de substâncias sujeitas a controle especial).';
const REF_CDC = 'Dowell D et al. CDC Clinical Practice Guideline for Prescribing Opioids for Pain — United States, 2022. MMWR 2022;71(3).';
const REF_OMS_DOR = 'WHO. Guidelines for the pharmacological and radiotherapeutic management of cancer pain in adults and adolescents. 2018.';

const dados: ModuloDados = {
  // -------------------------------------------------------------------
  // CLASSES
  // -------------------------------------------------------------------
  classes: [
    // ---------- Analgésicos e antitérmicos ----------
    {
      id: 'derivado-para-aminofenol',
      nome: 'Analgésicos não opioides derivados do para-aminofenol',
      grupoId: 'analgesicos',
      familia: 'Analgésicos não opioides',
      mecanismoCurto:
        'Inibem fracamente as cicloxigenases, sobretudo no sistema nervoso central (onde o tônus de peróxidos é baixo), reduzindo prostaglandinas centrais; efeito analgésico e antitérmico, com ação anti-inflamatória periférica desprezível.',
      sinonimos: ['para-aminofenol', 'paraaminofenol', 'derivados do para-aminofenol', 'anilidas', 'analgesico nao opioide', 'analgesico e antitermico', 'p-aminofenol'],
    },
    {
      id: 'derivado-pirazolonico',
      nome: 'Analgésicos não opioides derivados pirazolônicos',
      grupoId: 'analgesicos',
      familia: 'Analgésicos não opioides',
      mecanismoCurto:
        'Metabólitos ativos inibem a síntese de prostaglandinas (predominantemente central) e parecem envolver vias canabinoides e opioides endógenas; potente efeito analgésico, antitérmico e espasmolítico, com fraca ação anti-inflamatória.',
      sinonimos: ['pirazolona', 'pirazolonas', 'pirazolonico', 'derivado pirazolonico', 'derivados da pirazolona', 'analgesico nao opioide', 'pyrazolone'],
    },
    {
      id: 'analgesico-salicilato',
      nome: 'Salicilatos (AINE) de uso analgésico e antitérmico',
      grupoId: 'analgesicos',
      familia: 'Analgésicos não opioides',
      mecanismoCurto:
        'Inibem as cicloxigenases periféricas e centrais, reduzindo prostaglandinas que sensibilizam nociceptores e elevam o ponto de ajuste térmico hipotalâmico.',
      sinonimos: ['salicilato', 'salicilatos', 'aine', 'anti-inflamatorio nao esteroidal', 'acido salicilico derivado'],
    },
    {
      id: 'opioide-agonista-forte',
      nome: 'Opioides agonistas fortes (agonistas plenos do receptor μ)',
      grupoId: 'analgesicos',
      familia: 'Analgésicos opioides',
      mecanismoCurto:
        'Agonistas plenos do receptor opioide μ (acoplado à proteína Gi/o): fecham canais de cálcio pré-sinápticos e abrem canais de potássio pós-sinápticos, inibindo a transmissão nociceptiva na medula e no tronco encefálico.',
      sinonimos: ['opioide forte', 'opioides fortes', 'agonista opioide forte', 'agonista mu', 'agonista pleno mu', 'agonista total do receptor mu', 'opiaceo', 'opioide', 'hipnoanalgesico', 'analgesico narcotico', 'strong opioid'],
    },
    {
      id: 'opioide-agonista-fraco',
      nome: 'Opioides agonistas fracos',
      grupoId: 'analgesicos',
      familia: 'Analgésicos opioides',
      mecanismoCurto:
        'Opioides de baixa afinidade/eficácia no receptor μ ou pró-fármacos cuja analgesia depende de conversão a metabólito mais potente; usados no degrau 2 da escada analgésica.',
      sinonimos: ['opioide fraco', 'opioides fracos', 'agonista opioide fraco', 'weak opioid', 'opioide de baixa potencia'],
    },
    {
      id: 'opioide-mecanismo-duplo',
      nome: 'Opioides atípicos de mecanismo duplo',
      grupoId: 'analgesicos',
      familia: 'Analgésicos opioides',
      mecanismoCurto:
        'Combinam agonismo μ fraco (principalmente por metabólito ativo) com inibição da recaptação de serotonina e noradrenalina, reforçando as vias descendentes inibitórias da dor.',
      sinonimos: ['mecanismo duplo', 'opioide atipico', 'opioide de acao dual', 'agonista mu e inibidor da recaptacao de serotonina e noradrenalina', 'opioide fraco atipico'],
    },
    {
      id: 'opioide-agonista-parcial',
      nome: 'Opioides agonistas parciais e agonistas-antagonistas',
      grupoId: 'analgesicos',
      familia: 'Analgésicos opioides',
      mecanismoCurto:
        'Ativam o receptor μ com eficácia submáxima (ex.: buprenorfina) ou ativam κ e bloqueiam μ (ex.: nalbufina), produzindo efeito-teto na depressão respiratória.',
      sinonimos: ['agonista parcial', 'agonista parcial mu', 'agonista-antagonista', 'agonista antagonista opioide', 'buprenorfina', 'nalbufina'],
    },

    // ---------- Anti-inflamatórios ----------
    {
      id: 'aine-nao-seletivo',
      nome: 'Anti-inflamatórios não esteroidais não seletivos',
      sigla: 'AINE',
      grupoId: 'antiinflamatorios',
      familia: 'AINEs',
      mecanismoCurto:
        'Inibem de forma reversível e competitiva tanto a COX-1 quanto a COX-2, reduzindo prostaglandinas e tromboxanos; efeitos analgésico, antitérmico e anti-inflamatório.',
      sinonimos: ['aine', 'aines', 'aine nao seletivo', 'anti-inflamatorio nao esteroidal', 'antiinflamatorio nao esteroide', 'inibidor nao seletivo da cox', 'inibidor de cox-1 e cox-2', 'nsaid', 'nonselective nsaid'],
    },
    {
      id: 'aine-preferencial-cox2',
      nome: 'AINEs preferenciais (relativamente seletivos) para COX-2',
      sigla: 'AINE',
      grupoId: 'antiinflamatorios',
      familia: 'AINEs',
      mecanismoCurto:
        'Inibem a COX-2 com preferência sobre a COX-1 nas doses usuais, mas a seletividade é parcial e dose-dependente; em doses altas também inibem a COX-1.',
      sinonimos: ['preferencial cox-2', 'preferencial cox2', 'inibidor preferencial da cox-2', 'aine preferencial', 'relativamente seletivo cox-2', 'seletividade parcial cox-2'],
    },
    {
      id: 'coxibe',
      nome: 'Inibidores seletivos da COX-2 (coxibes)',
      grupoId: 'antiinflamatorios',
      familia: 'AINEs',
      mecanismoCurto:
        'Inibem seletivamente a COX-2 (induzida na inflamação), poupando a COX-1 plaquetária e gástrica; menos lesão gastrointestinal, sem efeito antiagregante e com risco cardiovascular trombótico.',
      sinonimos: ['coxibe', 'coxibes', 'coxib', 'coxibs', 'inibidor seletivo da cox-2', 'inibidor seletivo cox2', 'cox-2 seletivo', 'selective cox-2 inhibitor'],
    },
    {
      id: 'aine-salicilato',
      nome: 'Salicilatos — inibidor irreversível da COX',
      grupoId: 'antiinflamatorios',
      familia: 'AINEs',
      mecanismoCurto:
        'Acetila covalentemente uma serina do sítio ativo da COX-1 e da COX-2, inativando-as de forma irreversível; na plaqueta (sem núcleo) o bloqueio do tromboxano A2 dura toda a vida da célula.',
      sinonimos: ['salicilato', 'salicilatos', 'inibidor irreversivel da cox', 'acetilacao da cox', 'aine irreversivel', 'antiagregante plaquetario', 'salicylate'],
    },
    {
      id: 'corticoide-sistemico',
      nome: 'Glicocorticoides sistêmicos',
      grupoId: 'antiinflamatorios',
      familia: 'Anti-inflamatórios esteroidais',
      mecanismoCurto:
        'Ligam-se ao receptor glicocorticoide citoplasmático; o complexo vai ao núcleo e reprime genes pró-inflamatórios (NF-κB, AP-1, COX-2, citocinas) e induz genes anti-inflamatórios (anexina-1), inibindo a fosfolipase A2 a montante de todos os eicosanoides.',
      sinonimos: ['corticoide', 'corticoides', 'corticosteroide', 'corticosteroides', 'glicocorticoide', 'glicocorticoides', 'corticoide sistemico', 'anti-inflamatorio esteroidal', 'aie', 'esteroide', 'glucocorticoid', 'cortisona'],
    },
  ],

  // -------------------------------------------------------------------
  // MEDICAMENTOS
  // -------------------------------------------------------------------
  medicamentos: [
    // =================== ANALGÉSICOS NÃO OPIOIDES ===================
    {
      id: 'paracetamol',
      nome: 'Paracetamol',
      sinonimos: ['acetaminofeno', 'acetaminofen', 'acetaminophen', 'n-acetil-p-aminofenol', 'apap'],
      vinculos: [
        {
          grupoId: 'analgesicos',
          classeId: 'derivado-para-aminofenol',
          contexto: 'dor leve a moderada e febre, inclusive em gestantes, crianças e pacientes com risco gastrointestinal',
          explicacaoFase1:
            'O paracetamol é analgésico e antitérmico de primeira escolha para dor leve a moderada e febre. Praticamente não tem ação anti-inflamatória, mas também não lesa a mucosa gástrica nem altera a agregação plaquetária.',
        },
      ],
      mecanismo:
        'Inibe as cicloxigenases principalmente no SNC, onde o baixo tônus de peróxidos permite a ação do fármaco; em tecidos inflamados, ricos em peróxidos, a inibição é fraca, o que explica a ausência de efeito anti-inflamatório. Há contribuição de vias serotoninérgicas descendentes e do metabólito AM404 (ativação de TRPV1/receptores canabinoides). Reduz a PGE2 hipotalâmica, normalizando o ponto de ajuste térmico.',
      indicacoes: [
        'Dor leve a moderada (cefaleia, dor muscular, dor de dente, dismenorreia, dor pós-operatória)',
        'Febre',
        'Dor da osteoartrite (alívio sintomático)',
        'Componente do degrau 1 da escada analgésica, isolado ou associado a opioide',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['acetaminophen'],
      nomesComerciais: [
        { nome: 'Tylenol', tipo: 'referencia', verificacao: 'pendente_anvisa', obs: 'medicamento isento de prescrição (MIP) nas apresentações orais usuais' },
        { nome: 'Tylex', tipo: 'combinacao', composicao: 'paracetamol + codeína', verificacao: 'pendente_anvisa', obs: 'controle especial (Portaria 344/98)' },
        { nome: 'Ultracet', tipo: 'combinacao', composicao: 'paracetamol + tramadol', verificacao: 'pendente_anvisa', obs: 'controle especial (Portaria 344/98)' },
      ],
      generico: true,
      eaComuns: [
        { termo: 'Náuseas', sinonimos: ['nausea', 'enjoo'] },
        { termo: 'Erupção cutânea', sinonimos: ['rash', 'exantema', 'reacao alergica de pele'] },
      ],
      eaGraves: [
        {
          termo: 'Hepatotoxicidade (necrose hepática por NAPQI)',
          sinonimos: ['hepatotoxicidade', 'necrose hepatica', 'lesao hepatica', 'insuficiencia hepatica', 'toxicidade hepatica', 'napqi', 'hepatite medicamentosa', 'dano ao figado'],
        },
        { termo: 'Reações cutâneas graves (Stevens-Johnson / NET)', sinonimos: ['stevens-johnson', 'sindrome de stevens johnson', 'necrolise epidermica toxica', 'pustulose exantematica'] },
      ],
      eaCaracteristico: 'Hepatotoxicidade (necrose hepática por NAPQI)',
      distratoresEA: ['Agranulocitose', 'Úlcera péptica e sangramento gastrointestinal', 'Depressão respiratória', 'Síndrome de Reye em crianças'],
      contraindicacoes: ['Hipersensibilidade ao paracetamol', 'Insuficiência hepática grave ou doença hepática ativa descompensada'],
      precaucoes: [
        'Respeitar a dose máxima diária (em geral 4 g/dia em adultos; menor em hepatopatas, etilistas, desnutridos ou baixo peso)',
        'Atenção à duplicidade terapêutica: está presente em muitas associações antigripais e analgésicas',
        'Etilismo crônico e jejum prolongado depletam glutationa e aumentam o risco de hepatotoxicidade',
      ],
      interacoes: [
        'Álcool, isoniazida, indutores do CYP2E1/CYP3A4 (carbamazepina, fenitoína, rifampicina): aumentam a formação de NAPQI',
        'Varfarina: uso regular de doses altas pode elevar o RNI',
      ],
      explicacaoFase2:
        'É um analgésico não opioide derivado do para-aminofenol. Bloqueia a produção de prostaglandinas sobretudo no cérebro, o que reduz dor e febre, mas quase não atua na inflamação periférica.',
      explicacaoFase3:
        'Uma pequena fração do paracetamol é oxidada pelo CYP2E1 a NAPQI, um metabólito reativo normalmente neutralizado pela glutationa. Em superdose (ou com glutationa depletada) o NAPQI se acumula e causa necrose hepática centrolobular; o antídoto é a N-acetilcisteína.',
      referencias: [REF_GG, REF_KATZUNG, REF_RANG, REF_FTN, 'Bula Tylenol (paracetamol) — ANVISA.'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
      regulatorio: 'Medicamento isento de prescrição (MIP) nas apresentações orais usuais',
    },
    {
      id: 'dipirona',
      nome: 'Dipirona',
      sinonimos: ['metamizol', 'metamizole', 'dipirona sodica', 'dipirona monoidratada', 'metamizol sodico', 'novaminsulfona', 'metamizole sodium'],
      vinculos: [
        {
          grupoId: 'analgesicos',
          classeId: 'derivado-pirazolonico',
          contexto: 'dor aguda e febre, incluindo dor em cólica pela ação espasmolítica',
          explicacaoFase1:
            'A dipirona é analgésico e antitérmico potente, muito usado no Brasil para dor aguda, febre e cólicas. Tem fraca ação anti-inflamatória e causa menos irritação gástrica que os AINEs clássicos.',
        },
      ],
      mecanismo:
        'Pró-fármaco hidrolisado a 4-metilaminoantipirina (4-MAA) e 4-aminoantipirina (4-AA), que inibem a síntese de prostaglandinas, predominantemente no SNC. Há evidência de participação de metabólitos ligados a receptores canabinoides CB1 e do sistema opioidérgico na substância cinzenta periaquedutal. Possui efeito espasmolítico em músculo liso, útil em cólicas.',
      indicacoes: ['Dor de intensidade leve a intensa', 'Febre', 'Dor em cólica (renal, biliar, visceral), isolada ou associada a antiespasmódico'],
      tipoMolecula: 'pequena',
      pubchem: ['metamizole'],
      nomesComerciais: [
        { nome: 'Novalgina', tipo: 'referencia', verificacao: 'pendente_anvisa', obs: 'MIP nas apresentações orais usuais' },
        { nome: 'Anador', tipo: 'marca', verificacao: 'pendente_anvisa' },
        { nome: 'Dorflex', tipo: 'combinacao', composicao: 'dipirona + citrato de orfenadrina + cafeína', verificacao: 'pendente_anvisa' },
        { nome: 'Buscopan Composto', tipo: 'combinacao', composicao: 'dipirona + butilbrometo de escopolamina', verificacao: 'pendente_anvisa' },
      ],
      generico: true,
      eaComuns: [
        { termo: 'Hipotensão (principalmente na via intravenosa rápida)', sinonimos: ['hipotensao', 'queda de pressao', 'pressao baixa'] },
        { termo: 'Reações cutâneas alérgicas', sinonimos: ['rash', 'urticaria', 'exantema', 'alergia de pele'] },
        { termo: 'Urina avermelhada (metabólito ácido rubazônico)', sinonimos: ['urina vermelha', 'coloracao avermelhada da urina', 'acido rubazonico'] },
      ],
      eaGraves: [
        { termo: 'Agranulocitose', sinonimos: ['neutropenia grave', 'granulocitopenia', 'discrasia sanguinea', 'aplasia de medula', 'queda dos neutrofilos', 'falta de globulos brancos'] },
        { termo: 'Anafilaxia e choque', sinonimos: ['anafilaxia', 'choque anafilatico', 'reacao anafilatica'] },
      ],
      eaCaracteristico: 'Agranulocitose',
      distratoresEA: ['Hepatotoxicidade (necrose hepática por NAPQI)', 'Constipação intestinal', 'Síndrome de Reye em crianças', 'Depressão respiratória'],
      contraindicacoes: [
        'Hipersensibilidade a pirazolonas ou pirazolidinas',
        'Histórico de agranulocitose ou distúrbios da função medular',
        'Porfiria hepática aguda intermitente',
        'Deficiência de glicose-6-fosfato desidrogenase',
        'Terceiro trimestre da gestação',
        'Asma ou urticária induzidas por analgésicos (síndrome de intolerância a analgésicos)',
      ],
      precaucoes: [
        'Orientar suspensão imediata e hemograma se surgirem febre, dor de garganta ou lesões em mucosas',
        'Administrar IV lentamente, com paciente deitado, para reduzir hipotensão',
        'Cautela em lactentes menores de 3 meses ou com menos de 5 kg',
      ],
      interacoes: [
        'Metotrexato: potencialização da toxicidade hematológica',
        'Ciclosporina: redução dos níveis séricos',
        'Clorpromazina: risco de hipotermia grave',
        'Pode reduzir o efeito antiagregante do AAS em dose baixa quando administrada antes dele',
      ],
      explicacaoFase2:
        'É um analgésico não opioide derivado da pirazolona. Seus metabólitos inibem a produção de prostaglandinas no sistema nervoso central e relaxam o músculo liso, aliviando dor, febre e cólicas.',
      explicacaoFase3:
        'A agranulocitose é uma reação idiossincrásica de base imunológica (anticorpos contra granulócitos), rara mas potencialmente fatal, não dependente da dose. Por isso a dipirona foi retirada de vários países, embora permaneça disponível no Brasil.',
      referencias: [REF_GG, REF_RANG, REF_FTN, 'Bula Novalgina (dipirona monoidratada) — ANVISA.', 'ANVISA. Painel Internacional de Avaliação da Segurança da Dipirona. 2001.'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
      regulatorio: 'Medicamento isento de prescrição (MIP) nas apresentações orais usuais',
    },

    // =================== OPIOIDES ===================
    {
      id: 'tramadol',
      nome: 'Tramadol',
      sinonimos: ['cloridrato de tramadol', 'tramadol hydrochloride', 'tramadol hcl'],
      vinculos: [
        {
          grupoId: 'analgesicos',
          classeId: 'opioide-mecanismo-duplo',
          subclasse: 'Opioide fraco atípico (agonista μ + IRSN)',
          contexto: 'dor moderada a intensa (degrau 2 da escada analgésica), incluindo componente neuropático',
          explicacaoFase1:
            'O tramadol é um analgésico de ação central usado na dor moderada a intensa, ocupando o degrau 2 da escada analgésica da OMS. É frequentemente associado ao paracetamol.',
        },
      ],
      mecanismo:
        'Mistura racêmica: o enantiômero (+) e principalmente o metabólito O-desmetiltramadol (M1, formado pelo CYP2D6) são agonistas do receptor μ; o enantiômero (+) inibe a recaptação de serotonina e o (−) inibe a recaptação de noradrenalina. A soma dos dois mecanismos reforça as vias descendentes inibitórias da dor; a analgesia é apenas parcialmente revertida pela naloxona.',
      indicacoes: ['Dor moderada a intensa, aguda ou crônica'],
      tipoMolecula: 'pequena',
      pubchem: ['tramadol'],
      nomesComerciais: [
        { nome: 'Tramal', tipo: 'referencia', verificacao: 'pendente_anvisa', obs: 'controle especial (Portaria 344/98)' },
        { nome: 'Ultracet', tipo: 'combinacao', composicao: 'tramadol + paracetamol', verificacao: 'pendente_anvisa', obs: 'controle especial (Portaria 344/98)' },
      ],
      generico: true,
      eaComuns: [
        { termo: 'Náuseas e vômitos', sinonimos: ['nausea', 'vomito', 'enjoo', 'emese'] },
        { termo: 'Tontura', sinonimos: ['vertigem', 'tonteira'] },
        { termo: 'Sonolência', sinonimos: ['sedacao', 'sono'] },
        { termo: 'Constipação intestinal', sinonimos: ['constipacao', 'prisao de ventre', 'intestino preso', 'obstipacao'] },
        { termo: 'Sudorese', sinonimos: ['suor excessivo', 'hiperidrose'] },
      ],
      eaGraves: [
        {
          termo: 'Síndrome serotoninérgica',
          sinonimos: ['sindrome serotoninergica', 'toxicidade serotoninergica', 'excesso de serotonina'],
        },
        { termo: 'Convulsões', sinonimos: ['crise convulsiva', 'convulsao', 'reducao do limiar convulsivo'] },
        { termo: 'Depressão respiratória', sinonimos: ['depressao respiratoria', 'hipoventilacao', 'bradipneia'] },
        { termo: 'Hipoglicemia', sinonimos: ['glicose baixa', 'acucar baixo'] },
        { termo: 'Dependência e síndrome de abstinência', sinonimos: ['dependencia', 'abstinencia', 'adiccao', 'vicio'] },
      ],
      eaCaracteristico: 'Síndrome serotoninérgica',
      distratoresEA: ['Agranulocitose', 'Úlcera péptica e sangramento gastrointestinal', 'Rigidez torácica (síndrome do tórax rígido)', 'Hepatotoxicidade (necrose hepática por NAPQI)'],
      contraindicacoes: [
        'Uso concomitante ou nos últimos 14 dias de inibidores da MAO',
        'Epilepsia não controlada',
        'Intoxicação aguda por álcool, hipnóticos, analgésicos centrais ou psicotrópicos',
        'Crianças menores de 12 anos (FDA/ANVISA: risco em metabolizadores ultrarrápidos do CYP2D6)',
      ],
      precaucoes: [
        'Metabolizadores ultrarrápidos do CYP2D6 formam mais M1 (risco de toxicidade opioide); metabolizadores lentos têm menor analgesia',
        'Ajustar intervalo em insuficiência renal e hepática',
        'Risco de abuso e dependência, embora menor que o dos opioides fortes',
      ],
      interacoes: [
        'ISRS, IRSN, tricíclicos, IMAO, triptanas, linezolida: risco de síndrome serotoninérgica e convulsões',
        'Inibidores do CYP2D6 (fluoxetina, paroxetina, bupropiona): reduzem a formação de M1 e a analgesia opioide',
        'Depressores do SNC (benzodiazepínicos, álcool): depressão respiratória aditiva',
        'Carbamazepina: reduz níveis e eficácia do tramadol',
      ],
      explicacaoFase2:
        'É um opioide atípico de mecanismo duplo. Seu metabólito ativa fracamente o receptor μ e, ao mesmo tempo, o fármaco inibe a recaptação de serotonina e noradrenalina, fortalecendo as vias que bloqueiam a dor na medula.',
      explicacaoFase3:
        'Como aumenta a serotonina sináptica, o tramadol pode desencadear síndrome serotoninérgica (agitação, hipertermia, clônus, tremor), sobretudo com antidepressivos serotoninérgicos. O mesmo componente monoaminérgico reduz o limiar convulsivo.',
      referencias: [REF_GG, REF_KATZUNG, REF_RANG, REF_344, REF_CDC, 'Bula Tramal (cloridrato de tramadol) — ANVISA.', 'FDA Drug Safety Communication: tramadol e codeína em crianças (2017).'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
      regulatorio: 'Lista A2 (Portaria SVS/MS 344/98); formulações dentro dos limites do adendo da lista são dispensadas com Receita de Controle Especial em 2 vias',
    },
    {
      id: 'codeina',
      nome: 'Codeína',
      sinonimos: ['fosfato de codeina', 'metilmorfina', 'codeine', 'codeine phosphate'],
      vinculos: [
        {
          grupoId: 'analgesicos',
          classeId: 'opioide-agonista-fraco',
          subclasse: 'Fenantreno natural (pró-fármaco da morfina)',
          contexto: 'dor leve a moderada não controlada por analgésicos simples, geralmente associada ao paracetamol; também antitussígeno',
          explicacaoFase1:
            'A codeína é um opioide fraco usado na dor leve a moderada (degrau 2 da escada da OMS), em geral associada ao paracetamol. Também tem ação antitussígena central.',
        },
      ],
      mecanismo:
        'Tem baixa afinidade pelo receptor μ; cerca de 5–10% da dose é O-desmetilada pelo CYP2D6 a morfina, responsável pela maior parte da analgesia. Por isso a resposta varia com o genótipo do CYP2D6: metabolizadores lentos têm pouca analgesia e ultrarrápidos formam morfina em excesso. Deprime o centro da tosse no bulbo.',
      indicacoes: ['Dor leve a moderada', 'Tosse seca persistente (antitussígeno)'],
      tipoMolecula: 'pequena',
      pubchem: ['codeine'],
      nomesComerciais: [
        { nome: 'Codein', tipo: 'marca', verificacao: 'pendente_anvisa', obs: 'controle especial (Portaria 344/98)' },
        { nome: 'Tylex', tipo: 'combinacao', composicao: 'codeína + paracetamol', verificacao: 'pendente_anvisa', obs: 'controle especial (Portaria 344/98)' },
      ],
      generico: true,
      eaComuns: [
        { termo: 'Constipação intestinal', sinonimos: ['constipacao', 'prisao de ventre', 'intestino preso', 'obstipacao'] },
        { termo: 'Náuseas e vômitos', sinonimos: ['nausea', 'vomito', 'enjoo'] },
        { termo: 'Sonolência', sinonimos: ['sedacao', 'sono'] },
        { termo: 'Tontura', sinonimos: ['vertigem', 'tonteira'] },
      ],
      eaGraves: [
        {
          termo: 'Toxicidade opioide em metabolizadores ultrarrápidos do CYP2D6',
          sinonimos: ['metabolizador ultrarrapido', 'cyp2d6 ultrarrapido', 'excesso de morfina', 'intoxicacao por morfina', 'toxicidade opioide', 'depressao respiratoria em criancas'],
        },
        { termo: 'Depressão respiratória', sinonimos: ['depressao respiratoria', 'hipoventilacao', 'bradipneia'] },
        { termo: 'Dependência e síndrome de abstinência', sinonimos: ['dependencia', 'abstinencia', 'adiccao', 'vicio'] },
      ],
      eaCaracteristico: 'Toxicidade opioide em metabolizadores ultrarrápidos do CYP2D6',
      distratoresEA: ['Agranulocitose', 'Síndrome serotoninérgica', 'Úlcera péptica e sangramento gastrointestinal', 'Hepatotoxicidade (necrose hepática por NAPQI)'],
      contraindicacoes: [
        'Crianças menores de 12 anos',
        'Pós-operatório de tonsilectomia/adenoidectomia em menores de 18 anos',
        'Metabolizadores ultrarrápidos conhecidos do CYP2D6',
        'Lactação (risco de intoxicação do lactente)',
        'Depressão respiratória aguda ou asma grave',
      ],
      precaucoes: [
        'Analgesia imprevisível conforme o genótipo do CYP2D6',
        'Associar laxante em uso prolongado',
        'Respeitar o limite diário de paracetamol nas associações',
      ],
      interacoes: [
        'Inibidores do CYP2D6 (fluoxetina, paroxetina, quinidina): reduzem conversão a morfina e a analgesia',
        'Depressores do SNC (benzodiazepínicos, álcool, outros opioides): depressão respiratória aditiva',
      ],
      explicacaoFase2:
        'É um opioide fraco. Sozinha liga-se pouco ao receptor μ; seu efeito analgésico depende da conversão em morfina pela enzima hepática CYP2D6.',
      explicacaoFase3:
        'Em metabolizadores ultrarrápidos do CYP2D6, muita codeína vira morfina rapidamente, causando sedação extrema e depressão respiratória, inclusive fatal em crianças e em lactentes de mães que a usam. Daí a contraindicação abaixo de 12 anos.',
      referencias: [REF_GG, REF_KATZUNG, REF_344, REF_CDC, 'FDA Drug Safety Communication: tramadol e codeína em crianças (2017).', 'CPIC Guideline for CYP2D6, OPRM1 and COMT genotypes and opioid therapy. 2021.'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
      regulatorio: 'Lista A2 (Portaria SVS/MS 344/98); formulações dentro dos limites do adendo da lista são dispensadas com Receita de Controle Especial em 2 vias',
    },
    {
      id: 'morfina',
      nome: 'Morfina',
      sinonimos: ['sulfato de morfina', 'cloridrato de morfina', 'morphine', 'morphine sulfate'],
      vinculos: [
        {
          grupoId: 'analgesicos',
          classeId: 'opioide-agonista-forte',
          subclasse: 'Fenantreno natural (protótipo)',
          contexto: 'dor intensa aguda ou crônica, dor oncológica e dor do infarto agudo do miocárdio',
          explicacaoFase1:
            'A morfina é o opioide de referência para dor intensa, como dor oncológica (degrau 3 da escada da OMS), pós-operatória e do infarto. Também alivia a dispneia em cuidados paliativos.',
        },
      ],
      mecanismo:
        'Agonista pleno do receptor μ (e, em menor grau, κ e δ). A ativação do receptor acoplado à Gi/o inibe a adenilato ciclase, fecha canais de Ca2+ pré-sinápticos (menos liberação de glutamato e substância P) e abre canais de K+ pós-sinápticos (hiperpolarização) no corno dorsal da medula; também ativa as vias descendentes inibitórias a partir da substância cinzenta periaquedutal. É glicuronidada no fígado a morfina-6-glicuronídeo (ativa) e morfina-3-glicuronídeo (neuroexcitatória), ambas de eliminação renal.',
      indicacoes: ['Dor intensa aguda ou crônica', 'Dor oncológica', 'Dor do infarto agudo do miocárdio', 'Dispneia em cuidados paliativos'],
      offLabel: ['Dispneia refratária em cuidados paliativos (uso consagrado em diretrizes, não em todas as bulas)'],
      tipoMolecula: 'pequena',
      pubchem: ['morphine'],
      nomesComerciais: [
        { nome: 'Dimorf', tipo: 'marca', fabricante: 'Cristália', verificacao: 'pendente_anvisa', obs: 'controle especial (Portaria 344/98); apresentações injetáveis de uso hospitalar' },
      ],
      generico: true,
      eaComuns: [
        { termo: 'Constipação intestinal', sinonimos: ['constipacao', 'prisao de ventre', 'intestino preso', 'obstipacao'] },
        { termo: 'Náuseas e vômitos', sinonimos: ['nausea', 'vomito', 'enjoo', 'emese'] },
        { termo: 'Sonolência e sedação', sinonimos: ['sonolencia', 'sedacao', 'sono'] },
        { termo: 'Prurido (liberação de histamina)', sinonimos: ['prurido', 'coceira', 'liberacao de histamina'] },
        { termo: 'Miose', sinonimos: ['pupila puntiforme', 'pupilas contraidas', 'miose puntiforme'] },
        { termo: 'Retenção urinária', sinonimos: ['retencao de urina', 'dificuldade para urinar'] },
      ],
      eaGraves: [
        { termo: 'Depressão respiratória', sinonimos: ['depressao respiratoria', 'hipoventilacao', 'bradipneia', 'apneia', 'parada respiratoria'] },
        { termo: 'Hipotensão', sinonimos: ['hipotensao', 'queda de pressao'] },
        { termo: 'Dependência e síndrome de abstinência', sinonimos: ['dependencia', 'abstinencia', 'adiccao', 'vicio', 'tolerancia'] },
        { termo: 'Hiperalgesia induzida por opioide', sinonimos: ['hiperalgesia', 'hiperalgesia por opioide'] },
      ],
      eaCaracteristico: 'Depressão respiratória',
      distratoresEA: ['Agranulocitose', 'Úlcera péptica e sangramento gastrointestinal', 'Síndrome serotoninérgica', 'Midríase'],
      contraindicacoes: [
        'Depressão respiratória aguda ou asma brônquica aguda grave',
        'Íleo paralítico',
        'Uso de IMAO nos últimos 14 dias',
        'Hipersensibilidade à morfina',
      ],
      precaucoes: [
        'Insuficiência renal: acúmulo de M6G (sedação, depressão respiratória) e M3G (mioclonias)',
        'Idosos, hepatopatas, DPOC, apneia do sono e hipertensão intracraniana',
        'Prescrever laxante profilático (a constipação não sofre tolerância)',
        'Antídoto: naloxona',
      ],
      interacoes: [
        'Benzodiazepínicos, álcool, gabapentinoides e outros depressores do SNC: depressão respiratória aditiva (alerta FDA)',
        'IMAO: reações graves imprevisíveis',
        'Agonistas parciais/agonistas-antagonistas (buprenorfina, nalbufina): podem reduzir a analgesia ou precipitar abstinência',
      ],
      explicacaoFase2:
        'É o protótipo dos opioides agonistas fortes: ativa plenamente o receptor μ, que diminui a liberação de neurotransmissores da dor e hiperpolariza neurônios da medula e do tronco encefálico.',
      explicacaoFase3:
        'Os receptores μ do tronco encefálico reduzem a resposta dos centros respiratórios ao CO2, causando depressão respiratória dose-dependente, principal causa de morte por overdose (tríade: coma, miose puntiforme e bradipneia). É revertida pela naloxona.',
      referencias: [REF_GG, REF_KATZUNG, REF_RANG, REF_344, REF_OMS_DOR, REF_CDC, REF_FTN],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
      regulatorio: 'Lista A1 — Notificação de Receita A (Portaria SVS/MS 344/98)',
    },
    {
      id: 'oxicodona',
      nome: 'Oxicodona',
      sinonimos: ['cloridrato de oxicodona', 'oxycodone', 'oxycodone hydrochloride'],
      vinculos: [
        {
          grupoId: 'analgesicos',
          classeId: 'opioide-agonista-forte',
          subclasse: 'Fenantreno semissintético',
          contexto: 'dor crônica intensa que requer opioide de uso contínuo (formulação de liberação prolongada)',
          explicacaoFase1:
            'A oxicodona é opioide forte usado na dor crônica intensa, oncológica ou não, quando é necessário analgésico opioide contínuo. No Brasil é comercializada principalmente em comprimidos de liberação controlada.',
        },
      ],
      mecanismo:
        'Agonista pleno do receptor μ, de origem semissintética (derivada da tebaína), com biodisponibilidade oral maior que a da morfina (cerca de 60–87%). É metabolizada pelo CYP3A4 (noroxicodona) e pelo CYP2D6 (oximorfona, ativa), mas a analgesia se deve principalmente ao fármaco inalterado.',
      indicacoes: ['Dor moderada a intensa que requer analgesia opioide contínua por tempo prolongado'],
      tipoMolecula: 'pequena',
      pubchem: ['oxycodone'],
      nomesComerciais: [
        { nome: 'OxyContin', tipo: 'referencia', verificacao: 'pendente_anvisa', obs: 'controle especial (Portaria 344/98); comprimido de liberação controlada — não partir ou mastigar' },
      ],
      generico: false,
      eaComuns: [
        { termo: 'Constipação intestinal', sinonimos: ['constipacao', 'prisao de ventre', 'intestino preso', 'obstipacao'] },
        { termo: 'Náuseas e vômitos', sinonimos: ['nausea', 'vomito', 'enjoo'] },
        { termo: 'Sonolência', sinonimos: ['sedacao', 'sono'] },
        { termo: 'Prurido', sinonimos: ['coceira'] },
        { termo: 'Tontura', sinonimos: ['vertigem', 'tonteira'] },
      ],
      eaGraves: [
        { termo: 'Depressão respiratória', sinonimos: ['depressao respiratoria', 'hipoventilacao', 'bradipneia', 'apneia'] },
        { termo: 'Dependência, abuso e overdose', sinonimos: ['dependencia', 'abuso', 'adiccao', 'vicio', 'overdose', 'transtorno por uso de opioide'] },
        { termo: 'Síndrome de abstinência', sinonimos: ['abstinencia'] },
      ],
      eaCaracteristico: 'Constipação intestinal',
      distratoresEA: ['Agranulocitose', 'Úlcera péptica e sangramento gastrointestinal', 'Síndrome de Reye em crianças', 'Diarreia'],
      contraindicacoes: [
        'Depressão respiratória significativa',
        'Asma aguda ou grave',
        'Íleo paralítico ou obstrução gastrointestinal conhecida/suspeita',
        'Hipersensibilidade à oxicodona',
      ],
      precaucoes: [
        'Comprimidos de liberação controlada devem ser engolidos inteiros: triturar libera dose total de uma vez (overdose)',
        'Alto potencial de abuso — avaliar risco antes de iniciar',
        'Reduzir dose em hepatopatas e idosos',
      ],
      interacoes: [
        'Inibidores do CYP3A4 (claritromicina, cetoconazol, ritonavir): elevam os níveis e o risco de depressão respiratória',
        'Indutores do CYP3A4 (rifampicina, carbamazepina): reduzem eficácia e podem precipitar abstinência',
        'Benzodiazepínicos, álcool e outros depressores do SNC: depressão respiratória aditiva',
      ],
      explicacaoFase2:
        'É um opioide agonista forte semissintético. Ativa plenamente o receptor μ, inibindo a transmissão da dor, e é bem absorvida por via oral.',
      explicacaoFase3:
        'Os receptores μ do plexo mioentérico reduzem a peristalse propulsiva e aumentam o tônus esfincteriano e a absorção de água, causando constipação. Diferentemente da sedação e da náusea, não há tolerância a esse efeito, por isso o laxante deve ser prescrito junto.',
      referencias: [REF_GG, REF_KATZUNG, REF_344, REF_CDC, REF_OMS_DOR, 'Bula OxyContin (cloridrato de oxicodona) — ANVISA.'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
      regulatorio: 'Lista A1 — Notificação de Receita A (Portaria SVS/MS 344/98)',
    },
    {
      id: 'fentanila',
      nome: 'Fentanila',
      sinonimos: ['fentanil', 'citrato de fentanila', 'fentanyl', 'fentanyl citrate'],
      vinculos: [
        {
          grupoId: 'analgesicos',
          classeId: 'opioide-agonista-forte',
          subclasse: 'Fenilpiperidina sintética',
          contexto: 'analgesia em anestesia e terapia intensiva (IV) e dor oncológica crônica estável (adesivo transdérmico)',
          explicacaoFase1:
            'A fentanila é opioide forte usado em anestesia, sedoanalgesia em UTI e, na forma de adesivo transdérmico, em dor crônica intensa e estável, como a oncológica.',
        },
      ],
      mecanismo:
        'Agonista pleno e muito potente do receptor μ (cerca de 50–100 vezes a morfina). É altamente lipossolúvel: atravessa rapidamente a barreira hematoencefálica (início em 1–2 minutos IV) e se redistribui para tecidos periféricos, com ação curta após dose única, mas acúmulo em infusões prolongadas. A lipossolubilidade e o baixo peso molecular permitem a via transdérmica. Metabolismo hepático pelo CYP3A4, sem metabólitos ativos relevantes.',
      indicacoes: [
        'Analgesia e componente analgésico da anestesia geral',
        'Sedoanalgesia em pacientes sob ventilação mecânica',
        'Dor crônica intensa em pacientes já tolerantes a opioides (adesivo transdérmico)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['fentanyl'],
      nomesComerciais: [
        { nome: 'Fentanest', tipo: 'marca', fabricante: 'Cristália', verificacao: 'pendente_anvisa', obs: 'injetável de uso hospitalar; controle especial (Portaria 344/98)' },
        { nome: 'Durogesic', tipo: 'referencia', verificacao: 'pendente_anvisa', obs: 'adesivo transdérmico; controle especial (Portaria 344/98)' },
      ],
      generico: true,
      eaComuns: [
        { termo: 'Náuseas e vômitos', sinonimos: ['nausea', 'vomito', 'enjoo'] },
        { termo: 'Sonolência e sedação', sinonimos: ['sonolencia', 'sedacao'] },
        { termo: 'Constipação intestinal', sinonimos: ['constipacao', 'prisao de ventre', 'intestino preso'] },
        { termo: 'Bradicardia', sinonimos: ['frequencia cardiaca baixa', 'coracao lento'] },
        { termo: 'Reação local no sítio do adesivo', sinonimos: ['irritacao da pele no adesivo', 'eritema local', 'prurido no local'] },
      ],
      eaGraves: [
        {
          termo: 'Rigidez torácica (síndrome do tórax rígido)',
          sinonimos: ['rigidez toracica', 'torax rigido', 'rigidez muscular', 'rigidez da parede toracica', 'wooden chest'],
        },
        { termo: 'Depressão respiratória', sinonimos: ['depressao respiratoria', 'hipoventilacao', 'apneia', 'bradipneia'] },
        { termo: 'Dependência e síndrome de abstinência', sinonimos: ['dependencia', 'abstinencia', 'adiccao', 'vicio'] },
      ],
      eaCaracteristico: 'Rigidez torácica (síndrome do tórax rígido)',
      distratoresEA: ['Agranulocitose', 'Prurido intenso por liberação maciça de histamina', 'Úlcera péptica e sangramento gastrointestinal', 'Síndrome serotoninérgica'],
      contraindicacoes: [
        'Adesivo transdérmico em pacientes virgens de opioide ou para dor aguda/pós-operatória',
        'Depressão respiratória significativa sem suporte ventilatório',
        'Hipersensibilidade à fentanila',
      ],
      precaucoes: [
        'Calor (febre, bolsas térmicas, sauna) aumenta a absorção do adesivo — risco de overdose',
        'Adesivo leva 12–24 h para atingir efeito e o depósito cutâneo persiste após a retirada',
        'Descarte seguro do adesivo usado (ainda contém fármaco; risco de exposição acidental de crianças)',
        'Injetável apenas em ambiente com monitorização e suporte ventilatório',
      ],
      interacoes: [
        'Inibidores potentes do CYP3A4 (ritonavir, cetoconazol, claritromicina): aumento acentuado dos níveis e depressão respiratória',
        'Benzodiazepínicos (midazolam), propofol e outros depressores do SNC: depressão respiratória e hipotensão aditivas',
        'Fármacos serotoninérgicos: relatos de síndrome serotoninérgica',
      ],
      explicacaoFase2:
        'É um opioide agonista forte sintético, muito mais potente e lipossolúvel que a morfina. Ativa o receptor μ e chega rapidamente ao cérebro, o que permite uso intravenoso em anestesia e uso em adesivo pela pele.',
      explicacaoFase3:
        'Doses IV altas e rápidas de opioides lipossolúveis e potentes como a fentanila podem causar rigidez da musculatura torácica e abdominal (mediada centralmente), dificultando a ventilação. É tratada com bloqueador neuromuscular e/ou naloxona.',
      referencias: [REF_GG, REF_KATZUNG, REF_344, REF_OMS_DOR, 'Bula Durogesic (fentanila transdérmica) — ANVISA.', 'Bula Fentanest (citrato de fentanila) — ANVISA.'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
      regulatorio: 'Lista A1 — Notificação de Receita A (Portaria SVS/MS 344/98)',
    },

    // =================== AINEs NÃO SELETIVOS ===================
    {
      id: 'ibuprofeno',
      nome: 'Ibuprofeno',
      sinonimos: ['ibuprofen', 'ibuprofeno arginina', 'ibuprofeno lisinato'],
      vinculos: [
        {
          grupoId: 'antiinflamatorios',
          classeId: 'aine-nao-seletivo',
          subclasse: 'Derivado do ácido propiônico',
          contexto: 'dor leve a moderada com componente inflamatório, febre, dismenorreia e doenças musculoesqueléticas',
          explicacaoFase1:
            'O ibuprofeno é AINE muito usado para dor leve a moderada, febre, dismenorreia e inflamações musculoesqueléticas. Entre os AINEs não seletivos, tem um dos menores riscos gastrointestinais em doses baixas.',
        },
      ],
      mecanismo:
        'Inibe de forma reversível e competitiva a COX-1 e a COX-2, reduzindo a síntese de prostaglandinas (PGE2, PGI2) e de tromboxano A2. A queda de PGE2 diminui a sensibilização de nociceptores, o edema e a vasodilatação inflamatória e normaliza o ponto de ajuste térmico hipotalâmico. Meia-vida curta (cerca de 2 h).',
      indicacoes: ['Dor leve a moderada', 'Febre', 'Dismenorreia primária', 'Artrite reumatoide e osteoartrite', 'Lesões musculoesqueléticas e dor pós-operatória'],
      tipoMolecula: 'pequena',
      pubchem: ['ibuprofen'],
      nomesComerciais: [
        { nome: 'Advil', tipo: 'marca', verificacao: 'pendente_anvisa' },
        { nome: 'Alivium', tipo: 'marca', verificacao: 'pendente_anvisa' },
        { nome: 'Buscofem', tipo: 'marca', verificacao: 'pendente_anvisa' },
      ],
      generico: true,
      eaComuns: [
        { termo: 'Dispepsia e epigastralgia', sinonimos: ['dispepsia', 'azia', 'dor no estomago', 'queimacao', 'epigastralgia', 'gastrite'] },
        { termo: 'Náuseas', sinonimos: ['nausea', 'enjoo'] },
        { termo: 'Edema e retenção hidrossalina', sinonimos: ['edema', 'inchaco', 'retencao de liquidos', 'retencao de sodio'] },
      ],
      eaGraves: [
        {
          termo: 'Úlcera péptica e sangramento gastrointestinal',
          sinonimos: ['ulcera', 'ulcera peptica', 'ulcera gastrica', 'hemorragia digestiva', 'sangramento gastrointestinal', 'sangramento digestivo', 'perfuracao gastrica', 'gastropatia por aine'],
        },
        { termo: 'Lesão renal aguda', sinonimos: ['insuficiencia renal aguda', 'nefrotoxicidade', 'lesao renal'] },
        { termo: 'Eventos cardiovasculares trombóticos', sinonimos: ['infarto', 'avc', 'trombose', 'risco cardiovascular'] },
        { termo: 'Broncoespasmo em asma induzida por AINE', sinonimos: ['broncoespasmo', 'asma induzida por aspirina', 'doenca respiratoria exacerbada por aspirina'] },
      ],
      eaCaracteristico: 'Úlcera péptica e sangramento gastrointestinal',
      distratoresEA: ['Agranulocitose', 'Depressão respiratória', 'Tosse seca por acúmulo de bradicinina', 'Hiperglicemia'],
      contraindicacoes: [
        'Úlcera péptica ativa ou sangramento gastrointestinal',
        'Insuficiência cardíaca grave, renal ou hepática grave',
        'Asma, urticária ou rinite desencadeadas por AAS/AINEs',
        'Terceiro trimestre da gestação (fechamento precoce do canal arterial)',
        'Dor perioperatória de cirurgia de revascularização miocárdica',
      ],
      precaucoes: [
        'Usar a menor dose eficaz pelo menor tempo possível',
        'Idosos, anticoagulados, uso de corticoide ou história de úlcera: considerar gastroproteção com IBP',
        'Pode elevar a pressão arterial e piorar insuficiência cardíaca',
      ],
      interacoes: [
        'AAS em dose baixa: o ibuprofeno tomado antes pode ocupar a COX-1 plaquetária e reduzir o efeito antiagregante',
        'Anticoagulantes, antiagregantes, ISRS e corticoides: aumento do risco de sangramento',
        'IECA, BRA e diuréticos: redução do efeito anti-hipertensivo e risco de lesão renal ("triple whammy")',
        'Lítio e metotrexato: redução da depuração renal e toxicidade',
      ],
      explicacaoFase2:
        'É um AINE não seletivo derivado do ácido propiônico: bloqueia temporariamente as duas cicloxigenases (COX-1 e COX-2), reduzindo prostaglandinas responsáveis por dor, febre e inflamação.',
      explicacaoFase3:
        'A COX-1 produz prostaglandinas que protegem a mucosa gástrica (estimulam muco e bicarbonato e mantêm o fluxo sanguíneo). Ao inibi-la, o AINE facilita erosões e úlceras, agravadas pelo efeito antiplaquetário que favorece o sangramento.',
      referencias: [REF_GG, REF_KATZUNG, REF_RANG, REF_FTN, 'FDA. Drug Safety Communication: risco cardiovascular dos AINEs não aspirina (2015).'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
      regulatorio: 'Medicamento isento de prescrição (MIP) em apresentações e doses de baixa concentração',
    },
    {
      id: 'naproxeno',
      nome: 'Naproxeno',
      sinonimos: ['naproxen', 'naproxeno sodico', 'naproxen sodium'],
      vinculos: [
        {
          grupoId: 'antiinflamatorios',
          classeId: 'aine-nao-seletivo',
          subclasse: 'Derivado do ácido propiônico',
          contexto: 'doenças reumáticas, dor musculoesquelética, dismenorreia e crise de gota',
          explicacaoFase1:
            'O naproxeno é AINE de meia-vida longa (cerca de 14 h), usado em artrites, dor musculoesquelética, dismenorreia e crise aguda de gota, com posologia de 1 a 2 vezes ao dia.',
        },
      ],
      mecanismo:
        'Inibidor reversível e não seletivo da COX-1 e da COX-2, derivado do ácido propiônico. A meia-vida longa mantém inibição plaquetária mais sustentada que a de outros AINEs não aspirina, o que pode explicar o perfil cardiovascular relativamente mais neutro observado em metanálises.',
      indicacoes: ['Artrite reumatoide, osteoartrite e espondilite anquilosante', 'Crise aguda de gota', 'Dismenorreia primária', 'Dor leve a moderada e tendinites/bursites'],
      tipoMolecula: 'pequena',
      pubchem: ['naproxen'],
      nomesComerciais: [
        { nome: 'Naprosyn', tipo: 'referencia', verificacao: 'pendente_anvisa' },
        { nome: 'Flanax', tipo: 'marca', verificacao: 'pendente_anvisa' },
      ],
      generico: true,
      eaComuns: [
        { termo: 'Dispepsia e epigastralgia', sinonimos: ['dispepsia', 'azia', 'dor no estomago', 'queimacao', 'gastrite'] },
        { termo: 'Edema e retenção hidrossalina', sinonimos: ['edema', 'inchaco', 'retencao de liquidos'] },
        { termo: 'Cefaleia e tontura', sinonimos: ['dor de cabeca', 'cefaleia', 'tontura'] },
      ],
      eaGraves: [
        {
          termo: 'Úlcera péptica e sangramento gastrointestinal',
          sinonimos: ['ulcera', 'ulcera peptica', 'hemorragia digestiva', 'sangramento gastrointestinal', 'sangramento digestivo', 'perfuracao'],
        },
        { termo: 'Lesão renal aguda', sinonimos: ['insuficiencia renal aguda', 'nefrotoxicidade', 'lesao renal'] },
        { termo: 'Broncoespasmo em asma induzida por AINE', sinonimos: ['broncoespasmo', 'asma induzida por aspirina'] },
      ],
      eaCaracteristico: 'Úlcera péptica e sangramento gastrointestinal',
      distratoresEA: ['Agranulocitose', 'Depressão respiratória', 'Síndrome de Cushing iatrogênica', 'Tosse seca por acúmulo de bradicinina'],
      contraindicacoes: [
        'Úlcera péptica ativa ou sangramento gastrointestinal',
        'Insuficiência renal, hepática ou cardíaca grave',
        'Asma/urticária induzidas por AAS ou AINEs',
        'Terceiro trimestre da gestação',
      ],
      precaucoes: [
        'Risco gastrointestinal moderado a alto entre os AINEs não seletivos — considerar IBP em pacientes de risco',
        'Idosos e pacientes com doença renal ou cardiovascular',
      ],
      interacoes: [
        'Anticoagulantes, antiagregantes, ISRS e corticoides: maior risco de sangramento',
        'IECA, BRA e diuréticos: perda do efeito anti-hipertensivo e lesão renal',
        'Lítio e metotrexato: aumento da toxicidade',
      ],
      explicacaoFase2:
        'É um AINE não seletivo do grupo do ácido propiônico. Inibe reversivelmente as COX-1 e COX-2 e, por ter meia-vida longa, permite doses espaçadas.',
      explicacaoFase3:
        'A inibição da COX-1 gástrica reduz as prostaglandinas citoprotetoras da mucosa, e o efeito sobre as plaquetas facilita o sangramento: por isso úlcera e hemorragia digestiva são os eventos graves típicos.',
      referencias: [REF_GG, REF_KATZUNG, REF_RANG, 'Bhala N et al. (CNT Collaboration). Vascular and upper gastrointestinal effects of NSAIDs. Lancet 2013;382:769-79.'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    {
      id: 'diclofenaco',
      nome: 'Diclofenaco',
      sinonimos: ['diclofenaco sodico', 'diclofenaco potassico', 'diclofenaco dietilamonio', 'diclofenac', 'diclofenac sodium', 'diclofenac potassium'],
      vinculos: [
        {
          grupoId: 'antiinflamatorios',
          classeId: 'aine-nao-seletivo',
          subclasse: 'Derivado do ácido acético (fenilacético)',
          contexto: 'dor e inflamação musculoesquelética, artrites, cólica renal e dor pós-operatória',
          explicacaoFase1:
            'O diclofenaco é AINE potente, usado em dor e inflamação musculoesquelética, artrites, cólica renal e dor pós-operatória, em formas oral, injetável e tópica.',
        },
      ],
      mecanismo:
        'Derivado do ácido fenilacético que inibe reversivelmente COX-1 e COX-2, com certa preferência pela COX-2 (seletividade semelhante à do celecoxibe em ensaios de sangue total). Acumula-se no líquido sinovial, prolongando o efeito local além da meia-vida plasmática curta. O sal potássico tem absorção mais rápida (uso em dor aguda); o sódico, em comprimido gastrorresistente, tem início mais lento.',
      indicacoes: ['Artrite reumatoide, osteoartrite e espondilite anquilosante', 'Dor e inflamação pós-traumática e pós-operatória', 'Cólica renal e biliar', 'Dismenorreia primária', 'Crise aguda de gota'],
      tipoMolecula: 'pequena',
      pubchem: ['diclofenac'],
      nomesComerciais: [
        { nome: 'Voltaren', tipo: 'referencia', verificacao: 'pendente_anvisa', obs: 'diclofenaco sódico' },
        { nome: 'Cataflam', tipo: 'referencia', verificacao: 'pendente_anvisa', obs: 'diclofenaco potássico' },
      ],
      generico: true,
      eaComuns: [
        { termo: 'Dispepsia e epigastralgia', sinonimos: ['dispepsia', 'azia', 'dor no estomago', 'queimacao', 'gastrite'] },
        { termo: 'Elevação de transaminases', sinonimos: ['aumento de tgo e tgp', 'aumento das enzimas hepaticas', 'transaminases elevadas'] },
        { termo: 'Náuseas e diarreia', sinonimos: ['nausea', 'diarreia', 'enjoo'] },
      ],
      eaGraves: [
        {
          termo: 'Eventos cardiovasculares trombóticos',
          sinonimos: ['infarto', 'infarto agudo do miocardio', 'avc', 'acidente vascular cerebral', 'trombose', 'risco cardiovascular'],
        },
        { termo: 'Úlcera péptica e sangramento gastrointestinal', sinonimos: ['ulcera', 'hemorragia digestiva', 'sangramento gastrointestinal'] },
        { termo: 'Hepatotoxicidade', sinonimos: ['hepatite medicamentosa', 'lesao hepatica', 'toxicidade hepatica'] },
        { termo: 'Lesão renal aguda', sinonimos: ['insuficiencia renal aguda', 'nefrotoxicidade'] },
      ],
      eaCaracteristico: 'Eventos cardiovasculares trombóticos',
      distratoresEA: ['Agranulocitose', 'Depressão respiratória', 'Síndrome de Reye em crianças', 'Tosse seca por acúmulo de bradicinina'],
      contraindicacoes: [
        'Insuficiência cardíaca (NYHA II–IV), doença arterial coronariana, cerebrovascular ou periférica estabelecida (EMA, 2013)',
        'Úlcera péptica ativa ou sangramento gastrointestinal',
        'Insuficiência hepática ou renal grave',
        'Asma/urticária induzidas por AAS ou AINEs',
        'Terceiro trimestre da gestação',
      ],
      precaucoes: [
        'Avaliar fatores de risco cardiovascular antes de uso prolongado',
        'Monitorar transaminases em tratamentos longos',
        'Formulações tópicas têm exposição sistêmica muito menor',
      ],
      interacoes: [
        'Anticoagulantes, antiagregantes, ISRS e corticoides: aumento do risco de sangramento',
        'IECA, BRA e diuréticos: menor efeito anti-hipertensivo e lesão renal',
        'Lítio, metotrexato e ciclosporina: aumento da toxicidade',
      ],
      explicacaoFase2:
        'É um AINE não seletivo derivado do ácido acético. Inibe COX-1 e COX-2 (com alguma preferência pela COX-2) e se concentra no líquido sinovial das articulações.',
      explicacaoFase3:
        'Por inibir de forma importante a COX-2 vascular, o diclofenaco reduz a prostaciclina (antiagregante e vasodilatadora) sem bloquear de forma duradoura o tromboxano plaquetário, desequilibrando a balança a favor da trombose. Em metanálises, seu risco cardiovascular é semelhante ao dos coxibes.',
      referencias: [REF_GG, REF_KATZUNG, REF_RANG, 'EMA/PRAC. Diclofenac — new contraindications and warnings (2013).', 'Bhala N et al. (CNT Collaboration). Lancet 2013;382:769-79.'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    {
      id: 'cetoprofeno',
      nome: 'Cetoprofeno',
      sinonimos: ['ketoprofen', 'ketoprofeno', 'cetoprofeno lisina'],
      vinculos: [
        {
          grupoId: 'antiinflamatorios',
          classeId: 'aine-nao-seletivo',
          subclasse: 'Derivado do ácido propiônico',
          contexto: 'dor e inflamação de origem musculoesquelética, articular e pós-traumática',
          explicacaoFase1:
            'O cetoprofeno é AINE usado em dor e inflamação musculoesquelética, artrites e traumas, disponível em formas oral, injetável e gel tópico.',
        },
      ],
      mecanismo:
        'Derivado do ácido propiônico que inibe de forma reversível e não seletiva a COX-1 e a COX-2; há também relatos de inibição da via da lipoxigenase e estabilização de membranas lisossomais. Meia-vida plasmática curta (cerca de 2 h), por isso as formas de liberação prolongada são comuns.',
      indicacoes: ['Artrite reumatoide, osteoartrite e espondilite anquilosante', 'Dor e inflamação pós-traumática e pós-operatória', 'Dismenorreia', 'Tendinites, bursites e lombalgia'],
      tipoMolecula: 'pequena',
      pubchem: ['ketoprofen'],
      nomesComerciais: [
        { nome: 'Profenid', tipo: 'referencia', verificacao: 'pendente_anvisa' },
      ],
      generico: true,
      eaComuns: [
        { termo: 'Dispepsia e epigastralgia', sinonimos: ['dispepsia', 'azia', 'dor no estomago', 'queimacao', 'gastrite'] },
        { termo: 'Náuseas', sinonimos: ['nausea', 'enjoo'] },
        { termo: 'Cefaleia', sinonimos: ['dor de cabeca'] },
      ],
      eaGraves: [
        {
          termo: 'Úlcera péptica e sangramento gastrointestinal',
          sinonimos: ['ulcera', 'ulcera peptica', 'hemorragia digestiva', 'sangramento gastrointestinal', 'sangramento digestivo'],
        },
        { termo: 'Fotossensibilidade e fotoalergia (formulação tópica)', sinonimos: ['fotossensibilidade', 'fotoalergia', 'dermatite fotoalergica', 'reacao ao sol'] },
        { termo: 'Lesão renal aguda', sinonimos: ['insuficiencia renal aguda', 'nefrotoxicidade'] },
        { termo: 'Broncoespasmo em asma induzida por AINE', sinonimos: ['broncoespasmo', 'asma induzida por aspirina'] },
      ],
      eaCaracteristico: 'Úlcera péptica e sangramento gastrointestinal',
      distratoresEA: ['Agranulocitose', 'Depressão respiratória', 'Síndrome de Cushing iatrogênica', 'Rigidez torácica (síndrome do tórax rígido)'],
      contraindicacoes: [
        'Úlcera péptica ativa ou história de sangramento gastrointestinal',
        'Insuficiência hepática, renal ou cardíaca grave',
        'Asma/urticária induzidas por AAS ou AINEs',
        'Terceiro trimestre da gestação',
        'Gel: exposição solar na área tratada durante o uso e até 2 semanas após; antecedente de fotoalergia',
      ],
      precaucoes: [
        'Está entre os AINEs de maior risco gastrointestinal — considerar IBP em pacientes de risco',
        'Proteger da luz solar as áreas tratadas com gel',
      ],
      interacoes: [
        'Anticoagulantes, antiagregantes, ISRS e corticoides: maior risco de sangramento',
        'IECA, BRA e diuréticos: menor efeito anti-hipertensivo e lesão renal',
        'Lítio e metotrexato: aumento da toxicidade',
      ],
      explicacaoFase2:
        'É um AINE não seletivo derivado do ácido propiônico, como o ibuprofeno: inibe reversivelmente COX-1 e COX-2, reduzindo as prostaglandinas inflamatórias.',
      explicacaoFase3:
        'O bloqueio potente da COX-1 gástrica retira a proteção da mucosa mediada por prostaglandinas, e o cetoprofeno figura entre os AINEs de maior risco de úlcera e sangramento digestivo em estudos epidemiológicos.',
      referencias: [REF_GG, REF_RANG, 'Bula Profenid (cetoprofeno) — ANVISA.', 'EMA/CHMP. Ketoprofen topical — assessment of photosensitivity (2010).', 'Castellsague J et al. Individual NSAIDs and upper GI complications (SOS Project). Drug Saf 2012;35:1127-46.'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },

    // =================== AINEs PREFERENCIAIS COX-2 ===================
    {
      id: 'nimesulida',
      nome: 'Nimesulida',
      sinonimos: ['nimesulide'],
      vinculos: [
        {
          grupoId: 'antiinflamatorios',
          classeId: 'aine-preferencial-cox2',
          subclasse: 'Sulfonanilida',
          contexto: 'dor aguda e processos inflamatórios de curta duração (ex.: odontológicos, otorrinolaringológicos)',
          explicacaoFase1:
            'A nimesulida é AINE muito prescrito no Brasil para dor aguda e inflamações de curta duração. Na Europa seu uso foi restrito a dor aguda e dismenorreia, por no máximo 15 dias, devido à hepatotoxicidade.',
        },
      ],
      mecanismo:
        'Sulfonanilida que inibe preferencialmente a COX-2, com seletividade parcial e dependente da dose. Possui ainda efeitos adicionais descritos in vitro, como redução da liberação de radicais livres por neutrófilos e inibição de metaloproteinases.',
      indicacoes: ['Dor aguda', 'Processos inflamatórios agudos', 'Dismenorreia primária', 'Febre'],
      tipoMolecula: 'pequena',
      pubchem: ['nimesulide'],
      nomesComerciais: [
        { nome: 'Nisulid', tipo: 'referencia', verificacao: 'pendente_anvisa' },
      ],
      generico: true,
      eaComuns: [
        { termo: 'Dispepsia e epigastralgia', sinonimos: ['dispepsia', 'azia', 'dor no estomago', 'queimacao'] },
        { termo: 'Diarreia e náuseas', sinonimos: ['diarreia', 'nausea', 'enjoo'] },
        { termo: 'Elevação de transaminases', sinonimos: ['aumento de tgo e tgp', 'enzimas hepaticas elevadas'] },
      ],
      eaGraves: [
        {
          termo: 'Hepatotoxicidade',
          sinonimos: ['hepatite medicamentosa', 'lesao hepatica', 'insuficiencia hepatica', 'toxicidade hepatica', 'dano ao figado', 'hepatite fulminante'],
        },
        { termo: 'Úlcera péptica e sangramento gastrointestinal', sinonimos: ['ulcera', 'hemorragia digestiva', 'sangramento gastrointestinal'] },
        { termo: 'Lesão renal aguda', sinonimos: ['insuficiencia renal aguda', 'nefrotoxicidade'] },
      ],
      eaCaracteristico: 'Hepatotoxicidade',
      distratoresEA: ['Agranulocitose', 'Depressão respiratória', 'Síndrome de Reye em crianças', 'Síndrome de Cushing iatrogênica'],
      contraindicacoes: [
        'Doença hepática ou história de hepatotoxicidade por nimesulida',
        'Uso concomitante de outros fármacos hepatotóxicos ou etilismo',
        'Crianças menores de 12 anos',
        'Úlcera péptica ativa, insuficiência renal ou cardíaca grave',
        'Terceiro trimestre da gestação e lactação',
      ],
      precaucoes: [
        'Usar pelo menor tempo possível (EMA: máximo de 15 dias)',
        'Suspender se surgirem icterícia, colúria, anorexia ou elevação de transaminases',
      ],
      interacoes: [
        'Álcool e outros hepatotóxicos (paracetamol em dose alta, isoniazida): soma de risco hepático',
        'Anticoagulantes, ISRS e corticoides: maior risco de sangramento',
        'IECA, BRA, diuréticos, lítio e metotrexato: interações típicas dos AINEs',
      ],
      explicacaoFase2:
        'É um AINE preferencial para COX-2 (sulfonanilida): nas doses usuais inibe mais a COX-2 inflamatória do que a COX-1, mas essa seletividade é apenas parcial.',
      explicacaoFase3:
        'A nimesulida tem maior incidência de hepatotoxicidade idiossincrásica do que outros AINEs, com casos de insuficiência hepática fulminante e transplante, o que levou à retirada ou restrição em vários países. Por isso o uso deve ser curto e com orientação para sinais de lesão hepática.',
      referencias: [REF_GG, REF_RANG, 'EMA/CHMP. Assessment report — nimesulide (2012): restrição a dor aguda e dismenorreia, máx. 15 dias.', 'Bula Nisulid (nimesulida) — ANVISA.'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    {
      id: 'meloxicam',
      nome: 'Meloxicam',
      sinonimos: ['meloxicamo'],
      vinculos: [
        {
          grupoId: 'antiinflamatorios',
          classeId: 'aine-preferencial-cox2',
          subclasse: 'Oxicam (ácido enólico)',
          contexto: 'tratamento sintomático de osteoartrite, artrite reumatoide e espondilite anquilosante',
          explicacaoFase1:
            'O meloxicam é AINE de dose única diária usado no tratamento sintomático de doenças reumáticas crônicas, como osteoartrite e artrite reumatoide.',
        },
      ],
      mecanismo:
        'Oxicam (derivado do ácido enólico) que inibe preferencialmente a COX-2 em doses de 7,5 mg; com 15 mg a seletividade diminui. A meia-vida longa (cerca de 20 h) permite tomada única diária.',
      indicacoes: ['Osteoartrite (tratamento sintomático)', 'Artrite reumatoide', 'Espondilite anquilosante'],
      tipoMolecula: 'pequena',
      pubchem: ['meloxicam'],
      nomesComerciais: [
        { nome: 'Movatec', tipo: 'referencia', verificacao: 'pendente_anvisa' },
      ],
      generico: true,
      eaComuns: [
        { termo: 'Dispepsia e epigastralgia', sinonimos: ['dispepsia', 'azia', 'dor no estomago', 'queimacao', 'gastrite'] },
        { termo: 'Diarreia', sinonimos: ['fezes amolecidas'] },
        { termo: 'Edema e retenção hidrossalina', sinonimos: ['edema', 'inchaco', 'retencao de liquidos'] },
      ],
      eaGraves: [
        { termo: 'Úlcera péptica e sangramento gastrointestinal', sinonimos: ['ulcera', 'hemorragia digestiva', 'sangramento gastrointestinal'] },
        { termo: 'Eventos cardiovasculares trombóticos', sinonimos: ['infarto', 'avc', 'trombose'] },
        { termo: 'Lesão renal aguda', sinonimos: ['insuficiencia renal aguda', 'nefrotoxicidade'] },
      ],
      eaCaracteristico: 'Dispepsia e epigastralgia',
      distratoresEA: ['Agranulocitose', 'Depressão respiratória', 'Síndrome de Cushing iatrogênica', 'Constipação intestinal por receptores μ'],
      contraindicacoes: [
        'Úlcera péptica ativa ou sangramento gastrointestinal recente',
        'Insuficiência hepática, renal ou cardíaca grave',
        'Asma/urticária induzidas por AAS ou AINEs',
        'Terceiro trimestre da gestação',
      ],
      precaucoes: [
        'Preferir 7,5 mg/dia; a dose de 15 mg perde parte da seletividade',
        'Idosos e pacientes com risco cardiovascular ou renal',
      ],
      interacoes: [
        'Anticoagulantes, ISRS e corticoides: maior risco de sangramento',
        'IECA, BRA e diuréticos: menor efeito anti-hipertensivo e lesão renal',
        'Lítio e metotrexato: aumento da toxicidade',
      ],
      explicacaoFase2:
        'É um AINE do grupo dos oxicans, preferencial para COX-2: em doses baixas inibe mais a COX-2 do que a COX-1, e sua meia-vida longa permite uma tomada ao dia.',
      explicacaoFase3:
        'Mesmo com preferência pela COX-2, o meloxicam ainda reduz parte das prostaglandinas gástricas, de modo que dispepsia e dor epigástrica são as queixas mais frequentes, embora o risco de úlcera seja menor que o de AINEs não seletivos em doses baixas.',
      referencias: [REF_GG, REF_KATZUNG, REF_RANG, 'Bula Movatec (meloxicam) — ANVISA.'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },

    // =================== COXIBE ===================
    {
      id: 'celecoxibe',
      nome: 'Celecoxibe',
      sinonimos: ['celecoxib', 'celecoxibe'],
      vinculos: [
        {
          grupoId: 'antiinflamatorios',
          classeId: 'coxibe',
          subclasse: 'Diarileterocíclico com grupo sulfonamida',
          contexto: 'osteoartrite, artrite reumatoide, espondilite anquilosante e dor aguda em pacientes com risco gastrointestinal',
          explicacaoFase1:
            'O celecoxibe é usado em doenças reumáticas e dor aguda, principalmente quando se quer menor risco de úlcera do que com AINEs não seletivos. Não substitui o AAS na prevenção cardiovascular.',
        },
      ],
      mecanismo:
        'Inibe seletivamente a COX-2: sua cadeia lateral volumosa encaixa-se no bolso lateral do sítio ativo da COX-2, que é maior que o da COX-1. Reduz prostaglandinas inflamatórias, preservando a produção gástrica de prostaglandinas e o tromboxano A2 plaquetário (por isso não tem efeito antiagregante). Metabolizado pelo CYP2C9.',
      indicacoes: ['Osteoartrite', 'Artrite reumatoide', 'Espondilite anquilosante', 'Dor aguda e dismenorreia primária'],
      tipoMolecula: 'pequena',
      pubchem: ['celecoxib'],
      nomesComerciais: [
        { nome: 'Celebra', tipo: 'referencia', fabricante: 'Pfizer', verificacao: 'pendente_anvisa' },
      ],
      generico: true,
      eaComuns: [
        { termo: 'Dispepsia e dor abdominal', sinonimos: ['dispepsia', 'azia', 'dor abdominal'] },
        { termo: 'Edema periférico', sinonimos: ['edema', 'inchaco', 'retencao de liquidos'] },
        { termo: 'Hipertensão arterial', sinonimos: ['aumento da pressao', 'pressao alta', 'hipertensao'] },
      ],
      eaGraves: [
        {
          termo: 'Eventos cardiovasculares trombóticos',
          sinonimos: ['infarto', 'infarto agudo do miocardio', 'avc', 'acidente vascular cerebral', 'trombose', 'risco cardiovascular', 'evento tromboembolico'],
        },
        { termo: 'Lesão renal aguda', sinonimos: ['insuficiencia renal aguda', 'nefrotoxicidade'] },
        { termo: 'Reações cutâneas graves (Stevens-Johnson / NET)', sinonimos: ['stevens-johnson', 'necrolise epidermica toxica'] },
      ],
      eaCaracteristico: 'Eventos cardiovasculares trombóticos',
      distratoresEA: ['Sangramento por inibição irreversível da agregação plaquetária', 'Agranulocitose', 'Depressão respiratória', 'Síndrome de Reye em crianças'],
      contraindicacoes: [
        'Doença cardíaca isquêmica, doença cerebrovascular ou arterial periférica estabelecida e insuficiência cardíaca (NYHA II–IV)',
        'Dor perioperatória de cirurgia de revascularização miocárdica',
        'Alergia a sulfonamidas',
        'Asma/urticária induzidas por AAS ou AINEs',
        'Úlcera péptica ativa e terceiro trimestre da gestação',
      ],
      precaucoes: [
        'Não tem efeito antiagregante: não suspender o AAS de pacientes que precisam dele',
        'A associação com AAS reduz a vantagem gastrointestinal do coxibe',
        'Metabolizadores lentos do CYP2C9: reduzir dose',
      ],
      interacoes: [
        'Fluconazol (inibidor do CYP2C9): aumenta os níveis de celecoxibe',
        'Varfarina: aumento do RNI e do risco de sangramento',
        'IECA, BRA, diuréticos e lítio: interações típicas dos AINEs',
      ],
      explicacaoFase2:
        'É um coxibe, inibidor seletivo da COX-2. Bloqueia a enzima induzida na inflamação e poupa a COX-1 do estômago e das plaquetas, reduzindo o risco de úlcera.',
      explicacaoFase3:
        'Ao inibir a COX-2 do endotélio, o celecoxibe reduz a prostaciclina (antitrombótica), mas não bloqueia o tromboxano A2 plaquetário produzido pela COX-1. O desequilíbrio favorece trombose, infarto e AVC, especialmente em doses altas e pacientes de risco.',
      referencias: [REF_GG, REF_KATZUNG, REF_RANG, 'Nissen SE et al. PRECISION Trial. N Engl J Med 2016;375:2519-29.', 'Bula Celebra (celecoxibe) — ANVISA.'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },

    // =================== AAS ===================
    {
      id: 'acido-acetilsalicilico',
      nome: 'Ácido acetilsalicílico',
      sinonimos: ['aas', 'aspirina', 'aspirin', 'acetylsalicylic acid', 'asa', 'acido acetil salicilico'],
      vinculos: [
        {
          grupoId: 'antiinflamatorios',
          classeId: 'aine-salicilato',
          subclasse: 'Salicilato acetilado',
          contexto: 'anti-inflamatório em doses altas e antiagregante plaquetário em dose baixa (prevenção cardiovascular)',
          explicacaoFase1:
            'O AAS é o único AINE que inibe a COX de forma irreversível. Em doses baixas (75–100 mg/dia) é antiagregante plaquetário na prevenção cardiovascular; em doses altas tem ação anti-inflamatória, hoje pouco usada por causa da toxicidade.',
        },
        {
          grupoId: 'analgesicos',
          classeId: 'analgesico-salicilato',
          subclasse: 'Salicilato acetilado',
          contexto: 'dor leve a moderada e febre em adultos (doses analgésicas de 500 mg a 1 g)',
          explicacaoFase1:
            'Em doses intermediárias (500 mg a 1 g), o AAS é analgésico e antitérmico para dor leve a moderada e febre em adultos. Deve ser evitado em crianças e adolescentes com quadros virais pelo risco de síndrome de Reye.',
        },
      ],
      mecanismo:
        'Acetila de forma covalente a serina 530 da COX-1 (e a serina 516 da COX-2), bloqueando irreversivelmente o acesso do ácido araquidônico ao sítio ativo. As plaquetas, sem núcleo, não sintetizam nova enzima: uma dose baixa suprime o tromboxano A2 durante toda a vida da plaqueta (7–10 dias), enquanto o endotélio regenera a COX e mantém a prostaciclina. O efeito é dose-dependente: dose baixa antiagregante, intermediária analgésica/antitérmica e alta anti-inflamatória. É rapidamente desacetilado a salicilato, que contribui para os efeitos analgésico e anti-inflamatório.',
      indicacoes: [
        'Prevenção secundária de eventos cardiovasculares e cerebrovasculares (dose baixa)',
        'Síndrome coronariana aguda (dose de ataque)',
        'Dor leve a moderada e febre em adultos',
        'Doença de Kawasaki (uso sob supervisão especializada)',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['aspirin'],
      nomesComerciais: [
        { nome: 'Aspirina', tipo: 'referencia', fabricante: 'Bayer', verificacao: 'pendente_anvisa' },
        { nome: 'AAS', tipo: 'marca', verificacao: 'pendente_anvisa' },
        { nome: 'Melhoral', tipo: 'marca', verificacao: 'pendente_anvisa', grupoId: 'analgesicos' },
      ],
      generico: true,
      eaComuns: [
        { termo: 'Dispepsia e epigastralgia', sinonimos: ['dispepsia', 'azia', 'dor no estomago', 'queimacao', 'gastrite'] },
        { termo: 'Equimoses e sangramento leve', sinonimos: ['hematomas', 'manchas roxas', 'sangramento gengival', 'epistaxe'] },
        { termo: 'Zumbido (salicilismo)', sinonimos: ['zumbido', 'tinido', 'salicilismo', 'tinnitus'] },
      ],
      eaGraves: [
        {
          termo: 'Sangramento gastrointestinal',
          sinonimos: ['hemorragia digestiva', 'sangramento digestivo', 'ulcera peptica', 'ulcera', 'sangramento', 'hemorragia'],
        },
        { termo: 'Síndrome de Reye em crianças', sinonimos: ['sindrome de reye', 'reye', 'encefalopatia hepatica em criancas'] },
        { termo: 'Broncoespasmo em asma induzida por AINE', sinonimos: ['broncoespasmo', 'asma induzida por aspirina', 'doenca respiratoria exacerbada por aspirina', 'aerd'] },
        { termo: 'Intoxicação salicílica (alcalose respiratória e acidose metabólica)', sinonimos: ['salicilismo grave', 'intoxicacao por salicilato', 'acidose metabolica', 'alcalose respiratoria'] },
      ],
      eaCaracteristico: 'Sangramento gastrointestinal',
      distratoresEA: ['Agranulocitose', 'Depressão respiratória', 'Eventos cardiovasculares trombóticos', 'Hepatotoxicidade (necrose hepática por NAPQI)'],
      contraindicacoes: [
        'Crianças e adolescentes com infecção viral (varicela, influenza) — risco de síndrome de Reye',
        'Úlcera péptica ativa e distúrbios hemorrágicos (hemofilia, plaquetopenia)',
        'Asma, pólipos nasais ou urticária induzidos por AAS/AINEs',
        'Terceiro trimestre da gestação em doses analgésicas/anti-inflamatórias',
        'Gota (doses baixas reduzem a excreção de ácido úrico)',
      ],
      precaucoes: [
        'Suspensão pré-operatória deve considerar o efeito de 7–10 dias sobre as plaquetas',
        'Na prevenção primária o benefício cardiovascular é pequeno frente ao risco de sangramento — individualizar',
        'Considerar IBP em pacientes com alto risco de sangramento',
      ],
      interacoes: [
        'Ibuprofeno e dipirona administrados antes do AAS podem impedir a acetilação da COX-1 plaquetária e reduzir o efeito antiagregante',
        'Anticoagulantes, clopidogrel, ISRS e corticoides: aumento do risco de sangramento',
        'Metotrexato: redução da depuração renal e toxicidade',
        'Uricosúricos (probenecida): antagonismo do efeito uricosúrico',
      ],
      explicacaoFase2:
        'É um salicilato que inativa a COX de forma irreversível, acetilando a enzima. Na plaqueta, que não consegue fabricar enzima nova, o bloqueio do tromboxano dura toda a vida da célula — base do efeito antiagregante em dose baixa.',
      explicacaoFase3:
        'O AAS soma dois mecanismos que favorecem sangramento digestivo: retira as prostaglandinas que protegem a mucosa gástrica (inibição da COX-1) e inibe irreversivelmente a agregação plaquetária. Mesmo doses baixas aumentam o risco de hemorragia gastrointestinal.',
      referencias: [REF_GG, REF_KATZUNG, REF_RANG, REF_FTN, 'Patrono C et al. Antiplatelet agents for the treatment and prevention of coronary atherothrombosis. J Am Coll Cardiol 2017;70:1760-76.', 'Bula Aspirina (ácido acetilsalicílico) — ANVISA.'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
      regulatorio: 'Medicamento isento de prescrição (MIP) nas apresentações orais usuais',
    },

    // =================== CORTICOSTEROIDES SISTÊMICOS ===================
    {
      id: 'prednisona',
      nome: 'Prednisona',
      sinonimos: ['prednisone'],
      vinculos: [
        {
          grupoId: 'antiinflamatorios',
          classeId: 'corticoide-sistemico',
          subclasse: 'Glicocorticoide de ação intermediária (pró-fármaco oral)',
          contexto: 'doenças inflamatórias, alérgicas e autoimunes que exigem corticoterapia oral',
          explicacaoFase1:
            'A prednisona é o corticoide oral mais usado para doenças inflamatórias, alérgicas e autoimunes (asma grave, artrite reumatoide, lúpus, vasculites, dermatoses), em doses anti-inflamatórias ou imunossupressoras.',
        },
      ],
      mecanismo:
        'Pró-fármaco convertido no fígado em prednisolona pela 11β-hidroxiesteroide desidrogenase tipo 1. A prednisolona liga-se ao receptor glicocorticoide; o complexo transloca-se ao núcleo, reprime fatores de transcrição pró-inflamatórios (NF-κB, AP-1) e induz proteínas anti-inflamatórias como a anexina-1, que inibe a fosfolipase A2. Potência anti-inflamatória cerca de 4 vezes a do cortisol, com atividade mineralocorticoide menor; ação intermediária (12–36 h).',
      indicacoes: [
        'Doenças reumáticas e autoimunes (artrite reumatoide, lúpus, vasculites, polimialgia reumática)',
        'Exacerbações de asma e DPOC',
        'Doenças alérgicas graves e dermatoses inflamatórias',
        'Síndrome nefrótica e doenças inflamatórias intestinais',
        'Componente de esquemas onco-hematológicos e imunossupressão em transplante',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['prednisone'],
      nomesComerciais: [
        { nome: 'Meticorten', tipo: 'referencia', verificacao: 'pendente_anvisa' },
      ],
      generico: true,
      eaComuns: [
        { termo: 'Aumento do apetite e ganho de peso', sinonimos: ['ganho de peso', 'aumento de apetite', 'engordar'] },
        { termo: 'Insônia e alterações de humor', sinonimos: ['insonia', 'euforia', 'irritabilidade', 'alteracao de humor'] },
        { termo: 'Hiperglicemia', sinonimos: ['glicose alta', 'acucar alto', 'diabetes induzido por corticoide'] },
      ],
      eaGraves: [
        {
          termo: 'Síndrome de Cushing iatrogênica',
          sinonimos: ['cushing', 'sindrome de cushing', 'cushing exogeno', 'face de lua cheia', 'fascies cushingoide', 'giba de bufalo', 'obesidade centripeta', 'hipercortisolismo'],
        },
        { termo: 'Supressão do eixo hipotálamo-hipófise-adrenal', sinonimos: ['supressao adrenal', 'insuficiencia adrenal', 'supressao do eixo hha', 'crise adrenal na retirada'] },
        { termo: 'Osteoporose', sinonimos: ['perda de massa ossea', 'fratura', 'osteopenia'] },
        { termo: 'Infecções oportunistas', sinonimos: ['imunossupressao', 'infeccao', 'candidiase', 'reativacao de tuberculose'] },
      ],
      eaCaracteristico: 'Síndrome de Cushing iatrogênica',
      distratoresEA: ['Agranulocitose', 'Depressão respiratória', 'Tosse seca por acúmulo de bradicinina', 'Hiperplasia gengival'],
      contraindicacoes: ['Infecções sistêmicas fúngicas ou não controladas', 'Vacinas de vírus vivos em doses imunossupressoras', 'Hipersensibilidade ao fármaco'],
      precaucoes: [
        'Uso por mais de 2–3 semanas exige retirada gradual (risco de insuficiência adrenal aguda)',
        'Diabetes, hipertensão, glaucoma, osteoporose, úlcera péptica e transtornos psiquiátricos',
        'Tomar pela manhã para imitar o ritmo circadiano e reduzir a supressão do eixo',
        'Prevenção de osteoporose (cálcio, vitamina D, bisfosfonato) em uso prolongado',
      ],
      interacoes: [
        'AINEs: aumento do risco de úlcera e sangramento gastrointestinal',
        'Indutores do CYP3A4 (rifampicina, fenitoína, carbamazepina): reduzem o efeito',
        'Antidiabéticos e insulina: perda de controle glicêmico',
        'Diuréticos de alça e tiazídicos: hipocalemia aditiva',
      ],
      explicacaoFase2:
        'É um glicocorticoide sistêmico (anti-inflamatório esteroidal), pró-fármaco ativado no fígado em prednisolona. Atua no núcleo da célula, desligando genes da inflamação e bloqueando a cascata do ácido araquidônico a montante das COX.',
      explicacaoFase3:
        'Doses suprafisiológicas prolongadas reproduzem o excesso de cortisol: redistribuição de gordura (face em lua cheia, giba), catabolismo muscular, estrias violáceas, hiperglicemia e hipertensão — a síndrome de Cushing iatrogênica.',
      referencias: [REF_GG, REF_KATZUNG, REF_RANG, REF_FTN, 'Bula Meticorten (prednisona) — ANVISA.'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    {
      id: 'prednisolona',
      nome: 'Prednisolona',
      sinonimos: ['prednisolone', 'fosfato sodico de prednisolona', 'acetato de prednisolona'],
      vinculos: [
        {
          grupoId: 'antiinflamatorios',
          classeId: 'corticoide-sistemico',
          subclasse: 'Glicocorticoide de ação intermediária (forma ativa)',
          contexto: 'corticoterapia oral, especialmente em pediatria (solução oral) e em hepatopatas',
          explicacaoFase1:
            'A prednisolona é o metabólito ativo da prednisona, muito usada em pediatria na forma de solução oral (ex.: crise de asma, laringite) e preferida em hepatopatas, por dispensar ativação hepática.',
        },
      ],
      mecanismo:
        'Glicocorticoide ativo que se liga diretamente ao receptor glicocorticoide, reprimindo genes pró-inflamatórios (NF-κB, AP-1, COX-2, citocinas) e induzindo genes anti-inflamatórios. Potência anti-inflamatória cerca de 4 vezes a do cortisol, com menor atividade mineralocorticoide e ação intermediária (12–36 h).',
      indicacoes: [
        'Exacerbações de asma em crianças e adultos',
        'Doenças alérgicas, reumáticas e autoimunes',
        'Doenças inflamatórias em hepatopatas',
        'Síndrome nefrótica',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['prednisolone'],
      nomesComerciais: [
        { nome: 'Predsim', tipo: 'marca', verificacao: 'pendente_anvisa' },
        { nome: 'Prelone', tipo: 'marca', verificacao: 'pendente_anvisa' },
      ],
      generico: true,
      eaComuns: [
        { termo: 'Aumento do apetite e ganho de peso', sinonimos: ['ganho de peso', 'aumento de apetite'] },
        { termo: 'Insônia e alterações de humor', sinonimos: ['insonia', 'irritabilidade', 'euforia'] },
        { termo: 'Hiperglicemia', sinonimos: ['glicose alta', 'acucar alto'] },
      ],
      eaGraves: [
        {
          termo: 'Supressão do eixo hipotálamo-hipófise-adrenal',
          sinonimos: ['supressao adrenal', 'insuficiencia adrenal', 'supressao do eixo hha', 'crise adrenal', 'insuficiencia adrenal na retirada'],
        },
        { termo: 'Síndrome de Cushing iatrogênica', sinonimos: ['cushing', 'face de lua cheia', 'hipercortisolismo'] },
        { termo: 'Retardo do crescimento em crianças', sinonimos: ['baixa estatura', 'atraso do crescimento', 'parada do crescimento'] },
        { termo: 'Infecções oportunistas', sinonimos: ['imunossupressao', 'infeccao'] },
      ],
      eaCaracteristico: 'Supressão do eixo hipotálamo-hipófise-adrenal',
      distratoresEA: ['Agranulocitose', 'Hepatotoxicidade (necrose hepática por NAPQI)', 'Tosse seca por acúmulo de bradicinina', 'Ototoxicidade'],
      contraindicacoes: ['Infecções sistêmicas fúngicas ou não controladas', 'Vacinas de vírus vivos em doses imunossupressoras', 'Hipersensibilidade ao fármaco'],
      precaucoes: [
        'Retirada gradual após uso prolongado',
        'Monitorar crescimento em crianças em uso crônico',
        'Diabetes, hipertensão, glaucoma, osteoporose e transtornos psiquiátricos',
      ],
      interacoes: [
        'AINEs: maior risco de úlcera gastrointestinal',
        'Indutores do CYP3A4 (rifampicina, fenitoína): reduzem o efeito',
        'Antidiabéticos: perda de controle glicêmico',
        'Diuréticos espoliadores de potássio: hipocalemia',
      ],
      explicacaoFase2:
        'É um glicocorticoide sistêmico, a forma já ativa da prednisona. Liga-se ao receptor glicocorticoide e altera a transcrição gênica, reduzindo mediadores inflamatórios e a resposta imune.',
      explicacaoFase3:
        'O corticoide exógeno exerce retroalimentação negativa sobre hipotálamo (CRH) e hipófise (ACTH), levando à atrofia da adrenal. Se o tratamento prolongado for interrompido de forma abrupta, a adrenal não produz cortisol suficiente: insuficiência adrenal aguda.',
      referencias: [REF_GG, REF_KATZUNG, REF_RANG, REF_FTN, 'GINA — Global Strategy for Asthma Management and Prevention, 2024.'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    {
      id: 'dexametasona',
      nome: 'Dexametasona',
      sinonimos: ['dexamethasone', 'fosfato dissodico de dexametasona', 'acetato de dexametasona'],
      vinculos: [
        {
          grupoId: 'antiinflamatorios',
          classeId: 'corticoide-sistemico',
          subclasse: 'Glicocorticoide de ação prolongada (fluorado)',
          contexto: 'edema cerebral, náuseas e vômitos induzidos por quimioterapia, reações alérgicas graves e quadros inflamatórios intensos',
          explicacaoFase1:
            'A dexametasona é corticoide muito potente e de ação longa, usado em edema cerebral peritumoral, prevenção de náuseas por quimioterapia, maturação pulmonar fetal, laringite e quadros inflamatórios ou alérgicos graves; também na COVID-19 grave com necessidade de oxigênio.',
        },
      ],
      mecanismo:
        'Glicocorticoide fluorado que se liga com alta afinidade ao receptor glicocorticoide, reprimindo genes pró-inflamatórios e induzindo genes anti-inflamatórios. Potência anti-inflamatória cerca de 25–30 vezes a do cortisol, praticamente sem atividade mineralocorticoide, e ação prolongada (36–72 h), o que aumenta a supressão do eixo hipotálamo-hipófise-adrenal.',
      indicacoes: [
        'Edema cerebral (tumores, neurocirurgia)',
        'Prevenção de náuseas e vômitos induzidos por quimioterapia',
        'Reações alérgicas e anafiláticas graves (adjuvante)',
        'Doenças reumáticas, dermatológicas e respiratórias inflamatórias',
        'Teste de supressão com dexametasona (diagnóstico de síndrome de Cushing)',
        'COVID-19 grave em uso de oxigênio ou ventilação mecânica',
      ],
      offLabel: ['Maturação pulmonar fetal no trabalho de parto prematuro (prática consagrada em diretrizes obstétricas)'],
      tipoMolecula: 'pequena',
      pubchem: ['dexamethasone'],
      nomesComerciais: [
        { nome: 'Decadron', tipo: 'referencia', verificacao: 'pendente_anvisa' },
      ],
      generico: true,
      eaComuns: [
        { termo: 'Hiperglicemia', sinonimos: ['glicose alta', 'acucar alto', 'diabetes induzido por corticoide'] },
        { termo: 'Insônia e agitação', sinonimos: ['insonia', 'agitacao', 'euforia'] },
        { termo: 'Aumento do apetite', sinonimos: ['fome aumentada', 'ganho de peso'] },
      ],
      eaGraves: [
        { termo: 'Supressão do eixo hipotálamo-hipófise-adrenal', sinonimos: ['supressao adrenal', 'insuficiencia adrenal', 'supressao do eixo hha'] },
        { termo: 'Psicose induzida por corticoide', sinonimos: ['psicose', 'mania', 'delirium'] },
        { termo: 'Infecções oportunistas', sinonimos: ['imunossupressao', 'infeccao', 'candidiase'] },
        { termo: 'Miopatia por corticoide', sinonimos: ['fraqueza muscular proximal', 'miopatia'] },
        { termo: 'Osteoporose', sinonimos: ['perda de massa ossea', 'fratura'] },
      ],
      eaCaracteristico: 'Hiperglicemia',
      distratoresEA: ['Retenção de sódio e hipocalemia (efeito mineralocorticoide)', 'Agranulocitose', 'Depressão respiratória', 'Tosse seca por acúmulo de bradicinina'],
      contraindicacoes: ['Infecções fúngicas sistêmicas', 'Vacinas de vírus vivos em doses imunossupressoras', 'Hipersensibilidade ao fármaco'],
      precaucoes: [
        'Monitorar glicemia, inclusive em não diabéticos, em doses altas',
        'Retirada gradual após uso prolongado (supressão adrenal mais intensa que a dos corticoides de ação intermediária)',
        'Não é adequado para reposição na insuficiência adrenal por não ter ação mineralocorticoide',
      ],
      interacoes: [
        'Indutores do CYP3A4 (rifampicina, fenitoína, carbamazepina): reduzem os níveis de dexametasona',
        'A própria dexametasona induz o CYP3A4 e pode reduzir níveis de outros fármacos',
        'AINEs: maior risco de úlcera gastrointestinal',
        'Antidiabéticos e insulina: perda de controle glicêmico',
      ],
      explicacaoFase2:
        'É um glicocorticoide sistêmico de alta potência e longa duração. Desliga genes da inflamação no núcleo celular e, por não reter sódio, é preferido quando se quer efeito anti-inflamatório puro, como no edema cerebral.',
      explicacaoFase3:
        'Os glicocorticoides aumentam a gliconeogênese hepática e reduzem a captação periférica de glicose (resistência à insulina). Com a dexametasona, potente e de ação longa, a hiperglicemia é frequente e pode descompensar diabéticos ou revelar diabetes latente.',
      referencias: [REF_GG, REF_KATZUNG, REF_RANG, REF_FTN, 'RECOVERY Collaborative Group. Dexamethasone in hospitalized patients with Covid-19. N Engl J Med 2021;384:693-704.', 'Bula Decadron (dexametasona) — ANVISA.'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
    {
      id: 'hidrocortisona',
      nome: 'Hidrocortisona',
      sinonimos: ['cortisol', 'hydrocortisone', 'succinato sodico de hidrocortisona', 'acetato de hidrocortisona'],
      vinculos: [
        {
          grupoId: 'antiinflamatorios',
          classeId: 'corticoide-sistemico',
          subclasse: 'Glicocorticoide de ação curta (cortisol)',
          contexto: 'insuficiência adrenal e uso intravenoso em emergências (choque séptico refratário, anafilaxia, crise asmática)',
          explicacaoFase1:
            'A hidrocortisona é o próprio cortisol, de escolha na reposição da insuficiência adrenal e na crise adrenal. Por via intravenosa também é usada em choque séptico refratário a vasopressores e como adjuvante em emergências alérgicas e asmáticas.',
        },
      ],
      mecanismo:
        'Idêntica ao cortisol endógeno: ativa o receptor glicocorticoide (efeitos anti-inflamatórios, imunossupressores e metabólicos) e também, de forma significativa, o receptor mineralocorticoide (retenção de sódio). É o padrão de potência (anti-inflamatória = 1; mineralocorticoide = 1) e tem ação curta (8–12 h).',
      indicacoes: [
        'Insuficiência adrenal primária e secundária (reposição) e crise adrenal',
        'Choque séptico refratário a vasopressores',
        'Adjuvante no tratamento de anafilaxia, angioedema e crise asmática grave',
        'Hiperplasia adrenal congênita',
      ],
      tipoMolecula: 'pequena',
      pubchem: ['hydrocortisone'],
      nomesComerciais: [
        { nome: 'Solu-Cortef', tipo: 'referencia', fabricante: 'Pfizer', verificacao: 'pendente_anvisa', obs: 'injetável — uso hospitalar' },
        { nome: 'Flebocortid', tipo: 'marca', verificacao: 'pendente_anvisa', obs: 'injetável — uso hospitalar' },
      ],
      generico: true,
      eaComuns: [
        { termo: 'Hiperglicemia', sinonimos: ['glicose alta', 'acucar alto'] },
        { termo: 'Edema por retenção hídrica', sinonimos: ['edema', 'inchaco', 'retencao de liquidos'] },
        { termo: 'Insônia e alterações de humor', sinonimos: ['insonia', 'irritabilidade'] },
      ],
      eaGraves: [
        {
          termo: 'Retenção de sódio e hipocalemia (efeito mineralocorticoide)',
          sinonimos: ['hipocalemia', 'hipopotassemia', 'potassio baixo', 'retencao de sodio', 'hipernatremia', 'efeito mineralocorticoide', 'hipertensao por retencao de sodio'],
        },
        { termo: 'Supressão do eixo hipotálamo-hipófise-adrenal', sinonimos: ['supressao adrenal', 'insuficiencia adrenal'] },
        { termo: 'Infecções oportunistas', sinonimos: ['imunossupressao', 'infeccao'] },
      ],
      eaCaracteristico: 'Retenção de sódio e hipocalemia (efeito mineralocorticoide)',
      distratoresEA: ['Agranulocitose', 'Depressão respiratória', 'Tosse seca por acúmulo de bradicinina', 'Ototoxicidade'],
      contraindicacoes: ['Infecções fúngicas sistêmicas', 'Hipersensibilidade ao fármaco (atenção a excipientes da formulação)'],
      precaucoes: [
        'Na crise adrenal e na anafilaxia não atrasar outras medidas (na anafilaxia o fármaco de escolha é a adrenalina)',
        'Pacientes em reposição devem dobrar ou triplicar a dose em situações de estresse (orientação de "dias de doença")',
        'Monitorar potássio, sódio e pressão arterial',
      ],
      interacoes: [
        'Diuréticos de alça e tiazídicos, anfotericina B: hipocalemia aditiva',
        'Digoxina: a hipocalemia aumenta o risco de toxicidade digitálica',
        'Indutores do CYP3A4: reduzem o efeito',
        'Antidiabéticos: perda de controle glicêmico',
      ],
      explicacaoFase2:
        'É o próprio cortisol usado como medicamento, um glicocorticoide sistêmico de ação curta. Além de desligar genes inflamatórios, ativa o receptor mineralocorticoide, por isso também repõe a função da aldosterona na insuficiência adrenal.',
      explicacaoFase3:
        'Por ativar significativamente o receptor mineralocorticoide no túbulo coletor renal, a hidrocortisona aumenta a reabsorção de sódio e a excreção de potássio, causando retenção hídrica, hipertensão e hipocalemia — efeito praticamente ausente na dexametasona.',
      referencias: [REF_GG, REF_KATZUNG, REF_RANG, 'Bornstein SR et al. Diagnosis and Treatment of Primary Adrenal Insufficiency: Endocrine Society Clinical Practice Guideline. J Clin Endocrinol Metab 2016;101:364-89.', 'Evans L et al. Surviving Sepsis Campaign: International Guidelines 2021. Crit Care Med 2021;49:e1063-e1143.'],
      dataRevisao: REV,
      validacao: 'revisado_referencias',
    },
  ],

  vinculosExtras: [],

  // -------------------------------------------------------------------
  // RESUMOS
  // -------------------------------------------------------------------
  resumos: [
    {
      grupoId: 'analgesicos',
      visaoGeral: [
        'Analgésicos são fármacos que reduzem a percepção da dor sem abolir a consciência. Dividem-se em dois grandes conjuntos: os não opioides (paracetamol, dipirona e AINEs, incluindo o AAS), que atuam sobretudo reduzindo a síntese de prostaglandinas, e os opioides (codeína, tramadol, morfina, oxicodona, fentanila), que ativam receptores opioides — principalmente o μ — no sistema nervoso central e periférico.',
        'Antitérmicos (antipiréticos) reduzem a febre ao bloquear a produção de PGE2 no hipotálamo, que eleva o ponto de ajuste térmico em resposta a pirógenos (IL-1, IL-6, TNF-α). Paracetamol, dipirona e AINEs são antitérmicos; os opioides não são. Entre os não opioides, a ação anti-inflamatória varia: é relevante nos AINEs e desprezível no paracetamol e na dipirona.',
        'A escolha segue a intensidade e o tipo de dor. A escada analgésica da OMS (originalmente para dor oncológica) organiza o raciocínio: degrau 1 — não opioide ± adjuvante; degrau 2 — opioide fraco (codeína, tramadol) + não opioide; degrau 3 — opioide forte (morfina, oxicodona, fentanila) + não opioide. Em dor aguda intensa pode-se iniciar diretamente no degrau adequado, e a diretriz da OMS de 2018 enfatiza a individualização.',
        'Os opioides são substâncias de controle especial no Brasil (Portaria SVS/MS 344/98): morfina, oxicodona e fentanila na Lista A1 (Notificação de Receita A); codeína e tramadol na Lista A2, com formulações de menor concentração dispensadas com Receita de Controle Especial. O uso exige atenção a depressão respiratória, constipação, tolerância, dependência e interação com outros depressores do SNC.',
      ],
      mecanismos: [
        {
          titulo: 'Paracetamol (para-aminofenol)',
          texto:
            'Inibe as cicloxigenases de forma fraca e dependente do ambiente redox: em tecidos com baixo tônus de peróxidos, como o SNC, a inibição é eficaz; em focos inflamatórios, ricos em peróxidos, não. Isso explica o bom efeito analgésico e antitérmico com ação anti-inflamatória mínima. Há contribuição das vias serotoninérgicas descendentes e do metabólito AM404, que atua em TRPV1 e no sistema endocanabinoide. Não altera a agregação plaquetária nem lesa a mucosa gástrica. Em superdose, o metabólito NAPQI esgota a glutationa e causa necrose hepática.',
        },
        {
          titulo: 'Dipirona (pirazolona)',
          texto:
            'Pró-fármaco hidrolisado no intestino a 4-MAA, que é metabolizado a 4-AA; ambos inibem a síntese de prostaglandinas, predominantemente no SNC. Estudos sugerem envolvimento de receptores canabinoides CB1 e de vias opioides endógenas na analgesia, além de efeito espasmolítico direto no músculo liso, útil em cólicas. Ação anti-inflamatória fraca. O risco de agranulocitose, raro e idiossincrásico, motivou a retirada em vários países, mas não no Brasil.',
        },
        {
          titulo: 'AINEs e AAS como analgésicos',
          texto:
            'Inibem COX-1 e COX-2 periféricas e centrais, reduzindo PGE2 e PGI2, que sensibilizam nociceptores à bradicinina e à histamina (hiperalgesia inflamatória). São mais úteis na dor com componente inflamatório (dor dentária, dismenorreia, dor musculoesquelética, pós-operatória). O AAS acetila a COX de forma irreversível; seu uso analgésico é limitado por sangramento e pelo risco de síndrome de Reye em crianças.',
        },
        {
          titulo: 'Opioides agonistas fortes (morfina, oxicodona, fentanila)',
          texto:
            'Agonistas plenos do receptor μ, acoplado a proteína Gi/o. No terminal pré-sináptico da fibra aferente primária, fecham canais de Ca2+ voltagem-dependentes e reduzem a liberação de glutamato e substância P; no neurônio pós-sináptico, abrem canais de K+ (GIRK), hiperpolarizando-o. Na substância cinzenta periaquedutal e no bulbo rostroventral, inibem interneurônios GABAérgicos e desinibem as vias descendentes que bloqueiam a dor na medula. Não têm efeito-teto analgésico, mas a dose é limitada por depressão respiratória. Diferem em farmacocinética: a morfina é hidrofílica e tem metabólitos renais ativos; a oxicodona tem alta biodisponibilidade oral; a fentanila é muito lipossolúvel e potente, permitindo uso IV em anestesia e via transdérmica.',
        },
        {
          titulo: 'Opioides fracos (codeína) e de mecanismo duplo (tramadol)',
          texto:
            'A codeína tem baixa afinidade pelo receptor μ e funciona como pró-fármaco: cerca de 5–10% é convertida em morfina pelo CYP2D6. O tramadol é racêmico: o metabólito O-desmetiltramadol (M1, também via CYP2D6) é agonista μ, e os enantiômeros do fármaco inibem a recaptação de serotonina (+) e noradrenalina (−), somando ação sobre as vias descendentes monoaminérgicas. Em ambos, a resposta varia conforme o genótipo do CYP2D6 (metabolizadores lentos: menos analgesia; ultrarrápidos: toxicidade). Ambos têm efeito máximo menor que o dos opioides fortes, ocupando o degrau 2 da escada.',
        },
        {
          titulo: 'Agonistas parciais e agonistas-antagonistas',
          texto:
            'A buprenorfina é agonista parcial μ de alta afinidade e dissociação lenta, com efeito-teto para a depressão respiratória; a nalbufina é agonista κ e antagonista μ. Em pacientes em uso de agonista pleno, podem deslocá-lo do receptor e precipitar abstinência. A naloxona, antagonista puro, reverte a depressão respiratória por opioides.',
        },
      ],
      fluxogramas: [
        {
          titulo: 'Da lesão à dor — onde agem os não opioides',
          passos: [
            'Lesão tecidual / inflamação',
            'Fosfolipase A2 libera ácido araquidônico das membranas',
            'COX-1/COX-2 (← AINEs, AAS; ← paracetamol e dipirona sobretudo no SNC) → PGH2',
            'PGE2 e PGI2 sensibilizam nociceptores (hiperalgesia)',
            'PGE2 hipotalâmica eleva o ponto de ajuste térmico → febre',
            'Sinal nociceptivo ascende pelo corno dorsal da medula ao tálamo e córtex',
          ],
        },
        {
          titulo: 'Receptor μ — da ligação ao efeito',
          passos: [
            'Opioide (morfina, oxicodona, fentanila; M1 do tramadol; morfina derivada da codeína) liga-se ao receptor μ',
            'Ativação da proteína Gi/o',
            '↓ adenilato ciclase e AMPc; fechamento de canais de Ca2+ pré-sinápticos; abertura de canais de K+ pós-sinápticos',
            '↓ liberação de glutamato e substância P + hiperpolarização do neurônio de segunda ordem',
            'Analgesia (medula, tronco, PAG) — e também depressão respiratória (bulbo), miose (núcleo de Edinger-Westphal) e constipação (plexo mioentérico)',
            'Naloxona compete pelo receptor e reverte os efeitos',
          ],
        },
        {
          titulo: 'Metabolismo do paracetamol e toxicidade',
          passos: [
            'Paracetamol',
            '~90%: glicuronidação e sulfatação → metabólitos inativos excretados na urina',
            '~5–10%: CYP2E1 (e CYP3A4) → NAPQI (reativo)',
            'NAPQI + glutationa → conjugado atóxico',
            'Superdose / etilismo / jejum: glutationa esgotada → NAPQI liga-se a proteínas do hepatócito → necrose centrolobular',
            'N-acetilcisteína repõe glutationa (antídoto)',
          ],
        },
      ],
      eaFrequentes: [
        { efeito: 'Constipação intestinal', classes: 'Todos os opioides', mecanismo: 'Ativação de receptores μ no plexo mioentérico reduz a peristalse propulsiva; não há tolerância — prescrever laxante' },
        { efeito: 'Náuseas e vômitos', classes: 'Opioides (principalmente no início)', mecanismo: 'Estimulação da zona de gatilho quimiorreceptora no bulbo e sensibilização vestibular' },
        { efeito: 'Sedação e sonolência', classes: 'Opioides', mecanismo: 'Depressão do SNC; há tolerância em dias' },
        { efeito: 'Prurido', classes: 'Morfina (e outros opioides)', mecanismo: 'Liberação de histamina pelos mastócitos e mecanismo central' },
        { efeito: 'Miose', classes: 'Opioides', mecanismo: 'Estimulação do núcleo de Edinger-Westphal (parassimpático); sem tolerância — sinal útil de intoxicação' },
        { efeito: 'Dispepsia', classes: 'AAS e AINEs usados como analgésicos', mecanismo: 'Inibição da COX-1 gástrica' },
        { efeito: 'Hipotensão', classes: 'Dipirona IV, morfina', mecanismo: 'Vasodilatação; liberação de histamina (morfina)' },
      ],
      eaGraves: [
        { efeito: 'Depressão respiratória', classes: 'Opioides fortes (e fracos em doses altas ou metabolizadores ultrarrápidos)', mecanismo: 'Redução da resposta dos centros respiratórios do tronco ao CO2; potencializada por benzodiazepínicos e álcool; antídoto naloxona' },
        { efeito: 'Hepatotoxicidade', classes: 'Paracetamol', mecanismo: 'Acúmulo de NAPQI após esgotamento da glutationa; antídoto N-acetilcisteína' },
        { efeito: 'Agranulocitose', classes: 'Dipirona', mecanismo: 'Reação imunológica idiossincrásica, não dose-dependente' },
        { efeito: 'Síndrome serotoninérgica e convulsões', classes: 'Tramadol', mecanismo: 'Inibição da recaptação de serotonina e noradrenalina; risco maior com ISRS, IRSN, IMAO' },
        { efeito: 'Toxicidade em metabolizadores ultrarrápidos do CYP2D6', classes: 'Codeína, tramadol', mecanismo: 'Conversão excessiva a morfina ou M1; contraindicados em menores de 12 anos' },
        { efeito: 'Rigidez torácica', classes: 'Fentanila (e outros opioides lipossolúveis potentes em bolus IV)', mecanismo: 'Efeito central sobre o tônus muscular; tratar com bloqueador neuromuscular/naloxona' },
        { efeito: 'Dependência, tolerância e abstinência', classes: 'Opioides', mecanismo: 'Adaptação dos receptores e das vias de recompensa (mesolímbicas)' },
        { efeito: 'Síndrome de Reye', classes: 'AAS em crianças/adolescentes com virose', mecanismo: 'Encefalopatia e esteatose hepática microvesicular; mecanismo não totalmente esclarecido (lesão mitocondrial)' },
      ],
      primeirasLinhas: [
        { condicao: 'Dor leve a moderada e febre em adultos', recomendacao: 'Paracetamol ou dipirona; AINE se houver componente inflamatório', observacao: 'Paracetamol preferido em risco gastrointestinal, renal ou de sangramento', fonte: 'Formulário Terapêutico Nacional / RENAME 2024' },
        { condicao: 'Febre e dor em crianças', recomendacao: 'Paracetamol ou ibuprofeno (dipirona também usada no Brasil)', observacao: 'Evitar AAS (síndrome de Reye); codeína e tramadol contraindicados abaixo de 12 anos', fonte: 'Sociedade Brasileira de Pediatria; FDA 2017' },
        { condicao: 'Dor em gestantes', recomendacao: 'Paracetamol na menor dose e pelo menor tempo eficazes', observacao: 'Evitar AINEs a partir de 20 semanas (oligoidrâmnio, fechamento do canal arterial)', fonte: 'FDA Drug Safety Communication 2020; Katzung 15ª ed.' },
        { condicao: 'Dor oncológica leve', recomendacao: 'Não opioide (paracetamol, dipirona ou AINE) ± adjuvante', fonte: 'OMS 2018 — manejo da dor oncológica' },
        { condicao: 'Dor oncológica moderada a intensa', recomendacao: 'Opioide (morfina oral de referência; oxicodona ou fentanila transdérmica como alternativas), associado a não opioide', observacao: 'Fentanila transdérmica apenas em dor estável e paciente tolerante a opioide; laxante profilático', fonte: 'OMS 2018; ESMO Cancer Pain Guideline 2018' },
        { condicao: 'Dor aguda moderada (ex.: pós-operatório ambulatorial)', recomendacao: 'Associação não opioide + opioide fraco (paracetamol + codeína ou tramadol) por curto período', observacao: 'Prescrever a menor quantidade necessária', fonte: 'CDC 2022 — prescrição de opioides' },
        { condicao: 'Dor crônica não oncológica', recomendacao: 'Priorizar terapias não farmacológicas e não opioides; opioide apenas se benefício superar risco', observacao: 'Reavaliar periodicamente; evitar associação com benzodiazepínicos', fonte: 'CDC 2022 — prescrição de opioides' },
        { condicao: 'Dor do infarto agudo do miocárdio refratária a nitrato', recomendacao: 'Morfina IV em doses tituladas', observacao: 'Pode retardar a absorção de antiplaquetários orais (inibidores de P2Y12)', fonte: 'ESC 2023 — síndromes coronarianas agudas' },
      ],
      contraindicacoes: [
        'Paracetamol: insuficiência hepática grave; cautela em etilistas e desnutridos',
        'Dipirona: história de agranulocitose, porfiria, deficiência de G6PD, terceiro trimestre da gestação',
        'AAS: crianças/adolescentes com virose (Reye), úlcera ativa, distúrbios hemorrágicos, asma induzida por AINE',
        'Opioides: depressão respiratória aguda, asma grave aguda, íleo paralítico',
        'Codeína e tramadol: menores de 12 anos, metabolizadores ultrarrápidos do CYP2D6, lactação (codeína)',
        'Tramadol: uso de IMAO, epilepsia não controlada',
        'Fentanila transdérmica: pacientes virgens de opioide ou dor aguda',
      ],
      interacoes: [
        'Opioides + benzodiazepínicos/álcool/gabapentinoides: depressão respiratória aditiva, potencialmente fatal',
        'Tramadol + ISRS/IRSN/IMAO/triptanas: síndrome serotoninérgica e convulsões',
        'Codeína/tramadol + inibidores do CYP2D6 (fluoxetina, paroxetina): perda de analgesia',
        'Oxicodona/fentanila + inibidores do CYP3A4 (claritromicina, cetoconazol, ritonavir): toxicidade opioide',
        'Paracetamol + álcool/indutores enzimáticos: maior formação de NAPQI',
        'Dipirona ou ibuprofeno antes do AAS em dose baixa: redução do efeito antiagregante',
        'Dipirona + metotrexato: toxicidade hematológica',
      ],
      comparacoes: [
        { titulo: 'Paracetamol x dipirona', texto: 'Ambos analgésicos e antitérmicos com ação anti-inflamatória fraca e boa tolerância gástrica. A dipirona tem maior potência analgésica e efeito espasmolítico (cólicas), mas carrega risco raro de agranulocitose e hipotensão IV. O paracetamol tem como risco principal a hepatotoxicidade em superdose e é o analgésico de escolha na gestação.' },
        { titulo: 'Não opioides x opioides', texto: 'Não opioides têm efeito-teto (aumentar a dose além do limite não aumenta a analgesia, só a toxicidade), são antitérmicos e não causam dependência. Opioides não têm teto analgésico, não são antitérmicos, e seus limites são depressão respiratória, constipação, tolerância e dependência.' },
        { titulo: 'Opioides fracos x fortes', texto: 'Codeína e tramadol têm eficácia máxima menor, dependem do CYP2D6 e são usados no degrau 2. Morfina, oxicodona e fentanila são agonistas plenos μ, usados no degrau 3 e em dor aguda intensa.' },
        { titulo: 'Tramadol x codeína', texto: 'Ambos dependem do CYP2D6 para formar o metabólito opioide ativo. O tramadol soma inibição da recaptação de serotonina e noradrenalina (útil em dor com componente neuropático), com risco de síndrome serotoninérgica e convulsões; a codeína é antitussígena e mais constipante.' },
        { titulo: 'Morfina x oxicodona x fentanila', texto: 'Morfina: referência, hidrofílica, metabólitos ativos de eliminação renal (evitar em insuficiência renal). Oxicodona: maior biodisponibilidade oral, metabolismo pelo CYP3A4/2D6. Fentanila: 50–100 vezes mais potente, muito lipossolúvel, início rápido IV, sem metabólitos ativos (opção em insuficiência renal), e disponível em adesivo transdérmico.' },
        { titulo: 'AAS: efeito depende da dose', texto: '75–100 mg/dia: antiagregante (bloqueio irreversível da COX-1 plaquetária). 500 mg a 1 g: analgésico e antitérmico. Doses altas (acima de 3 g/dia): anti-inflamatório, com zumbido e toxicidade salicílica.' },
      ],
      memorizar: [
        'Paracetamol: analgésico e antitérmico, praticamente sem ação anti-inflamatória; superdose → NAPQI → necrose hepática; antídoto N-acetilcisteína.',
        'Dipirona: analgésico, antitérmico e espasmolítico; risco característico é agranulocitose.',
        'Antitérmicos agem reduzindo PGE2 no hipotálamo; opioides não são antitérmicos.',
        'Receptor μ: Gi/o → ↓ Ca2+ pré-sináptico, ↑ K+ pós-sináptico → analgesia.',
        'Tríade da intoxicação opioide: coma, miose puntiforme e depressão respiratória — tratar com naloxona.',
        'Constipação e miose não sofrem tolerância; sedação e náusea sim.',
        'Codeína é pró-fármaco da morfina via CYP2D6; contraindicada em menores de 12 anos.',
        'Tramadol: mecanismo duplo (agonista μ via M1 + inibição da recaptação de 5-HT e NA) → risco de síndrome serotoninérgica e convulsões.',
        'Fentanila: 50–100× a morfina, lipossolúvel, IV em anestesia ou adesivo em dor crônica estável; bolus rápido pode causar tórax rígido.',
        'Morfina em insuficiência renal: acúmulo de M6G (sedação) e M3G (mioclonias).',
        'Escada da OMS: não opioide → opioide fraco + não opioide → opioide forte + não opioide.',
        'Opioides fortes: Lista A1 (Notificação de Receita A); codeína e tramadol: Lista A2.',
        'AAS em dose analgésica: evitar em crianças com virose (síndrome de Reye).',
      ],
      fontes: [REF_GG, REF_KATZUNG, REF_RANG, REF_FTN, REF_344, REF_OMS_DOR, REF_CDC, 'Fallon M et al. Management of cancer pain in adult patients: ESMO Clinical Practice Guidelines. Ann Oncol 2018;29(Suppl 4):iv166-91.', 'Byrne RA et al. 2023 ESC Guidelines for the management of acute coronary syndromes. Eur Heart J 2023;44:3720-826.'],
      dataRevisao: REV,
    },
    {
      grupoId: 'antiinflamatorios',
      visaoGeral: [
        'Os anti-inflamatórios dividem-se em não esteroidais (AINEs) e esteroidais (glicocorticoides). Os AINEs inibem as cicloxigenases (COX), enzimas que convertem o ácido araquidônico em prostaglandinas e tromboxanos; têm efeitos anti-inflamatório, analgésico e antitérmico. Os glicocorticoides agem a montante, no núcleo celular, reprimindo a transcrição de genes inflamatórios e imunes, com efeito anti-inflamatório e imunossupressor muito mais amplo.',
        'Existem duas isoformas principais de COX. A COX-1 é constitutiva e produz prostaglandinas de "manutenção": proteção da mucosa gástrica, regulação do fluxo sanguíneo renal e tromboxano A2 plaquetário. A COX-2 é induzida na inflamação (mas também é constitutiva no rim, no endotélio e no SNC) e gera prostaglandinas que causam dor, edema e febre, além da prostaciclina endotelial. O grau de seletividade para cada isoforma explica as diferenças de toxicidade entre os AINEs.',
        'Conforme a seletividade, os AINEs são classificados em: não seletivos (ibuprofeno, naproxeno, cetoprofeno — derivados do ácido propiônico; diclofenaco — ácido acético); preferenciais para COX-2 (nimesulida, meloxicam), com seletividade parcial e dose-dependente; e coxibes (celecoxibe), seletivos para COX-2. O AAS é um caso à parte: único inibidor irreversível da COX, é antiagregante plaquetário em dose baixa.',
        'Os glicocorticoides sistêmicos (hidrocortisona, prednisona, prednisolona, dexametasona) diferem em potência anti-inflamatória, atividade mineralocorticoide e duração de ação. São indispensáveis em doenças autoimunes, alérgicas graves e inflamatórias, mas o uso prolongado causa síndrome de Cushing iatrogênica, supressão do eixo hipotálamo-hipófise-adrenal, hiperglicemia, osteoporose e infecções, exigindo retirada gradual.',
      ],
      mecanismos: [
        {
          titulo: 'AINEs não seletivos',
          texto:
            'Inibem de forma reversível e competitiva tanto a COX-1 quanto a COX-2, ocupando o canal hidrofóbico por onde entra o ácido araquidônico. A redução de PGE2 e PGI2 diminui vasodilatação, edema, sensibilização de nociceptores e febre. A inibição concomitante da COX-1 é responsável pela lesão gastrointestinal e pelo efeito antiplaquetário reversível. Diferem entre si principalmente em meia-vida (ibuprofeno e cetoprofeno curtas; naproxeno longa) e em perfil de risco: cetoprofeno com risco gastrointestinal maior; diclofenaco com risco cardiovascular e hepático maiores.',
        },
        {
          titulo: 'AINEs preferenciais para COX-2',
          texto:
            'Nimesulida (sulfonanilida) e meloxicam (oxicam) inibem mais a COX-2 do que a COX-1 nas doses usuais, mas a seletividade é parcial e diminui com doses maiores. Na prática, o risco gastrointestinal é intermediário entre os não seletivos e os coxibes. A nimesulida tem risco de hepatotoxicidade que justificou restrição de uso em diversos países; o meloxicam permite dose única diária.',
        },
        {
          titulo: 'Coxibes',
          texto:
            'O celecoxibe tem uma cadeia lateral que se encaixa no bolso lateral do sítio ativo da COX-2, ausente na COX-1, o que confere seletividade. Reduz úlceras e sangramento digestivo em relação aos não seletivos e não interfere na agregação plaquetária. Em contrapartida, ao reduzir a prostaciclina endotelial (COX-2) sem bloquear o tromboxano plaquetário (COX-1), aumenta o risco de eventos trombóticos; mantém os efeitos renais (edema, hipertensão, lesão renal) comuns a todos os AINEs.',
        },
        {
          titulo: 'Ácido acetilsalicílico',
          texto:
            'Acetila de forma covalente uma serina do sítio ativo da COX-1 (Ser530) e da COX-2, bloqueando-as irreversivelmente. Como a plaqueta não tem núcleo, não ressintetiza COX-1: uma dose baixa diária suprime o tromboxano A2 por toda a vida da plaqueta (7–10 dias), enquanto o endotélio regenera a enzima e preserva a prostaciclina — base da prevenção cardiovascular. Em doses altas tem ação anti-inflamatória, limitada pela toxicidade (zumbido, sangramento, salicilismo).',
        },
        {
          titulo: 'Glicocorticoides sistêmicos',
          texto:
            'Atravessam a membrana e ligam-se ao receptor glicocorticoide citoplasmático, que se dissocia de proteínas de choque térmico e migra para o núcleo. Por transrepressão, inibem fatores de transcrição como NF-κB e AP-1, reduzindo citocinas (IL-1, IL-6, TNF-α), COX-2, iNOS e moléculas de adesão; por transativação, induzem anexina-1 (que inibe a fosfolipase A2), MKP-1 e IκB. Assim bloqueiam a produção de prostaglandinas e leucotrienos a montante, reduzem a migração de leucócitos e suprimem a imunidade celular. Os efeitos metabólicos (gliconeogênese, catabolismo proteico, redistribuição de gordura) e o efeito mineralocorticoide de alguns compostos explicam os efeitos adversos.',
        },
      ],
      fluxogramas: [
        {
          titulo: 'Cascata do ácido araquidônico e pontos de bloqueio',
          passos: [
            'Fosfolipídios de membrana',
            'Fosfolipase A2 (← glicocorticoides, via anexina-1 e repressão gênica)',
            'Ácido araquidônico',
            'Via COX-1/COX-2 (← AINEs não seletivos, preferenciais COX-2, coxibes; ← AAS de forma irreversível) → PGH2 → PGE2, PGI2, TXA2',
            'Via 5-lipoxigenase → leucotrienos (não bloqueada por AINEs; desvio pode desencadear broncoespasmo em asmáticos sensíveis)',
            'Efeitos: dor, febre, edema e vasodilatação (PGE2/PGI2); agregação plaquetária e vasoconstrição (TXA2)',
          ],
        },
        {
          titulo: 'Balança tromboxano/prostaciclina',
          passos: [
            'Plaqueta: COX-1 → tromboxano A2 (pró-agregante, vasoconstritor)',
            'Endotélio: COX-2 (e COX-1) → prostaciclina PGI2 (antiagregante, vasodilatadora)',
            'AAS dose baixa: bloqueia TXA2 irreversivelmente; endotélio regenera COX → efeito antitrombótico',
            'Coxibes (e diclofenaco): reduzem PGI2 sem bloquear TXA2 → balança pende para trombose → risco de IAM/AVC',
          ],
        },
        {
          titulo: 'Eixo hipotálamo-hipófise-adrenal e corticoterapia',
          passos: [
            'Hipotálamo libera CRH',
            'Hipófise libera ACTH',
            'Córtex adrenal produz cortisol',
            'Cortisol exerce retroalimentação negativa sobre hipotálamo e hipófise',
            'Corticoide exógeno prolongado → supressão de CRH/ACTH → atrofia adrenal',
            'Suspensão abrupta → insuficiência adrenal aguda → por isso a retirada deve ser gradual',
          ],
        },
      ],
      eaFrequentes: [
        { efeito: 'Dispepsia, epigastralgia', classes: 'Todos os AINEs (menos com coxibes)', mecanismo: 'Redução das prostaglandinas citoprotetoras gástricas (COX-1) e irritação local' },
        { efeito: 'Edema, retenção de sódio e aumento da pressão arterial', classes: 'Todos os AINEs, incluindo coxibes', mecanismo: 'Inibição das prostaglandinas renais (COX-1 e COX-2) que favorecem natriurese e fluxo renal' },
        { efeito: 'Hiperglicemia', classes: 'Glicocorticoides', mecanismo: '↑ gliconeogênese hepática e resistência periférica à insulina' },
        { efeito: 'Insônia, euforia, alteração de humor', classes: 'Glicocorticoides' },
        { efeito: 'Aumento de apetite e ganho de peso', classes: 'Glicocorticoides' },
        { efeito: 'Zumbido', classes: 'AAS em doses altas (salicilismo)' },
        { efeito: 'Fotossensibilidade', classes: 'Cetoprofeno tópico' },
      ],
      eaGraves: [
        { efeito: 'Úlcera péptica e sangramento gastrointestinal', classes: 'AINEs não seletivos e AAS (maior risco); preferenciais intermediário; coxibes menor', mecanismo: 'Perda da citoproteção mediada por prostaglandinas + efeito antiplaquetário' },
        { efeito: 'Eventos cardiovasculares trombóticos (IAM, AVC)', classes: 'Coxibes, diclofenaco e AINEs em doses altas (naproxeno relativamente mais neutro); não se aplica ao AAS', mecanismo: 'Desequilíbrio prostaciclina/tromboxano' },
        { efeito: 'Lesão renal aguda', classes: 'Todos os AINEs', mecanismo: 'Vasoconstrição da arteríola aferente por perda de prostaglandinas renais, sobretudo em hipovolemia, IC, cirrose e com IECA/BRA + diurético' },
        { efeito: 'Hepatotoxicidade', classes: 'Nimesulida, diclofenaco', mecanismo: 'Reação idiossincrásica' },
        { efeito: 'Broncoespasmo (doença respiratória exacerbada por AAS)', classes: 'AAS e AINEs que inibem COX-1', mecanismo: 'Desvio do ácido araquidônico para a via da lipoxigenase → excesso de leucotrienos' },
        { efeito: 'Síndrome de Cushing iatrogênica', classes: 'Glicocorticoides (uso prolongado)' },
        { efeito: 'Supressão do eixo HHA / insuficiência adrenal na retirada', classes: 'Glicocorticoides, maior com os de ação longa (dexametasona)', mecanismo: 'Retroalimentação negativa sobre CRH e ACTH' },
        { efeito: 'Osteoporose, miopatia, infecções, glaucoma, catarata', classes: 'Glicocorticoides (uso crônico)' },
        { efeito: 'Hipocalemia e retenção de sódio', classes: 'Hidrocortisona (e, em menor grau, prednisona/prednisolona)', mecanismo: 'Ativação do receptor mineralocorticoide renal' },
      ],
      primeirasLinhas: [
        { condicao: 'Osteoartrite com dor persistente', recomendacao: 'AINE tópico para joelho e mão; AINE oral na menor dose e pelo menor tempo quando necessário', observacao: 'Associar IBP em idosos ou risco gastrointestinal; paracetamol tem benefício pequeno', fonte: 'ACR/Arthritis Foundation 2019; OARSI 2019' },
        { condicao: 'Paciente com alto risco gastrointestinal que precisa de AINE', recomendacao: 'Coxibe ou AINE não seletivo + IBP; coxibe + IBP se risco muito alto', observacao: 'Evitar se houver alto risco cardiovascular concomitante', fonte: 'Lanza FL et al. ACG Guidelines 2009; Bhala et al. Lancet 2013' },
        { condicao: 'Paciente com alto risco cardiovascular que precisa de AINE', recomendacao: 'Evitar coxibes e diclofenaco; naproxeno em dose baixa pelo menor tempo é a opção menos desfavorável', observacao: 'Considerar alternativas não AINE', fonte: 'FDA 2015; CNT Collaboration, Lancet 2013' },
        { condicao: 'Crise aguda de gota', recomendacao: 'AINE em dose plena, colchicina em baixa dose ou corticoide (oral ou intra-articular)', observacao: 'Corticoide é alternativa quando AINE está contraindicado (doença renal, úlcera)', fonte: 'ACR Gout Guideline 2020' },
        { condicao: 'Prevenção secundária cardiovascular', recomendacao: 'AAS em dose baixa (75–100 mg/dia)', observacao: 'Na prevenção primária, uso individualizado pelo risco de sangramento', fonte: 'ESC 2023 / ESC 2024 Chronic Coronary Syndromes; USPSTF 2022' },
        { condicao: 'Exacerbação de asma', recomendacao: 'Corticoide sistêmico oral curto (prednisona/prednisolona) junto ao broncodilatador', fonte: 'GINA 2024' },
        { condicao: 'Insuficiência adrenal (reposição) e crise adrenal', recomendacao: 'Hidrocortisona (efeito glicocorticoide e mineralocorticoide)', observacao: 'Na doença de Addison associar fludrocortisona', fonte: 'Endocrine Society 2016' },
        { condicao: 'Edema cerebral peritumoral', recomendacao: 'Dexametasona', observacao: 'Alta potência, sem retenção de sódio', fonte: 'Goodman & Gilman 14ª ed.; Katzung 15ª ed.' },
        { condicao: 'COVID-19 com necessidade de oxigênio', recomendacao: 'Dexametasona 6 mg/dia por até 10 dias', fonte: 'RECOVERY, NEJM 2021; OMS — diretriz de terapêutica para COVID-19' },
      ],
      contraindicacoes: [
        'AINEs: úlcera péptica ativa/sangramento, insuficiência renal, hepática ou cardíaca grave, asma induzida por AINE, terceiro trimestre da gestação',
        'Coxibes e diclofenaco: doença cardiovascular aterosclerótica estabelecida e insuficiência cardíaca',
        'Celecoxibe: alergia a sulfonamidas',
        'Nimesulida: doença hepática, etilismo, menores de 12 anos',
        'AAS: crianças/adolescentes com virose (Reye), distúrbios hemorrágicos, gota (dose baixa)',
        'Glicocorticoides: infecções fúngicas sistêmicas, vacinas vivas em doses imunossupressoras',
      ],
      interacoes: [
        'AINEs + IECA/BRA + diurético ("triple whammy"): lesão renal aguda',
        'AINEs + anticoagulantes, antiagregantes, ISRS ou corticoides: sangramento gastrointestinal',
        'AINEs + lítio ou metotrexato: redução da depuração renal e toxicidade',
        'AINEs: redução do efeito de anti-hipertensivos e diuréticos',
        'Ibuprofeno antes do AAS: bloqueio competitivo da acetilação plaquetária (dar o AAS antes ou espaçar)',
        'Glicocorticoides + indutores do CYP3A4 (rifampicina, fenitoína): redução do efeito',
        'Glicocorticoides + diuréticos espoliadores de potássio, anfotericina B: hipocalemia (risco com digoxina)',
        'Glicocorticoides + antidiabéticos: perda de controle glicêmico',
      ],
      comparacoes: [
        { titulo: 'Não seletivos x preferenciais x coxibes', texto: 'Quanto maior a seletividade para COX-2, menor o risco de úlcera e sangramento gastrointestinal e ausência de efeito antiplaquetário — mas maior a tendência trombótica. Todos compartilham os efeitos renais (edema, hipertensão, lesão renal), porque a COX-2 também é constitutiva no rim.' },
        { titulo: 'AAS x demais AINEs', texto: 'O AAS inibe a COX de forma irreversível (acetilação), enquanto os demais AINEs inibem de forma reversível. Por isso só o AAS em dose baixa protege contra eventos cardiovasculares; os outros AINEs não têm esse efeito e alguns aumentam o risco trombótico.' },
        { titulo: 'Ibuprofeno x naproxeno x diclofenaco x cetoprofeno', texto: 'Ibuprofeno: meia-vida curta, menor risco gastrointestinal em dose baixa. Naproxeno: meia-vida longa, perfil cardiovascular relativamente mais neutro, risco gastrointestinal moderado a alto. Diclofenaco: potente, preferência por COX-2, maior risco cardiovascular e hepático. Cetoprofeno: entre os de maior risco gastrointestinal; gel associado a fotoalergia.' },
        { titulo: 'Nimesulida x meloxicam', texto: 'Ambos preferenciais para COX-2. A nimesulida é usada em quadros agudos de curta duração e tem hepatotoxicidade característica; o meloxicam, de meia-vida longa, é usado em doenças reumáticas crônicas em dose única diária.' },
        { titulo: 'AINEs x glicocorticoides', texto: 'AINEs bloqueiam apenas a via das COX; glicocorticoides inibem a fosfolipase A2 e a expressão de múltiplos genes inflamatórios, reduzindo prostaglandinas, leucotrienos e citocinas, com ação imunossupressora. Glicocorticoides não são analgésicos nem antitérmicos diretos, e seus efeitos adversos são metabólicos e endócrinos, não gástricos isoladamente.' },
        { titulo: 'Hidrocortisona x prednisona/prednisolona x dexametasona', texto: 'Hidrocortisona: potência 1, efeito mineralocorticoide pleno, ação curta (8–12 h) — reposição adrenal e emergências. Prednisona/prednisolona: potência 4, mineralocorticoide reduzido, ação intermediária (12–36 h) — corticoterapia oral de rotina (prednisona é pró-fármaco; prednisolona é ativa). Dexametasona: potência 25–30, sem efeito mineralocorticoide, ação longa (36–72 h) — edema cerebral, antiemese, maior supressão do eixo.' },
      ],
      memorizar: [
        'COX-1 constitutiva (estômago, rim, plaqueta); COX-2 induzida na inflamação (mas constitutiva no rim e endotélio).',
        'AINEs não seletivos: ibuprofeno, naproxeno, cetoprofeno (propiônicos) e diclofenaco (acético).',
        'Preferenciais COX-2: nimesulida e meloxicam — seletividade parcial e dose-dependente.',
        'Coxibe (celecoxibe): menos úlcera, sem efeito antiplaquetário, mais risco trombótico.',
        'AAS: único inibidor irreversível da COX; 75–100 mg/dia = antiagregante por 7–10 dias (vida da plaqueta).',
        'Ibuprofeno antes do AAS pode anular o efeito antiplaquetário do AAS.',
        'Todos os AINEs: risco renal, edema e aumento da pressão arterial — cuidado com IECA/BRA + diurético.',
        'AINE em asmático sensível: desvio para leucotrienos → broncoespasmo.',
        'Nimesulida: hepatotoxicidade; diclofenaco: risco cardiovascular e hepático.',
        'Evitar AINEs no terceiro trimestre: fechamento precoce do canal arterial e oligoidrâmnio.',
        'Glicocorticoides inibem a fosfolipase A2 (anexina-1) e reprimem NF-κB/AP-1.',
        'Potência anti-inflamatória: hidrocortisona 1 < prednisona/prednisolona 4 < dexametasona 25–30.',
        'Hidrocortisona tem efeito mineralocorticoide (escolha na insuficiência adrenal); dexametasona praticamente não tem.',
        'Prednisona é pró-fármaco ativado no fígado em prednisolona.',
        'Corticoide por mais de 2–3 semanas: retirada gradual para evitar insuficiência adrenal.',
      ],
      fontes: [
        REF_GG,
        REF_KATZUNG,
        REF_RANG,
        REF_FTN,
        'Bhala N et al. (CNT Collaboration). Vascular and upper gastrointestinal effects of non-steroidal anti-inflammatory drugs. Lancet 2013;382:769-79.',
        'Nissen SE et al. Cardiovascular safety of celecoxib, naproxen, or ibuprofen for arthritis (PRECISION). N Engl J Med 2016;375:2519-29.',
        'Kolasinski SL et al. 2019 ACR/Arthritis Foundation Guideline for the Management of Osteoarthritis. Arthritis Rheumatol 2020;72:220-33.',
        'FitzGerald JD et al. 2020 ACR Guideline for the Management of Gout. Arthritis Care Res 2020;72:744-60.',
        'Bornstein SR et al. Primary Adrenal Insufficiency: Endocrine Society Guideline. J Clin Endocrinol Metab 2016;101:364-89.',
        'GINA — Global Strategy for Asthma Management and Prevention, 2024.',
        'RECOVERY Collaborative Group. Dexamethasone in hospitalized patients with Covid-19. N Engl J Med 2021;384:693-704.',
        'EMA/PRAC. Diclofenac — cardiovascular risk (2013); EMA/CHMP. Nimesulide (2012).',
      ],
      dataRevisao: REV,
    },
  ],
};

export default dados;
