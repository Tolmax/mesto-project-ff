// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");

// @todo: DOM узлы
const cardsOnline = document.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard(initialCardsLink, initialCardsName, deleteCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = initialCardsName;
  cardImage.alt = "фотография " + initialCardsName;
  cardImage.src = initialCardsLink;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);
  
  return cardElement;
  
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  evt.target.parentElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function ({ link, name }) {
    //for (i = 0; i < initialCards.length; i = i + 1) {
  const cardNew = createCard(link, name, deleteCard);
  cardsOnline.append(cardNew);

  console.log(cardsOnline);
//}
});

//////////////////////////////////////////////////////////////////////////////////////////

const popupOpenButtonElement = document.querySelector(".profile__edit-button");
const popupNewCardButtonElement = document.querySelector(".profile__add-button");
const popupTapCardButtonElement = document.querySelector(".places__item");
const popupOpenElement = document.querySelector(".popup_type_edit");
const popupCloseButtonElement = document.querySelector(".popup__close");

function openPopup () {
  popupOpenElement.classList.add('popup_is-opened');
};

function closePopup () {
  popupOpenElement.classList.remove('popup_is-opened');
}

popupOpenButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);

popupNewCardButtonElement.addEventListener("click", function(event) {
  popupOpenElement.classList.add('popup_type_edit');
});

popupTapCardButtonElement.addEventListener("click", openPopup);


//popupOpen.addEventListener("click", function() {

//}

