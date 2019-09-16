import React from 'react';
import './TimerText.css';

/**
 * @param {*} current - current timer round
 * @param {*} total
 */
const Cycle = props => (
  <p className="cycle-text text-color-grey">
    Round {props.current}
    {/* {props.total} */}
  </p>
);

/**
 * @param {*} timer - timer text
 * @param {int} currentCycle - rounds of pomodoro did
 * @param {int} totalCycle - total timer rounds
 * @param {boolean} isBreak - timer on break
 */

function TimerText(props) {
  const isBreak = props.isBreak ? 'is-break-time text-color-secondary' : '';
  const renderCycle = () => {
    if (
      typeof props.currentCycle !== 'number' &&
      typeof props.totalCycle !== 'number'
    )
      return null;
    return <Cycle current={props.currentCycle} total={props.totalCycle} />;
  };
  return (
    <>
      <h2 className={`timer-text text-color-primary ${isBreak}`}>
        {props.timer}
      </h2>
      {renderCycle()}
    </>
  );
}

export default TimerText;
