import React from "react";
import "./Techs.css";

const Techs = () => (
  <div className="techs">
    <h2 className="techs__title">Технологии</h2>
    <div className="techs__line"></div>
    <div className="techs__container">
      <h3 className="techs__paragraph">7 технологий</h3>
      <p className="techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="techs__box">
        {" "}
        <li className="techs__box_container">
          <p className="techs__box_container_text">HTML</p>
        </li>
        <li className="techs__box_container">
          <p className="techs__box_container_text">CSS</p>
        </li>
        <li className="techs__box_container">
          <p className="techs__box_container_text">JS</p>
        </li>
        <li className="techs__box_container">
          <p className="techs__box_container_text">React</p>
        </li>
        <li className="techs__box_container">
          <p className="techs__box_container_text">Git</p>
        </li>
        <li className="techs__box_container">
          <p className="techs__box_container_text">Express.js</p>
        </li>
        <li className="techs__box_container">
          <p className="techs__box_container_text">MongoDB</p>
        </li>
      </ul>
    </div>
  </div>
);

export default Techs;
