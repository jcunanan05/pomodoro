import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import StartStopButton from '../Timer/StartStopButton';
import TimerText from '../Timer/TimerText';
import Title from '../Timer/Title';
import StatusMessage from '../Timer/StatusMessage';
import SettingsButton from '../Timer/Settings/SettingsButton';
import Adjuster from '../Timer/Adjuster';

import 'minireset.css/minireset.css';
import './fonts.css';
import '../index.css';
import '../App.css';

storiesOf('Button', module)
  .add('Start / Stop Button', () => {
    const StartStopButtonContainer = () => {
      const [isPlaying, setIsPlaying] = useState(false);
      return (
        <StartStopButton
          onClick={() => setIsPlaying(!isPlaying)}
          isPlaying={isPlaying}
        />
      );
    };
    return <StartStopButtonContainer />;
  })
  .add('Settings Button', () => {
    return <SettingsButton />;
  });

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

storiesOf('Adjuster', module).add('Adjuster Component', () => {
  return (
    <div
      style={{
        padding: '1rem',
      }}
    >
      <Adjuster title="Break length" />
    </div>
  );
});
