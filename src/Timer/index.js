import React, { Component, createRef } from 'react';
import Title from './Title';
import TimerText from './TimerText';
import StatusMessage from './StatusMessage';
import StartStopButton from './StartStopButton';
import time from '../libs/time';
import './Timer.css';

class Timer extends Component {
  buzzerRef = createRef();
  state = {
    timer: null,
    isTimerPlaying: false,
    isBreak: false,
    timerSession: {
      secondsRemaining: 0,
      buzzer: '/assets/2buzzer.mp3',
      id: 'main',
      cyclesCompleted: 0,
      types: {
        MAIN: 'main',
        SHORT_BREAK: 'shortBreak',
        LONG_BREAK: 'longBreak',
      },
    },
    timerList: {
      main: {
        seconds: 5,
        buzzer: '/assets/2buzzer.mp3',
      },
      shortBreak: {
        seconds: 3,
        buzzer: '/assets/1buzzer.mp3',
      },
      longBreak: {
        seconds: 4,
        buzzer: '/assets/1buzzer.mp3',
      },
    },
  };

  toggleTimer = () => {
    if (this.state.isTimerPlaying) {
      this.setState({ isTimerPlaying: false });
      this.stopTimer();
      return;
    }
    this.startTimer();
  };

  startNextTimer = async () => {
    const { timerSession } = this.state;
    // set main or break timer
    if (timerSession.id === timerSession.types.MAIN) {
      await this.setState(currentState => ({
        ...currentState,
        timerSession: {
          ...currentState.timerSession,
          id: timerSession.types.SHORT_BREAK,
        },
        isBreak: true,
      }));
    } else if (timerSession.id === timerSession.types.SHORT_BREAK) {
      await this.setState(currentState => ({
        ...currentState,
        timerSession: {
          ...currentState.timerSession,
          id: timerSession.types.MAIN,
          cyclesCompleted: currentState.timerSession.cyclesCompleted + 1,
        },
        isBreak: false,
      }));
    }

    // prepare and start timer
    await this.setTimerSession(
      this.state.timerList[this.state.timerSession.id]
    );
    await this.startTimer();
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
    if (this.state.timerSession.secondsRemaining < 0) {
      await this.stopTimer();
      await this.buzzerRef.current.play();
      // start timer again
      await this.startNextTimer();
    }
  };

  decreaseSecond = async seconds => {
    await this.setState(currentState => ({
      ...currentState,
      timerSession: {
        ...currentState.timerSession,
        secondsRemaining: currentState.timerSession.secondsRemaining - seconds,
      },
    }));
  };

  stopTimer = async () => {
    if (this.state.timer !== null) await clearInterval(this.state.timer);
  };

  setTimerSession = async timerSession => {
    await this.setState(currentState => ({
      timerSession: {
        ...currentState.timerSession,
        secondsRemaining: timerSession.seconds,
        // buzzer: timerSession.buzzer,
      },
    }));
  };

  componentDidMount = async () => {
    // ger timer[0]
    await this.setTimerSession(
      this.state.timerList[this.state.timerSession.id]
    );
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
              isBreak={state.isBreak}
              message="Start Working!"
              breakMessage="You're on a break!"
            />
          </section>
          <section className="timer-body">
            <TimerText
              isBreak={state.isBreak}
              timer={time.toMinutesSeconds(timerSession.secondsRemaining)}
              currentCycle={timerSession.cyclesCompleted}
              totalCycle={timerSession.cyclesCompleted}
            />
            <StartStopButton
              onClick={this.toggleTimer}
              isPlaying={state.isTimerPlaying}
            />
            <audio ref={this.buzzerRef} src={timerSession.buzzer}>
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
