import './SearchForm.css';
import { useLocation } from 'react-router-dom';
import useForm from '../../utils/useForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import {useMemo} from 'react';
import {useEffect} from 'react';
import {useAppSelector} from '../../store/hooks';
import {setSearchBy} from '../../store/movieSlice';
import {useDispatch} from 'react-redux';

function SearchForm({ isHighRatingMovies, onToggle, onSearchMovies, onSearchSavedMovies, disabled}) {
  const location = useLocation();
  const currentSearch = useAppSelector((state) => state.movie.currentQuery);
  const initialValues = useMemo(()=> {
    return {searchInput: ''}
  }, []);
  const validator = useForm(initialValues);
  const validatorForSavedMovies = useForm(initialValues);
  const isFormValid = validator.isValid;
  const dispatch = useDispatch();

  useEffect(() => {
    validator.setValues((prev) => ({...prev, searchInput: currentSearch}));
  }, [currentSearch])

  function handleFormSubmit(e) {
    e.preventDefault();
    onSearchMovies(validator.values.searchInput, isFormValid, isHighRatingMovies);
  }

  function handleSavedMoviesFormSubmit(e) {
    e.preventDefault()
    onSearchSavedMovies(validatorForSavedMovies.values.searchInput, isHighRatingMovies, validatorForSavedMovies.resetForm);
  }

  function handleSelect(e) {
    dispatch(setSearchBy(e.target.value));
  }

  if ((location.pathname === '/movies' || location.pathname === '/')) {
    return (<form className={'search-form'}
                  name={'search-form'}
                  noValidate={true} onSubmit={handleFormSubmit}>
        <div className={'section section_type_search-form'}>
          <div className={'search-form__main'}>
            <input className={'search-form__input'}
                   type={'text'}
                   placeholder={'Movies'}
                   required={true}
                   name={'searchInput'}
                   value={validator.values.searchInput || ''}
                   onChange={validator.handleChange}/>
            <select className={'search-form__select'} onChange={handleSelect}>
              <option value={'bymovie'}>Movies</option>
              <option value={'byperson'}>People</option>
            </select>
            <button className={'search-form__submit-button'}
                    aria-label={'Submit-button to search movies'}
                    type={'submit'}>{}</button>
          </div>
          <FilterCheckbox isHighRatingMovies={isHighRatingMovies}
                          onToggle={onToggle}/>
        </div>
      </form>)
  } else if (location.pathname === '/saved-movies') {
    return (<form className={'search-form'}
                  name={'search-form'}
                  noValidate={true} onSubmit={handleSavedMoviesFormSubmit}>
      <div className={'section section_type_search-form'}>
        <div className={'search-form__main'}>
          <input className={'search-form__input'}
                 type={'text'}
                 placeholder={'Search saved movies'}
                 required={true}
                 name={'searchInput'}
                 disabled={disabled}
                 value={validatorForSavedMovies.values.searchInput || ''}
                 onChange={validatorForSavedMovies.handleChange}/>
          <button className={'search-form__submit-button'}
                  aria-label={'Submit-button to search movies'}
                  disabled={disabled}
                  type={'submit'}>{}</button>
        </div>
        <FilterCheckbox isHighRatingMovies={isHighRatingMovies}
                        onToggle={onToggle}
                        disabled={disabled}/>
      </div>
    </form>)
  }
  return null
}

export default SearchForm;
