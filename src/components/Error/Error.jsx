import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "./Error.css";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="error">
      <div className="error__box">
        <h1 className="error__title">404</h1>
        <p className="error__text">Страница не найдена</p>
        <button className="error__back" onClick={() => navigate(-1)}>
          Назад
        </button>
      </div>
    </div>
  );
};

export default Error;
