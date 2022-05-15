import './MoviesCard.css';
import {useLocation} from 'react-router-dom';

function MoviesCard({imageLink, heading, duration, trailerLink, isLiked, onLike}) {
  const location = useLocation();
  return (<div className={'movies-card'}>
      <a className={'movies-card__trailer-link'}
         target={'_blank'}
         rel='noreferrer'
         href={trailerLink}><img className={'movies-card__image'}
                                           alt={`Обложка фильма: ${heading}`}
                                           src={imageLink}/></a>
      <div className={'movies-card__description'}>
        <h3 className={'movies-card__heading'}>{heading}</h3>
        {location.pathname === '/saved-movies' ? <button type={'button'}
                                                         className={'movies-card__button movies-card__button_type_delete'}
                                                         aria-label={'Иконка удаление фильма из списка сохраненных фильмов'}>{}</button> :
          <button type={'button'}
                  aria-label={'Иконка сохранения фильма в список сохраненных фильмов'}
                  className={`movies-card__button movies-card__button_type_like ${isLiked && 'movies-card__button_type_like_liked'}`}
                  onClick={onLike}>{}</button>}
      </div>
      <p className={'movies-card__duration'}>{duration}</p>
    </div>)

}

export default MoviesCard;
