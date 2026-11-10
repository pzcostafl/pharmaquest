# Configurar o Supabase (conta, sincronização e administrador)

Sem o Supabase, o app funciona só no aparelho. Com ele:
- entrar com e-mail e senha;
- usar o mesmo progresso no celular, no iPad e no computador;
- ter um administrador de verdade, definido no banco.

O plano gratuito é suficiente. A configuração leva cerca de 10 minutos.

## 1. Criar o projeto
1. Entre em **supabase.com** → *New project*. Escolha a região **South America (São Paulo)** e guarde a senha do banco.
2. Em **SQL Editor → New query**, cole todo o conteúdo de [`supabase/migrations/0001_pharmaquest.sql`](supabase/migrations/0001_pharmaquest.sql) e clique em **Run**.

## 2. Ajustar o login
Em **Authentication → Sign In / Providers → Email**:
- Mantenha **Email** ativado.
- **Confirm email:** recomendo **desligar** para uma turma pequena. O servidor de e-mail embutido do plano gratuito envia poucos e-mails por hora, então várias amigas se cadastrando ao mesmo tempo esbarrariam no limite e ficariam sem o link de confirmação. Para manter a confirmação ligada, configure um SMTP próprio em *Authentication → Emails → SMTP Settings*.

Em **Authentication → URL Configuration**, preencha **Site URL** com o endereço do app, por exemplo `https://SEU-USUARIO.github.io/pharmaquest/`. Esse endereço é usado nos links de confirmação e de "esqueci minha senha".

## 3. Ligar o app ao projeto
Em **Project Settings → API**, copie a **Project URL** e a chave **anon public**.

- **Site publicado:** os dois valores ficam em `PUBLICADO`, no arquivo [`src/lib/supabase.ts`](src/lib/supabase.ts), e valem só no build de produção. Projeto atual: `cwwzxhfuoixpdqhgsifs` (São Paulo). Para trocar de projeto, edite ali e faça push.
- **Para rodar no computador com a nuvem:** copie `.env.example` para `.env.local` e cole os dois valores. Sem isso, o `npm run dev` fica no modo local.

A chave *anon* é pública por definição: ela vai dentro do app de qualquer jeito. Quem protege os dados são as regras RLS do banco. **Nunca** use a chave `service_role` no app.

## 4. Definir a administradora (ela também joga)
Todo cadastro novo entra como **estudante**. Para tornar uma conta administradora:
1. Crie a conta pelo próprio app (Ajustes → Conta → Criar conta).
2. No **SQL Editor**, rode o comando abaixo, trocando o e-mail:
   ```sql
   update public.perfis set papel = 'admin'
   where id = (select id from auth.users where email = 'seu-email@exemplo.com');
   ```
3. No app, saia da conta e entre de novo. Aparece o botão **Admin** no topo. A conta continua jogando normalmente: o papel de admin só acrescenta permissões.

As colegas de sala criam contas pelo próprio app e entram como estudantes. Cada uma vê só o próprio progresso.

Para remover o acesso de administrador, troque `'admin'` por `'estudante'` no mesmo comando.

## O que cada papel pode fazer
| | Estudante | Administrador |
|---|---|---|
| Jogar e ver o conteúdo publicado | ✓ | ✓ |
| Ler e gravar o **próprio** progresso | ✓ | ✓ |
| Ver o progresso de todos (desempenho agregado) | — | ✓ |
| Editar, validar e publicar medicamentos, classes e grupos | — | ✓ |
| Mudar o próprio papel | — | — (só pelo SQL, como dono do projeto) |

## Como a sincronização funciona
- O app continua salvando tudo no aparelho e funciona offline.
- Com conta conectada, cada alteração vai para a nuvem cerca de 2 segundos depois. Sem internet, ela fica pendente e sobe quando a conexão volta.
- Ao entrar num aparelho novo, o progresso local e o da nuvem são **mesclados**. Acertos, conquistas e medicamentos concluídos nos dois aparelhos são mantidos, e para cada questão vale a resposta mais recente.
- Na primeira vez que alguém entra com conta num aparelho, o progresso do perfil local que estava em uso vai junto para a conta.
