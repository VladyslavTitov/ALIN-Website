# ALIN — German / English dental website

A polished, mobile-first dental-practice demo built for TiLADYS. **ALIN is fictional.** The generated photographs do not depict real staff, patients, facilities or results. The demo is intentionally not indexed and does not accept patient data or appointments. A brief footer disclosure identifies the illustrative people and rooms; repeated image-generation labels are omitted from the website.

## Project

- React 19, TypeScript and Next.js-compatible App Router via Vinext.
- Static export: 32 German/English content pages, a German root entry and a 404 page.
- Manrope and Source Sans 3 variable fonts, hosted locally with SIL OFL licences.
- Original AI logo and four photographs; WebP variants, explicit image dimensions and priority hero loading.
- Radix/Shadcn dialog, sheet and accordion primitives, Lucide icons.
- German default, translated URLs, page-preserving language links, correct server-rendered `lang`.
- Responsive menu, non-overlapping mobile action bar, bilingual demo appointment flow, keyboard-accessible gallery, reduced-motion styles, printable first-visit checklist.
- No contact form, analytics scripts, database, automatic map embeds or booking-provider scripts.

## Run and build

Requires Node 24.x and the exact pnpm version declared in package.json.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
```

Build output is `dist/client`. Its HTML, CSS, JavaScript, fonts and images can be hosted on a static host supporting clean `.html` URLs. Do not deploy `dist/server` for the static version. The Git repository and lockfile are the reproducible source of truth.

The managed Sites environment uses the installed Sites setup/build/hosting scripts and `sites-preview start` for QA. In other environments, the execution-profile helper selects the portable workflow.

## Deploy to Vercel

The repository includes `vercel.json` so Vercel uses the **Other** framework preset, runs `pnpm run build`, and serves `dist/client`. Clean URLs are enabled for German and English pages, including nested treatment pages. Node is pinned to 24.x in `package.json`.

Keep the Vercel Root Directory at the repository root. Deploy a commit containing this configuration. If checking the dashboard manually, the matching settings are:

| Setting | Value |
| --- | --- |
| Framework Preset | Other |
| Build Command | `pnpm run build` |
| Output Directory | `dist/client` |
| Node.js Version | 24.x |

The Next.js preset is incompatible with this project's Vinext build: it looks for `.next/routes-manifest.json`, while this project exports static HTML into `dist/client`. Changing the output folder to `.next` does not fix that mismatch. Do not add a catch-all rewrite to `index.html`; each page already has its own exported HTML.

After deployment, open `/de`, `/en`, `/de/leistungen/zahnreinigung` and `/en/treatments/professional-cleaning` directly, then check the language switch, gallery and appointment notice. Unknown paths should return the exported 404 page.

Configuration reference: [Vercel static configuration](https://vercel.com/docs/project-configuration/vercel-json).

## Edit content

- `lib/practice.ts`: practice identity, contact data, approved booking URL, hours, notice with expiry, insurance, languages and access information. It also contains shared bilingual labels and FAQ copy.
- `lib/treatments.ts`: six bilingual treatment pages, slugs, descriptions and clinical source links.
- `components/site/pages.tsx`: homepage, team, patient guides, contact and legal draft content.
- `components/site/shared.tsx`: shared layout and navigation.
- `components/site/interactive.tsx`: booking, FAQ, gallery, menu and printing.
- `app/globals.css`: design tokens, type, responsive layout and motion.
- `public/images`: finished web assets. `IMAGE_PROMPTS.json`: original generation prompts.
- `public/fonts`: locally hosted fonts and licences.

## Appointment integration

The default `practice.bookingMode: 'demo'` opens a three-step appointment demonstration with sample visit types, a date picker, example times, fixed sample contact details and an explicit result stating that no appointment was booked. It sends no booking requests and stores nothing; closing the dialog resets it.

For real appointments, set `practice.bookingMode` to `'live'`, then set `practice.bookingUrl` to the practice-owned, approved HTTPS booking destination and `practice.phone` to the verified practice number. The dialog then displays those contact routes and identifies the change of provider. Empty live settings show an unavailable notice. No credentials should be placed in client-side configuration.

The provider handles actual availability, reservation, confirmation, cancellation and reminders. See [BOOKING-GUIDE.md](BOOKING-GUIDE.md) for implementation steps, staff versus patient dashboards, current free options and the limits of this demo. The static website has no booking backend.

## Before a real practice launch

Complete `LAUNCH-CHECKLIST.md`. Replace concept imagery, obtain actual clinic approval for promises and medical information, and complete the legal/privacy pages for the final hosting and booking setup. Do not change `concept` to `false` until this work is done.

Set `practice.siteUrl` to the final verified HTTPS origin. Canonical and reciprocal hreflang metadata are enabled when this is present. The noindex/robots staging protection is deliberate; `app/robots.ts` enables crawling only when `concept` is false. The clinical entity schema is gated on verified identity, address and telephone. Extend it with verified opening hours, photographs and professional identity before production.

## Maintenance

Assign a practice owner for contact data, hours, holiday notices and appointment-provider availability. Check these before every holiday period. Review team and service information after changes. Keep both language versions aligned. Keep the domain and service accounts under practice ownership, use MFA for administrative access, review dependency updates and back up the Git source and approved original photographs. Rebuild and check the main patient journeys after changes.

## Verification

See `VERIFICATION.md` for checks actually completed and their limits. No performance score or legal compliance certification is claimed.
