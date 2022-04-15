import React from "react";
import { Route, Routes } from "react-router-dom";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Auth from "../Auth/Auth";

import "./App.css";
import Register from "../Register/Register";
import Error from "../Error/Error";

const App = () => (
  <Routes>
    <Route path="/" element={<Main />} exact />
    <Route path="/movies" element={<Movies />} exact />
    <Route path="/saved-movies" element={<SavedMovies />} exact />
    <Route
      path="/sign-in"
      element={
        <Auth
          text={"Ещё не зарегистрированы ?"}
          textBtn={"Регистрация"}
          btnUrl={"/sign-up"}
          textAction={"Войти"}
        />
      }
      exact
    />
    <Route path="/sign-up" element={<Register name={"hello"} />} exact />
    <Route
      path="/profile"
      element={<Profile name={"Виталий"} email={"pochta@yandex.ru"} exact />}
    />
    <Route path="/error" element={<Error />} exact />
  </Routes>
);

export default App;
