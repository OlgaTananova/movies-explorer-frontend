import './App.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import InfoToolTip from '../InfoToolTip/InfoToolTip';
import {getMovies} from '../../utils/MoviesApi';
import * as mainApi from '../../utils/MainApi';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleEditProfile() {
    setIsEditProfile(true);
  }

  function handleFormSubmit() {
    setIsEditProfile(false);
    navigate('/');
  }

  function toggleShortMoviesFilter() {
    setIsShortMovies(!isShortMovies);
  }

  function toggleLike() {
    setIsLiked(!isLiked);
  }


  function tokenCheck() {
    mainApi.verifyUser()
      .then((data) => {
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



  function handleLogOut() {
    setIsLoading(true);
    mainApi.logOut()
      .then(()=> {
        setIsLoading(false);
        setIsLoggedIn(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsLoading(false);
      })

  }


  function closePopups() {
    setInfoToolTipOpen(false);
  }

  function handleSearchMovies(searchInput, isFormValid) {
    if (!isFormValid) {
      setErrorMessage('Нужно ввести ключевое слово');
      setInfoToolTipOpen(true);
    }
    setIsLoading(true);
    navigate('/movies');
    getMovies()
      .then((movies)=> {
        setIsLoading(false);
      })
      .catch((err)=>{
        setErrorMessage(err.message);
        setIsLoading(false);
        setInfoToolTipOpen(true);
      })
  }

  function handleLogin ({email, password}) {
    setIsLoading(true);
    mainApi.signIn(email, password)
      .then((res) => {
        setIsLoading(false);
        setIsLoggedIn(true);
      })
      .catch(err => {
        setIsLoading(false);
        setErrorMessage(err.message);
        setInfoToolTipOpen(true);
      })
  }

  function handleRegister({name, email, password}) {
    setIsLoading(true);
    mainApi.signUp(name, email, password)
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err);
      })

  }

  return (
   <><CurrentUserContext.Provider value={currentUser}>
     <Header isLoggedIn={isLoggedIn}/>
     <SearchForm isLoggedIn={isLoggedIn}
                 isShortMovies={isShortMovies}
                 onSearchMovies={handleSearchMovies}
                 onToggle={toggleShortMoviesFilter}/>
     <Routes>
       <Route path={'/'} element={<Main isLoggedIn={isLoggedIn}/>}> </Route>
       <Route path={'/movies'} element={<Movies isLoggedIn={isLoggedIn}
                                                onLike={toggleLike}
                                                isLiked={isLiked}
                                                isLoading={isLoading}
       />}> </Route>
       <Route path={'/saved-movies'} element={<SavedMovies isLoggedIn={isLoggedIn}/>}> </Route>
       <Route path={'/profile'} element={<Profile
         onEditProfile={handleEditProfile}
         isEditProfile={isEditProfile}
         onFormSubmit={handleFormSubmit}/>}>
       </Route>
       <Route path={'/signup'} element={<Register onRegister={handleRegister}/>}> </Route>
       <Route path={'/signin'} element={<Login onLogin={handleLogin}/>}> </Route>
       <Route path={'/404'} element={<NotFound/>}> </Route>
       <Route path={'*'} element={<NotFound/>}> </Route>
     </Routes>
     <Footer isLoggedIn={isLoggedIn} onLogOut={handleLogOut}
             isEditProfile={isEditProfile}/>
     <InfoToolTip errorMessage={errorMessage} isOpen={isInfoToolTipOpen} onClose={closePopups}/>
     {isLoading&& <Preloader />}
   </CurrentUserContext.Provider>
   </>
  );
}

export default App;
