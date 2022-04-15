import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";

const Button = ({ text, textBtn, btnUrl, textAction }) => (
  <div className="button">
    <button className="button__button">
      <p className="button__button_name">{textAction}</p>
    </button>
    <div className="button__button_info">
      <p className="button__button_text">{text}</p>
      <nav>
        <Link to={btnUrl} className="button__button_register">
          {textBtn}
        </Link>
      </nav>
    </div>
  </div>
);

export default Button;
