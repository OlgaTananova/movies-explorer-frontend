import './Navigation.css';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import NavigationLinks from '../NavigationLinks/NavigationLinks';
import NavigationPopup from '../NavigationPopup/NavigationPopup';
import {BIG_SCREEN} from '../../utils/utils';

function Navigation({isLoggedIn, windowOuterWidth, screenWidth}) {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const showNavBurgerButton = windowOuterWidth <= BIG_SCREEN || screenWidth <= BIG_SCREEN;

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
              aria-label={'Navigation button'}
              onClick={handleOpenBurgerMenuButtonClick}>{}</button>
      {showBurgerMenu ? <NavigationPopup showBurgerMenu={showBurgerMenu}
                                         onClose={handleCloseBurgerMenuButtonClick}/> : null}
    </nav>)
  } else {
    return (<nav className='navigation navigation_notLoggedIn'>
      <Link className='navigation__link-item navigation__link-item_type_authorization'
            to={'/signup'}>Sign up</Link>
      <Link className='navigation__link-item
          navigation__link-item_type_authorization'
            to={'/signin'}>
        <button className='navigation__button'>Log in
        </button>
      </Link>
    </nav>)
  }
}

export default Navigation;
