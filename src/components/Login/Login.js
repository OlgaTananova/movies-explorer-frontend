import './Login.css';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';

function Login() {
return (
  <div className='login'>
    <div className='section section_superNarrow section_type_login'>
    <AuthForm name={'login'} heading={'Рады видеть!'} submitButton={'Войти'}>
      <div>
        <Input name={'Email'} type={'email'} placeholder={'Email'} required={true}/>
        <Input name={'Пароль'} type={'password'} placeholder={'Пароль'} required={true}
        error={'Что-то пошло не так.'}/>
      </div>
    </AuthForm>
    </div>
  </div>
)
}

export default Login;
