import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import {useState} from 'react';
import {useEffect} from 'react';
import SearchNotification from '../SearchNotification/SearchNotification';
import {searchMovies, showHighRatingMovies} from '../../utils/utils';
import {useAppSelector} from '../../store/hooks';
import Pagination from '../Pagination/Pagination';

function SavedMovies({onLike, onDislike}) {
  const savedMovies = useAppSelector((state) => state.movie.savedMovies);
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const [savedMoviesError, setSavedMoviesError] = useState('');
  const [isHighRatingMoviesInSM, setIsHighRatingMoviesInSM] = useState(false);
  const [showedMovies, setShowedMovies] = useState(savedMovies);
  const [savedMoviesSearchCount, setSavedMoviesSearchCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesDistributedPerPage, setMoviesDistributedPerPage] = useState([]);
  const [isSearchMovies, setIsSearchMovies] = useState(false);

  useEffect(() => {
    let currentPage = 1;
    if (savedMovies.length > 0) {
      const movies = savedMovies.reduce((acc, movie, index) => {
        const page = (index+1) % 6;
        if (page !== 0 && !acc[currentPage]) {
          acc[currentPage] = [movie];
        } else if (page !== 0 && acc[currentPage]) {
          acc[currentPage].push(movie);
        } else if (page === 0 && acc[currentPage]) {
          acc[currentPage].push(movie);
          currentPage++;
        }
        return acc;
      }, {});
      setMoviesDistributedPerPage(movies);
    } else {
      setMoviesDistributedPerPage([]);
    }
  }, [savedMovies])

  useEffect(() => {
    if (moviesDistributedPerPage[currentPage] === undefined) {
      const goToThePreviousPage = currentPage - 1;
      if (moviesDistributedPerPage[goToThePreviousPage] === undefined) {
        setSavedMoviesError('You have no saved movies.')
      } else {
        setCurrentPage(goToThePreviousPage);
        setShowedMovies(moviesDistributedPerPage[goToThePreviousPage]);
      }
    } else {
      setShowedMovies(moviesDistributedPerPage[currentPage]);
      setSavedMoviesError('');
    }
  }, [currentPage, moviesDistributedPerPage])


  function handleSearchSavedMovies(searchInput, isHighRatingMovies, reset) {
    setIsSearchMovies(true);
    const searchedFilms = searchMovies(savedMovies, isHighRatingMovies, searchInput);
    if (searchedFilms.length === 0) {
      setSavedMoviesError('No movies found.')
      setShowedMovies([]);
      setSavedMoviesSearchCount((prev) => prev + 1);
      reset();
    } else {
      setShowedMovies(() => searchedFilms);
      setSavedMoviesSearchCount((prev) => prev + 1);
      reset();
    }
  }

  function toggleHighRatingMoviesFilter() {
    setIsHighRatingMoviesInSM(!isHighRatingMoviesInSM)
    if (!isHighRatingMoviesInSM && moviesDistributedPerPage[currentPage]) {
      const showedShortMovies = showHighRatingMovies(moviesDistributedPerPage[currentPage], 'rating');
      if (showedShortMovies.length === 0) {
        setSavedMoviesError('No movies found.');
        setShowedMovies([]);
      } else {
        setShowedMovies(showedShortMovies);
      }
    } else if (isHighRatingMoviesInSM && moviesDistributedPerPage[currentPage]) {
      setSavedMoviesError('');
      setShowedMovies(moviesDistributedPerPage[currentPage]);
    } else {
      setSavedMoviesError('No movies found.');
      setShowedMovies([]);
    }
  }

  function handleSearchClear() {
    setShowedMovies(moviesDistributedPerPage[currentPage] || []);
    setSavedMoviesError('');
    setIsHighRatingMoviesInSM(false);
    setIsSearchMovies(false);
  }

  function handlePageChange(page) {
    setCurrentPage(page);
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
  } else if (isSearchMovies) {
    return (<>
      <SearchForm isHighRatingMovies={isHighRatingMoviesInSM}
                  onSearchSavedMovies={handleSearchSavedMovies}
                  disabled={!savedMovies.length || isSearchMovies}
                  onToggle={toggleHighRatingMoviesFilter}/>
      <div className={'saved-movies'}>
        <button type={'button'}
                className={'saved-movies__return-button'}
                onClick={handleSearchClear}> &#8592; Go back to the main list of the saved movies
        </button>
        <MoviesCardList showedMovies={showedMovies}
                        savedMovies={savedMovies}
                        onLike={onLike}
                        onDislike={onDislike}/>
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
      <Pagination onPageChange={handlePageChange}
                  totalPageCount={Object.keys(moviesDistributedPerPage).length || 0}
                  siblingCount={1}
                  currentPage={currentPage}/>
    </>)
  }
}

export default SavedMovies;
