import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './SettingsButton.css';

const defaultOnClick = () => {
  console.log('settings button clicked.');
};

/**
 * @param {function} onClick
 */

function SettingsButton(props) {
  const { onClick = defaultOnClick } = props;
  return (
    <button
      aria-label="Settings"
      className="settings-button text-color-grey"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faBars} />
    </button>
  );
}

export default SettingsButton;
