import React, { useContext } from "react";
import "./Navigation.css";
import AuthContext from "../../store/auth-context";

const Navigation = () => {
  const authCtx = useContext(AuthContext);

  return (
    <nav className="nav">
      <ul>
        {authCtx.isLoggedIn && (
          <li>
            <button onClick={authCtx.onLogout}>Välju</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
