import React from 'react';
import './DisplayText.css';

function DisplayText(props) {
  return <h2 className="display-text text-color-primary">{props.children}</h2>;
}

export default DisplayText;
