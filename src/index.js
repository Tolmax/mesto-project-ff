import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import {createCard, deleteCard} from "./scripts/card.js";
import {closeCard, openProfileEdit, closeProfileEdit, 
  openProfileAdd, closeProfileAdd} from "./scripts/modal.js";

//СОЗДАНИЕ КАРТОЧЕК

const cardsOnline = document.querySelector(".places__list");
initialCards.forEach(function ({ link, name }) {
  const cardNew = createCard(link, name, deleteCard);
  cardsOnline.append(cardNew);
});

//ОТКРЫТИЯ/ЗАКРЫТИЕ КАРТОЧКИ ПРОФАЙЛ

const openProfileEditButton = document.querySelector(".profile__edit-button");
const openPopupProfileElement = document.querySelector(".popup_type_edit");
const closePopupEditButton = document.querySelector(".popup__close");
openProfileEditButton.addEventListener("click", openProfileEdit);
closePopupEditButton.addEventListener("click", closeProfileEdit);

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ И ОТПРАВКА

let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_description");
let profName = document.querySelector(".profile__title");
let profJobtitle = document.querySelector(".profile__description");

const submitForm = openPopupProfileElement.querySelector(".popup__form");
submitForm.addEventListener("submit", handleFormSubmit);
function handleFormSubmit(evt) { //СОРАНЯЕМ ИЗМЕНЕНИЯ В ПРОФАЙЛЕ
  evt.preventDefault();
  profName.textContent = nameInput.value;
  profJobtitle.textContent = jobInput.value;
  closeProfileEdit();
}  

// ДОБАВЛЯЕМ НОВУЮ КАРТОЧКУ

const openCardAddButton = document.querySelector(".profile__add-button");
const openPopupAddElement = document.querySelector(".popup_type_new-card");
const closePopupAddButton = openPopupAddElement.querySelector(".popup__close");

const submitCard = openPopupAddElement.querySelector(".popup__form");
submitCard.addEventListener("submit", handlecardSubmit);
function handlecardSubmit(evt) {//СОРАНЯЕМ ИЗМЕНЕНИЯ В ПОПАПЕ ПРИ ОТКРЫТИИ
  evt.preventDefault();
  const cardName = openPopupAddElement.querySelector(".popup__input_type_card-name");
  const cardLink = openPopupAddElement.querySelector(".popup__input_type_url");
  const cardadd = createCard(cardLink.value, cardName.value, deleteCard);
  cardsOnline.prepend(cardadd);
  closeProfileAdd();
}

openCardAddButton.addEventListener("click", openProfileAdd);
closePopupAddButton.addEventListener("click", closeProfileAdd);

// ОТКРЫВАЕМ/ЗАКРЫВАЕМ КАРТОЧКУ ПРИ НАЖАТИИ НА НЕЕ

const openPopupElement = document.querySelector(".popup_type_image");
//const openPopupElementImage = openPopupElement.querySelector(".popup__image");
//const openPopupElementCaption = openPopupElement.querySelector(".popup__caption");
const closePopupButton = openPopupElement.querySelector(".popup__close");
closePopupButton.addEventListener("click", closeCard);

//ЗАКРЫВАЕМ ПО КЛИКУ ПО ПОЛЮ

const popupOverley = document.querySelectorAll(".popup");
popupOverley.forEach(function (item) {
  item.addEventListener("click", function (evt) {
    if (evt.target === item) {
      closeProfileEdit();
      closeProfileAdd();
      closeCard();
    }
  });
});

//АЛЬТЕРНАТИВА ЗАКРЫТИЮ КЛИКУ ПО ПОЛЮ
//document.addEventListener('click', function(evt) {
//  const popupOverley = evt.target;
//  if (popupOverley.matches('.popup')) {
//   closeProfileEdit();
//  closeProfileAdd();
//   closeCard();
//  }
//})



