import './InfoToolTip.css';
import {useEffect} from 'react';


function InfoToolTip({isOpen, errorMessage, onClose, editProfileMessage}) {
  function handleOverlayClose(e) {
    if (e.target === e.currentTarget && isOpen) {
      onClose();
    }
  }
  useEffect(()=>{
    if (!isOpen) return;
    function handleEscClose(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleEscClose);
    return ()=>{
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isOpen, onClose])


  return (
    <div className={`infotooltip ${isOpen&& 'infotooltip_opened'}`}
         onClick={handleOverlayClose}>
      <div className={'infotooltip__container'}>
      <button type={'button'}
              onClick={onClose}
              aria-label={'Кнопка закрытия модального окна'}
      className={'infotooltip__close-button'}>{}</button>
        <p className={'infotooltip__message'}>{editProfileMessage? editProfileMessage :errorMessage}</p>
        <div className={`infotooltip__icon ${editProfileMessage&& 'infotooltip__icon_type_success'}`}
             aria-label={'Иконка модального окна'}>{}</div>
      </div>
    </div>
  )
}

export default InfoToolTip;
