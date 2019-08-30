import React from 'react';

function Adjuster(props) {
  return (
    <section className="adjuster">
      <h3>{props.title}</h3>
      <button>+</button>
      <p>5</p>
      <button>-</button>
    </section>
  );
}

export default Adjuster;
