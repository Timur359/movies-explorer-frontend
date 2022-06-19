export const BASE_URL = "http://localhost:3001/api";

//export const BASE_URL =
//"https://api.movies-explorer-dip.nomoredomains.work/api";

const handleOriginalResponse = (res) =>
  res.ok
    ? res.json()
    : res
        .json()
        .then((err) =>
          Promise.reject(
            new Error(`${err.message} (${res.status} ${res.statusText})`)
          )
        );

const headers = {
  "Content-Type": "application/json",
};

export const register = ({ name, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, email, password }),
  }).then(handleOriginalResponse);
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  }).then(handleOriginalResponse);
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then(handleOriginalResponse);
};
