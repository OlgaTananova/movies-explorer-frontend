import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import {useLocation} from 'react-router-dom';
import {useAppSelector} from '../../store/hooks';

function MoviesCardList({
                          onLike,
                          showedMovies,
                          onDislike
                        }) {
  const location = useLocation();
  const trendingMovies = useAppSelector((state) => state.movie.trendingMovies);
  const savedMovies = useAppSelector((state) => state.movie.savedMovies);
  if (location.pathname === '/movies') {
    return (<ul className={'movies-card-list'}>
      {showedMovies.map((movie) => {
        return <MoviesCard key={location.pathname === '/movies' ? movie.id : movie.id}
                           {...movie}
                           onLike={onLike}
                           onDislike={onDislike}
                           savedMovies={savedMovies}/>
      })}
    </ul>)
  } else if (location.pathname === '/saved-movies') {
    return (<ul className={'movies-card-list'}>
      {showedMovies.map((movie) => {
        return <MoviesCard key={movie._id}
                           {...movie}
                           onLike={onLike}
                           savedMovies={savedMovies}
                           onDislike={onDislike}/>
      })}
    </ul>)
  } else {
    return (<ul className={'movies-card-list'}>
      {trendingMovies.map((movie) => {
        return <MoviesCard key={movie.id}
                           {...movie}
                           onLike={onLike}
                           savedMovies={savedMovies}
                           onDislike={onDislike}/>
      })}
    </ul>)
  }
}

export default MoviesCardList;
