import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import './StartStopButton.css';

const StartIcon = () => (
  <>
    <FontAwesomeIcon title="Start Timer" icon={faPlay} />
    <span className="sr-only">Start Timer</span>
  </>
);

const PauseIcon = () => (
  <>
    <FontAwesomeIcon title="Pause Timer" icon={faPause} />
    <span className="sr-only">Pause Timer</span>
  </>
);

/**
 * @param {function} onClick
 * @param {Boolean} isPlaying
 */

function StartStopButton(props) {
  return (
    <button
      className="start-stop-button"
      aria-label="Play / Pause"
      onClick={props.onClick}
    >
      {props.isPlaying ? <PauseIcon /> : <StartIcon />}
    </button>
  );
}

export default StartStopButton;
