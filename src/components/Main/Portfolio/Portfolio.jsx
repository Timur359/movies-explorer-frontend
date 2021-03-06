import React from "react";

import "./Portfolio.css";

import url from "../../../images/text__COLOR_font-main.svg";

const Portfolio = () => (
  <div className="portfolio">
    <h5 className="portfolio__title">Портфолио</h5>
    <div className="portfolio__box-link">
      <a
        target="_blank"
        href="https://github.com/Timur359/dodo-pizza"
        className="portfolio__link"
        rel="noreferrer"
      >
        Статичный сайт
      </a>
      <img src={url} className="portfolio__pic" alt="Стрелка"></img>
    </div>
    <div className="portfolio__line"></div>
    <div className="portfolio__box-link">
      <a
        target="_blank"
        href="https://github.com/Timur359/Mesto_React"
        className="portfolio__link"
        rel="noreferrer"
      >
        Адаптивный сайт
      </a>
      <img src={url} className="portfolio__pic" alt="Стрелка"></img>
    </div>
    <div className="portfolio__line"></div>
    <div className="portfolio__box-link">
      <a
        target="_blank"
        href="https://github.com/Timur359/ToDo-TypeScript"
        className="portfolio__link"
        rel="noreferrer"
      >
        Одностраничное приложение
      </a>
      <img src={url} className="portfolio__pic" alt="Стрелка"></img>
    </div>
  </div>
);

export default Portfolio;
