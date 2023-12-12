export {createCard, deleteCard};
import {generatePopup} from "./modal.js";

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

function createCard(initialCardsLink, initialCardsName, deleteCard) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const likeButton = document.querySelector(".places__list");
  
    cardTitle.textContent = initialCardsName;
    cardImage.alt = "фотография " + initialCardsName;
    cardImage.src = initialCardsLink;
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", deleteCard);
  
    cardImage.addEventListener("click", function () {
      generatePopup(initialCardsLink, initialCardsName);
    });
  
    likeButton.addEventListener("click", like);
  
    return cardElement;
  }

  function like(evt) {
    
    if (evt.target.classList.contains("card__like-button")) {
      evt.target.classList.toggle("card__like-button_is-active");
    };
  }

  function deleteCard(evt) {
    evt.target.parentElement.remove();
  }

  