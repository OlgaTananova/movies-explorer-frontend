
export function searchMovies(movies, isShortMovies, searchInput) {
  let searchedMovies;
  if (isShortMovies) {
    searchedMovies = movies.filter((movie) => {
      return (movie.nameRU.includes(searchInput.toLowerCase().trim()) ||
          movie.description.includes(searchInput.toLowerCase().trim())) &&
        movie.duration <= 40;
    })
  } else {
    searchedMovies = movies.filter((movie) => {
      return (movie.nameRU.includes(searchInput.toLowerCase().trim()) ||
        movie.description.includes(searchInput.toLowerCase().trim()));
    })
  }
  return searchedMovies;
}

export function saveToLocalStorage(searchedMovies, isShortMovies, searchInput) {
  localStorage.setItem('searchInput', searchInput);
  localStorage.setItem('isShortMovies', JSON.stringify(isShortMovies));
  localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies));
}
