import React from "react";

import "./Header.css";

import logo from "../../../images/logo.svg";

const Header = () => (
  <>
    <img src={logo} className="header__logo" alt="Logo" />
    <h6 className="header__title">Рады видеть !</h6>
  </>
);

export default Header;
