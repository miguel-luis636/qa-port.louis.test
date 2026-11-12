# Miguel Luis — Cyberpunk QA Portfolio

MVP do portfólio com intro animada, seções públicas e painel privado em /admin.

## Executar
1. Abra a pasta portfolio-site.
2. Execute npm install e npm run dev.
3. Sem Supabase, o site abre com seções vazias e /admin informa que falta configuração.

## Supabase e login Google
1. Crie um projeto no Supabase.
2. Execute supabase/schema.sql no SQL Editor.
3. Configure Google OAuth no Google Cloud e no Supabase Auth > Providers.
4. Em Supabase Auth > URL Configuration, cadastre a URL do site e /admin como redirect permitido.
5. Copie .env.example para .env e preencha VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY (chave pública).
6. Faça login no /admin com sua conta Google. A primeira entrada será negada até você autorizar seu UUID.
7. Localize o UUID da sua conta em Supabase Authentication > Users.
8. Execute no SQL Editor: insert into public.portfolio_admins(user_id) values ('UUID_REAL');
9. Entre novamente em /admin. Cadastre registros e marque Publicado.

A autorização é validada por RLS no banco. Não adicione chaves service_role, tokens ou credenciais ao Git.

## Hospedagem
O build é npm run build, gerando dist. Configure fallback para index.html na rota /admin. A URL definitiva deve usar apenas o nome Miguel Luis; domínio e hospedagem ainda precisam ser escolhidos.

## Status
O MVP de CRUD com Google OAuth está no código. Não foi possível executar npm install/build no ambiente desta sessão, portanto ainda requer teste local, configuração de backend e publicação.
Uploads, preview editorial e ordenação por arrastar são próximos incrementos.
