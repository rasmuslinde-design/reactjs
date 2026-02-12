import React from 'react';
import './Navigation.css';

const Navigation = (props) => {
  return (
    <nav className="nav">
      <ul>
        {props.isLoggedIn && (
          <li>
            <a href="/">Kasutajad</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <a href="/">Seaded</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Välju</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;