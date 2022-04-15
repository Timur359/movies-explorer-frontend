import React from "react";

import "./Footer.css";

const Footer = () => (
  <div className="footer">
    <h6 className="footer__title">
      Учебный проект Яндекс.Практикум х BeatFilm.
    </h6>
    <div className="footer__line"></div>
    <ul className="footer__box">
      <li className="footer__container">
        <span className="footer__text" id="color">
          &copy; {new Date().getFullYear()}
        </span>
      </li>
      <li className="footer__container">
        <a
          target="_blank"
          className="footer__text"
          href="https://practicum.yandex.ru/profile/web/"
          rel="noreferrer"
        >
          Яндекс.Практикум
        </a>
      </li>
      <li className="footer__container">
        <a
          target="_blank"
          className="footer__text"
          href="https://github.com/Timur359"
          rel="noreferrer"
        >
          GitHub
        </a>
      </li>
      <li className="footer__container">
        <a
          target="_blank"
          className="footer__text"
          href="facebook.com"
          rel="noreferrer"
        >
          Facebook
        </a>
      </li>
    </ul>
  </div>
);

export default Footer;
