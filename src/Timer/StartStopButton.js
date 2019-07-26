import React from 'react';
import './StartStopButton.css';

const StartIcon = () => (
  <>
    {'▶'}
    <span style={{ display: 'none' }}>Start Timer</span>
  </>
);

const PauseIcon = () => (
  <>
    {'❚❚'}
    <span style={{ display: 'none' }}>Pause Timer</span>
  </>
);

/**
 * @param {function} onClick
 * @param {Boolean} isPlaying
 */

function StartStopButton(props) {
  return (
    <button className="start-stop-button" onClick={props.onClick}>
      {!props.isPlaying ? <StartIcon /> : <PauseIcon />}
    </button>
  );
}

export default StartStopButton;
