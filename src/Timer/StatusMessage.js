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
  const { isBreak = false, isLongBreak = false } = props; //default value
  return (
    <p
      className={`status-message serif ${
        !isBreak ? 'text-color-grey--dark' : 'text-color-secondary'
      }`}
    >
      {!isBreak
        ? props.message
        : isLongBreak
        ? props.longBreakMessage
        : props.breakMessage}
    </p>
  );
}

export default StatusMessage;
