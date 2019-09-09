import React from 'react';
import './Adjuster.css';

/**
 *
 * @param {String} title
 * @param {Number} minuteValue
 * @param {Function} onSubtract
 * @param {Function} onAdd
 */

function Adjuster(props) {
  return (
    <section className="adjuster">
      <h3 className="title">{props.title}</h3>
      <div className="functions">
        <button className="subtract" onClick={props.onSubtract}>
          -
        </button>
        <p className="text-color-grey--dark">
          <span className="minute-value">{props.minuteValue}</span> min
        </p>
        <button className="add" onClick={props.onAdd}>
          +
        </button>
      </div>
    </section>
  );
}

export default Adjuster;
