import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import StartStopButton from '../src/Timer/StartStopButton';
import TimerText from '../src/Timer/TimerText';
import Title from '../src/Timer/Title';
import './fonts.css';
import '../src/index.css';
import '../src/App.css';
import StatusMessage from '../src/Timer/StatusMessage';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))
  .add('Start / Stop Button', () => <StartStopButton />);

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
