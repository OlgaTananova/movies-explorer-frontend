import './Header.css';
import logo from '../../images/logo.svg'
import Navigation from '../Navigation/Navigation';
import {useLocation, Link} from 'react-router-dom';

function Header({isLoggedIn, onLogIn}) {
  const location = useLocation();
  if (location.pathname === '/' || location.pathname === '/saved-movies' ||
  location.pathname === '/movies' || location.pathname === '/profile') {
    return(
      <header className={`header ${(!isLoggedIn)? 'header_promo': ''}`}>
        <div className='header__section section  section_narrow '>
          <Link to={'/'}><img className='logo' alt='Логотип проекта' src={logo}/></Link>
          <Navigation isLoggedIn={isLoggedIn} onLogIn={onLogIn}/>
        </div>
      </header>
    )
  } else if (location.pathname === '/signup') {
    return (
      <header>

      </header>
    )
  } else if (location.pathname === '/signin') {
    return (
      <header>

      </header>
    )
  }
  return
}

export default Header;
