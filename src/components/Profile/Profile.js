import './Profile.css';

function Profile({onEditProfile, isEditProfile, onFormSubmit}) {

  function Button() {
    if (isEditProfile === true) {
      return (<button className='profile-form__button
        profile-form__button_type_submit'
                      type={'submit'}>Сохранить</button>)
    } else {
      return (
        <button className='profile-form__button profile-form__button_type_edit'
                type={'button'}
                onClick={onEditProfile}>Редактировать</button>)
    }
  }

  return (<div className='profile'>
      <div className='section section_type_profile'>
        <form className='profile-form'
              name='profile-form'
              onSubmit={onFormSubmit}
              noValidate={true}>
          <h2 className='profile-form__heading'> Привет, Ольга! </h2>
          <div className={'profile-form__fieldset'}>
            <label className='profile-form__label'>Имя
              <input className='profile-form__input'
                     type={'text'}
                     name='name'
                     placeholder='Имя'
                     minLength={2}
                     maxLength={30}
                     required={true}
                     disabled={!isEditProfile}/>
            </label>
            <span className='profile-form__error profile-form__error_underlined'>{}</span>
            <label className='profile-form__label'>Email
              <input className='profile-form__input'
                     type={'email'}
                     name='email'
                     placeholder='pochta@yandex.ru'
                     required={true}
                     disabled={!isEditProfile}/>
            </label>
            <span className='profile-form__error'>Что-то пошло не так</span>
          </div>
          <Button/>
        </form>
      </div>
    </div>)
}

export default Profile;
