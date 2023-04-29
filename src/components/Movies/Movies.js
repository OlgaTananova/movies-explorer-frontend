import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import SearchNotification from '../SearchNotification/SearchNotification';
import {useEffect, useState} from 'react';
import {
  showHighRatingMovies,
  BIG_SCREEN_MOVIES_QTY,
  MIDDLE_SCREEN_MOVIES_QTY,
  SMALL_SCREEN_MOVIES_QTY,
  MORE_MOVIES_BIG_SCREEN_QTY,
  MORE_MOVIES_SMALL_SCREEN_QTY,
  BIG_SCREEN,
  SMALL_SCREEN,
} from '../../utils/utils';
import Pagination from '../Pagination/Pagination';
import {useAppSelector} from '../../store/hooks';

function Movies({
                  onLike, onSearchMovies, onPageChange,
                }) {
  const currentPage = useAppSelector((state) => state.movie.currentPage);
  const totalPageCount = useAppSelector((state) => state.movie.totalPageCount);
  const currentSearch = useAppSelector((state) => state.movie.currentQuery);
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const searchCount = useAppSelector((state) => state.movie.searchCount);
  const errorMessage = useAppSelector((state) => state.app.errorMessage);
  const screenWidth = useAppSelector((state) => state.app.screenWidth);
  const windowOuterWidth = useAppSelector((state) => state.app.windowOuterWidth);
  const searchedMoviesInStore = useAppSelector((state) => state.movie.searchedMovies);
  const searchBy = useAppSelector((state) => state.movie.searchBy);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [highRatingMovies, setHighRatingMovies] = useState([]);
  const [showedMovies, setShowedMovies] = useState([]);
  const [isHighRatingMovies, setIsHighRatingMovies] = useState(false);
  const searchedMoviesCount = searchedMovies ? searchedMovies.length : 0;
  const bigScreenLayout = (screenWidth > BIG_SCREEN || windowOuterWidth > BIG_SCREEN) && searchedMoviesCount >= BIG_SCREEN_MOVIES_QTY;
  const middleScreenLayout = ((screenWidth > SMALL_SCREEN && screenWidth <= BIG_SCREEN) || (windowOuterWidth > SMALL_SCREEN && windowOuterWidth <= BIG_SCREEN)) && searchedMoviesCount >= MIDDLE_SCREEN_MOVIES_QTY;
  const smallScreenLayout = (screenWidth <= SMALL_SCREEN || windowOuterWidth <= SMALL_SCREEN) && searchedMoviesCount >= SMALL_SCREEN_MOVIES_QTY;

  // There are 3 states used to show the movies:
  // searchedMoviesInStore - movies from the store (all pages)
  // searchedMovies - movies from the store (current page)
  // highRatingMovies - movies from the store (current page) with rating >= 6
  // showedMovies - movies from the store (current page) with rating >= 6
  // and quantity depends on the screen width
  // isHighRatingMovies - flag to show all movies or only with rating >= 6

  // hook to update the searchedMovies and highRatingMovies when the page is changed or the search query is changed
  useEffect(() => {
    if (Object.keys(searchedMoviesInStore).length > 0) {
      setSearchedMovies(searchedMoviesInStore[currentSearch][currentPage]);
      setHighRatingMovies(showHighRatingMovies(searchedMoviesInStore[currentSearch][currentPage], 'vote_average'));
    }
  }, [currentPage, currentSearch, searchedMoviesInStore, searchBy]);

  // hook to update the showedMovies when the screen width is changed
  useEffect(() => {
    if (Object.keys(searchedMoviesInStore).length > 0) {
      const moviesToShow = isHighRatingMovies ? highRatingMovies : searchedMovies;
      if (bigScreenLayout) {
        setShowedMovies(moviesToShow.slice(0, BIG_SCREEN_MOVIES_QTY));
      } else if (middleScreenLayout) {
        setShowedMovies(moviesToShow.slice(0, MIDDLE_SCREEN_MOVIES_QTY));
      } else if (smallScreenLayout) {
        setShowedMovies(moviesToShow.slice(0, SMALL_SCREEN_MOVIES_QTY));
      } else {
        setShowedMovies(moviesToShow);
      }
    }
  }, [highRatingMovies, searchedMovies, searchedMoviesInStore, isHighRatingMovies])

  function toggleHighRatingMovies() {
    setIsHighRatingMovies(!isHighRatingMovies);
  }

  // function to show more movies when the button is clicked
  function handleShowMoreMoviesClick() {
    let movies = isHighRatingMovies ? highRatingMovies : searchedMovies;
    if (screenWidth > BIG_SCREEN || windowOuterWidth > BIG_SCREEN) {
      setShowedMovies(movies.slice(0, showedMovies.length + MORE_MOVIES_BIG_SCREEN_QTY))
    } else {
      setShowedMovies(movies.slice(0, showedMovies.length + MORE_MOVIES_SMALL_SCREEN_QTY))
    }
  }

  if (isLoading) {
    return (<>
      <SearchForm isHighRatingMovies={isHighRatingMovies}
                  onSearchMovies={onSearchMovies}
                  searchCount={searchCount}
                  onToggle={toggleHighRatingMovies}/>
      <div className={'movies'}>
        <Preloader movies={true}/>
      </div>
    </>)
  } else if (errorMessage) {
    return (<>
      <SearchForm isHighRatingMovies={isHighRatingMovies}
                  onSearchMovies={onSearchMovies}
                  onToggle={toggleHighRatingMovies}/>
      <div className={'movies'}>
        <SearchNotification content={errorMessage}/>
      </div>
    </>)
  } else {
    return (<>
      <SearchForm isHighRatingMovies={isHighRatingMovies}
                  onSearchMovies={onSearchMovies}
                  searchCount={searchCount}
                  onToggle={toggleHighRatingMovies}/>
      <div className={'movies'}>
        {searchCount !== 0 && showedMovies.length === 0 ?
          <SearchNotification content={'Nothing was found.'}/> :
          <MoviesCardList onLike={onLike}
                          showedMovies={showedMovies}/>}
        {(!isHighRatingMovies && searchedMovies.length !== showedMovies.length) || (isHighRatingMovies && showedMovies.length !== highRatingMovies.length) ?
          <div className={'movies__more-films'}>
            <button type={'button'}
                    onClick={handleShowMoreMoviesClick}
                    className={'movies__more-films-button'}>Show more
            </button>
          </div> : null}
      </div>
      {(showedMovies.length !== 0) ? <Pagination onPageChange={onPageChange}
                                                 currentPage={currentPage}
                                                 totalPageCount={totalPageCount}
                                                 siblingCount={1}/> : null}
    </>)
  }
}

export default Movies;
