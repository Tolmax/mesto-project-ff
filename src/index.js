import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard } from "./scripts/card.js";
import { openPopup, closePopup, escClose } from "./scripts/modal.js";

//СОЗДАНИЕ КАРТОЧЕК

const cardsOnline = document.querySelector(".places__list");
initialCards.forEach(function ({ link, name }) {
  const cardNew = createCard(link, name, deleteCard);
  cardsOnline.append(cardNew);
});

//const popup = document.querySelectorAll('.popup')
//ОТКРЫТИЯ/ЗАКРЫТИЕ КАРТОЧКИ ПРОФАЙЛ

const openProfileEditButton = document.querySelector(".profile__edit-button");
const openPopupProfileElement = document.querySelector(".popup_type_edit");
const closePopupEditButton = document.querySelector(".popup__close");

openProfileEditButton.addEventListener("click", openPopup);
closePopupEditButton.addEventListener("click", closePopup);

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ И ОТПРАВКА

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profName = document.querySelector(".profile__title");
const profJobtitle = document.querySelector(".profile__description");

const submitForm = openPopupProfileElement.querySelector(".popup__form");
submitForm.addEventListener("submit", handleFormSubmit);
function handleFormSubmit(evt) {
  //СОРАНЯЕМ ИЗМЕНЕНИЯ В ПРОФАЙЛЕ
  evt.preventDefault();
  profName.textContent = nameInput.value;
  profJobtitle.textContent = jobInput.value;
  openPopupProfileElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escClose);
}

// ДОБАВЛЯЕМ НОВУЮ КАРТОЧКУ

const openCardAddButton = document.querySelector(".profile__add-button");
const openPopupAddElement = document.querySelector(".popup_type_new-card");
const closePopupAddButton = openPopupAddElement.querySelector(".popup__close");

openCardAddButton.addEventListener("click", openPopup);
closePopupAddButton.addEventListener("click", closePopup);

const submitCard = openPopupAddElement.querySelector(".popup__form");
submitCard.addEventListener("submit", handlecardSubmit);
function handlecardSubmit(evt) {
  //СОРАНЯЕМ ИЗМЕНЕНИЯ В НАЗВАНИИ НОВОЙ КАРТОЧКИ
  evt.preventDefault();
  const cardName = openPopupAddElement.querySelector(
    ".popup__input_type_card-name"
  );
  const cardLink = openPopupAddElement.querySelector(".popup__input_type_url");
  const cardadd = createCard(cardLink.value, cardName.value, deleteCard);
  cardsOnline.prepend(cardadd);
  openPopupAddElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escClose);
}

// ОТКРЫВАЕМ/ЗАКРЫВАЕМ КАРТОЧКУ ПРИ НАЖАТИИ НА НЕЕ

const openPopupElement = document.querySelector(".popup_type_image");
const closePopupButton = openPopupElement.querySelector(".popup__close");
closePopupButton.addEventListener("click", closePopup);

//ЗАКРЫВАЕМ ПО КЛИКУ ПО ПОЛЮ

const popupOverley = document.querySelectorAll(".popup");
popupOverley.forEach(function (item) {
  item.addEventListener("click", function (evt) {
    if (evt.target === item) {
      openPopupProfileElement.classList.remove("popup_is-opened");
      openPopupAddElement.classList.remove("popup_is-opened");
      openPopupElement.classList.remove("popup_is-opened");
      document.addEventListener("keydown", escClose);
    }
  });
});

//АЛЬТЕРНАТИВА ЗАКРЫТИЮ КЛИКУ ПО ПОЛЮ
//document.addEventListener('click', function(evt) {
//  const popupOverley = evt.target;
//  if (popupOverley.matches('.popup')) {
//  openPopupProfileElement.classList.remove("popup_is-opened");
//  openPopupAddElement.classList.remove("popup_is-opened");
//  openPopupElement.classList.remove("popup_is-opened");
//  document.addEventListener("keydown", escClose);
//  }
//})
