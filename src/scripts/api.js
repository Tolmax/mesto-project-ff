export {
  httpChangeProfileData,
  httpAddNewCard,
  httpDeleteMyCard,
  httpLikeCard,
  httpDislikeCard,
  httpChangeAvatarImage,
  httpGetCardsData,
  httpGetProfileData
};
import {
  // cardsOnline,
  // openProfileEditButton,
  // openPopupProfileElement,
  // closePopupEditButton,
  // submitForm,
  // openAvatarButton,
  // closePopupAvatarButton,
  // submitAvatar,
  nameInput,
  jobInput,
  avatarInput,
  // profName,
  // profJobtitle,
  // profAvatar,
  // isMyId,
  // openCardAddButton,
  // openPopupAddElement,
  // closePopupAddButton,
  submitCard,
  // openPopupElement,
  // closePopupButton,
  // openPopupElementImage,
  // openPopupElementCaption,
  // button,
  // form,
  // config,
  // openPopupCardDeleteElement,
  // closePopupCardDeleteButton,
  // submitCardDelete,
  // popups
} from "./constants.js";

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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
}

////////////////////// ПОЛУЧАЕМ КАРТОЧКИ С СЕРВЕРА   //////////////////////

function httpGetCardsData() {
  return fetch(`${configFetch.baseUrl}/cards`, {
    headers: {
      authorization: "c3983116-e362-4de3-b314-b984b8daa8fe",
    },
  })
    .then((res) => {
      if (res.ok) {
      return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
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
    .then((response) => response.json())
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
    .then((response) => response.json())
}

////////////////////  удаляем карточку  //////////////////////

function httpDeleteMyCard(cardId) {
  return fetch(`${configFetch.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: configFetch.headers,
  })
    .then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((errorRes) => {
      console.error(`Что-то пошло не так: ${errorRes.status}`);
    });
}

////////////////////  лайкаем карточку  //////////////////////

function httpLikeCard(cardId) {
  return fetch(`${configFetch.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: configFetch.headers,
  })
    .then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((errorRes) => {
      console.error(`Что-то пошло не так: ${errorRes.status}`);
    });
}

function httpDislikeCard(cardId) {
  return fetch(`${configFetch.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: configFetch.headers,
  })
    .then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((errorRes) => {
      console.error(`Что-то пошло не так: ${errorRes.status}`);
    });
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
    .then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}
