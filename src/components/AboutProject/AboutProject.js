import './AboutProject.css';

function AboutProject() {
  return (
    <section className={'about-project'}>
    <div className={'section section_type_about-project'}>
      <h2 className={'section__heading'}>{'About the project'}</h2>
      <div className={'about-project__description'}>
        <h3 className={'about-project__paragraph-heading about-project__paragraph-heading_upper'}>The final project consisted of 5 stages:</h3>
        <h3 className={'about-project__paragraph-heading about-project__paragraph-heading_lower'}>It took 5 weeks to complete it.</h3>
        <p className={'about-project__paragraph about-project__paragraph_upper'}>The process includes planning, working on the backend, designing the layout, implementing additional functionality, and making final refinements.</p>
        <p className={'about-project__paragraph about-project__paragraph_lower'}>To successfully defend the final project, it was necessary to meet both soft and hard deadlines for each stage of the process.</p>
      </div>
      <div className={'about-project__schedule'}>
      <span className={'about-project__project-time about-project__project-time_type_frontend'}>1 week</span>
      <span className={'about-project__project-time about-project__project-time_type_backend'}>4 weeks</span>
      <span className={'about-project__project-part'}>Back-end</span>
      <span className={'about-project__project-part'}>Front-end</span>
    </div>
    </div>
    </section>
  )
}

export default AboutProject;
