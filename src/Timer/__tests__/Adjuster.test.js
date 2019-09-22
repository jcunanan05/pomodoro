import React, { useState } from 'react';
import Adjuster from '../Adjuster';
import { render, waitForElement, fireEvent } from '@testing-library/react';
import faker from 'faker';

describe('Adjuster Component', () => {
  test('onAdd and onSubtract api working', async () => {
    const [onAdd, onSubtract] = [jest.fn(), jest.fn()];

    const { getByText } = render(
      <Adjuster onAdd={onAdd} onSubtract={onSubtract} />
    );

    fireEvent.click(getByText('-'));
    fireEvent.click(getByText('+'));

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onSubtract).toHaveBeenCalledTimes(1);
  });

  test('Integration', async () => {
    const [title] = [faker.name.title()];
    const TestAdjuster = () => {
      const [minuteValue, setMinuteValue] = useState(0);
      return (
        <Adjuster
          title={title}
          minuteValue={minuteValue}
          onAdd={() => setMinuteValue(minuteValue + 1)}
          onSubtract={() => setMinuteValue(minuteValue - 1)}
        />
      );
    };
    const { getByText } = render(<TestAdjuster />);

    expect(getByText(title).textContent).toBe(title);

    fireEvent.click(getByText('+'));
    fireEvent.click(getByText('+'));

    expect(getByText(/2/));

    fireEvent.click(getByText('-'));

    expect(getByText(/1/));
  });
});
