import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../../Preloader/Preloader";

import "./MoviesCardList.css";

const MoviesCardList = ({
  movies,
  handlePoliciesClick,
  isLoading,
  movieStatusHandler,
  isMovieAdded,
}) => {
  return (
    <div className="movies-card-list">
      <div className="movies-card-list__list">
        {isLoading ? (
          movies.map((movie, i) => {
            return (
              <MoviesCard
                key={i}
                movie={movie}
                handlePoliciesClick={handlePoliciesClick}
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
