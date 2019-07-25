import React from 'react';
import Title from './Title';
import TimerText from './TimerText';
import StatusMessage from './StatusMessage';
import './Timer.css';

function Timer() {
  return (
    <div className="timer background">
      <div className="timer timer-paper">
        <section className="timer-title">
          <Title>Pomodoro Timer</Title>
          <StatusMessage
            message="Start Working!"
            breakMessage="You're on a break!"
          />
        </section>

        <section className="timer-body">
          <TimerText timer="23:10" currentCycle={8} totalCycle={10} />
        </section>
      </div>
    </div>
  );
}

export default Timer;
