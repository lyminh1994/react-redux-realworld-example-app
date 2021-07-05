import React from "react";
import { Link } from "react-router-dom";

import LoggedOutView from "./LoggedOutView";
import LoggedInView from "./LoggedInView";

const Header = ({ appName, currentUser }) => (
  <nav className="navbar navbar-light">
    <div className="container">
      <Link to="/" className="navbar-brand">
        {appName.toLowerCase()}
      </Link>

      <LoggedOutView currentUser={currentUser} />

      <LoggedInView currentUser={currentUser} />
    </div>
  </nav>
);

export default Header;
