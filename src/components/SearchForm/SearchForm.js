import './SearchForm.css';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({isLoggedIn, isShortMovies, onToggle}) {
  const location = useLocation();
  if ( isLoggedIn && (location.pathname === '/movies'
    || location.pathname === '/saved-movies'
  || location.pathname === '/')) {
    return (
      <form className={'search-form'} name={'search-form'} noValidate={true}>
        <div className={'section section_type_search-form'}>
        <div className={'search-form__main'}>
          <input className={'search-form__input'} type={'text'} placeholder={'Фильмы'}/>
          <button className={'search-form__submit-button'} type={'submit'}> </button>
        </div>
        <FilterCheckbox isShortMovies={isShortMovies} onToggle={onToggle}/>
        </div>
      </form>
    )
  }
  return null
}

export default SearchForm;
