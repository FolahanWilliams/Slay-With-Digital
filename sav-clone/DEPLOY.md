# Deploying this duplicate

This folder is a **standalone copy** of the Sav waitlist site. It's a complete
Next.js project and can be deployed independently as its own Vercel project.

## Shared waitlist backend

This copy is configured to **share the same Supabase backend** as the original
site — signups from both pages land in the same `sav_waitlist` table (and the
same `sav_events` table). There's no code difference; it's purely a matter of
pointing this deployment at the same database via env vars.

## Deploy as a separate Vercel project

1. In Vercel, create a **new project** from this same Git repo.
2. Set **Root Directory** to `sav-clone`.
3. Add the **same** environment variables as the original project so signups
   share the backend:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_WHATSAPP_URL`
   - (optional) `NEXT_PUBLIC_WHATSAPP_MESSAGE`, `RESEND_API_KEY`, `EMAIL_FROM`,
     `WAITLIST_NOTIFY_TO`
   - `NEXT_PUBLIC_SITE_URL` — set this to the **new** deployment's URL so OG
     previews, sitemap, and canonical tags point at this copy, not the original.

That's it — the new project builds from `sav-clone/`, and because the Supabase
env vars match, both sites write to the same waitlist.

## Local development

```bash
cd sav-clone
npm install
npm run dev    # http://localhost:3000
```

See `README.md` in this folder for the full project docs.
