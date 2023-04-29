import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import {useState} from 'react';
import {useEffect} from 'react';
import SearchNotification from '../SearchNotification/SearchNotification';
import {searchMovies, showHighRatingMovies} from '../../utils/utils';
import {useAppSelector} from '../../store/hooks';

function SavedMovies({ onLike, onDislike}) {
  const savedMovies = useAppSelector((state) => state.movie.savedMovies);
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const [savedMoviesError, setSavedMoviesError] = useState('');
  const [isHighRatingMoviesInSM, setIsHighRatingMoviesInSM] = useState(false);
  const [showedMovies, setShowedMovies] = useState(savedMovies);
  const [savedMoviesSearchCount, setSavedMoviesSearchCount] = useState(0);

  useEffect(() => {
    if (savedMovies.length === 0) {
      setSavedMoviesError('You have no saved movies.')
    } else {
      setShowedMovies(savedMovies);
      setSavedMoviesError('');
    }
  }, [savedMovies])


  function handleSearchSavedMovies(searchInput, isHighRatingMovies, reset) {
    const searchedFilms = searchMovies(savedMovies, isHighRatingMovies, searchInput);
    if (searchedFilms.length === 0) {
      setSavedMoviesError('No movies found.')
      setShowedMovies([]);
      setSavedMoviesSearchCount((prev) => prev + 1);
      reset();
    } else {
      setShowedMovies(() => searchedFilms);
      setSavedMoviesSearchCount((prev) => prev + 1);
    }
  }

  function toggleHighRatingMoviesFilter() {
    setIsHighRatingMoviesInSM(!isHighRatingMoviesInSM)
    if (!isHighRatingMoviesInSM && savedMovies) {
      const showedShortMovies = showHighRatingMovies(savedMovies, 'rating');
      if (showedShortMovies.length === 0) {
        setSavedMoviesError('No movies found.');
        setShowedMovies([]);
      } else {
        setShowedMovies(showedShortMovies);
      }
    } else if (isHighRatingMoviesInSM && savedMovies) {
      setSavedMoviesError('');
      setShowedMovies(savedMovies);
    }
  }

  function handleSearchClear() {
    setShowedMovies(savedMovies);
    setSavedMoviesError('');
    setIsHighRatingMoviesInSM(false);
  }

  if (isLoading) {
    return (<>
      <SearchForm isHighRatingMovies={isHighRatingMoviesInSM}
                  disabled={!savedMovies.length}
                  onSearchSavedMovies={handleSearchSavedMovies}
                  onToggle={toggleHighRatingMoviesFilter}/>
      <div className={'saved-movies'}>
        <Preloader movies={true}/>
      </div>
    </>)
  } else if (savedMoviesError) {
    return (<>
      <SearchForm isHighRatingMovies={isHighRatingMoviesInSM}
                  disabled={!savedMovies.length}
                  onSearchSavedMovies={handleSearchSavedMovies}
                  onToggle={toggleHighRatingMoviesFilter}/>
      <div className={'saved-movies'}>
        <SearchNotification content={savedMoviesError}/>
        {(showedMovies.length === 0 && savedMoviesSearchCount !== 0 && savedMoviesError) ?
          <button type={'button'}
                  className={'saved-movies__return-button'}
                  onClick={handleSearchClear}>Go back</button> : null}
      </div>
    </>)
  } else {
    return (<>
      <SearchForm isHighRatingMovies={isHighRatingMoviesInSM}
                  onSearchSavedMovies={handleSearchSavedMovies}
                  disabled={!savedMovies.length}
                  onToggle={toggleHighRatingMoviesFilter}/>
      <div className={'saved-movies'}>
        <MoviesCardList showedMovies={showedMovies}
                        savedMovies={savedMovies}
                        onLike={onLike}
                        onDislike={onDislike}/>
      </div>
    </>)
  }
}

export default SavedMovies;
