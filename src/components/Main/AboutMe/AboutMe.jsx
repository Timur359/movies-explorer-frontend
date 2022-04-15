import React from "react";

import "./AboutMe.css";
import "../Portfolio/Portfolio.css";
import Portfolio from "../Portfolio/Portfolio";

const AboutMe = () => (
  <div className="about-me">
    <h4 className="about-me__title">Студент</h4>
    <div className="about-me__line"></div>
    <div className="about-me__container-info">
      <div className="about-me__container-info_text">
        <h5 className="about-me__title_name">Тимур</h5>
        <p className="about-me__paragraph">
          Фронтенд-разработчик, {new Date().getFullYear() - 1996}
        </p>
        <p className="about-me__text">
          Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня
          есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
          Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
          После того, как прошёл курс по веб-разработке, начал заниматься
          фриланс-заказами и ушёл с постоянной работы.
        </p>
      </div>
      <div className="about-me__image"></div>
    </div>
    <div className="about-me__container-link">
      <a
        target="_blank"
        href="https://www.facebook.com/"
        className="about-me__link"
        rel="noreferrer"
      >
        Facebook
      </a>
      <a
        target="_blank"
        href="https://github.com/Timur359"
        className="about-me__link"
        rel="noreferrer"
      >
        GitHub
      </a>
    </div>
    <Portfolio />
  </div>
);

export default AboutMe;
