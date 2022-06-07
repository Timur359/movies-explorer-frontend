import React from "react";
import { NavLink } from "react-router-dom";

import "./HeaderMain.css";

import logo from "../../../images/logo.svg";

const HeaderNoLog = () => {
  return (
    <div className="header-main__header">
      <img src={logo} className="header-main__logo" alt="Logo" />
      <NavLink to="/signup" className="header-main__link">
        Регистрация
      </NavLink>
      <NavLink to="/signin" className="header-main__button">
        Войти
      </NavLink>
    </div>
  );
};

export default HeaderNoLog;
