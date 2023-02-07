import React from 'react';
import { Route, Link } from 'react-router-dom';
import headerLogo from '../images/logo.svg';

function Header ({loggedIn}) {
    return (
        <header className='header section'>
            <img className='header__logo' src={headerLogo} alt='Лого'/>
            <Route path='/sign-in'>
                <Link 
                    className={`${loggedIn ? 'header__login' : 'header__login header__login_in'}`} 
                    to='sign-up'>
                        Регистрация
                </Link>
            </Route>
            <Route path='/sign-up'>
                <Link 
                    className={`${loggedIn ? 'header__login' : 'header__login header__login_in'}`} 
                    to='sign-up'>
                        Войти
                </Link>
            </Route>
        </header>
    )
};

export default Header;