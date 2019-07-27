import React, { Component, createRef } from 'react';
import Title from './Title';
import TimerText from './TimerText';
import StatusMessage from './StatusMessage';
import StartStopButton from './StartStopButton';
import time from '../libs/time';
import audio from './utils/audio';
import './Timer.css';

class Timer extends Component {
  state = {
    timer: null,
    isTimerPlaying: false,
    isBreakTime: false,
    timerSesson: 0,
    seconds: {
      main: 10,
      break: 3,
    },
  };

  buzzerRef = createRef();
  buzzerRef2 = createRef();

  startTimer = () => {
    this.setState({ timer: setInterval(this.timerOperations, 1000) });
  };

  stopTimer = () => {
    clearInterval(this.state.timer);
  };

  decreaseSeconds = async () => {
    await this.setState(currentState => ({
      ...currentState,
      timerSession: currentState.timerSession - 1,
    }));
  };

  toggleTimer = async () => {
    await this.setState(currentState => {
      return {
        ...currentState,
        isTimerPlaying: !currentState.isTimerPlaying,
      };
    });
    // start/stop timer
    if (this.state.isTimerPlaying) this.startTimer();
    if (!this.state.isTimerPlaying) this.stopTimer();
  };

  timerOperations = async () => {
    // clear timer guard
    if (!this.state.isTimerPlaying) {
      this.stopTimer();
      return;
    }
    await this.decreaseSeconds();
    if (this.state.timerSession < 1) {
      await this.setState({ isTimerPlaying: false, isBreakTime: true });
      this.stopTimer();
      audio.play(this.buzzerRef2.current);
      // set timer to breaktimer
      this.setState({ timerSession: this.state.seconds.break });
    }
  };

  componentDidMount() {
    this.setState({ timerSession: this.state.seconds.main });
  }

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
              isBreak={state.isBreakTime}
              message="Start Working!"
              breakMessage="You're on a break!"
            />
          </section>
          <section className="timer-body">
            <TimerText
              timer={time.toMinutesSeconds(
                state.timerSession
              )} /*currentCycle={8} totalCycle={10}*/
            />
            <StartStopButton
              onClick={this.toggleTimer}
              isPlaying={state.isTimerPlaying}
            />
            <audio ref={this.buzzerRef} src="/assets/1buzzer.mp3">
              Your browser does not support the
              <code>audio</code> element.
            </audio>
            <audio ref={this.buzzerRef2} src="/assets/2buzzer.mp3">
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          </section>
        </div>
      </div>
    );
  }
}

export default Timer;
