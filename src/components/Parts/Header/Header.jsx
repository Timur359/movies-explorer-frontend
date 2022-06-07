import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";

import logo from "../../../images/logo.svg";
import logo_acc from "../../../images/acc-logo.svg";
import HeaderPopup from "./HeaderPopup/HeaderPopup";

const Header = ({ active, handleSelectCategory, setSelectCategory }) => {
  const [isHeaderPopup, setIsHeaderPopup] = useState(false);

  const openHaederPopup = () => {
    setIsHeaderPopup(!isHeaderPopup);
  };

  return (
    <>
      <div className={`header ${active ? "active-main" : "active-movies"}`}>
        <NavLink to="/">
          <img src={logo} className="header__log" alt="Logo" />
        </NavLink>
        <div className="header__link-container">
          <NavLink
            to="/movies"
            activeclassname="active"
            className="header__link"
            onClick={handleSelectCategory}
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            activeclassname="active"
            className="header__link"
            onClick={() => setSelectCategory(false)}
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
        <button
          className={`header__eche ${active ? "header__eche_main" : ""}`}
          onClick={openHaederPopup}
        />
        <HeaderPopup isOpen={isHeaderPopup} isClose={openHaederPopup} />
      </div>
    </>
  );
};

export default Header;
