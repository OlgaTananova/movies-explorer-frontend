import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import {useLocation} from 'react-router-dom';

function MoviesCardList({onLike, showedMovies, savedMovies, onDislike}) {
  const location = useLocation();

  if (showedMovies) {
    return (<ul className={'movies-card-list'}>
        {showedMovies.map((movie) => {
          return <MoviesCard key={location.pathname === '/movies' ? movie.id : movie.movieId}
                             {...movie}
                             onLike={onLike}
                             onDislike={onDislike}
                             savedMovies={savedMovies}/>
        })}
      </ul>)
  }
  return null;

}

export default MoviesCardList;
