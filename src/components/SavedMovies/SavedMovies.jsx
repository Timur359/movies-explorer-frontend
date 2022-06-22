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
  filterSavedMovies,
  searchError,
  setFilterSavedMovies,
  searchFilter,
  setIsLoading,
}) => {
  const [selectCategory, setSelectCategory] = useState(
    JSON.parse(localStorage.getItem("checkbox_saved"))
  );
  const [filteredMovies, setFilterMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(12);
  const [searchText, setSearchText] = useState(
    localStorage.getItem("searchTextSavedMovies") || ""
  );

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
    if (searchText) {
      const regex = new RegExp(searchText, "gi");
      updateMovies = updateMovies.filter(
        (item) => regex.test(item.nameRU) || regex.test(item.nameEN)
      );
    }
    localStorage.setItem("searchSavedMovies", JSON.stringify(updateMovies));
    setFilterMovies(JSON.parse(localStorage.getItem("searchSavedMovies")));
  };

  const searchHandlerSaved = (searchQuery) => {
    localStorage.setItem("searchTextSavedMovies", searchQuery);
    setIsLoading(false);
    setTimeout(() => {
      setFilterSavedMovies(
        searchFilter(savedMovies, localStorage.getItem("searchTextSavedMovies"))
      );
      localStorage.setItem(
        "searchSavedMovies",
        JSON.stringify(
          searchFilter(
            savedMovies,
            localStorage.getItem("searchTextSavedMovies")
          )
        )
      );
      setIsLoading(true);
    }, 600);
  };

  const filterOn = () => {
    setSelectCategory(!selectCategory);
    localStorage.setItem("checkbox_saved", JSON.stringify(!selectCategory));
  };

  const currentMovies = filteredMovies.slice(0, lastMovieIndex);

  const nextPage = () => setCurrentPage((prev) => prev + 1);

  useEffect(() => {
    applyFilter();
  }, [selectCategory, savedMovies, filterSavedMovies]);

  return (
    <div className="saved-movies">
      <Header handleSelectCategory={handleSelectCategory} />
      <SearchForm
        handleSelectCategory={filterOn}
        value={JSON.parse(localStorage.getItem("checkbox_saved"))}
        onSearch={searchHandlerSaved}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <MoviesCardList
        savedMovies={currentMovies}
        deleteMovie={deleteMovie}
        isMovieAdded={isMovieAdded}
        movieStatusHandler={movieStatusHandler}
        isLoading={isLoading}
        searchError={searchError}
      />
      {JSON.parse(localStorage.getItem("searchSavedMovies")).length >
        currentMovies.length && <ButtonMore nextPage={nextPage} />}
      <Footer />
    </div>
  );
};

export default SavedMovies;
