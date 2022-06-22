import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

import "./Header.css";

import logo from "../../../images/logo.svg";
import logo_acc from "../../../images/acc-logo.svg";
import HeaderPopup from "./HeaderPopup/HeaderPopup";

const Header = ({ active }) => {
  const [isHeaderPopup, setIsHeaderPopup] = useState(false);

  const openHeaderPopup = () => {
    setIsHeaderPopup(!isHeaderPopup);
  };

  return (
    <>
      <div className={`header ${active ? "active-main" : "active-movies"}`}>
        <Link to="/">
          <img src={logo} className="header__log" alt="Logo" />
        </Link>
        <div className="header__link-container">
          <NavLink
            to="/movies"
            activeclassname="active"
            className="header__link"
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            activeclassname="active"
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
          <Link to="/profile" className="header__acc_text">
            Аккаунт
          </Link>
        </div>
        <button
          className={`header__eche ${active ? "header__eche_main" : ""}`}
          onClick={openHeaderPopup}
        />
        <HeaderPopup isOpen={isHeaderPopup} isClose={openHeaderPopup} />
      </div>
    </>
  );
};

export default Header;
