import { describe, expect, it } from 'vitest';
import { getBanco } from '../src/data/banco';
import { corrigir, gerarQuestao, type Fase } from '../src/lib/questoes';

const banco = getBanco();
const enal = banco.medicamentos.get('enalapril')!;
const dis = (fase: Fase, r: string) => corrigir(gerarQuestao(enal, 'antihipertensivos', fase, 'dis'), r).resultado;

describe('banco', () => {
  it('enalapril está jogável em anti-hipertensivos', () => {
    expect(banco.porGrupo.get('antihipertensivos')!.some((m) => m.id === 'enalapril')).toBe(true);
  });
  it('todos os 11 grupos têm medicamentos e resumo', () => {
    for (const g of ['analgesicos','antiinflamatorios','antihipertensivos','antimicrobianos','antidepressivos','broncodilatadores','gastro','antidiabeticos','hipolipemiantes','obesidade','oncologicos']) {
      expect(banco.porGrupo.get(g)?.length, g).toBeGreaterThan(3);
      expect(banco.resumos.get(g), g).toBeTruthy();
    }
  });
  it('fármacos sem marca ficam ocultos (regra de validação)', () => {
    expect(banco.ocultos.some((o) => o.med.id === 'famotidina')).toBe(true);
  });
});

describe('múltipla escolha (Testes 1–4)', () => {
  for (const g of banco.porGrupo.keys()) {
    it(`todas as questões de ${g} têm 4 alternativas distintas e 1 correta`, () => {
      for (const m of banco.porGrupo.get(g)!) for (const f of ['f1','f2','f3a','f3b'] as Fase[]) {
        const q = gerarQuestao(m, g, f, 'mc');
        expect(q.alternativas!.length, `${m.id} ${f}`).toBe(4);
        expect(new Set(q.alternativas).size, `${m.id} ${f}`).toBe(4);
        expect(corrigir(q, String(q.correta)).resultado).toBe('certo');
      }
    });
  }
  it('fase 2 do enalapril tem IECA como correta', () => {
    const q = gerarQuestao(enal, 'antihipertensivos', 'f2', 'mc');
    expect(q.alternativas![q.correta!]).toMatch(/IECA|conversora/i);
  });
  it('fase 3B do enalapril: tosse seca', () => {
    const q = gerarQuestao(enal, 'antihipertensivos', 'f3b', 'mc');
    expect(q.alternativas![q.correta!]).toMatch(/tosse/i);
  });
});

describe('dissertativo (Teste 6)', () => {
  it.each(['anti-hipertensivo', 'Anti hipertensivos', 'antihipertencivo', 'é usado para pressão alta', 'ANTI-HIPERTENSIVO, atua no SRAA'])('fase 1 aceita "%s"', (r) => expect(dis('f1', r)).toBe('certo'));
  it.each(['antibiótico', 'antidepressivo'])('fase 1 rejeita "%s"', (r) => expect(dis('f1', r)).toBe('errado'));
  it.each(['IECA', 'ieca', 'inibidor da ECA', 'inibidores da enzima conversora de angiotensina', 'inibidor da enzima conversora da angiotensina (reduz angiotensina II)', 'inibidor da enzima convesora de angiotensina'])('fase 2 aceita "%s"', (r) => expect(dis('f2', r)).toBe('certo'));
  it('fase 2: grupo no lugar da classe é erro explicado', () => {
    const c = corrigir(gerarQuestao(enal, 'antihipertensivos', 'f2', 'dis'), 'anti-hipertensivo');
    expect(c.resultado).toBe('errado');
    expect(c.mensagem).toMatch(/GRUPO/);
  });
  it('fase 2 rejeita BRA', () => expect(dis('f2', 'BRA')).toBe('errado'));
  it.each(['Renitec', 'renitek', 'acho que é o Renitec'])('fase 3A aceita "%s"', (r) => expect(dis('f3a', r)).toBe('certo'));
  it('fase 3A: princípio ativo é parcial', () => expect(dis('f3a', 'enalapril')).toBe('parcial'));
  it.each(['tosse seca, hipercalemia', 'tosse seca e hipotensão', 'hiperpotassemia; tosse'])('fase 3B aceita "%s"', (r) => expect(dis('f3b', r)).toBe('certo'));
  it('fase 3B com um efeito é parcial', () => expect(dis('f3b', 'tosse seca')).toBe('parcial'));
});
