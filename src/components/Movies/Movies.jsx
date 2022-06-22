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
  searchError,
  filterMovie,
  setFilterMovie,
  searchFilter,
  setIsLoading,
}) => {
  const [selectCategory, setSelectCategory] = useState(
    JSON.parse(localStorage.getItem("checkbox_movies"))
  );
  const [filteredMovies, setFilterMovies] = useState(movies);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(12);
  const [searchText, setSearchText] = useState(
    localStorage.getItem("searchTextMovies") || ""
  );

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
    if (searchText) {
      const regex = new RegExp(searchText, "gi");
      updateMovies = updateMovies.filter(
        (item) => regex.test(item.nameRU) || regex.test(item.nameEN)
      );
    }
    localStorage.setItem("searchMovies", JSON.stringify(updateMovies));
    setFilterMovies(JSON.parse(localStorage.getItem("searchMovies")));
  };

  useEffect(() => {
    applyFilter();
  }, [selectCategory, movies, filterMovie]);

  const searchHandler = (searchQuery) => {
    localStorage.setItem("searchTextMovies", searchQuery);
    setIsLoading(false);
    setTimeout(() => {
      setFilterMovie(
        searchFilter(movies, localStorage.getItem("searchTextMovies"))
      );
      localStorage.setItem(
        "searchMovies",
        JSON.stringify(
          searchFilter(movies, localStorage.getItem("searchTextMovies"))
        )
      );
      setIsLoading(true);
    }, 600);
  };

  const filterOn = () => {
    setSelectCategory(!selectCategory);
    localStorage.setItem("checkbox_movies", JSON.stringify(!selectCategory));
  };

  return (
    <div className="movies">
      <Header setSelectCategory={setSelectCategory} />
      <SearchForm
        handleSelectCategory={filterOn}
        onSearch={searchHandler}
        savedMovies={false}
        value={JSON.parse(localStorage.getItem("checkbox_movies"))}
        searchText={searchText}
        setSearchText={setSearchText}
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
