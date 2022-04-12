import React from "react";

import Header from "../Parts/Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import ButtonMore from "./ButtonMore/ButtonMore";
import Footer from "../Parts/Footer/Footer";
import "./Movies.css";

const Movies = () => (
  <div className="movies">
    <Header />
    <SearchForm />
    <MoviesCardList />
    <ButtonMore />
    <Footer />
  </div>
);

export default Movies;
