import React, { Component } from 'react';
import Title from './Title';
import TimerText from './TimerText';
import StatusMessage from './StatusMessage';
import StartStopButton from './StartStopButton';
import './Timer.css';

class Timer extends Component {
  state = {
    timer: null,
    isTimerPlaying: false,
    seconds: 0,
  };

  toMinutesSeconds(seconds) {
    const MINS = 60;
    const minutesString = () => {
      if (Math.floor(seconds / MINS) < 10)
        return `0${Math.floor(seconds / MINS)}`;
      return `${Math.floor(seconds / MINS)}`;
    };
    const secondsString = () => {
      if (seconds % MINS < 10) return `0${seconds % MINS}`;
      return `${seconds % MINS}`;
    };
    return `${minutesString()}:${secondsString()}`;
  }

  timer = () => {
    this.setState(currentState => ({
      ...currentState,
      seconds: currentState.seconds + 1,
    }));
  };

  startTimer = () => {
    this.setState({
      timer: setInterval(this.timer, 1000),
    });
  };

  stopTimer = () => {
    clearInterval(this.state.timer);
  };

  toggleTimer = async () => {
    await this.setState(prevState => ({
      ...prevState,
      isTimerPlaying: !prevState.isTimerPlaying,
    }));
    this.operateTimer();
  };

  operateTimer = () => {
    const { state } = this;
    if (state.isTimerPlaying) {
      this.startTimer();
    }
    if (!state.isTimerPlaying) {
      this.stopTimer();
    }
  };

  componentWillUnmount() {
    this.stopTimer();
  }

  render() {
    const { state } = this;
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
            <TimerText
              timer={this.toMinutesSeconds(
                state.seconds
              )} /*currentCycle={8} totalCycle={10}*/
            />
            <StartStopButton
              onClick={this.toggleTimer}
              isPlaying={state.isTimerPlaying}
            />
          </section>
        </div>
      </div>
    );
  }
}

export default Timer;
