import React from "react";
import { NavLink } from "react-router-dom";

import logo_acc from "../../../../images/acc-logo.svg";

import "./HeaderPopup.css";

export default function HeaderPopup({ isOpen, isClose }) {
  return (
    <>
      <div className={`header-popup ${isOpen ? "header-popup__open" : ""}`}>
        <button className="header-popup__close" onClick={isClose} />
        <nav className="header-popup__link-box">
          <NavLink
            to="/"
            activeclassname="active"
            className="header-popup__link"
          >
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className="header-popup__link"
            activeclassname="active"
          >
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies" className="header-popup__link">
            Сохраненные фильмы
          </NavLink>
          <div className="header-popup__acc">
            <img
              src={logo_acc}
              className="header-popup__acc_logo"
              alt="Иконка аккаунта"
            />
            <NavLink to="/profile" className="header-popup__acc_text">
              Аккаунт
            </NavLink>
          </div>
        </nav>
      </div>
    </>
  );
}
