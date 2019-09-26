function addSecondsTo({ currentState, timerName, secondsToAdd }) {
  const newTimerSeconds =
    currentState.timerList[timerName].seconds + secondsToAdd;

  return {
    ...currentState,
    timerList: {
      ...currentState.timerList,
      [`${timerName}`]: {
        ...currentState.timerList[timerName],
        seconds: newTimerSeconds,
      },
    },
  };
}

export { addSecondsTo };

export default {
  addSecondsTo,
};
