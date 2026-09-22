# ALIN — German / English dental website

A polished, mobile-first dental-practice concept built for TiLADYS. **ALIN is fictional.** The generated photographs do not depict real staff, patients, facilities or results. The private preview is intentionally not indexed and does not accept patient data or appointments.

## Project

- React 19, TypeScript and Next.js-compatible App Router via Vinext.
- Static export: 32 German/English content pages, a German root entry and a 404 page.
- Manrope and Source Sans 3 variable fonts, hosted locally with SIL OFL licences.
- Original AI logo and four photographs; WebP variants, explicit image dimensions and priority hero loading.
- Radix/Shadcn dialog, sheet and accordion primitives, Lucide icons.
- German default, translated URLs, page-preserving language links, correct server-rendered `lang`.
- Responsive menu, non-overlapping mobile action bar, keyboard-accessible booking notice and gallery, reduced-motion styles, printable first-visit checklist.
- No contact form, analytics scripts, database, automatic map embeds or booking-provider scripts.

## Run and build

Requires Node >=22.13 and the exact pnpm version declared in package.json.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
```

Build output is `dist/client`. Its HTML, CSS, JavaScript, fonts and images can be hosted on a static host supporting clean `.html` URLs. Do not deploy `dist/server` for the static version. The Git repository and lockfile are the reproducible source of truth.

The managed Sites environment uses the installed Sites setup/build/hosting scripts and `sites-preview start` for QA. In other environments, the execution-profile helper selects the portable workflow.

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

Set `practice.bookingUrl` to the practice-owned, approved HTTPS booking destination. The booking dialog then displays that outgoing link and identifies the change of provider. Set `practice.phone` to enable the telephone route and mobile call button. No credentials should be placed in client-side configuration. Current empty values show a truthful unavailable state and never simulate success.

A live booking service remains responsible for slot availability, identity verification, confirmation, cancellation and reminders. No backend is implemented in this prototype because no provider or real practice was supplied.

## Before a real practice launch

Complete `LAUNCH-CHECKLIST.md`. Replace concept imagery, obtain actual clinic approval for promises and medical information, and complete the legal/privacy pages for the final hosting and booking setup. Do not change `concept` to `false` until this work is done.

Set `practice.siteUrl` to the final verified HTTPS origin. Canonical and reciprocal hreflang metadata are enabled when this is present. The noindex/robots staging protection is deliberate; `app/robots.ts` enables crawling only when `concept` is false. The clinical entity schema is gated on verified identity, address and telephone. Extend it with verified opening hours, photographs and professional identity before production.

## Maintenance

Assign a practice owner for contact data, hours, holiday notices and appointment-provider availability. Check these before every holiday period. Review team and service information after changes. Keep both language versions aligned. Keep the domain and service accounts under practice ownership, use MFA for administrative access, review dependency updates and back up the Git source and approved original photographs. Rebuild and check the main patient journeys after changes.

## Verification

See `VERIFICATION.md` for checks actually completed and their limits. No performance score or legal compliance certification is claimed.
# ALIN-Website
