import './NotFound.css';
import { Link } from 'react-router-dom';

function NotFound() {
  return(
    <div className='notFound'>
        <h1 className='notFound__heading'>404</h1>
        <p className='notFound__subtitle'>Страница не найдена</p>
        <Link className='notFound__return-link' to={'/'}>Назад</Link>
    </div>
  )
}

export default NotFound;
