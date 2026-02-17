import React, { useContext, Fragment } from "react";
import "./Navigation.css";
import AuthContext from "../../store/auth-context";
import ThemeContext from "../../store/theme-context";

const Navigation = () => {
  const authCtx = useContext(AuthContext);
  const themeCtx = useContext(ThemeContext);

  return (
    <nav className="nav">
      <ul>
        <li>
          <button onClick={themeCtx.toggleTheme} className="theme-toggle">
            {themeCtx.theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </li>

        {authCtx.isLoggedIn && (
          <Fragment>
            <li><a href="/">Users</a></li>
            <li><a href="/">Admin</a></li>
            <li>
              <button onClick={authCtx.onLogout}>Välju</button>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;