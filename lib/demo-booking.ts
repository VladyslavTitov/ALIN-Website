// Demonstration data only. This module never checks or reserves a real calendar.
export const demoServices = [
  { id: 'checkup', minutes: 30 },
  { id: 'cleaning', minutes: 45 },
  { id: 'first-visit', minutes: 45 },
] as const;

export type DemoServiceId = typeof demoServices[number]['id'];
export type DemoWindow = { firstDate: Date; lastDate: Date };
export const demoContact = { name: 'Alex Muster', email: 'demo@example.invalid' };
const sampleTimes = ['09:00', '10:00', '11:30', '13:30', '15:00', '16:00'];

export function addCalendarDays(date: Date, days: number): Date {
  // Date-only values at local noon keep calendar arithmetic stable across DST.
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days, 12);
}

export function createDemoWindow(now = new Date()): DemoWindow {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Berlin', year: 'numeric', month: 'numeric', day: 'numeric',
  }).formatToParts(now);
  const part = (name: string) => Number(parts.find(p => p.type === name)?.value);
  const today = new Date(part('year'), part('month') - 1, part('day'), 12);
  let firstDate = addCalendarDays(today, 1);
  while ([0, 6].includes(firstDate.getDay())) firstDate = addCalendarDays(firstDate, 1);
  return { firstDate, lastDate: addCalendarDays(today, 56) };
}

export function isDemoDate(date: Date, window: DemoWindow): boolean {
  const day = addCalendarDays(date, 0);
  return !Number.isNaN(day.getTime()) && day >= window.firstDate && day <= window.lastDate
    && ![0, 6].includes(day.getDay());
}

export function getDemoSlots(serviceId: DemoServiceId, date: Date, window: DemoWindow) {
  if (!demoServices.some(service => service.id === serviceId) || !isDemoDate(date, window)) return [];
  const serviceIndex = demoServices.findIndex(service => service.id === serviceId);
  const unavailable = (date.getDate() + serviceIndex) % sampleTimes.length;
  return sampleTimes.map((time, index) => ({ time, available: index !== unavailable }));
}

export function isDemoSelectionValid(serviceId: DemoServiceId, date: Date | undefined, time: string, window: DemoWindow) {
  return Boolean(date && getDemoSlots(serviceId, date, window).some(slot => slot.time === time && slot.available));
}

export const demoBookingCopy = {
  de: {
    badge: 'Termin-Demo · Keine Buchung',
    title: 'Ihr Termin. Schritt für Schritt.',
    description: 'Probieren Sie die Terminwahl aus. Alle Zeiten sind Beispiele; es wird kein Termin reserviert.',
    steps: ['Besuch', 'Datum & Zeit', 'Übersicht'],
    progress: 'Schritte der Termin-Demo',
    stepTitles: ['Worum geht es bei Ihrem Besuch?', 'Wann würde es Ihnen passen?', 'Ihre Auswahl auf einen Blick.'],
    serviceLabel: 'Besuchsgrund auswählen',
    serviceIntro: 'Wählen Sie einen Beispieltermin. Die Dauer dient nur der Veranschaulichung.',
    services: {
      checkup: { title: 'Kontrolle & Beratung', description: 'Vorsorge und Fragen zu Ihrer Zahngesundheit.' },
      cleaning: { title: 'Professionelle Zahnreinigung', description: 'Ein Termin für Prophylaxe und Zahnpflege.' },
      'first-visit': { title: 'Erster Besuch', description: 'Kennenlernen und die nächsten Schritte besprechen.' },
    },
    minutes: 'Min.',
    calendar: 'Beispieldatum auswählen',
    dateIntro: 'Wählen Sie einen Werktag innerhalb der nächsten acht Wochen.',
    times: 'Beispielzeiten',
    timeZone: 'Alle Uhrzeiten: Deutschland (Europe/Berlin).',
    unavailable: 'Nicht auswählbar',
    timeHint: 'Grau markierte Zeiten sind in dieser Demo nicht auswählbar.',
    selectDate: 'Wählen Sie zuerst ein Datum.',
    noTimes: 'Für diesen Tag gibt es keine Beispielzeiten. Bitte wählen Sie einen anderen Werktag.',
    service: 'Besuchsgrund', date: 'Datum', time: 'Uhrzeit', duration: 'Beispieldauer',
    contact: 'Beispielkontakt',
    contactNote: 'Für diesen Test werden feste Beispieldaten verwendet. Sie müssen keine persönlichen Angaben machen.',
    reviewNote: 'Beim Abschließen wird nur das Demo-Ergebnis angezeigt. Es wird keine Anfrage an eine Praxis gesendet.',
    next: 'Weiter', back: 'Zurück', finish: 'Demo abschließen',
    doneTitle: 'Demo abgeschlossen.',
    doneDescription: 'Es wurde kein Termin gebucht.',
    doneNote: 'Ihre Auswahl wurde nur auf diesem Bildschirm angezeigt. Es wurde keine Bestätigung versendet und kein Kalender verändert.',
    summary: 'Ihre Beispielauswahl', restart: 'Noch einmal testen', close: 'Schließen',
    resetNote: 'Beim Schließen wird Ihre Demo-Auswahl zurückgesetzt.',
    invalid: 'Diese Beispielzeit ist nicht mehr auswählbar. Bitte wählen Sie Datum und Uhrzeit erneut.',
  },
  en: {
    badge: 'Booking demo · No reservation',
    title: 'Your visit. Step by step.',
    description: 'Try choosing an appointment. All times are examples; no appointment will be reserved.',
    steps: ['Visit', 'Date & time', 'Review'],
    progress: 'Booking demo steps',
    stepTitles: ['What would you like to book?', 'When would suit you?', 'Review your selection.'],
    serviceLabel: 'Choose a visit type',
    serviceIntro: 'Choose a sample appointment. Durations are for demonstration only.',
    services: {
      checkup: { title: 'Check-up & advice', description: 'Preventive care and questions about your oral health.' },
      cleaning: { title: 'Professional cleaning', description: 'An appointment for preventive care and dental hygiene.' },
      'first-visit': { title: 'First visit', description: 'Get acquainted and discuss your next steps.' },
    },
    minutes: 'min',
    calendar: 'Choose a sample date',
    dateIntro: 'Choose a weekday within the next eight weeks.',
    times: 'Sample times',
    timeZone: 'All times: Germany (Europe/Berlin).',
    unavailable: 'Unavailable',
    timeHint: 'Grey times cannot be selected in this demo.',
    selectDate: 'Choose a date first.',
    noTimes: 'There are no sample times for this date. Please choose another weekday.',
    service: 'Visit type', date: 'Date', time: 'Time', duration: 'Sample duration',
    contact: 'Example contact',
    contactNote: 'This test uses fixed example details. You do not need to enter personal information.',
    reviewNote: 'Finishing only displays the demo result. No request is sent to a practice.',
    next: 'Continue', back: 'Back', finish: 'Finish demo',
    doneTitle: 'Demo complete.',
    doneDescription: 'No appointment has been booked.',
    doneNote: 'Your selection was only displayed on this screen. No confirmation was sent and no calendar was changed.',
    summary: 'Your sample selection', restart: 'Try again', close: 'Close',
    resetNote: 'Closing resets your demo selection.',
    invalid: 'This sample time is no longer available. Please choose a date and time again.',
  },
};
