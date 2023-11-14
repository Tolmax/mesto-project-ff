// @todo: Темплейт карточки
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

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
  const cardNew = createCard(link, name, deleteCard);
  cardsOnline.append(cardNew);

  console.log(cardsOnline);
});
