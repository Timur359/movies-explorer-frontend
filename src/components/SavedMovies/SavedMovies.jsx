import React, { useEffect, useState } from "react";

import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Parts/Footer/Footer";
import Header from "../Parts/Header/Header";
import ButtonMore from "../Movies/ButtonMore/ButtonMore";

import "./SavedMovies.css";
import "./MoviesCard/MoviesCard.css";

const SavedMovies = ({
  handlePoliciesClick,
  savedMovies,
  deleteMovie,
  isMovieAdded,
  movieStatusHandler,
  handleSelectCategory,
  isLoading,
}) => {
  const [inputSearch, setInputSearch] = useState("");
  const [selectCategory, setSelectCategory] = useState(false);
  const [filteredMovies, setFilterMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(12);

  const [searchMovie, setSearchMovie] = useState(savedMovies);

  const searchButton = () => {
    let searchMovie = savedMovies.filter((movie) => {
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
    <div className="saved-movies">
      <Header handleSelectCategory={handleSelectCategory} />
      <SearchForm
        value={inputSearch}
        changeInput={(e) => setInputSearch(e.target.value)}
        handleSelectCategory={filterOn}
        searchButton={searchButton}
      />
      <MoviesCardList
        handlePoliciesClick={handlePoliciesClick}
        savedMovies={currentMovies}
        deleteMovie={deleteMovie}
        isMovieAdded={isMovieAdded}
        movieStatusHandler={movieStatusHandler}
        isLoading={isLoading}
      />
      {filteredMovies.length < currentMovies.length && (
        <ButtonMore nextPage={nextPage} />
      )}
      <Footer />
    </div>
  );
};

export default SavedMovies;
