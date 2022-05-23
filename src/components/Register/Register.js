import './Register.css';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';
import {useMemo} from 'react';
import useForm from '../../utils/useForm';

function Register({onRegister}) {
  const initialValues = useMemo(() => {
    return {
      name: '', email: '', password: ''
    }
  }, []);
  const validator = useForm(initialValues);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(validator.values)
  }

  return (<div className='register'>
    <div className='section section_type_register'>
      <AuthForm name={'register'}
                heading={'Добро пожаловать!'}
                submitButton={'Зарегистрироваться'}
                isValid={validator.isValid}
                onSubmit={handleSubmit}>
        <div className={'auth-form__fieldset'}>
          <Input name={'name'}
                 type={'text'}
                 placeholder={'Имя'}
                 required={true}
                 minLength={2}
                 maxLength={30}
                 pattern={'[A-Za-zА-яа-я\-\ ]{2,30}'}
                 value={validator.values.name}
                 onChange={validator.handleChange}
                 error={validator.errors.name}/>
          <Input name={'email'}
                 type={'text'}
                 pattern={'^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'}
                 placeholder={'Email'}
                 required={true}
                 value={validator.values.email}
                 onChange={validator.handleChange}
                 error={validator.errors.email}/>
          <Input name={'password'}
                 type={'password'}
                 placeholder={'Пароль'}
                 required={true}
                 value={validator.values.password}
                 onChange={validator.handleChange}
                 error={validator.errors.password}/>
        </div>
      </AuthForm>
    </div>
  </div>)
}

export default Register;
