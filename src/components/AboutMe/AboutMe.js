import './AboutMe.css';
import photo from '../../images/photo.jpg'
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
    <section className={'about-me'}>
      <div className={'section section_narrow section_type_about-me'}>
        <h2 className={'section__heading'}>Студент</h2>
        <div className={'about-me__info'}>
          <article className={'about-me__info-article'}>
            <h3 className={'about-me__info-name'}>Ольга</h3>
            <h4 className={'about-me__info-job'}>Фронтенд-разработчик, 36 лет.</h4>
            <p className={'about-me__info-bio'}>
              Привет! Я училась и долго жила в Екатеринбурге,
              сейчас живу с семьей (мужем и дочерью) в США. Раньше работа в области
              международных поставок и логистики, в декрете решила сменить род деятельности,
              поступила на курсы Яндекс.Практикума и почти их закончила. Как закончу диплом,
              буду искать работу React-разработчиком.
            </p>
            <nav className={'about-me__info-links'}>
              <a className={'about-me__info-link'} href={'https://facebook.com'}>Facebook</a>
              <a className={'about-me__info-link'} href={'https://github.com/OlgaTananova'}>GitHub</a>
            </nav>
          </article>
          <img className={'about-me__info-photo'} alt={'Фото студента'} src={photo}/>
        </div>
        <Portfolio />
      </div>
    </section>
  )
}

export default AboutMe;
