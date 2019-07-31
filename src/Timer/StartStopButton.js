import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import './StartStopButton.css';

const StartIcon = () => (
  <>
    <FontAwesomeIcon icon={faPlay} />
    <span style={{ display: 'none' }}>Start Timer</span>
  </>
);

const PauseIcon = () => (
  <>
    <FontAwesomeIcon icon={faPause} />
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
