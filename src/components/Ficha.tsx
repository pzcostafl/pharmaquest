import type { GrupoId, Medicamento } from '../data/types';
import { getBanco, marcasNoGrupo, vinculoNoGrupo } from '../data/banco';
import { listarGrupos } from '../lib/grupos';
import { Molecula } from './Molecula';
import { SeloMarca, SeloValidacao } from './ui';
import { alternarFavorito, useEstado } from '../lib/progresso';
import { Icone } from './Icone';

function Lista({ itens }: { itens: string[] }) {
  if (!itens.length) return <p className="text-sm text-slate-500">n.d.</p>;
  return (
    <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
      {itens.map((x, i) => <li key={i}>{x}</li>)}
    </ul>
  );
}

function Linha({ rotulo, children }: { rotulo: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5 border-t border-slate-100 py-3.5 sm:grid-cols-[180px_1fr] sm:gap-4 dark:border-slate-800">
      <dt className="rotulo pt-0.5">{rotulo}</dt>
      <dd className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">{children}</dd>
    </div>
  );
}

/** Ficha de revisão completa do princípio ativo. */
export function Ficha({ med, grupoId }: { med: Medicamento; grupoId?: GrupoId }) {
  const banco = getBanco();
  const grupos = listarGrupos();
  const e = useEstado();
  const fav = e.favoritos.includes(med.id);
  const g = grupoId ?? med.vinculos[0].grupoId;
  const v = vinculoNoGrupo(med, g);
  const cl = banco.classes.get(v.classeId);
  const marcas = grupoId ? marcasNoGrupo(med, g) : med.nomesComerciais;

  return (
    <article className="cartao overflow-hidden">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 bg-petroleo-50/60 px-5 py-4 sm:px-6 dark:border-slate-800 dark:bg-petroleo-950/40">
        <div>
          <p className="rotulo">Ficha de revisão</p>
          <h2 className="text-2xl font-bold text-petroleo-900 dark:text-petroleo-100">{med.nome}</h2>
          {med.sinonimos.length > 0 && <p className="text-xs text-slate-500">Também: {med.sinonimos.slice(0, 4).join(' · ')}</p>}
        </div>
        <div className="flex items-center gap-2">
          <SeloValidacao estado={med.validacao} />
          <button className="btn-fantasma px-2" onClick={() => alternarFavorito(med.id)} aria-pressed={fav} title={fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}>
            <Icone nome="coracaoFav" preenchido={fav} className={`h-5 w-5 ${fav ? 'text-erro-500' : ''}`} />
          </button>
        </div>
      </header>
      <div className="grid gap-5 p-5 sm:p-6">
        <dl className="order-2">
          <Linha rotulo="Grupo terapêutico">
            {med.vinculos.map((x) => (
              <span key={x.grupoId} className="block">
                <strong>{grupos.find((y) => y.id === x.grupoId)?.nome ?? x.grupoId}</strong>
                <span className="text-slate-500"> — {x.contexto}</span>
              </span>
            ))}
          </Linha>
          <Linha rotulo="Classe farmacológica">
            {med.vinculos.map((x) => {
              const c = banco.classes.get(x.classeId);
              return (
                <span key={x.grupoId + x.classeId} className="block">
                  <strong>{c?.nome ?? x.classeId}{c?.sigla ? ` (${c.sigla})` : ''}</strong>
                  {x.subclasse && <span className="text-slate-500"> · {x.subclasse}</span>}
                </span>
              );
            }).filter((_, i, arr) => arr.length === 1 || i === 0 || med.vinculos[i].classeId !== med.vinculos[0].classeId)}
          </Linha>
          <Linha rotulo="Mecanismo de ação">{med.mecanismo}{cl && <span className="mt-1 block text-xs text-slate-500">Classe: {cl.mecanismoCurto}</span>}</Linha>
          <Linha rotulo="Indicações aprovadas"><Lista itens={med.indicacoes} /></Linha>
          {med.offLabel?.length ? <Linha rotulo="Uso off-label"><Lista itens={med.offLabel.map((x) => `${x} (off-label)`)} /></Linha> : null}
          <Linha rotulo="Nomes comerciais">
            <ul className="space-y-1.5">
              {marcas.map((n) => <li key={n.nome}><SeloMarca n={n} /></li>)}
              {med.generico && <li className="text-sm">Genérico: <strong>{med.nome}</strong> (identificado pelo princípio ativo)</li>}
            </ul>
            <p className="mt-2 text-xs text-slate-500">Situação de registro/comercialização deve ser confirmada no Bulário Eletrônico e na consulta de produtos da Anvisa — registro não significa disponibilidade nas farmácias.</p>
          </Linha>
          <Linha rotulo="Efeitos adversos comuns"><Lista itens={med.eaComuns.map((x) => x.termo)} /></Linha>
          <Linha rotulo="Efeitos adversos graves"><Lista itens={med.eaGraves.map((x) => x.termo)} /></Linha>
          <Linha rotulo="Contraindicações"><Lista itens={med.contraindicacoes} /></Linha>
          <Linha rotulo="Precauções"><Lista itens={med.precaucoes} /></Linha>
          <Linha rotulo="Interações relevantes"><Lista itens={med.interacoes} /></Linha>
          {med.regulatorio && <Linha rotulo="Regulatório (Brasil)">{med.regulatorio}</Linha>}
          <Linha rotulo="Fontes">
            <Lista itens={med.referencias} />
            <p className="mt-2 text-xs text-slate-500">Última revisão do cadastro: {med.dataRevisao}. Estrutura molecular: PubChem (NIH/NLM).</p>
          </Linha>
        </dl>
        <div className="order-1 mx-auto w-full max-w-md">
          <Molecula med={med} compacta />
        </div>
      </div>
      <p className="border-t border-slate-100 bg-slate-50 px-5 py-3 text-xs text-slate-500 sm:px-6 dark:border-slate-800 dark:bg-slate-900/60">
        Conteúdo educacional. Não substitui a bula, as diretrizes clínicas vigentes nem a avaliação de um profissional de saúde.
      </p>
    </article>
  );
}
