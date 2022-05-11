import './NavigationLinks.css';
import {NavLink} from 'react-router-dom';

function NavigationLinks({showBurgerMenuStyle, onClose}) {
  return (<>
      <div className={`navigation__block-movies 
      ${showBurgerMenuStyle ? 'navigation__block-movies_type_burger' : ''}`}>
        <li className='navigation__link'>
          <NavLink to={'/movies'}
                   onClick={onClose}
                   className={({isActive}) => `navigation__link-item
                   ${showBurgerMenuStyle ? 'navigation__link-item_type_burger' : ''}
                   ${isActive && 'navigation__link-item_active'}`}>Фильмы</NavLink>
        </li>
        <li className='navigation__link'>
          <NavLink to={'/saved-movies'}
                   onClick={onClose}
                   className={({isActive}) => `navigation__link-item
                   ${isActive && 'navigation__link-item_active'}
                   ${showBurgerMenuStyle ? 'navigation__link-item_type_burger' : ''}`}>Сохраненные
                                                                                       фильмы</NavLink>
        </li>
      </div>
      <li className={`navigation__link ${showBurgerMenuStyle ? 'navigation__link_type_account' : ''}`}>
        <NavLink to={'/profile'}
                 onClick={onClose}
                 className='navigation__link-item navigation__link-item_type_account'>
          Аккаунт
          <div className='navigation__account-logo'></div>
        </NavLink></li>
    </>)
}

export default NavigationLinks;
