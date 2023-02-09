import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Login ({onLogin}) {

    const [authenticationData, setAuthenticationData] = useState({email: '', password: ''});

    function handleAuthenticationDataChange (evt) {
        const {name, value} = evt.target;
        setAuthenticationData({...authenticationData, [name]: value});
    };

    function handleSubmit (evt) {
        evt.preventDefault();
        onLogin(authenticationData);
    };

    return (
        <>
            <Header link='/sign-up' headerText='Регистрация'></Header>
            <div className='login'>
                <form 
                    className='login__container'
                    onSubmit={handleSubmit}
                >
                    <h2 className='login__title'>Вход</h2>
                    <input 
                        className='login__field'
                        name='email'
                        type='email'
                        placeholder='Email'
                        value={authenticationData.email}
                        onChange={handleAuthenticationDataChange}
                        required
                    />
                    <input 
                        className='login__field'
                        name='password'
                        type='password'
                        placeholder='Пароль'
                        value={authenticationData.password}
                        onChange={handleAuthenticationDataChange}
                        required
                    />
                    <button 
                        className='login__button'
                        type='submit'
                    >
                        Войти
                    </button>
                    <Link className='login__link' to='/sign-up'>Нет учетной записи? Зарегистрироваться</Link>
                </form>
            </div>
        </>
    )
}

export default Login;