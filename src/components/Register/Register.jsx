import React from "react";

import Auth from "../Auth/Auth";

import "../Auth/Auth.css";

const Register = () => {
  return (
    <Auth
      text={"Уже зарегестрированы ?"}
      textBtn={"Войти"}
      btnUrl={"/sign-in"}
      textAction={"Зарегестрироваться"}
      children={
        <>
          <div className="input__name">Имя</div>
          <input type="text" className="input__field" placeholder="Имя" />
          <div className="input__line"></div>
        </>
      }
    />
  );
};

export default Register;
