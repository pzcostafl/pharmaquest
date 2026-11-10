// Corretor de respostas dissertativas.
// Estratégia: normalização (caixa, acentos, pontuação, hífens, plural, stopwords) +
// busca aproximada (distância de Levenshtein com tolerância proporcional ao tamanho) de cada
// forma aceita DENTRO da resposta — assim respostas com explicações adicionais, abreviações,
// sinônimos e pequenos erros de digitação são reconhecidas.
// Correspondência parcial (parte dos termos-chave presentes) gera feedback de "parcialmente correto".

const STOP = new Set([
  'de', 'da', 'do', 'das', 'dos', 'a', 'o', 'as', 'os', 'e', 'em', 'no', 'na', 'nos', 'nas', 'um', 'uma',
  'para', 'com', 'por', 'pelo', 'pela', 'ao', 'aos', 'que', 'ele', 'ela', 'esse', 'este', 'essa', 'esta',
  'e', 'eh', 'pertence', 'classe', 'grupo', 'farmacologica', 'terapeutico', 'medicamento', 'farmaco',
  'dos', 'tipo', 'sao', 'seu', 'sua', 'ou', 'como', 'the', 'of', 'é',
]);

export function normalizar(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/β/g, 'beta').replace(/α/g, 'alfa').replace(/γ/g, 'gama').replace(/δ/g, 'delta')
    .replace(/(\w)-(\w)/g, '$1$2')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function singular(t: string): string {
  if (t.length <= 3) return t;
  if (t.endsWith('oes') || t.endsWith('aes')) return t.slice(0, -3) + 'ao';
  if (t.endsWith('ais')) return t.slice(0, -3) + 'al';
  if (t.endsWith('eis') && t.length > 5) return t.slice(0, -3) + 'el';
  if (t.endsWith('res') || t.endsWith('zes')) return t.slice(0, -2);
  if (t.endsWith('ns')) return t.slice(0, -2) + 'm';
  if (t.endsWith('s') && !t.endsWith('ss')) return t.slice(0, -1);
  return t;
}

export function tokens(s: string): string[] {
  return normalizar(s)
    .split(' ')
    .filter((t) => t && !STOP.has(t))
    .map(singular);
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}

function tolerancia(len: number) {
  if (len <= 4) return 0;
  if (len <= 7) return 1;
  if (len <= 13) return 2;
  return 3;
}

/** Procura `cand` dentro de `texto` (ambos compactados, sem espaços), tolerando erros leves. */
function contemAproximado(texto: string, cand: string): boolean {
  if (!cand) return false;
  if (texto.includes(cand)) return true;
  const tol = tolerancia(cand.length);
  if (!tol) return false;
  const L = cand.length;
  for (let w = Math.max(1, L - tol); w <= L + tol; w++) {
    for (let i = 0; i + w <= texto.length; i++) {
      if (levenshtein(texto.slice(i, i + w), cand) <= tol) return true;
    }
  }
  return false;
}

function tokenBate(respTokens: string[], t: string): boolean {
  const tol = tolerancia(t.length);
  return respTokens.some((r) => r === t || (tol > 0 && Math.abs(r.length - t.length) <= tol && levenshtein(r, t) <= tol));
}

export interface ResultadoMatch {
  /** 1 = forma aceita encontrada; 0..1 = fração de termos-chave encontrados */
  score: number;
  forma?: string;
}

/** Compara a resposta com uma lista de formas aceitas. */
export function compararFormas(resposta: string, formas: string[]): ResultadoMatch {
  const rt = tokens(resposta);
  if (!rt.length) return { score: 0 };
  const compacto = rt.join('');
  let melhor: ResultadoMatch = { score: 0 };
  for (const f of formas) {
    const ft = tokens(f);
    if (!ft.length) continue;
    const fc = ft.join('');
    // Siglas e termos curtos: exigem token idêntico (evita "bra" casar com "bradicardia")
    if (fc.length <= 4) {
      if (rt.includes(fc) || (ft.length > 1 && ft.every((t) => rt.includes(t)))) return { score: 1, forma: f };
      continue;
    }
    if (contemAproximado(compacto, fc)) return { score: 1, forma: f };
    if (ft.length >= 2) {
      const hits = ft.filter((t) => t.length > 3 && tokenBate(rt, t)).length;
      const sc = hits / ft.length;
      if (sc > melhor.score) melhor = { score: sc, forma: f };
    }
  }
  return melhor;
}

export interface Conceito {
  rotulo: string;
  formas: string[];
}

/** Quantos conceitos distintos aparecem na resposta (para listas: nomes comerciais, efeitos adversos). */
export function conceitosEncontrados(resposta: string, conceitos: Conceito[]): { achados: Conceito[]; parciais: Conceito[] } {
  const achados: Conceito[] = [];
  const parciais: Conceito[] = [];
  for (const c of conceitos) {
    const r = compararFormas(resposta, [c.rotulo, ...c.formas]);
    if (r.score === 1) achados.push(c);
    else if (r.score >= 0.5) parciais.push(c);
  }
  return { achados, parciais };
}
