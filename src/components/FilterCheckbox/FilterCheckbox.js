import './FilterCheckbox.css';

function FilterCheckbox({isShortMovies, onToggle, disabled}) {

  function FilterButton() {
    return (
      <button className={`short-movies-filter__button ${isShortMovies && 'short-movies-filter__button_active'}`}
              onClick={onToggle}
              type={'button'}
              disabled={disabled}
              aria-label={'Переключатель короткометражных фильмов'}>{}</button>)
  }

  return (<div className={'short-movies-filter'}>
      <FilterButton/>
      <span className={'short-movies-filter__button-name'}>Короткометражки</span>
    </div>)
}

export default FilterCheckbox;
