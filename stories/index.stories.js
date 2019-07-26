import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import StartStopButton from '../src/Timer/StartStopButton';
import TimerText from '../src/Timer/TimerText';
import Title from '../src/Timer/Title';
import 'minireset.css/minireset.css';
import './fonts.css';
import '../src/index.css';
import '../src/App.css';
import StatusMessage from '../src/Timer/StatusMessage';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('Button', module).add('Start / Stop Button', () => {
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
    </>
  ));
