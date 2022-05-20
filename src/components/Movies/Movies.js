import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import SearchNotification from '../SearchNotification/SearchNotification';
import {useEffect, useState} from 'react';
import {showShortMovies} from '../../utils/utils';

function Movies({ onLike,
                  savedMovies,
                  isLoading,
                  onSearchMovies,
                  searchCount,
                  errorMessage}) {
  const searchedMoviesInLS = JSON.parse(localStorage.getItem('searchedMovies'));
  const isShortMoviesInLS = JSON.parse(localStorage.getItem('isShortMovies'));
  const [searchedMovies, setSearchedMovies] = useState(searchedMoviesInLS? searchedMoviesInLS : []);
  const [isShortMovies, setIsShortMovies] = useState(isShortMoviesInLS? isShortMoviesInLS : false);
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const [windowOuterWidth, setWindowOuterWidth] = useState(window.outerWidth);
  const searchedMoviesCount = searchedMovies.length;
  const bigScreenLayout = (screenWidth > 768 || windowOuterWidth > 768) && searchedMoviesCount >= 12;
  const middleScreenLayout = ((screenWidth > 480 && screenWidth <= 768) || (windowOuterWidth > 480 && windowOuterWidth <= 768)) && searchedMoviesCount >= 8;
  const smallScreenLayout = (screenWidth <= 480 || windowOuterWidth <= 480) && searchedMoviesCount >= 5;
  const [showedMovies, setShowedMovies] = useState(()=> {
    if (bigScreenLayout) {
        return searchedMovies.slice(0,12);
    } else if (middleScreenLayout) {
        return searchedMovies.slice(0, 8);
    } else if (smallScreenLayout){
        return searchedMovies.slice(0,5);
      } else {
        return searchedMovies
      }
  });

  function toggleShortMoviesFilter() {
    setIsShortMovies(!isShortMovies);
    if (!isShortMovies && searchedMovies) {
      const showedShortMovies = showShortMovies(searchedMovies);
      setSearchedMovies(showedShortMovies);
    } else if (isShortMovies && searchedMovies) {
      setSearchedMovies(JSON.parse(localStorage.getItem('searchedMovies')));
    }
  }

  function traceScreenWidth() {
    setScreenWidth(window.screen.width);
  }

  function traceWindowOuterWidth() {
    setWindowOuterWidth(window.outerWidth);
  }

  function handleShowMoreMoviesClick() {
    if (screenWidth > 768 || windowOuterWidth > 768) {
      setShowedMovies(searchedMovies.slice(0, showedMovies.length+3))
    }
    // else if ((screenWidth > 480 && screenWidth <= 768) || (windowOuterWidth > 480 && windowOuterWidth <= 768)) {
    //   setShowedMovies(searchedMovies.slice(0, showedMovies.length+2))
    // }
    else {
      setShowedMovies(searchedMovies.slice(0, showedMovies.length+2))
    }
  }

   useEffect(() => {
     const searchedMoviesInLS = localStorage.getItem('searchedMovies');
     const isShortMoviesInLS = localStorage.getItem('isShortMovies')
     if (searchedMoviesInLS !== null  && isShortMoviesInLS !== null) {
       setSearchedMovies(JSON.parse(searchedMoviesInLS));
       setIsShortMovies(JSON.parse(isShortMoviesInLS));
     }
  },[searchCount])

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

  useEffect(() => {
      if (bigScreenLayout) {
        setShowedMovies(searchedMovies.slice(0, 12))
      } else if (middleScreenLayout) {
        setShowedMovies(searchedMovies.slice(0, 8));
      } else if (smallScreenLayout) {
        setShowedMovies(searchedMovies.slice(0, 5));
      } else {
        setShowedMovies(searchedMovies);
      }
  },[screenWidth, windowOuterWidth, searchedMovies, isShortMovies])


    if (isLoading) {
      return (
        <>
        <SearchForm
          isShortMovies={isShortMovies}
          onSearchMovies={onSearchMovies}
          searchCount={searchCount}
          onToggle={toggleShortMoviesFilter}/>
      <div className={'movies'}>
        <Preloader movies={true} />
      </div>
        </>
      )
    } else if (errorMessage) {
      return (<>
        <SearchForm
          isShortMovies={isShortMovies}
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
          {(showedMovies.length === 0 && searchCount !==0)?
            <SearchNotification content={'Ничего не найдено'}/> :
              <MoviesCardList onLike={onLike}
                              showedMovies={showedMovies}
                              savedMovies={savedMovies}
              />}
              {(searchedMoviesCount !== showedMovies.length)? <div className={'movies__more-films'}>
                <button type={'button'}
                        onClick={handleShowMoreMoviesClick}
                        className={'movies__more-films-button'}>Еще
                </button>
              </div>
              : null}
        </div>
      </>)
    }
}

export default Movies;
