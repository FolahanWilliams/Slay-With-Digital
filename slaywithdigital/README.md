# Slay with Digital

Marketing site for **Slay with Digital**, a digital media marketing
consultancy by Yetty Williams. The page leads with the brand and the
offering (the **7 C's Digital Media Marketing Program**); the founder
appears in the About section.

## Stack

- **Next.js 16** App Router, **React 19**, **Tailwind CSS 4**
- Fonts: Sora (display) + Inter (body)
- Icons: `lucide-react`
- No backend. The single call to action ("Free audit") links out to a
  quiz, configured via `NEXT_PUBLIC_QUIZ_URL`.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build
```

## Editing content

Almost all copy and links live in `src/lib/config.ts`:

- `brand`, `contact`, `social`, `founder`
- `companies` (logo marquee), `sevenCs` (the framework grid),
  `services`, `outcomes`, `testimonials`, `credentials`

Set the audit quiz link with the `NEXT_PUBLIC_QUIZ_URL` env var (see
`.env.example`). Until it is set, the audit buttons point at the site URL.

## Structure

- `src/app/page.tsx` — the landing page, composed of co-located sections
- `src/components/site/` — `nav`, `logo`, `reveal` (scroll animations),
  `seven-cs` (interactive framework)
- `src/app/icon.tsx`, `opengraph-image.tsx` — generated brand favicon + share image
- `src/app/robots.ts`, `sitemap.ts`

## Brand notes

- Palette: bold **red (`#e11d2e`)** + near-black + warm white.
- No em dashes in user-facing copy (commas, colons, periods).
- Brand voice: confident, energetic, "slay with digital".
