export {
  initApp,
  httpChangeProfileData,
  httpAddNewCard,
  httpDeleteMyCard,
  getMyId,
  httpLikeCard,
  httpDislikeCard,
  httpChangeAvatarImage,
};
import { createCard } from "./card.js";
import { generatePopup } from "../index.js";
import {
  cardsOnline,
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
  profName,
  profJobtitle,
  profAvatar,
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
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-3',
  headers: {
    authorization: 'c3983116-e362-4de3-b314-b984b8daa8fe',
    'Content-Type': 'application/json'
  }
}

//////////////////// ПОЛУЧАЕМ ДАННЫЕ ПРОФИЛЯ С СЕРВЕРА/////////////

function getMyId() {
  return (
    fetch(`${configFetch.baseUrl}/users/me`, {
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
      .then((res) => res._id)
  )
  .catch((errorRes) => {
    console.error(`Что-то пошло не так: ${errorRes.status}`);
  });
}

function getProfileData() {
  return fetch(`${configFetch.baseUrl}/users/me`, {
    headers: {
      authorization: "c3983116-e362-4de3-b314-b984b8daa8fe",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })
  .catch((errorRes) => {
    console.error(`Что-то пошло не так: ${errorRes.status}`);
  });
}

function renderProfileInfo(profileData) {
  ////console.log(profileData);
  profName.textContent = profileData.name;
  profJobtitle.textContent = profileData.about;
  profAvatar.style.backgroundImage = `url(${profileData.avatar})`;
}

////////////////////// ПОЛУЧАЕМ КАРТОЧКИ С СЕРВЕРА   //////////////////////

function getCardsData() {
  return fetch(`${configFetch.baseUrl}/cards`, {
    headers: {
      authorization: "c3983116-e362-4de3-b314-b984b8daa8fe",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })
  .catch((errorRes) => {
    console.error(`Что-то пошло не так: ${errorRes.status}`);
  });
}

function renderCards(cardsData) {
  console.log(cardsData);

  for (const cardData of cardsData) {
    const cardNew = createCard(cardData, generatePopup);
    cardsOnline.append(cardNew);
  }
}

function initApp() {
  Promise.all([getProfileData(), getCardsData()]).then(
    ([profileData, cardsData]) => {
      renderProfileInfo(profileData);
      renderCards(cardsData);
    }
  );
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
    .catch((errorRes) => {
      console.error(`Что-то пошло не так: ${errorRes.status}`);
    });
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
    .catch((errorRes) => {
      console.error(`Что-то пошло не так: ${errorRes.status}`);
    });
}

////////////////////  удаляем карточку  //////////////////////

function httpDeleteMyCard(cardId) {
  return fetch(`${configFetch.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: configFetch.headers,
  }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((errorRes) => {
    console.error(`Что-то пошло не так: ${errorRes.status}`);
  });
}

////////////////////  лайкаем карточку  //////////////////////

function httpLikeCard(cardId) {
  return fetch(
    `${configFetch.baseUrl}/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: configFetch.headers,
    }
  ).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((errorRes) => {
    console.error(`Что-то пошло не так: ${errorRes.status}`);
  });
}

function httpDislikeCard(cardId) {
  return fetch(
    `${configFetch.baseUrl}/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: configFetch.headers,
    }
  ).then((res) => {
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
  }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((errorRes) => {
    console.error(`Что-то пошло не так: ${errorRes.status}`);
  });
}