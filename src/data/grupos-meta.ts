import type { GrupoId } from './types';

export interface GrupoMeta {
  id: GrupoId;
  nome: string;
  nomeCurto: string;
  descricao: string;
  icone: string; // chave do componente Icone
  /** formas aceitas na resposta dissertativa da fase 1 */
  sinonimos: string[];
  ordem: number;
}

export const GRUPOS: GrupoMeta[] = [
  {
    id: 'analgesicos', ordem: 1, icone: 'termometro',
    nome: 'Analgésicos e antitérmicos', nomeCurto: 'Analgésicos',
    descricao: 'Não opioides e opioides: dor, febre e seus riscos.',
    sinonimos: ['analgesico', 'analgesicos', 'antitermico', 'antitermicos', 'antipiretico', 'antipireticos', 'analgesico e antitermico', 'analgesico opioide', 'opioide', 'opioides', 'analgesico antipiretico', 'para dor', 'para dor e febre'],
  },
  {
    id: 'antiinflamatorios', ordem: 2, icone: 'chama',
    nome: 'Anti-inflamatórios', nomeCurto: 'Anti-inflamatórios',
    descricao: 'AINEs, coxibes e corticosteroides sistêmicos.',
    sinonimos: ['antiinflamatorio', 'antiinflamatorios', 'anti inflamatorio', 'aine', 'aines', 'antiinflamatorio nao esteroidal', 'antiinflamatorio esteroidal', 'corticoide', 'corticosteroide', 'glicocorticoide'],
  },
  {
    id: 'antihipertensivos', ordem: 3, icone: 'coracao',
    nome: 'Anti-hipertensivos', nomeCurto: 'Anti-hipertensivos',
    descricao: 'IECA, BRA, BCC, diuréticos, betabloqueadores e outros.',
    sinonimos: ['antihipertensivo', 'antihipertensivos', 'anti hipertensivo', 'hipotensor', 'hipotensores', 'para pressao alta', 'para hipertensao', 'cardiovascular', 'medicamento para hipertensao'],
  },
  {
    id: 'antimicrobianos', ordem: 4, icone: 'bacteria',
    nome: 'Antimicrobianos e antibióticos', nomeCurto: 'Antimicrobianos',
    descricao: 'Antibacterianos, antifúngicos e antivirais; resistência e uso racional.',
    sinonimos: ['antimicrobiano', 'antimicrobianos', 'antibiotico', 'antibioticos', 'antibacteriano', 'antibacterianos', 'antiinfeccioso', 'antifungico', 'antifungicos', 'antimicotico', 'antiviral', 'antivirais', 'antiinfecciosos'],
  },
  {
    id: 'antidepressivos', ordem: 5, icone: 'cerebro',
    nome: 'Antidepressivos e ansiolíticos', nomeCurto: 'Antidepressivos',
    descricao: 'ISRS, IRSN, tricíclicos, atípicos, benzodiazepínicos e outros.',
    sinonimos: ['antidepressivo', 'antidepressivos', 'ansiolitico', 'ansioliticos', 'psicofarmaco', 'psicotropico', 'antidepressivo e ansiolitico', 'benzodiazepinico', 'hipnotico', 'sedativo'],
  },
  {
    id: 'broncodilatadores', ordem: 6, icone: 'pulmao',
    nome: 'Broncodilatadores', nomeCurto: 'Broncodilatadores',
    descricao: 'β2-agonistas, antimuscarínicos, metilxantinas e controle de asma/DPOC.',
    sinonimos: ['broncodilatador', 'broncodilatadores', 'antiasmatico', 'antiasmaticos', 'para asma', 'para dpoc', 'medicamento respiratorio', 'controle da asma'],
  },
  {
    id: 'gastro', ordem: 7, icone: 'estomago',
    nome: 'Protetores gástricos e gastrointestinais', nomeCurto: 'Gastrointestinais',
    descricao: 'IBP, antagonistas H2, antiácidos e protetores de mucosa.',
    sinonimos: ['protetor gastrico', 'protetores gastricos', 'gastroprotetor', 'gastroprotetores', 'antiulceroso', 'antiulcerosos', 'antiacido', 'antiacidos', 'gastrointestinal', 'antissecretor', 'antissecretores', 'inibidor de acidez'],
  },
  {
    id: 'antidiabeticos', ordem: 8, icone: 'gota',
    nome: 'Antidiabéticos', nomeCurto: 'Antidiabéticos',
    descricao: 'Orais, incretínicos, iSGLT2 e insulinas.',
    sinonimos: ['antidiabetico', 'antidiabeticos', 'hipoglicemiante', 'hipoglicemiantes', 'hipoglicemiante oral', 'antihiperglicemiante', 'antihiperglicemiantes', 'para diabetes', 'insulina', 'insulinas'],
  },
  {
    id: 'hipolipemiantes', ordem: 9, icone: 'lipidio',
    nome: 'Hipolipemiantes — controle do perfil lipídico', nomeCurto: 'Hipolipemiantes',
    descricao: 'Estatinas, ezetimiba, fibratos e terapias da via PCSK9.',
    sinonimos: ['hipolipemiante', 'hipolipemiantes', 'hipolipemiante', 'antilipemico', 'antilipemicos', 'hipocolesterolemiante', 'hipocolesterolemiantes', 'redutor de colesterol', 'para colesterol', 'dislipidemia', 'antidislipidemico', 'hipolipidemiante', 'hipolipidemiantes'],
  },
  {
    id: 'obesidade', ordem: 10, icone: 'balanca',
    nome: 'Medicamentos para tratamento da obesidade', nomeCurto: 'Obesidade',
    descricao: 'Mecanismos, riscos e situação regulatória no Brasil.',
    sinonimos: ['antiobesidade', 'antiobesidades', 'anorexigeno', 'anorexigenos', 'para obesidade', 'emagrecedor', 'tratamento da obesidade', 'medicamento para obesidade', 'perda de peso', 'para emagrecer'],
  },
  {
    id: 'oncologicos', ordem: 11, icone: 'celula',
    nome: 'Antineoplásicos e medicamentos oncológicos', nomeCurto: 'Oncológicos',
    descricao: 'Quimioterapia citotóxica, terapia-alvo, imunoterapia e hormonioterapia.',
    sinonimos: ['antineoplasico', 'antineoplasicos', 'oncologico', 'oncologicos', 'quimioterapico', 'quimioterapicos', 'quimioterapia', 'antitumoral', 'anticancer', 'anticancerigeno', 'para cancer', 'imunoterapia', 'terapia alvo', 'hormonioterapia', 'citotoxico'],
  },
];

export const grupoPorId = (id: string) => GRUPOS.find((g) => g.id === id);
