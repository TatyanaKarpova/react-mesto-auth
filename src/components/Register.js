import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Register ({onRegister}) {
    const [registrationData, setRegistrationData] = useState({email: '', password: ''});

    function handleSubmit (evt) {
        evt.preventDefault();
        onRegister(registrationData);
    };

    function handleRegistrationDataChange (evt) {
        const {name, value} = evt.target;
        setRegistrationData({...registrationData, [name]: value})
    };

    return (
        <>
            <Header link='/sign-in' headerText='Войти' />
            <div className='login'>
                <form 
                    className='login__container'
                    onSubmit={handleSubmit}
                >
                    <h2 className='login__title'>Регистрация</h2>
                    <input 
                        className='login__field'
                        name='email'
                        type='email'
                        placeholder='Email'
                        value={registrationData.email}
                        onChange={handleRegistrationDataChange}
                        required
                    />
                    <input 
                        className='login__field'
                        name='password'
                        type='password'
                        placeholder='Пароль'
                        value={registrationData.password}
                        onChange={handleRegistrationDataChange}
                        required
                    />
                    <button 
                        className='login__button'
                        type='submit'
                    >
                        Зарегистрироваться
                    </button>
                    <Link className='login__link' to='/sign-in'>Уже зарегистрированы? Войти</Link>
                </form>
            </div>
        </>
    )
}

export default Register;