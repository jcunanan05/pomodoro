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

function decreaseSeconds({ currentState, seconds }) {
  return {
    ...currentState,
    timerSession: {
      ...currentState.timerSession,
      secondsRemaining: currentState.timerSession.secondsRemaining - seconds,
    },
  };
}

function setTimerSessionId({ currentState, id }) {
  return {
    ...currentState,
    timerSession: {
      ...currentState.timerSession,
      id,
    },
  };
}

function setTimerSession({ currentState, timerSession }) {
  return {
    timerSession: {
      ...currentState.timerSession,
      secondsRemaining: timerSession.seconds,
      buzzer: timerSession.buzzer,
    },
  };
}

async function adjustTimerMinutes({
  currentState,
  timerName,
  onTimerSessionFound,
}) {
  const { types } = currentState.timerSession;

  if (Object.values(types).includes(timerName)) {
    await onTimerSessionFound();
    return timerName;
  }

  return '';
}

export {
  addSecondsTo,
  subtractSecondsTo,
  decreaseSeconds,
  setTimerSessionId,
  setTimerSession,
  adjustTimerMinutes,
};

export default {
  addSecondsTo,
  subtractSecondsTo,
  decreaseSeconds,
  setTimerSessionId,
  setTimerSession,
  adjustTimerMinutes,
};
