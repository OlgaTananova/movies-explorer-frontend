import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import {useState} from 'react';
import {useEffect} from 'react';
import SearchNotification from '../SearchNotification/SearchNotification';
import {searchMovies, showShortMovies} from '../../utils/utils';

function SavedMovies({savedMovies, isLoading, onLike, onDislike}) {
  const [savedMoviesError, setSavedMoviesError] = useState('');
  const [isShortMoviesInSM, setIsShortMoviesInSM] = useState(false);
  const [showedMovies, setShowedMovies] = useState(savedMovies);
  const [savedMoviesSearchCount, setSavedMoviesSearchCount] = useState(0);

  useEffect(() => {
    if (savedMovies.length === 0) {
      setSavedMoviesError('У вас нет сохраненных фильмов')
    } else {
      setShowedMovies(savedMovies);
      setSavedMoviesError('');
    }
  }, [savedMovies])


  function handleSearchSavedMovies(searchInput, isShortMovies, reset) {
    const searchedFilms = searchMovies(savedMovies, isShortMovies, searchInput);
    if (searchedFilms.length === 0) {
      setSavedMoviesError('Ничего не найдено.')
      setShowedMovies([]);
      setSavedMoviesSearchCount((prev) => prev + 1);
      reset();
    } else {
      setShowedMovies(searchedFilms);
      setSavedMoviesSearchCount((prev) => prev + 1);
    }
  }

  function toggleShortMoviesFilter() {
    setIsShortMoviesInSM(!isShortMoviesInSM)
    if (!isShortMoviesInSM && savedMovies) {
      const showedShortMovies = showShortMovies(savedMovies);
      if (showedShortMovies.length === 0) {
        setSavedMoviesError('Ничего не найдено');
        setShowedMovies([]);
      } else {
        setShowedMovies(showedShortMovies);
      }
    } else if (isShortMoviesInSM && savedMovies) {
      setSavedMoviesError('');
      setShowedMovies(savedMovies);
    }
  }

  function handleSearchClear() {
    setShowedMovies(savedMovies);
    setSavedMoviesError('');
    setIsShortMoviesInSM(false);
  }

  if (isLoading) {
    return (<>
      <SearchForm isShortMovies={isShortMoviesInSM}
                  disabled={!savedMovies.length}
                  onSearchSavedMovies={handleSearchSavedMovies}
                  onToggle={toggleShortMoviesFilter}/>
      <div className={'saved-movies'}>
        <Preloader movies={true}/>
      </div>
    </>)
  } else if (savedMoviesError) {
    return (<>
      <SearchForm isShortMovies={isShortMoviesInSM}
                  disabled={!savedMovies.length}
                  onSearchSavedMovies={handleSearchSavedMovies}
                  onToggle={toggleShortMoviesFilter}/>
      <div className={'saved-movies'}>
        <SearchNotification content={savedMoviesError}/>
        {(showedMovies.length === 0 && savedMoviesSearchCount !== 0 && savedMoviesError) ?
          <button type={'button'}
                  className={'saved-movies__return-button'}
                  onClick={handleSearchClear}>Вернуться</button> : null}
      </div>
    </>)
  } else {
    return (<>
      <SearchForm isShortMovies={isShortMoviesInSM}
                  onSearchSavedMovies={handleSearchSavedMovies}
                  disabled={!savedMovies.length}
                  onToggle={toggleShortMoviesFilter}/>
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
