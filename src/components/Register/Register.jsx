import React, { useEffect, useState } from "react";

import Button from "../Auth/Button/Button";
import Header from "../Auth/Header/Header";

import "../Auth/Auth.css";
import "./Register.css";
import "../Auth/Input/Input.css";

const Register = ({ title, handleSubmitReg }) => {
  const [name, setName] = useState("");
  const [nameDirty, setNameDirty] = useState(false);
  const [nameError, setNameError] = useState("Имя не может быть пустым");
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
    if (emailError || passwordError || nameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [name, email, password, nameError, emailError, passwordError]);

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
    if (e.target.value.length < 8 || e.target.value.length > 15) {
      setPasswordError("Пароль должен быть меньше 8 и длиннее 15");
      if (!e.target.value) {
        setPasswordError("Пароль не может быть пустым");
      }
    } else {
      setPasswordError("");
    }
  };

  const nameHandler = (e) => {
    setName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 25) {
      setNameError("Имя не должно быть меньше 2 и длиннее 25");
      if (!e.target.value) {
        setNameError("Имя не может быть пустым");
      }
    } else {
      setNameError("");
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "name":
        setNameDirty(true);
        break;
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitReg(name, email, password);
  };

  return (
    <div className="register">
      <Header title={title} />
      <div className="input">
        <form>
          <div className="input__box">
            <div className="input__name">Имя</div>
            <input
              type="text"
              className="input__field"
              placeholder="Имя"
              name="name"
              onChange={(e) => nameHandler(e)}
              onBlur={(e) => blurHandler(e)}
              value={name}
              required
            />
            <div className="input__error">
              {nameError && nameDirty && (
                <span className="input__span">{nameError}</span>
              )}
            </div>
          </div>

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
            text={"Уже зарегестрированы ?"}
            textBtn={"Войти"}
            btnUrl={"/signin"}
            textAction={"Зарегестрироваться"}
            title={"Добро пожаловать !"}
            formValid={formValid}
            handleSubmit={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
