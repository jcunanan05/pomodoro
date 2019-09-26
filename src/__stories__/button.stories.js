import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import StartStopButton from '../Timer/StartStopButton';
import SettingsButton from '../Timer/Settings/SettingsButton';
import ResetButton from '../Timer/Reset/ResetButton';

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
  })
  .add('Reset Button', () => {
    return <ResetButton />;
  });
