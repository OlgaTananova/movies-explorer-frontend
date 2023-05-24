import './Techs.css';

function Techs() {
  return (<section className={'techs'}>
    <div className={'section section_type_techs'}>
      <h2 className={'section__heading section__heading_type_techs'}>Technology stack</h2>
      <h3 className={'techs__subheading'}>8 technologies</h3>
      <p className={'techs__description'}> During the course, we studied the technologies
        {window.screen.width > 321 ? <br/>: null} to build the final project.</p>
      <ul className={'techs__list'}>
        <li className={'tech__list-item'}>HTML</li>
        <li className={'tech__list-item'}>CSS</li>
        <li className={'tech__list-item'}>JS</li>
        <li className={'tech__list-item'}>React</li>
        <li className={'tech__list-item'}>Git</li>
        <li className={'tech__list-item'}>Express.js</li>
        <li className={'tech__list-item'}>mongoDB</li>
        <li className={'tech__list-item'}>Redux</li>
      </ul>
    </div>
  </section>)
}

export default Techs;
