import './MoviesCard.css';
import {useLocation} from 'react-router-dom';
import {MOVIE_IMAGE_BASE_URL, MOVIES_DETAILS_BASE_URL} from '../../utils/utils';
import {useEffect, useState} from 'react';

function MoviesCard({
                      poster_path,
                      id,
                      title,
                      release_date,
                      vote_average,
                      overview,
                      onLike,
                      onDislike,
                      savedMovies,
                      image
                    }) {
  const location = useLocation();
  const imageSrc = location.pathname !== '/saved-movies' ? `${MOVIE_IMAGE_BASE_URL}/${poster_path}`: image;
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const likedMovie = savedMovies.find((movie) => {
      return movie.id === id;
    });
    if (likedMovie) {
      setIsLiked(true)
    } else {
      setIsLiked(false);
    }
  }, [savedMovies])

  function handleLike() {
    onLike({
      id: id,
      title: title,
      year: release_date.slice(0, 4),
      rating: vote_average,
      image: imageSrc,
      overview: overview,
      descriptionLink: `${MOVIES_DETAILS_BASE_URL}/${id}`,
    })
  }

  function handleDislike() {
    const dislikedMovie = savedMovies.find((movie) => {
      return movie.id === id;
    })
    onDislike(dislikedMovie._id)
  }

  return (<div className={'movies-card'}>
    <a className={'movies-card__tmdb-link'}
       target={'_blank'}
       rel='noreferrer'
       href={`${MOVIES_DETAILS_BASE_URL}/${id}`}>
      <div className={'movies-card__image-block'}>
        <img className={'movies-card__image'}
             alt={`Poster: ${title}`}
             src={`${imageSrc}`}/></div>
    </a>
    <div className={'movies-card__description'}>
      <h3 className={'movies-card__heading'}>{title}</h3>
      {location.pathname === '/saved-movies' ? <button type={'button'}
                                                       className={'movies-card__button movies-card__button_type_delete'}
                                                       onClick={handleDislike}
                                                       aria-label={'Like&Dislike button'}>{}</button> :
        <button type={'button'}
                aria-label={'Like&Dislike button'}
                className={`movies-card__button movies-card__button_type_like ${isLiked && 'movies-card__button_type_like_liked'}`}
                onClick={handleLike}>{}</button>}
    </div>
    <p className={'movies-card__rating'}>{vote_average}</p>
  </div>)

}

export default MoviesCard;
