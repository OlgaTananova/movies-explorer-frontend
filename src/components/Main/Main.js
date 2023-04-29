import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {useAppSelector} from '../../store/hooks';

function Main({isLoggedIn, onLike, onDislike, savedMovies}) {
  if (!isLoggedIn) {
    return (<main>
      <Promo/>
      <AboutProject/>
      <Techs/>
      <AboutMe/>
    </main>)
  } else {
    return (<>
      <h2 className={'main-heading'}>Trending movies</h2>
      <MoviesCardList
                      onLike={onLike}
                      onDislike={onDislike}
                      savedMovies={savedMovies}/>
    </>)
  }
}

export default Main;
