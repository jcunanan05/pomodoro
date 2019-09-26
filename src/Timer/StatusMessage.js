import React from 'react';
import './StatusMessage.css';

/**
 * @param {Boolean} [isBreak = false] - default is false
 * @param {Boolean} [isLongBreak = false] - default is false
 * @param {String} message
 * @param {String} breakMessage - message while on break
 * @param {String} longBreakMessage
 */

function StatusMessage(props) {
  const { isBreak = false, isLongBreak = false } = props;
  const displayedMessage = () => {
    if (!isBreak && !isLongBreak) return props.message;
    else if (isBreak && !isLongBreak) return props.breakMessage;
    else if (!isBreak && isLongBreak) return props.longBreakMessage;
    else return null;
  };
  return (
    <p
      className={`status-message serif ${
        isBreak ? 'text-color-secondary' : 'text-color-grey--dark'
      }`}
    >
      {displayedMessage()}
    </p>
  );
}

export default StatusMessage;
