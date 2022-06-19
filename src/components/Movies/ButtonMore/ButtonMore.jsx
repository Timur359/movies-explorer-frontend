import React from "react";

import "./ButtonMore.css";

const ButtonMore = ({
  paginate,
  totalCountries,
  countriesPerPage,
  movies,
  nextPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="button-more">
      <button className="button-more__button" onClick={nextPage}>
        Ещё
      </button>
    </div>
  );
};

export default ButtonMore;
