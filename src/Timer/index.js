import React, { Component, createRef } from 'react';
import Title from './Title';
import TimerText from './TimerText';
import StatusMessage from './StatusMessage';
import StartStopButton from './StartStopButton';
import time from '../libs/time';
import audio from './utils/audio';
import './Timer.css';

class Timer extends Component {
  buzzerRef = createRef();
  state = {
    timer: null,
    isTimerPlaying: false,
    timerSession: {
      secondsRemaining: 0,
      currentBuzzer: '',
    },
    timerList: [
      {
        seconds: 5,
        buzzer: '/assets/2buzzer.mp3',
      },
    ],
  };

  toggleTimer = () => {
    if (this.state.isTimerPlaying) {
      this.stopTimer();
      return;
    }
    this.startTimer();
  };

  startTimer = async () => {
    await this.setState({
      timer: await setInterval(this.operateTimer, 1000),
      isTimerPlaying: true,
    });
  };

  operateTimer = async () => {
    if (this.state.isTimerPlaying === false) return;
    await this.decreaseSecond(1);
    if (this.state.timerSession.secondsRemaining <= 0) {
      await this.stopTimer();
      await audio.play(this.buzzerRef.current);
      // start timer again
      await this.setTimerSession(this.state.timerList[0]);
      await this.startTimer();
    }
  };

  decreaseSecond = async seconds => {
    await this.setState(currentState => ({
      timerSession: {
        ...currentState.timerSession,
        secondsRemaining: currentState.timerSession.secondsRemaining - seconds,
      },
    }));
  };

  stopTimer = async () => {
    await this.setState({ isTimerPlaying: false });
    if (this.state.timer !== null) await clearInterval(this.state.timer);
  };

  setTimerSession = async timerSession => {
    await this.setState({
      timerSession: {
        secondsRemaining: timerSession.seconds,
        currentBuzzer: timerSession.buzzer,
      },
    });
  };

  componentDidMount = async () => {
    // ger timer[0]
    await this.setTimerSession(this.state.timerList[0]);
  };

  componentWillUnmount = () => {
    this.stopTimer();
  };

  render() {
    const { state } = this;
    const { timerSession } = state;
    return (
      <div className="timer background">
        <div className="timer timer-paper">
          <section className="timer-title">
            <Title>Pomodoro Timer</Title>
            <StatusMessage
              // isBreak={state.isBreakTime}
              message="Start Working!"
              breakMessage="You're on a break!"
            />
          </section>
          <section className="timer-body">
            <TimerText
              timer={time.toMinutesSeconds(timerSession.secondsRemaining)}
              /*currentCycle={8} totalCycle={10}*/
            />
            <StartStopButton
              onClick={this.toggleTimer}
              isPlaying={state.isTimerPlaying}
            />
            <audio ref={this.buzzerRef} src={timerSession.currentBuzzer}>
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
