import React from 'react';

function InfoTooltip ({onClose, regStatus}) {
    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}>
            <div className='popup__container'>
                <button 
                        type='button' 
                        className='popup__close-icon' 
                        aria-label='Закрыть попап' 
                        onClick={onClose}>
                </button>
                <div 
                    className={`popup__registration ${regStatus ? 'popup__registration_success' : 'popup__registration_fail'}`}>
                </div>
                <h2 className='popup__heading popup__heading_reg'>
                    {regStatus ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}
                </h2>
            </div>
        </div>
    )
}

export default InfoTooltip;