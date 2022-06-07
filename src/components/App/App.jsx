import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Auth from "../Auth/Auth";
import Register from "../Register/Register";
import Error from "../Error/Error";

import "./App.css";
import { authorize, checkToken, register } from "../../utils/Api";
import { MainApi } from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute";
import getAllMovies from "../../utils/MoviesApi";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = React.useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectCategory, setSelectCategory] = useState(false);
  const [filterMovie, setFilterMovie] = useState([]);

  const navigate = useNavigate();

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }
    checkToken(jwt)
      .then((res) => {
        setCurrentUser(res);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onRegister = (name, email, password) => {
    return register({ name, email, password })
      .then((res) => {
        navigate("./signin");
        return res;
      })
      .catch((err) => console.log(err));
  };

  const onLogin = (email, password) => {
    return authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.message || "Ошибка, введены неверные данные!");
      });
  };

  const getAllMoviesData = () => {
    getAllMovies()
      .then((data) => {
        const allMoviesData = data.map((movie) => {
          setIsLoading(true);
          return movie;
        });
        localStorage.setItem("allMovies", JSON.stringify(allMoviesData));
        setAllMovies(allMoviesData);
      })
      .catch((err) => {
        localStorage.removeItem("allMovies");
        console.log(err);
      });
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/signin");
  };

  const handleUpdateUser = (data) => {
    MainApi.saveUserChanges(data)
      .then((res) => {
        setCurrentUser({ name: data.name, email: data.email });
        changePopup();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePoliciesClick = (movie) => {
    window.open(movie.trailerLink, "_blank");
  };

  const addMovie = (movie) => {
    MainApi.addMovie(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, { ...res, id: res.movieId }]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changePopup = () => {
    setIsOpen(!isOpen);
  };

  const getSavedMovies = () => {
    MainApi.getSavedMovies()
      .then((data) => {
        const savedArray = data.map((item) => ({
          ...item,
          id: item.movieId,
        }));
        localStorage.setItem("savedMovies", JSON.stringify(savedArray));
        setIsLoading(true);
        setSavedMovies(savedArray);
      })
      .catch((err) => {
        localStorage.removeItem("savedMovies");
        console.log(err);
      });
  };

  const deleteMovie = (movie) => {
    const movieId = savedMovies.find((item) => item.id === movie.id)._id;
    MainApi.deleteMovie(movieId)
      .then((res) => {
        if (res) {
          const newArray = savedMovies.filter(
            (item) => item.movieId !== movie.movieId
          );
          setSavedMovies(newArray);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /*const deleteMovie = (movie) => {
    console.log(movie);
    MainApi.deleteMovie(movie._id).then((res) => getSavedMovies());
  };*/

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      tokenCheck();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (isLoggedIn) {
      navigate("/movies");
      MainApi.setToken(token);
      MainApi.getUserData().then((res) => setCurrentUser(res));
      getAllMoviesData();
      getSavedMovies();
    }
  }, [isLoggedIn]);

  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, []);

  useEffect(() => {
    const allMoviesArr = JSON.parse(localStorage.getItem("allMovies"));
    if (allMoviesArr) {
      setAllMovies(allMoviesArr);
    } else {
      getAllMoviesData();
    }

    const saved = JSON.parse(localStorage.getItem("savedMovies"));
    if (saved) {
      setSavedMovies(saved);
    } else {
      getSavedMovies();
    }
  }, []);

  const isMovieAdded = (movie) =>
    savedMovies.some((item) => item.id === movie.id);

  const movieStatusHandler = (movie, isAdded) => {
    isAdded ? addMovie(movie) : deleteMovie(movie);
  };

  const handleSelectCategory = () => {
    setSelectCategory(!selectCategory);
  };

  const applyFilter = () => {
    let updateMovie = allMovies;
    if (selectCategory) {
      updateMovie = updateMovie.filter((movie) => movie.duration < 20);
    }

    setFilterMovie(updateMovie);
  };

  useEffect(() => {
    applyFilter();
  }, [selectCategory, isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} exact />
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route
            path="/movies"
            element={
              <Movies
                handlePoliciesClick={handlePoliciesClick}
                movies={filterMovie}
                isLoading={isLoading}
                isMovieAdded={isMovieAdded}
                movieStatusHandler={movieStatusHandler}
                handleSelectCategory={handleSelectCategory}
                setSelectCategory={setSelectCategory}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <SavedMovies
                handlePoliciesClick={handlePoliciesClick}
                savedMovies={savedMovies}
                deleteMovie={deleteMovie}
                setSelectCategory={setSelectCategory}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                getSavedMovies={getSavedMovies}
                movies={allMovies}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                onLogout={onLogout}
                handleSubmitUser={handleUpdateUser}
                isOpen={isOpen}
                changePopup={changePopup}
                setIsOpen={setIsOpen}
                exact
              />
            }
          />
        </Route>
        <Route
          path="/signin"
          element={<Auth title={"Рады видеть !"} setAuthInfo={onLogin} />}
          exact
        />
        <Route
          path="/signup"
          element={
            <Register
              title={"Добро пожаловать !"}
              handleSubmitReg={onRegister}
            />
          }
          exact
        />

        <Route path="/error" element={<Error />} exact />
      </Routes>
    </CurrentUserContext.Provider>
  );
};

export default App;
