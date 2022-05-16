import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import SearchNotification from '../SearchNotification/SearchNotification';
import {useEffect, useState} from 'react';

function Movies({
                  onLike,
                  isLiked,
                  isLoading,
                  onSearchMovies,
                  searchCount,
                  errorMessage}) {
  const [searchedMovies, setSearchedMovies] = useState(JSON.parse(localStorage.getItem('searchedMovies')));
  const [isShortMovies, setIsShortMovies] =
    useState(localStorage.getItem('isShortMovies') !== null?
      JSON.parse(localStorage.getItem('isShortMovies'))
    : false);
  const searchedMoviesCount = searchedMovies&& searchedMovies.length;

  function toggleShortMoviesFilter() {
    setIsShortMovies(!isShortMovies);
  }

  useEffect(() => {
    setSearchedMovies(JSON.parse(localStorage.getItem('searchedMovies')));
    setIsShortMovies(JSON.parse(localStorage.getItem('isShortMovies')));
  },[searchCount])


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
          {(searchedMovies && searchedMoviesCount === 0)?
            <SearchNotification content={'Ничего не найдено'}/> :
              <MoviesCardList onLike={onLike}
                              isLiked={isLiked}
                              searchedMovies={searchedMovies}/>}
              {(searchedMoviesCount && searchedMoviesCount !== 0)? <div className={'movies__more-films'}>
                <button type={'button'}
                        className={'movies__more-films-button'}>Еще
                </button>
              </div>
              : null}
        </div>
      </>)
    }
}

export default Movies;
