import './Techs.css';

function Techs() {
  return (<section className={'techs'}>
    <div className={'section section_type_techs'}>
      <h2 className={'section__heading section__heading_type_techs'}>Технологии</h2>
      <h3 className={'techs__subheading'}>7 технологий</h3>
      <p className={'techs__description'}>На курсе веб-разработки мы освоили
                                          технологии,
                                          которые применили
        {window.screen.width > 321 ? <br/> : null} в дипломном проекте.</p>
      <ul className={'techs__list'}>
        <li className={'tech__list-item'}>HTML</li>
        <li className={'tech__list-item'}>CSS</li>
        <li className={'tech__list-item'}>JS</li>
        <li className={'tech__list-item'}>React</li>
        <li className={'tech__list-item'}>Git</li>
        <li className={'tech__list-item'}>Express.js</li>
        <li className={'tech__list-item'}>mongoDB</li>
      </ul>
    </div>
  </section>)
}

export default Techs;
