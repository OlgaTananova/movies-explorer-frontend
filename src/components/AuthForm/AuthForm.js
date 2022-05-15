import './AuthForm.css';

function AuthForm({name, heading, submitButton, children, onSubmit, isValid}) {
  return (
    <form className= {`auth-form auth-form_type_${name}`} name={`${name}-form`}
          noValidate={true} onSubmit={onSubmit}>
      <h2 className='auth-form__heading'>{heading}</h2>
      {children}
      <button className={`auth-form__submit-button auth-form__submit-button_type_${name}
                        ${!isValid&& 'auth-form__submit-button_inactive'}`}
              type={'submit'} disabled={!isValid}>{submitButton}</button>
    </form>
  )
}

export default AuthForm;
