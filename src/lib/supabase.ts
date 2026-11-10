// Cliente Supabase. Sem URL e chave, o app funciona apenas no modo local.
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Projeto Supabase do site publicado. A chave "anon" é pública por definição (vai dentro
 * do app de qualquer jeito); a proteção dos dados vem das políticas RLS do banco.
 * NUNCA coloque aqui a chave service_role.
 * Só vale no build de produção: no `npm run dev` e nos testes o app fica no modo local,
 * a menos que exista um .env.local com VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.
 */
const PUBLICADO = {
  url: 'https://cwwzxhfuoixpdqhgsifs.supabase.co',
  chave:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3d3p4aGZ1b2l4cGRxaGdzaWZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQzMDk4MTMsImV4cCI6MjEwOTg4NTgxM30.QYRaCeGL_mtZreNVzmBFUYnO5wu1pWoAaP6OYSamMt0',
};

const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined) || (import.meta.env.PROD ? PUBLICADO.url : undefined);
const chave = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || (import.meta.env.PROD ? PUBLICADO.chave : undefined);

export const supabase: SupabaseClient | null = url && chave ? createClient(url, chave, { auth: { persistSession: true, autoRefreshToken: true } }) : null;

export const nuvemAtiva = () => !!supabase;
