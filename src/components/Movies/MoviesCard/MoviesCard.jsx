import React, { useState } from "react";

import "./MoviesCard.css";

const MoviesCard = ({ time, poster, name }) => {
  const [like, putLike] = useState(false);

  return (
    <div className="movies-card">
      <img src={poster} className="movies-card__image" alt="pic1" />
      <p className="movies-card__name">{name}</p>
      <button
        onClick={() => putLike(!like)}
        className={`movies-card__like ${
          like ? `movies-card__like_active` : ""
        }`}
      ></button>
      <p className="movies-card__time">{time}</p>
    </div>
  );
};

export default MoviesCard;
