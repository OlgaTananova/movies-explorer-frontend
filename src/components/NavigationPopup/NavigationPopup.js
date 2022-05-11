import './NavigationPopup.css'
import {Link} from 'react-router-dom';
import NavigationLinks from '../NavigationLinks/NavigationLinks';

function NavigationPopup({showBurgerMenu, onClose}) {


  return (
    <div className={'navigation-popup'}>
      <ul className={'navigation-popup__container'}>
        <button type={'button'} aria-label={'Кнопка закрытия модального окна навигации'}
                className={'navigation-popup__close-button'} onClick={onClose}>{}</button>
        <li className={`navigation__link ${showBurgerMenu? 'navigation__link_type_main' : ''}`}>
          <Link className={`navigation__link-item
          ${showBurgerMenu? 'navigation__link-item_type_burger' : ''}`} to={'/'}
          onClick={onClose}>Главная</Link></li>
        <NavigationLinks showBurgerMenuStyle={showBurgerMenu} onClose={onClose}/>
      </ul>

    </div>
  )
}

export default NavigationPopup;
