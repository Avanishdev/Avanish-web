import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../AuthContext.js";

const Navbar = () => {
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;
  return (
    <>
      <header>
        <div className="container">
          <div className="logo">
            <a href="/">Avanish Developer</a>
          </div>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/property">Properties</NavLink>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <NavLink to="/" onClick={logout}>
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;
