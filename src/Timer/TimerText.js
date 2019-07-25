import React from 'react';
import './TimerText.css';

/**
 * @param {*} current - current timer round
 * @param {*} total
 */
const Cycle = props => (
  <p className="cycle-text text-color-grey">
    {props.current}/{props.total}
  </p>
);

/**
 * @param {*} timer - timer text
 * @param {int} currentCycle - rounds of pomodoro did
 * @param {int} totalCycle - total timer rounds
 */

function TimerText(props) {
  return (
    <>
      <h2 className="timer-text text-color-primary">{props.timer}</h2>
      {!(props.currentCycle && props.totalCycle) ? null : (
        <Cycle current={props.currentCycle} total={props.totalCycle} />
      )}
    </>
  );
}

export default TimerText;
