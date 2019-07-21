import React, { useState } from 'react';
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

function StartStopButton() {
  const [isPlaying, setPlayingTo] = useState(false);
  return (
    <button
      className="start-stop-button"
      onClick={() => setPlayingTo(!isPlaying)}
    >
      {!isPlaying ? <StartIcon /> : <PauseIcon />}
    </button>
  );
}

export default StartStopButton;
