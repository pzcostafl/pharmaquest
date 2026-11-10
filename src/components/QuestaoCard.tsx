import { useEffect, useRef, useState, type ReactNode } from 'react';
import { corrigir, type Correcao, type Questao } from '../lib/questoes';
import { alternarSalva, useEstado } from '../lib/progresso';
import { Icone } from './Icone';

const LETRAS = ['A', 'B', 'C', 'D', 'E'];

/**
 * Exibe uma questão (múltipla escolha ou dissertativa), corrige e mostra o feedback.
 * Nunca avança sozinha: o componente pai decide o próximo passo pelos botões em `acoes`.
 */
export function QuestaoCard({ q, onCorrigido, acoes }: { q: Questao; onCorrigido: (c: Correcao, resposta: string) => void; acoes: (c: Correcao) => ReactNode }) {
  const [sel, setSel] = useState<number | null>(null);
  const [texto, setTexto] = useState('');
  const [corr, setCorr] = useState<Correcao | null>(null);
  const e = useEstado();
  const salva = e.salvas.includes(q.chave);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSel(null); setTexto(''); setCorr(null);
    if (q.formato === 'dis') setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 50);
  }, [q]);

  useEffect(() => {
    if (corr) feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [corr]);

  const responder = () => {
    if (corr) return;
    const resp = q.formato === 'mc' ? String(sel) : texto;
    if (q.formato === 'mc' && sel === null) return;
    if (q.formato === 'dis' && !texto.trim()) return;
    const c = corrigir(q, resp);
    setCorr(c);
    onCorrigido(c, resp);
  };

  const cor = corr?.resultado === 'certo' ? 'acerto' : corr?.resultado === 'parcial' ? 'parcial' : 'erro';

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold leading-snug text-slate-900 sm:text-xl dark:text-white">{q.enunciado}</h2>
        <button className="btn-fantasma shrink-0 px-2" onClick={() => alternarSalva(q.chave)} title={salva ? 'Remover das questões salvas' : 'Salvar questão para revisar'} aria-pressed={salva}>
          <Icone nome="marcador" preenchido={salva} className="h-5 w-5" />
        </button>
      </div>

      {q.formato === 'mc' ? (
        <div className="grid gap-2.5" role="radiogroup">
          {q.alternativas!.map((alt, i) => {
            const marcado = sel === i;
            let estilo = 'border-slate-200 bg-white hover:border-petroleo-300 hover:bg-petroleo-50/50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800';
            if (marcado && !corr) estilo = 'border-petroleo-600 bg-petroleo-50 ring-2 ring-petroleo-200 dark:bg-petroleo-900/40 dark:ring-petroleo-800';
            if (corr) {
              if (i === q.correta) estilo = 'border-acerto-500 bg-acerto-50 dark:bg-acerto-700/20';
              else if (marcado) estilo = 'border-erro-500 bg-erro-50 dark:bg-erro-700/20';
              else estilo = 'border-slate-200 opacity-60 dark:border-slate-800';
            }
            return (
              <button
                key={i}
                role="radio"
                aria-checked={marcado}
                disabled={!!corr}
                onClick={() => setSel(i)}
                onDoubleClick={() => { setSel(i); }}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-[15px] transition ${estilo}`}
              >
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${marcado || (corr && i === q.correta) ? 'bg-petroleo-700 text-white dark:bg-petroleo-400 dark:text-slate-950' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
                  {corr && i === q.correta ? <Icone nome="check" className="h-4 w-4" /> : corr && marcado ? <Icone nome="x" className="h-4 w-4" /> : LETRAS[i]}
                </span>
                <span>{alt}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <div>
          <label htmlFor="resp" className="sr-only">Sua resposta</label>
          <textarea
            id="resp"
            ref={inputRef}
            className="campo min-h-24 resize-y"
            placeholder="Digite sua resposta"
            value={texto}
            disabled={!!corr}
            onChange={(ev) => setTexto(ev.target.value)}
            onKeyDown={(ev) => { if (ev.key === 'Enter' && !ev.shiftKey) { ev.preventDefault(); responder(); } }}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
          />
          {q.dica && !corr && <p className="mt-1.5 text-xs text-slate-500">{q.dica} · Enter para confirmar</p>}
        </div>
      )}

      {corr && (
        <div ref={feedbackRef} className={`surgir pulsar rounded-2xl border p-4 sm:p-5 border-${cor}-500/40 bg-${cor}-50 dark:bg-${cor}-700/15`}>
          <p className={`flex items-center gap-2 font-semibold text-${cor}-700 dark:text-${cor}-100`}>
            <Icone nome={corr.resultado === 'certo' ? 'check' : corr.resultado === 'parcial' ? 'info' : 'x'} />
            {corr.resultado === 'certo' ? 'Acertou!' : corr.resultado === 'parcial' ? 'Parcialmente correto' : 'Não foi desta vez'}
          </p>
          <p className="mt-1.5 text-sm text-slate-700 dark:text-slate-200">{corr.mensagem}</p>
          <p className="mt-3 border-t border-slate-900/10 pt-3 text-sm leading-relaxed text-slate-700 dark:border-white/10 dark:text-slate-300">{q.explicacao}</p>
        </div>
      )}

      <div className="sticky bottom-0 -mx-1 flex flex-wrap items-center justify-end gap-2 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent px-1 pt-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] dark:from-slate-950 dark:via-slate-950">
        {!corr ? (
          <button className="btn-primario w-full sm:w-auto sm:min-w-44" onClick={responder} disabled={q.formato === 'mc' ? sel === null : !texto.trim()}>
            Confirmar resposta
          </button>
        ) : (
          acoes(corr)
        )}
      </div>
    </div>
  );
}

// Classes dinâmicas usadas acima (para o Tailwind gerar):
// border-acerto-500/40 bg-acerto-50 dark:bg-acerto-700/15 text-acerto-700 dark:text-acerto-100
// border-parcial-500/40 bg-parcial-50 dark:bg-parcial-700/15 text-parcial-700 dark:text-parcial-100
// border-erro-500/40 bg-erro-50 dark:bg-erro-700/15 text-erro-700 dark:text-erro-100
