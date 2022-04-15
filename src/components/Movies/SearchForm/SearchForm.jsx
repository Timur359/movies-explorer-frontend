import React from "react";

import "./SearchForm.css";
import "../../Parts/Header/Header.css";

import icon from "../../../images/icon.svg";

const SearchForm = () => (
  <div className="search-form">
    <div className="search-form__filter">
      <img src={icon} alt="Поиск" className="search-form__icon" />
      <input className="search-form__input" placeholder="Фильм" type="text" />
      <div className="search-form__button-form">
        <button className="search-form__button">Найти</button>
      </div>
      <div className="search-form__line"></div>
      <div className="search-form__box">
        <label className="search-form__switch">
          <input type="checkbox" />
          <span className="search-form__slide round"></span>
        </label>
        <br></br>
        <p className="header__paragraph-main search-form__paragraph">
          Короткометражки
        </p>
      </div>
    </div>
    <div className="search-form__line-end"></div>
  </div>
);

export default SearchForm;
