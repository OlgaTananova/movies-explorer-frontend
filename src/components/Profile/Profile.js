import './Profile.css';
import useForm from '../../utils/useForm';
import {useContext, useMemo} from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function Profile({onEditProfile, isEditProfile, onEditProfileClick, onLogOut}) {
  const currentUser = useContext(CurrentUserContext);
  const [isSameProfile, setIsSameProfile] = useState(true);
  const initialValues = useMemo(()=> {
    return {
      name: '',
      email: ''
    }
  }, [])
  const validator = useForm(initialValues);


  useEffect(() => {
      validator.setValues((prev) => ({
        ...prev,
        name: currentUser.name,
        email: currentUser.email
      }));

  }, [currentUser])

  useEffect(() => {
    if (validator.values.name === currentUser.name
      && validator.values.email === currentUser.email) {
      setIsSameProfile(true)
    } else {
      setIsSameProfile(false);
    }
  }, [validator.values.name, validator.values.email, currentUser])

  function handleFormSubmit(e) {
    e.preventDefault();
    onEditProfile(validator.values);
  }


  function Button() {
    if (isEditProfile) {
      return (<button className={`profile-form__button
        profile-form__button_type_submit ${(!validator.isValid || isSameProfile) && 'profile-form__button_type_submit_inactive'}`}
                      disabled={!validator.isValid || isSameProfile}
                      type={'submit'}>Сохранить</button>)
    } else {
      return (<>
        <button className='profile-form__button profile-form__button_type_edit'
                type={'button'}
                onClick={onEditProfileClick}>Редактировать
        </button>
          <Link className='profile-form__button profile-form__button_type_logout'
                to={'/'}
                onClick={onLogOut}>Выйти из аккаунта</Link>
      </>)
    }
  }

  return (<div className='profile'>
      <div className='section section_type_profile'>
        <form className='profile-form'
              name='profile-form'
              onSubmit={handleFormSubmit}
              noValidate={true}>
          <h2 className='profile-form__heading'>{`Привет, ${currentUser.name}!`}</h2>
          <div className={'profile-form__fieldset'}>
            <label className='profile-form__label'>Имя
              <input className='profile-form__input'
                     type={'text'}
                     name='name'
                     placeholder='Имя'
                     minLength={2}
                     maxLength={30}
                     required={true}
                     value={validator.values.name || ''}
                     onChange={validator.handleChange}
                     pattern ={'[A-Za-zА-яа-я\-\ ]{2,30}'}
                     disabled={!isEditProfile}/>
            </label>
            <span className='profile-form__error profile-form__error_underlined'>{validator.errors.name || ''}</span>
            <label className='profile-form__label'>Email
              <input className='profile-form__input'
                     type={'text'}
                     name='email'
                     pattern={'^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'}
                     placeholder='pochta@yandex.ru'
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
