import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({onLike, isLiked, searchedMovies}) {


    if (searchedMovies) {
      return (
        <ul className={'movies-card-list'}>
          {searchedMovies.map((movie) => {
            return <MoviesCard key={movie.id}
                               imageLink={`https://api.nomoreparties.co/${movie.image.url}`}
                               heading={movie.nameRU}
                               duration={movie.duration}
                               trailerLink={movie.trailerLink}
                               onLike={onLike}
                               isLiked={isLiked}/>
          })}
        </ul>
      )
    }
    return null;

}

export default MoviesCardList;
