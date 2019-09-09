import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import Adjuster from '../Timer/Adjuster';

import 'minireset.css/minireset.css';
import './fonts.css';
import '../index.css';
import '../App.css';

const AdjusterTest = ({ title }) => {
  const [minuteValue, setMinuteValue] = useState(0);
  return (
    <Adjuster
      title={title}
      onAdd={() => setMinuteValue(minuteValue + 1)}
      onSubtract={() => setMinuteValue(minuteValue - 1)}
      minuteValue={minuteValue}
    />
  );
};

storiesOf('Adjuster', module).add('Adjuster Component', () => {
  return (
    <>
      <div
        style={{
          padding: '1rem',
        }}
      >
        <AdjusterTest title="Break length" />
      </div>
      <hr />
      <div
        style={{
          padding: '1rem',
        }}
      >
        <AdjusterTest title="Timer length" />
      </div>
    </>
  );
});
