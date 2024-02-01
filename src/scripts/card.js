import { httpDeleteMyCard, httpLikeCard, httpDislikeCard } from "./api.js";
import { isMyId } from "../index.js";
import {
  openPopupCardDeleteElement,
  submitCardDelete,
  //closePopupCardDeleteButton,
} from "./constants.js";
import { openPopup, closePopup, closeEsc } from "./modal.js";

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

/**
 * @typedef {Object} CardData
 * @property {string} createdAt
 * @property { User[] } likes
 * @property { string } link
 * @property { string } name
 * @property { User } owner
 * @property { string } _id
 */

/**
 * @typedef {Object} User
 * @property {string} about
 * @property {number} avatar
 * @property {number} cohort
 * @property {number} name
 * @property {number} _id
 */

/**
 * @function
 * @param { CardData } cardData Объект с информацией о карточке
 * @param { function } generatePopup
 */
function createCard(cardData, generatePopup) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardNumber = cardElement.querySelector(".card__like-number");

  let isCardILiked = cardLikedByUs(cardData);

  cardTitle.textContent = cardData.name;
  cardImage.alt = "фотография " + cardData.name;
  cardImage.src = cardData.link;
  cardNumber.textContent = cardData.likes.length;

  const changeLikeButtonActiveClass = (isCardILikedLocal) => {
    const activeClass = "card__like-button_is-active";

    if (isCardILikedLocal === true) {
      likeButton.classList.add(activeClass);
    } else {
      likeButton.classList.remove(activeClass);
    }
  };

  changeLikeButtonActiveClass(isCardILiked);

  if (isMyId !== cardData.owner._id) {
    deleteButton.style.visibility = "hidden";
  } else {
    deleteButton.addEventListener("click", function (evt) {

      openPopup(openPopupCardDeleteElement);
      let event = evt;
      console.log(event);
      evt.preventDefault();
      
      submitCardDelete.addEventListener("click", cardDeleteSubmit);

      function cardDeleteSubmit(evt) {
        evt.preventDefault();

        httpDeleteMyCard(cardData._id).then(() => {
          closePopup(openPopupCardDeleteElement);
          document.removeEventListener("keydown", closeEsc);
          deleteCard(event);
        });
      }
    });
  }

  cardImage.addEventListener("click", function () {
    generatePopup(cardData.link, cardData.name);
  });

  likeButton.addEventListener("click", function () {
    const likeCard = () => {
      httpLikeCard(cardData._id)
        .then((newCardData) => {
          isCardILiked = true;
          changeLikeButtonActiveClass(true);
          cardNumber.textContent = newCardData.likes.length;
        })
        .catch(() => {
          console.error("Карточку не получилось лайкнуть");
        });
    };

    const dislikeCard = () => {
      httpDislikeCard(cardData._id)
        .then((newCardData) => {
          isCardILiked = false;
          changeLikeButtonActiveClass(false);
          cardNumber.textContent = newCardData.likes.length;
        })
        .catch(() => {
          console.error("Карточку не получилось дизлайкнуть");
        });
    };

    if (isCardILiked === true) {
      dislikeCard();
    } else {
      likeCard();
    }
  });

  return cardElement;
}

function cardLikedByUs(cardData) {
  let cardIsLikedByUs = false;

  for (const userWhoLiked of cardData.likes) {
    if (userWhoLiked._id === isMyId) {
      return true;
    }
  }
}

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

export { createCard };