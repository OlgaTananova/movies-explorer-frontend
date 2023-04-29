import './InfoToolTip.css';
import {useEffect} from 'react';
import {useAppSelector} from '../../store/hooks';
import {setInfoToolTipOpenFalse, setShowErrorFalse} from '../../store/appSlice';
import {useDispatch} from 'react-redux';
import {setIsEditUserProfileFalse} from '../../store/userSlice';


function InfoToolTip() {
  const isOpen = useAppSelector((state) => state.app.isInfoToolTipOpen);
  const isEditProfile = useAppSelector((state) => state.user.isEditUserProfile);
  const errorMessage = useAppSelector((state) => state.app.errorMessage);
  const dispatch = useDispatch();
  // function to close all popups
  function closePopups() {
    dispatch(setInfoToolTipOpenFalse(false));
    dispatch(setShowErrorFalse());
    dispatch(setIsEditUserProfileFalse());
  }
  function handleOverlayClose(e) {
    if (e.target === e.currentTarget && isOpen) {
      closePopups()
    }
  }

  useEffect(() => {
    if (!isOpen) return;

    function handleEscClose(e) {
      if (e.key === 'Escape') {
        closePopups()
      }
    }

    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isOpen])


  return (<div className={`infotooltip ${isOpen && 'infotooltip_opened'}`}
               onClick={handleOverlayClose}>
      <div className={'infotooltip__container'}>
        <button type={'button'}
                onClick={closePopups}
                aria-label={'Close popup button'}
                className={'infotooltip__close-button'}>{}</button>
        <p className={'infotooltip__message'}>{errorMessage}</p>
        <div className={`infotooltip__icon ${isEditProfile&& 'infotooltip__icon_type_success'}`}
             aria-label={'Popup icon'}>{}</div>
      </div>
    </div>)
}

export default InfoToolTip;
