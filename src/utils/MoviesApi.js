import {MOVIES_BASE_URL} from './utils';
const API_KEY = 'da0d4bdd0cc9dd25ceb008aada31a19d'

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Server error. Please try again later.');
  }
}

export  function getMovies(query, page=1) {
  let encodedQuery = encodeURIComponent(query);
  return fetch(`${MOVIES_BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&query=${encodedQuery}`, {
    method: 'GET', headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return checkResponse(res);
    })
}

export function getMoviesByPerson(input, page = 1) {
  const encodedQuery = encodeURIComponent(input);
  return fetch(`${MOVIES_BASE_URL}/search/person?api_key=${API_KEY}&language=en-US&query=${encodedQuery}&page=${page}&include_adult=false`, {
    method: 'GET', headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return checkResponse(res);
    })
}

export function getTrendingMovies() {
  return fetch(`${MOVIES_BASE_URL}/trending/movie/week?api_key=${API_KEY}`, {
    method: 'GET', headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return checkResponse(res);
    })
}



