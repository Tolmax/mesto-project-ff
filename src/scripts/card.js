import { httpDeleteMyCard, httpLikeCard, httpDislikeCard } from "./api.js";
import { isMyId } from "../index.js";
import { openPopupCardDeleteElement, submitCardDelete } from "./constants.js";
import { openPopup, closePopup } from "./modal.js";
export { createCard, onLikeCard, onDeleteCard, cardDeleteSubmit };

// const cardTemplate = document
//   .querySelector("#card-template")
//   .content.querySelector(".card");

function createCard(cardData, generatePopup, isMyId, onLikeCard, onDeleteCard) {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".card");
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardNumber = cardElement.querySelector(".card__like-number");

  cardTitle.textContent = cardData.name;
  cardImage.alt = "фотография " + cardData.name;
  cardImage.src = cardData.link;
  cardNumber.textContent = cardData.likes.length;
  cardElement.dataset.id = cardData._id;

  if (isMyId !== cardData.owner._id) {
    deleteButton.style.visibility = "hidden";
  } else {
    deleteButton.addEventListener("click", function () {
      onDeleteCard(cardData);
    });
  }

  changeLikeButtonActiveClass(likeButton, cardData);

  likeButton.addEventListener("click", function () {
    onLikeCard(cardData, cardElement);
  });

  cardImage.addEventListener("click", function () {
    generatePopup(cardData.link, cardData.name);
  });

  return cardElement;
}

function changeLikeButtonActiveClass(likeButton, cardData) {
  const isCardILiked = cardLikedByUs(cardData);
  const activeClass = "card__like-button_is-active";

  if (isCardILiked === true) {
    likeButton.classList.add(activeClass);
  } else {
    likeButton.classList.remove(activeClass);
  }
}

///////////////////// ЛАЙК КАРТОЧКИ ///////////////////////

function cardLikedByUs(cardData) {
  for (const userWhoLiked of cardData.likes) {
    if (userWhoLiked._id === isMyId) {
      return true;
    }
  }

  return false;
}

function onLikeCard(cardData, element) {
  const cardNumber = element.querySelector(".card__like-number");
  const likeButton = element.querySelector(".card__like-button");

  const likeCard = () => {
    httpLikeCard(cardData._id)
      .then((newCardData) => {
        // console.log('likeCard id', newCardData._id);
        changeLikeButtonActiveClass(likeButton, newCardData);
        cardNumber.textContent = newCardData.likes.length;
      })
      .catch(() => {
        console.error("Карточку не получилось лайкнуть");
      });
  };

  const dislikeCard = () => {
    httpDislikeCard(cardData._id)
      .then((newCardData) => {
        console.log("dislikeCard id", newCardData._id);
        changeLikeButtonActiveClass(likeButton, newCardData);
        cardNumber.textContent = newCardData.likes.length;
      })
      .catch(() => {
        console.error("Карточку не получилось дизлайкнуть");
      });
  };

  if (likeButton.classList.contains("card__like-button_is-active")) {
    dislikeCard();
  } else {
    likeCard();
  }
}

//////////////////// УДАЛЕНИЕ КАРТОЧКИ ///////////////////////////

//Функция, которая открывает модалку с кнопкой удаления карточки

function onDeleteCard(cardData) {
  openPopupCardDeleteElement.dataset.id = cardData._id;
  openPopup(openPopupCardDeleteElement);
  submitCardDelete.addEventListener("click", cardDeleteSubmit);
}

// подтверждаем удаление

function cardDeleteSubmit() {
  const idDeletedCard = openPopupCardDeleteElement.dataset.id;
  const cardDeleted = document.querySelector(
    `.card[data-id='${idDeletedCard}']`
  );

  httpDeleteMyCard(idDeletedCard).then(() => {
    closePopup(openPopupCardDeleteElement);
    submitCardDelete.removeEventListener("click", cardDeleteSubmit);
    cardDeleted.remove();
  });
}

