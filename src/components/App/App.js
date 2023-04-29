import './App.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import {useEffect} from 'react';
import Preloader from '../Preloader/Preloader';
import InfoToolTip from '../InfoToolTip/InfoToolTip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {useDispatch} from 'react-redux'
import {useAppSelector} from '../../store/hooks';

import {
  setInfoToolTipOpenTrue,
  setIsLoadingFalse,
  setIsLoadingTrue,
  setScreenWidth,
  setShowErrorTrue,
  setWindowOuterWidth
} from '../../store/appSlice';
import {
  fetchTrendingMovies,
  setCurrentPage,
  setTotalPageCount,
  setSearchCount,
  searchMovies,
  searchMoviesByPerson,
  setSearchBy,
  fetchSavedMovies,
  likeMovie,
  dislikeMovie
} from '../../store/movieSlice';
import {deleteMovie} from '../../utils/MainApi';

function App() {
  const isUserChecked = useAppSelector((state) => state.app.isUserChecked);
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const currentPage = useAppSelector((state) => state.movie.currentPage);
  const totalPageCount = useAppSelector((state) => state.movie.totalPageCount);
  const screenWidth = useAppSelector((state) => state.app.screenWidth);
  const windowOuterWidth = useAppSelector((state) => state.app.windowOuterWidth);
  const searchedMovies = useAppSelector((state) => state.movie.searchedMovies);
  const currentSearch = useAppSelector((state) => state.movie.currentQuery);
  const dispatch = useDispatch();
  const searchBy = useAppSelector((state) => state.movie.searchBy);
  const savedMovies = useAppSelector((state) => state.movie.savedMovies);
  const location = useLocation();
  const navigate = useNavigate();

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


  // hook to get user's data and saved movies from the main api
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(setIsLoadingTrue(true));
      Promise.all([dispatch(fetchTrendingMovies()).unwrap(), dispatch(fetchSavedMovies()).unwrap()])
        .then((data) => {
          dispatch(setIsLoadingFalse());
        })
        .catch((err) => {
          dispatch(setIsLoadingFalse(false));
          dispatch(setShowErrorTrue(err.message));
          dispatch(setInfoToolTipOpenTrue());
        });
    }
  }, [isLoggedIn])

  //hook to update local storage when the searched movies list is changed
  useEffect(() => {
    localStorage.setItem('searchedMovies', JSON.stringify({
      searchedMovies,
      totalPageCount,
      searchBy
    }));
  }, [currentPage, totalPageCount, searchedMovies])

// function to handle card's like and dislike
  function handleMovieLike(movie) {
    const handledMovie = savedMovies.find((c) => {
      return c.id === movie.id
    });
    const isLiked = Boolean(handledMovie);
    const id = handledMovie ? handledMovie._id : null;
    if (isLiked) {
      dispatch(dislikeMovie({id})).unwrap()
        .catch((err) => {
          dispatch(setShowErrorTrue(err.message));
          dispatch(setInfoToolTipOpenTrue());
        })
    } else {
      dispatch(likeMovie({movie})).unwrap()
        .catch((err) => {
          dispatch(setShowErrorTrue(err.message));
          dispatch(setInfoToolTipOpenTrue());
        })
    }
  }

// function to delete movie from the saved movies list
  function handleMovieDislike(id) {
    dispatch(dislikeMovie({id})).unwrap()
      .catch((err) => {
        dispatch(setShowErrorTrue(err.message));
        dispatch(setInfoToolTipOpenTrue());
      })
  }

  // function to handle search movies
  // it checks if the form is valid and if the search input is not empty
  // it fetch data from the api and save it to the local storage
  function handleSearchMovies(searchInput, isFormValid) {
    const searchByInLS = JSON.parse(localStorage.getItem('searchedMovies'))?.searchBy;
    if (!isFormValid || !searchInput) {
      dispatch(setShowErrorTrue('Please enter a valid search keyword'));
    } else if (isFormValid && searchInput === currentSearch && searchBy === searchByInLS) {

      return;
    } else {
      dispatch(setIsLoadingTrue());
      if (searchBy === 'bymovie') {
        dispatch(searchMovies({query: searchInput, page: 1})).unwrap()
          .then((moviesList) => {
            dispatch(setIsLoadingFalse());
            dispatch(setTotalPageCount(moviesList.total_pages));
            dispatch(setCurrentPage(moviesList.page));
            dispatch(setSearchCount());
          })
          .catch((err) => {
            dispatch(setShowErrorTrue(err.message));
            dispatch(setIsLoadingFalse());
          })
      } else {
        dispatch(searchMoviesByPerson({query: searchInput, page: 1})).unwrap()
          .then((moviesList) => {
            dispatch(setIsLoadingFalse());
            dispatch(setTotalPageCount(moviesList.total_pages));
            dispatch(setCurrentPage(moviesList.page));
            dispatch(setSearchCount());
          })
          .catch((err) => {
            dispatch(setShowErrorTrue(err.message));
            dispatch(setIsLoadingFalse());
          })
      }
    }
  }

  function handlePageChange(page) {
    let cachedMovies = searchedMovies[currentSearch][page];
    let queryType = searchBy === 'bymovie' ? searchMovies({
      query: currentSearch,
      page: page
    }) : searchMoviesByPerson({query: currentSearch, page: page});
    if (!cachedMovies) {
      dispatch(setIsLoadingTrue());
      dispatch(queryType).unwrap()
        .then(() => {
          dispatch(setCurrentPage(page));
        })
        .catch((err) => {
          dispatch(setShowErrorTrue(err.message))
        })
        .finally(() => {
          dispatch(setIsLoadingFalse());
        });
    } else {
      dispatch(setCurrentPage(page));
    }
  }

  function traceScreenWidth() {
    dispatch(setScreenWidth(window.innerWidth));
  }

  function traceWindowOuterWidth() {
    dispatch(setWindowOuterWidth(window.outerWidth));
  }

  return (<>
    <Header isLoggedIn={isLoggedIn}
            screenWidth={screenWidth}
            windowOuterWidth={windowOuterWidth}/>
    <Routes>
      <Route path={'/'}
             element={<Main isLoggedIn={isLoggedIn}
                            onLike={handleMovieLike}
                            onDislike={handleMovieDislike}
                            savedMovies={savedMovies}/>}> </Route>
      {isUserChecked && <>
        <Route path={'/movies'}
               element={<ProtectedRoute isLoggedIn={isLoggedIn}>
                 <Movies onLike={handleMovieLike}
                         onSearchMovies={handleSearchMovies}
                         onPageChange={handlePageChange}/></ProtectedRoute>}>{}</Route>
        <Route path={'/saved-movies'}
               element={<ProtectedRoute isLoggedIn={isLoggedIn}>
                 <SavedMovies onLike={handleMovieLike}
                              onDislike={handleMovieDislike}/></ProtectedRoute>}> </Route>
        <Route path={'/profile'}
               element={<ProtectedRoute isLoggedIn={isLoggedIn}>
                 <Profile/></ProtectedRoute>}>{}</Route>
      </>}
      <Route path={'/signup'}
             element={<Register/>}> </Route>
      <Route path={'/signin'}
             element={<Login/>}> </Route>
      <Route path={'*'}
             element={<NotFound/>}> </Route>
    </Routes>
    <Footer isLoggedIn={isLoggedIn}/>
    <InfoToolTip/>
    {(isLoading && (location.pathname !== '/movies' && location.pathname !== '/saved-movies')) &&
      <Preloader/>}
  </>);
}

export default App;
