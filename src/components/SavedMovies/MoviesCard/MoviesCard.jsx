import React from "react";

import "./MoviesCard.css";

const MoviesCard = ({ movie, deleteMovie }) => {
  const handleDelete = () => {
    deleteMovie(movie);
  };

  let hours = Math.trunc(movie.duration / 60);
  let minutes = movie.duration % 60;

  return (
    <div className="movies-card">
      <img src={movie.image} className="movies-card__image" alt="pic1" />
      <a
        className="movies-card__name"
        href={movie.trailerLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {movie.nameRU}
      </a>
      <button
        className="movies-card__delete"
        type="button"
        onClick={handleDelete}
      />
      <p className="movies-card__time">
        {hours}ч {minutes}м
      </p>
    </div>
  );
};

export default MoviesCard;
