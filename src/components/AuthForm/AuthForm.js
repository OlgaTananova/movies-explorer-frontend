import './AuthForm.css';
import {useNavigate} from 'react-router-dom';

function AuthForm({name, heading, submitButton, children}) {
  const navigate = useNavigate();
  return (
    <form className= {`auth-form auth-form_type_${name}`} name={`${name}-form`}
          noValidate={true} onSubmit={()=>{navigate('/')}}>
      <h2 className='auth-form__heading'>{heading}</h2>
      {children}
      <button className={`auth-form__submit-button auth-form__submit-button_type_${name}`}
              type={'submit'}>{submitButton}</button>
    </form>
  )
}

export default AuthForm;
