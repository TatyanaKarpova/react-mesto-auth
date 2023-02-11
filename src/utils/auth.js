class Auth {
    constructor (url) {
        this._url = url;
    }

    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
    }

    registerNewUser (email, password) {
        return fetch (`${this._url}/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        }).then(this._checkResponse);
    }
    
    loginUser (email, password) {
        return fetch(`${this._url}/signin`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
          }).then(this._checkResponse);
    }

    checkToken (token) {
        this._token = fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
          }).then(this._checkResponse);
          return this._token;
    }
}

export const auth = new Auth ('https://auth.nomoreparties.co');