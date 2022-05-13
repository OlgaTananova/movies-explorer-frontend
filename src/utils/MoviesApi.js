// Класс запросов к api Beatfilm-movies

const baseURL = 'https://api.nomoreparties.co/beatfilm-movies';

function checkResponse(response){
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Во время запроса произошла ошибка. ' +
      'Возможно, проблема с соединением или сервер недоступен. ' +
      'Подождите немного и попробуйте ещё раз.')
  }
}

export function getMovies() {
    return fetch(baseURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        checkResponse(res);
      })
  }



