function toMinutesSeconds(seconds) {
  const MINS = 60;
  const minutesString = () => {
    if (Math.floor(seconds / MINS) < 10)
      return `0${Math.floor(seconds / MINS)}`;
    return `${Math.floor(seconds / MINS)}`;
  };
  const secondsString = () => {
    if (seconds % MINS < 10) return `0${seconds % MINS}`;
    return `${seconds % MINS}`;
  };
  return `${minutesString()}:${secondsString()}`;
}

export default {
  toMinutesSeconds,
};
