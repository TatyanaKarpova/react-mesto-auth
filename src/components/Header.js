import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../images/logo.svg';

function Header ({login, link, onClick, loggedIn, headerText}) {
    return (
        <header className='header section'>
            <div className='header__container'>
                <img className='header__logo' src={headerLogo} alt='Лого'/>
                <div className='header__container'>
                    <p className='header__login'>{login}</p>
                    <Link 
                        to={link}
                        className={`${loggedIn && 'header__logout'} header__link`}
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