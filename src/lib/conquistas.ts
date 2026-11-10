import { getBanco } from '../data/banco';
import { listarGrupos } from './grupos';
import { atualizar, dominioGrupo, getEstado, type Estado } from './progresso';
import { parseChave } from './questoes';

export interface Conquista {
  id: string;
  titulo: string;
  descricao: string;
  icone: string;
  teste: (e: Estado) => boolean;
}

const medsDe = (g: string) => (getBanco().porGrupo.get(g) ?? []).map((m) => m.id);
const especialista = (g: string) => (e: Estado) => !!e.gruposConcluidos[g] && dominioGrupo(e, g, medsDe(g)) >= 0.75;

export const CONQUISTAS: Conquista[] = [
  { id: 'primeiro-med', titulo: 'Primeiros passos', descricao: 'Concluir as três fases de um princípio ativo.', icone: 'estrela', teste: (e) => Object.keys(e.bonusMed).length >= 1 },
  { id: 'primeira-pasta', titulo: 'Primeira pasta concluída', descricao: 'Concluir todos os medicamentos de um grupo terapêutico.', icone: 'pasta', teste: (e) => Object.keys(e.gruposConcluidos).length >= 1 },
  { id: 'todas-pastas', titulo: 'Farmacologia completa', descricao: 'Concluir todas as pastas terapêuticas.', icone: 'trofeu', teste: (e) => listarGrupos().filter((g) => medsDe(g.id).length).every((g) => e.gruposConcluidos[g.id]) },
  { id: 'esp-antihipertensivos', titulo: 'Especialista em anti-hipertensivos', descricao: 'Concluir a pasta com domínio ≥ 75%.', icone: 'coracao', teste: especialista('antihipertensivos') },
  { id: 'mestre-antibioticos', titulo: 'Mestre dos antibióticos', descricao: 'Concluir antimicrobianos com domínio ≥ 75%.', icone: 'bacteria', teste: especialista('antimicrobianos') },
  { id: 'esp-oncologia', titulo: 'Especialista em oncologia', descricao: 'Concluir oncológicos com domínio ≥ 75%.', icone: 'celula', teste: especialista('oncologicos') },
  { id: 'esp-diabetes', titulo: 'Especialista em diabetes', descricao: 'Concluir antidiabéticos com domínio ≥ 75%.', icone: 'gota', teste: especialista('antidiabeticos') },
  { id: 'explorador', titulo: 'Explorador da farmacologia', descricao: 'Concluir ao menos um medicamento em 5 grupos diferentes.', icone: 'bussola', teste: (e) => new Set(Object.keys(e.bonusMed).map((k) => k.split('|')[0])).size >= 5 },
  { id: 'seq-10', titulo: 'Precisão clínica', descricao: '10 medicamentos consecutivos sem erros.', icone: 'alvo', teste: (e) => e.melhorSequencia >= 10 },
  { id: 'simulado-90', titulo: 'Aprovado com louvor', descricao: 'Acertar ≥ 90% em um simulado final.', icone: 'diploma', teste: (e) => e.simulados.some((s) => s.total >= 10 && s.acertos / s.total >= 0.9) },
  { id: 'revisor', titulo: 'Revisor dedicado', descricao: 'Completar 5 sessões de revisão rápida.', icone: 'relogio', teste: (e) => e.revisoesRapidas >= 5 },
  { id: 'dissertativo-50', titulo: 'Raciocínio próprio', descricao: '50 respostas dissertativas corretas.', icone: 'lapis', teste: (e) => e.historico.filter((h) => h.formato === 'dis' && h.resultado === 'certo').length >= 50 },
  { id: 'recuperacao', titulo: 'Recuperação', descricao: 'Acertar 20 questões que você havia errado antes.', icone: 'seta', teste: (e) => Object.values(e.itens).filter((i) => i.erros > 0 && i.ultimo === 'certo').length >= 20 },
];

/** Avalia e desbloqueia conquistas. Retorna as novas. */
export function verificarConquistas(): Conquista[] {
  const e = getEstado();
  const novas = CONQUISTAS.filter((c) => !e.conquistas[c.id] && c.teste(e));
  if (novas.length) atualizar((s) => { for (const c of novas) s.conquistas[c.id] = Date.now(); });
  return novas;
}

// -------- análises para "Minha Revisão" --------
export function analiseErros(e: Estado) {
  const banco = getBanco();
  const porMed = new Map<string, { medId: string; erros: number; parciais: number }>();
  const porClasse = new Map<string, number>();
  const eaPendentes: { chave: string; medId: string }[] = [];
  for (const [k, it] of Object.entries(e.itens)) {
    const { medId, fase, grupoId } = parseChave(k);
    const m = banco.medicamentos.get(medId);
    if (!m) continue;
    const reg = porMed.get(medId) ?? { medId, erros: 0, parciais: 0 };
    reg.erros += it.erros;
    reg.parciais += it.parciais;
    porMed.set(medId, reg);
    if (fase === 'f2' && it.erros + it.parciais > 0) {
      const v = m.vinculos.find((x) => x.grupoId === grupoId) ?? m.vinculos[0];
      porClasse.set(v.classeId, (porClasse.get(v.classeId) ?? 0) + it.erros + it.parciais);
    }
    if (fase === 'f3b' && it.ultimo !== 'certo') eaPendentes.push({ chave: k, medId });
  }
  return {
    meds: [...porMed.values()].filter((x) => x.erros + x.parciais > 0).sort((a, b) => b.erros + b.parciais - (a.erros + a.parciais)),
    classes: [...porClasse.entries()].sort((a, b) => b[1] - a[1]),
    eaPendentes,
  };
}

/** Seleciona itens para revisão rápida (repetição espaçada): vencidos e errados primeiro. */
export function selecionarRevisao(e: Estado, n: number, grupoId?: string): string[] {
  const agora = Date.now();
  const banco = getBanco();
  const valido = (k: string) => {
    const { grupoId: g, medId } = parseChave(k);
    return (!grupoId || g === grupoId) && (banco.porGrupo.get(g) ?? []).some((m) => m.id === medId);
  };
  const itens = Object.entries(e.itens).filter(([k]) => valido(k));
  const prioridade = ([, it]: (typeof itens)[number]) => {
    const atraso = (agora - it.srs.proxima) / 86_400_000;
    const venc = it.srs.proxima <= agora ? 10 : 0;
    const err = it.ultimo === 'errado' ? 6 : it.ultimo === 'parcial' ? 3 : 0;
    return venc + err + Math.max(0, atraso) + it.erros * 0.5 + Math.random();
  };
  const ordenados = itens.sort((a, b) => prioridade(b) - prioridade(a)).map(([k]) => k);
  return ordenados.slice(0, n);
}
