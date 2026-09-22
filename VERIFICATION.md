# Verification record

Completed for the private concept on 22 September 2026:

- Production static export successfully generated all 32 localized content routes, the German root entry and the not-found page.
- TypeScript check passed.
- Desktop homepage visually inspected in the browser at approximately 1348px width.
- Mobile layouts visually inspected in 390px German and 320px English viewports. Narrow-header overflow was corrected. Both document widths match their visible content widths with no horizontal scrolling.
- 200% root text enlargement checked in those two viewports; after reflow corrections neither viewport has horizontal overflow.
- Homepage and treatment-page language switches exercised; translated headings and server-rendered document language confirmed.
- Mobile navigation opened, closed, and used to switch to English.
- Appointment dialog opened and inspected: it clearly states that this concept sends no request and makes no booking.
- Dialog Escape dismissal checked; Radix primitives provide focus management.
- FAQ opened and its answer verified.
- Gallery opened and advanced to the next image.
- Hero mobile crops checked: both faces are preserved.
- Built HTML is checked by `scripts/verify-static.mjs` for all internal links and assets, one H1 per content page, correct document language, page titles and the complete route count.

Not claimed: a WCAG certification, formal screen-reader audit, measured Core Web Vitals, real booking success, email delivery, verified practice information, clinically approved copy or completed legal advice. No real booking provider, phone number or practice address was supplied.

The footer identifies ALIN as a website demo with illustrative people and rooms. Legal drafts and missing practice data remain identified. The demo remains noindex. See LAUNCH-CHECKLIST.md before a real practice launch.

## Vercel configuration and copy update — 22 September 2026

- Reproduced the portable Vinext production build with Node 24.19.0: all 34 routes exported, zero skipped.
- TypeScript check passed; the existing static verifier passed for all 32 localized content pages, their document languages, headings, titles, internal links and assets.
- `vercel.json` now explicitly selects the Other framework preset (`framework: null`), builds with `pnpm run build`, serves `dist/client` and enables clean URLs. The previous Next.js preset expected a `.next/routes-manifest.json` file that Vinext does not produce.
- Pinned Node to 24.x rather than allowing automatic upgrades to future major versions.
- Reworked German and English homepage, team, contact and gallery wording. Removed image-generation notices from visible text, image alternatives, metadata and client-delivered translation data. Gallery image alternatives remain descriptive, and the lightbox keeps an accessible image counter.
- Scanned exported HTML, JavaScript, RSC payloads and text assets: no removed image-generation labels or “Room to breathe” / “Durchatmen” wording remained.
- A neutral demo disclosure remains in the footer and legal page. Appointment availability and missing practice details are still described accurately.

- Browser review of the updated source passed at 390px German and 320px English iframe widths: no horizontal document overflow. The English appointment notice opened and closed with Escape; the gallery displayed the new title and image counter and advanced correctly.
- Vercel reported a successful preview deployment for source commit `a6739a9b9eed03a98af8298d6011f2d768658826`. Its preview requires Vercel login, so deployed-page visual inspection was unavailable in the review browser. The mobile browser checks used the local preview.

The production branch is updated only when the pull request is merged; check the resulting production deployment separately.


## Appointment demo — 22 September 2026

- Added a German/English appointment demo using sample services, a calendar, sample times, fixed example contact details and a result that explicitly says no appointment was booked.
- Completed the German flow on desktop and the English flow in a 320px iframe. Reviewed the German mobile flow at 390px. Corrected narrow-screen calendar overflow and badge/close-button spacing.
- Checked that the primary action stays disabled until required choices are made, changing the date clears the previous time, going back preserves valid choices, restarting clears choices, and closing/reopening resets the service selection. Escape dismissal works.
- Checked a short 390px-high viewport: the dialog scrolls as a whole and its service controls and next action remain reachable.
- Five date/selection unit tests pass, including German date boundaries, daylight-saving changes, invalid dates, unavailable times and stale selections. The same tests also pass with the process timezone set to America/Los_Angeles.
- No real personal-data inputs, booking requests, browser storage, appointment emails or database writes were added. The demo does not reserve a slot.
- Added a separate live-link configuration and a guide for integrating an approved provider, choosing free/paid options and using the provider's staff dashboard.
- TypeScript and the final production static build passed. All 34 routes exported, and `scripts/verify-static.mjs` passed for the 32 localized content pages and their internal links/assets. Temporary QA pages were removed before building.

These checks are not a formal accessibility audit or a test of a real appointment integration. The practice/provider setup and production content review remain necessary before enabling real booking.
