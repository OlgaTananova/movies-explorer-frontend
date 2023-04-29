import './Header.css';
import logo from '../../images/logo.svg'
import Navigation from '../Navigation/Navigation';
import {useLocation, Link} from 'react-router-dom';

function Header({isLoggedIn, screenWidth, windowOuterWidth}) {
  const location = useLocation();

  function Logo() {
    return (<Link to={'/'}><img className='logo'
                                      alt='Project logo'
                                      src={logo}/></Link>)
  }

  if (location.pathname === '/' || location.pathname === '/saved-movies' || location.pathname === '/movies' || location.pathname === '/profile') {
    return (<header className={`header ${(!isLoggedIn) ? 'header_promo' : ''}`}>
        <div className='section section_type_header '>
          <Logo/>
          <Navigation screenWidth={screenWidth} windowOuterWidth={windowOuterWidth} isLoggedIn={isLoggedIn}/>
        </div>
      </header>)
  } else if (location.pathname === '/signup' || location.pathname === '/signin') {
    return (<header className='header'>
        <div className='section section_type_header-signup'>
          <Logo/>
        </div>
      </header>)
  }
  return null
}

export default Header;
