const baseUrl = "https://api.nomoreparties.co/beatfilm-movies";

const checkResponse = (res) =>
  res.ok
    ? res.json()
    : res
        .json()
        .then((err) =>
          Promise.reject(
            new Error(`${err.message} (${res.status} ${res.statusText})`)
          )
        );

export const getAllMovies = () =>
  fetch(`${baseUrl}`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => checkResponse(res));

export default getAllMovies;
