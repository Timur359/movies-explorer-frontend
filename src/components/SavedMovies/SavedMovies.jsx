import React from "react";

import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Parts/Footer/Footer";
import Header from "../Parts/Header/Header";

import "./SavedMovies.css";
import "./MoviesCard/MoviesCard.css";

const SavedMovies = () => (
  <div className="saved-movies">
    <Header />
    <SearchForm />
    <MoviesCardList />
    <Footer />
  </div>
);

export default SavedMovies;
