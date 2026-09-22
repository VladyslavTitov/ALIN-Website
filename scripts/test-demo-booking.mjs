import assert from 'node:assert/strict';
import {test} from 'node:test';
import {addCalendarDays, createDemoWindow, getDemoSlots, isDemoDate, isDemoSelectionValid} from '../lib/demo-booking.ts';

const key = date => [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');

test('booking dates use the German calendar day across UTC midnight and a year change', () => {
  const window = createDemoWindow(new Date('2026-12-31T23:30:00Z'));
  assert.equal(key(window.firstDate), '2027-1-4'); // Berlin is already on Friday 1 January.
  assert.equal(key(window.lastDate), '2027-2-26');
});

test('the first sample day skips a weekend containing the German DST transition', () => {
  const window = createDemoWindow(new Date('2026-03-28T12:00:00Z'));
  assert.equal(key(window.firstDate), '2026-3-30');
  assert.equal(key(window.lastDate), '2026-5-23');
  assert.equal(key(addCalendarDays(new Date(2026, 2, 28, 12), 2)), '2026-3-30');
});

test('past dates, weekends and dates outside the preview window cannot offer slots', () => {
  const window = createDemoWindow(new Date('2026-09-22T12:00:00Z'));
  for (const date of [new Date(2026, 8, 22, 12), new Date(2026, 8, 26, 12), new Date(2026, 8, 27, 12), addCalendarDays(window.lastDate, 1), new Date(NaN)]) {
    assert.equal(isDemoDate(date, window), false);
    assert.deepEqual(getDemoSlots('checkup', date, window), []);
  }
  assert.equal(isDemoDate(window.firstDate, window), true);
});

test('disabled, missing or unrecognised selections cannot reach a valid demo result', () => {
  const window = createDemoWindow(new Date('2026-09-22T12:00:00Z'));
  const slots = getDemoSlots('checkup', window.firstDate, window);
  assert.ok(slots.some(slot => slot.available));
  assert.ok(slots.some(slot => !slot.available));
  for (const slot of slots) {
    assert.equal(isDemoSelectionValid('checkup', window.firstDate, slot.time, window), slot.available);
  }
  assert.equal(isDemoSelectionValid('checkup', undefined, '09:00', window), false);
  assert.equal(isDemoSelectionValid('checkup', window.firstDate, '', window), false);
  assert.equal(isDemoSelectionValid('unknown', window.firstDate, '09:00', window), false);
});

test('an old selection is rejected after its sample date passes', () => {
  const previous = createDemoWindow(new Date('2026-09-22T12:00:00Z'));
  const later = createDemoWindow(new Date('2026-09-24T12:00:00Z'));
  const slot = getDemoSlots('checkup', previous.firstDate, previous).find(item => item.available);
  assert.equal(isDemoSelectionValid('checkup', previous.firstDate, slot.time, previous), true);
  assert.equal(isDemoSelectionValid('checkup', previous.firstDate, slot.time, later), false);
});
