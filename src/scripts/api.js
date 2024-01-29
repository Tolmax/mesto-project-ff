export {
  initApp,
  changeProfileData,
  addNewCard,
  httpDeleteMyCard,
  getMyId,
  httpLikeCard,
  httpDislikeCard,
  httpChangeAvatarImage,
};
import { createCard } from "./card.js";
import {
  generatePopup,
  cardsOnline,
  nameInput,
  jobInput,
  avatarInput,
  profName,
  profJobtitle,
  profAvatar,
} from "../index.js";

const cardName = openPopupAddElement.querySelector(
  ".popup__input_type_card-name"
);
const cardLink = openPopupAddElement.querySelector(".popup__input_type_url");

// const profName = document.querySelector(".profile__title");
// const profJobtitle = document.querySelector(".profile__description");
// const profAvatar = document.querySelector(".profile__image");
//const isMyCard = getProfileData(profileData._id);
//console.log(isMyCard);

//////////////////// ПОЛУЧАЕМ ДАННЫЕ ПРОФИЛЯ С СЕРВЕРА/////////////

function getMyId() {
  return (
    fetch("https://nomoreparties.co/v1/wff-cohort-3/users/me", {
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
      //.then((res) => console.log(res.avatar))
  );
}

function getProfileData() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-3/users/me", {
    headers: {
      authorization: "c3983116-e362-4de3-b314-b984b8daa8fe",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
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
  return fetch("https://nomoreparties.co/v1/wff-cohort-3/cards", {
    headers: {
      authorization: "c3983116-e362-4de3-b314-b984b8daa8fe",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
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

function changeProfileData() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-3/users/me", {
    method: "PATCH",
    headers: {
      authorization: "c3983116-e362-4de3-b314-b984b8daa8fe",
      "Content-Type": "application/json",
    },
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

function addNewCard({ name, link }) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-3/cards", {
    method: "POST",
    headers: {
      authorization: "c3983116-e362-4de3-b314-b984b8daa8fe",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then((response) => response.json())
    .catch((errorRes) => {
      console.error(`Что-то пошло не так: ${errorRes.status}`);
    });
}

////////////////////  удаляем карточку  //////////////////////

function httpDeleteMyCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-3/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "c3983116-e362-4de3-b314-b984b8daa8fe",
    },
  }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

////////////////////  лайкаем карточку  //////////////////////

function httpLikeCard(cardId) {
  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-3/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: {
        authorization: "c3983116-e362-4de3-b314-b984b8daa8fe",
      },
    }
  ).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function httpDislikeCard(cardId) {
  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-3/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: "c3983116-e362-4de3-b314-b984b8daa8fe",
      },
    }
  ).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

////////////////////// СМЕНА АВАТАРА //////////////////////

function httpChangeAvatarImage() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-3/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "c3983116-e362-4de3-b314-b984b8daa8fe",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarInput.value,
    }),
  }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
// function httpChangeAvatarImage(avatar) {
//   return fetch("https://nomoreparties.co/v1/wff-cohort-3/users/me/avatar", {
//     method: "PUT",
//     headers: {
//       authorization: "c3983116-e362-4de3-b314-b984b8daa8fe",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       avatar: avatar,
//     }),
//   })
//   .then((res) => {
//     if (res.ok) return res.json();
//     return Promise.reject(`Ошибка: ${res.status}`);
//   })
// }
