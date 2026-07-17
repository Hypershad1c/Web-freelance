# Domify — Rebuild Foundation

Status: **skeleton, not deployable yet.** This is the schema + routing + auth
foundation agreed on: full rewrite in TypeScript, Odoo deferred, NextAuth
credentials-based agent login.

## What actually works if you `npm install` and set env vars
- Prisma schema (`prisma/schema.prisma`) — models Property, Neighborhood,
  Lead, BlogPost, Testimonial, Agent. Not yet migrated to a real database.
- `POST /api/leads` — validates with Zod, writes to Postgres. This is the
  one functional end-to-end path in this scaffold.
- NextAuth credentials provider against the `Agent` table — untested, no
  seed data exists yet, no login page built.
- Locale middleware — single `[locale]` dynamic segment, redirects bare
  paths to `/fr/...`. Does not yet do Accept-Language detection.

## Cloudinary — blocked on your credentials
Image upload is fully wired (upload API route, dashboard form UI, real
`<Image>` rendering on cards/detail/gallery) but **will not work until you
add three environment variables** — I don't have a Cloudinary account to
generate these for you:

```
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

Get these from your Cloudinary dashboard (Settings → Access Keys) after
creating a free account at cloudinary.com if you don't have one. Add them
to `.env`, restart the dev server. Until then, `/api/upload` returns a
clear 500 error rather than failing silently.

Also add Cloudinary's domain to `next.config.mjs`'s image `remotePatterns`
if it isn't already there — it should be (`res.cloudinary.com` was
pre-added), but confirm after your first real upload.

## What's real as of this pass
- Everything from before, plus:
- Vercel Analytics installed (`@vercel/analytics`). **Only collects data
  when actually deployed to Vercel** — it's a no-op in local dev, so don't
  expect to see numbers from `npm run dev`.
- Home page now has all four previously-missing sections: "Why Domify"
  (static copy — deliberately excludes drone/video claims since that's not
  a real capability yet), "Recently Sold," a testimonials section, and a
  mortgage calculator (client-side amortization math, default 5.5% rate is
  a placeholder — not verified against current Moroccan mortgage rates,
  update before relying on it).
- Both "Recently Sold" and testimonials sections **render nothing if
  there's no real data** (no sold properties, no featured testimonials) —
  deliberate choice over showing fake placeholder content. Right now
  neither will show anything with the seeded data: no property has
  `status: SOLD`, and testimonials need `featured: true` (settable at
  creation via the dashboard form).

## What is NOT built yet
- Testimonial edit (create-only, deliberate scope cut).
- JSON-LD, full Open Graph coverage, canonical URLs, breadcrumbs.
- Odoo CRM sync — deferred, schema supports it later.
- Production deployment — documented, not executed. This remains the
  single biggest gap; nothing in this project has been tested outside
  local dev.

## Decisions made that you should know about
1. **Translations stored as JSON columns** (`translations Json` on
   Property/Neighborhood/BlogPost/Testimonial) rather than a separate
   `Translation` join table per locale. Faster to query (no joins), but
   loses relational integrity — a typo'd locale key (`"franc"` instead of
   `"fr"`) fails silently at read time, not at write time. If you want
   compile-time safety here, tell me and I'll switch to a join table before
   more code is built on top of this.
2. **Darija content**: schema treats `ar` as the Darija slot. I have not
   written any Darija copy — per your spec, literal MSA translation is
   explicitly wrong for this brand voice, and I'm not positioned to write
   authentic Darija. That needs a native speaker's review before anything
   ships in that locale.
3. **Route groups**: `(marketing)`, `(auth)`, `(dashboard)` are nested
   *inside* the single `[locale]/` segment, not parallel to it. This is
   different from the `app/(fr)`/`app/(ar)` pattern that broke Vercel
   builds previously — but I haven't run a real Vercel build against this
   yet, so treat that as **likely fine, not confirmed**.
4. **Valuation form fields** (address, surface, bedrooms, bathrooms) are
   modeled as an extension of the base Lead schema rather than new Lead
   columns, to avoid a lopsided table where most fields are null for
   non-valuation leads. Revisit if valuation becomes the dominant lead type.

## Trilingual UI — now covers the entire public site
Every marketing page now uses `getDictionary(locale)`: home, properties
listing, property detail, neighborhoods index+detail, blog index+detail,
about, contact, valuation, and their forms (ContactForm, ValuationForm).
Dashboard remains French-only by design (no locale switcher there, per
the project's own decision).

**Bug fixed while doing this pass**: `TestimonialsSection` had a variable
shadowing bug — the dictionary was assigned to `t`, then the `.map()` loop
also destructured each testimonial as `t`, silently shadowing the
dictionary inside the loop. Renamed to `dict`/`testimonial` to make the
two unambiguous. Worth knowing this pattern (reusing `t` for both
translation dict and loop item) is an easy mistake to reintroduce if more
sections get built later — pick different variable names deliberately.

**Content vs chrome — still the operative distinction:**
- **UI chrome** (buttons, labels, nav, section headers): translated,
  functional Standard Arabic, safe to ship as-is.
- **Marketing/brand copy** (hero headline, About page paragraphs, "Why
  Domify" bullet points): I drafted Arabic translations for the hero and
  About page text specifically, but flagged these as needing native
  review — same standing rule as Darija content elsewhere, extended here
  because leaving major page copy blank in `/ar` seemed worse than a
  flagged draft. The "Why Domify" bullet points remain French-only —
  not translated, not drafted, genuinely missing.
- **User-generated content** (property descriptions, blog posts,
  neighborhood descriptions): NOT part of this system at all — these come
  from the `translations` JSON column filled in via the dashboard forms,
  empty until an agent (ideally with a native Darija speaker) fills them
  in. No dictionary work touches this.

**What's still not covered:**
- "Why Domify" section's 4 bullet points (French only)
- Dashboard (intentionally excluded)
- Any future pages built after this point need the same pattern applied
  manually — it's not automatic.

## Testimonial edit, JSON-LD, canonical URLs, breadcrumbs
- Testimonial edit + delete (previously create-only) — same pattern as
  properties/blog/neighborhoods.
- **Single source of truth for the domain**: `src/lib/site.ts` exports
  `SITE_URL` — sitemap, robots.txt, canonical URLs, and JSON-LD all read
  from this ONE constant now. **Still set to the placeholder `domify.ma`
  — change this one file before deploying and everything downstream
  updates automatically.**
- JSON-LD structured data: `RealEstateAgent` schema site-wide (root
  layout), `RealEstateListing` + `BreadcrumbList` on property detail,
  `Article` + `BreadcrumbList` on blog posts. Home/listing/neighborhood
  pages get canonical + Open Graph but no JSON-LD schema — lower priority,
  since Google's structured data support for generic category pages is
  much thinner than for individual property/article pages.
- Canonical URLs + `hreflang` language alternates on every marketing page.
- Visible breadcrumb trail (not just JSON-LD) on property and blog detail
  pages.

**Still not built**: Odoo CRM sync (explicitly out of scope per your
instruction), `AggregateRating` JSON-LD (needs structured review data
testimonials don't have yet), JSON-LD on neighborhood/listing pages.

## Multi-city support — structure ready, one real city (Casablanca)
Schema and routing now support multiple cities. **What changed:**
- New `City` model; `Neighborhood.cityId` is now required.
- Every marketing URL gained a city segment:
  `/fr/casablanca/properties`, `/fr/casablanca/neighborhoods/californie`,
  etc. Old URLs without a city (`/fr/properties`) auto-redirect via
  middleware — not a dead link, just a redirect.
- Home, properties, and neighborhoods pages/queries are scoped to the
  current city (`where: { neighborhood: { cityId } }`).
- Blog, about, contact, and valuation are NOT city-scoped in their data —
  they just carry the city segment in the URL for consistent navigation.
  This was a deliberate call: a blog post isn't Casablanca-specific in any
  meaningful way, and duplicating blog content per city would be wrong.

**⚠️ Migration required, and it's not a simple `migrate dev`.** Adding a
required `cityId` to an existing `Neighborhood` table with data already in
it needs special handling. Since this is still dev/test data, the clean
path is a full reset:
```
npx prisma migrate reset
```
This drops everything, reapplies all migrations, and **automatically
re-runs `seed.ts`** (which now creates a Casablanca `City` row and links
every neighborhood to it). You'll lose anything you created by hand
through the dashboard (extra properties, blog posts, testimonial edits) —
acceptable for dev data, NOT something to run against a real production
database with real leads in it.

**Adding a second city today** means going into Prisma Studio and
manually creating a `City` row (slug, name), then either seeding
neighborhoods for it via a script or creating them through the dashboard's
neighborhood form — which will now show a city dropdown automatically
once more than one `City` exists (see `NeighborhoodForm.tsx`). There is
**no dashboard screen to create a City itself** — that's a real gap, not
an oversight; a City-management UI wasn't built because you said "just
want the structure ready."

**Known limitation**: `sitemap.ts` hardcodes `"casablanca"` as the only
city — it does NOT loop over cities in the database yet. Adding city #2
means updating that file too, not just the database.

## Deploying to Vercel
1. Push this project to a GitHub repo (Vercel deploys from git, not a zip).
2. In Vercel dashboard, Import Project → select the repo.
3. Environment variables — copy every key from your local `.env` into
   Vercel's Project Settings → Environment Variables, for **Production**
   at minimum (Preview/Development if you want branch deploys to work too):
   `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` (set this to your real
   production URL, not localhost), `CLOUDINARY_CLOUD_NAME`,
   `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
4. Deploy. Watch the build log — `prisma generate` runs automatically via
   the `build` script in `package.json`, but migrations do **not** run
   automatically. Run `npx prisma migrate deploy` (not `migrate dev`)
   against the production `DATABASE_URL` once, either from your machine
   with production env vars temporarily set, or via a Vercel deploy hook —
   `migrate dev` is for local development only and will prompt
   interactively, which breaks in CI.
5. Seed data: **do not run `prisma db seed` against production** as-is —
   it contains the `ChangeMe123!`/`Ok123456`-style placeholder admin
   password. Either seed once with a real rotated password, or create the
   admin account manually via Prisma Studio pointed at production.

Known risk carried over from the old codebase: this project previously hit
a Vercel build failure from stale route-group files after a zip-extraction
overwrite. If the build fails with an ENOENT or client-reference-manifest
error, check for duplicate/orphaned route files before assuming it's a
code bug — that's the known failure signature for this specific issue.
1. Stand up a real Postgres instance (Neon/Supabase/Vercel Postgres — your
   call) and run `npx prisma migrate dev` to confirm the schema actually
   migrates cleanly.
2. Build the home page UI against real Tailwind config + the palette —
   this is where `frontend-design` skill guidance applies, and where most
   of the visible "premium" feel gets decided.
3. Wire the valuation form UI to the working `/api/leads` route.
4. Seed 5–10 fake properties so pages have something to render before
   investing in the dashboard CRUD.
