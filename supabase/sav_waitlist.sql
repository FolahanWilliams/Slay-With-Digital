-- Sav waitlist table
-- Run this once in your Supabase project (SQL Editor → New query → paste → Run).
-- Then set SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in your env — the server
-- action in src/app/actions.ts inserts signups through the service role.

create table if not exists public.sav_waitlist (
    id            uuid primary key default gen_random_uuid(),
    email         text not null,
    children_ages text[] not null default '{}',
    ai_concern    text,
    created_at    timestamptz not null default now()
);

-- Each email can only join once (the action treats the resulting unique
-- violation as a friendly "you're already on the list").
create unique index if not exists sav_waitlist_email_key
    on public.sav_waitlist (lower(email));

-- Lock the table from anonymous reads/writes — only the server (service role)
-- writes through src/app/actions.ts. With RLS on and no policies, the anon and
-- authenticated keys get nothing; the service-role key bypasses RLS.
alter table public.sav_waitlist enable row level security;
