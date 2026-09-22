# ALIN: from the booking demo to real appointments

Updated 22 September 2026. Prices and plan limits below were checked against the providers' official pages on that date.

## What the demo does

The existing appointment buttons open a German or English demonstration:

1. Choose a sample visit type.
2. Select a weekday and a sample time.
3. Review the selection with a fixed example contact.
4. Finish with an explicit “No appointment has been booked” result.

Dates are based on the current calendar day in Germany and cover the following eight weeks. Durations, times and unavailable slots are invented examples. They are not connected to a dentist's schedule.

The demo does not collect names, email addresses, symptoms or patient records. It does not make booking requests, send messages, save selections in browser storage, or write to a database. Closing it clears the selection. Ordinary requests to load the website and its assets still reach the host.

The switch is `practice.bookingMode` in `lib/practice.ts`. Leave it set to `demo` while demonstrating the website. The separate `concept` setting controls the site's demo disclosure and search indexing; it is not a booking switch.

## Recommended route for a dental practice

Start by asking which practice-management system (PVS) the dentist already uses and whether it has an online-booking module or a supported booking integration. One shared schedule for reception, telephone bookings and website bookings is easier to operate than two independent calendars.

For the first real release, use the practice's approved hosted booking page. The website design and static Vercel hosting can stay in place. There is no need to build a custom patient database or staff dashboard just to add a booking link.

1. The practice opens and owns the provider account, or supplies its existing booking link.
2. Reception configures appointment types, duration, clinicians, rooms, working hours, buffers, holidays and rules for new patients. Confirm which of these the selected plan supports.
3. Agree how telephone bookings, cancellations and rescheduling update the same calendar. Verify any PVS/calendar integration rather than assuming that it is included.
4. Review the actual health-data workflow with the practice: provider responsibilities, the applicable processing agreement, permitted data, access roles, privacy information and retention. Keep a telephone route. Optional reminders need their own appropriate configuration.
5. Set the three values below, replacing the example address and phone with verified practice-owned details:

```ts
bookingMode: 'live',
bookingUrl: 'https://provider.example/your-practice', // Replace with the real HTTPS booking link.
phone: '+49 ...', // Replace with the real telephone number.
```

6. Update the privacy page and the patient FAQ for the actual provider and workflow. Rebuild and deploy.
7. Test one authorised appointment through the real system: slot availability, confirmation, staff calendar visibility, cancellation, rescheduling and the telephone alternative. Confirm that simultaneous visitors cannot reserve the same resource twice.

In `live` mode the dialog offers the external provider and telephone routes. If neither is configured, it shows an unavailable notice; it does not fall back to a simulated success. A phone-only practice can leave `bookingUrl` empty.

## Does the business need a dashboard?

**Practice and reception:** they need a secure way to manage availability and bookings, but it can be the provider's existing dashboard or their PVS. A new custom dashboard is not required. Use individual staff accounts and appropriate access roles rather than a shared password.

**Patients:** they need a booking page and a way to change or cancel appointments. A dashboard built into the ALIN website is optional. Some providers require a patient account; others support booking and management links without one.

**TiLADYS:** website maintenance does not, by itself, require access to patient records or the appointment list. Keep the practice in control of its accounts and grant maintenance access only where needed.

## Free and paid options

| Option | Current free offering | What to consider for a dental practice |
| --- | --- | --- |
| [SimplyBook.me](https://simplybook.me/en/pricing) | 50 bookings/month, one provider and one premium custom feature. Its pricing page says the free plan needs monthly renewal. | Small booking limits and only one provider. Confirm that the precise plan, contract and data setup are suitable for the practice before using patient data. Extra features and messaging can cost more. |
| [Cal.com](https://cal.com/pricing) | Individual plan: one user with unlimited event types and calendars. | Useful for simple scheduling; shared team scheduling is paid. A free individual plan is not evidence that the setup meets a dental practice's health-data and resource-management needs. |
| [Easy!Appointments](https://easyappointments.org/) | Free, open-source, self-hosted software. | Requires a PHP/MySQL server, operation, updates, backups and security work. It cannot run inside this static Vercel export. Free software does not mean free hosting or maintenance. |
| [Doctolib](https://info.doctolib.de/kostenlose-version/) | A limited free version includes a calendar and practice profile. | The official comparison places patient online booking, reminders and PVS connections in the paid offering. Obtain a quote for the actual practice. |

For this project, my starting recommendation is the practice's existing approved booking service or a compatible PVS module. For a general small business with simple scheduling, a free plan may be sufficient. For a dental practice, choose the workflow and data arrangements first, then compare price.

The German data-protection authorities explain the responsibilities and data-minimisation requirements when practices use external appointment services in their [appointment-management position paper](https://www.datenschutzkonferenz-online.de/media/dskb/DSK-Beschluss_Positionspapier_Terminverwaltungsunternehmen.pdf). A provider's marketing badge does not establish that every plan and configuration is appropriate for the practice.

## If you want the same interface to make real bookings

That is a separate integration project. The demo's generated times must be replaced by availability from the provider's API. A backend must validate and reserve the slot atomically, handle conflicts, confirm only successful bookings, and support cancellation and rescheduling.

API keys belong on a server, never in `lib/practice.ts`, public assets or browser code. This website currently exports static files, so an API integration needs a separate backend or a deliberate change to the deployment architecture. Staff authentication, auditability, retention, monitoring and ongoing support must be included in that scope. Do not make the demo “real” by changing only its final confirmation message.
