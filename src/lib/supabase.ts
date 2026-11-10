// Cliente Supabase. Sem as variáveis de ambiente, o app funciona apenas no modo local.
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const chave = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** A chave "anon" é pública por definição; a proteção dos dados vem das políticas RLS do banco. */
export const supabase: SupabaseClient | null = url && chave ? createClient(url, chave, { auth: { persistSession: true, autoRefreshToken: true } }) : null;

export const nuvemAtiva = () => !!supabase;
