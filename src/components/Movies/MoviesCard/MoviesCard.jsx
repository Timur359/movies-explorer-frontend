import React from "react";

import "./MoviesCard.css";

const MoviesCard = ({ movie, movieStatusHandler, isMovieAdded }) => {
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
        alt="pic1"
      />
      <a
        className="movies-card__name"
        href={movie.trailerLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {movie.nameRU}
      </a>
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
