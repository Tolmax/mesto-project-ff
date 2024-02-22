export {
  httpChangeProfileData,
  httpAddNewCard,
  httpDeleteMyCard,
  httpLikeCard,
  httpDislikeCard,
  httpChangeAvatarImage,
  httpGetCardsData,
  httpGetProfileData,
};
import { nameInput, jobInput, avatarInput, submitCard } from "./constants.js";

const configFetch = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-3",
  headers: {
    authorization: "c3983116-e362-4de3-b314-b984b8daa8fe",
    "Content-Type": "application/json",
  },
};

//////////////////// ПОЛУЧАЕМ ДАННЫЕ ПРОФИЛЯ С СЕРВЕРА/////////////

function httpGetProfileData() {
  return fetch(`${configFetch.baseUrl}/users/me`, {
    headers: {
      authorization: "c3983116-e362-4de3-b314-b984b8daa8fe",
    },
  })
    .then(httpJson)
    .catch(httpCatch);
}

////////////////////// ПОЛУЧАЕМ КАРТОЧКИ С СЕРВЕРА   //////////////////////

function httpGetCardsData() {
  return fetch(`${configFetch.baseUrl}/cards`, {
    headers: {
      authorization: "c3983116-e362-4de3-b314-b984b8daa8fe",
    },
  })
    .then(httpJson)
    .catch(httpCatch);
}

////////////////////// РЕДАКТИРОВАНИЕ ПРОФИЛЯ //////////////////////

function httpChangeProfileData() {
  return fetch(`${configFetch.baseUrl}/users/me`, {
    method: "PATCH",
    headers: configFetch.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value,
    }),
  })
    .then(httpJson)
    .catch(httpCatch);
}

////////////////////  Добавление новой карточки  //////////////////////

const cardNameInput = submitCard.querySelector("#place-input");
const cardImageInput = submitCard.querySelector("#link-input");

function httpAddNewCard() {
  return fetch(`${configFetch.baseUrl}/cards`, {
    method: "POST",
    headers: configFetch.headers,
    body: JSON.stringify({
      name: cardNameInput.value,
      link: cardImageInput.value,
    }),
  })
    .then(httpJson)
    .catch(httpCatch);
}

////////////////////  удаляем карточку  //////////////////////

function httpDeleteMyCard(cardId) {
  return fetch(`${configFetch.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: configFetch.headers,
  })
    .then(httpJson)
    .catch(httpCatch);
}

////////////////////  лайкаем карточку  //////////////////////

function httpLikeCard(cardId) {
  return fetch(`${configFetch.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: configFetch.headers,
  })
    .then(httpJson)
    .catch(httpCatch);
}

function httpDislikeCard(cardId) {
  return fetch(`${configFetch.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: configFetch.headers,
  })
    .then(httpJson)
    .catch(httpCatch);
}

////////////////////// СМЕНА АВАТАРА //////////////////////

function httpChangeAvatarImage() {
  return fetch(`${configFetch.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: configFetch.headers,
    body: JSON.stringify({
      avatar: avatarInput.value,
    }),
  })
    .then(httpJson)
    .catch(httpCatch);
}

function httpJson(res) {
  if (res.ok) return res.json();
  return Promise.reject(res);
}

function httpCatch(errorRes) {
  console.error(errorRes);
}
