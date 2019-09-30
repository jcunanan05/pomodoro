function setSecondsTo({ currentState, timerName, seconds }) {
  return {
    ...currentState,
    timerList: {
      ...currentState.timerList,
      [`${timerName}`]: {
        ...currentState.timerList[timerName],
        seconds,
      },
    },
  };
}

const addSecondsTo = ({ currentState, timerName, value }) => {
  const newTimerSeconds = currentState.timerList[timerName].seconds + value;
  return setSecondsTo({
    currentState,
    timerName,
    seconds: newTimerSeconds,
  });
};

function subtractSecondsTo({ currentState, timerName, value }) {
  const newTimerSeconds = currentState.timerList[timerName].seconds - value;

  return setSecondsTo({
    currentState,
    timerName,
    seconds: newTimerSeconds,
  });
}

export { addSecondsTo, subtractSecondsTo };

export default {
  addSecondsTo,
  subtractSecondsTo,
};
