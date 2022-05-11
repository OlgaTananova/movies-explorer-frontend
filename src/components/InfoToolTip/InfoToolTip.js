import './InfoToolTip.css';

function InfoToolTip() {
  return (
    <div className={'infotooltip'}>
      <div className={'infotooltip__container'}>
      <button type={'button'}
              aria-label={'Кнопка закрытия модального окна'}
      className={'infotooltip__close-button'}>{}</button>
        <p className={'infotooltip__message'}>Что-то пошло не так</p>
        <div className={'infotooltip__icon'}
             aria-label={'Иконка модального окна'}>{}</div>
      </div>
    </div>
  )
}

export default InfoToolTip;
