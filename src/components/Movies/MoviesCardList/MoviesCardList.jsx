import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../../Preloader/Preloader";

import "./MoviesCardList.css";

const MoviesCardList = ({
  movies,
  isLoading,
  movieStatusHandler,
  isMovieAdded,
  searchError,
}) => {
  return (
    <div className="movies-card-list">
      {movies.length === 0 ? (
        <p className="movies-card-list__error">{searchError}</p>
      ) : (
        ""
      )}
      <div className="movies-card-list__list">
        {isLoading ? (
          movies.map((movie, i) => {
            return (
              <MoviesCard
                key={i}
                movie={movie}
                movieStatusHandler={movieStatusHandler}
                isMovieAdded={isMovieAdded}
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
