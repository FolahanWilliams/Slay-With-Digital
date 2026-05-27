-- Sav waitlist table
-- Run this once in your Supabase project (SQL editor or migration).
-- Then set SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in your env and uncomment
-- the Supabase insert block inside src/app/sav/actions.ts.

create table if not exists public.sav_waitlist (
    id           uuid primary key default gen_random_uuid(),
    email        text not null,
    children_ages text[] not null default '{}',
    ai_concern   text,
    created_at   timestamptz not null default now()
);

-- Each email can only join once.
create unique index if not exists sav_waitlist_email_key
    on public.sav_waitlist (lower(email));

-- Lock the table from anonymous reads/writes — only the server (service role)
-- writes through src/app/sav/actions.ts.
alter table public.sav_waitlist enable row level security;
