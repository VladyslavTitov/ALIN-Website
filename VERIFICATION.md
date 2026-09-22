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

AI concept photographs, legal drafts and missing practice data remain visibly identified. The preview is private and noindex. See LAUNCH-CHECKLIST.md before a real practice launch.
