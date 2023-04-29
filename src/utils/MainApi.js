import {BASE_URL} from './utils';


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
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST', headers: headers, body: JSON.stringify({
      "name": name, "password": password, "email": email
    })
  })
    .then((res) => {
      return checkResponse(res)
    })
})

export const signIn = ((email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST', headers: headers, body: JSON.stringify({
      "password": password, "email": email
    }), credentials: 'include'
  })
    .then((res) => {
      return checkResponse(res);
    })
})

export const verifyUser = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET", headers: {
      "Content-Type": "application/json"
    }, credentials: 'include'
  })
    .then((res) => {
      return checkResponse(res);
    })
}

export const logOut = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "POST", headers: {
      "Content-Type": "application/json"
    }, credentials: 'include'
  })
    .then((res) => {
      return checkResponse(res);
    })
}

export const getCurrentUser = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET', headers: {
      "Content-Type": "application/json"
    }, credentials: 'include'
  })
    .then((res) => {
      return checkResponse(res);
    })
}

export const editUserProfile = (name, email) => {
  return fetch(`${BASE_URL}/users/me`, {
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
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST', headers: {
      "Content-Type": "application/json"
    }, credentials: 'include', body: JSON.stringify({
      "rating": movie.rating,
      "year": movie.year,
      "title": movie.title,
      "overview": movie.overview,
      "image": movie.image,
      "descriptionLink": movie.descriptionLink,
      "id": movie.id,
    })
  })
    .then((res) => {
      return checkResponse(res);
    })
}

export const deleteMovie = (id) => {
  return fetch(`${BASE_URL}/movies/${id}`, {
    method: 'DELETE', headers: {
      "Content-Type": "application/json"
    }, credentials: 'include',
  })
    .then((res) => {
      return checkResponse(res);
    })
}

export const getSavedMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET", headers: {
      "Content-Type": "application/json"
    }, credentials: 'include'
  })
    .then((res) => {
      return checkResponse(res);
    })
}
