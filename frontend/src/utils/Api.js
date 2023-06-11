class Api {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl; 
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    })
      .then(res => this._checkResponse(res));
  }

  getUserInfo() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    })
      .then(res => this._checkResponse(res));
  }

  setUserInfo(obj) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: obj.name,
        about: obj.about
      })
    })
      .then(res => this._checkResponse(res));
  }

  addNewCard(cardElement) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cardElement.name,
        link: cardElement.link
      })
    })
      .then(res => this._checkResponse(res));
  }

  putLike(cardId, isLiked) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(res => this._checkResponse(res));
  }

  deleteCard(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(res => this._checkResponse(res));
  }

  changeAvatar(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,

      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(res => this._checkResponse(res));
  }
}

const api = new Api({
  baseUrl: 'https://api.anastasiia.mesto.nomoredomains.rocks',
})

export default api;