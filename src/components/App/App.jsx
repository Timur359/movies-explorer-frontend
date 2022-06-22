import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
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
  const [currentUser, setCurrentUser] = React.useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectCategory, setSelectCategory] = useState(false);
  const [filterMovie, setFilterMovie] = useState([]);
  const [filterSavedMovies, setFilterSavedMovies] = useState([]);

  const [searchError, setSearchError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentUser = () => {
    const token = localStorage.getItem("token");
    MainApi.getUserData(token).then((data) => {
      if (data) {
        setCurrentUser(data);
        localStorage.setItem("currentUser", JSON.stringify(data));
      }
    });
  };

  useEffect(() => {
    const path = location.pathname;
    const token = localStorage.getItem("token");
    if (token) {
      checkToken(token)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            getCurrentUser(res);
            navigate(path);
          }
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("token");
          navigate("/");
        });
    }
  }, []);

  const getAllMoviesData = () => {
    getAllMovies()
      .then((data) => {
        localStorage.setItem("allMovies", JSON.stringify(data));
        setAllMovies(data);
        setIsLoading(true);
        localStorage.setItem(
          "searchMovies",
          JSON.stringify(JSON.parse(localStorage.getItem("allMovies")))
        );
      })
      .catch((err) => {
        localStorage.removeItem("allMovies");
        console.error(err.message);
      });
  };

  const getSavedMovies = () => {
    MainApi.getSavedMovies()
      .then((data) => {
        const savedMovie = data.map((item) => ({ ...item, id: item.movieId }));
        localStorage.setItem("savedMovies", JSON.stringify(savedMovie));
        setSavedMovies(savedMovie);
        setFilterSavedMovies(savedMovie);
      })
      .catch(() => {
        localStorage.removeItem("savedMovies");
      });
  };

  const onLogin = (email, password) => {
    authorize({ email, password })
      .then((data) => {
        if (data) {
          setIsLoggedIn(true);
          localStorage.setItem("token", data.token);
          getCurrentUser();
          navigate("/movies");
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const onRegister = (name, email, password) => {
    register({ name, email, password })
      .then((data) => {
        if (data) {
          onLogin(email, password);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const handleUpdateUser = (data) => {
    MainApi.saveUserChanges(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  useEffect(() => {
    const allMovies = JSON.parse(localStorage.getItem("allMovies"));
    if (allMovies) {
      setAllMovies(allMovies);
    } else {
      getAllMoviesData();
    }

    const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    if (savedMovies) {
      setSavedMovies(savedMovies);
    } else {
      getSavedMovies();
    }
  }, []);

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setCurrentUser({});

    localStorage.removeItem("allMovies");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("searchTextMovies");
    localStorage.removeItem("searchTextSavedMovies");
    setSavedMovies([]);
    setFilterMovie([]);

    navigate("/signin");
  };

  useEffect(() => {
    if (isLoggedIn) {
      getAllMoviesData();
      getSavedMovies();
      localStorage.setItem(
        "searchSavedMovies",
        JSON.stringify(JSON.parse(localStorage.getItem("searchMovies")))
      );
    }
  }, [isLoggedIn]);

  const applyFilter = () => {
    setFilterMovie(allMovies);
    setFilterSavedMovies(savedMovies);
  };

  useEffect(() => {
    applyFilter();
  }, [selectCategory, isLoggedIn]);

  const addMovie = (movie) => {
    MainApi.addMovie(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, { ...res, id: res.movieId }]);
        setFilterSavedMovies([...savedMovies, { ...res, id: res.movieId }]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteMovie = (movie) => {
    const movieId = savedMovies.find((item) => item.id === movie.id)._id;
    MainApi.deleteMovie(movieId)
      .then((res) => {
        const newArray = savedMovies.filter(
          (item) => item.movieId !== res.movieId
        );
        setSavedMovies(newArray);
        setFilterSavedMovies(newArray);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const isMovieAdded = (movie) =>
    savedMovies.some((item) => item.id === movie.id);

  const movieStatusHandler = (movie, isAdded) => {
    isAdded ? addMovie(movie) : deleteMovie(movie);
  };

  const handleSelectCategory = () => {
    setSelectCategory(!selectCategory);
  };

  const changePopup = () => {
    setIsOpen(!isOpen);
  };

  const searchFilter = (data, searchQuery) => {
    if (searchQuery) {
      const regex = new RegExp(searchQuery, "gi");
      const filterData = data.filter(
        (item) => regex.test(item.nameRU) || regex.test(item.nameEN)
      );
      if (filterData.length === 0) {
        setSearchError("Ничего не найдено");
      } else {
        setSearchError("");
      }
      return filterData;
    }
    return [];
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} exact />
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route
            path="/movies"
            element={
              <Movies
                movies={allMovies}
                isLoading={isLoading}
                isMovieAdded={isMovieAdded}
                movieStatusHandler={movieStatusHandler}
                handleSelectCategory={handleSelectCategory}
                setSelectCategory={setSelectCategory}
                searchError={searchError}
                setFilterMovie={setFilterMovie}
                searchFilter={searchFilter}
                setIsLoading={setIsLoading}
                filterMovie={filterMovie}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <SavedMovies
                savedMovies={savedMovies}
                deleteMovie={deleteMovie}
                setSelectCategory={setSelectCategory}
                isLoading={isLoading}
                getSavedMovies={getSavedMovies}
                searchError={searchError}
                setFilterSavedMovies={setFilterSavedMovies}
                searchFilter={searchFilter}
                setIsLoading={setIsLoading}
                filterSavedMovies={filterSavedMovies}
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
          element={
            isLoggedIn ? (
              <Navigate to="/movies" replace />
            ) : (
              <Auth title={"Рады видеть !"} setAuthInfo={onLogin} />
            )
          }
          exact
        />
        <Route
          path="/signup"
          element={
            isLoggedIn ? (
              <Navigate to="/movies" replace />
            ) : (
              <Register
                title={"Добро пожаловать !"}
                handleSubmitReg={onRegister}
              />
            )
          }
          exact
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
};

export default App;
