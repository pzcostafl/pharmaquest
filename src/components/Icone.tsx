// Ícones de traço fino (desenhados para o app).
const P: Record<string, string> = {
  termometro: 'M14 14.76V5a2 2 0 1 0-4 0v9.76a4 4 0 1 0 4 0ZM12 9v7',
  chama: 'M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.2 1-3.6 2-4.5.3 1.8 1.2 2.8 2.2 3.2C10.6 9 11 6 12 3Z',
  coracao: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10ZM5 12h3l1.5-3 2.5 6 1.5-3H19',
  bacteria: 'M8 8a6 4 30 1 1 8 8 6 4 30 0 1-8-8Zm1.5 3.5h.01M13 12.5h.01M11 14.5h.01M4 6l2 1.5M18 16.5l2 1.5M6 18l1.5-1.5M16.5 6 18 4.5',
  cerebro: 'M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a2 2 0 0 0-3-1Zm6 0a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1',
  pulmao: 'M12 4v8m0 0-3 2m3-2 3 2M9 7C6 7 4 11 4 15c0 3 1 5 3 5s3-2 3-4V9M15 7c3 0 5 4 5 8 0 3-1 5-3 5s-3-2-3-4V9',
  estomago: 'M9 3v4c0 2-3 3-3 7a6 6 0 0 0 6 6c4 0 7-3 7-6 0-2-1.5-3-3-3-2 0-2.5 2-4.5 2S10 11 10 9V3',
  gota: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Zm-2 12a2 2 0 0 0 2 2',
  lipidio: 'M5 12a7 7 0 1 0 14 0 7 7 0 1 0-14 0Zm4-1.5h.01M14 10h.01M12 14h.01M9.5 15.5h.01M15 14.5h.01',
  balanca: 'M5 21h14M12 3v18M5 7h14M5 7l-3 7a3 3 0 0 0 6 0L5 7Zm14 0-3 7a3 3 0 0 0 6 0l-3-7Z',
  celula: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM6.5 8.5h.01M17 15.5h.01M16 7h.01',
  pasta: 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z',
  estrela: 'm12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z',
  trofeu: 'M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4ZM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4',
  bussola: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm3.5 5.5-2 5-5 2 2-5 5-2Z',
  alvo: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z',
  diploma: 'M4 5h16v11H4zM8 9h8M8 12h5M15 16v5l2-1.5 2 1.5v-5',
  relogio: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v5l3 2',
  lapis: 'm4 20 4-1L19 8l-3-3L5 16l-1 4ZM14 7l3 3',
  seta: 'M4 12a8 8 0 1 0 2.3-5.7M4 4v4h4',
  casa: 'M3 11 12 4l9 7M5 10v10h14V10',
  livro: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Zm0 14a2 2 0 0 1 2-2h13',
  grafico: 'M4 20h16M7 16v-5M12 16V7M17 16v-8',
  engrenagem: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm7.4 3a7.4 7.4 0 0 0-.1-1.3l2-1.6-2-3.4-2.4 1a7.5 7.5 0 0 0-2.2-1.3L14.4 2h-4l-.4 2.4a7.5 7.5 0 0 0-2.2 1.3l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 0 0 0 2.6l-2 1.6 2 3.4 2.4-1a7.5 7.5 0 0 0 2.2 1.3l.4 2.4h4l.4-2.4a7.5 7.5 0 0 0 2.2-1.3l2.4 1 2-3.4-2-1.6c.1-.4.1-.9.1-1.3Z',
  escudo: 'M12 3 5 6v6c0 4 3 7.5 7 9 4-1.5 7-5 7-9V6l-7-3Z',
  busca: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm9 16-4-4',
  coracaoFav: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z',
  marcador: 'M6 3h12v18l-6-4-6 4V3Z',
  check: 'm5 12 5 5L20 7',
  x: 'M6 6l12 12M18 6 6 18',
  voltar: 'M15 18l-6-6 6-6',
  avancar: 'm9 18 6-6-6-6',
  sol: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-6v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.3-1.4M17.7 6.3l1.4-1.4',
  lua: 'M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z',
  repetir: 'M4 4v6h6M20 20v-6h-6M5 15a7 7 0 0 0 12.6 2M19 9A7 7 0 0 0 6.4 7',
  download: 'M12 4v11m0 0-4-4m4 4 4-4M5 20h14',
  info: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 8v5m0-8h.01',
  alerta: 'M12 4 2.5 20h19L12 4Zm0 6v4m0 3h.01',
  molecula: 'M12 4l6.9 4v8L12 20l-6.9-4V8L12 4Zm0 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  usuario: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0',
  menu: 'M4 7h16M4 12h16M4 17h16',
  editar: 'M4 20h4L19 9l-4-4L4 16v4Z',
  mais: 'M12 5v14M5 12h14',
};

export function Icone({ nome, className = 'h-5 w-5', preenchido = false }: { nome: string; className?: string; preenchido?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={preenchido ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={P[nome] ?? P.pasta} />
    </svg>
  );
}
