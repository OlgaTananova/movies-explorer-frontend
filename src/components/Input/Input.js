import './Input.css';

function Input({name, error, ...rest}) {


  return (<>
      <label className='auth-form__label'>{name}
        <input className='auth-form__input'
               name={name} {...rest}/>
      </label>
      <span className='auth-form__error'>{error}</span>
    </>)
}

export default Input;
