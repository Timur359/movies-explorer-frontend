import React, { useState } from "react";

import "./SearchForm.css";
import "../../Parts/Header/Header.css";

import icon from "../../../images/icon.svg";

const SearchForm = ({
  value,
  handleSelectCategory,
  onSearch,
  searchText,
  setSearchText,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchText) {
      console.log("Нужно ввести ключевое слово");
      setTimeout(() => {
        console.log("");
      }, 2000);
    } else {
      onSearch(searchText);
    }
  };

  return (
    <div className="search-form">
      <div className="search-form__filter">
        <img src={icon} alt="Поиск" className="search-form__icon" />
        <input
          className="search-form__input"
          placeholder="Фильм"
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
        />
        <div className="search-form__button-form">
          <button onClick={handleSubmit} className="search-form__button">
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
              onChange={(e) => handleSelectCategory(e)}
              checked={value}
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
};

export default SearchForm;
