import './AboutProject.css';

function AboutProject() {
  return (
    <section className={'about-project'}>
    <div className={'section section_narrow section_type_about-project'}>
      <h2 className={'section__heading'}>О проекте</h2>
      <div className={'about-project__description'}>
        <h3 className={'about-project__paragraph-heading'}>Дипломный проект включал 5 этапов</h3>
        <h3 className={'about-project__paragraph-heading'}>На выполнение диплома ушло 5 недель</h3>
        <p className={'about-project__paragraph'}>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <p className={'about-project__paragraph'}>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className={'about-project__schedule'}>
      <span className={'about-project__project-time about-project__project-time_type_frontend'}>1 неделя</span>
      <span className={'about-project__project-time about-project__project-time_type_backend'}>4 недели</span>
      <span className={'about-project__project-part'}>Back-end</span>
      <span className={'about-project__project-part'}>Front-end</span>
    </div>
    </div>
    </section>
  )
}

export default AboutProject;
