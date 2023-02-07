import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register ({onRegister}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailChange (evt) {
        setEmail(evt.targrt.value);
    }
    
    function handlePasswordChange (evt) {
        setPassword(evt.target.value);
    }

    function handleSubmit (evt) {
        evt.preventDefault();
        onRegister(email, password);
    }

    return (
        <div className='login'>
            <h2 className='login__title'>Регистрация</h2>
            <form 
                className='login__container'
                onSubmit={handleSubmit}
            >
                <input 
                    className='login__field'
                    name='email'
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                <input 
                    className='login__field'
                    name='password'
                    type='password'
                    placeholder='Пароль'
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                <button 
                    className='login__button'
                    type='submit'
                >
                    Войти
                </button>
                <Link className='login__link' to='/sign-in'>Уже зарегистрированы? Войти</Link>
            </form>
        </div>
    )
}

export default Register;