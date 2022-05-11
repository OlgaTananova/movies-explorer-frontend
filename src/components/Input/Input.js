import './Input.css';

function Input({name, placeholder, type, error, ...rest}) {
return (
  <>
    <label className='auth-form__label'>{name}
    <input className='auth-form__input' type={type}
           placeholder={placeholder} {...rest} />
  </label>
    <span className='auth-form__error'>{error}</span>
  </>
)
}

export default Input;
