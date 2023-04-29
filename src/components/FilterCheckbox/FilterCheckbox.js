import './FilterCheckbox.css';

function FilterCheckbox({isHighRatingMovies, onToggle, disabled}) {

  function FilterButton() {
    return (
      <button className={`high-rating-filter__button ${isHighRatingMovies && 'high-rating-filter__button_active'}`}
              onClick={onToggle}
              type={'button'}
              disabled={disabled}
              aria-label={'Toggle-button to filter high-rating movies'}>{}</button>)
  }

  return (<div className={'high-rating-filter'}>
      <FilterButton/>
      <span className={'high-rating-filter__button-name'}>Movies with high rating</span>
    </div>)
}

export default FilterCheckbox;
