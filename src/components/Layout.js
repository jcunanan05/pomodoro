import React from 'react';
import './Layout.css';

function Layout(props) {
  const githubUrl = 'https://github.com/jcunanan05';
  return (
    <>
      <main className="main fullscreen">{props.children}</main>
      <footer className="footer">
        <p>
          Made by <a href={githubUrl}>Jonathan Cunanan.</a> Copyright&copy;
          2019. All rights reserved.
        </p>
      </footer>
    </>
  );
}

export default Layout;
