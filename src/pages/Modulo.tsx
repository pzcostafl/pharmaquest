import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useBanco } from '../lib/hooks';
import { listarGrupos } from '../lib/grupos';
import { atualizar, cicloDe, medConcluido, medConcluidoAlgumaVez, reiniciarGrupo, statsGrupo, useEstado } from '../lib/progresso';
import { chaveItem, FASES, ROTULO_FASE_CURTO } from '../lib/questoes';
import { vinculoNoGrupo, pubchemDe } from '../data/banco';
import { Pagina } from '../components/Layout';
import { Barra, avisar, pct, Vazio } from '../components/ui';
import { Icone } from '../components/Icone';
import { SeletorModo } from '../components/EscolhaModo';

export function Modulo() {
  const { g = '' } = useParams();
  const banco = useBanco();
  const e = useEstado();
  const nav = useNavigate();
  const grupo = listarGrupos().find((x) => x.id === g);
  const meds = banco.porGrupo.get(g) ?? [];
  const ids = meds.map((m) => m.id);
  const s = statsGrupo(e, g, ids);
  const [confirmaReset, setConfirmaReset] = useState(false);
  const [baixando, setBaixando] = useState(false);
  const [filtroClasse, setFiltroClasse] = useState('');

  if (!grupo) return <Pagina><Vazio>Grupo não encontrado. <Link to="/" className="underline">Voltar</Link></Vazio></Pagina>;

  const erradas = ids.flatMap((m) => FASES.map((f) => chaveItem(g, m, f))).filter((k) => e.itens[k] && e.itens[k].ultimo !== 'certo');
  const desbloq = !!e.gruposConcluidos[g];
  const pos = e.posicao[g];
  const classes = [...new Set(meds.map((m) => vinculoNoGrupo(m, g).classeId))];
  const visiveis = filtroClasse ? meds.filter((m) => vinculoNoGrupo(m, g).classeId === filtroClasse) : meds;
  const ocultosDoGrupo = banco.ocultos.filter((o) => o.med.vinculos.some((v) => v.grupoId === g));

  const baixarOffline = async () => {
    setBaixando(true);
    try {
      const urls = meds.flatMap((m) => pubchemDe(m).map((p) => p.imagem));
      const cache = await caches.open('pharmaquest-v1');
      await cache.addAll(urls);
      atualizar((st) => { if (!st.offline.includes(g)) st.offline.push(g); });
      avisar('Módulo disponível offline', `${urls.length} estruturas moleculares e todo o conteúdo do grupo foram salvos neste dispositivo.`, 'download');
    } catch {
      avisar('Não foi possível baixar agora', 'Verifique a conexão e tente novamente.', 'alerta');
    } finally {
      setBaixando(false);
    }
  };

  return (
    <Pagina>
      <Link to="/" className="btn-fantasma -ml-3 mb-2 px-3"><Icone nome="voltar" className="h-4 w-4" /> Módulos</Link>
      <header className="cartao surgir mb-6 p-5 sm:p-6">
        <div className="flex flex-wrap items-start gap-4">
          <span className="rounded-2xl bg-petroleo-50 p-3.5 text-petroleo-700 dark:bg-petroleo-900/50 dark:text-petroleo-200"><Icone nome={grupo.icone} className="h-7 w-7" /></span>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{grupo.nome}</h1>
            <p className="text-sm text-slate-500">{grupo.descricao}</p>
            <div className="mt-3 flex max-w-xl items-center gap-3">
              <Barra valor={s.pct} className="h-2" />
              <span className="shrink-0 text-sm font-semibold">{s.concluidos}/{s.total}</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Domínio: <strong className="text-slate-700 dark:text-slate-200">{s.nivel} ({pct(s.dominio)})</strong> · {s.acertos} acertos · {s.parciais} parciais · {s.erros} erros{cicloDe(e, g) > 0 && ` · ciclo ${cicloDe(e, g) + 1}`}
            </p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap [&>*]:whitespace-normal [&>*]:text-center">
          <button className="btn-primario col-span-2 sm:col-span-1" disabled={!meds.length} onClick={() => nav(`/jogar/${g}`)}>
            <Icone nome="avancar" className="h-4 w-4" /> {pos ? `Continuar (${banco.medicamentos.get(pos.medId)?.nome ?? ''})` : s.concluidos ? 'Continuar' : 'Iniciar estudos'}
          </button>
          <button className="btn-secundario" disabled={!erradas.length} onClick={() => nav(`/quiz?tipo=erradas&g=${g}`)} title="Somente questões cuja última resposta não foi correta">
            <Icone nome="repetir" className="h-4 w-4" /> Estudar só as erradas ({erradas.length})
          </button>
          <Link to={desbloq ? `/resumo/${g}` : '#'} onClick={(ev) => !desbloq && ev.preventDefault()} className={`btn-secundario ${desbloq ? '' : 'cursor-not-allowed opacity-50'}`} title={desbloq ? '' : 'Desbloqueia ao concluir todos os medicamentos da pasta'}>
            <Icone nome="livro" className="h-4 w-4" /> Resumo do grupo {!desbloq && '🔒'}
          </Link>
          <Link to={desbloq ? `/simulado/${g}` : '#'} onClick={(ev) => !desbloq && ev.preventDefault()} className={`btn-secundario ${desbloq ? '' : 'cursor-not-allowed opacity-50'}`}>
            <Icone nome="diploma" className="h-4 w-4" /> Simulado final {!desbloq && '🔒'}
          </Link>
          <button className="btn-secundario" onClick={baixarOffline} disabled={baixando}>
            <Icone nome="download" className="h-4 w-4" /> {e.offline.includes(g) ? 'Atualizar offline' : baixando ? 'Baixando…' : 'Baixar para offline'}
          </button>
          <button className="btn-fantasma col-span-2 text-erro-600 sm:ml-auto" onClick={() => setConfirmaReset(true)} disabled={!s.concluidos && !pos}>Reiniciar grupo</button>
        </div>
        {confirmaReset && (
          <div className="surgir mt-4 rounded-xl border border-erro-500/30 bg-erro-50 p-4 text-sm dark:bg-erro-700/15">
            <p>Reiniciar começa um novo ciclo de estudo deste grupo. <strong>Seu histórico, estatísticas, pontos, conquistas e o resumo desbloqueado são preservados.</strong></p>
            <div className="mt-3 flex gap-2">
              <button className="btn-primario" onClick={() => { reiniciarGrupo(g); setConfirmaReset(false); avisar('Grupo reiniciado', 'Novo ciclo iniciado; histórico preservado.', 'repetir'); }}>Confirmar reinício</button>
              <button className="btn-secundario" onClick={() => setConfirmaReset(false)}>Cancelar</button>
            </div>
          </div>
        )}
      </header>

      <section className="mb-6 cartao p-5">
        <p className="mb-3 text-sm font-semibold">Formato das questões</p>
        <SeletorModo valor={e.modo} onChange={(m) => atualizar((st) => { st.modo = m; st.modoEscolhido = true; })} />
      </section>

      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Princípios ativos</h2>
          <select className="campo w-auto py-2 text-sm" value={filtroClasse} onChange={(ev) => setFiltroClasse(ev.target.value)} aria-label="Filtrar por classe farmacológica">
            <option value="">Todas as classes</option>
            {classes.map((c) => <option key={c} value={c}>{banco.classes.get(c)?.sigla ?? banco.classes.get(c)?.nome}</option>)}
          </select>
        </div>
        {!meds.length && <Vazio>Nenhum medicamento com conteúdo validado para as três fases neste grupo ainda.</Vazio>}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visiveis.map((m) => {
            const conc = medConcluido(e, g, m.id);
            const jaFez = medConcluidoAlgumaVez(e, g, m.id);
            const v = vinculoNoGrupo(m, g);
            const c = banco.classes.get(v.classeId);
            return (
              <div key={m.id} className="cartao flex flex-col p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{m.nome}</p>
                    <p className="text-xs text-slate-500">{jaFez ? (c?.sigla ?? c?.nome) : 'Classe revelada após a fase 2'}</p>
                  </div>
                  {conc ? <span className="selo bg-acerto-100 text-acerto-700 dark:bg-acerto-700/30 dark:text-acerto-100"><Icone nome="check" className="h-3 w-3" /> Concluído</span> : pos?.medId === m.id ? <span className="selo bg-petroleo-50 text-petroleo-700">Em andamento</span> : null}
                </div>
                <div className="mt-3 flex gap-1.5">
                  {FASES.map((f) => {
                    const it = e.itens[chaveItem(g, m.id, f)];
                    const cor = !it ? 'bg-slate-200 dark:bg-slate-700' : it.ultimo === 'certo' ? 'bg-acerto-500' : it.ultimo === 'parcial' ? 'bg-parcial-500' : 'bg-erro-500';
                    return <span key={f} className={`h-1.5 flex-1 rounded-full ${cor}`} title={`${ROTULO_FASE_CURTO[f]}: ${it ? it.ultimo : 'não respondida'}`} />;
                  })}
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="btn-secundario flex-1 py-2 text-xs" onClick={() => nav(`/jogar/${g}?med=${m.id}`)}>{conc ? 'Refazer fases' : 'Estudar'}</button>
                  {jaFez && <Link className="btn-fantasma flex-1 py-2 text-xs" to={`/ficha/${m.id}?g=${g}`}>Ver ficha</Link>}
                </div>
              </div>
            );
          })}
        </div>
        {ocultosDoGrupo.length > 0 && (
          <details className="mt-6 rounded-xl border border-slate-200 p-4 text-sm dark:border-slate-800">
            <summary className="cursor-pointer font-medium text-slate-600 dark:text-slate-300">{ocultosDoGrupo.length} princípio(s) ativo(s) cadastrado(s) mas ainda fora do jogo (conteúdo incompleto)</summary>
            <ul className="mt-3 space-y-1 text-slate-500">
              {ocultosDoGrupo.map((o) => <li key={o.med.id}><strong>{o.med.nome}</strong>: {o.motivos.join('; ')}</li>)}
            </ul>
            <p className="mt-2 text-xs text-slate-500">Regra do banco: um medicamento só entra no jogo quando tem conteúdo para todas as fases. Nada é completado automaticamente.</p>
          </details>
        )}
      </section>
    </Pagina>
  );
}
