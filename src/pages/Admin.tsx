import { useMemo, useState } from 'react';
import { useBanco } from '../lib/hooks';
import { getBanco, invalidarBanco, pendencias } from '../data/banco';
import { carregarConteudoAdmin, salvarConteudoAdmin, type ConteudoAdmin } from '../lib/conteudo';
import { listarGrupos } from '../lib/grupos';
import { estadoDoPerfil, listarPerfis, statsGrupo } from '../lib/progresso';
import { parseChave, ROTULO_FASE } from '../lib/questoes';
import type { Classe, Medicamento, NomeComercial, Termo, VinculoGrupo } from '../data/types';
import { Pagina } from '../components/Layout';
import { avisar, pct, Secao, SeloValidacao, Vazio } from '../components/ui';
import { Icone } from '../components/Icone';

// ---------- acesso administrativo (PIN local) ----------
const K_PIN = 'pq:admin-pin';
async function hash(s: string) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('pharmaquest:' + s));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('');
}

function Acesso({ onOk }: { onOk: () => void }) {
  const existe = !!localStorage.getItem(K_PIN);
  const [pin, setPin] = useState('');
  const [pin2, setPin2] = useState('');
  const [erro, setErro] = useState('');
  return (
    <Pagina estreita>
      <form className="cartao mx-auto max-w-md p-6" onSubmit={async (ev) => {
        ev.preventDefault();
        if (!existe) {
          if (pin.length < 6) return setErro('Use ao menos 6 caracteres.');
          if (pin !== pin2) return setErro('Os PINs não conferem.');
          localStorage.setItem(K_PIN, await hash(pin));
          onOk();
        } else if ((await hash(pin)) === localStorage.getItem(K_PIN)) onOk();
        else setErro('PIN incorreto.');
      }}>
        <Icone nome="escudo" className="h-8 w-8 text-petroleo-600" />
        <h1 className="mt-3 text-xl font-bold">Área administrativa</h1>
        <p className="mt-1 text-sm text-slate-500">{existe ? 'Informe o PIN de professor/administrador.' : 'Primeiro acesso: defina o PIN de administrador deste dispositivo.'}</p>
        <input type="password" className="campo mt-4" placeholder="PIN" value={pin} onChange={(e) => setPin(e.target.value)} autoFocus />
        {!existe && <input type="password" className="campo mt-2" placeholder="Confirme o PIN" value={pin2} onChange={(e) => setPin2(e.target.value)} />}
        {erro && <p className="mt-2 text-sm text-erro-600">{erro}</p>}
        <button className="btn-primario mt-4 w-full">{existe ? 'Entrar' : 'Definir PIN e entrar'}</button>
        <p className="mt-3 text-xs text-slate-500">Nesta versão sem servidor, o PIN protege o painel apenas neste navegador. Para uso em turma, a separação de papéis deve ser feita no servidor (ver README).</p>
      </form>
    </Pagina>
  );
}

// ---------- serialização dos campos de lista ----------
const linhas = (s: string) => s.split('\n').map((x) => x.trim()).filter(Boolean);
const termosTxt = (t: Termo[]) => t.map((x) => [x.termo, x.sinonimos.join('; ')].filter(Boolean).join(' | ')).join('\n');
const txtTermos = (s: string): Termo[] => linhas(s).map((l) => { const [t, sin = ''] = l.split('|').map((x) => x.trim()); return { termo: t, sinonimos: sin.split(';').map((x) => x.trim()).filter(Boolean) }; });
const marcasTxt = (n: NomeComercial[]) => n.map((x) => [x.nome, x.tipo, x.composicao ?? '', x.fabricante ?? '', x.verificacao, x.obs ?? '', x.grupoId ?? ''].join(' | ')).join('\n');
const txtMarcas = (s: string): NomeComercial[] => linhas(s).map((l) => {
  const [nome, tipo = 'marca', composicao, fabricante, verificacao = 'pendente_anvisa', obs, grupoId] = l.split('|').map((x) => x.trim());
  return { nome, tipo: (['referencia', 'marca', 'combinacao'].includes(tipo) ? tipo : 'marca') as NomeComercial['tipo'], composicao: composicao || undefined, fabricante: fabricante || undefined, verificacao: verificacao === 'confirmado_anvisa' ? 'confirmado_anvisa' : 'pendente_anvisa', obs: obs || undefined, grupoId: grupoId || undefined };
});
const vincTxt = (v: VinculoGrupo[]) => v.map((x) => [x.grupoId, x.classeId, x.subclasse ?? '', x.contexto, x.explicacaoFase1].join(' | ')).join('\n');
const txtVinc = (s: string): VinculoGrupo[] => linhas(s).map((l) => { const [grupoId, classeId, subclasse, contexto = '', explicacaoFase1 = ''] = l.split('|').map((x) => x.trim()); return { grupoId, classeId, subclasse: subclasse || undefined, contexto, explicacaoFase1 }; });

function vazio(): Medicamento {
  return { id: '', nome: '', sinonimos: [], vinculos: [], mecanismo: '', indicacoes: [], tipoMolecula: 'pequena', pubchem: [], nomesComerciais: [], generico: false, eaComuns: [], eaGraves: [], eaCaracteristico: '', distratoresEA: [], contraindicacoes: [], precaucoes: [], interacoes: [], explicacaoFase2: '', explicacaoFase3: '', referencias: [], dataRevisao: '', validacao: 'rascunho' };
}

function Campo({ r, children, ajuda }: { r: string; children: React.ReactNode; ajuda?: string }) {
  return <label className="block"><span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{r}</span>{children}{ajuda && <span className="mt-0.5 block text-[11px] text-slate-400">{ajuda}</span>}</label>;
}

function Editor({ inicial, onFechar, autor }: { inicial: Medicamento; onFechar: () => void; autor: string }) {
  const [m, setM] = useState<Medicamento>(structuredClone(inicial));
  const [txt, setTxt] = useState({
    sinonimos: inicial.sinonimos.join('\n'), vinculos: vincTxt(inicial.vinculos), indicacoes: inicial.indicacoes.join('\n'), offLabel: (inicial.offLabel ?? []).join('\n'),
    pubchem: inicial.pubchem.join('\n'), marcas: marcasTxt(inicial.nomesComerciais), eaComuns: termosTxt(inicial.eaComuns), eaGraves: termosTxt(inicial.eaGraves),
    distratores: inicial.distratoresEA.join('\n'), contra: inicial.contraindicacoes.join('\n'), prec: inicial.precaucoes.join('\n'), inter: inicial.interacoes.join('\n'), refs: inicial.referencias.join('\n'),
  });
  const novo = !inicial.id;
  const montar = (): Medicamento => ({
    ...m, id: m.id.trim(), sinonimos: linhas(txt.sinonimos), vinculos: txtVinc(txt.vinculos), indicacoes: linhas(txt.indicacoes), offLabel: linhas(txt.offLabel),
    pubchem: linhas(txt.pubchem), nomesComerciais: txtMarcas(txt.marcas), eaComuns: txtTermos(txt.eaComuns), eaGraves: txtTermos(txt.eaGraves), distratoresEA: linhas(txt.distratores),
    contraindicacoes: linhas(txt.contra), precaucoes: linhas(txt.prec), interacoes: linhas(txt.inter), referencias: linhas(txt.refs),
    dataRevisao: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/\. de |\.? de /g, '/').replace('.', ''),
  });
  const salvarRascunho = () => {
    const med = { ...montar(), validacao: 'rascunho' as const };
    if (!med.id || !med.nome) return avisar('Informe id e nome', undefined, 'alerta');
    const c = carregarConteudoAdmin();
    const reg = c.medicamentos[med.id] ?? { historico: [] };
    reg.rascunho = med;
    reg.historico.push({ ts: Date.now(), acao: 'rascunho salvo', autor });
    c.medicamentos[med.id] = reg;
    salvarConteudoAdmin(c);
    avisar('Rascunho salvo', 'A alteração só entra no jogo depois de validada e publicada.', 'editar');
    onFechar();
  };
  const t = (k: keyof typeof txt, rows = 3, ajuda?: string, rotulo?: string) => (
    <Campo r={rotulo ?? k} ajuda={ajuda}><textarea className="campo mt-1 font-mono text-xs" rows={rows} value={txt[k]} onChange={(e) => setTxt({ ...txt, [k]: e.target.value })} /></Campo>
  );
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 p-2 sm:p-6">
      <div className="cartao mx-auto max-w-5xl p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-semibold">{novo ? 'Novo medicamento' : `Editar: ${inicial.nome}`}</h2><button className="btn-fantasma px-2" onClick={onFechar}><Icone nome="x" /></button></div>
        <div className="grid gap-4 md:grid-cols-2">
          <Campo r="ID (slug, sem acento)"><input className="campo mt-1" value={m.id} disabled={!novo} onChange={(e) => setM({ ...m, id: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })} /></Campo>
          <Campo r="Nome (DCB)"><input className="campo mt-1" value={m.nome} onChange={(e) => setM({ ...m, nome: e.target.value })} /></Campo>
          {t('sinonimos', 2, 'um por linha', 'Sinônimos e grafias alternativas')}
          {t('vinculos', 3, 'grupoId | classeId | subclasse | contexto | explicação da fase 1', 'Grupos terapêuticos e classes')}
          <Campo r="Mecanismo de ação"><textarea className="campo mt-1 text-sm" rows={3} value={m.mecanismo} onChange={(e) => setM({ ...m, mecanismo: e.target.value })} /></Campo>
          <Campo r="Explicação da fase 2"><textarea className="campo mt-1 text-sm" rows={3} value={m.explicacaoFase2} onChange={(e) => setM({ ...m, explicacaoFase2: e.target.value })} /></Campo>
          {t('indicacoes', 3, 'aprovadas, uma por linha', 'Indicações principais')}
          {t('offLabel', 2, 'uma por linha', 'Usos off-label')}
          <Campo r="Tipo de molécula"><select className="campo mt-1" value={m.tipoMolecula} onChange={(e) => setM({ ...m, tipoMolecula: e.target.value as Medicamento['tipoMolecula'] })}>{['pequena', 'peptideo', 'proteina', 'anticorpo', 'inorganico', 'associacao'].map((x) => <option key={x}>{x}</option>)}</select></Campo>
          {t('pubchem', 2, 'nome em inglês no PubChem; rode "npm run pubchem" para baixar a estrutura', 'Estrutura (PubChem)')}
          {t('marcas', 4, 'Nome | referencia/marca/combinacao | composição | fabricante | pendente_anvisa/confirmado_anvisa | obs | grupoId', 'Nomes comerciais')}
          <Campo r="Genérico disponível no Brasil"><select className="campo mt-1" value={String(m.generico)} onChange={(e) => setM({ ...m, generico: e.target.value === 'true' })}><option value="true">sim</option><option value="false">não / não confirmado</option></select></Campo>
          {t('eaComuns', 4, 'termo | sinônimo; sinônimo', 'Efeitos adversos comuns')}
          {t('eaGraves', 4, 'termo | sinônimo; sinônimo', 'Efeitos adversos graves')}
          <Campo r="Efeito característico (resposta da fase 3B)" ajuda="deve ser idêntico a um termo acima"><input className="campo mt-1" value={m.eaCaracteristico} onChange={(e) => setM({ ...m, eaCaracteristico: e.target.value })} /></Campo>
          {t('distratores', 3, '≥ 3 efeitos NÃO típicos deste fármaco', 'Distratores da fase 3B')}
          <Campo r="Explicação da fase 3"><textarea className="campo mt-1 text-sm" rows={3} value={m.explicacaoFase3} onChange={(e) => setM({ ...m, explicacaoFase3: e.target.value })} /></Campo>
          <Campo r="Regulatório (Brasil)"><input className="campo mt-1" value={m.regulatorio ?? ''} onChange={(e) => setM({ ...m, regulatorio: e.target.value || undefined })} /></Campo>
          {t('contra', 3, undefined, 'Contraindicações')}
          {t('prec', 3, undefined, 'Precauções')}
          {t('inter', 3, undefined, 'Interações')}
          {t('refs', 3, 'uma por linha', 'Referências bibliográficas')}
        </div>
        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <button className="btn-secundario" onClick={onFechar}>Cancelar</button>
          <button className="btn-primario" onClick={salvarRascunho}>Salvar como rascunho (pendente de validação)</button>
        </div>
      </div>
    </div>
  );
}

function Validar({ med, onFechar, autor }: { med: Medicamento; onFechar: () => void; autor: string }) {
  const checks = ['Grupo terapêutico e classe farmacológica conferidos em livro-texto/bula', 'Nomes comerciais conferidos no Bulário Eletrônico/consulta de produtos da Anvisa', 'Efeitos adversos, contraindicações e interações conferidos na bula vigente', 'Alternativas e respostas aceitas revisadas (sem ambiguidade)', 'Referências bibliográficas e data de revisão corretas'];
  const [ok, setOk] = useState<boolean[]>(checks.map(() => false));
  const [anvisa, setAnvisa] = useState(false);
  const pend = pendencias(med, getBanco().classes);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="cartao w-full max-w-xl p-6">
        <h2 className="text-lg font-semibold">Validar e publicar: {med.nome}</h2>
        {pend.length > 0 && <p className="mt-2 rounded-lg bg-erro-50 p-3 text-sm text-erro-700">Pendências que impedem a entrada no jogo: {pend.filter((p) => p !== 'cadastro em rascunho').join('; ') || '—'}</p>}
        <ul className="mt-4 space-y-2 text-sm">
          {checks.map((c, i) => <li key={i}><label className="flex gap-2"><input type="checkbox" className="accent-petroleo-700" checked={ok[i]} onChange={(e) => setOk(ok.map((x, j) => (j === i ? e.target.checked : x)))} /> {c}</label></li>)}
          <li className="border-t border-slate-100 pt-2 dark:border-slate-800"><label className="flex gap-2"><input type="checkbox" className="accent-petroleo-700" checked={anvisa} onChange={(e) => setAnvisa(e.target.checked)} /> Marcar todas as marcas como <strong>conferidas na Anvisa</strong></label></li>
        </ul>
        <div className="mt-5 flex justify-end gap-2">
          <button className="btn-secundario" onClick={onFechar}>Cancelar</button>
          <button className="btn-primario" disabled={!ok.every(Boolean)} onClick={() => {
            const c = carregarConteudoAdmin();
            const reg = c.medicamentos[med.id] ?? { historico: [] };
            const pub: Medicamento = { ...med, validacao: 'validado_docente', nomesComerciais: anvisa ? med.nomesComerciais.map((n) => ({ ...n, verificacao: 'confirmado_anvisa' })) : med.nomesComerciais };
            reg.publicado = pub;
            delete reg.rascunho;
            reg.historico.push({ ts: Date.now(), acao: 'validado e publicado', autor });
            c.medicamentos[med.id] = reg;
            salvarConteudoAdmin(c);
            invalidarBanco();
            avisar('Publicado', `${med.nome} validado por docente.`, 'escudo');
            onFechar();
          }}>Validar e publicar</button>
        </div>
      </div>
    </div>
  );
}

export function Admin() {
  const [logado, setLogado] = useState(sessionStorage.getItem('pq:admin') === '1');
  const [aba, setAba] = useState<'meds' | 'classes' | 'grupos' | 'desempenho' | 'dados'>('meds');
  if (!logado) return <Acesso onOk={() => { sessionStorage.setItem('pq:admin', '1'); setLogado(true); }} />;
  return (
    <Pagina>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-3xl font-bold">Área administrativa</h1><p className="text-sm text-slate-500">Toda edição científica passa por validação antes de entrar no jogo.</p></div>
        <button className="btn-secundario" onClick={() => { sessionStorage.removeItem('pq:admin'); setLogado(false); }}>Sair</button>
      </div>
      <nav className="mt-5 flex flex-wrap gap-1.5">
        {([['meds', 'Medicamentos'], ['classes', 'Classes'], ['grupos', 'Grupos terapêuticos'], ['desempenho', 'Desempenho dos estudantes'], ['dados', 'Importar / exportar']] as const).map(([k, r]) => (
          <button key={k} className={aba === k ? 'btn-primario' : 'btn-secundario'} onClick={() => setAba(k)}>{r}</button>
        ))}
      </nav>
      <div className="mt-5">
        {aba === 'meds' && <AbaMeds />}
        {aba === 'classes' && <AbaClasses />}
        {aba === 'grupos' && <AbaGrupos />}
        {aba === 'desempenho' && <AbaDesempenho />}
        {aba === 'dados' && <AbaDados />}
      </div>
    </Pagina>
  );
}

function AbaMeds() {
  const banco = useBanco();
  const [, forca] = useState(0);
  const [editar, setEditar] = useState<Medicamento | null>(null);
  const [validar, setValidar] = useState<Medicamento | null>(null);
  const [busca, setBusca] = useState('');
  const admin = carregarConteudoAdmin();
  const ocultos = new Map(banco.ocultos.map((o) => [o.med.id, o.motivos]));
  const todos = useMemo(() => {
    const m = new Map(banco.medicamentos);
    for (const [id, r] of Object.entries(admin.medicamentos)) if (r.rascunho && !m.has(id)) m.set(id, r.rascunho);
    return [...m.values()].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banco, editar, validar]);
  const lista = todos.filter((m) => m.nome.toLowerCase().includes(busca.toLowerCase()) || m.id.includes(busca.toLowerCase()));
  const autor = 'administrador';
  const alternarAtivo = (id: string) => {
    const c = carregarConteudoAdmin();
    c.desativados = c.desativados.includes(id) ? c.desativados.filter((x) => x !== id) : [...c.desativados, id];
    salvarConteudoAdmin(c);
    invalidarBanco();
    forca((x) => x + 1);
  };
  return (
    <Secao titulo={`Medicamentos (${todos.length})`} acao={<button className="btn-primario" onClick={() => setEditar(vazio())}><Icone nome="mais" className="h-4 w-4" /> Adicionar</button>}>
      <input className="campo mb-3" placeholder="Filtrar…" value={busca} onChange={(e) => setBusca(e.target.value)} />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead><tr className="border-b text-left text-xs uppercase text-slate-500 dark:border-slate-700"><th className="py-2">Medicamento</th><th>Validação</th><th>No jogo</th><th>Rascunho</th><th className="text-right">Ações</th></tr></thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {lista.map((m) => {
              const reg = admin.medicamentos[m.id];
              const fora = ocultos.get(m.id);
              const desat = admin.desativados.includes(m.id);
              return (
                <tr key={m.id} className="align-top">
                  <td className="py-2.5"><strong>{m.nome}</strong><span className="block text-xs text-slate-500">{m.vinculos.map((v) => v.grupoId).join(', ')}</span></td>
                  <td className="py-2.5"><SeloValidacao estado={m.validacao} /></td>
                  <td className="py-2.5 text-xs">{fora ? <span className="text-erro-600" title={fora.join('; ')}>Oculto: {fora[0]}</span> : <span className="text-acerto-700">Publicado</span>}</td>
                  <td className="py-2.5 text-xs">{reg?.rascunho ? <span className="selo bg-parcial-100 text-parcial-700">pendente de validação</span> : '—'}</td>
                  <td className="py-2.5 text-right whitespace-nowrap">
                    <button className="btn-fantasma px-2 py-1 text-xs" onClick={() => setEditar(reg?.rascunho ?? m)}>Editar</button>
                    <button className="btn-fantasma px-2 py-1 text-xs" onClick={() => setValidar(reg?.rascunho ?? m)}>Validar</button>
                    <button className="btn-fantasma px-2 py-1 text-xs" onClick={() => alternarAtivo(m.id)}>{desat ? 'Reativar' : 'Desativar'}</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {editar && <Editor inicial={editar} autor={autor} onFechar={() => setEditar(null)} />}
      {validar && <Validar med={validar} autor={autor} onFechar={() => setValidar(null)} />}
    </Secao>
  );
}

function AbaClasses() {
  const banco = useBanco();
  const [c, setC] = useState<Classe>({ id: '', nome: '', sigla: '', grupoId: 'antihipertensivos', mecanismoCurto: '', sinonimos: [] });
  const [sin, setSin] = useState('');
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Secao titulo="Nova classe farmacológica">
        <form className="space-y-3" onSubmit={(e) => {
          e.preventDefault();
          if (!c.id || !c.nome) return;
          const ad = carregarConteudoAdmin();
          ad.classes = [...ad.classes.filter((x) => x.id !== c.id), { ...c, sigla: c.sigla || undefined, sinonimos: sin.split(';').map((x) => x.trim()).filter(Boolean) }];
          salvarConteudoAdmin(ad); invalidarBanco(); avisar('Classe salva', c.nome, 'check');
        }}>
          <input className="campo" placeholder="id (ex.: ieca)" value={c.id} onChange={(e) => setC({ ...c, id: e.target.value })} />
          <input className="campo" placeholder="Nome por extenso" value={c.nome} onChange={(e) => setC({ ...c, nome: e.target.value })} />
          <input className="campo" placeholder="Sigla" value={c.sigla} onChange={(e) => setC({ ...c, sigla: e.target.value })} />
          <select className="campo" value={c.grupoId} onChange={(e) => setC({ ...c, grupoId: e.target.value })}>{listarGrupos().map((g) => <option key={g.id} value={g.id}>{g.nome}</option>)}</select>
          <textarea className="campo" placeholder="Mecanismo curto" value={c.mecanismoCurto} onChange={(e) => setC({ ...c, mecanismoCurto: e.target.value })} />
          <input className="campo" placeholder="Sinônimos aceitos (separados por ;)" value={sin} onChange={(e) => setSin(e.target.value)} />
          <button className="btn-primario">Salvar classe</button>
        </form>
      </Secao>
      <Secao titulo={`Classes cadastradas (${banco.classes.size})`}>
        <ul className="max-h-[520px] space-y-1 overflow-y-auto text-sm">{[...banco.classes.values()].map((x) => <li key={x.id}><strong>{x.sigla ?? x.nome}</strong> <span className="text-slate-500">· {x.grupoId} · {x.id}</span></li>)}</ul>
      </Secao>
    </div>
  );
}

function AbaGrupos() {
  const [g, setG] = useState({ id: '', nome: '', nomeCurto: '', descricao: '', sinonimos: '' });
  const [, f] = useState(0);
  const extras = carregarConteudoAdmin().gruposExtras;
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Secao titulo="Criar grupo terapêutico">
        <form className="space-y-3" onSubmit={(e) => {
          e.preventDefault();
          if (!g.id || !g.nome) return;
          const ad = carregarConteudoAdmin();
          ad.gruposExtras = [...ad.gruposExtras.filter((x) => x.id !== g.id), { ...g, nomeCurto: g.nomeCurto || g.nome, sinonimos: g.sinonimos.split(';').map((x) => x.trim()).filter(Boolean) }];
          salvarConteudoAdmin(ad); invalidarBanco(); f((x) => x + 1); avisar('Grupo criado', 'Cadastre classes e medicamentos vinculados a ele para que apareça com conteúdo.', 'pasta');
        }}>
          <input className="campo" placeholder="id (ex.: anticoagulantes)" value={g.id} onChange={(e) => setG({ ...g, id: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })} />
          <input className="campo" placeholder="Nome" value={g.nome} onChange={(e) => setG({ ...g, nome: e.target.value })} />
          <input className="campo" placeholder="Nome curto" value={g.nomeCurto} onChange={(e) => setG({ ...g, nomeCurto: e.target.value })} />
          <input className="campo" placeholder="Descrição" value={g.descricao} onChange={(e) => setG({ ...g, descricao: e.target.value })} />
          <input className="campo" placeholder="Respostas aceitas na fase 1 (separadas por ;)" value={g.sinonimos} onChange={(e) => setG({ ...g, sinonimos: e.target.value })} />
          <button className="btn-primario">Criar grupo</button>
        </form>
      </Secao>
      <Secao titulo="Grupos criados">{!extras.length ? <Vazio>Nenhum grupo extra.</Vazio> : <ul className="text-sm">{extras.map((x) => <li key={x.id}><strong>{x.nome}</strong> · {x.id}</li>)}</ul>}</Secao>
    </div>
  );
}

function AbaDesempenho() {
  const banco = useBanco();
  const perfis = listarPerfis();
  const estados = perfis.map((p) => ({ p, e: estadoDoPerfil(p.id) }));
  const erros = new Map<string, number>();
  for (const { e } of estados) for (const [k, it] of Object.entries(e.itens)) erros.set(k, (erros.get(k) ?? 0) + it.erros);
  const top = [...erros.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12);
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Secao titulo={`Estudantes neste dispositivo (${perfis.length})`}>
        <ul className="divide-y divide-slate-100 text-sm dark:divide-slate-800">
          {estados.map(({ p, e }) => {
            const resp = Object.values(e.itens);
            const ac = resp.reduce((s, i) => s + i.acertos, 0), t = resp.reduce((s, i) => s + i.tentativas, 0);
            return <li key={p.id} className="flex justify-between py-2"><strong>{p.nome}</strong><span className="text-slate-500">{e.pontos} pts · {t ? pct(ac / t) : '—'} acerto · {Object.keys(e.gruposConcluidos).length} pastas</span></li>;
          })}
        </ul>
      </Secao>
      <Secao titulo="Questões com mais erros (agregado)">
        {!top.length ? <Vazio>Sem dados.</Vazio> : <ul className="space-y-1 text-sm">{top.map(([k, n]) => { const p = parseChave(k); return <li key={k} className="flex justify-between"><span>{banco.medicamentos.get(p.medId)?.nome} · <span className="text-slate-500">{ROTULO_FASE[p.fase]}</span></span><span>{n}</span></li>; })}</ul>}
      </Secao>
      <Secao titulo="Domínio médio por grupo">
        <ul className="space-y-1 text-sm">{listarGrupos().map((g) => {
          const ids = (banco.porGrupo.get(g.id) ?? []).map((m) => m.id);
          const ds = estados.map(({ e }) => statsGrupo(e, g.id, ids).dominio);
          return <li key={g.id} className="flex justify-between"><span>{g.nomeCurto}</span><span>{ds.length ? pct(ds.reduce((a, b) => a + b, 0) / ds.length) : '—'}</span></li>;
        })}</ul>
      </Secao>
    </div>
  );
}

function AbaDados() {
  const exportar = () => {
    const blob = new Blob([JSON.stringify(carregarConteudoAdmin(), null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'pharmaquest-conteudo-admin.json'; a.click();
  };
  const exportarBanco = () => {
    const b = getBanco();
    const blob = new Blob([JSON.stringify({ classes: [...b.classes.values()], medicamentos: [...b.medicamentos.values()], resumos: [...b.resumos.values()] }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'pharmaquest-banco-completo.json'; a.click();
  };
  return (
    <Secao titulo="Importação e revisão de conteúdo">
      <p className="mb-3 text-sm text-slate-500">Importe um arquivo exportado por outro administrador. Medicamentos importados entram como <strong>rascunho</strong> e precisam ser validados antes de publicar.</p>
      <div className="flex flex-wrap gap-2">
        <button className="btn-secundario" onClick={exportar}>Exportar edições (.json)</button>
        <button className="btn-secundario" onClick={exportarBanco}>Exportar banco completo (.json)</button>
        <label className="btn-secundario cursor-pointer">Importar (.json)
          <input type="file" accept="application/json" className="hidden" onChange={async (ev) => {
            const f = ev.target.files?.[0]; if (!f) return;
            try {
              const d = JSON.parse(await f.text()) as Partial<ConteudoAdmin> & { medicamentos?: unknown };
              const c = carregarConteudoAdmin();
              const lista: Medicamento[] = Array.isArray(d.medicamentos) ? (d.medicamentos as Medicamento[]) : Object.values((d.medicamentos ?? {}) as ConteudoAdmin['medicamentos']).map((r) => r.publicado ?? r.rascunho!).filter(Boolean);
              for (const m of lista) { const reg = c.medicamentos[m.id] ?? { historico: [] }; reg.rascunho = { ...m, validacao: 'rascunho' }; reg.historico.push({ ts: Date.now(), acao: 'importado', autor: 'administrador' }); c.medicamentos[m.id] = reg; }
              if (Array.isArray(d.classes)) c.classes = [...c.classes, ...(d.classes as Classe[])];
              salvarConteudoAdmin(c); invalidarBanco();
              avisar('Importação concluída', `${lista.length} medicamentos em rascunho aguardando validação.`, 'check');
            } catch (err) { avisar('Arquivo inválido', String(err), 'alerta'); }
            ev.target.value = '';
          }} />
        </label>
      </div>
    </Secao>
  );
}
