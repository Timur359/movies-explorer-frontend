import React from "react";
import { Link } from "react-router-dom";

import "./Error.css";

const Error = () => {
  return (
    <div className="error">
      <div className="error__box">
        <h1 className="error__title">404</h1>
        <p className="error__text">Страница не найдена</p>
        <Link to="" className="error__back">
          Назад
        </Link>
      </div>
    </div>
  );
};

export default Error;
