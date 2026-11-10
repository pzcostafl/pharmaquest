import { useEffect, useState, type ReactNode } from 'react';
import type { EstadoValidacao, NomeComercial } from '../data/types';
import { Icone } from './Icone';

export function Barra({ valor, cor = 'bg-petroleo-600 dark:bg-petroleo-400', className = 'h-2', rotulo }: { valor: number; cor?: string; className?: string; rotulo?: string }) {
  const pct = Math.round(Math.max(0, Math.min(1, valor)) * 100);
  return (
    <div className={`w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800 ${className}`} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={rotulo}>
      <div className={`h-full rounded-full transition-all duration-500 ${cor}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export const pct = (v: number) => `${Math.round(v * 100)}%`;

export function SeloValidacao({ estado }: { estado: EstadoValidacao }) {
  if (estado === 'validado_docente')
    return <span className="selo bg-acerto-100 text-acerto-700 dark:bg-acerto-700/30 dark:text-acerto-100"><Icone nome="escudo" className="h-3.5 w-3.5" /> Validado por docente</span>;
  if (estado === 'revisado_referencias')
    return (
      <span className="selo bg-parcial-100 text-parcial-700 dark:bg-parcial-700/30 dark:text-parcial-100" title="Conteúdo redigido a partir de referências-padrão (livros-texto, bulas, diretrizes) e ainda não revisado por docente no painel administrativo.">
        <Icone nome="info" className="h-3.5 w-3.5" /> Baseado em referências · aguarda revisão docente
      </span>
    );
  return <span className="selo bg-slate-200 text-slate-600">Rascunho</span>;
}

export function SeloMarca({ n }: { n: NomeComercial }) {
  const tipo = n.tipo === 'referencia' ? 'Referência' : n.tipo === 'combinacao' ? 'Associação' : 'Marca/similar';
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      <strong className="font-semibold">{n.nome}</strong>
      <span className="selo bg-petroleo-50 text-petroleo-800 dark:bg-petroleo-900/50 dark:text-petroleo-200">{tipo}</span>
      {n.composicao && <span className="text-xs text-slate-500">({n.composicao})</span>}
      {n.fabricante && <span className="text-xs text-slate-500">· {n.fabricante}</span>}
      {n.verificacao === 'confirmado_anvisa' ? (
        <span className="selo bg-acerto-100 text-acerto-700 dark:bg-acerto-700/30 dark:text-acerto-100">Conferido na Anvisa</span>
      ) : (
        <span className="selo bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300" title="Marca com registro histórico no Brasil. A situação atual de registro e comercialização ainda não foi conferida na Anvisa.">Situação Anvisa a conferir</span>
      )}
      {n.obs && <span className="text-xs italic text-slate-500">— {n.obs}</span>}
    </span>
  );
}

export function Secao({ titulo, children, acao, id }: { titulo: string; children: ReactNode; acao?: ReactNode; id?: string }) {
  return (
    <section id={id} className="cartao p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{titulo}</h2>
        {acao}
      </div>
      {children}
    </section>
  );
}

export function Vazio({ children }: { children: ReactNode }) {
  return <p className="rounded-xl border border-dashed border-slate-300 p-5 text-center text-sm text-slate-500 dark:border-slate-700">{children}</p>;
}

// ---------- notificações (conquistas, pontos) ----------
type Aviso = { id: number; titulo: string; texto?: string; icone?: string };
let avisos: Aviso[] = [];
const ouv = new Set<(a: Aviso[]) => void>();
export function avisar(titulo: string, texto?: string, icone?: string) {
  const a = { id: Date.now() + Math.random(), titulo, texto, icone };
  avisos = [...avisos, a];
  ouv.forEach((f) => f(avisos));
  setTimeout(() => { avisos = avisos.filter((x) => x.id !== a.id); ouv.forEach((f) => f(avisos)); }, 4500);
}
export function Avisos() {
  const [lista, setLista] = useState<Aviso[]>([]);
  useEffect(() => { ouv.add(setLista); return () => { ouv.delete(setLista); }; }, []);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-16 z-50 flex flex-col items-center gap-2 px-4 sm:top-20 sm:items-end sm:pr-6" aria-live="polite">
      {lista.map((a) => (
        <div key={a.id} className="surgir pointer-events-auto flex max-w-md items-center gap-3 rounded-2xl bg-petroleo-900 px-4 py-3 text-white shadow-lg">
          <span className="rounded-xl bg-white/10 p-2"><Icone nome={a.icone ?? 'estrela'} /></span>
          <div>
            <p className="text-sm font-semibold">{a.titulo}</p>
            {a.texto && <p className="text-xs text-petroleo-100">{a.texto}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
