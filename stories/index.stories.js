import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import StartStopButton from '../src/Timer/StartStopButton';
import DisplayText from '../src/Timer/DisplayText';
import './fonts.css';
import '../src/index.css';
import '../src/App.css';

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

storiesOf('Text', module).add('Timer Display', () => (
  <DisplayText>23:10</DisplayText>
));
