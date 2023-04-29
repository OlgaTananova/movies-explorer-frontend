import './NotFound.css';
import {useNavigate} from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (<div className='not-found'>
      <h1 className='not-found__heading'>404</h1>
      <p className='not-found__subtitle'>The page was not found.</p>
      <button type={'button'} className='not-found__return-link' onClick={()=> navigate(-1)}
            >Go back</button>
    </div>)
}

export default NotFound;
