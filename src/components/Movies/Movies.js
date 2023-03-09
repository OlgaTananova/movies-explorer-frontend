import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import SearchNotification from '../SearchNotification/SearchNotification';
import {useEffect, useState} from 'react';
import {
  showShortMovies,
  saveToLocalStorage,
  searchMovies,
  BIG_SCREEN_MOVIES_QTY,
  MIDDLE_SCREEN_MOVIES_QTY,
  SMALL_SCREEN_MOVIES_QTY,
  MORE_MOVIES_BIG_SCREEN_QTY,
  MORE_MOVIES_SMALL_SCREEN_QTY,
  BIG_SCREEN,
  SMALL_SCREEN
} from '../../utils/utils';

function Movies({
                  onLike,
                  savedMovies,
                  isLoading,
                  onSearchMovies,
                  searchCount,
                  errorMessage
                }) {
  const searchedMoviesInLS = JSON.parse(localStorage.getItem('searchedMovies'));
  const isShortMoviesInLS = JSON.parse(localStorage.getItem('isShortMovies'));
  const [searchedMovies, setSearchedMovies] = useState(searchedMoviesInLS === null ? [] : searchedMoviesInLS);
  const [isShortMovies, setIsShortMovies] = useState(isShortMoviesInLS ? isShortMoviesInLS : false);
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const [windowOuterWidth, setWindowOuterWidth] = useState(window.outerWidth);
  const searchedMoviesCount = searchedMovies ? searchedMovies.length : 0;
  const bigScreenLayout = (screenWidth > BIG_SCREEN || windowOuterWidth > BIG_SCREEN) && searchedMoviesCount >= BIG_SCREEN_MOVIES_QTY;
  const middleScreenLayout = ((screenWidth > SMALL_SCREEN && screenWidth <= BIG_SCREEN) || (windowOuterWidth > SMALL_SCREEN && windowOuterWidth <= BIG_SCREEN)) && searchedMoviesCount >= MIDDLE_SCREEN_MOVIES_QTY;
  const smallScreenLayout = (screenWidth <= SMALL_SCREEN || windowOuterWidth <= SMALL_SCREEN) && searchedMoviesCount >= SMALL_SCREEN_MOVIES_QTY;
  const [showedMovies, setShowedMovies] = useState(() => {
    if (bigScreenLayout) {
      return searchedMovies.slice(0, BIG_SCREEN_MOVIES_QTY);
    } else if (middleScreenLayout) {
      return searchedMovies.slice(0, MIDDLE_SCREEN_MOVIES_QTY);
    } else if (smallScreenLayout) {
      return searchedMovies.slice(0, SMALL_SCREEN_MOVIES_QTY);
    } else {
      return searchedMovies
    }
  });

  function toggleShortMoviesFilter() {
    setIsShortMovies(!isShortMovies);
    const searchInput = localStorage.getItem('searchInput');
    const movies = JSON.parse(localStorage.getItem('movies'));
    if (!searchInput && !movies) {
      return null
    } else if (!isShortMovies && searchedMovies) {
      let showedShortMovies = showShortMovies(searchedMovies);
      if (showedShortMovies === null) {
        showedShortMovies = [];
      }
      saveToLocalStorage(showedShortMovies, !isShortMovies, searchInput);
      setSearchedMovies(showedShortMovies);
    } else {
      const showedMovies = searchMovies(movies, !isShortMovies, searchInput);
      saveToLocalStorage(showedMovies, !isShortMovies, searchInput);
      setSearchedMovies(showedMovies);
    }
  }

  function traceScreenWidth() {
    setScreenWidth(window.screen.width);
  }

  function traceWindowOuterWidth() {
    setWindowOuterWidth(window.outerWidth);
  }

  function handleShowMoreMoviesClick() {
    if (screenWidth > BIG_SCREEN || windowOuterWidth > BIG_SCREEN) {
      setShowedMovies(searchedMovies.slice(0, showedMovies.length + MORE_MOVIES_BIG_SCREEN_QTY))
    } else {
      setShowedMovies(searchedMovies.slice(0, showedMovies.length + MORE_MOVIES_SMALL_SCREEN_QTY))
    }
  }

  useEffect(() => {
    const searchedMoviesInLS = localStorage.getItem('searchedMovies');
    const isShortMoviesInLS = localStorage.getItem('isShortMovies');
    if (searchedMoviesInLS !== null && isShortMoviesInLS !== null) {
      setSearchedMovies(JSON.parse(searchedMoviesInLS));
      setIsShortMovies(JSON.parse(isShortMoviesInLS));
    }
  }, [searchCount])

  useEffect(() => {
    window.addEventListener('resize', traceScreenWidth);
    return () => {
      window.removeEventListener('resize', traceScreenWidth)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', traceWindowOuterWidth)
    return () => {
      window.removeEventListener('resize', traceWindowOuterWidth)
    }
  }, [])

  useEffect(() => {
    if (bigScreenLayout) {
      setShowedMovies(searchedMovies.slice(0, BIG_SCREEN_MOVIES_QTY))
    } else if (middleScreenLayout) {
      setShowedMovies(searchedMovies.slice(0, MIDDLE_SCREEN_MOVIES_QTY));
    } else if (smallScreenLayout) {
      setShowedMovies(searchedMovies.slice(0, SMALL_SCREEN_MOVIES_QTY));
    } else {
      setShowedMovies(searchedMovies);
    }
  }, [screenWidth, windowOuterWidth, searchedMovies, isShortMovies])


  if (isLoading) {
    return (<>
      <SearchForm isShortMovies={isShortMovies}
                  onSearchMovies={onSearchMovies}
                  searchCount={searchCount}
                  onToggle={toggleShortMoviesFilter}/>
      <div className={'movies'}>
        <Preloader movies={true}/>
      </div>
    </>)
  } else if (errorMessage) {
    return (<>
      <SearchForm isShortMovies={isShortMovies}
                  onSearchMovies={onSearchMovies}
                  searchCount={searchCount}
                  onToggle={toggleShortMoviesFilter}/>
      <div className={'movies'}>
        <SearchNotification content={errorMessage}/>
      </div>
    </>)
  } else {
    return (<>
      <SearchForm isShortMovies={isShortMovies}
                  onSearchMovies={onSearchMovies}
                  searchCount={searchCount}
                  onToggle={toggleShortMoviesFilter}/>
      <div className={'movies'}>
        {(searchedMoviesCount === 0 && searchCount !== 0) ?
          <SearchNotification content={'Ничего не найдено'}/> :
          <MoviesCardList onLike={onLike}
                          showedMovies={showedMovies}
                          savedMovies={savedMovies}/>}
        {(showedMovies && searchedMoviesCount !== showedMovies.length) ?
          <div className={'movies__more-films'}>
            <button type={'button'}
                    onClick={handleShowMoreMoviesClick}
                    className={'movies__more-films-button'}>Еще
            </button>
          </div> : null}
      </div>
    </>)
  }
}

export default Movies;
