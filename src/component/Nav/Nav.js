import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import "./Nav.css";

const Navigation = (props) => {
  const history = useLocation();
  const currLocation = history.pathname;
  return (
    <header className="main-header">
      <nav>
        <ul>
          <li>
            <NavLink className="navLink" to="/">
              Home
            </NavLink>
          </li>
          <li>
            {currLocation === "/login" && (
              <NavLink className="navLink" to="/register">
                Register
              </NavLink>
            )}
            {currLocation !== "/login" && (
              <NavLink className="navLink" to="/login">
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
