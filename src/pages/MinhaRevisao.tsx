import { Link, useNavigate } from 'react-router-dom';
import { useBanco } from '../lib/hooks';
import { useEstado } from '../lib/progresso';
import { analiseErros, selecionarRevisao } from '../lib/conquistas';
import { parseChave, ROTULO_FASE } from '../lib/questoes';
import { Pagina } from '../components/Layout';
import { Secao, Vazio } from '../components/ui';
import { Icone } from '../components/Icone';
import { Evolucao } from './Desempenho';

export function MinhaRevisao() {
  const banco = useBanco();
  const e = useEstado();
  const nav = useNavigate();
  const a = analiseErros(e);
  const agora = Date.now();
  const vencidas = Object.entries(e.itens).filter(([, it]) => it.srs.proxima <= agora).length;
  const corretas = Object.entries(e.itens).filter(([, it]) => it.ultimo === 'certo');
  const total = selecionarRevisao(e, 999).length;

  return (
    <Pagina>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Minha Revisão</h1>
      <p className="mt-1 text-slate-500">Repetição espaçada: o que você errou volta antes; o que você domina volta em intervalos cada vez maiores.</p>

      <section className="cartao mt-6 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Revisão rápida</h2>
            <p className="text-sm text-slate-500">{vencidas} questões vencidas para hoje · {total} no seu banco de revisão</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[5, 10, 20, 30].map((n) => (
              <button key={n} className={n === 10 ? 'btn-primario' : 'btn-secundario'} disabled={!total} onClick={() => nav(`/quiz?tipo=revisao&n=${n}`)}>{n} questões</button>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Secao titulo="Medicamentos com mais erros">
          {!a.meds.length ? <Vazio>Nenhum erro registrado até agora.</Vazio> : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {a.meds.slice(0, 10).map((m) => (
                <li key={m.medId} className="flex items-center gap-3 py-2.5 text-sm">
                  <span className="font-medium">{banco.medicamentos.get(m.medId)?.nome}</span>
                  <span className="selo bg-erro-50 text-erro-700 dark:bg-erro-700/20 dark:text-erro-100">{m.erros} erros</span>
                  {m.parciais > 0 && <span className="selo bg-parcial-50 text-parcial-700">{m.parciais} parciais</span>}
                  <Link to={`/quiz?tipo=med&med=${m.medId}`} className="btn-fantasma ml-auto px-2 py-1 text-xs">Revisar</Link>
                </li>
              ))}
            </ul>
          )}
        </Secao>
        <Secao titulo="Classes que você mais confunde">
          {!a.classes.length ? <Vazio>Sem confusões de classe registradas.</Vazio> : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {a.classes.slice(0, 10).map(([cid, n]) => {
                const c = banco.classes.get(cid);
                return (
                  <li key={cid} className="flex items-center gap-3 py-2.5 text-sm">
                    <span><strong>{c?.sigla ?? c?.nome}</strong>{c?.sigla && <span className="text-slate-500"> — {c.nome}</span>}</span>
                    <span className="ml-auto selo bg-erro-50 text-erro-700 dark:bg-erro-700/20 dark:text-erro-100">{n}×</span>
                    <Link to={`/quiz?tipo=classe&classe=${cid}`} className="btn-fantasma px-2 py-1 text-xs">Revisar</Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Secao>
        <Secao titulo="Efeitos adversos ainda não memorizados" acao={a.eaPendentes.length ? <Link to="/quiz?tipo=efeitos" className="btn-secundario py-1.5 text-xs">Treinar</Link> : undefined}>
          {!a.eaPendentes.length ? <Vazio>Nenhum pendente.</Vazio> : (
            <div className="flex flex-wrap gap-2">{a.eaPendentes.map((p) => <Link key={p.chave} to={`/ficha/${p.medId}?g=${parseChave(p.chave).grupoId}`} className="selo bg-slate-100 py-1 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200">{banco.medicamentos.get(p.medId)?.nome}</Link>)}</div>
          )}
        </Secao>
        <Secao titulo="Questões salvas" acao={e.salvas.length ? <Link to="/quiz?tipo=salvas" className="btn-secundario py-1.5 text-xs">Responder</Link> : undefined}>
          {!e.salvas.length ? <Vazio>Use o ícone <Icone nome="marcador" className="inline h-4 w-4" /> durante o jogo para salvar questões.</Vazio> : (
            <ul className="space-y-1 text-sm">{e.salvas.map((k) => { const p = parseChave(k); return <li key={k}><strong>{banco.medicamentos.get(p.medId)?.nome}</strong> · <span className="text-slate-500">{ROTULO_FASE[p.fase]}</span></li>; })}</ul>
          )}
        </Secao>
        <Secao titulo={`Questões respondidas corretamente (${corretas.length})`}>
          {!corretas.length ? <Vazio>Ainda nenhuma.</Vazio> : (
            <ul className="max-h-64 space-y-1 overflow-y-auto text-sm">
              {corretas.map(([k, it]) => { const p = parseChave(k); return <li key={k} className="flex justify-between gap-2"><span><strong>{banco.medicamentos.get(p.medId)?.nome}</strong> · <span className="text-slate-500">{ROTULO_FASE[p.fase]}</span></span><span className="shrink-0 text-xs text-slate-400">próx.: {new Date(it.srs.proxima).toLocaleDateString('pt-BR')}</span></li>; })}
            </ul>
          )}
        </Secao>
        <Secao titulo="Histórico de evolução"><Evolucao /></Secao>
      </div>
    </Pagina>
  );
}
