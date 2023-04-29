import './Portfolio.css';

function Portfolio() {
  return (< div className={'portfolio'}>
      <h3 className={'portfolio__heading'}>Other project completed within the web-development course:</h3>
      <nav className={'portfolio__links'}>
        <a className={'portfolio__link'}
           href={'https://olgatananova.github.io/how-to-learn/'}
           target={'_blank'}
           rel={'noreferrer'}>Landing page</a>
        <a className={'portfolio__link'}
           rel={'noreferrer'}
           href={'https://olgatananova.github.io/russian-travel/index.html'}
           target={'_blank'}>
          Landing page with adaptive layout</a>
        <a className={'portfolio__link portfolio__link_last'}
           rel={'noreferrer'}
           href={'https://olgatananova.github.io/react-mesto-auth/'}
           target={'_blank'}>Single-page application</a>
      </nav>
    </div>)
}

export default Portfolio;
