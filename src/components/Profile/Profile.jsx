import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Parts/Header/Header";
import Popup from "./Popup/Popup";

import "./Profile.css";

const Profile = ({
  onLogout,
  handleSubmitUser,
  isOpen,
  changePopup,
  setIsOpen,
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <Header />
      <div className="profile">
        <div className="profile__box">
          <h1 className="profile__title">{`Привет, ${currentUser.name} !`}</h1>
          <div className="profile__field">
            <p className="profile__field_text">Имя</p>
            <p className="profile__field_value">{currentUser.name}</p>
          </div>
          <p className="profile__field_line"></p>
          <div className="profile__field">
            <p className="profile__field_text">E-mail</p>
            <p className="profile__field_value">{currentUser.email}</p>
          </div>
          <NavLink
            to=""
            className="profile__btn_edit"
            onClick={() => setIsOpen(!isOpen)}
          >
            Редактировать
          </NavLink>
          <NavLink
            to="/signin"
            className="profile__btn_exit"
            onClick={onLogout}
          >
            Выйти из аккаунта
          </NavLink>
        </div>
      </div>
      <Popup
        isOpen={isOpen}
        changePopup={changePopup}
        handleSubmitUser={handleSubmitUser}
      />
    </>
  );
};

export default Profile;
