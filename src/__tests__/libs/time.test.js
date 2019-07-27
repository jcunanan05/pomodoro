import time from '../../libs/time';

const { toMinutesSeconds } = time;

describe('toMinutesSeconds Functions', () => {
  test('returns a string', () => {
    expect(typeof toMinutesSeconds(1)).toBe('string');
  });
  // seconds
  test('1 should be 00:01', () => {
    expect(toMinutesSeconds(1)).toBe('00:01');
  });
  test('9 should be 00:09', () => {
    expect(toMinutesSeconds(9)).toBe('00:09');
  });
  test('10 should be 00:10', () => {
    expect(toMinutesSeconds(10)).toBe('00:10');
  });
  // minutes
  test('60 should be 01:00', () => {
    expect(toMinutesSeconds(60)).toBe('01:00');
  });
  test('540 should be 09:00', () => {
    expect(toMinutesSeconds(540)).toBe('09:00');
  });
  test('600 should be 10:00', () => {
    expect(toMinutesSeconds(600)).toBe('10:00');
  });
  // minutes seconds
  test('61 should be 01:01', () => {
    expect(toMinutesSeconds(61)).toBe('01:01');
  });
  test('599 should be 09:59', () => {
    expect(toMinutesSeconds(599)).toBe('09:59');
  });
  test('1199 should be 19:59', () => {
    expect(toMinutesSeconds(1199)).toBe('19:59');
  });
});
