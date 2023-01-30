import { config } from './enum.js';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка!${res.statusText} Код ошибки: ${res.status}.`);
  }
};

function request(url, options) {
  const computedUrl = `${config.baseUrl}/${url}`;
  return fetch(computedUrl, options).then(checkResponse);
}

const getUser = () => request(`users/me`, { headers: config.headers });

const getCards = () => request(`cards`, { headers: config.headers });

const updateUser = ({ name, about }) => request(`users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name,
    about
  })
});

const updateUserAvatar = (avatar) => request(`users/me/avatar`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({ avatar })
});

const addCard = ({ name, link }) => request(`cards`, {
  method: 'POST',
  headers: config.headers,
  body: JSON.stringify({ name, link })
});

const removeCard = (cardId) => request(`cards/${cardId}`, {
  method: 'DELETE',
  headers: config.headers
});

const deleteCardLike = (cardId) => request(`cards/likes/${cardId}`, {
  method: 'DELETE',
  headers: config.headers
});

const addCardLike = (cardId) => request(`cards/likes/${cardId}`, {
  method: 'PUT',
  headers: config.headers
});

export {
  getUser,
  getCards,
  updateUser,
  addCard,
  removeCard,
  deleteCardLike,
  addCardLike,
  updateUserAvatar
};
