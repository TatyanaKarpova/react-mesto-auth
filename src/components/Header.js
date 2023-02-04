import React from 'react';
import headerLogo from '../images/logo.svg';

function Header () {
    return (
        <header className='header section'>
            <img className='header__logo' src={headerLogo} alt='Лого'/>
        </header>
    )
};

export default Header;