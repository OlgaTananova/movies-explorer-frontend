import './Navigation.css';
import { NavLink, Link } from 'react-router-dom';

function Navigation({isLoggedIn, onLogIn}) {
  if (isLoggedIn) {
    return (<nav className='navigation'>
      <div className='navigation__block-movies'>
        <li className='navigation__link'><NavLink to={'/movies'}
                                                  className={({ isActive }) => `navigation__link-item
                                                  ${isActive&& 'navigation__link-item_active'}`}>Фильмы</NavLink>
        </li>
        <li className='navigation__link'><NavLink to={'/saved-movies'}
                                                  className={({ isActive }) => `navigation__link-item
                                                  ${isActive&& 'navigation__link-item_active'}`}>Сохраненные
                                                                                                 фильмы</NavLink>
        </li>
      </div>
      <li className='navigation__link'>
        <NavLink to={'/profile'}
                 className='navigation__link-item navigation__link-item_type_account'>
          Аккаунт
          <div className='navigation__account-logo'> </div>
        </NavLink></li>
    </nav>)
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
