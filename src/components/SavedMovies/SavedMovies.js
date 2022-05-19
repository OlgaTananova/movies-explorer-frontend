import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import {useState} from 'react';
import {useEffect} from 'react';
import SearchNotification from '../SearchNotification/SearchNotification';
import {searchMovies} from '../../utils/utils';

function SavedMovies({savedMovies, isLoading, onLike, onDislike}) {
  const savedMoviesCount = savedMovies.length;
  const [savedMoviesError, setSavedMoviesError] = useState('');
  const [isShortMoviesInSM, setIsShortMoviesInSM] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const [windowOuterWidth, setWindowOuterWidth] = useState(window.outerWidth);
  const bigScreenLayout = (screenWidth > 768 || windowOuterWidth > 768) && savedMoviesCount >= 12;
  const middleScreenLayout = ((screenWidth > 480 && screenWidth <= 768) || (windowOuterWidth > 480 && windowOuterWidth <= 768)) && savedMoviesCount >= 8;
  const smallScreenLayout = (screenWidth <= 480 || windowOuterWidth <= 480) && savedMoviesCount >= 5;
  const [showedMovies, setShowedMovies] = useState(()=> {
    if (bigScreenLayout) {
      return savedMovies.slice(0,12);
    } else if (middleScreenLayout) {
      return savedMovies.slice(0, 8);
    } else if (smallScreenLayout){
      return savedMovies.slice(0,5);
    } else {
      return savedMovies
    }
  });

  useEffect(() => {
    window.addEventListener('resize', traceScreenWidth);
    return () => {
      window.removeEventListener('resize', traceScreenWidth)
    }
  },[])

  useEffect(() => {
    window.addEventListener('resize', traceWindowOuterWidth)
    return () => {
      window.removeEventListener('resize', traceWindowOuterWidth)
    }
  },[])

  function traceScreenWidth() {
    setScreenWidth(window.screen.width);
  }

  function traceWindowOuterWidth() {
    setWindowOuterWidth(window.outerWidth);
  }


  function toggleShortMoviesFilter() {
    setIsShortMoviesInSM(!isShortMoviesInSM);
  }

  useEffect(() => {
    if (bigScreenLayout) {
      setShowedMovies(savedMovies.slice(0, 12))
    } else if (middleScreenLayout) {
      setShowedMovies(savedMovies.slice(0, 8));
    } else if (smallScreenLayout) {
      setShowedMovies(savedMovies.slice(0, 5));
    } else {
      setShowedMovies(savedMovies);
    }
  },[screenWidth, windowOuterWidth, savedMovies])

  useEffect(() => {
    savedMoviesCount === 0 && setSavedMoviesError('У вас нет сохраненных фильмов.')
  }, [savedMoviesError])

  function handleSearchSavedMovies(searchInput, isShortMovies) {
    const searchedFilms = searchMovies(savedMovies, isShortMovies, searchInput);
    if (searchedFilms.length === 0) {
      setSavedMoviesError('Ничего не найдено.')
    }
    setShowedMovies(searchedFilms);
  }

  if (isLoading) {
    return (
      <>
        <SearchForm
          isShortMovies={isShortMoviesInSM}
          disabled = {savedMoviesCount === 0}
          onSearchSavedMovies={handleSearchSavedMovies}
          onToggle={toggleShortMoviesFilter}/>
        <div className={'saved-movies'}>
          <Preloader movies={true} />
        </div>
      </>)
  }
  else if (savedMoviesError !== '') {
    return (<>
      <SearchForm
        isShortMovies={isShortMoviesInSM}
        disabled = {savedMoviesCount === 0}
        onSearchSavedMovies={handleSearchSavedMovies}
        onToggle={toggleShortMoviesFilter}/>
      <div className={'saved-movies'}>
        <SearchNotification content={savedMoviesError}/>
      </div>
    </>)
  } else {
    return (<>
      <SearchForm isShortMovies={isShortMoviesInSM}
                  onSearchSavedMovies={handleSearchSavedMovies}
                  disabled = {savedMoviesCount === 0}
                  onToggle={toggleShortMoviesFilter}/>
      <div className={'saved-movies'}>
          <MoviesCardList
                          showedMovies={showedMovies}
                          savedMovies={savedMovies}
                          onLike={onLike}
                          onDislike={onDislike}
          />
      </div>
    </>)
  }
}

export default SavedMovies;
