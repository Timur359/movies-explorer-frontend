import React from "react";
import Button from "./Button/Button";
import Header from "./Header/Header";
import Input from "./Input/Input";

import "./Auth.css";

const Auth = ({ children, text, textBtn, btnUrl, textAction }) => (
  <div className="auth">
    <Header />
    <Input children={children} />
    <Button
      text={text}
      textBtn={textBtn}
      btnUrl={btnUrl}
      textAction={textAction}
    />
  </div>
);

export default Auth;
