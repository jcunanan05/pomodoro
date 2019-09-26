import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './SettingsButton.css';

const defaultOnClick = () => {
  console.log('settings button clicked.');
};

/**
 * @param {function} onClick
 * @param {String} label - for accessibility
 */

function SettingsButton(props) {
  const { onClick = defaultOnClick, label = 'Show / Hide Settings' } = props;
  return (
    <button
      aria-label={label}
      className="settings-button text-color-grey"
      onClick={onClick}
    >
      <FontAwesomeIcon title={label} icon={faBars} />
      <span className="sr-only">{label}</span>
    </button>
  );
}

export default SettingsButton;
