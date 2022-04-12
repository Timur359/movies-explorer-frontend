import React from "react";
import { Link } from "react-router-dom";
import Header from "../Parts/Header/Header";

import "./Profile.css";

const Profile = ({ name, email }) => {
  return (
    <>
      <Header />
      <div className="profile">
        <div className="profile__box">
          <h1 className="profile__title">{`Привет, ${name} !`}</h1>
          <div className="profile__field">
            <p className="profile__field_text">Имя</p>
            <p className="profile__field_value">{name}</p>
          </div>
          <p className="profile__field_line"></p>
          <div className="profile__field">
            <p className="profile__field_text">E-mail</p>
            <p className="profile__field_value">{email}</p>
          </div>
          <Link to="edit-profile" className="profile__btn_edit">
            Редактировать
          </Link>
          <Link to="sign-in" className="profile__btn_exit">
            Выйти из аккаунта
          </Link>
        </div>
      </div>
    </>
  );
};

export default Profile;
