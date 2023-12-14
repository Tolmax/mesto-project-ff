export { createCard, deleteCard, generatePopup, likeCard };
import { closeEsc } from "./modal.js";

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

function createCard(
  initialCardsLink,
  initialCardsName,
  deleteCard,
  generatePopup,
  likeCard
) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = document.querySelector(".places__list");

  cardTitle.textContent = initialCardsName;
  cardImage.alt = "фотография " + initialCardsName;
  cardImage.src = initialCardsLink;

  deleteButton.addEventListener("click", deleteCard);
  
  //deleteButton.addEventListener("click", function() {
  // const listItem = deleteButton.closest('.card');
  // listItem.remove();
  //});

  cardImage.addEventListener("click", function () {
    generatePopup(initialCardsLink, initialCardsName);
  });

  likeButton.addEventListener("click", likeCard);

  return cardElement;
}

function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

function deleteCard(evt) {
  evt.target.parentElement.remove();
};

//function deleteCard(evt) {
//  evt.target.parentElement.remove();
//};


  //const deleteButton = cardElement.querySelector(".card__delete-button");
  //const listItem = deleteButton.closest('.card');

//ФУНКЦИЯ ОТКРЫТИЯ КАРТОЧКИ ПО КЛИКУ НА НЕЙ

function generatePopup(initialCardsLink, initialCardsName) {
  const openPopupElement = document.querySelector(".popup_type_image");
  const openPopupElementImage = openPopupElement.querySelector(".popup__image");
  const openPopupElementCaption =
    openPopupElement.querySelector(".popup__caption");
  openPopupElementImage.src = initialCardsLink;
  openPopupElementCaption.textContent = initialCardsName;
  openPopupElementImage.alt = initialCardsName;
  openPopupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEsc);
}
