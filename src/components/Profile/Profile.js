import './Profile.css';
import useForm from '../../utils/useForm';
import {useMemo, useRef} from 'react';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../store/hooks';
import {
  onLogout,
  setInfoToolTipOpenTrue,
  setIsLoadingFalse,
  setIsLoadingTrue,
  setShowErrorTrue
} from '../../store/appSlice';
import {
  logOutUser, setIsEditUserProfileTrue, setIsLoggedInFalse, updateUserProfile
} from '../../store/userSlice';
import {useDispatch} from 'react-redux';

function Profile() {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const isEditProfile = useAppSelector((state) => state.user.isEditUserProfile);
  const [isSameProfile, setIsSameProfile] = useState(true);
  const dispatch = useDispatch();
  const initialValues = useMemo(() => {
    return {
      name: '', email: ''
    }
  }, [])
  const validator = useForm(initialValues);
  const ref = useRef();


  useEffect(() => {
    validator.setValues((prev) => ({
      ...prev, name: currentUser.name, email: currentUser.email
    }));

  }, [currentUser])

  useEffect(() => {
    if (validator.values.name === currentUser.name && validator.values.email === currentUser.email) {
      setIsSameProfile(true)
    } else {
      setIsSameProfile(false);
    }
  }, [validator.values.name, validator.values.email, currentUser])

  // update user profile
  function handleFormSubmit(e) {
    e.preventDefault();
    dispatch(setIsLoadingTrue());
    dispatch(updateUserProfile({
      name: validator.values.name, email: validator.values.email
    })).unwrap()
      .then(() => {
        dispatch(setIsLoadingFalse());
        dispatch(setShowErrorTrue('Profile updated successfully'));
        dispatch(setInfoToolTipOpenTrue())
      })
      .catch((err) => {
        dispatch(setShowErrorTrue(err.message));
        dispatch(setIsLoadingFalse());
      })
  }

  // function to activate edit profile form
  function handleEditProfileClick() {
    dispatch(setIsEditUserProfileTrue(true));
  }

  useEffect(() => {
    if (isEditProfile) {
      ref.current.focus();
    }
  }, [isEditProfile])

  // function to handle logout
  function handleLogOut() {
    dispatch(setIsLoadingTrue());
    dispatch(logOutUser()).unwrap()
      .then(() => {
        dispatch(setIsLoggedInFalse());
        dispatch(onLogout());
        localStorage.clear();
      })
      .catch((err) => {
        dispatch(setShowErrorTrue(err.message));
        dispatch(setIsLoadingFalse());
      })
  }


  function Button() {
    if (isEditProfile) {
      return (<button className={`profile-form__button
        profile-form__button_type_submit ${(!validator.isValid || isSameProfile) && 'profile-form__button_type_submit_inactive'}`}
                      disabled={!validator.isValid || isSameProfile}
                      type={'submit'}>Save</button>)
    } else {
      return (<>
        <button className='profile-form__button profile-form__button_type_edit'
                type={'button'}
                onClick={handleEditProfileClick}>Edit profile
        </button>
        <Link className='profile-form__button profile-form__button_type_logout'
              to={'/'}
              onClick={handleLogOut}>Log out</Link>
      </>)
    }
  }

  return (<div className='profile'>
    <div className='section section_type_profile'>
      <form className='profile-form'
            name='profile-form'
            onSubmit={handleFormSubmit}
            noValidate={true}>
        <h2 className='profile-form__heading'>{`Hi, ${currentUser.name}!`}</h2>
        <div className={'profile-form__fieldset'}>
          <label className='profile-form__label'>Name
            <input ref={ref}
                   className='profile-form__input'
                   type={'text'}
                   name='name'
                   placeholder='Name'
                   minLength={2}
                   maxLength={30}
                   required={true}
                   value={validator.values.name || ''}
                   onChange={validator.handleChange}
                   pattern={'[A-Za-zА-яа-я-0-9]{2,30}'}
                   disabled={!isEditProfile}/>
          </label>
          <span className='profile-form__error profile-form__error_underlined'>{validator.errors.name || ''}</span>
          <label className='profile-form__label'>Email
            <input className='profile-form__input'
                   type={'text'}
                   name='email'
                   pattern={'^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'}
                   placeholder='example@emample.com'
                   required={true}
                   value={validator.values.email || ''}
                   onChange={validator.handleChange}
                   disabled={!isEditProfile}/>
          </label>
          <span className='profile-form__error'>{validator.errors.email || ''}</span>
        </div>
        <Button/>
      </form>
    </div>
  </div>)
}

export default Profile;
