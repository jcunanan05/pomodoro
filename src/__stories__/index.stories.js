import React from 'react';
import { storiesOf } from '@storybook/react';
import TimerText from '../Timer/TimerText';
import Title from '../Timer/Title';
import StatusMessage from '../Timer/StatusMessage';

import 'minireset.css/minireset.css';
import './fonts.css';
import '../index.css';
import '../App.css';

storiesOf('Text', module)
  .add('Timer Display', () => (
    <TimerText timer="23:10" currentCycle={8} totalCycle={10}></TimerText>
  ))
  .add('Title Text with status message', () => (
    <>
      <Title>Pomodoro Timer</Title>
      <StatusMessage
        message="Start working!"
        breakMessage="You are on a break."
      />
      <hr />
      <Title>Pomodoro Timer</Title>
      <StatusMessage
        isBreak
        message="Start working!"
        breakMessage="✔️ You are on a break."
      />
      <hr />
      <Title>Pomodoro Timer</Title>
      <StatusMessage
        isBreak
        isLongBreak
        message="Start working!"
        breakMessage="✔️ You are on a break."
        longBreakMessage="You are on a long break."
      />
    </>
  ));
