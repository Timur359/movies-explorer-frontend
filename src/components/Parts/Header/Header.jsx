import React from "react";
import { Switch } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Header.css";

import logo from "../../../images/logo.svg";
import logo_acc from "../../../images/acc-logo.svg";

const Header = () => (
  <Switch>
    <div className="header">
      <img src={logo} className="header__log" alt="Logo" />
      <div className="header__link-container">
        <Link to="movies" className="header__link">
          Фильмы
        </Link>
        <Link to="saved-movies" className="header__link">
          Сохраненные фильмы
        </Link>
      </div>
      <div className="header__acc">
        <img
          src={logo_acc}
          className="header__acc_logo"
          alt="Иконка аккаунта"
        />
        <Link to="profile" className="header__acc_text">
          Аккаунт
        </Link>
      </div>
    </div>
  </Switch>
);

export default Header;
