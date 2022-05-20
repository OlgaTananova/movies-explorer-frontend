export function searchMovies(movies, isShortMovies, searchInput) {
  let searchedMovies;
  if (isShortMovies) {
    searchedMovies = movies.filter((movie) => {
      return (movie.nameRU.toLowerCase().includes(searchInput.toLowerCase().trim())
        || movie.description.toLowerCase().includes(searchInput.toLowerCase().trim()))
        && movie.duration <= 40;
    })
  } else {
    searchedMovies = movies.filter((movie) => {
      return (movie.nameRU.toLowerCase().includes(searchInput.toLowerCase().trim())
        || movie.description.toLowerCase().includes(searchInput.toLowerCase().trim()))
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
    return movie.duration <= 40;
  })
}

export const movieImageBaseUrl = 'https://api.nomoreparties.co';
export const moviesBaseUrl = 'https://api.nomoreparties.co/beatfilm-movies';
export const baseUrl = 'https://api.movie-explorerbyolga.nomoredomains.work';
export const MINUTESINHOUR = 60;
