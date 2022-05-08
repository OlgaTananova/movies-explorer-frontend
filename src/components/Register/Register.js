import './Register.css';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';

function Register() {
  return (
    <div className='register'>
      <div className='section section_type_register'>
        <AuthForm name={'register'} heading={'Добро пожаловать!'} submitButton={'Зарегистрироваться'}>
          <div className={'auth-form__fieldset'}>
            <Input name={'Имя'} type={'text'} placeholder={'Имя'} required={true}
            minLength={2} maxLength={30}/>
            <Input name={'Email'} type={'email'} placeholder={'Email'} required={true}/>
            <Input name={'Пароль'} type={'password'} placeholder={'Пароль'} required={true} error={'Что-то пошло не так'}/>
          </div>
        </AuthForm>
      </div>
    </div>
  )
}

export default Register;
