import {baseUrl} from './utils';

const headers = {
  "Content-Type": "application/json",
}

const checkResponse = ((response) => {
  if (response.ok) {
    return response.json();
  }
  return response.text().then((text) => {
    const error = JSON.parse(text)
    throw new Error(error.message)
  })
})

export const signUp = ((name, email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST', headers: headers, body: JSON.stringify({
      "name": name, "password": password, "email": email
    })
  })
    .then((res) => {
      return checkResponse(res)
    })
})

export const signIn = ((email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST', headers: headers, body: JSON.stringify({
      "password": password, "email": email
    }), credentials: 'include'
  })
    .then((res) => {
      return checkResponse(res);
    })
})

export const verifyUser = () => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET", headers: {
      "Content-Type": "application/json"
    }, credentials: 'include'
  })
    .then((res) => {
      return checkResponse(res);
    })
}

export const logOut = () => {
  return fetch(`${baseUrl}/signout`, {
    method: "POST", headers: {
      "Content-Type": "application/json"
    }, credentials: 'include'
  })
    .then((res) => {
      return checkResponse(res);
    })
}

export const getCurrentUser = () => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET', headers: {
      "Content-Type": "application/json"
    }, credentials: 'include'
  })
    .then((res) => {
      return checkResponse(res);
    })
}

export const editUserProfile = (name, email) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH', headers: {
      "Content-Type": "application/json"
    }, credentials: 'include', body: JSON.stringify({
      "name": name, "email": email
    })
  })
    .then((res) => {
      return checkResponse(res);
    })
}

export const saveMovie = (movie) => {
  return fetch(`${baseUrl}/movies`, {
    method: 'POST', headers: {
      "Content-Type": "application/json"
    }, credentials: 'include', body: JSON.stringify({
      "country": movie.country,
      "director": movie.director,
      "duration": movie.duration,
      "year": movie.year,
      "description": movie.description,
      "image": movie.image,
      "trailerLink": movie.trailerLink,
      "nameRU": movie.nameRU,
      "nameEN": movie.nameEN,
      "thumbnail": movie.thumbnail,
      "movieId": movie.id
    })
  })
    .then((res) => {
      return checkResponse(res);
    })
}

export const deleteMovie = (id) => {
  return fetch(`${baseUrl}/movies/${id}`, {
    method: 'DELETE', headers: {
      "Content-Type": "application/json"
    }, credentials: 'include',
  })
    .then((res) => {
      return checkResponse(res);
    })
}

export const getSavedMovies = () => {
  return fetch(`${baseUrl}/movies`, {
    method: "GET", headers: {
      "Content-Type": "application/json"
    }, credentials: 'include'
  })
    .then((res) => {
      return checkResponse(res);
    })
}
