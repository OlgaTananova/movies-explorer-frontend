import './NotFound.css';
import { Link } from 'react-router-dom';

function NotFound() {
  return(
    <div className='not-found'>
        <h1 className='not-found__heading'>404</h1>
        <p className='not-found__subtitle'>Страница не найдена</p>
        <Link className='not-found__return-link' to={'/'}>Назад</Link>
    </div>
  )
}

export default NotFound;
