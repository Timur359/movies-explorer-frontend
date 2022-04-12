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
        <span className="footer__text">&copy; {new Date().getFullYear()}</span>
      </li>
      <li className="footer__container">
        <button
          className="footer__text"
          href="https://practicum.yandex.ru/profile/web/"
        >
          Яндекс.Практикум
        </button>
      </li>
      <li className="footer__container">
        <a className="footer__text" href="https://github.com/Timur359">
          GitHub
        </a>
      </li>
      <li className="footer__container">
        <a className="footer__text" href="facebook.com">
          Facebook
        </a>
      </li>
    </ul>
  </div>
);

export default Footer;
