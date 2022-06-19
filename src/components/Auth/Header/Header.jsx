import React from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";

import logo from "../../../images/logo.svg";

const Header = ({ title }) => (
  <div className="header-auth">
    <NavLink to="/">
      <img src={logo} className="header__logo" alt="Logo" />
    </NavLink>
    <h6 className="header__title">{title}</h6>
  </div>
);

export default Header;
