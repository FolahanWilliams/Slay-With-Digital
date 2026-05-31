-- Migration: funnel analytics + a Postgres-backed rate limiter.
-- Run in the Supabase SQL Editor (New query -> paste -> Run). Idempotent.

-- ── Funnel analytics ────────────────────────────────────────────────────────
-- One row per tracked event (page_view, modal_opened, step_completed,
-- signup_completed). Written by /api/track via the service role only.
create table if not exists public.sav_events (
    id         uuid primary key default gen_random_uuid(),
    event      text not null,
    step       int,
    session_id text,
    meta       jsonb,
    created_at timestamptz not null default now()
);

create index if not exists sav_events_event_idx
    on public.sav_events (event, created_at);

alter table public.sav_events enable row level security;

-- ── Rate limiter ────────────────────────────────────────────────────────────
-- Fixed-window counters keyed by "<scope>:<ip>". Written by the service role.
create table if not exists public.sav_rate_limit (
    key          text primary key,
    count        int not null default 0,
    window_start timestamptz not null default now()
);

alter table public.sav_rate_limit enable row level security;

-- Atomically records a hit and returns whether it's within the limit.
-- Resets the window when it has expired.
create or replace function public.check_rate_limit(
    p_key text,
    p_max int,
    p_window_seconds int
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
    v_count int;
begin
    insert into public.sav_rate_limit as r (key, count, window_start)
        values (p_key, 1, now())
    on conflict (key) do update
        set count = case
                when r.window_start < now() - make_interval(secs => p_window_seconds)
                then 1
                else r.count + 1
            end,
            window_start = case
                when r.window_start < now() - make_interval(secs => p_window_seconds)
                then now()
                else r.window_start
            end
    returning count into v_count;

    return v_count <= p_max;
end;
$$;
