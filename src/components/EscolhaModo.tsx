import { useState } from 'react';
import { atualizar, useEstado, type Modo } from '../lib/progresso';
import { Icone } from './Icone';

export const MODOS: { id: Modo; titulo: string; texto: string; icone: string }[] = [
  { id: 'mc', titulo: 'Múltipla escolha', texto: 'Quatro alternativas, uma correta. Ideal para reconhecer e diferenciar.', icone: 'check' },
  { id: 'dis', titulo: 'Dissertativo', texto: 'Você digita a resposta. Aceita sinônimos, siglas, plural e pequenos erros de digitação.', icone: 'lapis' },
  { id: 'misto', titulo: 'Misto', texto: 'Alterna os dois formatos entre as fases — recordar e reconhecer.', icone: 'repetir' },
];

export function SeletorModo({ valor, onChange }: { valor: Modo; onChange: (m: Modo) => void }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3" role="radiogroup">
      {MODOS.map((m) => (
        <button key={m.id} role="radio" aria-checked={valor === m.id} onClick={() => onChange(m.id)}
          className={`rounded-2xl border p-4 text-left transition ${valor === m.id ? 'border-petroleo-600 bg-petroleo-50 ring-2 ring-petroleo-200 dark:bg-petroleo-900/40 dark:ring-petroleo-800' : 'border-slate-200 hover:border-petroleo-300 dark:border-slate-700'}`}>
          <Icone nome={m.icone} className="h-5 w-5 text-petroleo-600 dark:text-petroleo-300" />
          <p className="mt-2 font-semibold text-slate-900 dark:text-white">{m.titulo}</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">{m.texto}</p>
        </button>
      ))}
    </div>
  );
}

/** Diálogo de escolha do formato das questões, exibido antes do primeiro módulo. */
export function EscolhaModo({ onFechar, onEscolhido }: { onFechar: () => void; onEscolhido: () => void }) {
  const e = useEstado();
  const [modo, setModo] = useState<Modo>(e.modo);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 sm:items-center sm:p-4" onClick={onFechar}>
      <div role="dialog" aria-modal="true" aria-labelledby="titulo-modo" className="surgir w-full max-w-2xl rounded-t-3xl bg-white p-6 shadow-xl sm:rounded-3xl dark:bg-slate-900" onClick={(ev) => ev.stopPropagation()}>
        <h2 id="titulo-modo" className="text-xl font-semibold text-slate-900 dark:text-white">Como você quer responder?</h2>
        <p className="mt-1 text-sm text-slate-500">A escolha vale para todas as fases e pode ser alterada a qualquer momento nas Configurações.</p>
        <div className="mt-5"><SeletorModo valor={modo} onChange={setModo} /></div>
        <div className="mt-6 flex justify-end gap-2">
          <button className="btn-secundario" onClick={onFechar}>Cancelar</button>
          <button className="btn-primario" onClick={() => { atualizar((s) => { s.modo = modo; s.modoEscolhido = true; }); onEscolhido(); }}>Começar</button>
        </div>
      </div>
    </div>
  );
}
