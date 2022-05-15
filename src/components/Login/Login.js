import './Login.css';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';
import useForm from '../../utils/useForm';
import {useMemo} from 'react';

function Login({onLogin}) {
  const initialValues = useMemo(()=> {
    return {
      email: '',
      password: ''
    }
  },[])
  const validator = useForm(initialValues);

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(validator.values)
  }

return (
  <div className='login'>
    <div className='section section_type_login'>
    <AuthForm name={'login'} heading={'Рады видеть!'} submitButton={'Войти'}
              isValid={validator.isValid} onSubmit={handleSubmit}>
      <div className={'auth-form__fieldset'}>
        <Input name={'email'}
               error={validator.errors.email}
               type={'email'} placeholder={'Email'}
               required={true}
               value={validator.values.email}
               onChange={validator.handleChange}/>
        <Input name={'password'}
               error={validator.errors.password}
               type={'password'}
               required={true}
               placeholder={'Пароль'}
              value={validator.values.password}
              onChange={validator.handleChange}/>
      </div>
    </AuthForm>
    </div>
  </div>
)
}

export default Login;
