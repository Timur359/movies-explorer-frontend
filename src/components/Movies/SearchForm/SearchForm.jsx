import React from "react";

import "./SearchForm.css";
import "../../Parts/Header/Header.css";

import icon from "../../../images/icon.svg";

const SearchForm = ({
  value,
  changeInput,
  searchButton,
  handleSelectCategory,
}) => (
  <div className="search-form">
    <div className="search-form__filter">
      <img src={icon} alt="Поиск" className="search-form__icon" />
      <input
        className="search-form__input"
        placeholder="Фильм"
        type="text"
        value={value}
        onChange={changeInput}
        required
      />
      <div className="search-form__button-form">
        <button onClick={searchButton} className="search-form__button">
          Найти
        </button>
      </div>
      <div className="search-form__line"></div>
      <div className="search-form__box">
        <div className="search-form-checkbox">
          <input
            className="search-form-checkbox__switcher"
            type="checkbox"
            onClick={handleSelectCategory}
          />
        </div>
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
