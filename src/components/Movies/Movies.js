import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({isLoggedIn, onLike, isLiked}) {
  if (isLoggedIn) {
    return (
    <div className={'movies'}>
      <MoviesCardList onLike={onLike} isLiked={isLiked} />
      <div className={'movies__more-films'}>
        <button type={'button'} className={'movies__more-films-button'}>Еще</button>
      </div>
    </div>
    )
  }
  return null
}

export default Movies;
