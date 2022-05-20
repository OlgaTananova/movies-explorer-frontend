import {moviesBaseUrl} from './utils';

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Во время запроса произошла ошибка. ' + 'Возможно, проблема с соединением или сервер недоступен. ' + 'Подождите немного и попробуйте ещё раз.')
  }
}

export default function getMovies() {
  return fetch(moviesBaseUrl, {
    method: 'GET', headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return checkResponse(res);
    })
}



