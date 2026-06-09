-- Sav waitlist table
-- Run this once in your Supabase project (SQL Editor → New query → paste → Run).
-- Then set SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in your env — the
-- /api/waitlist route handler inserts signups through the service role.

create table if not exists public.sav_waitlist (
    id              uuid primary key default gen_random_uuid(),
    email           text not null,
    phone           text,
    children_ages   text[] not null default '{}',
    referral_source text,
    created_at      timestamptz not null default now()
);

-- Each email can only join once (the route treats the resulting unique
-- violation as a friendly "you're already on the list").
create unique index if not exists sav_waitlist_email_key
    on public.sav_waitlist (lower(email));

-- Lock the table from anonymous reads/writes — only the server (service role)
-- writes through /api/waitlist. With RLS on and no policies, the anon and
-- authenticated keys get nothing; the service-role key bypasses RLS.
alter table public.sav_waitlist enable row level security;
