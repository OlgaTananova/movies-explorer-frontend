import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio';
import photo from '../../images/myPhoto.jpg';

function AboutMe() {
  return (<section className={'about-me'}>
      <div className={'section section_type_about-me'}>
        <h2 className={'section__heading section__heading_type_about-me'}>Student</h2>
        <div className={'about-me__info'}>
          <article className={'about-me__info-article'}>
            <h3 className={'about-me__info-name'}>Olga</h3>
            <h4 className={'about-me__info-job'}>Web-developer</h4>
            <p className={'about-me__info-bio'}>
              Hi, I'm Olga, an entry-level web developer with a passion for creating visually appealing and functional websites and applications. After completing Practicum's web development course, I gained hands-on experience with technologies such as JavaScript, TypeScript, CSS, HTML, React, Redux, Git, MongoDB, Webpack, and more.<br/>
              As a web developer, I value teamwork and communication, and I'm always willing to help my colleagues. I have strong interpersonal skills and I'm receptive to constructive feedback. I bring a strong work ethic and attention to detail to my work, and I'm committed to creating quality work. I'm eager to apply my skills and knowledge to a new role and grow as a web developer. </p>
            <nav className={'about-me__info-links'}>
              <a className={'about-me__info-link'}
                 href={'https://www.linkedin.com/in/olga-tananova-9aba0b237/'}>LinkedIn</a>
              <a className={'about-me__info-link'}
                 href={'https://github.com/OlgaTananova'}>GitHub</a>
            </nav>
          </article>
          <img className={'about-me__info-photo'}
               alt={'Photo of Olga'}
               src={photo}/>
        </div>
        <Portfolio/>
      </div>
    </section>)
}

export default AboutMe;
