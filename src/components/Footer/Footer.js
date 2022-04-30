import './Footer.css';
import {useLocation, Link } from 'react-router-dom';

function Footer({isLoggedIn, onLogOut, isEditProfile}) {
  const location = useLocation();
  if (location.pathname === '/' || location.pathname === '/saved-movies' ||
    location.pathname === '/movies') {
    return (
      <footer className='footer'>
        <div className='footer__section section section_narrow'>
          <p className='footer__heading footer-text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
          <div className='footer__links-copyright-element'>
            <span className='footer__copyright footer-text'>&#64; 2022</span>
            <nav className='footer__social-icons'>
              <a href='https://practicum.yandex.ru' target='_blank'  rel="noreferrer" className='footer__social-icon footer-text'>Яндекс.Практикум</a>
              <a href='https://github.com/OlgaTananova' target='_blank'  rel="noreferrer" className='footer__social-icon footer-text'>GitHub</a>
              <a href='https://www.facebook.com/' target='_blank'  rel="noreferrer" className='footer__social-icon footer-text'>Facebook</a>
            </nav>
          </div>
        </div>
      </footer>
    )
  } else if (location.pathname ==='/profile') {
    return (
      <footer className='footer'>
        <div className='footer__section section section_narrow'>
          {!isEditProfile&& <Link className='footer__logout-link footer-text' to={'/'} onClick={onLogOut}>Выйти из аккаунта</Link>}
        </div>
      </footer>
    )
  }
  return
}

export default Footer;
