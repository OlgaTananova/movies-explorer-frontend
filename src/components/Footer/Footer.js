import './Footer.css';
import {useLocation, Link} from 'react-router-dom';

function Footer() {
  const location = useLocation();
  if (location.pathname === '/' || location.pathname === '/saved-movies' || location.pathname === '/movies') {
    return (<footer className='footer'>
        <div className='section section_type_footer'>
          <p className='footer__heading footer-text'>The project was created within Practicum web-development course.</p>
          <div className={'footer__heading-block'}>
            <p className='footer__heading footer-text footer-TMDB'>The project was build using TMDB API</p>
            <span className={'footer-icon'}>{}</span>
          </div>
          <div className='footer__links-copyright-element'>
            <span className='footer__copyright footer-text'>&#64; 2022</span>
            <nav className='footer__social-icons'>
              <a href='https://practicum.yandex.ru'
                 target='_blank'
                 rel="noreferrer"
                 className='footer__social-icon footer-text'>Practicum</a>
              <a href='https://github.com/OlgaTananova'
                 target='_blank'
                 rel="noreferrer"
                 className='footer__social-icon footer-text'>GitHub</a>
            </nav>
          </div>
        </div>
      </footer>)
  } else if (location.pathname === '/signup') {
    return (<footer className='footer'>
        <div className='section section_type_footer-signup'>
          <span className='footer__auth-text footer__auth-text_type_question'>Already have an account?</span>
          <Link className='footer__auth-text footer__auth-text_type_link'
                to='/signin'>Log in</Link>
        </div>
      </footer>)
  } else if (location.pathname === '/signin') {
    return (<footer className='footer'>
        <div className='section section_type_footer-signup'>
          <span className='footer__auth-text footer__auth-text_type_question'>Not signed up yet?</span>
          <Link className='footer__auth-text footer__auth-text_type_link'
                to='/signup'>Sign up</Link>
        </div>
      </footer>)
  }
  return null
}

export default Footer;
