import React from "react";
import { NavLink } from "react-router-dom";

import "./Button.css";

const Button = ({
  text,
  textBtn,
  btnUrl,
  textAction,
  formValid,
  handleSubmit,
}) => {
  return (
    <div className="button">
      <button
        disabled={!formValid}
        onClick={handleSubmit}
        className="button__button"
      >
        <p className="button__button_name">{textAction}</p>
      </button>
      <div className="button__button_info">
        <p className="button__button_text">{text}</p>
        <nav>
          <NavLink to={btnUrl} className="button__button_register">
            {textBtn}
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Button;
