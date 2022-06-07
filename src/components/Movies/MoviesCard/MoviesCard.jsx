import React from "react";

import "./MoviesCard.css";

const MoviesCard = ({
  movie,
  handlePoliciesClick,
  movieStatusHandler,
  isMovieAdded,
}) => {
  let hours = Math.trunc(movie.duration / 60);
  let minutes = movie.duration % 60;

  const isAdded = isMovieAdded(movie);

  const addHandler = () => {
    movieStatusHandler(movie, !isAdded);
  };

  return (
    <div className="movies-card">
      <img
        src={`https://api.nomoreparties.co/${movie.image.url}`}
        className="movies-card__image"
        onClick={() => handlePoliciesClick(movie)}
        alt="pic1"
      />
      <p className="movies-card__name">{movie.nameRU}</p>
      <button
        className={`movies-card__like ${
          isAdded ? "movies-card__like_active" : ""
        }`}
        onClick={addHandler}
      />
      <p className="movies-card__time">
        {hours}ч {minutes}м
      </p>
    </div>
  );
};

export default MoviesCard;
