import React from 'react';
import './Adjuster.css';

function Adjuster(props) {
  return (
    <section className="adjuster">
      <h3 className="title">{props.title}</h3>
      <div className="functions">
        <button className="subtract">-</button>
        <p className="text-color-grey--dark">
          <span className="minute-value">5</span> min
        </p>
        <button className="add">+</button>
      </div>
    </section>
  );
}

export default Adjuster;
