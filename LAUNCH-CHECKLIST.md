# Practice information needed for launch

The website design, routes, translations and interactions are implemented. These outside facts are not available in the supplied brief and are intentionally not invented:

- Approved practice name/brand, city, full address, telephone and email.
- Weekly opening hours, holiday exceptions, new-patient availability and cancellation process.
- Accepted insurance types, private-service arrangements and actual treatment range.
- Real clinician/team identities, professional qualifications, roles, languages and permitted portraits.
- Real reception, treatment-room and entrance photographs; accessible-entrance detail and permissions.
- Step-free access, any lift dimensions, parking and public transport.
- Practice-owned booking provider and approved booking link, or verified telephone-only route.
- Operator, service address, professional title and awarding state, chamber, regulator, professional rules, applicable registration details.
- Hosting/controller/provider identities, contracts, data flows, legal bases, retention, supervisory authority and rights information.
- Final domain, website account ownership, mailbox configuration and maintenance responsibility.

## Approval and production steps

1. Have the dentist review both language versions, treatment risks/limitations and all practice promises.
2. Replace the fictional AI portraits/facilities with approved authentic practice material. The ALIN concept logo may be retained if the practice approves the brand after clearance.
3. Populate `lib/practice.ts` and actual team profiles. Check German/English content parity.
4. Complete Impressum and Datenschutz against the real operator and implementation; evaluate applicable accessibility requirements.
5. Connect the approved external booking route and verify both successful bookings and cancellations in that provider using authorised test information. Keep the telephone alternative.
6. Set the final `siteUrl`. Enable canonical/hreflang, complete verified Dentist structured data and verify the automatically generated domain-specific XML sitemap. Do not publish fictitious business data to search engines.
7. Disable concept labels and staging noindex only after approval. The robots and sitemap generators switch to production when `concept` is false and a verified `siteUrl` is present.
8. Test real contact links, travel/access information, mobile and keyboard flows. Measure performance with production hosting and then real visitor data when available.
9. Hand over ownership, source, asset licences, backups and the update process to the practice.

No patient reviews or testimonials were included because none were supplied. No job listing was invented because recruitment was optional in the brief.
