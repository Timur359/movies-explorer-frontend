import React from "react";

import "./Input.css";

const Input = ({ children }) => (
  <div className="input">
    {children}
    <div className="input__box">
      <div className="input__name">Email</div>
      <input
        type="text"
        className="input__field"
        placeholder="Email"
        required
      />
    </div>
    <div className="input__box">
      <div className="input__name">Пароль</div>
      <input
        type="text"
        className="input__field"
        placeholder="Пароль"
        required
      />
    </div>
  </div>
);

export default Input;
