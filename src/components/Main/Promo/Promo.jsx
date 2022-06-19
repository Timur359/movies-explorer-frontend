import React from "react";

import "./Promo.css";

import banner from "../../../images/banner.svg";

const Promo = () => (
  <div className="promo">
    <h1 className="promo__title">
      Учебный проект студента факультета Веб-разработки.
    </h1>
    <img src={banner} className="promo__banner" alt="banner-img" />
  </div>
);

export default Promo;
