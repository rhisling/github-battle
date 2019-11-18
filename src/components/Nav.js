import React from 'react';
import { ThemeConsumer } from '../contexts/Theme';
import NavLink from "./NavLink";

const Nav = () => {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav className="row space-between">
          <ul className="row nav">
            <li>
              <NavLink to="/" className="nav-link">
                Popular
              </NavLink>
            </li>
            <li>
              <NavLink to="/battle" className="nav-link">
                Battle
              </NavLink>
            </li>
          </ul>
          <button
            style={{ fontSize: 30 }}
            className="btn-clear"
            onClick={() =>
              toggleTheme(theme => {
                console.log('theme:', theme);
                return theme === 'light' ? 'dark' : 'light';
              })
            }
          >
            {theme === 'light' ? '🔦' : '💡'}
          </button>
        </nav>
      )}
    </ThemeConsumer>
  );
};

export default Nav;
