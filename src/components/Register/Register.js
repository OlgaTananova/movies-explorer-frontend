import './Register.css';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';
import {useMemo} from 'react';
import useForm from '../../utils/useForm';
import {useDispatch} from 'react-redux';
import {
  setInfoToolTipOpenTrue,
  setIsLoadingFalse,
  setIsLoadingTrue,
  setIsUserCheckedTrue,
  setShowErrorTrue
} from '../../store/appSlice';
import {signInUser, signUpUser} from '../../store/userSlice';
import {useNavigate} from 'react-router-dom';

function Register() {
  const initialValues = useMemo(() => {
    return {
      name: '', email: '', password: ''
    }
  }, []);
  const validator = useForm(initialValues);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(setIsLoadingTrue());
    dispatch(signUpUser(validator.values)).unwrap()
      .then(() => {
        dispatch(signInUser({
          email: validator.values.email, password: validator.values.password
        })).unwrap()
      })
      .then(() => {
        dispatch(setIsUserCheckedTrue());
        navigate('/');
      })
      .catch((err) => {
        dispatch(setShowErrorTrue(err.message));
        dispatch(setIsUserCheckedTrue());
        dispatch(setInfoToolTipOpenTrue());
      })
      .finally(() => {
        dispatch(setIsLoadingFalse());
      })
  }


  return (<div className='register'>
    <div className='section section_type_register'>
      <AuthForm name={'register'}
                heading={'Welcome!'}
                submitButton={'Sign up'}
                isValid={validator.isValid}
                onSubmit={handleSubmit}>
        <div className={'auth-form__fieldset'}>
          <Input name={'name'}
                 type={'text'}
                 placeholder={'Name'}
                 required={true}
                 minLength={2}
                 maxLength={30}
                 pattern={'[A-Za-zА-яа-я-0-9]{2,30}'}
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
                 placeholder={'Password'}
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
