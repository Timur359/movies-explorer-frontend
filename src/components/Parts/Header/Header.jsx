import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";

import logo from "../../../images/logo.svg";
import logo_acc from "../../../images/acc-logo.svg";
import HeaderPopup from "./HeaderPopup/HeaderPopup";

const Header = () => {
  const [isHeaderPopup, setIsHeaderPopup] = useState(false);

  const openHaederPopup = () => {
    setIsHeaderPopup(!isHeaderPopup);
  };

  return (
    <>
      <div className="header">
        <img src={logo} className="header__log" alt="Logo" />
        <div className="header__link-container">
          <NavLink
            to="/movies"
            activeClassName="active"
            className="header__link"
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            activeClassName="active"
            className="header__link"
          >
            Сохраненные фильмы
          </NavLink>
        </div>
        <div className="header__acc">
          <img
            src={logo_acc}
            className="header__acc_logo"
            alt="Иконка аккаунта"
          />
          <NavLink to="/profile" className="header__acc_text">
            Аккаунт
          </NavLink>
        </div>
        <button className="header__eche" onClick={openHaederPopup} />
        <HeaderPopup isOpen={isHeaderPopup} isClose={openHaederPopup} />
      </div>
    </>
  );
};

export default Header;
