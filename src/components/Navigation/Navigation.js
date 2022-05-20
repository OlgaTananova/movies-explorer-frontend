import './Navigation.css';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import NavigationLinks from '../NavigationLinks/NavigationLinks';
import NavigationPopup from '../NavigationPopup/NavigationPopup';

function Navigation({isLoggedIn}) {
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const [windowOuterWidth, setWindowOuterWidth] = useState(window.outerWidth);
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const showNavBurgerButton = windowOuterWidth <= 768 || screenWidth <= 768;

  function traceScreenWidth() {
    setScreenWidth(window.screen.width);
  }

  function traceWindowOuterWidth() {
    setWindowOuterWidth(window.outerWidth);
  }

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

  function handleOpenBurgerMenuButtonClick() {
    setShowBurgerMenu(true);
  }

  function handleCloseBurgerMenuButtonClick() {
    setShowBurgerMenu(false)
  }

  if (isLoggedIn && !showNavBurgerButton) {
    return (<nav className='navigation'>
      <NavigationLinks/>
    </nav>)
  } else if (isLoggedIn && showNavBurgerButton) {
    return (<nav className='navigation navigation_type_burger'>
      <button className={'navigation__burger-button'}
              type={'button'}
              aria-label={'Кнопка навигации'}
              onClick={handleOpenBurgerMenuButtonClick}>{}</button>
      {showBurgerMenu ? <NavigationPopup showBurgerMenu={showBurgerMenu}
                                         onClose={handleCloseBurgerMenuButtonClick}/> : null}
    </nav>)
  } else {
    return (<nav className='navigation navigation_notLoggedIn'>
      <Link className='navigation__link-item navigation__link-item_type_authorization'
            to={'/signup'}>Регистрация</Link>
      <Link className='navigation__link-item
          navigation__link-item_type_authorization'
            to={'/signin'}>
        <button className='navigation__button'>Войти
        </button>
      </Link>
    </nav>)
  }
}

export default Navigation;
