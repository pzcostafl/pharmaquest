import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Icone } from './Icone';
import { usePerfil, useEstado } from '../lib/progresso';
import { IndicadorSync } from './Conta';

export type TemaPref = 'claro' | 'escuro' | 'sistema';
export function lerTema(): TemaPref {
  try { return JSON.parse(localStorage.getItem('pq:tema') || '"escuro"'); } catch { return 'escuro'; }
}
export function aplicarTema(t: TemaPref) {
  try { localStorage.setItem('pq:tema', JSON.stringify(t)); } catch { /* */ }
  const escuro = t === 'escuro' || (t === 'sistema' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', escuro);
  document.querySelector('meta[name=theme-color]')?.setAttribute('content', escuro ? '#000000' : '#0f5c66');
  window.dispatchEvent(new Event('pq-tema'));
}

const NAV = [
  { to: '/', rotulo: 'Módulos', curto: 'Módulos', icone: 'casa' },
  { to: '/revisao', rotulo: 'Minha Revisão', curto: 'Revisão', icone: 'repetir' },
  { to: '/biblioteca', rotulo: 'Biblioteca', curto: 'Biblioteca', icone: 'livro' },
  { to: '/desempenho', rotulo: 'Desempenho', curto: 'Progresso', icone: 'grafico' },
  { to: '/config', rotulo: 'Configurações', curto: 'Ajustes', icone: 'engrenagem' },
];

/** Telas de questão: modo foco (sem barra de abas nem rodapé, mais espaço para o teclado). */
const modoFoco = (p: string) => p.startsWith('/jogar') || p.startsWith('/quiz') || p.startsWith('/simulado');

export function Layout({ children }: { children: ReactNode }) {
  const perfil = usePerfil();
  const e = useEstado();
  const loc = useLocation();
  const [, setTema] = useState(lerTema());
  const [online, setOnline] = useState(navigator.onLine);
  const escuro = document.documentElement.classList.contains('dark');
  const foco = modoFoco(loc.pathname);

  useEffect(() => {
    const on = () => setOnline(true), off = () => setOnline(false);
    const t = () => setTema(lerTema());
    addEventListener('online', on); addEventListener('offline', off); addEventListener('pq-tema', t);
    return () => { removeEventListener('online', on); removeEventListener('offline', off); removeEventListener('pq-tema', t); };
  }, []);
  useEffect(() => { window.scrollTo(0, 0); }, [loc.pathname]);

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 pt-[env(safe-area-inset-top)] backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
        <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center gap-3 px-4 sm:h-16 lg:w-[88%] lg:px-0">
          <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label="PharmaQuest — início">
            <img src="./icone.svg" alt="" className="h-8 w-8 shrink-0" />
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[15px] font-bold tracking-tight text-petroleo-800 dark:text-petroleo-200">PharmaQuest</span>
              <span className="hidden text-[11px] text-slate-500 sm:block">Desafio da Farmacologia</span>
            </span>
          </Link>
          <nav className="ml-6 hidden items-center gap-1 whitespace-nowrap lg:flex">
            {NAV.slice(0, 4).map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-petroleo-50 text-petroleo-800 dark:bg-slate-800 dark:text-petroleo-200' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}>
                {n.rotulo}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-1.5">
            {!online && <span className="selo bg-parcial-100 text-parcial-700" title="Sem conexão: o progresso continua sendo salvo neste dispositivo.">Offline</span>}
            <IndicadorSync />
            <span className="selo bg-petroleo-50 font-semibold text-petroleo-800 dark:bg-petroleo-900/50 dark:text-petroleo-200" title="Pontuação total">
              <Icone nome="estrela" className="h-3.5 w-3.5" /> {e.pontos.toLocaleString('pt-BR')}<span className="hidden sm:inline"> pts</span>
            </span>
            <button className="btn-fantasma h-10 w-10 px-0" onClick={() => aplicarTema(escuro ? 'claro' : 'escuro')} title={escuro ? 'Usar tema claro' : 'Usar tema preto'} aria-label="Alternar tema preto">
              <Icone nome={escuro ? 'sol' : 'lua'} />
            </button>
            <NavLink to="/config" className="btn-fantasma hidden h-10 px-2 lg:inline-flex" title="Configurações">
              <Icone nome="engrenagem" />
              {perfil && <span className="hidden max-w-32 truncate xl:inline">{perfil.nome}</span>}
            </NavLink>
          </div>
        </div>
      </header>

      <main className={`flex-1 ${foco ? '' : 'pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0'}`}>{children}</main>

      {!foco && (
        <footer className="hidden border-t border-slate-200 py-5 text-center text-xs text-slate-500 lg:block dark:border-slate-800">
          <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4">
            <span>PharmaQuest · conteúdo educacional, não constitui prescrição.</span>
            <Link to="/admin" className="underline decoration-dotted">Área administrativa</Link>
            <span>Estruturas: PubChem (NIH/NLM)</span>
          </div>
        </footer>
      )}

      {/* Barra de abas — celular e iPad */}
      {!foco && (
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden dark:border-slate-800 dark:bg-slate-950/95" aria-label="Navegação principal">
          <ul className="mx-auto grid max-w-2xl grid-cols-5">
            {NAV.map((n) => (
              <li key={n.to}>
                <NavLink to={n.to} end={n.to === '/'} className={({ isActive }) => `flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium transition ${isActive ? 'text-petroleo-700 dark:text-petroleo-300' : 'text-slate-500 dark:text-slate-400'}`}>
                  {({ isActive }) => (
                    <>
                      <span className={`flex h-7 w-12 items-center justify-center rounded-full transition ${isActive ? 'bg-petroleo-100 dark:bg-petroleo-900/60' : ''}`}><Icone nome={n.icone} className="h-5 w-5" /></span>
                      {n.curto}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

/** Container principal (região x = 6–94% no desktop). */
export function Pagina({ children, estreita = false }: { children: ReactNode; estreita?: boolean }) {
  return <div className={`mx-auto w-full px-4 py-5 sm:px-6 sm:py-8 ${estreita ? 'max-w-4xl lg:w-[70%] lg:px-0' : 'max-w-[1400px] lg:w-[88%] lg:px-0'}`}>{children}</div>;
}
