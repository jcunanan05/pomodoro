import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import './ResetButton.css';

/**
 * @param {Boolean} isHidden
 * @param {Function} onReset
 */

function ResetButton(props) {
  const { isHidden = false } = props;
  const text = 'Reset Timer';
  const handleOnReset = () => props.onReset();

  if (isHidden) return null;
  return (
    <button onClick={handleOnReset} className="reset-button">
      <span className="sr-only">{text}</span>
      <FontAwesomeIcon title={text} icon={faUndo} />
    </button>
  );
}

export default ResetButton;
