import { addSecondsTo } from '../utils';
import defaultState from '../utils/defaultState';

describe('addSecondsTo function', () => {
  test('adding seconds while preserving state', () => {
    expect(
      addSecondsTo({
        currentState: defaultState,
        timerName: 'main',
        secondsToAdd: 60,
      }).timerList.main.seconds
    ).toBe(60);
  });
});
