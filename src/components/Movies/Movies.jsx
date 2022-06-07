import React, { useState, useEffect } from "react";

import Header from "../Parts/Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import ButtonMore from "./ButtonMore/ButtonMore";
import Footer from "../Parts/Footer/Footer";
import "./Movies.css";

const Movies = ({
  handlePoliciesClick,
  movieStatusHandler,
  isMovieAdded,
  movies,
  isLoading,
  handleSelectCategory,
}) => {
  /*const [inputSearch, setInputSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(12);

  const [searchMovie, setSearchMovie] = useState(movies);

  const searchButton = () => {
    let searchMovie = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(inputSearch.toLowerCase());
    });
    setSearchMovie(searchMovie);
  };

  const lastMovieIndex = currentPage * countriesPerPage;

  const currentMovies = searchMovie.slice(0, lastMovieIndex);

  const nextPage = () => setCurrentPage((prev) => prev + 1);

  useEffect(() => {
    if (window.screen.width > 768) {
      setCountriesPerPage(12);
    } else if (window.screen.width <= 768 && window.screen.width > 400) {
      setCountriesPerPage(8);
      console.log("apappa");
    } else if (window.screen.width <= 400) {
      setCountriesPerPage(5);
    }
  }, [window.screen.width]);*/

  const [inputSearch, setInputSearch] = useState("");
  const [selectCategory, setSelectCategory] = useState(false);
  const [filteredMovies, setFilterMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(12);

  const [searchMovie, setSearchMovie] = useState(movies);

  const searchButton = () => {
    let searchMovie = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(inputSearch.toLowerCase());
    });
    setSearchMovie(searchMovie);
  };

  const lastMovieIndex = currentPage * countriesPerPage;

  const currentMovies = filteredMovies.slice(0, lastMovieIndex);

  const nextPage = () => setCurrentPage((prev) => prev + 1);

  useEffect(() => {
    if (window.screen.width > 768) {
      setCountriesPerPage(12);
    } else if (window.screen.width <= 768 && window.screen.width > 400) {
      setCountriesPerPage(8);
    } else if (window.screen.width <= 400) {
      setCountriesPerPage(5);
    }
  }, [window.screen.width]);

  const applyFilter = () => {
    let updateMovies = searchMovie;
    if (selectCategory) {
      updateMovies = updateMovies.filter((movie) => movie.duration < 20);
    }
    setFilterMovies(updateMovies);
  };

  useEffect(() => {
    applyFilter();
  }, [selectCategory, searchMovie]);

  const filterOn = () => {
    setSelectCategory(!selectCategory);
  };

  return (
    <div className="movies">
      <Header setSelectCategory={setSelectCategory} />
      <SearchForm
        value={inputSearch}
        changeInput={(e) => setInputSearch(e.target.value)}
        handleSelectCategory={filterOn}
        searchButton={searchButton}
      />
      <MoviesCardList
        movies={currentMovies}
        handlePoliciesClick={handlePoliciesClick}
        isLoading={isLoading}
        movieStatusHandler={movieStatusHandler}
        isMovieAdded={isMovieAdded}
      />
      {filteredMovies.length > currentMovies.length && (
        <ButtonMore nextPage={nextPage} />
      )}
      <Footer />
    </div>
  );
};

export default Movies;
