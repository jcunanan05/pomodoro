import React, { Component, createRef } from 'react';
import Title from './Title';
import TimerText from './TimerText';
import StatusMessage from './StatusMessage';
import StartStopButton from './StartStopButton';
import SettingsButton from './Settings/SettingsButton';
import time from '../libs/time';
import './Timer.css';

class Timer extends Component {
  buzzerRef = createRef();
  state = {
    timer: null,
    isTimerPlaying: false,
    isBreak: false,
    isLongBreak: false,
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
        seconds: 1200,
        buzzer: '/assets/2buzzer.mp3',
      },
      shortBreak: {
        seconds: 300,
        buzzer: '/assets/1buzzer.mp3',
      },
      longBreak: {
        seconds: 900,
        buzzer: '/assets/1buzzer.mp3',
      },
    },
  };

  increasePomodoroCycle = async () => {
    await this.setState(currentState => ({
      ...currentState,
      timerSession: {
        ...currentState.timerSession,
        cyclesCompleted: currentState.timerSession.cyclesCompleted + 1,
      },
    }));
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
    const { cyclesCompleted } = timerSession;
    const { MAIN, SHORT_BREAK, LONG_BREAK } = timerSession.types;

    if (
      timerSession.id === MAIN &&
      cyclesCompleted >= 4 &&
      cyclesCompleted % 4 === 0
    ) {
      await this.setTimerSessionId(LONG_BREAK);
      await this.setBreak({ isBreak: true, longBreak: true });
    } else if (timerSession.id === MAIN) {
      await this.setTimerSessionId(SHORT_BREAK);
      await this.setBreak({ isBreak: true, longBreak: false });
    } else if (timerSession.id === SHORT_BREAK) {
      // set to main timer
      await this.setTimerSessionId(MAIN);
      await this.increasePomodoroCycle();
      await this.setBreak({ isBreak: false, longBreak: false });
    } else if (timerSession.id === LONG_BREAK) {
      await this.setTimerSessionId(MAIN);
      await this.increasePomodoroCycle();
      await this.setBreak({ isBreak: false, longBreak: false });
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

  setBreak = async ({ isBreak, longBreak }) => {
    await this.setState({
      isBreak,
      isLongBreak: longBreak,
    });
  };

  setTimerSessionId = async id => {
    await this.setState(currentState => ({
      ...currentState,
      timerSession: {
        ...currentState.timerSession,
        id,
      },
    }));
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
    // ger timer[main]
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
              isLongBreak={state.isLongBreak}
              message="Start Working!"
              breakMessage="You're on a break!"
              longBreakMessage="Take a long break!"
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
            <div className="buttons-tray">
              <SettingsButton />
            </div>
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
