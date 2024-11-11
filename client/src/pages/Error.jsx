import { NavLink } from "react-router-dom";
import React from "react";

export const Error = () => {
  return (
    <>
      <section id="error-page">
        <div className="content">
          <h2 className="header">404</h2>
          <h4>Sorry! Page not found</h4>
          <p>
            OOps! It seems like the page you're trying to access doesn't exist.
            If you believe there's an issue, feel free to report it, and we'll
            look into it.
          </p>
          <div className="btns">
            {/* using navlink the page doesn't refreshes again */}
            <NavLink to="/">Return Home</NavLink>
            <NavLink to="/contact">Report problem</NavLink>
          </div>
        </div>
      </section>
    </>
  );
};
