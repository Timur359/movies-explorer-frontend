import React, { useContext, useEffect, useState } from "react";
import Button from "../Button/Button";

import "./Input.css";

const Input = ({
  children,
  text,
  textBtn,
  btnUrl,
  textAction,
  setAuthInfo,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("Email не может быть пустым");
  const [passwordError, setPasswordError] = useState(
    "Пароль не может быть пустым"
  );
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [email, password, emailError, passwordError]);

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Некорректный email");
    } else {
      setEmailError("");
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 15) {
      setPasswordError("Пароль должен быть меньше 3 и длиннее 15");
      if (!e.target.value) {
        setPasswordError("Пароль не может быть пустым");
      }
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    setAuthInfo(email, password);
  };

  return (
    <div className="input">
      <form>
        {children}
        <div className="input__box">
          <div className="input__name">Email</div>
          <input
            type="email"
            className="input__field"
            placeholder="Email"
            name="email"
            onBlur={(e) => blurHandler(e)}
            onChange={(e) => emailHandler(e)}
            value={email}
            required
          />
          <div className="input__error">
            {emailError && emailDirty && (
              <span className="input__span">{emailError}</span>
            )}
          </div>
        </div>
        <div className="input__box">
          <div className="input__name">Пароль</div>
          <input
            type="password"
            className="input__field"
            placeholder="Пароль"
            name="password"
            onChange={(e) => passwordHandler(e)}
            onBlur={(e) => blurHandler(e)}
            value={password}
            required
          />
          <div className="input__error">
            {passwordError && passwordDirty && (
              <span className="input__span">{passwordError}</span>
            )}
          </div>
        </div>
        <Button
          text={text}
          textBtn={textBtn}
          btnUrl={btnUrl}
          textAction={textAction}
          formValid={formValid}
          handleSubmit={handleSubmit}
        />
      </form>
    </div>
  );
};

export default Input;
