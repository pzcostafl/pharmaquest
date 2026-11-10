import { describe, expect, it } from 'vitest';
import { mesclar } from '../src/lib/nuvem';
import { estadoVazio, type ItemStat } from '../src/lib/progresso';

const item = (ultimo: ItemStat['ultimo'], ultimaData: number): ItemStat => ({
  tentativas: 1, acertos: ultimo === 'certo' ? 1 : 0, parciais: 0, erros: ultimo === 'errado' ? 1 : 0,
  ultimo, primeiro: ultimo, ultimaData, srs: { repeticoes: 1, intervalo: 1, facilidade: 2.5, proxima: ultimaData },
});

describe('mesclagem de progresso entre aparelhos', () => {
  it('mantém o que foi feito no celular e no iPad', () => {
    const cel = { ...estadoVazio(), atualizadoEm: 100, pontos: 450, itens: { 'a|enalapril|f1': item('certo', 100) }, concluidos: { 'a|enalapril': [0] }, favoritos: ['enalapril'], conquistas: { 'primeiro-med': 90 } };
    const ipad = { ...estadoVazio(), atualizadoEm: 200, pontos: 300, itens: { 'a|captopril|f1': item('errado', 200), 'a|enalapril|f1': item('errado', 50) }, concluidos: { 'a|captopril': [0] }, favoritos: ['captopril'], conquistas: { 'primeiro-med': 150 } };
    const m = mesclar(cel, ipad);
    expect(Object.keys(m.itens).sort()).toEqual(['a|captopril|f1', 'a|enalapril|f1']);
    expect(m.itens['a|enalapril|f1'].ultimo).toBe('certo'); // resposta mais recente vence
    expect(Object.keys(m.concluidos).sort()).toEqual(['a|captopril', 'a|enalapril']);
    expect(m.favoritos.sort()).toEqual(['captopril', 'enalapril']);
    expect(m.conquistas['primeiro-med']).toBe(90); // data mais antiga de desbloqueio
    expect(m.pontos).toBe(450);
    expect(m.atualizadoEm).toBe(200);
  });
  it('é idempotente', () => {
    const a = { ...estadoVazio(), atualizadoEm: 5, itens: { k: item('certo', 5) }, historico: [{ ts: 5, chave: 'k', resultado: 'certo' as const, formato: 'mc' as const, pontos: 100, origem: 'estudo' as const }] };
    const m = mesclar(mesclar(a, a), a);
    expect(m.historico.length).toBe(1);
  });
});
