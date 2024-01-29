import "./pages/index.css";
//import { initialCards } from "./scripts/cards.js";
import {
  initApp,
  changeProfileData,
  addNewCard,
  getMyId,
  httpChangeAvatarImage,
} from "./scripts/api.js";
import { createCard } from "./scripts/card.js";
import { openPopup, closePopup, closeEsc } from "./scripts/modal.js";
import { enableValidation } from "./scripts/validation.js";
import { clearValidation } from "./scripts/validation.js";
export {
  generatePopup,
  cardsOnline,
  nameInput,
  jobInput,
  avatarInput,
  profName,
  profJobtitle,
  profAvatar,
  isMyId,
};



const cardsOnline = document.querySelector(".places__list");

const openProfileEditButton = document.querySelector(".profile__edit-button");
const openPopupProfileElement = document.querySelector(".popup_type_edit");
const closePopupEditButton =
  openPopupProfileElement.querySelector(".popup__close");
const submitForm = openPopupProfileElement.querySelector(".popup__form");

const openAvatarButton = document.querySelector(".profile__image");
const openPopupAvatarElement = document.querySelector(".popup_type_avatar");
const closePopupAvatarButton =
  openPopupAvatarElement.querySelector(".popup__close");
const submitAvatar = openPopupAvatarElement.querySelector(".popup__form");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const avatarInput = document.querySelector(".popup__input_type_urlavatar");

const profName = document.querySelector(".profile__title");
const profJobtitle = document.querySelector(".profile__description");
const profAvatar = document.querySelector(".profile__image");

const openCardAddButton = document.querySelector(".profile__add-button");
const openPopupAddElement = document.querySelector(".popup_type_new-card");
const closePopupAddButton = openPopupAddElement.querySelector(".popup__close");
const submitCard = openPopupAddElement.querySelector(".popup__form");

const openPopupElement = document.querySelector(".popup_type_image");
const closePopupButton = openPopupElement.querySelector(".popup__close");



const openPopupElementImage = openPopupElement.querySelector(".popup__image");
const openPopupElementCaption =
  openPopupElement.querySelector(".popup__caption");

export const form = document.querySelector(".popup__form");
//const formInput = form.querySelector('.popup__input');
//const formError = form.querySelector('.popup__input-error');
const button = form.querySelector(".popup__button");

export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_active",
};
console.log("Problemm");
console.log('Hello, World!')

//СОЗДАНИЕ КАРТОЧЕК

// initialCards.forEach(function ({ link, name }) {
//   const cardNew = createCard(link, name, deleteCard, generatePopup, likeCard);
//   cardsOnline.append(cardNew);
// });
const isMyId = await getMyId();
console.log(isMyId);
initApp();

// Ф-Я ОТКРЫВАНИЯ КАРТОЧКИ ПРИ КЛИКЕ

function generatePopup(initialCardsLink, initialCardsName) {
  openPopupElementImage.src = initialCardsLink;
  openPopupElementCaption.textContent = initialCardsName;
  openPopupElementImage.alt = initialCardsName;
  openPopupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEsc);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////

// включение валидации вызовом enableValidation все настройки передаются при вызове

enableValidation(config, form);
//ОТКРЫТИЯ/ЗАКРЫТИЕ КАРТОЧКИ ПРОФАЙЛ

openProfileEditButton.addEventListener("click", function () {
  nameInput.value = profName.textContent;
  jobInput.value = profJobtitle.textContent;
  openPopup(openPopupProfileElement);
});
closePopupEditButton.addEventListener("click", function () {
  clearValidation(form, config);
  closePopup(openPopupProfileElement);
});

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ И ОТПРАВКА //СОРАНЯЕМ ИЗМЕНЕНИЯ В ПРОФАЙЛЕ

submitForm.addEventListener("submit", handleFormSubmit);
function handleFormSubmit(evt) {
  evt.preventDefault();
  profName.textContent = nameInput.value;
  profJobtitle.textContent = jobInput.value;
  closePopup(openPopupProfileElement);
  document.removeEventListener("keydown", closeEsc);
  changeProfileData(evt);
  clearValidation(form, config);
}

// ДОБАВЛЯЕМ/ЗАКРЫВАЕМ НОВУЮ КАРТОЧКУ

openCardAddButton.addEventListener("click", function () {
  openPopup(openPopupAddElement);
});
closePopupAddButton.addEventListener("click", function () {
  clearValidation(form, config);
  closePopup(openPopupAddElement);
});

// СОРАНЯЕМ НОВУЮ КАРТОЧКУ

submitCard.addEventListener("submit", handlecardSubmit);

function handlecardSubmit(evt) {
  evt.preventDefault();
  //button.textContent = 'Сохранить...'
  //console.log(button);
  addNewCard({ name: cardName.value, link: cardLink.value })
  .then((data) => {
    const createdCard = createCard(data, generatePopup);

    cardsOnline.prepend(createdCard);
    evt.target.reset();
    closePopup(openPopupAddElement);
    document.removeEventListener("keydown", closeEsc);
  });
}
//
// ЗАКРЫВАЕМ КАРТОЧКУ (ОТКРЫТА ПРИ НАЖАТИИ НА НЕЁ (ОТКРЫВАЕМ В card.js))

closePopupButton.addEventListener("click", function () {
  closePopup(openPopupElement);
});

////////////////////////  МЕНЯЕМ АВАТАР //////////////////////

openAvatarButton.addEventListener("click", function () {
  openPopup(openPopupAvatarElement);
});
closePopupAvatarButton.addEventListener("click", function () {
  clearValidation(form, config);
  closePopup(openPopupAvatarElement);
});

////////////////////////  СОХРАНЯЕМ НОВЫЙ АВАТАР //////////////////////


submitAvatar.addEventListener("submit", avatarSubmit);

function avatarSubmit(evt) {
  evt.preventDefault();
  button.textContent = 'Сохранить...'
  console.log(button);
  httpChangeAvatarImage(evt)
    .then(data => {
      profAvatar.style.backgroundImage = `url(${data.avatar})`;
      closePopup(openPopupAvatarElement);
      document.removeEventListener("keydown", closeEsc);
      clearValidation(form, config);
    } )
  }
