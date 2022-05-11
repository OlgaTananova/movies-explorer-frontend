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


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
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
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return
    }
    setIsLoggedIn(true);
  }

  useEffect(()=> {
      tokenCheck();
  }, []);


  function handleLogOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
  }

  function handleLogIn() {
    localStorage.setItem('jwt', '123');
    setIsLoggedIn(true);
  }

  return (
   <>
     <Header isLoggedIn={isLoggedIn} onLogIn={handleLogIn}/>
     <SearchForm isLoggedIn={isLoggedIn} isShortMovies={isShortMovies} onToggle={toggleShortMoviesFilter}/>
    <Routes>
      <Route path={'/'} element={<Main isLoggedIn={isLoggedIn}/>}> </Route>
      <Route path={'/movies'} element={<Movies isLoggedIn={isLoggedIn}
                                               onLike={toggleLike}
                                               isLiked={isLiked}
      />}> </Route>
      <Route path={'/saved-movies'} element={<SavedMovies isLoggedIn={isLoggedIn}/>}> </Route>
      <Route path={'/profile'} element={<Profile
        onEditProfile={handleEditProfile}
      isEditProfile={isEditProfile}
      onFormSubmit={handleFormSubmit}/>}>
      </Route>
      <Route path={'/signup'} element={<Register/>}> </Route>
      <Route path={'/signin'} element={<Login/>}> </Route>
      <Route path={'/404'} element={<NotFound/>}> </Route>
      <Route path={'*'} element={<NotFound/>}> </Route>
    </Routes>
     <Footer isLoggedIn={isLoggedIn} onLogOut={handleLogOut}
             isEditProfile={isEditProfile}/>
   </>
  );
}

export default App;
