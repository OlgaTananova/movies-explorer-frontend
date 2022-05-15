import './Profile.css';
import useForm from '../../utils/useForm';
import {useContext, useMemo} from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {useEffect} from 'react';

function Profile({onEditProfileClick, isEditProfile, onEditProfile}) {
  const currentUser = useContext(CurrentUserContext);
  const initialValues = useMemo(()=> {
    return {
      name: '',
      email: ''
    }
  }, [])
  const validator = useForm(initialValues)

  useEffect(() => {
      validator.setValues((prev) => ({
        ...prev,
        message: '',
        name: currentUser.name,
        email: currentUser.email
      }));

  }, [currentUser])

  function handleFormSubmit(e) {
    e.preventDefault();
    onEditProfile(validator.values)
  }

  function Button() {
    if (isEditProfile === true) {
      return (<button className='profile-form__button
        profile-form__button_type_submit'
                      type={'submit'}>Сохранить</button>)
    } else {
      return (
        <button className='profile-form__button profile-form__button_type_edit'
                type={'button'}
                onClick={onEditProfileClick}>Редактировать</button>)
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
                     value={validator.values.name}
                     onChange={validator.handleChange}
                     // pattern ={}
                     disabled={!isEditProfile}/>
            </label>
            <span className='profile-form__error profile-form__error_underlined'>{validator.errors.name}</span>
            <label className='profile-form__label'>Email
              <input className='profile-form__input'
                     type={'email'}
                     name='email'
                     placeholder='pochta@yandex.ru'
                     required={true}
                     value={validator.values.email}
                     onChange={validator.handleChange}
                     disabled={!isEditProfile}/>
            </label>
            <span className='profile-form__error'>{validator.errors.email}</span>
          </div>
          <Button/>
        </form>
      </div>
    </div>)
}

export default Profile;
