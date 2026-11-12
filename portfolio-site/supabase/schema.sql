create extension if not exists pgcrypto;
create table if not exists public.portfolio_admins(user_id uuid primary key references auth.users(id) on delete cascade);
create table if not exists public.portfolio_entries(id uuid primary key default gen_random_uuid(),kind text not null check(kind in ('experiences','projects','achievements','skills')),title text not null,subtitle text not null default '',description text not null default '',tags text[] not null default '{}',url text not null default '',period text not null default '',published boolean not null default false,sort_order integer not null default 0,created_at timestamptz not null default now());
create or replace function public.is_portfolio_admin() returns boolean language sql stable security definer set search_path='' as $$select exists(select 1 from public.portfolio_admins where user_id=(select auth.uid()));$$;
revoke all on function public.is_portfolio_admin() from public;
grant execute on function public.is_portfolio_admin() to authenticated;
alter table public.portfolio_admins enable row level security;
alter table public.portfolio_entries enable row level security;
create policy "read published or own admin" on public.portfolio_entries for select to anon,authenticated using(published or (select public.is_portfolio_admin()));
create policy "admin insert" on public.portfolio_entries for insert to authenticated with check((select public.is_portfolio_admin()));
create policy "admin update" on public.portfolio_entries for update to authenticated using((select public.is_portfolio_admin())) with check((select public.is_portfolio_admin()));
create policy "admin delete" on public.portfolio_entries for delete to authenticated using((select public.is_portfolio_admin()));
-- After first Google login, find the user's UUID in Auth > Users, then:
-- insert into public.portfolio_admins(user_id) values ('REAL_USER_UUID');