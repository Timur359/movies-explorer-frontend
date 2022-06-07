import React from "react";

import "./MoviesCard.css";

const MoviesCard = ({ movie, handlePoliciesClick, deleteMovie }) => {
  const handleDelete = () => {
    deleteMovie(movie);
  };

  let hours = Math.trunc(movie.duration / 60);
  let minutes = movie.duration % 60;

  return (
    <div className="movies-card">
      <img
        src={movie.image}
        className="movies-card__image"
        onClick={() => handlePoliciesClick(movie)}
        alt="pic1"
      />
      <p className="movies-card__name">{movie.nameRU}</p>
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
