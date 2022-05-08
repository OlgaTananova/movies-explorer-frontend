import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import {movies} from '../../utils/utils';

function MoviesCardList({onLike, isLiked}) {

  return (
      <ul className={'movies-card-list'}>
      {movies.map((movie) => {
        return <MoviesCard key={movie.id} imageLink={movie.imageLink}
                           heading={movie.heading}
                           duration={movie.duration}
                           onLike={onLike} isLiked={isLiked}/>
      })}
    </ul>
  )
}

export default MoviesCardList;
