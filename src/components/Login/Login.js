import './Login.css';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';
import useForm from '../../utils/useForm';
import {useMemo} from 'react';
import {
  setIsLoadingFalse, setIsLoadingTrue, setIsUserCheckedTrue, setShowErrorTrue
} from '../../store/appSlice';
import {signInUser} from '../../store/userSlice';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();

  const initialValues = useMemo(() => {
    return {
      email: '', password: ''
    }
  }, [])
  const validator = useForm(initialValues);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(setIsLoadingTrue());
    dispatch(signInUser(validator.values)).unwrap()
      .then(() => {
        dispatch(setIsLoadingFalse());
        dispatch(setIsUserCheckedTrue());
        navigate('/');
      })
      .catch(err => {
        dispatch(setShowErrorTrue(err.message));
        dispatch(setIsLoadingFalse());
        dispatch(setIsUserCheckedTrue());
      })
  }

  return (<div className='login'>
      <div className='section section_type_login'>
        <AuthForm name={'login'}
                  heading={'Welcome back!'}
                  submitButton={'Log in'}
                  isValid={validator.isValid}
                  onSubmit={handleSubmit}>
          <div className={'auth-form__fieldset'}>
            <Input name={'email'}
                   error={validator.errors.email}
                   type={'text'}
                   pattern={'^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'}
                   placeholder={'Email'}
                   required={true}
                   value={validator.values.email}
                   onChange={validator.handleChange}/>
            <Input name={'password'}
                   error={validator.errors.password}
                   type={'password'}
                   required={true}
                   placeholder={'Password'}
                   value={validator.values.password}
                   onChange={validator.handleChange}/>
          </div>
        </AuthForm>
      </div>
    </div>)
}

export default Login;
