# Sav — Waitlist Landing Page

A non-judgemental parenting coach for the AI era. This repo is the marketing
landing page where parents join the early waitlist.

> Built for Yetty Williams (founder of [LagosMums](https://lagosmums.com)) so
> she can route traffic from her existing sites into a focused signup flow.

## What's in here

- **Next.js 16 (App Router) + Tailwind CSS 4** — the whole site is one page
- **`src/app/page.tsx`** — every section lives here (hero, phone mockup,
  benefits, "Meet Yetty", testimonials, book callout, closing CTA)
- **`src/app/api/waitlist/route.ts`** — the API route that handles waitlist
  submissions; validated with zod (`src/lib/waitlist.ts`) and inserted into Supabase
- **`src/lib/supabase.ts`** — server-only Supabase client (service role)
- **`src/lib/config.ts`** — single source of truth for the WhatsApp link,
  LagosMums URL, site URL, and other swappable values
- **`supabase/sav_waitlist.sql`** — the database schema for storing signups
- **`public/`** — images: `bk.png` (book cover), `yetty.jpg` (portrait)

The OpenGraph share image, favicon, sitemap, and robots.txt are all
generated dynamically by Next.js — no manual maintenance.

## Going live — the three steps

### 1. Replace the WhatsApp link

Open `.env.example`, copy it to `.env.local`, and set `NEXT_PUBLIC_WHATSAPP_URL`
to your real wa.me link. In Vercel, add the same as a Production environment
variable.

### 2. Wire up Supabase

The code is already wired: `@supabase/supabase-js` is installed and the
`/api/waitlist` route inserts each signup into the `sav_waitlist` table. You
just need to point it at a database.

a. Open the project's SQL Editor and run the contents of
   `supabase/sav_waitlist.sql` — it creates the `sav_waitlist` table with a
   unique email index and RLS enabled.

b. Project Settings → API → copy the **URL** and the **service_role** key
   (the long one, not the anon key). Set them as `SUPABASE_URL` and
   `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` (locally) and in Vercel's
   environment variables (production). If `SUPABASE_URL` is unset the action
   fails closed and the form shows a generic error rather than dropping data
   silently.

### 3. Deploy

Push to GitHub. Vercel auto-deploys. That's it.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm run start        # serve the production build
npm run lint         # ESLint
```

## Swapping content

Want to change a headline, link, or testimonial? Almost everything is
plain JSX in `src/app/page.tsx`. The most common swaps:

| Change | File | What to look for |
| --- | --- | --- |
| WhatsApp link | `.env.local` | `NEXT_PUBLIC_WHATSAPP_URL` |
| Site URL (OG previews) | `.env.local` | `NEXT_PUBLIC_SITE_URL` |
| Headline copy | `src/app/page.tsx` | `function Hero()` |
| Benefits cards | `src/app/page.tsx` | `function Benefits()` |
| Testimonials | `src/app/page.tsx` | `function Testimonials()` |
| Book cover image | `public/bk.png` | drop a new PNG with the same name |
| Yetty's portrait | `public/yetty.jpg` | drop a new JPG with the same name |
| Brand name / tagline | `src/lib/config.ts` | the `brand` block |

## Working with Claude Code

If you're using Claude Code, open this repo and ask:

- *"Wire up Supabase using the SQL file"* — it'll do the install + edit.
- *"Add a new testimonial from Adaeze who's a mum of three"* — it'll edit
  the testimonials array.
- *"Change the headline to X"* — straightforward.

There's a `CLAUDE.md` in the root with project context Claude reads first.

<!-- build check: forcing a fresh Vercel build to capture logs -->

