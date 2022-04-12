import React, { useState } from "react";

import MoviesCard from "../MoviesCard/MoviesCard";

import "./MoviesCardList.css";

import pic1 from "../../../images/images__card_test/pic__COLOR_pic.svg";
import pic2 from "../../../images/images__card_test/pic__COLOR_pic2.svg";
import pic3 from "../../../images/images__card_test/pic__COLOR_pic3.svg";
import pic4 from "../../../images/images__card_test/pic__COLOR_pic4.svg";
import pic5 from "../../../images/images__card_test/pic__COLOR_pic5.svg";

const MoviesCardList = () => {
  const moviesList = [
    {
      name: "33 слова о дизайне",
      time: "1ч 47м",
      poster: pic1,
      like: false,
    },
    {
      name: "33 слова о дизайне",
      time: "1ч 47м",
      poster: pic2,
      like: false,
    },
    {
      name: "33 слова о дизайне",
      time: "1ч 47м",
      poster: pic3,
      like: false,
    },
    {
      name: "33 слова о дизайне",
      time: "1ч 47м",
      poster: pic4,
      like: false,
    },
    {
      name: "33 слова о дизайне",
      time: "1ч 47м",
      poster: pic5,
      like: false,
    },
  ];

  const [movies, setMovies] = useState(moviesList);

  const isDeleteMovie = (movie) => {
    const newMovieList = movies.filter((c) => c !== movie);
    setMovies(newMovieList);
  };

  return (
    <div className="movies-card-list">
      <div className="movies-card-list__list">
        {movies.map((movie, i) => {
          return (
            <MoviesCard
              key={i}
              movie={movie}
              name={movie.name}
              poster={movie.poster}
              time={movie.time}
              onPostDelete={isDeleteMovie}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MoviesCardList;
