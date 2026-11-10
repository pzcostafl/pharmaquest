import { useState } from 'react';
import type { Medicamento } from '../data/types';
import { pubchemDe } from '../data/banco';
import { Icone } from './Icone';

const ROTULO_BIO: Record<string, string> = {
  anticorpo: 'Anticorpo monoclonal (imunoglobulina, ~150 kDa)',
  proteina: 'Proteína/peptídeo de alto peso molecular',
  peptideo: 'Peptídeo',
};

/** Estrutura 2D oficial do PubChem (imagem baixada do PUG REST, com CID e fórmula). */
export function Molecula({ med, compacta = false }: { med: Medicamento; compacta?: boolean }) {
  const infos = pubchemDe(med);
  const [falhou, setFalhou] = useState<Record<number, boolean>>({});

  if (!infos.length) {
    const bio = ROTULO_BIO[med.tipoMolecula];
    return (
      <div className="flex h-full min-h-40 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center dark:border-slate-700 dark:bg-slate-900/60">
        <Icone nome="molecula" className="h-10 w-10 text-petroleo-400" />
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{bio ?? 'Estrutura 2D não disponível'}</p>
        <p className="max-w-xs text-xs text-slate-500">
          {bio
            ? 'Macromoléculas biológicas não têm uma estrutura bidimensional útil para estudo; o reconhecimento é pelo nome, alvo e sufixo (ex.: -mabe, insulina).'
            : 'A estrutura ainda não foi obtida de uma base científica validada; nenhuma imagem é exibida para não induzir a erro.'}
        </p>
      </div>
    );
  }

  return (
    <div className={`grid gap-3 ${infos.length > 1 ? 'sm:grid-cols-2' : ''}`}>
      {infos.map((p) => (
        <figure key={p.cid} className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700">
          {falhou[p.cid] ? (
            <div className="flex h-40 items-center text-xs text-slate-500">Imagem indisponível offline</div>
          ) : (
            <img
              src={p.imagem}
              alt={`Estrutura molecular 2D de ${p.nome} (PubChem CID ${p.cid})`}
              className={`${compacta ? 'max-h-36' : 'max-h-44 sm:max-h-52'} w-auto max-w-full object-contain`}
              onError={() => setFalhou((f) => ({ ...f, [p.cid]: true }))}
              loading="lazy"
            />
          )}
          <figcaption className="mt-2 text-center text-xs text-slate-600">
            {infos.length > 1 && <span className="block font-medium capitalize">{p.nome}</span>}
            <span className="font-mono text-sm text-slate-800" dangerouslySetInnerHTML={{ __html: formulaHtml(p.formula) }} />
            <span className="mx-1.5 text-slate-400">·</span>
            <a className="underline decoration-dotted hover:text-petroleo-700" href={`https://pubchem.ncbi.nlm.nih.gov/compound/${p.cid}`} target="_blank" rel="noreferrer">
              PubChem CID {p.cid}
            </a>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function formulaHtml(f: string) {
  return f.replace(/(\d+)/g, '<sub>$1</sub>').replace(/<sub>(\d+)<\/sub>([+-])/g, '<sup>$1$2</sup>');
}
