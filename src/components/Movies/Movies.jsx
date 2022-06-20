import React, { useState, useEffect } from "react";

import Header from "../Parts/Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import ButtonMore from "./ButtonMore/ButtonMore";
import Footer from "../Parts/Footer/Footer";
import "./Movies.css";

const Movies = ({
  movieStatusHandler,
  isMovieAdded,
  movies,
  isLoading,
  onSubmitSearch,
  searchError,
}) => {
  const [inputSearch, setInputSearch] = useState("");
  const [selectCategory, setSelectCategory] = useState(
    JSON.parse(localStorage.getItem("checkbox_movies"))
  );
  const [filteredMovies, setFilterMovies] = useState(movies);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(12);

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
    let updateMovies = movies;
    if (selectCategory) {
      updateMovies = updateMovies.filter((movie) => movie.duration < 20);
    }
    setFilterMovies(updateMovies);
  };

  useEffect(() => {
    applyFilter();
  }, [selectCategory, movies]);

  const filterOn = (e) => {
    setSelectCategory(!selectCategory);
    localStorage.setItem("checkbox_movies", JSON.stringify(!selectCategory));
  };

  return (
    <div className="movies">
      <Header setSelectCategory={setSelectCategory} />
      <SearchForm
        changeInput={(e) => setInputSearch(e.target.value)}
        handleSelectCategory={filterOn}
        onSearch={onSubmitSearch}
        savedMovies={false}
        value={JSON.parse(localStorage.getItem("checkbox_movies"))}
      />
      <MoviesCardList
        movies={currentMovies}
        isLoading={isLoading}
        movieStatusHandler={movieStatusHandler}
        isMovieAdded={isMovieAdded}
        searchError={searchError}
      />
      {filteredMovies.length > currentMovies.length && (
        <ButtonMore nextPage={nextPage} />
      )}
      <Footer />
    </div>
  );
};

export default Movies;
