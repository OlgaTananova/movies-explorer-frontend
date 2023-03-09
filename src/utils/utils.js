export const MOVIE_IMAGE_BASE_URL = 'https://api.nomoreparties.co';
export const MOVIES_BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const BASE_URL = 'https://api.movie-explorerbyolga.nomoredomains.work';
export const MINUTES_IN_HOUR = 60;
export const SHORT_MOVIE_DURATION = 40;
export const BIG_SCREEN_MOVIES_QTY = 12;
export const MIDDLE_SCREEN_MOVIES_QTY = 8;
export const SMALL_SCREEN_MOVIES_QTY = 5;
export const MORE_MOVIES_BIG_SCREEN_QTY = 3;
export const MORE_MOVIES_SMALL_SCREEN_QTY = 2;
export const BIG_SCREEN = 768;
export const SMALL_SCREEN = 480;

export function searchMovies(movies, isShortMovies, searchInput) {
  let searchedMovies;
  if (!movies) {
    return null
  } else if (isShortMovies) {
    searchedMovies = movies.filter((movie) => {
      return (movie.nameRU.toLowerCase().includes(searchInput.toLowerCase().trim()) || movie.description.toLowerCase().includes(searchInput.toLowerCase().trim())) && movie.duration <= SHORT_MOVIE_DURATION;
    })
  } else {
    searchedMovies = movies.filter((movie) => {
      return (movie.nameRU.toLowerCase().includes(searchInput.toLowerCase().trim()) || movie.description.toLowerCase().includes(searchInput.toLowerCase().trim()))
    })
  }
  return searchedMovies;
}

export function saveToLocalStorage(searchedMovies, isShortMovies, searchInput) {
  localStorage.setItem('searchInput', searchInput);
  localStorage.setItem('isShortMovies', JSON.stringify(isShortMovies));
  localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies));
}

export function showShortMovies(showedMovies) {
  return showedMovies.filter((movie) => {
    return movie.duration <= SHORT_MOVIE_DURATION;
  })
}




