import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({isLoggedIn, onLike, isLiked, isLoading, searchedMovies}) {

  if (isLoggedIn) {
    return (
    <div className={'movies'}>
      {isLoading? <Preloader /> : <MoviesCardList onLike={onLike} isLiked={isLiked}
      searchedMovies={searchedMovies}/>}
      <div className={'movies__more-films'}>
        <button type={'button'} className={'movies__more-films-button'}>Еще</button>
      </div>
    </div>
    )
  }
  return null
}

export default Movies;
