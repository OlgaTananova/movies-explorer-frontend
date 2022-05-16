import './App.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {Routes, Route, useLocation} from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import SearchForm from '../SearchForm/SearchForm';
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
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [editProfileMessage, setEditProfileMessage] = useState('')
  const [isLiked, setIsLiked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchCount, setSearchCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  function handleEditProfileClick() {
    setIsEditProfile(true);
  }

  function handleEditProfile({name,email}) {
    setIsEditProfile(false);
    setIsLoading(true);
    mainApi.editUserProfile(name, email)
      .then((data) => {
        setCurrentUser({name: data.name, email: data.email});
        setIsLoading(false);
        setEditProfileMessage('Данные пользователя успешно обновлены!')
        setInfoToolTipOpen(true);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsLoading(false);
        setInfoToolTipOpen(true);
      })
  }

  function toggleLike() {
    setIsLiked(!isLiked);
  }


  function tokenCheck() {
    mainApi.verifyUser()
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch((err)=> {
        setErrorMessage(err.message)
      })
  }

  useEffect(()=> {
      tokenCheck();
  }, []);

  useEffect(() => {
    isLoggedIn ? navigate('/movies') : navigate('/');
  }, [isLoggedIn])

  //При монтировании приложения загружаем пользователя и сохраненные фильмы
  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      Promise.all([mainApi.getCurrentUser()])
        .then(([user]) => {
          setIsLoading(false);
          setCurrentUser(user);
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


  function handleLogOut() {
    setIsLoading(true);
    mainApi.logOut()
      .then(()=> {
        setIsLoading(false);
        setIsLoggedIn(false);
        setCurrentUser(null)
        localStorage.clear();
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsLoading(false);
      })

  }

  function closePopups() {
    setInfoToolTipOpen(false);
  }

  function handleSearchMovies(searchInput, isFormValid, isShortMovies) {
    const movies = localStorage.getItem('movies');
    if (!isFormValid) {
      setErrorMessage('Нужно ввести ключевое слово');
      setInfoToolTipOpen(true);
    }
    if (!movies) {
      setIsLoading(true);
      getMovies()
        .then((movies)=> {
          localStorage.setItem('movies', JSON.stringify(movies));
          setIsLoading(false);
          const searchedMovies = searchMovies(movies, isShortMovies, searchInput);
          saveToLocalStorage(searchedMovies, isShortMovies, searchInput);
          setSearchCount(prevState => prevState+1)
        })
        .catch((err)=>{
          setErrorMessage(err.message);
          setIsLoading(false);
        })
    } else {
      const searchedMovies = searchMovies(JSON.parse(movies), isShortMovies, searchInput);
      saveToLocalStorage(searchedMovies, isShortMovies, searchInput);
      setSearchCount(prevState => prevState+1)
    }
  }

  function handleLogin ({email, password}) {
    setIsLoading(true);
    mainApi.signIn(email, password)
      .then((data) => {
        setIsLoading(false);
        setCurrentUser(data);
        setIsLoggedIn(true);
      })
      .catch(err => {
        setErrorMessage(err.message);
        setIsLoading(false);
        setInfoToolTipOpen(true);
      })
  }

  function handleRegister({name, email, password}) {
    setIsLoading(true);
    return mainApi.signUp(name, email, password)
      .then(() => mainApi.signIn(email, password))
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsLoading(false);
        setInfoToolTipOpen(true);
      })
  }



  return (
   <><CurrentUserContext.Provider value={currentUser}>
     <Header isLoggedIn={isLoggedIn}/>
     <Routes>
       <Route path={'/'} element={<Main isLoggedIn={isLoggedIn}/>}> </Route>
       <Route path={'/movies'} element={<ProtectedRoute isLoggedIn={isLoggedIn}>
         <Movies onLike={toggleLike}
                 isLiked={isLiked}
                 isLoading={isLoading}
                 onSearchMovies={handleSearchMovies}
                 errorMessage={errorMessage}
                 searchCount={searchCount}
       /></ProtectedRoute>}>{}</Route>
       <Route path={'/saved-movies'} element={<ProtectedRoute isLoggedIn={isLoggedIn}><SavedMovies isLoggedIn={isLoggedIn}/></ProtectedRoute>}> </Route>
       <Route path={'/profile'} element={<ProtectedRoute isLoggedIn={isLoggedIn}><Profile
         onEditProfileClick={handleEditProfileClick}
         isEditProfile={isEditProfile}
         onEditProfile={handleEditProfile}
         editProfileMessage={editProfileMessage}/></ProtectedRoute>}>{}</Route>
       <Route path={'/signup'} element={<Register onRegister={handleRegister}/>}> </Route>
       <Route path={'/signin'} element={<Login onLogin={handleLogin}/>}> </Route>
       <Route path={'/404'} element={<NotFound/>}> </Route>
       <Route path={'*'} element={<NotFound/>}> </Route>
     </Routes>
     <Footer isLoggedIn={isLoggedIn} onLogOut={handleLogOut}
             isEditProfile={isEditProfile}/>
     <InfoToolTip errorMessage={errorMessage} isOpen={isInfoToolTipOpen} onClose={closePopups}
     editProfileMessage={editProfileMessage}/>
     {(isLoading && (location.pathname !== '/movies' && location.pathname !== '/saved-movies'))&& <Preloader />}
   </CurrentUserContext.Provider>
   </>
  );
}

export default App;
