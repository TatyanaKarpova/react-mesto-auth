import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../images/logo.svg';

function Header ({login, link, onClick, loggedIn, headerText}) {

    const [isMenuClicked, setIsMenuClicked] = useState(false);

    function handleMenuClick () {
        setIsMenuClicked(!isMenuClicked);
    };

    return (
        <header className='header section'>
            <div className={`${loggedIn ? 'header__container header__container_mobile' : 'header__container'}`}>
                <div className={`${loggedIn ? 'logo-container' : ''}`}>
                    <img className='header__logo' src={headerLogo} alt='Лого'/>
                    <button type='button' className={`${!loggedIn ? 'header__menu-button_invisible' : 'header__menu-button'} ${isMenuClicked ? 'header__menu-button_invisible' : 'header__menu-button'}`} onClick={handleMenuClick}></button>
                    <button type='button' className={`${loggedIn ? 'header__close-button' : 'header__close-button_invisible'} ${isMenuClicked ? 'header__close-button' : 'header__close-button_invisible'}`} onClick={handleMenuClick}></button>
                </div>
                <div className={`${loggedIn ? 'header__container header__wrapper' : 'header__container'}`}>
                    <p className={`${isMenuClicked ? 'header__login' : 'header__login_invisable'}`}>{login}</p>
                    <Link 
                        to={link}
                        className={`${loggedIn ? 'header__link_invisable' : 'header__link'}`}
                        onClick={onClick}
                    >
                    {headerText}
                    </Link>
                </div>
            </div>
        </header>
    )
};

export default Header;

/*
<div className={`${loggedIn ? 'logo-container' : ''}`}>
    <img className='header__logo' src={headerLogo} alt='Лого'/>
    <button type='button' className='header__menu-button' onClick={handleMenuClick}></button>
</div>
*/


/*
<div className={`${loggedIn ? 'logo-container' : ''}`}>
    <img className='header__logo' src={headerLogo} alt='Лого'/>
    <button type='button' className='header__close-button'></button>
</div>
<div className={`${loggedIn ? 'header__container header__wrapper' : 'header__container'}`}>
    <p className='header__login'>{login}</p>
    <Link 
        to={link}
        className={`${loggedIn ? 'header__link header__link_mobile' : 'header__link'}`}
        onClick={onClick}
    >
        {headerText}
    </Link>
</div>
*/


/*

<Link 
                        to={link}
                        className={`${loggedIn ? 'header__link_invisable' : 'header__link'} ${isMenuClicked ? 'header__link header__link_mobile' : 'header__link_invisable'}`}
                        onClick={onClick}
                    >
                    {headerText}
                    </Link>

*/


/*

<div className={`${loggedIn ? 'header__container header__wrapper' : 'header__container'} ${isMenuClicked ? 'header__container header__wrapper' : 'header__container'}`}>
                    <p className={`${isMenuClicked ? 'header__login' : 'header__login_invisable'}`}>{login}</p>
                    <Link 
                        to={link}
                        className={`${loggedIn ? 'header__link_invisable' : 'header__link'}`}
                        onClick={onClick}
                    >
                    {headerText}
                    </Link>
                </div>

*/