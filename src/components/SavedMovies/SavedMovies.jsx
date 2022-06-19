import React, { useEffect, useState } from "react";

import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Parts/Footer/Footer";
import Header from "../Parts/Header/Header";
import ButtonMore from "../Movies/ButtonMore/ButtonMore";

import "./SavedMovies.css";
import "./MoviesCard/MoviesCard.css";

const SavedMovies = ({
  savedMovies,
  deleteMovie,
  isMovieAdded,
  movieStatusHandler,
  handleSelectCategory,
  isLoading,
  onSubmitSearch,
  searchError,
}) => {
  const [inputSearch, setInputSearch] = useState("");
  const [selectCategory, setSelectCategory] = useState(
    JSON.parse(localStorage.getItem("checkbox_saved"))
  );
  const [filteredMovies, setFilterMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(12);
  const [moviesToRender, setMoviesToRender] = useState([]);

  const lastMovieIndex = currentPage * countriesPerPage;

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
    let updateMovies = savedMovies;
    if (selectCategory) {
      updateMovies = updateMovies.filter((movie) => movie.duration < 20);
    }
    setFilterMovies(updateMovies);
  };

  const filterOn = () => {
    setSelectCategory(!selectCategory);
    localStorage.setItem("checkbox_saved", JSON.stringify(!selectCategory));
  };

  const currentMovies = filteredMovies.slice(0, lastMovieIndex);

  const nextPage = () => setCurrentPage((prev) => prev + 1);

  useEffect(() => {
    setMoviesToRender(currentMovies);
  }, [savedMovies, filteredMovies, lastMovieIndex]);

  useEffect(() => {
    applyFilter();
  }, [selectCategory, savedMovies]);

  return (
    <div className="saved-movies">
      <Header handleSelectCategory={handleSelectCategory} />
      <SearchForm
        changeInput={(e) => setInputSearch(e.target.value)}
        handleSelectCategory={filterOn}
        value={JSON.parse(localStorage.getItem("checkbox_saved"))}
        onSearch={onSubmitSearch}
      />
      <MoviesCardList
        savedMovies={moviesToRender}
        deleteMovie={deleteMovie}
        isMovieAdded={isMovieAdded}
        movieStatusHandler={movieStatusHandler}
        isLoading={isLoading}
        searchError={searchError}
      />
      {filteredMovies.length > currentMovies.length && (
        <ButtonMore nextPage={nextPage} />
      )}
      <Footer />
    </div>
  );
};

export default SavedMovies;

/*      */
