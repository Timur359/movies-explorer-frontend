import React from "react";

import "./Header.css";

import logo from "../../../images/logo.svg";

const Header = () => (
  <div className="header-auth">
    <img src={logo} className="header__logo" alt="Logo" />
    <h6 className="header__title">Рады видеть !</h6>
  </div>
);

export default Header;
