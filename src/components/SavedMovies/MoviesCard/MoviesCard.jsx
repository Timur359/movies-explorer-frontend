import React from "react";

import "./MoviesCard.css";

const MoviesCard = ({ poster, name, time, movie, onPostDelete }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    onPostDelete(movie);
  };

  return (
    <div className="movies-card">
      <img src={poster} className="movies-card__image" alt="pic1" />
      <p className="movies-card__name">{name}</p>
      <button onClick={handleDelete} className="movies-card__delete"></button>
      <p className="movies-card__time">{time}</p>
    </div>
  );
};

export default MoviesCard;
