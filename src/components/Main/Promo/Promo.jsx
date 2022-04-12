import React from "react";
import { Link } from "react-router-dom";
import { Switch } from "react-router-dom";

import "./Promo.css";

import banner from "../../../images/banner.svg";
import logo from "../../../images/logo.svg";

const Promo = () => (
  <>
    <Switch>
      <div className="promo">
        <div className="promo__header">
          <img src={logo} className="promo__logo" alt="Logo" />
          <Link to="/sign-up" className="promo__link">
            Регистрация
          </Link>
          <Link to="/sign-in" className="promo__button">
            Войти
          </Link>
        </div>
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <img src={banner} className="promo__banner" alt="banner-img" />
      </div>
    </Switch>
  </>
);

export default Promo;
