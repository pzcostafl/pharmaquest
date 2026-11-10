import { describe, expect, it } from 'vitest';
import { getBanco } from '../src/data/banco';
import { corrigir, FASES_MODULO, gerarQuestao } from '../src/lib/questoes';
import { cotas, gruposDoDesafio, PRINCIPAIS, questoesDoDesafio, selecionarDesafio } from '../src/lib/desafio';
import { estadoVazio } from '../src/lib/progresso';

const banco = getBanco();
const grupos = gruposDoDesafio(banco).map((g) => g.id);
const contar = (itens: { grupoId: string }[]) => itens.reduce<Record<string, number>>((r, x) => ((r[x.grupoId] = (r[x.grupoId] ?? 0) + 1), r), {});

describe('pastas', () => {
  it('a fase do grupo terapêutico saiu das pastas', () => {
    expect(FASES_MODULO).not.toContain('f1');
    expect(FASES_MODULO).toEqual(['f2', 'f3a', 'f3b']);
  });
});

describe('Desafio Geral', () => {
  it('os 11 grupos entram no desafio', () => expect(grupos.length).toBe(11));

  it('todos os "principais" existem e estão jogáveis no seu grupo', () => {
    for (const [g, ids] of Object.entries(PRINCIPAIS)) {
      for (const id of ids.slice(0, 5)) expect((banco.porGrupo.get(g) ?? []).some((m) => m.id === id), `${g}/${id}`).toBe(true);
    }
  });

  it('rodada completa: exatamente 5 por grupo, sem repetir fármaco', () => {
    for (let k = 0; k < 30; k++) {
      const itens = selecionarDesafio(banco, estadoVazio(), 55, false);
      expect(itens.length).toBe(55);
      expect(new Set(itens.map((x) => x.medId)).size).toBe(55);
      for (const g of grupos) expect(contar(itens)[g], g).toBe(5);
    }
  });

  it('rodadas menores ficam equilibradas entre os grupos', () => {
    for (const n of [10, 20, 30]) {
      const c = Object.values(cotas(grupos, n));
      expect(c.reduce((a, b) => a + b, 0)).toBe(n);
      expect(Math.max(...c) - Math.min(...c)).toBeLessThanOrEqual(1);
      expect(selecionarDesafio(banco, estadoVazio(), n, false).length).toBe(n);
    }
  });

  it('a ordem é embaralhada (não vem em blocos por grupo)', () => {
    const itens = selecionarDesafio(banco, estadoVazio(), 55, false);
    const trocas = itens.filter((x, i) => i > 0 && x.grupoId !== itens[i - 1].grupoId).length;
    expect(trocas).toBeGreaterThan(20);
  });

  it('os principais aparecem bem mais que os outros', () => {
    let principais = 0, total = 0;
    for (let k = 0; k < 40; k++) for (const x of selecionarDesafio(banco, estadoVazio(), 55, false)) {
      total++;
      if ((PRINCIPAIS[x.grupoId] ?? []).slice(0, 5).includes(x.medId)) principais++;
    }
    expect(principais / total).toBeGreaterThan(0.6);
  });

  it('priorizar erros traz o fármaco errado para a rodada', () => {
    const e = estadoVazio();
    const k = 'antimicrobianos|anfotericina-b|f1';
    e.itens[k] = { tentativas: 1, acertos: 0, parciais: 0, erros: 1, ultimo: 'errado', primeiro: 'errado', ultimaData: 0, srs: { repeticoes: 0, intervalo: 0, facilidade: 2.5, proxima: 0 } };
    let vezes = 0;
    for (let i = 0; i < 20; i++) if (selecionarDesafio(banco, e, 55, true).some((x) => x.medId === 'anfotericina-b')) vezes++;
    expect(vezes).toBe(20);
  });

  it('cada questão de múltipla escolha tem 4 alternativas e só um grupo correto', () => {
    const itens = selecionarDesafio(banco, estadoVazio(), 55, false);
    for (const q of questoesDoDesafio(banco, itens, 'mc')) {
      expect(q.fase).toBe('f1');
      expect(new Set(q.alternativas).size).toBe(4);
      expect(corrigir(q, String(q.correta)).resultado).toBe('certo');
      expect(q.enunciado).not.toMatch(/considerando/i);
    }
  });

  it('fármaco de dois grupos não fica ambíguo', () => {
    const sema = banco.medicamentos.get('semaglutida')!;
    const q = gerarQuestao(sema, 'obesidade', 'f1', 'mc');
    const nomesGrupos = sema.vinculos.map((v) => gruposDoDesafio(banco).find((g) => g.id === v.grupoId)!.nome);
    expect(q.alternativas!.filter((a) => nomesGrupos.includes(a)).length).toBe(1);
    const d = gerarQuestao(sema, 'obesidade', 'f1', 'dis');
    expect(corrigir(d, 'antidiabético').resultado).toBe('certo');
    expect(corrigir(d, 'remédio para obesidade').resultado).toBe('certo');
  });

  it('modo misto alterna os formatos', () => {
    const qs = questoesDoDesafio(banco, selecionarDesafio(banco, estadoVazio(), 10, false), 'misto');
    expect(qs.map((q) => q.formato)).toEqual(qs.map((_, i) => (i % 2 === 0 ? 'mc' : 'dis')));
  });
});
