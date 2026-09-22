'use client';

import {useEffect, useId, useRef, useState} from 'react';
import {ArrowLeft, ArrowRight, CalendarDays, Check, CheckCircle2, Clock, UserRound} from 'lucide-react';
import {de, enGB} from 'date-fns/locale';
import {Calendar} from '@/components/ui/calendar';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {DialogClose, DialogDescription, DialogTitle} from '@/components/ui/dialog';
import {type Lang} from '@/lib/practice';
import {
  createDemoWindow, demoBookingCopy, demoContact, demoServices, getDemoSlots,
  isDemoDate, isDemoSelectionValid, type DemoServiceId,
} from '@/lib/demo-booking';

// Mounted inside DialogContent: all selections disappear when the dialog closes.
export function DemoBooking({lang}: {lang: Lang}) {
  const t = demoBookingCopy[lang];
  const id = useId();
  const [dateWindow, setDateWindow] = useState(() => createDemoWindow());
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<DemoServiceId | ''>('');
  const [date, setDate] = useState<Date>();
  const [month, setMonth] = useState(dateWindow.firstDate);
  const [time, setTime] = useState('');
  const [error, setError] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  const scrollArea = useRef<HTMLDivElement>(null);
  const locale = lang === 'de' ? 'de-DE' : 'en-GB';
  const service = demoServices.find(item => item.id === serviceId);
  const slots = serviceId && date ? getDemoSlots(serviceId, date, dateWindow) : [];
  const dateLabel = date?.toLocaleDateString(locale, {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'});
  const validSelection = Boolean(serviceId && isDemoSelectionValid(serviceId, date, time, dateWindow));

  useEffect(() => {
    scrollArea.current?.scrollTo({top: 0, behavior: 'instant'});
    scrollArea.current?.parentElement?.scrollTo({top: 0, behavior: 'instant'});
    heading.current?.focus({preventScroll: true});
  }, [step]);

  function selectService(value: string) {
    setServiceId(value as DemoServiceId);
    setTime('');
    setError('');
  }

  function selectDate(value: Date | undefined) {
    setDate(value);
    setTime('');
    setError('');
  }

  function finish() {
    // Revalidate against today's demo window if the tab was left open overnight.
    const currentWindow = createDemoWindow();
    if (!serviceId || !isDemoSelectionValid(serviceId, date, time, currentWindow)) {
      setDateWindow(currentWindow);
      setMonth(currentWindow.firstDate);
      setDate(undefined);
      setTime('');
      setError(t.invalid);
      setStep(1);
      return;
    }
    setStep(3);
  }

  function restart() {
    const currentWindow = createDemoWindow();
    setDateWindow(currentWindow);
    setMonth(currentWindow.firstDate);
    setServiceId('');
    setDate(undefined);
    setTime('');
    setError('');
    setStep(0);
  }

  const summary = service && date && time ? (
    <dl className="demo-summary" aria-label={t.summary}>
      <div><dt>{t.service}</dt><dd>{t.services[service.id].title}</dd></div>
      <div><dt>{t.date}</dt><dd>{dateLabel}</dd></div>
      <div><dt>{t.time}</dt><dd>{time} · Europe/Berlin</dd></div>
      <div><dt>{t.duration}</dt><dd>{service.minutes} {t.minutes}</dd></div>
    </dl>
  ) : null;

  return <>
    <div className="demo-booking-header">
      <span className="demo-badge"><CalendarDays aria-hidden="true"/><span>{t.badge}</span></span>
      <DialogTitle>{t.title}</DialogTitle>
      <DialogDescription>{t.description}</DialogDescription>
    </div>
    {step < 3 && <ol className="demo-progress" aria-label={t.progress}>
      {t.steps.map((label, index) => <li key={label} aria-current={step === index ? 'step' : undefined} data-complete={step > index}>
        <span aria-hidden="true">{step > index ? <Check/> : index + 1}</span>{label}
      </li>)}
    </ol>}
    <div className="demo-booking-body" ref={scrollArea}>
      {step < 3 ? <h3 ref={heading} tabIndex={-1}>{t.stepTitles[step]}</h3> :
        <div className="demo-result">
          <CheckCircle2 aria-hidden="true"/>
          <h3 ref={heading} tabIndex={-1}>{t.doneTitle}</h3>
          <p className="demo-result-message">{t.doneDescription}</p>
          <p>{t.doneNote}</p>
        </div>}
      {step === 0 && <>
        <p className="demo-step-intro">{t.serviceIntro}</p>
        <RadioGroup className="demo-services" value={serviceId} onValueChange={selectService} aria-label={t.serviceLabel}>
          {demoServices.map(item => <label className="demo-service" htmlFor={`${id}-${item.id}`} key={item.id}>
            <RadioGroupItem id={`${id}-${item.id}`} value={item.id}/>
            <span><strong>{t.services[item.id].title}</strong><span>{t.services[item.id].description}</span></span>
            <span className="demo-duration"><Clock aria-hidden="true"/>{item.minutes} {t.minutes}</span>
          </label>)}
        </RadioGroup>
      </>}
      {step === 1 && <>
        <p className="demo-step-intro">{t.dateIntro}</p>
        {error && <p className="demo-error" role="alert">{error}</p>}
        <div className="demo-schedule">
          <div className="demo-calendar-panel">
            <Calendar
              className="demo-calendar"
              mode="single"
              required
              selected={date}
              onSelect={selectDate}
              month={month}
              onMonthChange={setMonth}
              startMonth={dateWindow.firstDate}
              endMonth={dateWindow.lastDate}
              disabled={day => !isDemoDate(day, dateWindow)}
              showOutsideDays={false}
              locale={lang === 'de' ? de : enGB}
              weekStartsOn={1}
              labels={{
                labelNext: () => lang === 'de' ? 'Nächster Monat' : 'Next month',
                labelPrevious: () => lang === 'de' ? 'Vorheriger Monat' : 'Previous month',
                labelGrid: day => day.toLocaleDateString(locale, {month: 'long', year: 'numeric'}),
                labelDayButton: (day, modifiers) => `${day.toLocaleDateString(locale, {dateStyle: 'full'})}${modifiers.selected ? (lang === 'de' ? ', ausgewählt' : ', selected') : ''}`,
              }}
              aria-label={t.calendar}
            />
          </div>
          <div className="demo-times-panel">
            <h4>{t.times}</h4>
            <p className="demo-selected-date" aria-live="polite">{dateLabel || t.selectDate}</p>
            {date && (slots.length ? <>
              <RadioGroup className="demo-times" value={time} onValueChange={setTime} aria-label={t.times}>
                {slots.map(slot => <label className="demo-time" key={slot.time} htmlFor={`${id}-${slot.time}`} data-unavailable={!slot.available}>
                  <RadioGroupItem id={`${id}-${slot.time}`} value={slot.time} disabled={!slot.available} aria-label={`${slot.time}${slot.available ? '' : ` · ${t.unavailable}`}`}/>
                  <span>{slot.time}</span>
                  {time === slot.time && <Check aria-hidden="true"/>}
                </label>)}
              </RadioGroup>
              <p className="demo-small">{t.timeHint}</p>
            </> : <p className="demo-empty">{t.noTimes}</p>)}
            <p className="demo-timezone"><Clock aria-hidden="true"/>{t.timeZone}</p>
          </div>
        </div>
      </>}
      {(step === 2 || step === 3) && summary}
      {step === 2 && <>
        <div className="demo-contact">
          <UserRound aria-hidden="true"/>
          <div><h4>{t.contact}</h4><p>{demoContact.name}<br/>{demoContact.email}</p></div>
        </div>
        <p className="demo-small">{t.contactNote}</p>
        <p className="demo-review-note">{t.reviewNote}</p>
      </>}
      {step === 3 && <p className="demo-small demo-reset-note">{t.resetNote}</p>}
    </div>
    <div className="demo-booking-actions">
      {step > 0 && step < 3 && <button type="button" className="btn secondary" onClick={() => setStep(step - 1)}><ArrowLeft aria-hidden="true"/>{t.back}</button>}
      {step < 2 && <button type="button" className="btn demo-next" disabled={step === 0 ? !serviceId : !validSelection} onClick={() => setStep(step + 1)}>{t.next}<ArrowRight aria-hidden="true"/></button>}
      {step === 2 && <button type="button" className="btn demo-next" onClick={finish}>{t.finish}<Check aria-hidden="true"/></button>}
      {step === 3 && <>
        <button type="button" className="btn secondary" onClick={restart}>{t.restart}</button>
        <DialogClose asChild><button type="button" className="btn">{t.close}</button></DialogClose>
      </>}
    </div>
  </>;
}
