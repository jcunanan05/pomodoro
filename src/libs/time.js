/**
 * @param {Number} seconds
 * @returns {String} with mm:ss format
 */

function toMinutesSeconds(seconds) {
  const MINS = 60;
  const minutesString = () => {
    if (seconds < 0) return `00`;
    if (Math.floor(seconds / MINS) < 10)
      return `0${Math.floor(seconds / MINS)}`;
    return `${Math.floor(seconds / MINS)}`;
  };
  const secondsString = () => {
    if (seconds < 0) return `00`;
    if (seconds % MINS < 10) return `0${seconds % MINS}`;
    return `${seconds % MINS}`;
  };
  return `${minutesString()}:${secondsString()}`;
}

/**
 * @param {Number} seconds
 * @returns {Number} Minutes without decimal.
 */

function toMinutes(seconds) {
  return Math.floor(seconds / 60);
}

export default {
  toMinutesSeconds,
  toMinutes,
};
