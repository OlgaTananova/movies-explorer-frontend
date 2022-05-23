import './Portfolio.css';

function Portfolio() {
  return (< div className={'portfolio'}>
      <h3 className={'portfolio__heading'}>Портфолио</h3>
      <nav className={'portfolio__links'}>
        <a className={'portfolio__link'}
           href={'https://github.com/OlgaTananova/how-to-learn'}
           target={'_blank'}
           rel={'noreferrer'}>Статичный сайт</a>
        <a className={'portfolio__link'}
           rel={'noreferrer'}
           href={'https://github.com/OlgaTananova/russian-travel'}
           target={'_blank'}>
          Адаптивный сайт</a>
        <a className={'portfolio__link portfolio__link_last'}
           rel={'noreferrer'}
           href={'https://github.com/OlgaTananova/react-mesto-api-full'}
           target={'_blank'}>Одностраничное приложение</a>
      </nav>
    </div>)
}

export default Portfolio;
