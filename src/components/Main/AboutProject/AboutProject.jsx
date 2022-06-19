import React from "react";

import "./AboutProject.css";

const AboutProject = () => (
  <div className="about-project">
    <h2 className="about-project__title">О проекте</h2>
    <div className="about-project__line"></div>
    <div className="about-project__container">
      <div className="about-project__box">
        <h2 className="about-project__paragraph">
          Дипломный проект включал 5 этапов
        </h2>
        <p className="about-project__text">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
      </div>
      <div className="about-project__box">
        <h2 className="about-project__paragraph">
          На выполнение диплома ушло 5 недель
        </h2>
        <p className="about-project__text">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>
    </div>
    <div className="about-project__box_graph">
      <div className="about-project__made">
        <p className="about-project__made_text">1 неделя</p>
        <p className="about-project__info">Back-end</p>
      </div>
      <div className="about-project__work">
        <p className="about-project__work_text">4 недели</p>
        <p className="about-project__info">Front-end</p>
      </div>
    </div>
  </div>
);

export default AboutProject;
