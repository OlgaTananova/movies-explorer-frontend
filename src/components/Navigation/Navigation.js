import './Navigation.css';
import { NavLink, Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import NavigationLinks from '../NavigationLinks/NavigationLinks';
import NavigationPopup from '../NavigationPopup/NavigationPopup';

function Navigation({isLoggedIn, onLogIn}) {
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  function traceScreenWidth() {
    setScreenWidth(window.screen.width);
  }
  useEffect(() => {
    window.addEventListener('resize', traceScreenWidth)
    return () => {
      window.removeEventListener('resize', traceScreenWidth)
    }
  })

  function handleOpenBurgerMenuButtonClick() {
    setShowBurgerMenu(true);
  }

  function handleCloseBurgerMenuButtonClick() {
    setShowBurgerMenu(false)
  }

  if (isLoggedIn && screenWidth >= 769) {
    return (<nav className='navigation'>
      <NavigationLinks />
    </nav>)
  } else if (isLoggedIn && screenWidth <= 768) {
    return (
      <nav className='navigation navigation_type_burger'>
        <button className={'navigation__burger-button'}
                type={'button'}
                aria-label={'Кнопка навигации'}
                onClick={handleOpenBurgerMenuButtonClick}>{}</button>
        {showBurgerMenu? <NavigationPopup showBurgerMenu={showBurgerMenu} onClose={handleCloseBurgerMenuButtonClick}/> : null}
      </nav>
    )
  } else {
    return (<nav className='navigation navigation_notLoggedIn'>
      <Link className='navigation__link-item navigation__link-item_type_authorization'
            to={'/signup'}>Регистрация</Link>
      <Link className='navigation__link-item
          navigation__link-item_type_authorization'
            to={'/signin'}>
        <button className='navigation__button'
                onClick={onLogIn}>Войти
        </button>
      </Link>
    </nav>)
  }
}

export default Navigation;
