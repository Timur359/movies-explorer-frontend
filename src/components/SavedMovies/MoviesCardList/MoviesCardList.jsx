import React from "react";
import Preloader from "../../Preloader/Preloader";

import MoviesCard from "../MoviesCard/MoviesCard";

import "./MoviesCardList.css";

export let moviesList = [];

const MoviesCardList = ({
  handlePoliciesClick,
  savedMovies,
  deleteMovie,
  movieStatusHandler,
  isMovieAdded,
  isLoading,
}) => {
  return (
    <div className="movies-card-list">
      <div className="movies-card-list__list">
        {isLoading ? (
          savedMovies.map((movie, i) => {
            return (
              <MoviesCard
                key={i}
                movie={movie}
                handlePoliciesClick={handlePoliciesClick}
                deleteMovie={deleteMovie}
                isMovieAdded={isMovieAdded}
                movieStatusHandler={movieStatusHandler}
              />
            );
          })
        ) : (
          <Preloader />
        )}
      </div>
    </div>
  );
};

export default MoviesCardList;
