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
import {useEffect, useState} from 'react';
import Preloader from '../Preloader/Preloader';
import InfoToolTip from '../InfoToolTip/InfoToolTip';
import getMovies from '../../utils/MoviesApi';
import * as mainApi from '../../utils/MainApi';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {searchMovies, saveToLocalStorage} from '../../utils/utils';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserChecked, setIsUserChecked] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [editProfileMessage, setEditProfileMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMoviesMessage, setErrorMoviesMessage] = useState('');
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchCount, setSearchCount] = useState(0);
  const [savedMovies, setSavedMovies] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  function closePopups() {
    setInfoToolTipOpen(false);
  }

  function handleEditProfileClick() {
    setIsEditProfile(true);
  }

  function tokenCheck() {
    mainApi.verifyUser()
      .then(() => {
        setIsUserChecked(true);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsUserChecked(true);
      })
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      Promise.all([mainApi.getCurrentUser(), mainApi.getSavedMovies()])
        .then(([user, movies]) => {
          setIsLoading(false);
          setCurrentUser(user);
          setSavedMovies(movies);
          setIsLoading(false);
        })
        .catch((err) => {
          setErrorMessage(err.message);
          setIsLoading(false);
          setInfoToolTipOpen(true);
        });
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (!isInfoToolTipOpen) {
      setEditProfileMessage('');
      setErrorMessage('')
    }
  }, [isInfoToolTipOpen])


  function handleEditProfile({name, email}) {
    setIsLoading(true);
    mainApi.editUserProfile(name, email)
      .then((data) => {
        setCurrentUser({name: data.name, email: data.email});
        setIsLoading(false);
        setIsEditProfile(false);
        setEditProfileMessage('Данные пользователя успешно обновлены!')
        setInfoToolTipOpen(true);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsLoading(false);
        setInfoToolTipOpen(true);
      })
  }

  function handleMovieLike(movie) {
    const handledMovie = savedMovies.find((c) => {
      return c.movieId === movie.id
    });
    const isLiked = Boolean(handledMovie);
    const id = handledMovie ? handledMovie._id : null;
    if (isLiked) {
      mainApi.deleteMovie(id)
        .then(() => {
          const newSavedMovies = savedMovies.filter((m) => {
            return m._id !== id
          })
          setSavedMovies(() => newSavedMovies);
        })
        .catch((err) => {
          setErrorMessage(err.message);
          setInfoToolTipOpen(true);
        })
    } else {
      mainApi.saveMovie(movie)
        .then((m) => {
          setSavedMovies((prev) => [...prev, m]);
        })
        .catch((err) => {
          setErrorMessage(err.message);
          setInfoToolTipOpen(true);
        })
    }
  }

  function handleMovieDislike(id) {
    mainApi.deleteMovie(id)
      .then(() => {
        const newSavedMovies = savedMovies.filter((m) => {
          return m._id !== id
        })
        setSavedMovies(() => newSavedMovies);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setInfoToolTipOpen(true);
      })
  }

  function handleSearchMovies(searchInput, isFormValid, isShortMovies) {
    const movies = JSON.parse(localStorage.getItem('movies'));
    if (!isFormValid || !searchInput) {
      setErrorMessage('Нужно ввести ключевое слово');
      setInfoToolTipOpen(true);
    } else if (!movies) {
      setIsLoading(true);
      getMovies()
        .then((moviesList) => {
          localStorage.setItem('movies', JSON.stringify(moviesList));
          setIsLoading(false);
          const searchedFilms = searchMovies(moviesList, isShortMovies, searchInput);
          saveToLocalStorage(searchedFilms, isShortMovies, searchInput);
          setSearchCount(prevState => prevState + 1)
        })
        .catch((err) => {
          setErrorMoviesMessage(err.message)
          setIsLoading(false);
        })
    } else if (searchInput) {
      const searchedFilms = searchMovies(movies, isShortMovies, searchInput);
      saveToLocalStorage(searchedFilms, isShortMovies, searchInput);
      setSearchCount(prevState => prevState + 1);
    }
  }

  function handleLogin({email, password}) {
    setIsLoading(true);
    mainApi.signIn(email, password)
      .then((data) => {
        setIsLoading(false);
        setCurrentUser(data);
        setIsLoggedIn(true);
        setIsUserChecked(true);
        navigate('/movies');
      })
      .catch(err => {
        setErrorMessage(err.message);
        setIsLoading(false);
        setIsUserChecked(true);
        setInfoToolTipOpen(true);
      })
  }

  function handleRegister({name, email, password}) {
    setIsLoading(true);
    return mainApi.signUp(name, email, password)
      .then(() => mainApi.signIn(email, password))
      .then(() => {
        setIsLoggedIn(true);
        setIsUserChecked(true);
        navigate('/movies');
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsLoading(false);
        setIsUserChecked(true);
        setInfoToolTipOpen(true);
      })
  }

  function handleLogOut() {
    setIsLoading(true);
    mainApi.logOut()
      .then(() => {
        setIsUserChecked(false);
        setIsLoading(false);
        setIsLoggedIn(false);
        setCurrentUser(null)
        setSearchCount(0);
        localStorage.clear();
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsLoading(false);
      })
  }


  return (<><CurrentUserContext.Provider value={currentUser}>
    <Header isLoggedIn={isLoggedIn}/>
    <Routes>
      <Route path={'/'}
             element={<Main isLoggedIn={isLoggedIn}/>}> </Route>
      {isUserChecked && <>
        <Route path={'/movies'}
               element={<ProtectedRoute isLoggedIn={isLoggedIn}>
                 <Movies
                        onLike={handleMovieLike}
                         isLoading={isLoading}
                         onSearchMovies={handleSearchMovies}
                         errorMessage={errorMoviesMessage}
                         savedMovies={savedMovies}
                         searchCount={searchCount}/></ProtectedRoute>}>{}</Route>
        <Route path={'/saved-movies'}
               element={<ProtectedRoute isLoggedIn={isLoggedIn}>
                 <SavedMovies savedMovies={savedMovies}
                              isLoading={isLoading}
                              onLike={handleMovieLike}
                              onDislike={handleMovieDislike}/></ProtectedRoute>}> </Route>
        <Route path={'/profile'}
               element={
                 <ProtectedRoute isLoggedIn={isLoggedIn}><Profile onEditProfile={handleEditProfile}
                                                                  isEditProfile={isEditProfile}
                                                                  onEditProfileClick={handleEditProfileClick}
                                                                  onLogOut={handleLogOut}
                                                                  editProfileMessage={editProfileMessage}/></ProtectedRoute>}>{}</Route>
      </>}
      <Route path={'/signup'}
             element={<Register onRegister={handleRegister}/>}> </Route>
      <Route path={'/signin'}
             element={<Login onLogin={handleLogin}/>}> </Route>
      <Route path={'*'}
             element={<NotFound/>}> </Route>
    </Routes>
    <Footer isLoggedIn={isLoggedIn}/>
    <InfoToolTip errorMessage={errorMessage}
                 isOpen={isInfoToolTipOpen}
                 onClose={closePopups}
                 editProfileMessage={editProfileMessage}/>
    {(isLoading && (location.pathname !== '/movies' && location.pathname !== '/saved-movies')) &&
      <Preloader/>}
  </CurrentUserContext.Provider>
  </>);
}

export default App;
