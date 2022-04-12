import React from "react";

import "./Input.css";

const Input = ({ children }) => (
  <div className="input">
    {children}
    <div className="input__name">Email</div>
    <input type="text" className="input__field" placeholder="Email" />
    <div className="input__line"></div>
    <div className="input__name">Пароль</div>
    <input type="text" className="input__field" placeholder="Пароль" />
    <div className="input__line"></div>
  </div>
);

export default Input;
