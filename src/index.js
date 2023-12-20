import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, likeCard } from "./scripts/card.js";
import { openPopup, closePopup, } from "./scripts/modal.js";

const cardsOnline = document.querySelector(".places__list");

const openProfileEditButton = document.querySelector(".profile__edit-button");
const openPopupProfileElement = document.querySelector(".popup_type_edit");
const closePopupEditButton = document.querySelector(".popup__close");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profName = document.querySelector(".profile__title");
const profJobtitle = document.querySelector(".profile__description");

const submitForm = openPopupProfileElement.querySelector(".popup__form");

const openCardAddButton = document.querySelector(".profile__add-button");
const openPopupAddElement = document.querySelector(".popup_type_new-card");
const closePopupAddButton = openPopupAddElement.querySelector(".popup__close");

const submitCard = openPopupAddElement.querySelector(".popup__form");

const openPopupElement = document.querySelector(".popup_type_image");
const closePopupButton = openPopupElement.querySelector(".popup__close");

const cardName = openPopupAddElement.querySelector(
  ".popup__input_type_card-name"
);
const cardLink = openPopupAddElement.querySelector(".popup__input_type_url");

const openPopupElementImage = openPopupElement.querySelector(".popup__image");
const openPopupElementCaption =
  openPopupElement.querySelector(".popup__caption");

//СОЗДАНИЕ КАРТОЧЕК

initialCards.forEach(function ({ link, name }) {
  const cardNew = createCard(link, name, deleteCard, generatePopup, likeCard);
  cardsOnline.append(cardNew);
});

//ОТКРЫТИЯ/ЗАКРЫТИЕ КАРТОЧКИ ПРОФАЙЛ

openProfileEditButton.addEventListener("click", function () {
  nameInput.value = profName.textContent;
  jobInput.value = profJobtitle.textContent;
  openPopup(openPopupProfileElement);
});
closePopupEditButton.addEventListener("click", function () {
  closePopup(openPopupProfileElement);
});

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ И ОТПРАВКА //СОРАНЯЕМ ИЗМЕНЕНИЯ В ПРОФАЙЛЕ

submitForm.addEventListener("submit", handleFormSubmit);
function handleFormSubmit(evt) {
  evt.preventDefault();
  profName.textContent = nameInput.value;
  profJobtitle.textContent = jobInput.value;
  closePopup(openPopupProfileElement);
}

// ДОБАВЛЯЕМ/ЗАКРЫВАЕМ НОВУЮ КАРТОЧКУ

openCardAddButton.addEventListener("click", function () {
  openPopup(openPopupAddElement);
});
closePopupAddButton.addEventListener("click", function () {
  closePopup(openPopupAddElement);
});

//СОРАНЯЕМ ИЗМЕНЕНИЯ В НАЗВАНИИ НОВОЙ КАРТОЧКИ

submitCard.addEventListener("submit", handlecardSubmit);
function handlecardSubmit(evt) {
  evt.preventDefault();
  const cardadd = createCard(cardLink.value, cardName.value, deleteCard, generatePopup, likeCard);
  cardsOnline.prepend(cardadd);
  evt.target.reset();
  //cardLink.value = '';
  //cardName.value = '';
  closePopup(openPopupAddElement);
}

// ЗАКРЫВАЕМ КАРТОЧКУ (ОТКРЫТА ПРИ НАЖАТИИ НА НЕЁ (ОТКРЫВАЕМ В card.js))

closePopupButton.addEventListener("click", function () {
  closePopup(openPopupElement);
});

// Ф-Я ОТКРЫВАНИЯ КАРТОЧКИ ПРИ КЛИКЕ

function generatePopup(initialCardsLink, initialCardsName) {
  openPopupElementImage.src = initialCardsLink;
  openPopupElementCaption.textContent = initialCardsName;
  openPopupElementImage.alt = initialCardsName;
  openPopup(openPopupElement);

}
