import React, { Component, createRef } from 'react';
import Title from './Title';
import TimerText from './TimerText';
import StatusMessage from './StatusMessage';
import StartStopButton from './StartStopButton';
import ResetButton from './Reset/ResetButton';
import time from '../libs/time';
import './Timer.css';
import Adjuster from './Adjuster';
import defaultState from './defaultState';
import utils from './utils';

class Timer extends Component {
  buzzerRef = createRef();
  state = defaultState;

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
    const { MAIN, SHORT_BREAK /*LONG_BREAK*/ } = timerSession.types;

    if (timerSession.id === MAIN) {
      // activate short break
      await this.setTimerSessionId(SHORT_BREAK);
      await this.setBreak({ isBreak: true, longBreak: false });
    } else if (timerSession.id === SHORT_BREAK) {
      // set to main timer
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
      await this.playBuzzer();
      // start timer again
      await this.startNextTimer();
    }
  };

  decreaseSecond = async seconds => {
    await this.setState(currentState =>
      utils.decreaseSeconds({ currentState, seconds })
    );
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
    await this.setState(currentState =>
      utils.setTimerSessionId({ currentState, id })
    );
  };

  setTimerSession = async timerSession => {
    await this.setState(currentState =>
      utils.setTimerSession({ currentState, timerSession })
    );
  };

  playBuzzer = async () => {
    const buzzer = this.buzzerRef.current;
    await buzzer.pause();
    await buzzer.load();
    await buzzer.play();
  };

  addTimerMinutes = async timerName => {
    const onTimerSessionFound = async () => {
      await this.setState(currentState =>
        utils.addSecondsTo({ currentState, timerName, value: 60 })
      );
    };

    await this.onAdjusterMinuteUpdate(
      async () =>
        await utils.adjustTimerMinutes({
          currentState: this.state,
          timerName,
          onTimerSessionFound,
        })
    );
  };

  subtractTimerMinutes = async timerName => {
    const onTimerSessionFound = async () => {
      await this.setState(currentState =>
        utils.subtractSecondsTo({ currentState, timerName, value: 60 })
      );
    };

    await this.onAdjusterMinuteUpdate(
      async () =>
        await utils.adjustTimerMinutes({
          currentState: this.state,
          timerName,
          onTimerSessionFound,
        })
    );
  };

  onAdjusterMinuteUpdate = async adjusterUpdate => {
    const timerName = await adjusterUpdate();
    // TODO(#1) Update timer display if its in the right session

    // if(this.state.timerSession.id === timerName && this.state.timerSession.secondsRemaining === )
  };

  handleReset = () => {
    this.resetTimer();
    // change display color to Main timer
    this.setState({ isTimerPlaying: false, isBreak: false });
    this.stopTimer();
  };

  resetTimer = () => {
    const { timerSession, timerList } = this.state;
    const mainTimer = timerList[timerSession.types.MAIN];

    // set timer seconds
    this.setState(currentState => ({
      ...currentState,
      timerSession: {
        ...currentState.timerSession,
        secondsRemaining: mainTimer.seconds,
        buzzer: mainTimer.buzzer,
      },
    }));
  };

  componentDidMount = async () => {
    // ger main timer settings
    await this.setTimerSession(
      this.state.timerList[this.state.timerSession.id]
    );
  };

  componentWillUnmount = () => {
    this.stopTimer();
  };

  render() {
    const { state } = this;
    const { timerSession, timerList } = state;
    const { types } = timerSession;
    return (
      <div className="timer-wrapper">
        <div className="timer background">
          <div className="timer timer-paper">
            <section className="timer-title">
              <Title>Pomodoro Timer</Title>
              <StatusMessage
                isBreak={state.isBreak}
                isLongBreak={false}
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
              <audio className="buzzer" ref={this.buzzerRef}>
                <source src={timerSession.buzzer} />
                Your browser does not support the
                <code>audio</code> element.
              </audio>

              <ResetButton onReset={this.handleReset} />
            </section>
          </div>
        </div>

        <div className="settings">
          <Adjuster
            title="Main Timer length"
            minuteValue={time.toMinutes(timerList.main.seconds)}
            onAdd={() => this.addTimerMinutes(types.MAIN)}
            onSubtract={() => this.subtractTimerMinutes(types.MAIN)}
          />

          <Adjuster
            title="Break Timer length"
            minuteValue={time.toMinutes(timerList.shortBreak.seconds)}
            onAdd={() => this.addTimerMinutes(types.SHORT_BREAK)}
            onSubtract={() => this.subtractTimerMinutes(types.SHORT_BREAK)}
          />
        </div>
      </div>
    );
  }
}

export default Timer;
