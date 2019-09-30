import { addSecondsTo, subtractSecondsTo } from '../utils';
import defaultState from '../defaultState';

describe('addSecondsTo function', () => {
  test('adding seconds while preserving state', () => {
    const value = 60;
    const timeToExpect = defaultState.timerList.main.seconds + value;
    expect(
      addSecondsTo({
        currentState: defaultState,
        timerName: 'main',
        value,
      }).timerList.main.seconds
    ).toBe(timeToExpect);
  });
});

describe('subtractSecondsTo function', () => {
  test('subtracts seconds', () => {
    const value = 60;
    const timeToExpect = defaultState.timerList.main.seconds - value;

    expect(
      subtractSecondsTo({
        currentState: defaultState,
        timerName: 'main',
        value,
      }).timerList.main.seconds
    ).toBe(timeToExpect);
  });
});
