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

  const getAllMoviesData = () => {
    getAllMovies()
      .then((data) => {
        localStorage.setItem("allMovies", JSON.stringify(data));
        setAllMovies(data);
        setIsLoading(true);
      })
      .catch((err) => {
        localStorage.removeItem("allMovies");
        console.error(err.message);
      });
  };

  const getSavedMovies = () => {
    MainApi.getSavedMovies()
      .then((data) => {
        const savedMovies = data.map((item) => ({ ...item, id: item.movieId }));
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
        setSavedMovies(savedMovies);
      })
      .catch(() => {
        localStorage.removeItem("savedMovies");
      });
  };

  const handleUpdateUser = (data) => {
    MainApi.saveUserChanges(data)
      .then((res) => {
        setCurrentUser(res);
        setIsOpen(!isOpen);
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
    setSavedMovies([]);
    setFilterMovie([]);

    navigate("/signin");
  };

  useEffect(() => {
    if (isLoggedIn) {
      getAllMoviesData();
      getSavedMovies();
      localStorage.setItem("checkbox_movies", JSON.stringify(selectCategory));
      localStorage.setItem("checkbox_saved", JSON.stringify(selectCategory));
    }
  }, [isLoggedIn]);

  const applyFilter = () => {
    let updateMovie = allMovies;
    if (selectCategory) {
      updateMovie = updateMovie.filter((movie) => movie.duration < 20);
    }
    setFilterMovie(updateMovie);
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

  const [query, setQuery] = React.useState("");

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
        setFilterMovie(filterData);
      }
      return filterData;
    }
    return [];
  };

  const searchHandler = (searchQuery) => {
    setIsLoading(false);
    setTimeout(() => {
      setQuery(searchQuery);
      setFilterMovie(searchFilter(allMovies, searchQuery));
      setIsLoading(true);
    }, 600);
  };

  const searchHandlerSaved = (searchQuery) => {
    setIsLoading(false);
    setTimeout(() => {
      setQuery(searchQuery);
      setFilterSavedMovies(searchFilter(savedMovies, searchQuery));
      setIsLoading(true);
    }, 600);
  };

  console.log(filterSavedMovies);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} exact />
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route
            path="/movies"
            element={
              <Movies
                movies={filterMovie}
                isLoading={isLoading}
                isMovieAdded={isMovieAdded}
                movieStatusHandler={movieStatusHandler}
                handleSelectCategory={handleSelectCategory}
                setSelectCategory={setSelectCategory}
                onSubmitSearch={searchHandler}
                searchError={searchError}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <SavedMovies
                savedMovies={filterSavedMovies}
                deleteMovie={deleteMovie}
                setSelectCategory={setSelectCategory}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                getSavedMovies={getSavedMovies}
                movies={allMovies}
                onSubmitSearch={searchHandlerSaved}
                searchError={searchError}
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

        <Route path="*" element={<Error />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
};

export default App;
