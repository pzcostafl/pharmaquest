// =====================================================================
// PharmaQuest — módulo: anti-hipertensivos + hipolipemiantes
// Módulo-piloto (caso de teste principal: enalapril).
// Conteúdo educacional redigido a partir de referências-padrão; aguarda revisão docente.
// =====================================================================
import type { ModuloDados, NomeComercial, Termo, Classe, Medicamento, ResumoGrupo } from '../types';

const DATA = '10/nov/2026';
const VAL = 'revisado_referencias' as const;

// ---------- helpers ----------
const T = (termo: string, ...sinonimos: string[]): Termo => ({ termo, sinonimos });
const ref = (nome: string, fabricante?: string, obs?: string): NomeComercial => ({
  nome, tipo: 'referencia', verificacao: 'pendente_anvisa',
  ...(fabricante ? { fabricante } : {}), ...(obs ? { obs } : {}),
});
const marca = (nome: string, fabricante?: string, obs?: string): NomeComercial => ({
  nome, tipo: 'marca', verificacao: 'pendente_anvisa',
  ...(fabricante ? { fabricante } : {}), ...(obs ? { obs } : {}),
});
const combo = (nome: string, composicao: string, fabricante?: string, obs?: string): NomeComercial => ({
  nome, tipo: 'combinacao', composicao, verificacao: 'pendente_anvisa',
  ...(fabricante ? { fabricante } : {}), ...(obs ? { obs } : {}),
});

// ---------- referências ----------
const R_GG = 'Brunton LL, Knollmann BC (eds). Goodman & Gilman: As Bases Farmacológicas da Terapêutica. 14ª ed. 2023.';
const R_KATZ = 'Katzung BG, Vanderah TW. Farmacologia Básica e Clínica. 15ª ed. 2021.';
const R_RANG = 'Rang HP, Dale MM et al. Rang & Dale Farmacologia. 9ª ed. 2020.';
const R_DBHA = 'Barroso WKS et al. Diretrizes Brasileiras de Hipertensão Arterial – 2020. Arq Bras Cardiol. 2021;116(3):516-658 (SBC/SBH/SBN).';
const R_DIC = 'Marcondes-Braga FG et al. Atualização de Tópicos Emergentes da Diretriz Brasileira de Insuficiência Cardíaca – 2021. Arq Bras Cardiol. 2021;116(6):1174-1212.';
const R_FTN = 'Ministério da Saúde. Formulário Terapêutico Nacional / RENAME (edição vigente).';
const R_DISLIP = 'Faludi AA et al. Atualização da Diretriz Brasileira de Dislipidemias e Prevenção da Aterosclerose – 2017. Arq Bras Cardiol. 2017;109(2 Supl 1):1-76.';
const R_ESC = 'Mach F et al. 2019 ESC/EAS Guidelines for the management of dyslipidaemias. Eur Heart J. 2020;41(1):111-188.';
const R_BULA = (s: string) => `Bula do medicamento de referência / informação de prescrição (${s}).`;

const RH = [R_GG, R_KATZ, R_RANG, R_DBHA];
const RL = [R_GG, R_KATZ, R_DISLIP, R_ESC];

// ---------- termos (efeitos adversos) ----------
const TOSSE = T('Tosse seca', 'tosse', 'tosse irritativa', 'tosse persistente', 'tosse nao produtiva', 'dry cough', 'tosse por bradicinina');
const ANGIOEDEMA = T('Angioedema', 'edema angioneurotico', 'edema de glote', 'edema de labios e lingua', 'inchaco da boca e face', 'angioedema bradicininergico');
const HIPERK = T('Hipercalemia', 'hiperpotassemia', 'potassio alto', 'aumento do potassio', 'hiperkalemia', 'hyperkalemia');
const HIPOK = T('Hipocalemia', 'hipopotassemia', 'potassio baixo', 'queda do potassio', 'perda de potassio', 'hipokalemia', 'hypokalemia');
const HIPONA = T('Hiponatremia', 'sodio baixo', 'queda do sodio', 'hyponatremia');
const HIPOTENSAO = T('Hipotensão sintomática', 'hipotensao', 'pressao baixa', 'queda da pressao', 'hipotensao de primeira dose');
const HIPOT_ORTO = T('Hipotensão ortostática', 'hipotensao postural', 'tontura ao levantar', 'queda de pressao ao levantar');
const TONTURA = T('Tontura', 'vertigem', 'tonteira', 'dizziness');
const RENAL = T('Piora da função renal', 'insuficiencia renal aguda', 'lesao renal aguda', 'elevacao da creatinina', 'aumento da creatinina', 'queda da filtracao glomerular');
const FETO = T('Fetotoxicidade', 'toxicidade fetal', 'embriopatia', 'oligoidramnio', 'malformacao fetal', 'teratogenicidade', 'dano ao feto');
const CEFALEIA = T('Cefaleia', 'dor de cabeca', 'headache');
const RUBOR = T('Rubor facial', 'flushing', 'vermelhidao no rosto', 'calor no rosto');
const EDEMA = T('Edema maleolar', 'edema de tornozelo', 'edema periferico', 'inchaco nas pernas', 'inchaco nos pes', 'edema de membros inferiores');
const TAQUI = T('Taquicardia reflexa', 'taquicardia', 'palpitacoes', 'aumento da frequencia cardiaca', 'taquicardia compensatoria');
const GENGIVA = T('Hiperplasia gengival', 'crescimento gengival', 'hipertrofia gengival', 'gengiva aumentada');
const BRADI = T('Bradicardia', 'frequencia cardiaca baixa', 'coracao lento', 'bradycardia', 'pulso baixo');
const FADIGA = T('Fadiga', 'cansaco', 'astenia', 'fraqueza');
const EXTREM = T('Extremidades frias', 'maos e pes frios', 'frieza nas extremidades', 'piora do fenomeno de Raynaud');
const BAV = T('Bloqueio atrioventricular', 'BAV', 'bloqueio AV', 'bloqueio cardiaco');
const BRONCO = T('Broncoespasmo', 'broncoconstricao', 'crise de asma', 'chiado no peito', 'bronchospasm', 'broncoespasmo por bloqueio beta 2');
const HIPOGLI = T('Mascaramento de hipoglicemia', 'mascara sintomas de hipoglicemia', 'hipoglicemia mascarada', 'hipoglicemia sem sintomas adrenergicos');
const REBOTE_BB = T('Efeito rebote na suspensão abrupta', 'rebote', 'angina de rebote', 'taquicardia de rebote', 'sindrome de retirada');
const DISF_ERET = T('Disfunção erétil', 'impotencia', 'disfuncao sexual', 'diminuicao da libido');
const PESADELO = T('Distúrbios do sono e pesadelos', 'pesadelos', 'insonia', 'sonhos vividos', 'alteracao do sono');
const HIPERURIC = T('Hiperuricemia', 'acido urico alto', 'aumento do acido urico', 'gota', 'crise de gota');
const HIPERGLI = T('Hiperglicemia', 'glicose alta', 'intolerancia a glicose', 'piora do controle glicemico');
const HIPOMG = T('Hipomagnesemia', 'magnesio baixo', 'queda do magnesio');
const HIPERCA = T('Hipercalcemia', 'calcio alto', 'aumento do calcio');
const DISLIP_T = T('Elevação de colesterol e triglicerídeos', 'dislipidemia', 'aumento de triglicerideos', 'aumento do colesterol');
const FOTO = T('Fotossensibilidade', 'sensibilidade ao sol', 'reacao fototoxica', 'fotossensibilizacao');
const OTOTOX = T('Ototoxicidade', 'surdez', 'perda auditiva', 'zumbido', 'tinnitus', 'lesao auditiva', 'hipoacusia');
const DESIDR = T('Desidratação e hipovolemia', 'desidratacao', 'hipovolemia', 'deplecao de volume', 'perda excessiva de liquido');
const ALCALOSE = T('Alcalose metabólica', 'alcalose hipocalemica', 'alcalose de contracao');
const POLIURIA = T('Aumento da diurese', 'poliuria', 'urinar muito', 'diurese aumentada');
const GINECO = T('Ginecomastia', 'aumento das mamas', 'crescimento de mamas em homens', 'mastalgia', 'dor nas mamas', 'gynecomastia');
const MENSTR = T('Irregularidade menstrual', 'alteracao menstrual', 'sangramento irregular', 'amenorreia');
const SEDA = T('Sedação', 'sonolencia', 'sono', 'sedacao', 'letargia');
const BOCA = T('Boca seca', 'xerostomia', 'secura na boca');
const REBOTE_CLON = T('Hipertensão rebote na suspensão abrupta', 'rebote', 'hipertensao de rebote', 'crise hipertensiva de rebote', 'efeito rebote', 'sindrome de retirada');
const HEMOL = T('Anemia hemolítica autoimune', 'anemia hemolitica', 'hemolise', 'Coombs positivo', 'teste de Coombs positivo', 'anemia hemolitica imune');
const HEPATO = T('Hepatotoxicidade', 'hepatite', 'hepatite medicamentosa', 'lesao hepatica', 'toxicidade hepatica');
const HIPERPRL = T('Hiperprolactinemia', 'prolactina alta', 'galactorreia', 'aumento da prolactina');
const LUPUS = T('Síndrome lúpus-like', 'lupus induzido por droga', 'lupus medicamentoso', 'lupus-like', 'lupus induzido', 'lupus farmacologico');
const RETENCAO = T('Retenção de sódio e água', 'retencao hidrica', 'retencao de liquidos', 'edema por retencao de sodio');
const ANGINA = T('Precipitação de angina', 'piora da angina', 'dor no peito', 'isquemia miocardica');
const DISGEUSIA = T('Disgeusia', 'alteracao do paladar', 'perda do paladar', 'gosto metalico', 'ageusia');
const RASH = T('Exantema cutâneo', 'rash', 'erupcao cutanea', 'manchas na pele', 'urticaria');
const NEUTRO = T('Neutropenia/agranulocitose', 'agranulocitose', 'neutropenia', 'queda dos neutrofilos', 'leucopenia');
const PROTEIN = T('Proteinúria', 'proteina na urina', 'proteinuria');
const ESPRU = T('Enteropatia espru-símile', 'enteropatia semelhante a doenca celiaca', 'sprue-like enteropathy', 'diarreia cronica grave com perda de peso', 'enteropatia por olmesartana', 'enteropatia');
const MIALGIA = T('Mialgia', 'dor muscular', 'dores musculares', 'myalgia', 'sintomas musculares');
const RABDO = T('Miopatia e rabdomiólise', 'rabdomiolise', 'miopatia', 'miosite', 'lesao muscular', 'CK elevada', 'rhabdomyolysis', 'urina escura por mioglobina');
const TRANSAM = T('Elevação de transaminases', 'aumento de TGO/TGP', 'aumento de ALT', 'aumento de AST', 'transaminases altas', 'enzimas hepaticas elevadas');
const DM_ESTAT = T('Aumento do risco de diabetes', 'diabetes de inicio recente', 'novo diabetes', 'hiperglicemia', 'aumento da glicemia');
const COLELIT = T('Colelitíase', 'calculo biliar', 'pedra na vesicula', 'litiase biliar', 'colecistite');
const DIARREIA = T('Diarreia', 'fezes amolecidas', 'diarreia leve');
const DOR_ABD = T('Dor abdominal', 'desconforto abdominal', 'dispepsia', 'dor de barriga');
const ARTRALGIA = T('Artralgia', 'dor articular', 'dor nas juntas');
const DISPEPSIA = T('Distúrbios gastrointestinais', 'nauseas', 'dispepsia', 'flatulencia', 'desconforto gastrico');
const CREAT = T('Elevação reversível da creatinina', 'aumento da creatinina', 'creatinina alta');
const PANCREAT = T('Pancreatite', 'inflamacao do pancreas');
const TEV = T('Tromboembolismo venoso', 'trombose venosa profunda', 'embolia pulmonar', 'TVP');
const INJ = T('Reação no local da injeção', 'reacao no local de aplicacao', 'dor no local da injecao', 'vermelhidao no local da aplicacao', 'eritema no local da injecao');
const NASOF = T('Nasofaringite', 'resfriado', 'infeccao de vias aereas superiores', 'gripe', 'dor de garganta');
const HIPERS = T('Reação de hipersensibilidade', 'alergia', 'reacao alergica', 'urticaria', 'anafilaxia');
const TENDAO = T('Ruptura de tendão', 'tendinite', 'lesao de tendao', 'ruptura tendinea');
const ANEMIA = T('Anemia', 'queda da hemoglobina', 'hemoglobina baixa');

// ---------- distratores reutilizáveis ----------
const D_GENG = 'Hiperplasia gengival';
const D_EDEMA = 'Edema maleolar por vasodilatação arteriolar';
const D_BRONCO = 'Broncoespasmo por bloqueio β2';
const D_TOSSE = 'Tosse seca por acúmulo de bradicinina';
const D_GINECO = 'Ginecomastia por antagonismo androgênico';
const D_OTO = 'Ototoxicidade';
const D_LUPUS = 'Síndrome lúpus-like';
const D_FLUSH = 'Rubor cutâneo (flushing) mediado por prostaglandinas';
const D_HIPOK = 'Hipocalemia';
const D_HIPERK = 'Hipercalemia';
const D_REBOTE = 'Hipertensão rebote na suspensão abrupta';
const D_HEMOL = 'Anemia hemolítica autoimune (Coombs positivo)';
const D_COLELIT = 'Colelitíase';
const D_MIOP = 'Miopatia e rabdomiólise';

// =====================================================================
// CLASSES
// =====================================================================
const classes: Classe[] = [
  // ---- anti-hipertensivos ----
  {
    id: 'ieca', nome: 'Inibidores da enzima conversora de angiotensina', sigla: 'IECA', grupoId: 'antihipertensivos',
    familia: 'Bloqueadores do sistema renina-angiotensina-aldosterona',
    mecanismoCurto: 'Inibem a ECA, reduzindo a formação de angiotensina II e a degradação de bradicinina; causam vasodilatação e menor secreção de aldosterona.',
    sinonimos: ['IECA', 'IECAs', 'inibidor da ECA', 'inibidores da ECA', 'inibidor da enzima conversora de angiotensina', 'inibidor da enzima conversora', 'ACE inhibitor', 'ACEi', 'ACE-I', 'inibidor da enzima conversora da angiotensina'],
  },
  {
    id: 'bra', nome: 'Bloqueadores dos receptores AT1 da angiotensina II', sigla: 'BRA', grupoId: 'antihipertensivos',
    familia: 'Bloqueadores do sistema renina-angiotensina-aldosterona',
    mecanismoCurto: 'Bloqueiam seletivamente o receptor AT1, impedindo a vasoconstrição e a liberação de aldosterona mediadas pela angiotensina II, sem interferir na bradicinina.',
    sinonimos: ['BRA', 'BRAs', 'bloqueador do receptor de angiotensina', 'bloqueadores dos receptores da angiotensina', 'antagonista do receptor de angiotensina II', 'antagonista AT1', 'bloqueador AT1', 'sartana', 'sartanas', 'ARB', 'ARA II', 'ARA-II', 'angiotensin receptor blocker'],
  },
  {
    id: 'inibidor-renina', nome: 'Inibidores diretos da renina', grupoId: 'antihipertensivos',
    familia: 'Bloqueadores do sistema renina-angiotensina-aldosterona',
    mecanismoCurto: 'Inibem diretamente a renina, bloqueando a conversão de angiotensinogênio em angiotensina I (ex.: alisquireno).',
    sinonimos: ['inibidor direto da renina', 'inibidor da renina', 'alisquireno', 'direct renin inhibitor'],
  },
  {
    id: 'bcc', nome: 'Bloqueadores dos canais de cálcio', sigla: 'BCC', grupoId: 'antihipertensivos',
    mecanismoCurto: 'Bloqueiam canais de cálcio tipo L; os diidropiridínicos agem sobretudo no músculo liso arteriolar, causando vasodilatação e queda da resistência periférica.',
    sinonimos: ['BCC', 'bloqueador de canal de calcio', 'bloqueadores dos canais de calcio', 'antagonista de calcio', 'antagonistas dos canais de calcio', 'bloqueador de calcio', 'calcium channel blocker', 'CCB', 'diidropiridinico', 'diidropiridina', 'dihidropiridinico', 'bloqueador de canal de calcio tipo L'],
  },
  {
    id: 'betabloqueador', nome: 'Antagonistas dos receptores β-adrenérgicos', sigla: 'BB', grupoId: 'antihipertensivos',
    mecanismoCurto: 'Bloqueiam receptores β1 (e, nos não seletivos, β2), reduzindo frequência cardíaca, contratilidade, débito cardíaco e liberação renal de renina.',
    sinonimos: ['betabloqueador', 'betabloqueadores', 'beta bloqueador', 'beta-bloqueador', 'bloqueador beta', 'bloqueador beta-adrenergico', 'antagonista beta-adrenergico', 'antagonista beta', 'BB', 'beta blocker', 'beta-blocker'],
  },
  {
    id: 'diuretico-tiazidico', nome: 'Diuréticos tiazídicos e tiazídicos-símiles', grupoId: 'antihipertensivos',
    familia: 'Diuréticos',
    mecanismoCurto: 'Inibem o cotransportador Na+/Cl− (NCC) do túbulo contorcido distal, aumentando a natriurese; a longo prazo reduzem a resistência vascular periférica.',
    sinonimos: ['tiazidico', 'tiazidicos', 'diuretico tiazidico', 'diureticos tiazidicos', 'tiazidico-simile', 'tiazidicos-similes', 'tiazida', 'tiazidas', 'thiazide', 'thiazide-like', 'semelhante a tiazidico', 'inibidor do cotransportador Na-Cl', 'inibidor do NCC'],
  },
  {
    id: 'diuretico-alca', nome: 'Diuréticos de alça', grupoId: 'antihipertensivos',
    familia: 'Diuréticos',
    mecanismoCurto: 'Inibem o cotransportador Na+/K+/2Cl− (NKCC2) no ramo ascendente espesso da alça de Henle; são os diuréticos de maior potência natriurética.',
    sinonimos: ['diuretico de alca', 'diureticos de alca', 'diuretico de alca de Henle', 'loop diuretic', 'inibidor do NKCC2', 'inibidor do cotransportador Na-K-2Cl', 'diuretico de teto alto'],
  },
  {
    id: 'diuretico-poupador-potassio', nome: 'Diuréticos poupadores de potássio (antagonistas mineralocorticoides)', sigla: 'ARM', grupoId: 'antihipertensivos',
    familia: 'Diuréticos',
    mecanismoCurto: 'Antagonizam competitivamente o receptor mineralocorticoide no néfron distal/ducto coletor, reduzindo a reabsorção de Na+ e a secreção de K+ induzidas pela aldosterona.',
    sinonimos: ['poupador de potassio', 'poupadores de potassio', 'diuretico poupador de potassio', 'antagonista da aldosterona', 'antialdosteronico', 'antagonista mineralocorticoide', 'antagonista do receptor mineralocorticoide', 'ARM', 'MRA', 'potassium-sparing diuretic', 'bloqueador da aldosterona'],
  },
  {
    id: 'simpatolitico-central', nome: 'Simpatolíticos de ação central (agonistas α2-adrenérgicos)', grupoId: 'antihipertensivos',
    mecanismoCurto: 'Estimulam receptores α2 pré-sinápticos/centrais no tronco encefálico, reduzindo o tônus simpático eferente, a resistência periférica e a frequência cardíaca.',
    sinonimos: ['simpatolitico central', 'simpatoliticos de acao central', 'agonista alfa 2', 'agonista alfa-2', 'agonista alfa-2 adrenergico', 'agonista alfa2 central', 'alfa-2 agonista', 'anti-hipertensivo de acao central', 'central alpha-2 agonist', 'inibidor adrenergico central'],
  },
  {
    id: 'vasodilatador-direto', nome: 'Vasodilatadores diretos', grupoId: 'antihipertensivos',
    mecanismoCurto: 'Relaxam diretamente o músculo liso arteriolar, reduzindo a resistência vascular periférica; ativam reflexos compensatórios (taquicardia e retenção de sódio).',
    sinonimos: ['vasodilatador direto', 'vasodilatadores diretos', 'vasodilatador arteriolar', 'vasodilatador arteriolar direto', 'direct vasodilator', 'vasodilatador'],
  },
  {
    id: 'alfabloqueador', nome: 'Bloqueadores α1-adrenérgicos', grupoId: 'antihipertensivos',
    mecanismoCurto: 'Bloqueiam receptores α1 pós-sinápticos vasculares, causando vasodilatação arterial e venosa (ex.: doxazosina, prazosina).',
    sinonimos: ['alfabloqueador', 'alfa bloqueador', 'bloqueador alfa 1', 'antagonista alfa-1', 'alpha blocker', 'bloqueador alfa-adrenergico'],
  },
  // ---- hipolipemiantes ----
  {
    id: 'estatina', nome: 'Inibidores da HMG-CoA redutase (estatinas)', grupoId: 'hipolipemiantes',
    mecanismoCurto: 'Inibem competitivamente a HMG-CoA redutase, etapa limitante da síntese hepática de colesterol, levando ao aumento dos receptores de LDL e à queda do LDL-c plasmático.',
    sinonimos: ['estatina', 'estatinas', 'inibidor da HMG-CoA redutase', 'inibidores da HMG-CoA redutase', 'inibidor da hidroximetilglutaril-CoA redutase', 'statin', 'statins', 'HMG-CoA reductase inhibitor', 'vastatina'],
  },
  {
    id: 'inibidor-absorcao-colesterol', nome: 'Inibidores da absorção intestinal de colesterol (NPC1L1)', grupoId: 'hipolipemiantes',
    mecanismoCurto: 'Bloqueiam a proteína NPC1L1 da borda em escova do enterócito, reduzindo a absorção de colesterol da dieta e da bile.',
    sinonimos: ['inibidor da absorcao de colesterol', 'inibidor da absorcao intestinal de colesterol', 'inibidor da NPC1L1', 'inibidor de NPC1L1', 'cholesterol absorption inhibitor', 'bloqueador da absorcao de colesterol', 'inibidor seletivo da absorcao de colesterol'],
  },
  {
    id: 'fibrato', nome: 'Fibratos (agonistas PPAR-α)', grupoId: 'hipolipemiantes',
    mecanismoCurto: 'Ativam o receptor nuclear PPAR-α, aumentando a lipoproteína lipase e a oxidação de ácidos graxos e reduzindo a apoC-III; diminuem principalmente os triglicerídeos.',
    sinonimos: ['fibrato', 'fibratos', 'agonista PPAR alfa', 'agonista do PPAR-alfa', 'agonista do receptor ativado por proliferador de peroxissomo alfa', 'fibric acid derivative', 'derivado do acido fibrico', 'PPAR-alpha agonist'],
  },
  {
    id: 'anti-pcsk9-anticorpo', nome: 'Anticorpos monoclonais anti-PCSK9', sigla: 'iPCSK9', grupoId: 'hipolipemiantes',
    familia: 'Terapias dirigidas à PCSK9',
    mecanismoCurto: 'Anticorpos monoclonais que se ligam à PCSK9 circulante, impedindo a degradação lisossomal do receptor de LDL e aumentando a depuração do LDL-c.',
    sinonimos: ['anti-PCSK9', 'inibidor de PCSK9', 'inibidores da PCSK9', 'iPCSK9', 'anticorpo anti-PCSK9', 'anticorpo monoclonal anti-PCSK9', 'PCSK9 inhibitor', 'monoclonal anti-PCSK9', 'anticorpo monoclonal'],
  },
  {
    id: 'sirna-pcsk9', nome: 'RNA de interferência curto (siRNA) anti-PCSK9', grupoId: 'hipolipemiantes',
    familia: 'Terapias dirigidas à PCSK9',
    mecanismoCurto: 'Oligonucleotídeo de dupla fita que, no hepatócito, usa o complexo RISC para degradar o RNA mensageiro da PCSK9, reduzindo sua síntese.',
    sinonimos: ['siRNA', 'siRNA anti-PCSK9', 'RNA de interferencia', 'RNA interferente curto', 'small interfering RNA', 'silenciador genico da PCSK9', 'inibidor da sintese de PCSK9', 'terapia de RNA interferente'],
  },
  {
    id: 'inibidor-acl', nome: 'Inibidores da ATP-citrato liase', grupoId: 'hipolipemiantes',
    mecanismoCurto: 'Pró-fármaco ativado no fígado que inibe a ATP-citrato liase, enzima anterior à HMG-CoA redutase na síntese de colesterol, aumentando os receptores de LDL.',
    sinonimos: ['inibidor da ATP-citrato liase', 'inibidor da ACL', 'inibidor da ATP citrato liase', 'ACL inhibitor', 'ATP citrate lyase inhibitor', 'inibidor da ACLY'],
  },
  {
    id: 'sequestrador-acidos-biliares', nome: 'Sequestradores de ácidos biliares', grupoId: 'hipolipemiantes',
    mecanismoCurto: 'Resinas não absorvíveis que se ligam aos ácidos biliares no intestino, interrompendo a circulação êntero-hepática e forçando o fígado a usar colesterol para sintetizar bile (ex.: colestiramina).',
    sinonimos: ['sequestrador de acidos biliares', 'resina de troca ionica', 'resina sequestrante', 'colestiramina', 'bile acid sequestrant'],
  },
];

// =====================================================================
// MEDICAMENTOS — ANTI-HIPERTENSIVOS
// =====================================================================
const IECA_CI = [
  'Gestação (contraindicado em todos os trimestres; fetotoxicidade no 2º e 3º trimestres)',
  'História de angioedema (hereditário, idiopático ou associado a IECA prévio)',
  'Uso concomitante com alisquireno em diabéticos ou TFG < 60 mL/min/1,73 m²',
  'Uso com sacubitril/valsartana (intervalo mínimo de 36 h)',
  'Estenose bilateral de artérias renais ou estenose em rim único (risco de insuficiência renal aguda)',
];
const IECA_PREC = [
  'Monitorar potássio e creatinina 1–2 semanas após início ou aumento de dose (elevação de até ~30% da creatinina é aceitável)',
  'Hipovolemia/uso de diurético em alta dose: risco de hipotensão de primeira dose',
  'Mulheres em idade fértil: orientar contracepção e suspensão ao planejar ou detectar gravidez',
  'Ajuste de dose na insuficiência renal',
];
const IECA_INT = [
  'Diuréticos poupadores de potássio, suplementos de K+ e sal de potássio: risco de hipercalemia',
  'BRA ou alisquireno (duplo bloqueio do SRAA): mais hipercalemia, hipotensão e lesão renal, sem benefício',
  'AINEs: reduzem o efeito anti-hipertensivo e aumentam risco de lesão renal ("triple whammy" com diurético)',
  'Lítio: aumento dos níveis séricos e da toxicidade',
  'Inibidores da mTOR, sacubitril e inibidores da DPP-4 (gliptinas): aumento do risco de angioedema',
];
const BRA_CI = [
  'Gestação (contraindicado; fetotoxicidade no 2º e 3º trimestres)',
  'Uso concomitante com alisquireno em diabéticos ou TFG < 60 mL/min/1,73 m²',
  'Estenose bilateral de artérias renais ou em rim único',
  'Insuficiência hepática grave/obstrução biliar (para BRA de eliminação biliar)',
];
const BRA_PREC = [
  'Monitorar potássio e creatinina após início ou ajuste de dose',
  'Hipovolemia: corrigir antes de iniciar (risco de hipotensão)',
  'Angioedema prévio com IECA: BRA pode ser usado com cautela (reação cruzada rara)',
  'Mulheres em idade fértil: orientar contracepção',
];
const BRA_INT = [
  'Poupadores de potássio, suplementos de K+ e trimetoprima: hipercalemia',
  'IECA ou alisquireno (duplo bloqueio): contraindicado/desaconselhado',
  'AINEs: atenuação do efeito anti-hipertensivo e risco renal',
  'Lítio: aumento dos níveis séricos',
];
const BB_CI = [
  'Bradicardia sinusal sintomática, BAV de 2º ou 3º grau sem marca-passo, doença do nó sinusal',
  'Choque cardiogênico ou insuficiência cardíaca descompensada',
  'Doença arterial periférica grave',
];
const BB_INT = [
  'Verapamil e diltiazem: bradicardia, BAV e depressão miocárdica aditivos',
  'Amiodarona, digoxina, ivabradina: bradicardia aditiva',
  'Insulina e sulfonilureias: mascaramento dos sinais adrenérgicos de hipoglicemia',
  'Clonidina: suspender o betabloqueador antes da clonidina (risco de crise hipertensiva de rebote)',
  'AINEs: redução do efeito anti-hipertensivo',
];
const TZ_CI = [
  'Anúria',
  'Hipersensibilidade a sulfonamidas (reação cruzada possível)',
  'Hipocalemia refratária, hiponatremia grave ou hipercalcemia',
  'Gota sintomática (contraindicação relativa)',
];
const TZ_INT = [
  'Lítio: redução da depuração renal e toxicidade',
  'Digoxina: hipocalemia aumenta o risco de toxicidade digitálica',
  'Fármacos que prolongam QT: hipocalemia/hipomagnesemia aumentam risco de torsades de pointes',
  'AINEs: redução do efeito diurético e anti-hipertensivo',
  'Corticoides e agonistas β2: hipocalemia aditiva',
];

const medsHAS: Medicamento[] = [
  // ------------------------- IECA -------------------------
  {
    id: 'enalapril', nome: 'Enalapril',
    sinonimos: ['maleato de enalapril', 'enalapril maleate', 'enalaprilat'],
    vinculos: [{
      grupoId: 'antihipertensivos', classeId: 'ieca',
      contexto: 'tratamento da hipertensão arterial e da insuficiência cardíaca com fração de ejeção reduzida',
      explicacaoFase1: 'O enalapril é um anti-hipertensivo de primeira linha, também usado na insuficiência cardíaca com fração de ejeção reduzida e na disfunção ventricular esquerda assintomática, condições em que reduz morbimortalidade.',
    }],
    mecanismo: 'Pró-fármaco hidrolisado no fígado a enalaprilato, que inibe a enzima conversora de angiotensina (ECA). Reduz a formação de angiotensina II (menos vasoconstrição e menos aldosterona) e diminui a degradação da bradicinina, que contribui para a vasodilatação. Reduz pré e pós-carga e atenua o remodelamento cardíaco e a hiperfiltração glomerular.',
    indicacoes: ['Hipertensão arterial sistêmica', 'Insuficiência cardíaca sintomática', 'Disfunção ventricular esquerda assintomática (prevenção de IC)'],
    offLabel: ['Nefropatia diabética/doença renal crônica com albuminúria (nefroproteção — uso consagrado em diretrizes, fora da bula brasileira)'],
    tipoMolecula: 'pequena', pubchem: ['enalapril'],
    nomesComerciais: [
      ref('Renitec', 'MSD'),
      marca('Eupressin', 'Biosintética'),
      marca('Vasopril', 'Biolab Sanus'),
      combo('Co-Renitec', 'enalapril + hidroclorotiazida', 'MSD'),
    ],
    generico: true,
    eaComuns: [TOSSE, TONTURA, HIPOTENSAO, CEFALEIA, FADIGA],
    eaGraves: [ANGIOEDEMA, HIPERK, RENAL, FETO, NEUTRO],
    eaCaracteristico: 'Tosse seca',
    distratoresEA: [D_GENG, D_EDEMA, D_BRONCO, D_HIPOK],
    contraindicacoes: IECA_CI,
    precaucoes: IECA_PREC,
    interacoes: IECA_INT,
    explicacaoFase2: 'O enalapril é um IECA: bloqueia a enzima que converte angiotensina I em angiotensina II. Com menos angiotensina II, os vasos relaxam e a aldosterona cai, reduzindo a pressão arterial.',
    explicacaoFase3: 'A ECA (cininase II) também degrada a bradicinina; inibida, a bradicinina se acumula nas vias aéreas e causa tosse seca persistente, presente em 5–20% dos pacientes. O mesmo acúmulo explica o angioedema, efeito raro porém grave.',
    referencias: [...RH, R_DIC, R_BULA('Renitec — MSD'), R_FTN],
    dataRevisao: DATA, validacao: VAL,
  },
  {
    id: 'captopril', nome: 'Captopril',
    sinonimos: ['captoprilum'],
    vinculos: [{
      grupoId: 'antihipertensivos', classeId: 'ieca',
      contexto: 'tratamento da hipertensão arterial, da insuficiência cardíaca e pós-infarto',
      explicacaoFase1: 'O captopril é um IECA de ação curta usado na hipertensão, na insuficiência cardíaca e na disfunção ventricular pós-infarto; pelo início rápido por via oral, é usado também na urgência hipertensiva.',
    }],
    mecanismo: 'IECA ativo (não é pró-fármaco) que contém grupo sulfidrila. Inibe a conversão de angiotensina I em angiotensina II e a degradação da bradicinina, reduzindo resistência vascular e secreção de aldosterona. Tem meia-vida curta, exigindo 2–3 tomadas diárias.',
    indicacoes: ['Hipertensão arterial sistêmica', 'Insuficiência cardíaca', 'Disfunção ventricular esquerda após infarto agudo do miocárdio', 'Nefropatia diabética (DM tipo 1)'],
    offLabel: ['Teste do captopril na investigação de hiperaldosteronismo e de hipertensão renovascular'],
    tipoMolecula: 'pequena', pubchem: ['captopril'],
    nomesComerciais: [ref('Capoten', 'Bristol-Myers Squibb'), marca('Lopril', 'Bristol-Myers Squibb')],
    generico: true,
    eaComuns: [TOSSE, DISGEUSIA, RASH, TONTURA, HIPOTENSAO],
    eaGraves: [ANGIOEDEMA, HIPERK, RENAL, FETO, NEUTRO, PROTEIN],
    eaCaracteristico: 'Disgeusia',
    distratoresEA: [D_GENG, D_EDEMA, D_BRONCO, D_OTO],
    contraindicacoes: IECA_CI,
    precaucoes: [...IECA_PREC, 'Doença do colágeno (lúpus, esclerodermia) e uso de imunossupressores: maior risco de neutropenia — hemograma periódico'],
    interacoes: IECA_INT,
    explicacaoFase2: 'O captopril é um IECA: inibe a enzima conversora de angiotensina, diminuindo angiotensina II e aldosterona. Diferente do enalapril, já é ativo ao ser absorvido e tem ação curta.',
    explicacaoFase3: 'O grupo sulfidrila (–SH) do captopril está associado a efeitos próprios dele, como disgeusia (alteração do paladar), exantema e, raramente, neutropenia e proteinúria. A tosse seca e o angioedema são efeitos de classe, ligados à bradicinina.',
    referencias: [...RH, R_BULA('Capoten — Bristol-Myers Squibb'), R_FTN],
    dataRevisao: DATA, validacao: VAL,
  },
  {
    id: 'lisinopril', nome: 'Lisinopril',
    sinonimos: ['lisinopril di-hidratado', 'lisinoprilum'],
    vinculos: [{
      grupoId: 'antihipertensivos', classeId: 'ieca',
      contexto: 'tratamento da hipertensão arterial, da insuficiência cardíaca e do infarto agudo do miocárdio',
      explicacaoFase1: 'O lisinopril é um IECA de dose única diária usado na hipertensão, na insuficiência cardíaca e no infarto agudo do miocárdio em pacientes hemodinamicamente estáveis.',
    }],
    mecanismo: 'IECA ativo, análogo lisínico do enalaprilato, hidrofílico, não metabolizado pelo fígado e eliminado inalterado pelos rins. Inibe a ECA, reduzindo angiotensina II e aldosterona e aumentando bradicinina. A meia-vida longa permite uma tomada ao dia.',
    indicacoes: ['Hipertensão arterial sistêmica', 'Insuficiência cardíaca', 'Infarto agudo do miocárdio (nas primeiras 24 h, em pacientes estáveis)', 'Complicações renais do diabetes em hipertensos com nefropatia incipiente'],
    tipoMolecula: 'pequena', pubchem: ['lisinopril'],
    nomesComerciais: [
      ref('Zestril', 'AstraZeneca'),
      marca('Prinivil', 'MSD'),
      combo('Zestoretic', 'lisinopril + hidroclorotiazida', 'AstraZeneca'),
    ],
    generico: true,
    eaComuns: [TOSSE, TONTURA, CEFALEIA, HIPOTENSAO, FADIGA],
    eaGraves: [ANGIOEDEMA, HIPERK, RENAL, FETO],
    eaCaracteristico: 'Tosse seca',
    distratoresEA: [D_GENG, D_EDEMA, D_BRONCO, D_GINECO],
    contraindicacoes: IECA_CI,
    precaucoes: [...IECA_PREC, 'Eliminação exclusivamente renal: reduzir dose quando a depuração de creatinina estiver diminuída'],
    interacoes: IECA_INT,
    explicacaoFase2: 'O lisinopril é um IECA de longa duração: bloqueia a ECA, reduzindo a angiotensina II, a vasoconstrição e a retenção de sódio mediada pela aldosterona.',
    explicacaoFase3: 'Como todo IECA, impede a degradação da bradicinina; o acúmulo de bradicinina e substância P nas vias aéreas provoca tosse seca, motivo frequente de troca por um BRA.',
    referencias: [...RH, R_BULA('Zestril — AstraZeneca')],
    dataRevisao: DATA, validacao: VAL,
  },
  // ------------------------- BRA -------------------------
  {
    id: 'losartana', nome: 'Losartana',
    sinonimos: ['losartana potassica', 'losartan', 'losartan potassium', 'losartano'],
    vinculos: [{
      grupoId: 'antihipertensivos', classeId: 'bra',
      contexto: 'tratamento da hipertensão arterial e da nefropatia diabética no diabetes tipo 2',
      explicacaoFase1: 'A losartana é um anti-hipertensivo de primeira linha, indicado também para nefroproteção no diabético tipo 2 com proteinúria e para reduzir AVC em hipertensos com hipertrofia ventricular esquerda; é alternativa ao IECA quando há tosse.',
    }],
    mecanismo: 'Antagonista seletivo do receptor AT1 da angiotensina II; parte do efeito deve-se ao metabólito ativo EXP-3174, mais potente e de meia-vida mais longa. Bloqueia vasoconstrição, secreção de aldosterona e efeitos tróficos da angiotensina II, sem aumentar bradicinina. Tem efeito uricosúrico discreto, próprio da molécula.',
    indicacoes: ['Hipertensão arterial sistêmica', 'Redução do risco de AVC em hipertensos com hipertrofia ventricular esquerda', 'Nefropatia diabética com proteinúria em hipertensos com DM tipo 2', 'Insuficiência cardíaca (quando IECA não é tolerado)'],
    tipoMolecula: 'pequena', pubchem: ['losartan'],
    nomesComerciais: [
      ref('Cozaar', 'MSD'),
      marca('Aradois', 'Biolab Sanus'),
      marca('Corus', 'Biosintética'),
      combo('Hyzaar', 'losartana + hidroclorotiazida', 'MSD'),
    ],
    generico: true,
    eaComuns: [TONTURA, HIPOTENSAO, FADIGA, CEFALEIA],
    eaGraves: [HIPERK, RENAL, FETO, ANGIOEDEMA],
    eaCaracteristico: 'Hipercalemia',
    distratoresEA: [D_TOSSE, D_GENG, D_BRONCO, D_OTO],
    contraindicacoes: BRA_CI,
    precaucoes: BRA_PREC,
    interacoes: [...BRA_INT, 'Rifampicina e fluconazol: alteram a conversão ao metabólito ativo (CYP2C9/3A4)'],
    explicacaoFase2: 'A losartana é um BRA: em vez de impedir a formação da angiotensina II, bloqueia o receptor AT1 onde ela age. O resultado é vasodilatação e menor liberação de aldosterona.',
    explicacaoFase3: 'Ao bloquear o efeito da angiotensina II sobre a aldosterona, reduz a secreção de potássio no néfron distal, podendo causar hipercalemia, sobretudo em DRC ou com outros fármacos retentores de K+. Por não interferir na bradicinina, praticamente não causa tosse.',
    referencias: [...RH, R_BULA('Cozaar — MSD')],
    dataRevisao: DATA, validacao: VAL,
  },
  {
    id: 'valsartana', nome: 'Valsartana',
    sinonimos: ['valsartan', 'valsartano'],
    vinculos: [{
      grupoId: 'antihipertensivos', classeId: 'bra',
      contexto: 'tratamento da hipertensão arterial, da insuficiência cardíaca e pós-infarto',
      explicacaoFase1: 'A valsartana trata hipertensão, insuficiência cardíaca e disfunção ventricular após infarto; associada ao sacubitril (INRA) é um dos pilares da IC com fração de ejeção reduzida.',
    }],
    mecanismo: 'Antagonista seletivo e ativo (não pró-fármaco) do receptor AT1. Inibe vasoconstrição, liberação de aldosterona e remodelamento induzidos pela angiotensina II. Eliminada principalmente por via biliar, com pouca metabolização hepática.',
    indicacoes: ['Hipertensão arterial sistêmica', 'Insuficiência cardíaca', 'Disfunção ventricular esquerda após infarto agudo do miocárdio'],
    tipoMolecula: 'pequena', pubchem: ['valsartan'],
    nomesComerciais: [
      ref('Diovan', 'Novartis'),
      combo('Diovan HCT', 'valsartana + hidroclorotiazida', 'Novartis'),
      combo('Exforge', 'anlodipino + valsartana', 'Novartis'),
      combo('Entresto', 'sacubitril + valsartana', 'Novartis', 'indicado para insuficiência cardíaca com fração de ejeção reduzida'),
    ],
    generico: true,
    eaComuns: [TONTURA, HIPOTENSAO, FADIGA, CEFALEIA],
    eaGraves: [HIPERK, RENAL, FETO, ANGIOEDEMA],
    eaCaracteristico: 'Hipotensão sintomática',
    distratoresEA: [D_TOSSE, D_GENG, D_BRONCO, D_HIPOK],
    contraindicacoes: BRA_CI,
    precaucoes: BRA_PREC,
    interacoes: BRA_INT,
    explicacaoFase2: 'A valsartana é um BRA: bloqueia o receptor AT1, impedindo que a angiotensina II contraia os vasos e estimule a aldosterona.',
    explicacaoFase3: 'O bloqueio do SRAA reduz o tônus vascular e a volemia; em pacientes depletados de volume ou com IC (em que as doses são tituladas), a hipotensão sintomática e a tontura são os efeitos mais frequentes. Hipercalemia e piora renal são os riscos graves de classe.',
    referencias: [...RH, R_DIC, R_BULA('Diovan — Novartis')],
    dataRevisao: DATA, validacao: VAL,
  },
  {
    id: 'olmesartana', nome: 'Olmesartana',
    sinonimos: ['olmesartana medoxomila', 'olmesartan', 'olmesartan medoxomil', 'olmesartano'],
    vinculos: [{
      grupoId: 'antihipertensivos', classeId: 'bra',
      contexto: 'tratamento da hipertensão arterial',
      explicacaoFase1: 'A olmesartana é um BRA de alta potência e longa duração indicado para hipertensão arterial, frequentemente em associações de dose fixa com hidroclorotiazida ou anlodipino.',
    }],
    mecanismo: 'Pró-fármaco (olmesartana medoxomila) hidrolisado na parede intestinal à olmesartana, antagonista seletivo e de ligação prolongada ao receptor AT1. Reduz vasoconstrição e secreção de aldosterona. Eliminação mista renal e biliar.',
    indicacoes: ['Hipertensão arterial sistêmica'],
    tipoMolecula: 'pequena', pubchem: ['olmesartan medoxomil'],
    nomesComerciais: [
      ref('Benicar', 'Daiichi Sankyo'),
      combo('Benicar HCT', 'olmesartana + hidroclorotiazida', 'Daiichi Sankyo'),
      combo('Benicar Anlo', 'olmesartana + anlodipino', 'Daiichi Sankyo'),
    ],
    generico: true,
    eaComuns: [TONTURA, CEFALEIA, HIPOTENSAO, FADIGA],
    eaGraves: [ESPRU, HIPERK, RENAL, FETO],
    eaCaracteristico: 'Enteropatia espru-símile',
    distratoresEA: [D_TOSSE, D_GENG, D_BRONCO, D_OTO],
    contraindicacoes: BRA_CI,
    precaucoes: [...BRA_PREC, 'Diarreia crônica grave com perda de peso, mesmo meses ou anos após o início: considerar enteropatia e suspender'],
    interacoes: [...BRA_INT, 'Colesevelam: reduz a absorção (administrar a olmesartana ≥4 h antes)'],
    explicacaoFase2: 'A olmesartana é um BRA: antagoniza o receptor AT1 da angiotensina II, causando vasodilatação e menor retenção de sódio.',
    explicacaoFase3: 'Além dos efeitos de classe (hipercalemia, piora renal), a olmesartana tem um efeito próprio: a enteropatia espru-símile, com diarreia crônica grave, perda de peso e atrofia vilositária semelhante à doença celíaca, reversível com a suspensão (alerta FDA, 2013).',
    referencias: [...RH, R_BULA('Benicar — Daiichi Sankyo'), 'FDA Drug Safety Communication: olmesartan medoxomil – sprue-like enteropathy (07/2013).'],
    dataRevisao: DATA, validacao: VAL,
  },
  // ------------------------- BCC -------------------------
  {
    id: 'anlodipino', nome: 'Anlodipino',
    sinonimos: ['besilato de anlodipino', 'amlodipina', 'amlodipine', 'amlodipine besylate', 'anlodipina'],
    vinculos: [{
      grupoId: 'antihipertensivos', classeId: 'bcc', subclasse: 'Diidropiridínico',
      contexto: 'tratamento da hipertensão arterial e da angina',
      explicacaoFase1: 'O anlodipino é um anti-hipertensivo de primeira linha, especialmente útil em idosos e afrodescendentes, e também trata angina estável e vasoespástica; é o BCC mais usado em associações com IECA/BRA.',
    }],
    mecanismo: 'Diidropiridínico de terceira geração que bloqueia canais de cálcio tipo L voltagem-dependentes, sobretudo no músculo liso arteriolar, causando vasodilatação e queda da resistência periférica. Meia-vida muito longa (35–50 h) e início gradual, o que minimiza taquicardia reflexa. Efeito mínimo sobre condução AV e contratilidade nas doses usuais.',
    indicacoes: ['Hipertensão arterial sistêmica', 'Angina estável crônica', 'Angina vasoespástica (de Prinzmetal)'],
    tipoMolecula: 'pequena', pubchem: ['amlodipine'],
    nomesComerciais: [
      ref('Norvasc', 'Pfizer'),
      marca('Pressat', 'Biolab Sanus'),
      combo('Caduet', 'anlodipino + atorvastatina', 'Pfizer'),
    ],
    generico: true,
    eaComuns: [EDEMA, CEFALEIA, RUBOR, TONTURA, FADIGA],
    eaGraves: [GENGIVA, HIPOTENSAO],
    eaCaracteristico: 'Edema maleolar',
    distratoresEA: [D_TOSSE, D_BRONCO, D_HIPERK, D_OTO],
    contraindicacoes: ['Choque cardiogênico', 'Estenose aórtica grave', 'Angina instável (exceto vasoespástica) sem betabloqueio', 'Hipotensão grave'],
    precaucoes: ['Insuficiência hepática: metabolismo reduzido, iniciar com dose menor', 'Edema não responde a diuréticos; melhora com associação a IECA/BRA ou redução de dose', 'Higiene oral: risco de hiperplasia gengival'],
    interacoes: ['Inibidores potentes do CYP3A4 (claritromicina, cetoconazol, ritonavir): aumentam níveis', 'Sinvastatina: limitar a 20 mg/dia (aumento da exposição à estatina)', 'Indutores do CYP3A4 (rifampicina, carbamazepina): reduzem eficácia', 'Ciclosporina e tacrolimo: possível aumento dos níveis do imunossupressor'],
    explicacaoFase2: 'O anlodipino é um bloqueador de canal de cálcio diidropiridínico: impede a entrada de cálcio no músculo liso das arteríolas, que relaxam, reduzindo a pressão arterial.',
    explicacaoFase3: 'A vasodilatação é predominantemente arteriolar (pré-capilar), o que aumenta a pressão hidrostática capilar e causa edema de tornozelo dose-dependente — que não responde a diurético. Cefaleia e rubor também decorrem da vasodilatação.',
    referencias: [...RH, R_BULA('Norvasc — Pfizer')],
    dataRevisao: DATA, validacao: VAL,
  },
  {
    id: 'nifedipino', nome: 'Nifedipino',
    sinonimos: ['nifedipina', 'nifedipine'],
    vinculos: [{
      grupoId: 'antihipertensivos', classeId: 'bcc', subclasse: 'Diidropiridínico',
      contexto: 'tratamento da hipertensão arterial, inclusive na gestação, e da angina',
      explicacaoFase1: 'O nifedipino de liberação prolongada trata hipertensão e angina; é uma das opções seguras na hipertensão da gestação e na crise hipertensiva da pré-eclâmpsia (via oral).',
    }],
    mecanismo: 'Diidropiridínico de primeira geração que bloqueia canais de cálcio tipo L do músculo liso arteriolar, causando vasodilatação potente. A formulação de liberação imediata tem início rápido e queda abrupta da pressão, com ativação simpática reflexa; por isso, em hipertensão crônica usam-se formulações de liberação prolongada (retard/oros).',
    indicacoes: ['Hipertensão arterial sistêmica (formulações de liberação prolongada)', 'Angina estável e vasoespástica', 'Hipertensão na gestação'],
    offLabel: ['Tocólise no trabalho de parto prematuro', 'Fenômeno de Raynaud'],
    tipoMolecula: 'pequena', pubchem: ['nifedipine'],
    nomesComerciais: [ref('Adalat', 'Bayer'), marca('Adalat Oros', 'Bayer', 'liberação controlada (sistema OROS)'), marca('Adalat Retard', 'Bayer', 'liberação prolongada')],
    generico: true,
    eaComuns: [CEFALEIA, RUBOR, EDEMA, TAQUI, TONTURA],
    eaGraves: [HIPOTENSAO, ANGINA, GENGIVA],
    eaCaracteristico: 'Taquicardia reflexa',
    distratoresEA: [D_TOSSE, D_BRONCO, D_HIPERK, D_OTO],
    contraindicacoes: ['Choque cardiogênico', 'Infarto agudo do miocárdio recente (primeiro mês) e angina instável — formulação de liberação imediata', 'Uso de nifedipino sublingual/liberação imediata na urgência hipertensiva (queda abrupta da PA, isquemia) — prática proscrita', 'Uso com rifampicina'],
    precaucoes: ['Não mastigar nem partir comprimidos de liberação controlada', 'Estenose aórtica grave', 'Insuficiência cardíaca com fração de ejeção reduzida (efeito inotrópico negativo e ativação neuro-hormonal)'],
    interacoes: ['Inibidores do CYP3A4 (claritromicina, cetoconazol, suco de grapefruit): aumentam níveis', 'Indutores do CYP3A4 (rifampicina, fenitoína, carbamazepina): reduzem eficácia', 'Sulfato de magnésio (pré-eclâmpsia): possível potencialização da hipotensão', 'Betabloqueadores: atenuam a taquicardia reflexa (associação útil)'],
    explicacaoFase2: 'O nifedipino é um BCC diidropiridínico: bloqueia os canais de cálcio tipo L das arteríolas, que se dilatam e reduzem a resistência periférica e a pressão arterial.',
    explicacaoFase3: 'A queda rápida da pressão é detectada pelos barorreceptores, que ativam o simpático e geram taquicardia reflexa, palpitações e rubor — mais intensos na formulação de liberação imediata e capazes de precipitar isquemia miocárdica.',
    referencias: [...RH, R_BULA('Adalat — Bayer')],
    dataRevisao: DATA, validacao: VAL,
  },
  // ------------------------- BETABLOQUEADORES -------------------------
  {
    id: 'atenolol', nome: 'Atenolol',
    sinonimos: ['atenololum'],
    vinculos: [{
      grupoId: 'antihipertensivos', classeId: 'betabloqueador', subclasse: 'Cardiosseletivo (β1)',
      contexto: 'tratamento da hipertensão arterial, da angina e de arritmias',
      explicacaoFase1: 'O atenolol trata hipertensão, angina e arritmias; na hipertensão, os betabloqueadores são preferidos quando há indicação específica (angina, pós-infarto, controle de frequência, IC).',
    }],
    mecanismo: 'Antagonista β1-seletivo hidrofílico, sem atividade simpatomimética intrínseca. Reduz frequência cardíaca, contratilidade e débito cardíaco e diminui a liberação de renina pelas células justaglomerulares. Por ser hidrofílico, atravessa pouco a barreira hematoencefálica e é eliminado inalterado pelos rins.',
    indicacoes: ['Hipertensão arterial sistêmica', 'Angina do peito', 'Arritmias cardíacas', 'Infarto agudo do miocárdio (fase precoce e prevenção secundária)'],
    tipoMolecula: 'pequena', pubchem: ['atenolol'],
    nomesComerciais: [ref('Atenol', 'AstraZeneca'), combo('Tenoretic', 'atenolol + clortalidona', 'AstraZeneca')],
    generico: true,
    eaComuns: [BRADI, FADIGA, EXTREM, TONTURA],
    eaGraves: [BAV, BRONCO, REBOTE_BB, HIPOGLI],
    eaCaracteristico: 'Bradicardia',
    distratoresEA: [D_TOSSE, D_GENG, D_EDEMA, D_GINECO],
    contraindicacoes: [...BB_CI, 'Asma grave (cautela mesmo com β1-seletivo)'],
    precaucoes: ['Não suspender abruptamente em coronariopatas (reduzir em 1–2 semanas)', 'Insuficiência renal: ajustar dose (eliminação renal)', 'Gestação: associado a restrição do crescimento fetal — evitar', 'Diabéticos em uso de insulina: pode mascarar hipoglicemia', 'Menor proteção contra AVC que outras classes em hipertensos idosos (estudos LIFE e ASCOT)'],
    interacoes: BB_INT,
    explicacaoFase2: 'O atenolol é um betabloqueador cardiosseletivo: bloqueia preferencialmente o receptor β1 do coração, reduzindo frequência e força de contração, além de diminuir a renina.',
    explicacaoFase3: 'Ao bloquear o β1 no nó sinusal e no nó AV, reduz a automaticidade e a condução, causando bradicardia e, em predispostos, bloqueio AV. A seletividade β1 é relativa e se perde em doses altas, permitindo broncoespasmo em asmáticos.',
    referencias: [...RH, R_BULA('Atenol — AstraZeneca')],
    dataRevisao: DATA, validacao: VAL,
  },
  {
    id: 'metoprolol', nome: 'Metoprolol',
    sinonimos: ['succinato de metoprolol', 'tartarato de metoprolol', 'metoprolol succinate', 'metoprolol tartrate'],
    vinculos: [{
      grupoId: 'antihipertensivos', classeId: 'betabloqueador', subclasse: 'Cardiosseletivo (β1)',
      contexto: 'tratamento da hipertensão arterial, da angina e da insuficiência cardíaca (succinato)',
      explicacaoFase1: 'O metoprolol trata hipertensão, angina, arritmias e pós-infarto; a forma succinato de liberação prolongada é um dos três betabloqueadores com benefício comprovado de mortalidade na IC com fração de ejeção reduzida.',
    }],
    mecanismo: 'Antagonista β1-seletivo lipofílico, sem atividade simpatomimética intrínseca. Reduz frequência cardíaca, contratilidade, consumo de oxigênio miocárdico e liberação de renina. Metabolizado extensamente pelo CYP2D6 (polimorfismo genético afeta níveis).',
    indicacoes: ['Hipertensão arterial sistêmica', 'Angina do peito', 'Insuficiência cardíaca crônica estável com fração de ejeção reduzida (succinato)', 'Arritmias (taquicardias supraventriculares)', 'Prevenção secundária pós-infarto', 'Profilaxia da enxaqueca'],
    tipoMolecula: 'pequena', pubchem: ['metoprolol'],
    nomesComerciais: [ref('Selozok', 'AstraZeneca', 'succinato de liberação prolongada'), marca('Seloken', 'AstraZeneca', 'tartarato'), marca('Lopressor', 'Novartis', 'tartarato')],
    generico: true,
    eaComuns: [BRADI, FADIGA, TONTURA, EXTREM, PESADELO],
    eaGraves: [BAV, BRONCO, REBOTE_BB, HIPOGLI],
    eaCaracteristico: 'Bradicardia',
    distratoresEA: [D_TOSSE, D_GENG, D_EDEMA, D_OTO],
    contraindicacoes: BB_CI,
    precaucoes: ['Na IC: iniciar em dose baixa com paciente euvolêmico e titular a cada 2 semanas', 'Não suspender abruptamente', 'Asma/DPOC: preferir β1-seletivo em dose baixa, com monitorização', 'Diabéticos: pode mascarar taquicardia da hipoglicemia'],
    interacoes: [...BB_INT, 'Inibidores do CYP2D6 (fluoxetina, paroxetina, bupropiona, quinidina): aumentam níveis e bradicardia'],
    explicacaoFase2: 'O metoprolol é um betabloqueador cardiosseletivo: bloqueia o receptor β1 cardíaco, reduzindo frequência, contratilidade e renina, com menor efeito sobre os receptores β2 dos brônquios.',
    explicacaoFase3: 'O bloqueio β1 no nó sinusal reduz a frequência cardíaca — o efeito desejado no controle da angina e da IC, mas que em excesso causa bradicardia sintomática e fadiga. Por ser lipofílico, causa mais pesadelos e alterações do sono que o atenolol.',
    referencias: [...RH, R_DIC, R_BULA('Selozok — AstraZeneca')],
    dataRevisao: DATA, validacao: VAL,
  },
  {
    id: 'carvedilol', nome: 'Carvedilol',
    sinonimos: ['carvedilolum'],
    vinculos: [{
      grupoId: 'antihipertensivos', classeId: 'betabloqueador', subclasse: 'Não seletivo com ação α1-bloqueadora',
      contexto: 'tratamento da insuficiência cardíaca com fração de ejeção reduzida e da hipertensão arterial',
      explicacaoFase1: 'O carvedilol é usado sobretudo na insuficiência cardíaca com fração de ejeção reduzida, em que reduz mortalidade, e também na hipertensão e na disfunção ventricular pós-infarto.',
    }],
    mecanismo: 'Betabloqueador não seletivo (β1 e β2), sem atividade simpatomimética intrínseca, que também bloqueia receptores α1 vasculares, causando vasodilatação. Reduz frequência cardíaca e pós-carga simultaneamente e tem propriedades antioxidantes. Metabolizado por CYP2D6 e CYP2C9.',
    indicacoes: ['Insuficiência cardíaca com fração de ejeção reduzida', 'Hipertensão arterial sistêmica', 'Angina estável', 'Disfunção ventricular esquerda após infarto'],
    offLabel: ['Profilaxia de sangramento por varizes esofágicas na hipertensão portal'],
    tipoMolecula: 'pequena', pubchem: ['carvedilol'],
    nomesComerciais: [marca('Ictus', 'Biolab Sanus'), marca('Divelol', 'Baldacci')],
    generico: true,
    eaComuns: [HIPOT_ORTO, TONTURA, FADIGA, BRADI],
    eaGraves: [BAV, BRONCO, REBOTE_BB, HIPOGLI],
    eaCaracteristico: 'Hipotensão ortostática',
    distratoresEA: [D_TOSSE, D_GENG, D_OTO, D_GINECO],
    contraindicacoes: [...BB_CI, 'Asma brônquica (bloqueio β2)', 'Insuficiência hepática grave'],
    precaucoes: ['Tomar com alimento para reduzir hipotensão ortostática', 'Iniciar em dose baixa e titular lentamente na IC', 'Não suspender abruptamente', 'DPOC: cautela pela ação β2'],
    interacoes: [...BB_INT, 'Outros anti-hipertensivos e α-bloqueadores: hipotensão postural aditiva', 'Ciclosporina: aumento dos níveis do imunossupressor'],
    explicacaoFase2: 'O carvedilol é um betabloqueador não seletivo com ação α1-bloqueadora: reduz frequência e contratilidade (β) e, ao mesmo tempo, dilata os vasos (α1), o que o torna útil na IC.',
    explicacaoFase3: 'O bloqueio α1 impede a vasoconstrição reflexa ao ficar de pé, causando hipotensão ortostática e tontura — mais comum no início e nas titulações. O bloqueio β2 explica o risco de broncoespasmo.',
    referencias: [...RH, R_DIC, R_FTN],
    dataRevisao: DATA, validacao: VAL,
  },
  {
    id: 'propranolol', nome: 'Propranolol',
    sinonimos: ['cloridrato de propranolol', 'propranolol hydrochloride'],
    vinculos: [{
      grupoId: 'antihipertensivos', classeId: 'betabloqueador', subclasse: 'Não seletivo',
      contexto: 'tratamento da hipertensão arterial, da angina, de arritmias e da profilaxia da enxaqueca',
      explicacaoFase1: 'O propranolol, primeiro betabloqueador de uso clínico, trata hipertensão, angina e arritmias e tem usos extracardíacos: profilaxia da enxaqueca, tremor essencial e sintomas adrenérgicos do hipertireoidismo.',
    }],
    mecanismo: 'Antagonista não seletivo dos receptores β1 e β2, lipofílico, sem atividade simpatomimética intrínseca e com efeito estabilizador de membrana. Reduz frequência, contratilidade e renina; o bloqueio β2 afeta brônquios, vasos periféricos e metabolismo da glicose. Alta extração de primeira passagem hepática e boa penetração no SNC.',
    indicacoes: ['Hipertensão arterial sistêmica', 'Angina do peito', 'Arritmias cardíacas', 'Profilaxia da enxaqueca', 'Tremor essencial', 'Controle adjuvante de sintomas do hipertireoidismo e do feocromocitoma (com α-bloqueio prévio)', 'Cardiomiopatia hipertrófica'],
    offLabel: ['Profilaxia de sangramento por varizes esofágicas na hipertensão portal', 'Ansiedade de desempenho (sintomas somáticos)'],
    tipoMolecula: 'pequena', pubchem: ['propranolol'],
    nomesComerciais: [ref('Inderal', 'AstraZeneca')],
    generico: true,
    eaComuns: [FADIGA, BRADI, EXTREM, PESADELO, DISF_ERET],
    eaGraves: [BRONCO, BAV, HIPOGLI, REBOTE_BB],
    eaCaracteristico: 'Broncoespasmo',
    distratoresEA: [D_TOSSE, D_GENG, D_EDEMA, D_OTO],
    contraindicacoes: [...BB_CI, 'Asma brônquica e DPOC com broncoespasmo', 'Angina vasoespástica (de Prinzmetal)'],
    precaucoes: ['Não suspender abruptamente', 'Diabetes em uso de insulina: mascara sintomas e retarda a recuperação da hipoglicemia (bloqueio β2 da glicogenólise)', 'Depressão: possível piora por ação central'],
    interacoes: [...BB_INT, 'Cimetidina e fluvoxamina: aumentam níveis (inibição do metabolismo hepático)', 'Rizatriptana: propranolol aumenta seus níveis (reduzir dose do triptano)', 'Adrenalina: bloqueio β2 permite efeito α sem oposição (hipertensão e bradicardia reflexa)'],
    explicacaoFase2: 'O propranolol é um betabloqueador não seletivo: bloqueia tanto o β1 do coração quanto o β2 dos brônquios, vasos e fígado.',
    explicacaoFase3: 'O bloqueio dos receptores β2 da musculatura brônquica remove o tônus broncodilatador adrenérgico, podendo desencadear broncoespasmo grave em asmáticos e portadores de DPOC — por isso é contraindicado nesses pacientes.',
    referencias: [...RH, R_BULA('Inderal — AstraZeneca')],
    dataRevisao: DATA, validacao: VAL,
  },
  // ------------------------- DIURÉTICOS TIAZÍDICOS -------------------------
  {
    id: 'hidroclorotiazida', nome: 'Hidroclorotiazida',
    sinonimos: ['HCTZ', 'hydrochlorothiazide', 'HCT'],
    vinculos: [{
      grupoId: 'antihipertensivos', classeId: 'diuretico-tiazidico', subclasse: 'Tiazídico',
      contexto: 'tratamento da hipertensão arterial e de edemas',
      explicacaoFase1: 'A hidroclorotiazida é um diurético de primeira linha na hipertensão, muito usado em associações de dose fixa com IECA, BRA e betabloqueadores; também trata edemas leves.',
    }],
    mecanismo: 'Inibe o cotransportador Na+/Cl− (NCC) do túbulo contorcido distal, aumentando a excreção de sódio, cloro e água. Inicialmente reduz volume plasmático e débito cardíaco; cronicamente, a pressão cai por redução da resistência vascular periférica. Aumenta a oferta distal de sódio, o que eleva a secreção de K+ e H+, e aumenta a reabsorção de cálcio.',
    indicacoes: ['Hipertensão arterial sistêmica', 'Edema associado a insuficiência cardíaca, cirrose ou doença renal'],
    offLabel: ['Hipercalciúria idiopática / prevenção de nefrolitíase cálcica', 'Diabetes insípido nefrogênico'],
    tipoMolecula: 'pequena', pubchem: ['hydrochlorothiazide'],
    nomesComerciais: [ref('Clorana', 'Sanofi')],
    generico: true,
    eaComuns: [HIPOK, HIPERURIC, HIPERGLI, HIPONA, POLIURIA, DISLIP_T],
    eaGraves: [HIPOMG, HIPERCA, FOTO, DESIDR],
    eaCaracteristico: 'Hipocalemia',
    distratoresEA: [D_TOSSE, D_GENG, D_BRONCO, D_HIPERK],
    contraindicacoes: TZ_CI,
    precaucoes: ['Pouca eficácia com TFG < 30 mL/min/1,73 m² (preferir diurético de alça)', 'Monitorar potássio, sódio, glicemia e ácido úrico', 'Idosos: risco de hiponatremia', 'Uso prolongado em doses altas: associação com câncer de pele não melanoma (alerta de fotossensibilidade, EMA/Anvisa 2018–2019)'],
    interacoes: TZ_INT,
    explicacaoFase2: 'A hidroclorotiazida é um diurético tiazídico: bloqueia a reabsorção de sódio e cloro no túbulo distal, aumentando a diurese e, com o tempo, reduzindo a resistência dos vasos.',
    explicacaoFase3: 'Com mais sódio chegando ao ducto coletor, aumenta a troca por potássio (estimulada também pela aldosterona), levando à perda urinária de K+ e hipocalemia — efeito dose-dependente que predispõe a arritmias.',
    referencias: [...RH, R_FTN],
    dataRevisao: DATA, validacao: VAL,
  },
  {
    id: 'clortalidona', nome: 'Clortalidona',
    sinonimos: ['chlorthalidone', 'chlortalidone', 'clortalidone'],
    vinculos: [{
      grupoId: 'antihipertensivos', classeId: 'diuretico-tiazidico', subclasse: 'Tiazídico-símile',
      contexto: 'tratamento da hipertensão arterial e de edemas',
      explicacaoFase1: 'A clortalidona é um diurético tiazídico-símile de primeira linha na hipertensão, com forte evidência de redução de eventos cardiovasculares (ALLHAT, SHEP); as diretrizes preferem os tiazídicos-símiles por sua longa duração.',
    }],
    mecanismo: 'Sulfonamida tiazídico-símile que inibe o cotransportador Na+/Cl− do túbulo contorcido distal. Tem meia-vida muito longa (40–60 h) por ligação a eritrócitos, garantindo efeito de 24 h ou mais, e é cerca de 1,5–2 vezes mais potente que a hidroclorotiazida por miligrama.',
    indicacoes: ['Hipertensão arterial sistêmica', 'Edema (insuficiência cardíaca, cirrose, síndrome nefrótica)'],
    tipoMolecula: 'pequena', pubchem: ['chlorthalidone'],
    nomesComerciais: [ref('Higroton', 'Novartis'), combo('Tenoretic', 'atenolol + clortalidona', 'AstraZeneca')],
    generico: true,
    eaComuns: [HIPOK, HIPERURIC, HIPERGLI, HIPONA, POLIURIA],
    eaGraves: [HIPOMG, HIPERCA, DESIDR],
    eaCaracteristico: 'Hipocalemia',
    distratoresEA: [D_TOSSE, D_GENG, D_BRONCO, D_HIPERK],
    contraindicacoes: TZ_CI,
    precaucoes: ['Hipocalemia mais frequente que com hidroclorotiazida em doses equipotentes — monitorar eletrólitos', 'Idosos: risco de hiponatremia', 'Diabéticos: monitorar glicemia'],
    interacoes: TZ_INT,
    explicacaoFase2: 'A clortalidona é um diurético tiazídico-símile: tem estrutura diferente dos tiazídicos clássicos, mas o mesmo alvo — o cotransportador Na+/Cl− do túbulo distal.',
    explicacaoFase3: 'O aumento da oferta de sódio ao néfron distal estimula a secreção de potássio; como a ação da clortalidona é longa e potente, a hipocalemia tende a ser mais acentuada que com a hidroclorotiazida.',
    referencias: [...RH, R_BULA('Higroton — Novartis')],
    dataRevisao: DATA, validacao: VAL,
  },
  {
    id: 'indapamida', nome: 'Indapamida',
    sinonimos: ['indapamide'],
    vinculos: [{
      grupoId: 'antihipertensivos', classeId: 'diuretico-tiazidico', subclasse: 'Tiazídico-símile',
      contexto: 'tratamento da hipertensão arterial',
      explicacaoFase1: 'A indapamida é um diurético tiazídico-símile de primeira linha na hipertensão, com redução de AVC e mortalidade em idosos (estudo HYVET) e menor impacto metabólico em doses baixas.',
    }],
    mecanismo: 'Tiazídico-símile (derivado indolínico) que inibe o cotransportador Na+/Cl− do túbulo distal. Em doses baixas (1,5 mg de liberação prolongada), o efeito anti-hipertensivo depende mais da redução da resistência vascular que da natriurese. Metabolização hepática extensa.',
    indicacoes: ['Hipertensão arterial sistêmica'],
    tipoMolecula: 'pequena', pubchem: ['indapamide'],
    nomesComerciais: [ref('Natrilix', 'Servier'), marca('Natrilix SR', 'Servier', 'liberação prolongada')],
    generico: true,
    eaComuns: [HIPOK, HIPONA, HIPERURIC, TONTURA, RASH],
    eaGraves: [DESIDR, HIPOMG, FOTO],
    eaCaracteristico: 'Hiponatremia',
    distratoresEA: [D_TOSSE, D_GENG, D_BRONCO, D_HIPERK],
    contraindicacoes: [...TZ_CI, 'Insuficiência hepática grave ou encefalopatia hepática', 'Insuficiência renal grave'],
    precaucoes: ['Idosos: dosar sódio no início (hiponatremia pode ser sintomática)', 'Prolongamento de QT na presença de hipocalemia'],
    interacoes: TZ_INT,
    explicacaoFase2: 'A indapamida é um diurético tiazídico-símile: inibe a reabsorção de sódio e cloro no túbulo distal e tem ação vasodilatadora adicional.',
    explicacaoFase3: 'Os tiazídicos prejudicam a diluição da urina no túbulo distal e favorecem a retenção de água livre; em idosos, mulheres e baixo peso isso causa hiponatremia, potencialmente grave (confusão, quedas).',
    referencias: [...RH, R_BULA('Natrilix — Servier'), 'Beckett NS et al. Treatment of hypertension in patients 80 years of age or older (HYVET). N Engl J Med. 2008;358:1887-98.'],
    dataRevisao: DATA, validacao: VAL,
  },
  // ------------------------- DIURÉTICO DE ALÇA -------------------------
  {
    id: 'furosemida', nome: 'Furosemida',
    sinonimos: ['furosemide', 'frusemide', 'furosemido'],
    vinculos: [{
      grupoId: 'antihipertensivos', classeId: 'diuretico-alca',
      contexto: 'tratamento de edemas e da congestão na insuficiência cardíaca; hipertensão com doença renal avançada',
      explicacaoFase1: 'A furosemida é o diurético de escolha para congestão e edema (IC, cirrose, síndrome nefrótica, edema agudo de pulmão); na hipertensão, é preferida aos tiazídicos quando a TFG está abaixo de 30 mL/min/1,73 m².',
    }],
    mecanismo: 'Inibe o cotransportador Na+/K+/2Cl− (NKCC2) do ramo ascendente espesso da alça de Henle, onde se reabsorvem ~25% do sódio filtrado, produzindo natriurese intensa e de curta duração. Também abole o gradiente hipertônico medular e aumenta a excreção de Ca2+ e Mg2+. Por via IV, causa venodilatação precoce, útil no edema agudo de pulmão.',
    indicacoes: ['Edema associado a insuficiência cardíaca, cirrose hepática e doença renal (incluindo síndrome nefrótica)', 'Edema agudo de pulmão', 'Hipertensão arterial (especialmente com DRC avançada ou sobrecarga de volume)'],
    offLabel: ['Hipercalcemia grave, após reidratação'],
    tipoMolecula: 'pequena', pubchem: ['furosemide'],
    nomesComerciais: [ref('Lasix', 'Sanofi')],
    generico: true,
    eaComuns: [HIPOK, DESIDR, HIPONA, HIPERURIC, ALCALOSE, POLIURIA],
    eaGraves: [OTOTOX, HIPOMG, RENAL, HIPERS],
    eaCaracteristico: 'Ototoxicidade',
    distratoresEA: [D_TOSSE, D_GENG, D_BRONCO, D_HIPERK],
    contraindicacoes: ['Anúria sem resposta a dose-teste', 'Hipovolemia/desidratação grave', 'Hipocalemia ou hiponatremia graves não corrigidas', 'Coma ou pré-coma hepático'],
    precaucoes: ['Infusão IV lenta e evitar doses muito altas (risco de ototoxicidade)', 'Monitorar eletrólitos, função renal e volemia', 'Hipersensibilidade a sulfonamidas (reação cruzada possível)', 'Hiperplasia prostática: risco de retenção urinária aguda'],
    interacoes: ['Aminoglicosídeos e vancomicina: ototoxicidade e nefrotoxicidade aditivas', 'Lítio: aumento dos níveis', 'Digoxina: hipocalemia aumenta toxicidade', 'AINEs: reduzem resposta diurética', 'Fármacos que prolongam QT: risco aumentado por hipocalemia/hipomagnesemia'],
    explicacaoFase2: 'A furosemida é um diurético de alça: bloqueia o cotransportador Na+/K+/2Cl− da alça de Henle, segmento que reabsorve grande parte do sódio — por isso a diurese é potente.',
    explicacaoFase3: 'Um cotransportador semelhante (NKCC1) existe na estria vascular da orelha interna; sua inibição altera a composição da endolinfa e causa zumbido e perda auditiva, geralmente reversíveis, com risco maior em doses IV altas e rápidas ou associadas a aminoglicosídeos.',
    referencias: [...RH, R_DIC, R_BULA('Lasix — Sanofi'), R_FTN],
    dataRevisao: DATA, validacao: VAL,
  },
  // ------------------------- POUPADOR DE K / ARM -------------------------
  {
    id: 'espironolactona', nome: 'Espironolactona',
    sinonimos: ['spironolactone', 'espironolactone'],
    vinculos: [{
      grupoId: 'antihipertensivos', classeId: 'diuretico-poupador-potassio', subclasse: 'Antagonista mineralocorticoide esteroidal',
      contexto: 'tratamento da hipertensão resistente, da insuficiência cardíaca e do hiperaldosteronismo',
      explicacaoFase1: 'A espironolactona é o quarto fármaco preferencial na hipertensão resistente, um dos pilares da IC com fração de ejeção reduzida e o tratamento clínico do hiperaldosteronismo primário; também trata ascite da cirrose.',
    }],
    mecanismo: 'Antagonista competitivo do receptor mineralocorticoide (aldosterona) no túbulo distal e ducto coletor, reduzindo a expressão de canais ENaC e da Na+/K+-ATPase. Resulta em natriurese discreta com retenção de potássio e de H+. Também bloqueia efeitos pró-fibróticos da aldosterona no coração e nos vasos. Não seletiva: antagoniza receptores androgênicos e de progesterona.',
    indicacoes: ['Hipertensão arterial (especialmente resistente)', 'Insuficiência cardíaca com fração de ejeção reduzida', 'Hiperaldosteronismo primário', 'Edema e ascite da cirrose hepática', 'Síndrome nefrótica'],
    offLabel: ['Hirsutismo e síndrome dos ovários policísticos', 'Acne hormonal feminina', 'Componente antiandrogênico em hormonização de mulheres trans'],
    tipoMolecula: 'pequena', pubchem: ['spironolactone'],
    nomesComerciais: [ref('Aldactone', 'Pfizer')],
    generico: true,
    eaComuns: [GINECO, MENSTR, DISF_ERET, DISPEPSIA],
    eaGraves: [HIPERK, RENAL, HIPONA],
    eaCaracteristico: 'Ginecomastia',
    distratoresEA: [D_TOSSE, D_GENG, D_OTO, D_HIPOK],
    contraindicacoes: ['Hipercalemia (K+ > 5,0 mEq/L)', 'Insuficiência renal grave / anúria', 'Doença de Addison', 'Uso com eplerenona ou outros poupadores de potássio'],
    precaucoes: ['Monitorar potássio e creatinina (especialmente com IECA/BRA e em DRC ou diabetes)', 'Evitar suplementos de K+ e substitutos de sal à base de potássio', 'Ginecomastia: considerar troca por eplerenona'],
    interacoes: ['IECA, BRA, inibidores da renina, trimetoprima, heparina: hipercalemia', 'AINEs: hipercalemia e piora renal', 'Digoxina: pode aumentar níveis/interferir em ensaios', 'Lítio: aumento dos níveis'],
    explicacaoFase2: 'A espironolactona é um diurético poupador de potássio: bloqueia o receptor da aldosterona, reduzindo a reabsorção de sódio e a eliminação de potássio no final do néfron.',
    explicacaoFase3: 'Por ser um esteroide pouco seletivo, a espironolactona também bloqueia receptores androgênicos (e age em receptores de progesterona), causando ginecomastia e mastalgia em homens e irregularidade menstrual em mulheres — efeitos que a eplerenona, mais seletiva, praticamente não tem.',
    referencias: [...RH, R_DIC, R_BULA('Aldactone — Pfizer')],
    dataRevisao: DATA, validacao: VAL,
  },
  // ------------------------- SIMPATOLÍTICOS CENTRAIS -------------------------
  {
    id: 'clonidina', nome: 'Clonidina',
    sinonimos: ['cloridrato de clonidina', 'clonidine', 'clonidine hydrochloride'],
    vinculos: [{
      grupoId: 'antihipertensivos', classeId: 'simpatolitico-central', subclasse: 'Agonista α2 (e de receptores imidazolínicos)',
      contexto: 'tratamento da hipertensão arterial (fármaco de exceção, em geral 4ª–5ª linha)',
      explicacaoFase1: 'A clonidina é um anti-hipertensivo de ação central reservado a casos de hipertensão resistente ou refratária; não é primeira linha pelo perfil de efeitos adversos.',
    }],
    mecanismo: 'Agonista α2-adrenérgico (e de receptores imidazolínicos I1) no núcleo do trato solitário e na medula ventrolateral rostral, reduzindo o efluxo simpático para coração, vasos e rins. Diminui resistência periférica, frequência cardíaca e renina. Também atua em α2 pré-sinápticos periféricos, reduzindo a liberação de noradrenalina.',
    indicacoes: ['Hipertensão arterial sistêmica'],
    offLabel: ['Síndrome de abstinência de opioides e álcool (sintomas adrenérgicos)', 'TDAH (formulação de liberação prolongada, não disponível no Brasil)', 'Adjuvante em analgesia e sedação', 'Fogachos da menopausa'],
    tipoMolecula: 'pequena', pubchem: ['clonidine'],
    nomesComerciais: [ref('Atensina', 'Boehringer Ingelheim')],
    generico: true,
    eaComuns: [SEDA, BOCA, TONTURA, FADIGA, HIPOT_ORTO],
    eaGraves: [REBOTE_CLON, BRADI, BAV],
    eaCaracteristico: 'Hipertensão rebote na suspensão abrupta',
    distratoresEA: [D_TOSSE, D_GENG, D_HIPERK, D_OTO],
    contraindicacoes: ['Bradiarritmias graves (doença do nó sinusal, BAV de 2º/3º grau)', 'Má adesão ao tratamento (risco de rebote)'],
    precaucoes: ['Nunca suspender abruptamente: reduzir gradualmente em 2–4 dias', 'Depressão e atividades que exigem atenção (sedação)', 'Idosos: risco de hipotensão ortostática e quedas'],
    interacoes: ['Betabloqueadores: na retirada, suspender primeiro o betabloqueador (risco de crise hipertensiva por α sem oposição)', 'Antidepressivos tricíclicos e mirtazapina: antagonizam o efeito anti-hipertensivo', 'Álcool, benzodiazepínicos e opioides: sedação aditiva', 'Verapamil, diltiazem, digoxina: bradicardia aditiva'],
    explicacaoFase2: 'A clonidina é um simpatolítico de ação central: estimula receptores α2 no tronco encefálico que funcionam como freio do sistema simpático, reduzindo a pressão e a frequência cardíaca.',
    explicacaoFase3: 'O uso crônico suprime o tônus simpático e induz adaptação dos receptores; com a retirada abrupta, há descarga de catecolaminas com hipertensão de rebote, taquicardia, sudorese e agitação 18–36 h após a última dose.',
    referencias: [...RH, R_BULA('Atensina — Boehringer Ingelheim')],
    dataRevisao: DATA, validacao: VAL,
  },
  {
    id: 'metildopa', nome: 'Metildopa',
    sinonimos: ['alfametildopa', 'alfa-metildopa', 'methyldopa', 'alpha-methyldopa'],
    vinculos: [{
      grupoId: 'antihipertensivos', classeId: 'simpatolitico-central', subclasse: 'Agonista α2 (pró-fármaco — falso neurotransmissor)',
      contexto: 'tratamento da hipertensão arterial na gestação',
      explicacaoFase1: 'A metildopa é o anti-hipertensivo mais estudado e de primeira escolha na hipertensão crônica e gestacional; fora da gestação, foi substituída por classes mais bem toleradas.',
    }],
    mecanismo: 'Pró-fármaco captado pelos neurônios adrenérgicos e convertido em α-metilnoradrenalina, que é armazenada e liberada como falso neurotransmissor. No SNC, a α-metilnoradrenalina estimula receptores α2, reduzindo o efluxo simpático e a resistência vascular periférica, com preservação do fluxo renal e uteroplacentário.',
    indicacoes: ['Hipertensão arterial sistêmica', 'Hipertensão na gestação (crônica, gestacional, pré-eclâmpsia — tratamento oral de manutenção)'],
    tipoMolecula: 'pequena', pubchem: ['methyldopa'],
    nomesComerciais: [ref('Aldomet')],
    generico: true,
    eaComuns: [SEDA, BOCA, TONTURA, HIPOT_ORTO, DISF_ERET],
    eaGraves: [HEMOL, HEPATO, HIPERPRL],
    eaCaracteristico: 'Anemia hemolítica autoimune',
    distratoresEA: [D_TOSSE, D_GENG, D_OTO, D_HIPOK],
    contraindicacoes: ['Doença hepática ativa (hepatite, cirrose)', 'Antecedente de anemia hemolítica ou hepatopatia associada à metildopa', 'Uso de inibidores da MAO', 'Feocromocitoma'],
    precaucoes: ['Coombs direto positivo ocorre em 10–20% após 6–12 meses; hemograma se surgirem sinais de hemólise', 'Monitorar função hepática nas primeiras semanas', 'Interfere em dosagens de catecolaminas urinárias e creatinina por alguns métodos'],
    interacoes: ['Inibidores da MAO: crise hipertensiva/excitação central', 'Sulfato ferroso: reduz absorção da metildopa', 'Lítio: aumento de toxicidade', 'Levodopa: efeitos aditivos sobre o SNC e sobre a PA', 'Anestésicos gerais: hipotensão aditiva'],
    explicacaoFase2: 'A metildopa é um simpatolítico central: é convertida em um falso neurotransmissor (α-metilnoradrenalina) que estimula receptores α2 do tronco encefálico e reduz o tônus simpático.',
    explicacaoFase3: 'A metildopa altera antígenos da membrana das hemácias (sistema Rh), induzindo autoanticorpos IgG; o Coombs direto fica positivo em até 20% dos usuários e uma minoria desenvolve anemia hemolítica autoimune verdadeira, que regride com a suspensão.',
    referencias: [...RH, R_FTN, 'Peraçoli JC et al. Pré-eclâmpsia/eclâmpsia. Protocolo FEBRASGO/RBEHG 2019–2023.'],
    dataRevisao: DATA, validacao: VAL,
  },
  // ------------------------- VASODILATADOR DIRETO -------------------------
  {
    id: 'hidralazina', nome: 'Hidralazina',
    sinonimos: ['cloridrato de hidralazina', 'hydralazine', 'hydralazine hydrochloride', 'hidralazine'],
    vinculos: [{
      grupoId: 'antihipertensivos', classeId: 'vasodilatador-direto',
      contexto: 'tratamento da hipertensão grave, da emergência hipertensiva na gestação e da IC (associada a nitrato)',
      explicacaoFase1: 'A hidralazina é usada por via IV na crise hipertensiva da pré-eclâmpsia e por via oral na hipertensão resistente e, associada ao dinitrato de isossorbida, na IC com fração de ejeção reduzida (sobretudo em afrodescendentes ou intolerantes a IECA/BRA).',
    }],
    mecanismo: 'Vasodilatador arteriolar direto: reduz o cálcio intracelular do músculo liso arteriolar (mecanismo exato incompletamente conhecido, envolvendo interferência na liberação de cálcio do retículo sarcoplasmático e abertura de canais de K+). Praticamente não dilata veias. A queda da resistência ativa reflexo barorreceptor (taquicardia) e o SRAA (retenção de sódio). Metabolizada por N-acetilação (polimorfismo de acetiladores lentos/rápidos).',
    indicacoes: ['Hipertensão arterial grave/resistente (oral, associada a betabloqueador e diurético)', 'Emergência hipertensiva na gestação e pré-eclâmpsia grave (IV)', 'Insuficiência cardíaca com fração de ejeção reduzida, associada a nitrato'],
    tipoMolecula: 'pequena', pubchem: ['hydralazine'],
    nomesComerciais: [ref('Apresolina', 'Novartis'), marca('Nepresol', 'Cristália', 'solução injetável; uso hospitalar')],
    generico: false,
    eaComuns: [CEFALEIA, TAQUI, RUBOR, RETENCAO, DISPEPSIA],
    eaGraves: [LUPUS, ANGINA, HIPOTENSAO],
    eaCaracteristico: 'Síndrome lúpus-like',
    distratoresEA: [D_TOSSE, D_GENG, D_BRONCO, D_HIPERK],
    contraindicacoes: ['Lúpus eritematoso sistêmico', 'Doença arterial coronariana sem betabloqueio (taquicardia reflexa precipita isquemia)', 'Cardiopatia reumática mitral', 'Taquicardia grave'],
    precaucoes: ['Em uso crônico, associar betabloqueador (taquicardia reflexa) e diurético (retenção de sódio)', 'Doses diárias > 200 mg e acetiladores lentos: maior risco de lúpus induzido — dosar FAN se sintomas', 'Na gestante, titular a dose IV para evitar hipotensão materna e sofrimento fetal'],
    interacoes: ['Outros anti-hipertensivos e nitratos: hipotensão aditiva', 'Betabloqueadores: associação útil (neutraliza taquicardia reflexa)', 'AINEs: reduzem efeito anti-hipertensivo'],
    explicacaoFase2: 'A hidralazina é um vasodilatador direto: relaxa a musculatura lisa das arteríolas sem atuar em receptores do sistema nervoso autônomo ou do SRAA.',
    explicacaoFase3: 'A hidralazina é metabolizada por acetilação; em acetiladores lentos e com doses altas prolongadas, induz autoanticorpos (FAN, anti-histona), causando artralgias, febre e serosite — a síndrome lúpus-like, reversível com a suspensão.',
    referencias: [...RH, R_DIC, R_FTN, 'Peraçoli JC et al. Pré-eclâmpsia/eclâmpsia. Protocolo FEBRASGO/RBEHG 2019–2023.'],
    dataRevisao: DATA, validacao: VAL,
  },
];

// =====================================================================
// MEDICAMENTOS — HIPOLIPEMIANTES
// =====================================================================
const ESTAT_CI = [
  'Doença hepática ativa ou elevação persistente e inexplicada de transaminases',
  'Gestação e amamentação',
  'Miopatia ativa',
];
const ESTAT_PREC = [
  'Dosar CK basal e repetir apenas se sintomas musculares; dosar transaminases antes de iniciar',
  'Fatores de risco para miopatia: idade avançada, hipotireoidismo não tratado, DRC, polifarmácia, consumo excessivo de álcool',
  'Mulheres em idade fértil: orientar contracepção',
  'Pequeno aumento no risco de diabetes em predispostos — benefício cardiovascular supera o risco',
];

const medsLIP: Medicamento[] = [
  // ------------------------- ESTATINAS -------------------------
  {
    id: 'sinvastatina', nome: 'Sinvastatina',
    sinonimos: ['simvastatin', 'simvastatina', 'sinvastatin'],
    vinculos: [{
      grupoId: 'hipolipemiantes', classeId: 'estatina',
      contexto: 'tratamento da hipercolesterolemia e prevenção de eventos cardiovasculares',
      explicacaoFase1: 'A sinvastatina reduz o LDL-colesterol e eventos cardiovasculares (estudo 4S); é uma estatina de intensidade moderada, amplamente disponível no SUS.',
    }],
    mecanismo: 'Pró-fármaco lactônico hidrolisado ao β-hidroxiácido ativo, que inibe competitivamente a HMG-CoA redutase. A queda do colesterol intra-hepatocitário ativa o SREBP-2, aumentando a expressão de receptores de LDL e a captação de LDL do plasma. Lipofílica e metabolizada pelo CYP3A4, com efeito máximo quando administrada à noite.',
    indicacoes: ['Hipercolesterolemia primária e dislipidemia mista', 'Prevenção primária e secundária de eventos cardiovasculares', 'Hipercolesterolemia familiar heterozigótica'],
    tipoMolecula: 'pequena', pubchem: ['simvastatin'],
    nomesComerciais: [ref('Zocor', 'MSD'), combo('Vytorin', 'ezetimiba + sinvastatina', 'MSD')],
    generico: true,
    eaComuns: [MIALGIA, DOR_ABD, CEFALEIA, TRANSAM],
    eaGraves: [RABDO, HEPATO, DM_ESTAT],
    eaCaracteristico: 'Miopatia e rabdomiólise',
    distratoresEA: [D_TOSSE, D_FLUSH, D_OTO, D_HIPOK],
    contraindicacoes: [...ESTAT_CI, 'Uso com inibidores potentes do CYP3A4 (itraconazol, cetoconazol, claritromicina, eritromicina, inibidores de protease do HIV), genfibrozila, ciclosporina e danazol'],
    precaucoes: [...ESTAT_PREC, 'Dose de 80 mg não deve ser iniciada (maior risco de miopatia)', 'Pacientes de ascendência asiática e portadores da variante SLCO1B1: maior risco miotóxico'],
    interacoes: ['Inibidores potentes do CYP3A4 e genfibrozila: contraindicados (rabdomiólise)', 'Anlodipino, amiodarona, ranolazina: não exceder 20 mg/dia', 'Verapamil, diltiazem, dronedarona: não exceder 10 mg/dia', 'Suco de grapefruit em grande quantidade: aumenta exposição', 'Varfarina: possível aumento do INR', 'Ácido bempedoico: limitar sinvastatina a 20 mg/dia'],
    explicacaoFase2: 'A sinvastatina é uma estatina: bloqueia a HMG-CoA redutase, enzima-chave da produção de colesterol no fígado. O fígado então capta mais LDL do sangue, reduzindo o LDL-c.',
    explicacaoFase3: 'A inibição da via do mevalonato no músculo esquelético reduz coenzima Q10 e proteínas preniladas, causando mialgia e, raramente, miopatia com necrose e rabdomiólise; o risco da sinvastatina é amplificado por inibidores do CYP3A4, que elevam muito seus níveis.',
    referencias: [...RL, R_BULA('Zocor — MSD'), R_FTN],
    dataRevisao: DATA, validacao: VAL,
  },
  {
    id: 'atorvastatina', nome: 'Atorvastatina',
    sinonimos: ['atorvastatina calcica', 'atorvastatin', 'atorvastatin calcium'],
    vinculos: [{
      grupoId: 'hipolipemiantes', classeId: 'estatina',
      contexto: 'tratamento da hipercolesterolemia e prevenção de eventos cardiovasculares',
      explicacaoFase1: 'A atorvastatina é uma estatina que, em doses de 40–80 mg, atinge alta intensidade (redução de LDL-c ≥ 50%), indicada para pacientes de alto e muito alto risco cardiovascular, inclusive após síndrome coronariana aguda.',
    }],
    mecanismo: 'Inibidor competitivo ativo da HMG-CoA redutase, lipofílico, metabolizado pelo CYP3A4 a metabólitos também ativos, o que lhe confere longa duração de ação (pode ser tomado a qualquer hora). Aumenta os receptores de LDL hepáticos e reduz modestamente triglicerídeos.',
    indicacoes: ['Hipercolesterolemia primária e dislipidemia mista', 'Prevenção primária e secundária de eventos cardiovasculares', 'Hipercolesterolemia familiar heterozigótica e homozigótica (adjuvante)'],
    tipoMolecula: 'pequena', pubchem: ['atorvastatin'],
    nomesComerciais: [ref('Lipitor', 'Pfizer'), marca('Citalor', 'Pfizer'), combo('Caduet', 'anlodipino + atorvastatina', 'Pfizer')],
    generico: true,
    eaComuns: [MIALGIA, ARTRALGIA, DIARREIA, TRANSAM, NASOF],
    eaGraves: [RABDO, HEPATO, DM_ESTAT],
    eaCaracteristico: 'Mialgia',
    distratoresEA: [D_TOSSE, D_FLUSH, D_OTO, D_HIPOK],
    contraindicacoes: [...ESTAT_CI, 'Uso com glecaprevir/pibrentasvir e com tipranavir/ritonavir'],
    precaucoes: [...ESTAT_PREC, 'AVC hemorrágico prévio: avaliar risco-benefício de doses altas (estudo SPARCL)'],
    interacoes: ['Inibidores potentes do CYP3A4 (claritromicina, itraconazol, inibidores de protease): aumentam risco de miopatia — limitar dose ou evitar', 'Ciclosporina: evitar', 'Genfibrozila: evitar (preferir fenofibrato quando necessário)', 'Digoxina: discreto aumento dos níveis'],
    explicacaoFase2: 'A atorvastatina é uma estatina: inibe a HMG-CoA redutase hepática, reduz a síntese de colesterol e aumenta a remoção do LDL circulante pelos receptores de LDL.',
    explicacaoFase3: 'O bloqueio da via do mevalonato também ocorre nas fibras musculares, causando dor muscular (mialgia) sem elevação de CK na maioria dos casos; raramente evolui para miopatia e rabdomiólise, especialmente com interações pelo CYP3A4.',
    referencias: [...RL, R_BULA('Lipitor — Pfizer')],
    dataRevisao: DATA, validacao: VAL,
  },
  {
    id: 'rosuvastatina', nome: 'Rosuvastatina',
    sinonimos: ['rosuvastatina calcica', 'rosuvastatin', 'rosuvastatin calcium'],
    vinculos: [{
      grupoId: 'hipolipemiantes', classeId: 'estatina',
      contexto: 'tratamento da hipercolesterolemia e prevenção de eventos cardiovasculares',
      explicacaoFase1: 'A rosuvastatina é a estatina mais potente por miligrama; nas doses de 20–40 mg é de alta intensidade, útil para alcançar metas rigorosas de LDL-c em alto e muito alto risco.',
    }],
    mecanismo: 'Inibidor competitivo da HMG-CoA redutase de alta afinidade, hidrofílico, com captação hepática seletiva via OATP1B1. Sofre pouco metabolismo pelo CYP (mínimo pelo CYP2C9), com menor potencial de interações que sinvastatina e atorvastatina. Meia-vida de ~19 h.',
    indicacoes: ['Hipercolesterolemia primária e dislipidemia mista', 'Hipertrigliceridemia (adjuvante)', 'Prevenção primária de eventos cardiovasculares em indivíduos de risco (estudo JUPITER)', 'Retardo da progressão da aterosclerose', 'Hipercolesterolemia familiar homozigótica (adjuvante)'],
    tipoMolecula: 'pequena', pubchem: ['rosuvastatin'],
    nomesComerciais: [ref('Crestor', 'AstraZeneca')],
    generico: true,
    eaComuns: [MIALGIA, CEFALEIA, DOR_ABD, TRANSAM],
    eaGraves: [RABDO, PROTEIN, DM_ESTAT, HEPATO],
    eaCaracteristico: 'Mialgia',
    distratoresEA: [D_TOSSE, D_FLUSH, D_OTO, D_COLELIT],
    contraindicacoes: [...ESTAT_CI, 'Insuficiência renal grave (ClCr < 30 mL/min) para a dose de 40 mg', 'Uso com ciclosporina'],
    precaucoes: [...ESTAT_PREC, 'Pacientes de ascendência asiática: exposição ~2× maior — iniciar com 5 mg', 'Dose de 40 mg reservada a casos selecionados (maior risco de proteinúria e miopatia)'],
    interacoes: ['Ciclosporina: contraindicada (exposição aumentada ~7×)', 'Genfibrozila: evitar', 'Inibidores de protease do HIV (ex.: lopinavir/ritonavir, atazanavir): limitar dose', 'Antiácidos com alumínio/magnésio: reduzem absorção (dar 2 h depois)', 'Varfarina: possível aumento do INR'],
    explicacaoFase2: 'A rosuvastatina é uma estatina potente e hidrofílica: inibe a HMG-CoA redutase no fígado, aumentando a captação de LDL do plasma.',
    explicacaoFase3: 'Como toda estatina, pode causar sintomas musculares por depleção de intermediários da via do mevalonato no músculo; a mialgia é o efeito mais frequente, e a rabdomiólise é rara. Em doses altas, a rosuvastatina pode causar proteinúria tubular, geralmente transitória.',
    referencias: [...RL, R_BULA('Crestor — AstraZeneca')],
    dataRevisao: DATA, validacao: VAL,
  },
  {
    id: 'pravastatina', nome: 'Pravastatina',
    sinonimos: ['pravastatina sodica', 'pravastatin', 'pravastatin sodium'],
    vinculos: [{
      grupoId: 'hipolipemiantes', classeId: 'estatina',
      contexto: 'tratamento da hipercolesterolemia e prevenção de eventos cardiovasculares',
      explicacaoFase1: 'A pravastatina é uma estatina de baixa a moderada intensidade, útil quando é preciso minimizar interações medicamentosas (polifarmácia, transplantados, pacientes com HIV).',
    }],
    mecanismo: 'Inibidor competitivo ativo e hidrofílico da HMG-CoA redutase, com captação hepática via OATP1B1. Não é metabolizada significativamente pelo CYP450 (sulfatação), o que reduz interações. Tem menor potência hipolipemiante que atorvastatina e rosuvastatina.',
    indicacoes: ['Hipercolesterolemia primária e dislipidemia mista', 'Prevenção primária e secundária de eventos cardiovasculares'],
    tipoMolecula: 'pequena', pubchem: ['pravastatin'],
    nomesComerciais: [ref('Pravacol', 'Bristol-Myers Squibb')],
    generico: true,
    eaComuns: [MIALGIA, CEFALEIA, DISPEPSIA, TRANSAM],
    eaGraves: [RABDO, HEPATO, DM_ESTAT],
    eaCaracteristico: 'Mialgia',
    distratoresEA: [D_TOSSE, D_FLUSH, D_OTO, D_COLELIT],
    contraindicacoes: ESTAT_CI,
    precaucoes: ESTAT_PREC,
    interacoes: ['Ciclosporina: aumenta exposição — limitar dose', 'Genfibrozila: evitar', 'Claritromicina: limitar dose (inibição de transportadores)', 'Ácido bempedoico: limitar pravastatina a 40 mg/dia', 'Sequestradores de ácidos biliares: administrar a pravastatina 1 h antes ou 4 h depois'],
    explicacaoFase2: 'A pravastatina é uma estatina hidrofílica: inibe a HMG-CoA redutase hepática e aumenta os receptores de LDL, com baixo potencial de interações pelo CYP450.',
    explicacaoFase3: 'A mialgia decorre da inibição da via do mevalonato no músculo esquelético; por ser hidrofílica e pouco penetrar no músculo, a pravastatina costuma ter perfil muscular favorável, mas o efeito de classe persiste.',
    referencias: [...RL, R_BULA('Pravacol — Bristol-Myers Squibb')],
    dataRevisao: DATA, validacao: VAL,
  },
  // ------------------------- EZETIMIBA -------------------------
  {
    id: 'ezetimiba', nome: 'Ezetimiba',
    sinonimos: ['ezetimibe', 'ezetimibo'],
    vinculos: [{
      grupoId: 'hipolipemiantes', classeId: 'inibidor-absorcao-colesterol',
      contexto: 'tratamento da hipercolesterolemia, em associação com estatina ou em monoterapia',
      explicacaoFase1: 'A ezetimiba é o fármaco de segunda etapa quando a estatina na dose máxima tolerada não atinge a meta de LDL-c; associada à sinvastatina reduziu eventos após síndrome coronariana aguda (estudo IMPROVE-IT).',
    }],
    mecanismo: 'Inibe seletivamente a proteína transportadora Niemann-Pick C1-Like 1 (NPC1L1) na borda em escova do enterócito, reduzindo a absorção de colesterol dietético e biliar em ~50%. A menor chegada de colesterol ao fígado aumenta os receptores de LDL. Sofre glicuronidação e circulação êntero-hepática. Reduz LDL-c em ~20% em monoterapia e ~25% adicionais com estatina.',
    indicacoes: ['Hipercolesterolemia primária (monoterapia ou com estatina)', 'Hipercolesterolemia familiar homozigótica (com estatina)', 'Sitosterolemia homozigótica'],
    tipoMolecula: 'pequena', pubchem: ['ezetimibe'],
    nomesComerciais: [ref('Zetia', 'MSD'), combo('Vytorin', 'ezetimiba + sinvastatina', 'MSD')],
    generico: true,
    eaComuns: [DIARREIA, DOR_ABD, ARTRALGIA, FADIGA, CEFALEIA],
    eaGraves: [TRANSAM, HIPERS],
    eaCaracteristico: 'Diarreia',
    distratoresEA: [D_TOSSE, D_FLUSH, D_OTO, D_HIPERK],
    contraindicacoes: ['Doença hepática ativa ou elevação persistente de transaminases quando associada à estatina', 'Insuficiência hepática moderada a grave'],
    precaucoes: ['Associada a estatina: dosar transaminases conforme recomendação para a estatina', 'Associação com fibrato: possível aumento do risco de colelitíase'],
    interacoes: ['Ciclosporina: aumento mútuo dos níveis', 'Colestiramina: reduz absorção (dar ezetimiba 2 h antes ou 4 h depois)', 'Fibratos: aumento da exposição à ezetimiba e possível colelitíase'],
    explicacaoFase2: 'A ezetimiba é um inibidor da absorção intestinal de colesterol: bloqueia o transportador NPC1L1 do intestino, de modo que menos colesterol chega ao fígado, que passa a retirar mais LDL do sangue.',
    explicacaoFase3: 'A ação é local no intestino e o perfil de efeitos adversos é muito favorável, semelhante ao placebo; os efeitos mais relatados são gastrointestinais, como diarreia e dor abdominal. Em associação com estatina, pode elevar transaminases.',
    referencias: [...RL, R_BULA('Zetia — MSD'), 'Cannon CP et al. Ezetimibe added to statin therapy after acute coronary syndromes (IMPROVE-IT). N Engl J Med. 2015;372:2387-97.'],
    dataRevisao: DATA, validacao: VAL,
  },
  // ------------------------- FIBRATOS -------------------------
  {
    id: 'fenofibrato', nome: 'Fenofibrato',
    sinonimos: ['fenofibrate', 'acido fenofibrico', 'fenofibric acid'],
    vinculos: [{
      grupoId: 'hipolipemiantes', classeId: 'fibrato',
      contexto: 'tratamento da hipertrigliceridemia e da dislipidemia mista',
      explicacaoFase1: 'O fenofibrato é indicado na hipertrigliceridemia, sobretudo grave (risco de pancreatite), e na dislipidemia mista; é o fibrato preferido quando é necessário associar com estatina.',
    }],
    mecanismo: 'Pró-fármaco convertido em ácido fenofíbrico, agonista do receptor nuclear PPAR-α. Aumenta a transcrição da lipoproteína lipase e da apoA-I/apoA-II e reduz a apoC-III, acelerando a hidrólise de VLDL e quilomícrons; aumenta a β-oxidação hepática de ácidos graxos. Reduz triglicerídeos em 30–50% e eleva HDL-c. Efeito uricosúrico discreto.',
    indicacoes: ['Hipertrigliceridemia grave', 'Dislipidemia mista (adjuvante à estatina quando TG persistem elevados)', 'Hipercolesterolemia quando estatina é contraindicada ou não tolerada'],
    tipoMolecula: 'pequena', pubchem: ['fenofibrate'],
    nomesComerciais: [ref('Lipidil', 'Abbott')],
    generico: true,
    eaComuns: [DISPEPSIA, DOR_ABD, TRANSAM, CREAT],
    eaGraves: [COLELIT, RABDO, PANCREAT, TEV],
    eaCaracteristico: 'Colelitíase',
    distratoresEA: [D_TOSSE, D_FLUSH, D_OTO, D_HIPERK],
    contraindicacoes: ['Insuficiência hepática, incluindo cirrose biliar primária', 'Doença da vesícula biliar preexistente', 'Insuficiência renal grave', 'Pancreatite crônica ou aguda (exceto a causada por hipertrigliceridemia grave)', 'Fotossensibilidade conhecida a fibratos ou cetoprofeno'],
    precaucoes: ['Monitorar transaminases e creatinina (elevação reversível da creatinina)', 'Ajustar dose na DRC moderada', 'Associação com estatina: vigiar sintomas musculares'],
    interacoes: ['Varfarina: potencialização do anticoagulante (reduzir dose e monitorar INR)', 'Estatinas: aumento do risco de miopatia (menor que com genfibrozila)', 'Ciclosporina: risco de nefrotoxicidade', 'Sequestradores de ácidos biliares: espaçar administração'],
    explicacaoFase2: 'O fenofibrato é um fibrato: ativa o receptor PPAR-α no fígado e nos tecidos, aumentando a lipase que degrada as lipoproteínas ricas em triglicerídeos.',
    explicacaoFase3: 'Ao ativar o PPAR-α, os fibratos aumentam a excreção biliar de colesterol e reduzem a síntese de ácidos biliares, tornando a bile supersaturada (litogênica) e favorecendo a formação de cálculos biliares.',
    referencias: [...RL, R_BULA('Lipidil — Abbott')],
    dataRevisao: DATA, validacao: VAL,
  },
  {
    id: 'ciprofibrato', nome: 'Ciprofibrato',
    sinonimos: ['ciprofibrate'],
    vinculos: [{
      grupoId: 'hipolipemiantes', classeId: 'fibrato',
      contexto: 'tratamento da hipertrigliceridemia e da dislipidemia mista',
      explicacaoFase1: 'O ciprofibrato é um fibrato de dose única diária usado na hipertrigliceridemia e na dislipidemia mista, especialmente quando os triglicerídeos estão muito elevados.',
    }],
    mecanismo: 'Agonista do PPAR-α de longa meia-vida, que aumenta a atividade da lipoproteína lipase, reduz a produção hepática de VLDL e a apoC-III e eleva o HDL-c. Reduz principalmente triglicerídeos, com redução moderada de LDL-c.',
    indicacoes: ['Hipertrigliceridemia endógena isolada ou associada a hipercolesterolemia (dislipidemia mista)', 'Hipercolesterolemia quando a estatina é inadequada ou não tolerada'],
    tipoMolecula: 'pequena', pubchem: ['ciprofibrate'],
    nomesComerciais: [marca('Oroxadin', 'Sanofi'), marca('Lipless')],
    generico: true,
    eaComuns: [DISPEPSIA, CEFALEIA, MIALGIA, TRANSAM],
    eaGraves: [RABDO, COLELIT, HEPATO],
    eaCaracteristico: 'Miopatia e rabdomiólise',
    distratoresEA: [D_TOSSE, D_FLUSH, D_OTO, D_HIPERK],
    contraindicacoes: ['Insuficiência hepática ou renal grave', 'Gestação e amamentação', 'Uso concomitante com outro fibrato'],
    precaucoes: ['Associação com estatina: risco de miopatia — avaliar necessidade e monitorar CK se sintomas', 'Hipotireoidismo não tratado aumenta risco miotóxico'],
    interacoes: ['Estatinas: aumento do risco de rabdomiólise', 'Varfarina: potencialização do anticoagulante', 'Antidiabéticos orais: possível potencialização da hipoglicemia'],
    explicacaoFase2: 'O ciprofibrato é um fibrato: agonista do PPAR-α que aumenta a remoção de lipoproteínas ricas em triglicerídeos e reduz a produção hepática de VLDL.',
    explicacaoFase3: 'Os fibratos têm toxicidade muscular própria, que aumenta muito quando associados a estatinas, em idosos, no hipotireoidismo e na insuficiência renal; pode haver miopatia e, raramente, rabdomiólise.',
    referencias: [...RL],
    dataRevisao: DATA, validacao: VAL,
  },
  {
    id: 'bezafibrato', nome: 'Bezafibrato',
    sinonimos: ['bezafibrate'],
    vinculos: [{
      grupoId: 'hipolipemiantes', classeId: 'fibrato',
      contexto: 'tratamento da hipertrigliceridemia e da dislipidemia mista',
      explicacaoFase1: 'O bezafibrato é um fibrato usado na hipertrigliceridemia e na dislipidemia mista, com redução de triglicerídeos e aumento de HDL-c.',
    }],
    mecanismo: 'Agonista pan-PPAR (predominantemente α, com alguma ação em δ e γ), que aumenta a lipoproteína lipase e a oxidação hepática de ácidos graxos e reduz a síntese de VLDL. Eliminação predominantemente renal, exigindo ajuste de dose na DRC.',
    indicacoes: ['Hipertrigliceridemia', 'Dislipidemia mista', 'Hipercolesterolemia quando a estatina é inadequada'],
    tipoMolecula: 'pequena', pubchem: ['bezafibrate'],
    nomesComerciais: [marca('Cedur')],
    generico: false,
    eaComuns: [DISPEPSIA, DOR_ABD, TRANSAM, CREAT],
    eaGraves: [COLELIT, RABDO],
    eaCaracteristico: 'Colelitíase',
    distratoresEA: [D_TOSSE, D_FLUSH, D_OTO, D_HIPERK],
    contraindicacoes: ['Doença hepática (exceto esteatose)', 'Doença da vesícula biliar', 'Insuficiência renal grave / diálise', 'Gestação'],
    precaucoes: ['Ajustar dose conforme função renal', 'Associação com estatina: monitorar sintomas musculares'],
    interacoes: ['Varfarina: potencialização do anticoagulante', 'Estatinas: risco aumentado de miopatia', 'Colestiramina: espaçar administração em ≥2 h', 'Sulfonilureias e insulina: possível potencialização do efeito hipoglicemiante'],
    explicacaoFase2: 'O bezafibrato é um fibrato: ativa receptores PPAR, sobretudo o α, aumentando a degradação das lipoproteínas ricas em triglicerídeos.',
    explicacaoFase3: 'Como os demais fibratos, aumenta a excreção de colesterol na bile e reduz os ácidos biliares, tornando a bile litogênica e aumentando o risco de colelitíase.',
    referencias: [...RL],
    dataRevisao: DATA, validacao: VAL,
  },
  // ------------------------- ANTI-PCSK9 -------------------------
  {
    id: 'evolocumabe', nome: 'Evolocumabe',
    sinonimos: ['evolocumab', 'evolocumabe'],
    vinculos: [{
      grupoId: 'hipolipemiantes', classeId: 'anti-pcsk9-anticorpo',
      contexto: 'redução intensiva do LDL-c em muito alto risco cardiovascular e hipercolesterolemia familiar',
      explicacaoFase1: 'O evolocumabe é usado quando a estatina na dose máxima tolerada associada à ezetimiba não atinge a meta de LDL-c em pacientes de muito alto risco ou com hipercolesterolemia familiar; reduziu eventos cardiovasculares no estudo FOURIER.',
    }],
    mecanismo: 'Anticorpo monoclonal IgG2 totalmente humano que se liga à PCSK9 circulante e impede sua ligação ao receptor de LDL. Sem PCSK9, o receptor não é direcionado à degradação lisossomal e retorna à superfície do hepatócito, aumentando a depuração de LDL-c em ~60% adicionais à estatina. Administração subcutânea a cada 2 semanas ou mensal.',
    indicacoes: ['Doença cardiovascular aterosclerótica estabelecida (redução de risco de eventos)', 'Hipercolesterolemia primária (incluindo familiar heterozigótica) e dislipidemia mista, associada a estatina ± ezetimiba ou em intolerantes', 'Hipercolesterolemia familiar homozigótica'],
    tipoMolecula: 'anticorpo', pubchem: [],
    nomesComerciais: [ref('Repatha', 'Amgen')],
    generico: false,
    eaComuns: [INJ, NASOF, ARTRALGIA],
    eaGraves: [HIPERS],
    eaCaracteristico: 'Reação no local da injeção',
    distratoresEA: [D_TOSSE, D_FLUSH, D_COLELIT, D_HIPOK],
    contraindicacoes: ['Hipersensibilidade ao evolocumabe ou excipientes'],
    precaucoes: ['Armazenar refrigerado; aplicar após atingir temperatura ambiente', 'Dados limitados em gestação', 'Alto custo — uso conforme critérios de diretriz e protocolos de acesso'],
    interacoes: ['Sem interações farmacocinéticas relevantes (não metabolizado pelo CYP450)'],
    explicacaoFase2: 'O evolocumabe é um anticorpo monoclonal anti-PCSK9: sequestra a proteína PCSK9, que normalmente destrói o receptor de LDL; com mais receptores, o fígado remove mais LDL do sangue.',
    explicacaoFase3: 'Por ser um anticorpo de aplicação subcutânea e agir fora das células, praticamente não tem toxicidade muscular ou hepática; os efeitos mais comuns são reações locais (dor, eritema) e nasofaringite.',
    referencias: [...RL, R_BULA('Repatha — Amgen'), 'Sabatine MS et al. Evolocumab and clinical outcomes in patients with cardiovascular disease (FOURIER). N Engl J Med. 2017;376:1713-22.'],
    dataRevisao: DATA, validacao: VAL,
  },
  {
    id: 'alirocumabe', nome: 'Alirocumabe',
    sinonimos: ['alirocumab', 'alirocumabe'],
    vinculos: [{
      grupoId: 'hipolipemiantes', classeId: 'anti-pcsk9-anticorpo',
      contexto: 'redução intensiva do LDL-c em muito alto risco cardiovascular e hipercolesterolemia familiar',
      explicacaoFase1: 'O alirocumabe é usado em pacientes de muito alto risco ou com hipercolesterolemia familiar que não atingem a meta de LDL-c com estatina e ezetimiba; reduziu eventos após síndrome coronariana aguda no estudo ODYSSEY OUTCOMES.',
    }],
    mecanismo: 'Anticorpo monoclonal IgG1 totalmente humano dirigido contra a PCSK9. Ao neutralizar a PCSK9, preserva os receptores de LDL na membrana do hepatócito, que reciclam e captam mais LDL-c do plasma. Aplicação subcutânea a cada 2 ou 4 semanas.',
    indicacoes: ['Doença cardiovascular aterosclerótica estabelecida (redução de risco de eventos)', 'Hipercolesterolemia primária (incluindo familiar heterozigótica) e dislipidemia mista, associada a estatina ± ezetimiba ou em intolerantes'],
    tipoMolecula: 'anticorpo', pubchem: [],
    nomesComerciais: [ref('Praluent', 'Sanofi')],
    generico: false,
    eaComuns: [INJ, NASOF],
    eaGraves: [HIPERS],
    eaCaracteristico: 'Reação no local da injeção',
    distratoresEA: [D_TOSSE, D_FLUSH, D_COLELIT, D_HIPOK],
    contraindicacoes: ['Hipersensibilidade ao alirocumabe ou excipientes'],
    precaucoes: ['Armazenar refrigerado', 'Dados limitados em gestação', 'Alto custo — uso conforme critérios de diretriz'],
    interacoes: ['Sem interações farmacocinéticas relevantes; estatinas aumentam a PCSK9 e podem reduzir discretamente a meia-vida do anticorpo, sem impacto clínico'],
    explicacaoFase2: 'O alirocumabe é um anticorpo monoclonal anti-PCSK9: bloqueia a proteína que degrada o receptor de LDL, aumentando a remoção do LDL-c circulante.',
    explicacaoFase3: 'A ação é extracelular e específica, sem efeitos sobre a via do mevalonato; por isso, não há miotoxicidade típica das estatinas, e o efeito mais característico é a reação no local da aplicação subcutânea.',
    referencias: [...RL, R_BULA('Praluent — Sanofi'), 'Schwartz GG et al. Alirocumab and cardiovascular outcomes after acute coronary syndrome (ODYSSEY OUTCOMES). N Engl J Med. 2018;379:2097-107.'],
    dataRevisao: DATA, validacao: VAL,
  },
  // ------------------------- siRNA -------------------------
  {
    id: 'inclisirana', nome: 'Inclisirana',
    sinonimos: ['inclisiran', 'inclisiran sodium', 'inclisirana sodica'],
    vinculos: [{
      grupoId: 'hipolipemiantes', classeId: 'sirna-pcsk9',
      contexto: 'redução do LDL-c em pacientes que não atingem a meta com estatina, com aplicação semestral',
      explicacaoFase1: 'A inclisirana reduz o LDL-c em ~50% com apenas duas aplicações por ano (após as doses iniciais), sendo opção adicional à estatina em pacientes de alto/muito alto risco ou intolerantes; estudos de desfecho cardiovascular estão em andamento.',
    }],
    mecanismo: 'RNA interferente curto (siRNA) de dupla fita conjugado a N-acetilgalactosamina (GalNAc), que direciona a captação seletiva pelo hepatócito via receptor de asialoglicoproteína. No citoplasma, a fita-guia é incorporada ao complexo RISC e cliva o RNA mensageiro da PCSK9, reduzindo sua síntese e aumentando os receptores de LDL. Aplicação SC no dia 0, no 3º mês e depois a cada 6 meses.',
    indicacoes: ['Hipercolesterolemia primária (heterozigótica familiar e não familiar) ou dislipidemia mista em adultos, associada a estatina ± outros hipolipemiantes, ou em intolerantes a estatina'],
    tipoMolecula: 'peptideo', pubchem: [],
    nomesComerciais: [ref('Sybrava', 'Novartis', 'nome internacional Leqvio; aplicação por profissional de saúde')],
    generico: false,
    eaComuns: [INJ, ARTRALGIA, NASOF],
    eaGraves: [HIPERS],
    eaCaracteristico: 'Reação no local da injeção',
    distratoresEA: [D_TOSSE, D_FLUSH, D_COLELIT, D_HIPOK],
    contraindicacoes: ['Hipersensibilidade à inclisirana ou excipientes'],
    precaucoes: ['Insuficiência hepática grave: sem dados', 'Gestação: evitar por falta de dados'],
    interacoes: ['Sem interações relevantes conhecidas (não é substrato do CYP450 nem de transportadores usuais)'],
    explicacaoFase2: 'A inclisirana é um siRNA anti-PCSK9: em vez de neutralizar a proteína como os anticorpos, silencia o gene no fígado, degradando o RNA mensageiro da PCSK9 para que ela não seja produzida.',
    explicacaoFase3: 'A captação é quase exclusivamente hepática (conjugado GalNAc), por isso a toxicidade sistêmica é baixa; o efeito adverso mais característico é a reação no local da injeção subcutânea, leve e transitória.',
    referencias: [...RL, 'Ray KK et al. Two phase 3 trials of inclisiran in patients with elevated LDL cholesterol (ORION-10/11). N Engl J Med. 2020;382:1507-19.', R_BULA('Leqvio/Sybrava — Novartis; EMA SmPC')],
    dataRevisao: DATA, validacao: VAL,
  },
  // ------------------------- ÁCIDO BEMPEDOICO -------------------------
  {
    id: 'acido-bempedoico', nome: 'Ácido bempedoico',
    sinonimos: ['bempedoic acid', 'acido bempedoico', 'ETC-1002'],
    vinculos: [{
      grupoId: 'hipolipemiantes', classeId: 'inibidor-acl',
      contexto: 'redução do LDL-c em intolerantes a estatina ou como adjuvante à estatina',
      explicacaoFase1: 'O ácido bempedoico é uma alternativa oral para quem não tolera estatinas ou precisa de redução adicional de LDL-c; reduziu eventos cardiovasculares em intolerantes a estatina no estudo CLEAR Outcomes.',
    }],
    mecanismo: 'Pró-fármaco ativado no fígado pela acil-CoA sintetase de cadeia muito longa 1 (ACSVL1) a bempedoil-CoA, que inibe a ATP-citrato liase, enzima que gera acetil-CoA citosólico a montante da HMG-CoA redutase. Reduz a síntese hepática de colesterol e aumenta os receptores de LDL. Como a ACSVL1 praticamente não existe no músculo esquelético, o fármaco não é ativado ali, com baixo risco de miotoxicidade. Reduz LDL-c em ~17–25%.',
    indicacoes: ['Hipercolesterolemia primária e dislipidemia mista em adultos (com estatina ou em intolerantes, isolado ou com ezetimiba)', 'Redução do risco cardiovascular em pacientes de alto risco incapazes de usar estatina (indicação FDA/EMA)'],
    tipoMolecula: 'pequena', pubchem: ['bempedoic acid'],
    nomesComerciais: [],
    generico: false,
    eaComuns: [HIPERURIC, ARTRALGIA, ANEMIA, TRANSAM],
    eaGraves: [TENDAO, COLELIT, CREAT],
    eaCaracteristico: 'Hiperuricemia',
    distratoresEA: [D_TOSSE, D_FLUSH, D_OTO, D_GINECO],
    contraindicacoes: ['Gestação e amamentação', 'Uso com sinvastatina > 40 mg/dia (EMA)'],
    precaucoes: ['Gota ou hiperuricemia prévia: monitorar ácido úrico', 'Ruptura de tendão prévia, uso de fluoroquinolonas ou corticoide sistêmico: maior risco tendíneo', 'Insuficiência renal grave: dados limitados'],
    interacoes: ['Sinvastatina: limitar a 20 mg/dia (FDA) — aumento da exposição', 'Pravastatina: limitar a 40 mg/dia', 'Substratos de OATP1B1/1B3 (ex.: estatinas): aumento discreto de exposição'],
    explicacaoFase2: 'O ácido bempedoico é um inibidor da ATP-citrato liase: bloqueia uma etapa anterior à das estatinas na fabricação de colesterol no fígado, aumentando a captação de LDL do sangue.',
    explicacaoFase3: 'O ácido bempedoico e seu metabólito competem com o ácido úrico pelo transportador renal OAT2, reduzindo sua excreção; isso eleva o ácido úrico e aumenta a incidência de gota, sobretudo em quem já tem hiperuricemia.',
    referencias: [...RL, 'Nissen SE et al. Bempedoic acid and cardiovascular outcomes in statin-intolerant patients (CLEAR Outcomes). N Engl J Med. 2023;388:1353-64.', R_BULA('Nexletol — FDA label; Nilemdo — EMA SmPC')],
    dataRevisao: DATA, validacao: VAL,
  },
];

// =====================================================================
// RESUMOS
// =====================================================================
const resumoHAS: ResumoGrupo = {
  grupoId: 'antihipertensivos',
  visaoGeral: [
    'A hipertensão arterial (HA) é definida pelas Diretrizes Brasileiras de 2020 como PA de consultório ≥ 140/90 mmHg confirmada em medidas repetidas, idealmente complementada por MAPA ou MRPA. É o principal fator de risco modificável para AVC, doença arterial coronariana, insuficiência cardíaca, doença renal crônica e fibrilação atrial. A meta geral é PA < 140/90 mmHg e, quando tolerado, < 130/80 mmHg, sobretudo em pacientes de alto risco cardiovascular.',
    'A pressão arterial é o produto do débito cardíaco pela resistência vascular periférica, regulados pelo sistema nervoso simpático, pelo sistema renina-angiotensina-aldosterona (SRAA) e pelo manejo renal de sódio e água. Cada classe atua em um desses determinantes: IECA e BRA bloqueiam o SRAA; diuréticos reduzem volume e resistência; BCC relaxam o músculo liso arteriolar; betabloqueadores reduzem débito cardíaco e renina; simpatolíticos centrais reduzem o tônus simpático; vasodilatadores diretos relaxam a arteríola.',
    'As cinco classes preferenciais para o tratamento inicial e de manutenção são: diuréticos tiazídicos/tiazídicos-símiles, BCC diidropiridínicos, IECA, BRA e — quando há indicação específica — betabloqueadores. Na maioria dos pacientes (estágio 1 de alto risco e estágios 2 e 3) o tratamento já começa com associação de dois fármacos de classes complementares, preferencialmente em comprimido único, o que acelera o controle e melhora a adesão.',
    'Espironolactona é o quarto fármaco preferencial na hipertensão resistente; simpatolíticos centrais (clonidina), vasodilatadores diretos (hidralazina) e α-bloqueadores ficam reservados a situações especiais ou à hipertensão refratária. A gestação muda completamente a escolha: IECA, BRA e inibidores diretos da renina são contraindicados, e metildopa, nifedipino e hidralazina passam a ser os fármacos de referência.',
  ],
  mecanismos: [
    { titulo: 'IECA (enalapril, captopril, lisinopril)', texto: 'Inibem a enzima conversora de angiotensina, que transforma angiotensina I em angiotensina II e degrada bradicinina. Com menos angiotensina II há vasodilatação, menor secreção de aldosterona e de vasopressina e menor estímulo simpático; o acúmulo de bradicinina contribui para a vasodilatação via óxido nítrico e prostaglandinas. Reduzem a pressão intraglomerular por dilatação da arteríola eferente, o que explica a nefroproteção em longo prazo e a queda inicial da TFG. Protegem contra remodelamento ventricular e são pilares da IC com fração de ejeção reduzida. O "escape da aldosterona" e vias alternativas (quimases) limitam parcialmente o bloqueio.' },
    { titulo: 'BRA (losartana, valsartana, olmesartana)', texto: 'Bloqueiam o receptor AT1, que medeia vasoconstrição, liberação de aldosterona, retenção de sódio, hipertrofia e fibrose. Agem independentemente da via de formação da angiotensina II (inclusive por quimases). A angiotensina II acumulada estimula receptores AT2, com possíveis efeitos vasodilatadores. Como não inibem a ECA, não aumentam bradicinina e quase não causam tosse; os benefícios renais e cardiovasculares são semelhantes aos dos IECA. Nunca devem ser associados a IECA (duplo bloqueio aumenta hipercalemia e lesão renal sem benefício).' },
    { titulo: 'Bloqueadores dos canais de cálcio diidropiridínicos (anlodipino, nifedipino)', texto: 'Bloqueiam canais de cálcio tipo L voltagem-dependentes, reduzindo a entrada de Ca2+ e a contração do músculo liso vascular. Os diidropiridínicos são vasosseletivos (arteríolas), com pouco efeito sobre nó sinusal, condução AV e contratilidade nas doses usuais — ao contrário dos não diidropiridínicos (verapamil, diltiazem), que deprimem o coração. A vasodilatação arteriolar sem venodilatação causa edema maleolar; a queda rápida da PA (nifedipino de liberação imediata) gera taquicardia reflexa. São muito eficazes em idosos e afrodescendentes e neutros metabolicamente.' },
    { titulo: 'Betabloqueadores (atenolol, metoprolol, carvedilol, propranolol)', texto: 'Antagonizam receptores β-adrenérgicos: o bloqueio β1 reduz frequência cardíaca, contratilidade, débito cardíaco e liberação de renina pelo aparelho justaglomerular. Diferem em seletividade (β1-seletivos: atenolol, metoprolol, bisoprolol; não seletivos: propranolol), lipossolubilidade (propranolol e metoprolol penetram no SNC; atenolol é hidrofílico e renal) e ações adicionais (carvedilol bloqueia α1 e vasodilata; nebivolol libera óxido nítrico). Na HA não complicada são menos eficazes na prevenção de AVC, mas têm indicação preferencial em angina, pós-infarto, IC com FE reduzida (carvedilol, metoprolol succinato, bisoprolol), controle de frequência na FA e em gestantes que planejam engravidar.' },
    { titulo: 'Diuréticos (tiazídicos, de alça e poupadores de potássio)', texto: 'Os tiazídicos (hidroclorotiazida) e tiazídicos-símiles (clortalidona, indapamida) inibem o cotransportador Na+/Cl− do túbulo distal; reduzem inicialmente o volume e, cronicamente, a resistência periférica, com efeito anti-hipertensivo máximo em doses baixas (efeito platô) e perda de eficácia quando TFG < 30. Os de alça (furosemida) inibem o NKCC2 da alça de Henle, têm natriurese intensa e curta e são preferidos na congestão e na DRC avançada. A espironolactona antagoniza o receptor mineralocorticoide no ducto coletor, poupando potássio; é o 4º fármaco na HA resistente, pilar da IC com FE reduzida e tratamento do hiperaldosteronismo. Tiazídicos e de alça causam hipocalemia; a espironolactona causa hipercalemia — a associação compensa parcialmente esse efeito.' },
    { titulo: 'Simpatolíticos centrais e vasodilatadores diretos (clonidina, metildopa, hidralazina)', texto: 'Clonidina e metildopa estimulam receptores α2 no tronco encefálico (a metildopa via seu metabólito α-metilnoradrenalina, falso neurotransmissor), reduzindo o efluxo simpático, a resistência periférica e a frequência cardíaca. Causam sedação e boca seca; a clonidina tem rebote grave na suspensão abrupta e a metildopa pode causar hepatite e anemia hemolítica autoimune, mas é segura na gestação. A hidralazina relaxa diretamente a arteríola, provocando taquicardia reflexa e retenção de sódio (deve ser associada a betabloqueador e diurético em uso crônico) e, em acetiladores lentos, síndrome lúpus-like. Todos ficam reservados para HA resistente/refratária ou situações especiais (gestação, IC com nitrato).' },
  ],
  fluxogramas: [
    {
      titulo: 'Sistema renina-angiotensina-aldosterona e pontos de ação',
      passos: [
        'Queda da perfusão renal, menor oferta de Na+ à mácula densa ou estímulo β1 simpático (← betabloqueador)',
        'Células justaglomerulares liberam renina (← inibidor direto da renina: alisquireno)',
        'Angiotensinogênio (fígado) → (renina) → Angiotensina I',
        'Angiotensina I → (ECA ← IECA; a ECA também degrada bradicinina) → Angiotensina II',
        'Angiotensina II → receptor AT1 (← BRA)',
        'Efeitos AT1: vasoconstrição arteriolar, liberação de aldosterona, ADH e sede, estímulo simpático, hipertrofia e fibrose',
        'Aldosterona → receptor mineralocorticoide no ducto coletor (← espironolactona) → reabsorção de Na+ e água, secreção de K+ e H+',
        'Resultado: aumento da volemia e da resistência periférica → aumento da PA',
      ],
    },
    {
      titulo: 'Néfron: onde agem os diuréticos',
      passos: [
        'Túbulo proximal: reabsorve ~65% do Na+ filtrado (alvo dos inibidores da anidrase carbônica e dos iSGLT2)',
        'Ramo ascendente espesso da alça de Henle: cotransportador Na+/K+/2Cl− (NKCC2) reabsorve ~25% do Na+ (← furosemida) → maior potência natriurética, perda de Ca2+ e Mg2+',
        'Túbulo contorcido distal: cotransportador Na+/Cl− (NCC) reabsorve ~5–10% do Na+ (← hidroclorotiazida, clortalidona, indapamida) → aumenta reabsorção de Ca2+',
        'Ducto coletor: canal ENaC regulado pela aldosterona (← espironolactona no receptor mineralocorticoide; ← amilorida no ENaC)',
        'Maior oferta de Na+ ao ducto coletor (alça e tiazídicos) → mais troca por K+ e H+ → hipocalemia e alcalose metabólica',
        'Bloqueio da aldosterona (espironolactona) → retenção de K+ → hipercalemia',
      ],
    },
    {
      titulo: 'Reflexos compensatórios aos vasodilatadores',
      passos: [
        'Vasodilatador arteriolar (hidralazina, nifedipino de liberação imediata) → queda da resistência periférica e da PA',
        'Barorreceptores carotídeos e aórticos detectam a queda → ativação simpática',
        'Simpático → taquicardia reflexa e aumento do débito cardíaco (← betabloqueador)',
        'Menor perfusão renal + estímulo β1 → liberação de renina → angiotensina II e aldosterona',
        'Aldosterona → retenção de sódio e água → edema e perda de efeito (← diurético)',
        'Conclusão: vasodilatador direto em uso crônico = associação com betabloqueador + diurético',
      ],
    },
  ],
  eaFrequentes: [
    { efeito: 'Tosse seca', classes: 'IECA', mecanismo: 'Acúmulo de bradicinina e substância P nas vias aéreas pela inibição da ECA (cininase II); 5–20% dos pacientes; resolve com a troca por BRA.' },
    { efeito: 'Edema maleolar', classes: 'BCC diidropiridínicos', mecanismo: 'Vasodilatação arteriolar pré-capilar sem dilatação venosa, aumentando a pressão hidrostática capilar; dose-dependente, não responde a diurético e melhora com IECA/BRA associado.' },
    { efeito: 'Cefaleia, rubor e taquicardia reflexa', classes: 'BCC diidropiridínicos (sobretudo nifedipino de liberação imediata) e hidralazina', mecanismo: 'Vasodilatação e ativação barorreflexa do simpático.' },
    { efeito: 'Bradicardia, fadiga, extremidades frias, disfunção erétil', classes: 'Betabloqueadores', mecanismo: 'Bloqueio β1 cronotrópico; bloqueio β2 vascular (não seletivos) e redução do débito cardíaco.' },
    { efeito: 'Hipocalemia, hiponatremia, hiperuricemia e hiperglicemia', classes: 'Diuréticos tiazídicos/tiazídicos-símiles e de alça', mecanismo: 'Maior oferta distal de Na+ (troca por K+), prejuízo da diluição urinária, competição com a secreção tubular de urato e hipocalemia reduzindo a secreção de insulina.' },
    { efeito: 'Ginecomastia e irregularidade menstrual', classes: 'Espironolactona', mecanismo: 'Antagonismo de receptores androgênicos e ação sobre receptores de progesterona.' },
    { efeito: 'Sedação e boca seca', classes: 'Simpatolíticos centrais', mecanismo: 'Estimulação α2 central e redução do tônus simpático e salivar.' },
    { efeito: 'Hipotensão ortostática', classes: 'Carvedilol, α-bloqueadores, simpatolíticos centrais, diuréticos em idosos', mecanismo: 'Bloqueio α1 ou redução simpática impedem a vasoconstrição postural; depleção de volume.' },
  ],
  eaGraves: [
    { efeito: 'Angioedema', classes: 'IECA (raro com BRA)', mecanismo: 'Acúmulo de bradicinina; mais frequente em afrodescendentes e com uso de sacubitril, gliptinas ou inibidores de mTOR; pode obstruir a via aérea.' },
    { efeito: 'Hipercalemia', classes: 'IECA, BRA, espironolactona', mecanismo: 'Redução da aldosterona ou bloqueio do seu receptor diminui a secreção de K+; risco maior em DRC, diabetes, idosos e com AINEs ou suplementos de potássio.' },
    { efeito: 'Lesão renal aguda', classes: 'IECA e BRA (estenose bilateral de artéria renal, hipovolemia, AINEs)', mecanismo: 'Perda da vasoconstrição eferente que mantém a filtração quando a perfusão renal está reduzida.' },
    { efeito: 'Fetotoxicidade', classes: 'IECA, BRA, inibidor direto da renina', mecanismo: 'Bloqueio do SRAA fetal no 2º e 3º trimestres causa oligoidrâmnio, hipoplasia pulmonar, displasia tubular renal e hipocalvária.' },
    { efeito: 'Bloqueio AV, broncoespasmo e mascaramento de hipoglicemia', classes: 'Betabloqueadores (broncoespasmo sobretudo com não seletivos)', mecanismo: 'Bloqueio β1 nodal; bloqueio β2 brônquico; supressão de taquicardia e tremor adrenérgicos da hipoglicemia.' },
    { efeito: 'Ototoxicidade', classes: 'Diuréticos de alça', mecanismo: 'Inibição do NKCC1 da estria vascular; risco com doses IV altas e rápidas e associação a aminoglicosídeos.' },
    { efeito: 'Hipertensão rebote', classes: 'Clonidina (também betabloqueadores na retirada abrupta)', mecanismo: 'Descarga simpática após suspensão de supressão adrenérgica crônica.' },
    { efeito: 'Anemia hemolítica autoimune e hepatite', classes: 'Metildopa', mecanismo: 'Indução de autoanticorpos IgG contra hemácias (Coombs positivo) e lesão hepática imunoalérgica.' },
    { efeito: 'Síndrome lúpus-like', classes: 'Hidralazina', mecanismo: 'Indução de autoanticorpos (FAN, anti-histona), sobretudo em acetiladores lentos e doses altas.' },
    { efeito: 'Enteropatia espru-símile', classes: 'Olmesartana', mecanismo: 'Atrofia vilositária de provável base imunológica; diarreia crônica grave e perda de peso, reversíveis com a suspensão.' },
  ],
  primeirasLinhas: [
    { condicao: 'HA estágio 1 de risco baixo/moderado; idosos frágeis ou ≥ 80 anos', recomendacao: 'Monoterapia com tiazídico/tiazídico-símile, BCC diidropiridínico, IECA ou BRA, associada a mudança de estilo de vida.', observacao: 'Betabloqueador apenas se houver indicação específica.', fonte: 'Diretrizes Brasileiras de Hipertensão Arterial 2020 (SBC/SBH/SBN)' },
    { condicao: 'HA estágio 1 de alto risco e estágios 2 e 3', recomendacao: 'Iniciar com associação de dois fármacos, preferencialmente em comprimido único: IECA ou BRA + BCC diidropiridínico, ou IECA ou BRA + diurético tiazídico/tiazídico-símile.', observacao: 'Se não controlar: combinação tripla IECA/BRA + BCC + tiazídico.', fonte: 'Diretrizes Brasileiras de Hipertensão Arterial 2020 (SBC/SBH/SBN)' },
    { condicao: 'Hipertensão resistente (PA não controlada com 3 fármacos em dose otimizada, incluindo diurético)', recomendacao: 'Adicionar espironolactona como 4º fármaco; considerar trocar hidroclorotiazida por clortalidona ou indapamida.', observacao: 'Depois: betabloqueador, simpatolítico central (clonidina) ou vasodilatador direto (hidralazina). Investigar causas secundárias e adesão.', fonte: 'Diretrizes Brasileiras de Hipertensão Arterial 2020 (SBC/SBH/SBN)' },
    { condicao: 'Diabetes mellitus', recomendacao: 'IECA ou BRA (obrigatoriamente se houver albuminúria), geralmente associado a BCC ou tiazídico.', observacao: 'Nunca associar IECA + BRA. Meta < 130/80 mmHg se tolerada.', fonte: 'Diretrizes Brasileiras de Hipertensão Arterial 2020; Diretriz SBD' },
    { condicao: 'Doença renal crônica', recomendacao: 'IECA ou BRA em dose máxima tolerada quando há albuminúria; diurético de alça (furosemida) substitui o tiazídico quando a TFG < 30 mL/min/1,73 m².', observacao: 'Aceitar elevação de creatinina de até ~30% e monitorar potássio.', fonte: 'Diretrizes Brasileiras de Hipertensão Arterial 2020 (SBC/SBH/SBN)' },
    { condicao: 'Insuficiência cardíaca com fração de ejeção reduzida', recomendacao: 'IECA ou BRA (ou sacubitril/valsartana) + betabloqueador com evidência (carvedilol, metoprolol succinato ou bisoprolol) + espironolactona (+ iSGLT2); diurético de alça para congestão.', observacao: 'Hidralazina + dinitrato de isossorbida em afrodescendentes ou intolerantes a IECA/BRA. Evitar BCC não diidropiridínicos.', fonte: 'Diretrizes Brasileiras de Hipertensão Arterial 2020; Diretriz Brasileira de IC 2021' },
    { condicao: 'Doença arterial coronariana / pós-infarto', recomendacao: 'Betabloqueador + IECA (ou BRA); BCC diidropiridínico de longa ação se angina persistir ou PA não controlada.', fonte: 'Diretrizes Brasileiras de Hipertensão Arterial 2020 (SBC/SBH/SBN)' },
    { condicao: 'Gestação (hipertensão crônica, gestacional ou pré-eclâmpsia)', recomendacao: 'Metildopa (1ª escolha), nifedipino de liberação prolongada ou betabloqueador (exceto atenolol) para manutenção oral; na crise hipertensiva: hidralazina IV ou nifedipino oral.', observacao: 'IECA, BRA e alisquireno são contraindicados. Sulfato de magnésio para prevenção/tratamento da eclâmpsia (não é anti-hipertensivo).', fonte: 'Diretrizes Brasileiras de Hipertensão Arterial 2020; Protocolo FEBRASGO de pré-eclâmpsia' },
    { condicao: 'Afrodescendentes', recomendacao: 'Preferir tiazídico ou BCC diidropiridínico, isolados ou em associação com IECA/BRA.', observacao: 'Menor resposta à monoterapia com IECA/BRA/betabloqueador e maior risco de angioedema com IECA.', fonte: 'Diretrizes Brasileiras de Hipertensão Arterial 2020 (SBC/SBH/SBN)' },
    { condicao: 'Hiperaldosteronismo primário', recomendacao: 'Espironolactona (ou eplerenona) quando a cirurgia não é indicada ou na doença bilateral.', fonte: 'Diretrizes Brasileiras de Hipertensão Arterial 2020 (SBC/SBH/SBN)' },
  ],
  contraindicacoes: [
    'IECA, BRA e alisquireno: gestação, angioedema prévio (IECA), estenose bilateral de artérias renais, hipercalemia; nunca associar IECA + BRA',
    'Betabloqueadores: asma (especialmente não seletivos), BAV de 2º/3º grau, bradicardia sintomática, IC descompensada; atenolol na gestação',
    'BCC diidropiridínicos: estenose aórtica grave, choque; nifedipino de liberação imediata em síndrome coronariana aguda e na urgência hipertensiva (via sublingual)',
    'Tiazídicos: gota sintomática, hiponatremia/hipocalemia graves, hipersensibilidade a sulfonamidas; pouca eficácia com TFG < 30',
    'Espironolactona: hipercalemia, DRC grave, doença de Addison',
    'Clonidina: má adesão (rebote), bradiarritmias; metildopa: hepatopatia ativa, uso de IMAO; hidralazina: lúpus, coronariopatia sem betabloqueio',
  ],
  interacoes: [
    'IECA/BRA + espironolactona/suplementos de K+/trimetoprima: hipercalemia — monitorar potássio',
    'IECA/BRA + diurético + AINE ("triple whammy"): lesão renal aguda; AINEs reduzem o efeito de praticamente todos os anti-hipertensivos',
    'IECA/BRA/tiazídicos/alça + lítio: aumento da litemia e toxicidade',
    'Betabloqueador + verapamil/diltiazem: bradicardia grave, BAV e depressão miocárdica',
    'Betabloqueador + insulina/sulfonilureia: mascaramento da hipoglicemia',
    'Clonidina + betabloqueador: na retirada, suspender primeiro o betabloqueador',
    'Tiazídicos/alça + digoxina ou fármacos que prolongam QT: hipocalemia aumenta risco de arritmias',
    'Furosemida + aminoglicosídeos: ototoxicidade e nefrotoxicidade aditivas',
    'BCC (anlodipino) + sinvastatina: limitar sinvastatina a 20 mg/dia; inibidores do CYP3A4 elevam níveis dos diidropiridínicos',
  ],
  comparacoes: [
    { titulo: 'IECA × BRA', texto: 'Ambos bloqueiam o SRAA e têm benefícios cardiovasculares e renais semelhantes. O IECA impede a formação de angiotensina II e aumenta a bradicinina (tosse em até 20%, angioedema); o BRA bloqueia o receptor AT1, não altera a bradicinina e tem a melhor tolerabilidade entre os anti-hipertensivos. Compartilham hipercalemia, piora renal e fetotoxicidade. Não devem ser associados.' },
    { titulo: 'Enalapril × captopril × lisinopril', texto: 'Captopril: ativo, ação curta (2–3 tomadas/dia), grupo sulfidrila (disgeusia, exantema, neutropenia), útil na urgência hipertensiva oral. Enalapril: pró-fármaco (enalaprilato), 1–2 tomadas, padrão em IC e na RENAME. Lisinopril: ativo, hidrofílico, não metabolizado pelo fígado, eliminação renal e dose única diária.' },
    { titulo: 'Losartana × valsartana × olmesartana', texto: 'Losartana: pró-fármaco parcial (EXP-3174), efeito uricosúrico, evidência em nefropatia diabética e HVE. Valsartana: ativa, evidência em IC e pós-infarto, componente do sacubitril/valsartana. Olmesartana: pró-fármaco de alta potência e longa duração; associada a enteropatia espru-símile.' },
    { titulo: 'Anlodipino × nifedipino', texto: 'O anlodipino tem meia-vida de 35–50 h e início gradual, com pouca taquicardia reflexa e dose única. O nifedipino tem meia-vida curta; a forma de liberação imediata provoca queda abrupta da PA e taquicardia reflexa, por isso, na HA crônica, usam-se apenas formas de liberação prolongada. O nifedipino tem papel consagrado na gestação.' },
    { titulo: 'Betabloqueadores: seletividade e propriedades', texto: 'Atenolol (β1, hidrofílico, renal) e metoprolol (β1, lipofílico, CYP2D6) são cardiosseletivos — preferidos em pneumopatas e diabéticos. Propranolol é não seletivo e lipofílico (enxaqueca, tremor, hipertireoidismo; contraindicado na asma). Carvedilol é não seletivo com bloqueio α1 (vasodilatação, hipotensão ortostática), com benefício de mortalidade na IC. Na IC, apenas carvedilol, metoprolol succinato e bisoprolol (e nebivolol em idosos) têm evidência.' },
    { titulo: 'Hidroclorotiazida × clortalidona × indapamida × furosemida', texto: 'A clortalidona e a indapamida (tiazídicos-símiles) têm ação mais longa e maior evidência de redução de eventos que a hidroclorotiazida em doses baixas; a clortalidona causa mais hipocalemia. A furosemida é muito mais potente, mas de ação curta (efeito rebote de retenção de sódio), sendo menos útil na HA com função renal normal; é preferida na congestão e com TFG < 30.' },
    { titulo: 'Clonidina × metildopa × hidralazina', texto: 'Clonidina: agonista α2 direto, efeito rápido, rebote grave — reservada à HA refratária. Metildopa: pró-fármaco (falso neurotransmissor), lenta, segura na gestação, mas com hepatite e hemólise autoimune. Hidralazina: vasodilatador arteriolar, sem ação central; exige betabloqueador e diurético no uso crônico; IV na pré-eclâmpsia e com nitrato na IC.' },
  ],
  memorizar: [
    'Cinco classes preferenciais: tiazídicos/símiles, BCC, IECA, BRA e betabloqueadores (estes com indicação específica).',
    'A maioria dos hipertensos começa com associação de 2 fármacos (IECA/BRA + BCC ou tiazídico), preferencialmente em comprimido único.',
    'Nunca associar IECA + BRA (duplo bloqueio do SRAA).',
    'IECA → tosse seca e angioedema (bradicinina); BRA não causa tosse.',
    'IECA, BRA e alisquireno são contraindicados na gestação; na gestante usar metildopa, nifedipino, hidralazina (ou betabloqueador exceto atenolol).',
    'Espironolactona é o 4º fármaco da hipertensão resistente e causa hipercalemia e ginecomastia.',
    'Tiazídicos: hipocalemia, hiponatremia, hiperuricemia, hiperglicemia, hipercalcemia; perdem eficácia com TFG < 30 (trocar por furosemida).',
    'Furosemida: diurético mais potente; ototoxicidade com doses IV altas ou aminoglicosídeos.',
    'BCC diidropiridínico → edema maleolar, cefaleia, rubor, hiperplasia gengival; não responde a diurético.',
    'Nifedipino de liberação imediata sublingual não deve ser usado na urgência hipertensiva.',
    'Propranolol (não seletivo) é contraindicado na asma; betabloqueadores mascaram hipoglicemia.',
    'Na IC com FE reduzida, só carvedilol, metoprolol succinato e bisoprolol têm benefício de mortalidade.',
    'Clonidina: nunca suspender abruptamente (rebote); metildopa: Coombs positivo e anemia hemolítica.',
    'Hidralazina: taquicardia reflexa, retenção de sódio e síndrome lúpus-like (acetiladores lentos).',
    'Monitorar K+ e creatinina 1–2 semanas após iniciar IECA/BRA/espironolactona.',
  ],
  fontes: [R_DBHA, R_DIC, R_GG, R_KATZ, R_RANG, R_FTN, 'Peraçoli JC et al. Pré-eclâmpsia/eclâmpsia. Protocolo FEBRASGO/RBEHG 2019–2023.'],
  dataRevisao: DATA,
};

const resumoLIP: ResumoGrupo = {
  grupoId: 'hipolipemiantes',
  visaoGeral: [
    'As dislipidemias são alterações das lipoproteínas plasmáticas; a elevação do LDL-colesterol (LDL-c) é causal na doença cardiovascular aterosclerótica, e a magnitude e o tempo de exposição ao LDL-c determinam o risco. Cada redução de ~39 mg/dL (1 mmol/L) no LDL-c reduz cerca de 20–22% dos eventos cardiovasculares maiores, independentemente do fármaco usado para isso ("quanto menor, melhor").',
    'O tratamento é guiado pela estratificação do risco cardiovascular e por metas de LDL-c. Na Atualização da Diretriz Brasileira (SBC 2017), as metas são < 50 mg/dL (muito alto risco), < 70 (alto), < 100 (intermediário) e < 130 mg/dL (baixo); a diretriz ESC/EAS 2019 propõe < 55 mg/dL e redução ≥ 50% no muito alto risco, < 70 no alto, < 100 no moderado e < 116 no baixo. O colesterol não-HDL e a apoB são metas secundárias, especialmente em hipertrigliceridemia e diabetes.',
    'As estatinas são a base do tratamento, com a maior evidência de redução de eventos e mortalidade. Quando a meta não é atingida com estatina de alta intensidade na dose máxima tolerada, adiciona-se ezetimiba e, em seguida, terapias dirigidas à PCSK9 (anticorpos monoclonais ou siRNA). O ácido bempedoico é alternativa oral, sobretudo em intolerantes a estatinas.',
    'Os fibratos têm papel principal na hipertrigliceridemia grave (prevenção de pancreatite) e, como adjuvantes, na dislipidemia aterogênica residual; não substituem a estatina para redução de risco. Na gestação, estatinas e a maioria dos hipolipemiantes são contraindicados, e as mudanças de estilo de vida, a correção de causas secundárias (hipotireoidismo, diabetes descompensado, síndrome nefrótica, álcool, fármacos) e a adesão são componentes indispensáveis do cuidado.',
  ],
  mecanismos: [
    { titulo: 'Estatinas (sinvastatina, atorvastatina, rosuvastatina, pravastatina)', texto: 'Inibem competitivamente a HMG-CoA redutase, que converte HMG-CoA em mevalonato — etapa limitante da síntese de colesterol. A queda do colesterol intracelular ativa o fator de transcrição SREBP-2, que aumenta a síntese de receptores de LDL na membrana do hepatócito e a captação de LDL plasmático. Reduzem LDL-c em 30–50% (intensidade moderada) ou ≥ 50% (alta intensidade: atorvastatina 40–80 mg, rosuvastatina 20–40 mg) e triglicerídeos modestamente. Têm efeitos pleiotrópicos (estabilização de placa, anti-inflamatório). Diferem em lipofilia e metabolismo: sinvastatina e atorvastatina via CYP3A4; rosuvastatina e pravastatina hidrofílicas e com poucas interações pelo CYP.' },
    { titulo: 'Inibidor da absorção de colesterol (ezetimiba)', texto: 'Bloqueia a proteína NPC1L1 na borda em escova do enterócito, reduzindo em ~50% a absorção do colesterol dietético e biliar. A menor chegada de colesterol ao fígado ativa a síntese de receptores de LDL. Reduz LDL-c em ~20% isoladamente e ~25% adicionais à estatina, com efeito sinérgico porque a estatina, isoladamente, aumenta a absorção intestinal compensatória. É o segundo degrau na escalada terapêutica.' },
    { titulo: 'Fibratos (fenofibrato, ciprofibrato, bezafibrato)', texto: 'Agonistas do receptor nuclear PPAR-α: aumentam a transcrição da lipoproteína lipase e das apoA-I/A-II, reduzem a apoC-III (inibidor da LPL) e estimulam a β-oxidação hepática de ácidos graxos, diminuindo a produção de VLDL. Reduzem triglicerídeos em 30–50% e elevam o HDL-c, com efeito variável sobre o LDL-c. São a primeira escolha na hipertrigliceridemia grave; a genfibrozila não deve ser associada a estatinas (inibe a glicuronidação), sendo o fenofibrato o preferido em associação.' },
    { titulo: 'Terapias dirigidas à PCSK9 (evolocumabe, alirocumabe, inclisirana)', texto: 'A PCSK9 liga-se ao receptor de LDL e o conduz à degradação lisossomal. Os anticorpos monoclonais (evolocumabe, alirocumabe) sequestram a PCSK9 circulante; a inclisirana, um siRNA conjugado a GalNAc, silencia a síntese hepática da PCSK9 via complexo RISC. Em ambos os casos o receptor de LDL é reciclado, e o LDL-c cai ~50–60% adicionais à estatina. Os anticorpos são aplicados a cada 2–4 semanas e têm redução de eventos comprovada (FOURIER, ODYSSEY); a inclisirana é aplicada a cada 6 meses após as doses iniciais.' },
    { titulo: 'Inibidor da ATP-citrato liase (ácido bempedoico)', texto: 'Pró-fármaco ativado pela ACSVL1 apenas no fígado; o bempedoil-CoA inibe a ATP-citrato liase, que produz acetil-CoA citosólico, substrato inicial da síntese de colesterol (a montante da HMG-CoA redutase). Assim como as estatinas, aumenta os receptores de LDL; por não ser ativado no músculo esquelético, tem baixo risco de miotoxicidade. Reduz LDL-c em ~17–25% e reduziu eventos em intolerantes a estatina (CLEAR Outcomes), à custa de hiperuricemia e gota.' },
  ],
  fluxogramas: [
    {
      titulo: 'Síntese hepática de colesterol e pontos de ação',
      passos: [
        'Citrato (mitocôndria → citosol) → (ATP-citrato liase ← ácido bempedoico) → Acetil-CoA',
        'Acetil-CoA → HMG-CoA',
        'HMG-CoA → (HMG-CoA redutase ← estatinas) → Mevalonato',
        'Mevalonato → isoprenoides (farnesil, geranilgeranil, coenzima Q10) → esqualeno → colesterol',
        'Queda do colesterol intra-hepatocitário → ativação do SREBP-2',
        'SREBP-2 → aumento da síntese de receptores de LDL (e também de PCSK9)',
        'Mais receptores de LDL na membrana → maior captação de LDL plasmático → queda do LDL-c',
      ],
    },
    {
      titulo: 'Ciclo do receptor de LDL e a PCSK9',
      passos: [
        'LDL circulante liga-se ao receptor de LDL do hepatócito → endocitose',
        'No endossomo, a LDL é liberada e degradada; o receptor normalmente retorna à membrana (reciclagem)',
        'PCSK9 secretada liga-se ao receptor de LDL → o complexo é direcionado ao lisossomo e o receptor é destruído',
        'Anticorpos anti-PCSK9 (evolocumabe, alirocumabe) sequestram a PCSK9 circulante',
        'siRNA (inclisirana) degrada o RNA mensageiro da PCSK9 no hepatócito → menos PCSK9 produzida',
        'Resultado: mais receptores reciclados → maior depuração de LDL → queda adicional de ~50–60% do LDL-c',
      ],
    },
    {
      titulo: 'Absorção intestinal e metabolismo de triglicerídeos',
      passos: [
        'Colesterol da dieta e da bile → NPC1L1 do enterócito (← ezetimiba) → quilomícrons',
        'Quilomícrons e VLDL (ricos em triglicerídeos) → hidrólise pela lipoproteína lipase (LPL) endotelial',
        'ApoC-III inibe a LPL; fibratos (PPAR-α) reduzem apoC-III e aumentam a LPL',
        'PPAR-α também aumenta a β-oxidação hepática → menos substrato para VLDL',
        'Resultado: queda de triglicerídeos e aumento do HDL-c',
      ],
    },
  ],
  eaFrequentes: [
    { efeito: 'Sintomas musculares (mialgia)', classes: 'Estatinas (e fibratos, especialmente associados)', mecanismo: 'Inibição da via do mevalonato no músculo, com redução de coenzima Q10 e de proteínas preniladas; muitas vezes sem elevação de CK; efeito "nocebo" relevante.' },
    { efeito: 'Elevação de transaminases', classes: 'Estatinas, fibratos, ezetimiba associada', mecanismo: 'Geralmente assintomática, dose-dependente e reversível; hepatotoxicidade clinicamente relevante é rara.' },
    { efeito: 'Sintomas gastrointestinais', classes: 'Ezetimiba, fibratos, sequestradores de ácidos biliares', mecanismo: 'Ação local intestinal (diarreia, dispepsia, flatulência; constipação com resinas).' },
    { efeito: 'Reação no local da injeção e nasofaringite', classes: 'Anticorpos anti-PCSK9 e inclisirana', mecanismo: 'Reação local à aplicação subcutânea; leve e transitória.' },
    { efeito: 'Hiperuricemia e gota', classes: 'Ácido bempedoico', mecanismo: 'Competição com o urato pelo transportador renal OAT2.' },
    { efeito: 'Elevação reversível da creatinina', classes: 'Fibratos (fenofibrato, bezafibrato)', mecanismo: 'Efeito hemodinâmico/produção de creatinina, sem lesão renal estrutural na maioria dos casos.' },
  ],
  eaGraves: [
    { efeito: 'Miopatia e rabdomiólise', classes: 'Estatinas (sobretudo sinvastatina em altas doses ou com inibidores do CYP3A4); associação estatina + genfibrozila', mecanismo: 'Necrose muscular com CK > 10× o limite, mioglobinúria e risco de lesão renal aguda; fatores de risco: idade, hipotireoidismo, DRC, interações, polimorfismo SLCO1B1.' },
    { efeito: 'Aumento do risco de diabetes', classes: 'Estatinas (principalmente alta intensidade)', mecanismo: 'Redução da sensibilidade e da secreção de insulina; risco absoluto pequeno, concentrado em pré-diabéticos, superado pelo benefício cardiovascular.' },
    { efeito: 'Colelitíase', classes: 'Fibratos (também observada com ácido bempedoico)', mecanismo: 'Bile litogênica por maior excreção de colesterol e menor síntese de ácidos biliares.' },
    { efeito: 'Potencialização de anticoagulantes', classes: 'Fibratos', mecanismo: 'Deslocamento da ligação proteica e interação com a varfarina, elevando o INR.' },
    { efeito: 'Ruptura de tendão', classes: 'Ácido bempedoico', mecanismo: 'Mecanismo não esclarecido; risco maior com fluoroquinolonas, corticoides e idade avançada.' },
  ],
  primeirasLinhas: [
    { condicao: 'Prevenção secundária / muito alto risco cardiovascular (doença aterosclerótica estabelecida)', recomendacao: 'Estatina de alta intensidade (atorvastatina 40–80 mg ou rosuvastatina 20–40 mg) na dose máxima tolerada.', observacao: 'Meta: LDL-c < 50 mg/dL (SBC 2017) ou < 55 mg/dL e redução ≥ 50% (ESC/EAS 2019). Se não atingir: + ezetimiba; persistindo: + inibidor de PCSK9.', fonte: 'Atualização da Diretriz Brasileira de Dislipidemias (SBC 2017); ESC/EAS 2019' },
    { condicao: 'Alto risco (ex.: diabetes com lesão de órgão-alvo, DRC moderada, LDL-c ≥ 190 mg/dL)', recomendacao: 'Estatina de alta intensidade, associando ezetimiba se a meta não for atingida.', observacao: 'Meta: LDL-c < 70 mg/dL e, pela ESC, redução ≥ 50%.', fonte: 'Atualização da Diretriz Brasileira de Dislipidemias (SBC 2017); ESC/EAS 2019' },
    { condicao: 'Risco intermediário/moderado e baixo (prevenção primária)', recomendacao: 'Mudança de estilo de vida; estatina de intensidade moderada quando a meta não é atingida (sinvastatina, pravastatina, atorvastatina 10–20 mg, rosuvastatina 5–10 mg).', observacao: 'Meta: LDL-c < 100 mg/dL (intermediário) e < 130 mg/dL (baixo) pela SBC 2017.', fonte: 'Atualização da Diretriz Brasileira de Dislipidemias (SBC 2017)' },
    { condicao: 'Hipercolesterolemia familiar', recomendacao: 'Estatina de alta intensidade + ezetimiba desde cedo; anticorpo anti-PCSK9 (ou inclisirana) se meta não atingida.', observacao: 'Evolocumabe também na forma homozigótica; rastreamento em cascata de familiares.', fonte: 'Atualização da Diretriz Brasileira de Dislipidemias (SBC 2017); ESC/EAS 2019' },
    { condicao: 'Intolerância a estatinas', recomendacao: 'Tentar outra estatina, dose baixa ou em dias alternados; se persistir: ezetimiba, ácido bempedoico (± ezetimiba) ou inibidor de PCSK9 conforme o risco.', observacao: 'Excluir hipotireoidismo, interações e efeito nocebo.', fonte: 'ESC/EAS 2019; CLEAR Outcomes (2023)' },
    { condicao: 'Hipertrigliceridemia grave (TG ≥ 500 mg/dL; ESC: > 880 mg/dL com risco de pancreatite)', recomendacao: 'Fibrato (preferencialmente fenofibrato) + restrição de gordura e álcool e controle glicêmico.', observacao: 'Ômega-3 em altas doses como adjuvante; abaixo desses valores, a estatina é a base se houver risco cardiovascular.', fonte: 'Atualização da Diretriz Brasileira de Dislipidemias (SBC 2017); ESC/EAS 2019' },
    { condicao: 'Diabetes mellitus', recomendacao: 'Estatina para todos com 40 anos ou mais ou com fatores de risco/lesão de órgão-alvo; intensidade conforme risco.', observacao: 'Fenofibrato como adjuvante se TG persistentemente elevados com HDL baixo.', fonte: 'ESC/EAS 2019; Diretriz SBD' },
    { condicao: 'Doença renal crônica (não dialítica)', recomendacao: 'Estatina ou estatina + ezetimiba (estudo SHARP).', observacao: 'Em diálise, não iniciar estatina sem doença aterosclerótica; manter se já em uso. Ajustar dose de rosuvastatina e fibratos.', fonte: 'ESC/EAS 2019' },
    { condicao: 'Gestação e lactação', recomendacao: 'Suspender estatinas e a maioria dos hipolipemiantes; sequestradores de ácidos biliares são a opção em casos selecionados.', fonte: 'Atualização da Diretriz Brasileira de Dislipidemias (SBC 2017); ESC/EAS 2019' },
  ],
  contraindicacoes: [
    'Estatinas: gestação e amamentação, doença hepática ativa, miopatia ativa; sinvastatina com inibidores potentes do CYP3A4, genfibrozila e ciclosporina; rosuvastatina com ciclosporina',
    'Fibratos: insuficiência hepática ou renal grave, doença da vesícula biliar; genfibrozila com estatinas',
    'Ezetimiba: hepatopatia moderada a grave',
    'Ácido bempedoico: gestação e amamentação; cautela na gota',
    'Anticorpos anti-PCSK9 e inclisirana: hipersensibilidade; dados insuficientes na gestação',
  ],
  interacoes: [
    'Sinvastatina/atorvastatina + inibidores do CYP3A4 (claritromicina, itraconazol, ritonavir, grapefruit): risco de rabdomiólise',
    'Sinvastatina + anlodipino/amiodarona (máx. 20 mg) e + verapamil/diltiazem (máx. 10 mg)',
    'Estatinas + genfibrozila: contraindicado (inibição da glicuronidação/OATP1B1); preferir fenofibrato',
    'Estatinas + ciclosporina: aumento importante da exposição (rosuvastatina contraindicada)',
    'Fibratos + varfarina: aumento do INR',
    'Ácido bempedoico + sinvastatina (máx. 20 mg, FDA) e + pravastatina (máx. 40 mg)',
    'Ezetimiba/estatinas + sequestradores de ácidos biliares: espaçar as tomadas',
  ],
  comparacoes: [
    { titulo: 'Intensidade das estatinas', texto: 'Alta intensidade (redução de LDL-c ≥ 50%): atorvastatina 40–80 mg e rosuvastatina 20–40 mg. Moderada (30–50%): sinvastatina 20–40 mg, atorvastatina 10–20 mg, rosuvastatina 5–10 mg, pravastatina 40–80 mg. Baixa (< 30%): sinvastatina 10 mg, pravastatina 10–20 mg. Dobrar a dose acrescenta só ~6% de redução ("regra dos 6%").' },
    { titulo: 'Estatinas lipofílicas × hidrofílicas', texto: 'Sinvastatina e atorvastatina são lipofílicas e metabolizadas pelo CYP3A4 (muitas interações). Rosuvastatina e pravastatina são hidrofílicas, captadas por OATP1B1 e pouco dependentes do CYP — preferidas em polifarmácia, HIV e transplantados. A rosuvastatina é a mais potente; a pravastatina, a menos potente.' },
    { titulo: 'Anticorpos anti-PCSK9 × inclisirana', texto: 'Os anticorpos agem fora da célula sequestrando a PCSK9 já secretada, aplicados a cada 2–4 semanas, com redução de eventos comprovada. A inclisirana age dentro do hepatócito silenciando o gene da PCSK9 via RNA de interferência, com aplicação no dia 0, no 3º mês e semestral, favorecendo a adesão; os estudos de desfecho estão em andamento.' },
    { titulo: 'Ácido bempedoico × estatinas', texto: 'Ambos inibem a síntese hepática de colesterol, mas em etapas diferentes (ATP-citrato liase × HMG-CoA redutase). O bempedoico é um pró-fármaco ativado apenas no fígado, com pouca miotoxicidade, mas é menos potente (~20%) e eleva o ácido úrico. É opção para intolerantes ou como adjuvante.' },
    { titulo: 'Fenofibrato × ciprofibrato × bezafibrato', texto: 'Todos são agonistas PPAR-α que reduzem triglicerídeos e elevam HDL. O fenofibrato tem a melhor segurança em associação com estatina; o ciprofibrato tem meia-vida longa e dose única; o bezafibrato é um agonista pan-PPAR com eliminação renal (ajuste na DRC). A genfibrozila, não cadastrada aqui, não deve ser associada a estatinas.' },
  ],
  memorizar: [
    'LDL-c é causal na aterosclerose: quanto menor e por mais tempo, menor o risco.',
    'Estatinas são a primeira linha; alta intensidade = atorvastatina 40–80 mg ou rosuvastatina 20–40 mg.',
    'Escalada: estatina máxima tolerada → + ezetimiba → + inibidor de PCSK9.',
    'Metas SBC 2017: < 50 (muito alto), < 70 (alto), < 100 (intermediário), < 130 mg/dL (baixo); ESC 2019: < 55 no muito alto risco.',
    'Estatinas: mialgia é o efeito mais comum; rabdomiólise é rara e ligada a dose alta e interações (CYP3A4).',
    'Sinvastatina + claritromicina/itraconazol/ritonavir: contraindicado; com anlodipino, máximo 20 mg.',
    'Estatinas são contraindicadas na gestação e amamentação.',
    'Ezetimiba bloqueia a NPC1L1 intestinal; reduz LDL-c em ~20–25%.',
    'Fibratos (PPAR-α) tratam hipertrigliceridemia grave; risco de colelitíase e potencializam varfarina.',
    'Genfibrozila + estatina: contraindicado; fenofibrato é o fibrato preferido em associação.',
    'Evolocumabe e alirocumabe são anticorpos anti-PCSK9; inclisirana é siRNA (aplicação semestral).',
    'Ácido bempedoico inibe a ATP-citrato liase, ativado só no fígado; causa hiperuricemia/gota.',
    'Rosuvastatina e pravastatina: hidrofílicas e com poucas interações pelo CYP.',
  ],
  fontes: [R_DISLIP, R_ESC, R_GG, R_KATZ, R_RANG, R_FTN, 'Nissen SE et al. CLEAR Outcomes. N Engl J Med. 2023;388:1353-64.', 'Baigent C et al. Cholesterol Treatment Trialists (CTT) Collaboration. Lancet. 2010;376:1670-81.'],
  dataRevisao: DATA,
};

const dados: ModuloDados = {
  classes,
  medicamentos: [...medsHAS, ...medsLIP],
  vinculosExtras: [],
  resumos: [resumoHAS, resumoLIP],
};

export default dados;
