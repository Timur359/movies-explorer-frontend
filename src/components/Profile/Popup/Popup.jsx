import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

import "./Popup.css";

const Popup = ({ isOpen, changePopup, handleSubmitUser }) => {
  const [name, setName] = useState("");
  const [nameDirty, setNameDirty] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [formValid, setFormValid] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (
      nameError ||
      emailError ||
      (name === currentUser.name && email === currentUser.email)
    ) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [isOpen, name, email, nameError, emailError]);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitUser({
      name: name,
      email: email,
    });
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

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "name":
        setNameDirty(true);
        break;
      case "email":
        setEmailDirty(true);
        break;
    }
  };
  return (
    <div
      className={`popup ${isOpen ? "popup__open" : ""}`}
      onClick={changePopup}
    >
      <form className="popup__box" onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          className="popup__field"
          placeholder="Имя"
          name="name"
          onChange={(e) => nameHandler(e)}
          onBlur={(e) => blurHandler(e)}
          value={name}
        />
        <div className="popup__error">
          {nameError && nameDirty && (
            <span className="popup__error_text">{nameError}</span>
          )}
        </div>
        <input
          type="email"
          className="popup__field"
          placeholder="Email"
          name="email"
          onBlur={(e) => blurHandler(e)}
          onChange={(e) => emailHandler(e)}
          value={email}
        />
        <div className="popup__error">
          {emailError && emailDirty && (
            <span className="popup__error_text">{emailError}</span>
          )}
        </div>
        <button
          className={`popup__button ${
            !formValid ? "popup__button_novalid" : ""
          }`}
          onClick={handleSubmit}
          disabled={!formValid}
        >
          Редактировать
        </button>
      </form>
    </div>
  );
};

export default Popup;
