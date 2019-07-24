import React from 'react';
import './TimerText.css';

function TimerText(props) {
  return <h2 className="timer-text text-color-primary">{props.children}</h2>;
}

export default TimerText;
