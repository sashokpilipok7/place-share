import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "shared/context/auth-context";
import "./NavLinks.css";

function NavLinks(props) {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`${auth.userId}/places`}>MY PLACES</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {auth.isLoggedIn ? (
        <li>
          <button onClick={auth.logout}>Log out</button>
        </li>
      ) : (
        <li>
          <NavLink to="/auth">AUTH</NavLink>
        </li>
      )}
    </ul>
  );
}

export default NavLinks;
