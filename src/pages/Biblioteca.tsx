import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useBanco } from '../lib/hooks';
import { listarGrupos } from '../lib/grupos';
import { alternarFavorito, medConcluidoAlgumaVez, useEstado } from '../lib/progresso';
import { normalizar } from '../lib/corretor';
import { Pagina } from '../components/Layout';
import { Ficha } from '../components/Ficha';
import { Vazio } from '../components/ui';
import { Icone } from '../components/Icone';

/** Pesquisa de medicamentos, filtros por grupo/classe e favoritos. */
export function Biblioteca() {
  const banco = useBanco();
  const e = useEstado();
  const grupos = listarGrupos();
  const [busca, setBusca] = useState('');
  const [grupo, setGrupo] = useState('');
  const [classe, setClasse] = useState('');
  const [soFav, setSoFav] = useState(false);
  const [revelar, setRevelar] = useState(false);

  const jogaveis = useMemo(() => {
    const ids = new Set([...banco.porGrupo.values()].flat().map((m) => m.id));
    return [...banco.medicamentos.values()].filter((m) => ids.has(m.id)).sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
  }, [banco]);

  const classesDisp = [...banco.classes.values()].filter((c) => (!grupo || c.grupoId === grupo) && jogaveis.some((m) => m.vinculos.some((v) => v.classeId === c.id)));
  const nb = normalizar(busca);
  const lista = jogaveis.filter((m) => {
    if (soFav && !e.favoritos.includes(m.id)) return false;
    if (grupo && !m.vinculos.some((v) => v.grupoId === grupo)) return false;
    if (classe && !m.vinculos.some((v) => v.classeId === classe)) return false;
    if (!nb) return true;
    const alvo = normalizar([m.nome, ...m.sinonimos, ...m.nomesComerciais.map((n) => n.nome)].join(' '));
    return alvo.includes(nb);
  });

  // Evita entregar respostas: classe/marcas só aparecem para medicamentos já estudados (ou se o aluno optar por revelar)
  const podeVer = (id: string, g: string) => revelar || medConcluidoAlgumaVez(e, g, id);

  return (
    <Pagina>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Biblioteca de medicamentos</h1>
      <p className="mt-1 text-slate-500">{jogaveis.length} princípios ativos · pesquise por nome, sinônimo ou marca</p>
      <div className="cartao mt-5 grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_auto]">
        <label className="relative">
          <span className="sr-only">Pesquisar</span>
          <Icone nome="busca" className="pointer-events-none absolute top-3 left-3 h-4 w-4 text-slate-400" />
          <input className="campo pl-9" placeholder="Pesquisar medicamento…" value={busca} onChange={(ev) => setBusca(ev.target.value)} />
        </label>
        <select className="campo" value={grupo} onChange={(ev) => { setGrupo(ev.target.value); setClasse(''); }} aria-label="Grupo terapêutico">
          <option value="">Todos os grupos</option>
          {grupos.map((g) => <option key={g.id} value={g.id}>{g.nomeCurto}</option>)}
        </select>
        <select className="campo" value={classe} onChange={(ev) => setClasse(ev.target.value)} aria-label="Classe farmacológica">
          <option value="">Todas as classes</option>
          {classesDisp.map((c) => <option key={c.id} value={c.id}>{c.sigla ? `${c.sigla} — ${c.nome}` : c.nome}</option>)}
        </select>
        <div className="flex items-center gap-3 text-sm">
          <label className="flex items-center gap-1.5"><input type="checkbox" checked={soFav} onChange={(ev) => setSoFav(ev.target.checked)} className="accent-petroleo-700" /> Favoritos</label>
          <label className="flex items-center gap-1.5" title="Mostra classe e marcas mesmo de medicamentos ainda não estudados"><input type="checkbox" checked={revelar} onChange={(ev) => setRevelar(ev.target.checked)} className="accent-petroleo-700" /> Revelar tudo</label>
        </div>
      </div>
      {!lista.length ? <div className="mt-6"><Vazio>Nenhum medicamento encontrado.</Vazio></div> : (
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((m) => {
            const g = m.vinculos[0].grupoId;
            const ver = podeVer(m.id, g);
            const c = banco.classes.get(m.vinculos[0].classeId);
            const fav = e.favoritos.includes(m.id);
            return (
              <li key={m.id} className="cartao flex items-start gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <Link to={`/ficha/${m.id}?g=${g}`} className="font-semibold text-slate-900 hover:text-petroleo-700 dark:text-white">{m.nome}</Link>
                  <p className="text-xs text-slate-500">{m.vinculos.map((v) => grupos.find((x) => x.id === v.grupoId)?.nomeCurto).join(' · ')}</p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{ver ? `${c?.sigla ?? c?.nome} · ${m.nomesComerciais.slice(0, 3).map((n) => n.nome).join(', ')}` : 'Estude para revelar classe e marcas'}</p>
                </div>
                <button className="btn-fantasma px-2" onClick={() => alternarFavorito(m.id)} aria-pressed={fav} title="Favorito"><Icone nome="coracaoFav" preenchido={fav} className={`h-5 w-5 ${fav ? 'text-erro-500' : ''}`} /></button>
              </li>
            );
          })}
        </ul>
      )}
    </Pagina>
  );
}

export function FichaPagina() {
  const { id = '' } = useParams();
  const [sp] = useSearchParams();
  const banco = useBanco();
  const e = useEstado();
  const m = banco.medicamentos.get(id);
  const g = sp.get('g') ?? m?.vinculos[0]?.grupoId ?? '';
  if (!m) return <Pagina estreita><Vazio>Medicamento não encontrado.</Vazio></Pagina>;
  const estudado = m.vinculos.some((v) => medConcluidoAlgumaVez(e, v.grupoId, m.id));
  return (
    <Pagina estreita>
      <button onClick={() => history.back()} className="btn-fantasma -ml-3 mb-2 px-3"><Icone nome="voltar" className="h-4 w-4" /> Voltar</button>
      {!estudado && <p className="mb-3 rounded-xl bg-parcial-50 p-3 text-sm text-parcial-700 dark:bg-parcial-700/15 dark:text-parcial-100">Você ainda não concluiu as fases deste medicamento — a ficha revela todas as respostas.</p>}
      <Ficha med={m} grupoId={g} />
      <div className="mt-4 flex flex-wrap gap-2">
        <Link to={`/jogar/${g}?med=${m.id}`} className="btn-primario"><Icone nome="repetir" className="h-4 w-4" /> {estudado ? 'Refazer as fases' : 'Estudar este medicamento'}</Link>
        <Link to={`/modulo/${g}`} className="btn-secundario">Ir para o módulo</Link>
      </div>
    </Pagina>
  );
}
