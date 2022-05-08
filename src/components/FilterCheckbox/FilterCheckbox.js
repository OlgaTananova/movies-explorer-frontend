import './FilterCheckbox.css';

function FilterCheckbox({isShortMovies, onToggle}) {

  function FilterButton() {
      return (<button className={`short-movies-filter__button ${isShortMovies&& 'short-movies-filter__button_active'}`}
                      onClick={onToggle}
                      type={'button'}> </button>)
  }
    return (
      <div className={'short-movies-filter'}>
        <FilterButton />
        <span className={'short-movies-filter__button-name'}>Короткометражки</span>
      </div>
    )
  }

export default FilterCheckbox;
