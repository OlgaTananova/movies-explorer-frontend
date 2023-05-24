
export const MOVIE_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
export const MOVIES_BASE_URL = 'https://api.themoviedb.org/3';
export const MOVIES_DETAILS_BASE_URL = 'https://www.themoviedb.org/movie';
// export const BASE_URL = 'http://localhost:3000';
export const BASE_URL = 'https://movie-explorer-api.onrender.com';
export const HIGH_RATING = 6;
export const BIG_SCREEN_MOVIES_QTY = 12;
export const MIDDLE_SCREEN_MOVIES_QTY = 8;
export const SMALL_SCREEN_MOVIES_QTY = 5;
export const MORE_MOVIES_BIG_SCREEN_QTY = 3;
export const MORE_MOVIES_SMALL_SCREEN_QTY = 2;
export const BIG_SCREEN = 768;
export const SMALL_SCREEN = 480;
export const DOTS = '...';

export function searchMovies(movies, isHighRatingMovies, searchInput) {
  let searchedMovies;
  if (!movies) {
    return null
  } else if (isHighRatingMovies) {
    searchedMovies = movies.filter((movie) => {
      return (movie.title.toLowerCase().includes(searchInput.toLowerCase().trim()) || movie.overview.toLowerCase().includes(searchInput.toLowerCase().trim())) && movie.vote_average >= HIGH_RATING;
    })
  } else {
    searchedMovies = movies.filter((movie) => {
      return (movie.title.toLowerCase().includes(searchInput.toLowerCase().trim()) || movie.overview.toLowerCase().includes(searchInput.toLowerCase().trim()))
    })
  }
  return searchedMovies;
}


export function showHighRatingMovies(showedMovies, movieField) {
  if (showedMovies) {
    return showedMovies.filter((movie) => {
      return movie[movieField] >= HIGH_RATING;
    })
  }
}

export function range (start, end) {
  let length = end - start + 1;
  /*
  	Create an array of certain length and set the elements within it from
    start value to end value.
  */
  return Array.from({ length }, (_, idx) => idx + start);
}



