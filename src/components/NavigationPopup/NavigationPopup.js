import './NavigationPopup.css'
import {Link} from 'react-router-dom';
import NavigationLinks from '../NavigationLinks/NavigationLinks';
import {useEffect} from 'react';

function NavigationPopup({showBurgerMenu, onClose}) {
  function handleOverlayClose(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  useEffect(() => {

    function handleEscClose(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [onClose])

  return (<div className={'navigation-popup'}
               onClick={handleOverlayClose}>
      <ul className={'navigation-popup__container'}>
        <button type={'button'}
                aria-label={'Кнопка закрытия модального окна навигации'}
                className={'navigation-popup__close-button'}
                onClick={onClose}>{}</button>
        <li className={`navigation__link ${showBurgerMenu ? 'navigation__link_type_main' : ''}`}>
          <Link className={`navigation__link-item
          ${showBurgerMenu ? 'navigation__link-item_type_burger' : ''}`}
                to={'/movies'}
                onClick={onClose}>Главная</Link></li>
        <NavigationLinks showBurgerMenuStyle={showBurgerMenu}
                         onClose={onClose}/>
      </ul>
    </div>)
}

export default NavigationPopup;
