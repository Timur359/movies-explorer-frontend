import React from "react";
import Header from "./Header/Header";
import Input from "./Input/Input";

import "./Auth.css";

const Auth = ({ children, title, setAuthInfo }) => {
  return (
    <div className="auth">
      <Header title={title} />
      <Input
        children={children}
        text={"Ещё не зарегистрированы ?"}
        textBtn={"Регистрация"}
        btnUrl={"/signup"}
        textAction={"Войти"}
        setAuthInfo={setAuthInfo}
      />
    </div>
  );
};

export default Auth;
