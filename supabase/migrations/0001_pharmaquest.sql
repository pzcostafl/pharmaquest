-- =====================================================================
-- PharmaQuest — esquema Supabase
-- Rode este arquivo inteiro no SQL Editor do projeto (uma vez).
--
-- Papéis:
--   estudante → lê o conteúdo publicado e lê/grava apenas o próprio progresso
--   admin     → edita e valida o conteúdo; vê o desempenho agregado de todos
-- Ninguém se promove a admin pelo app: o papel só muda via SQL (dono do projeto).
-- =====================================================================

-- ---------- perfis ----------
create table if not exists public.perfis (
  id uuid primary key references auth.users (id) on delete cascade,
  nome text not null default '',
  papel text not null default 'estudante' check (papel in ('estudante', 'admin')),
  criado_em timestamptz not null default now()
);

-- cria o perfil automaticamente quando alguém se cadastra
create or replace function public.criar_perfil()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.perfis (id, nome)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'nome', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists ao_criar_usuario on auth.users;
create trigger ao_criar_usuario after insert on auth.users
  for each row execute function public.criar_perfil();

-- verificação de papel usada pelas políticas (security definer evita recursão de RLS)
create or replace function public.eh_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.perfis where id = auth.uid() and papel = 'admin');
$$;

alter table public.perfis enable row level security;

drop policy if exists "perfil: ler o próprio ou admin lê todos" on public.perfis;
create policy "perfil: ler o próprio ou admin lê todos" on public.perfis
  for select to authenticated using (id = auth.uid() or public.eh_admin());

drop policy if exists "perfil: editar o próprio" on public.perfis;
create policy "perfil: editar o próprio" on public.perfis
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- o usuário só pode alterar o NOME; a coluna papel fica fora do alcance da API
revoke update on public.perfis from authenticated, anon;
grant update (nome) on public.perfis to authenticated;

-- ---------- progresso do estudante (um documento por usuário) ----------
create table if not exists public.progresso (
  user_id uuid primary key references auth.users (id) on delete cascade,
  estado jsonb not null,
  atualizado_em timestamptz not null default now()
);

alter table public.progresso enable row level security;

drop policy if exists "progresso: ler o próprio ou admin lê todos" on public.progresso;
create policy "progresso: ler o próprio ou admin lê todos" on public.progresso
  for select to authenticated using (user_id = auth.uid() or public.eh_admin());

drop policy if exists "progresso: inserir o próprio" on public.progresso;
create policy "progresso: inserir o próprio" on public.progresso
  for insert to authenticated with check (user_id = auth.uid());

drop policy if exists "progresso: atualizar o próprio" on public.progresso;
create policy "progresso: atualizar o próprio" on public.progresso
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ---------- conteúdo editado no painel administrativo ----------
-- Um único documento 'global' com medicamentos (rascunho/publicado), classes,
-- grupos extras e desativados. Todos leem; só admin grava.
create table if not exists public.conteudo (
  id text primary key default 'global' check (id = 'global'),
  dados jsonb not null default '{"medicamentos":{},"classes":[],"desativados":[],"gruposExtras":[]}',
  atualizado_por uuid references auth.users (id),
  atualizado_em timestamptz not null default now()
);
insert into public.conteudo (id) values ('global') on conflict do nothing;

alter table public.conteudo enable row level security;

drop policy if exists "conteudo: todos leem" on public.conteudo;
create policy "conteudo: todos leem" on public.conteudo
  for select to anon, authenticated using (true);

drop policy if exists "conteudo: só admin altera" on public.conteudo;
create policy "conteudo: só admin altera" on public.conteudo
  for update to authenticated using (public.eh_admin()) with check (public.eh_admin());

-- trilha de auditoria das edições de conteúdo
create table if not exists public.conteudo_historico (
  id bigserial primary key,
  autor uuid references auth.users (id) default auth.uid(),
  acao text not null,
  medicamento_id text,
  criado_em timestamptz not null default now()
);
alter table public.conteudo_historico enable row level security;

drop policy if exists "historico: admin lê" on public.conteudo_historico;
create policy "historico: admin lê" on public.conteudo_historico
  for select to authenticated using (public.eh_admin());

drop policy if exists "historico: admin registra" on public.conteudo_historico;
create policy "historico: admin registra" on public.conteudo_historico
  for insert to authenticated with check (public.eh_admin() and autor = auth.uid());

-- =====================================================================
-- DEPOIS de criar sua conta no app, torne-se administrador (troque o e-mail):
--
--   update public.perfis set papel = 'admin'
--   where id = (select id from auth.users where email = 'seu-email@exemplo.com');
-- =====================================================================
