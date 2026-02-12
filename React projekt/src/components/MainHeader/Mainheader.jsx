import React, { useContext } from "react";
import Navigation from "./Navigation";
import "./MainHeader.css";
import AuthContext from "../../store/auth-context";

const MainHeader = () => {
  const authCtx = useContext(AuthContext);

  return (
    <header className="main-header">
      <h1>Kulude Arvestaja</h1>
      <Navigation isLoggedIn={authCtx.isLoggedIn} onLogout={authCtx.onLogout} />
    </header>
  );
};

export default MainHeader;
