export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._cardsUrl = `${this._baseUrl}/cards`;
    this._headers = headers;
  }

  getUserData() {
    return fetch(this._userUrl, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  saveUserChanges(data) {
    return fetch(this._userUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  likedCard(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //Снятие "Лайка"
  dislikedCard(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addMovie(data) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `https://api.nomoreparties.co/${data.image.url}`,
        trailerLink: data.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${data.image.formats.thumbnail.url}`,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    }).then(this._checkResponse);
  }

  setToken(token) {
    this._headers = {
      ...this._headers,
      Authorization: `Bearer ${token}`,
    };
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }
}

export const MainApi = new Api({
  baseUrl: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});
