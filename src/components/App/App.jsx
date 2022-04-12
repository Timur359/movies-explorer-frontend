import React from "react";
import { Route, Redirect, useHistory, Switch } from "react-router-dom";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Auth from "../Auth/Auth";

import "./App.css";
import Register from "../Register/Register";
import Error from "../Error/Error";

const App = () => (
  <Switch>
    <div className="app">
      <Route exact path="/">
        <Main />
      </Route>
      <Route path="/movies">
        <Movies />
      </Route>
      <Route path="/saved-movies">
        <SavedMovies />
      </Route>
      <Route path="/sign-in">
        <Auth
          text={"Ещё не зарегистрированы ?"}
          textBtn={"Регистрация"}
          btnUrl={"sign-up"}
          textAction={"Войти"}
        />
      </Route>
      <Route path="/sign-up">
        <Register name={"hello"} />
      </Route>
      <Route path="/profile">
        <Profile name={"Виталий"} email={"pochta@yandex.ru"} />
      </Route>
      <Route path="/error">
        <Error />
      </Route>
    </div>
  </Switch>
);

export default App;
