-- Migration: collect phone + referral source, retire ai_concern.
-- Run this in the SQL Editor if you already created sav_waitlist with the
-- original schema. Fresh installs can just run ../sav_waitlist.sql instead.

alter table public.sav_waitlist
    add column if not exists phone text,
    add column if not exists referral_source text;

alter table public.sav_waitlist
    drop column if exists ai_concern;
