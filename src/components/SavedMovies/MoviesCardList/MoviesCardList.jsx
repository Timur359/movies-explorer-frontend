import React from "react";
import Preloader from "../../Preloader/Preloader";

import MoviesCard from "../MoviesCard/MoviesCard";

import "./MoviesCardList.css";

export let moviesList = [];

const MoviesCardList = ({
  savedMovies,
  deleteMovie,
  movieStatusHandler,
  isMovieAdded,
  isLoading,
  searchError,
}) => {
  console.log(savedMovies);
  return (
    <div className="movies-card-list">
      {savedMovies.length === 0 ? (
        <p className="movies-card-list__error">
          {searchError || "Список пуст"}
        </p>
      ) : (
        ""
      )}
      <div className="movies-card-list__list">
        {isLoading ? (
          savedMovies.map((movie, i) => {
            return (
              <MoviesCard
                key={i}
                movie={movie}
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
