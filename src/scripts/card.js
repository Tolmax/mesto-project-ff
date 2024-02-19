import { httpDeleteMyCard, httpLikeCard, httpDislikeCard } from "./api.js";
import { isMyId } from "../index.js";
import { openPopupCardDeleteElement, submitCardDelete } from "./constants.js";
import { openPopup, closePopup, closeEsc } from "./modal.js";
export { createCard };

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

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


  if (isMyId !== cardData.owner._id) {
    deleteButton.style.visibility = "hidden";
  } else {
  deleteButton.addEventListener("click", function() {
    onDeleteCard(cardData, cardElement)})
  }
  

  function changeLikeButtonActiveClass(isCardILikedLocal) {
    const activeClass = "card__like-button_is-active";
  
    if (isCardILikedLocal === true) {
      likeButton.classList.add(activeClass);
    } else {
      likeButton.classList.remove(activeClass);
    }
  }
  changeLikeButtonActiveClass(isCardILiked);

  likeButton.addEventListener("click", function () { 
    cardLikedByUs(cardData);
    console.log(cardLikedByUs(cardData));
    console.log(cardData.likes._id);
    console.log(isMyId);
    onLikeCard(cardData, cardElement, changeLikeButtonActiveClass);
  });

  // likeButton.addEventListener("click", function () {
    
  //   const likeCard = () => {
  //     httpLikeCard(cardData._id)
  //       .then((newCardData) => {
  //         isCardILiked = true;
  //         changeLikeButtonActiveClass(true);
  //         cardNumber.textContent = newCardData.likes.length;
  //       })
  //       .catch(() => {
  //         console.error("Карточку не получилось лайкнуть");
  //       });
  //   };

  //   const dislikeCard = () => {
  //     httpDislikeCard(cardData._id)
  //       .then((newCardData) => {
  //         isCardILiked = false;
  //         changeLikeButtonActiveClass(false);
  //         cardNumber.textContent = newCardData.likes.length;
  //       })
  //       .catch(() => {
  //         console.error("Карточку не получилось дизлайкнуть");
  //       });
  //   };

  //   if (isCardILiked === true) {
  //     dislikeCard();
  //   } else {
  //     likeCard();
  //   }
  // });

// увеличиваем карточку

  cardImage.addEventListener("click", function () {
    generatePopup(cardData.link, cardData.name);
  });

  return cardElement;
}

///////////////////// ЛАЙК КАРТОЧКИ ///////////////////////

function cardLikedByUs(cardData) {
  let cardIsLikedByUs = false;

  for (const userWhoLiked of cardData.likes) {
    if (userWhoLiked._id === isMyId) {
      return true;
    } 
    // else {
    //   return false;
    // }
  }
}

function onLikeCard(cardData, element, changeLikeButtonActiveClass) {
  const cardNumber = element.querySelector('.card__like-number')
  const likeButton = element.querySelector(".card__like-button");
  const likeCard = () => {
    httpLikeCard(cardData._id)
      .then((newCardData) => {
        // isCardILiked = true;
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
        // isCardILiked = false;
        changeLikeButtonActiveClass(false);
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
};

///////////////////// ПРОВЕРЯЕМ ЛАЙКАЛИ ЛИ КАРТОЧКУ ПРИ ПЕРВОМ ПОЛУЧЕНИИ ДАННЫХ С СЕРВЕРА //////////////

// const changeLikeButtonActiveClass = (isCardILikedLocal) => {
//   const activeClass = "card__like-button_is-active";
//   console.log(likeButton)
//   if (isCardILikedLocal === true) {
//     likeButton.classList.add(activeClass);
//   } else {
//     likeButton.classList.remove(activeClass);
//   }
// }

 
//////////////////// УДАЛЕНИЕ КАРТОЧКИ ///////////////////////////

  function onDeleteCard(cardData, element) {
    openPopup(openPopupCardDeleteElement);
    submitCardDelete.addEventListener("click", cardDeleteSubmit);
    function cardDeleteSubmit() {
      const delButton = element.querySelector(".card__delete-button");
      httpDeleteMyCard(cardData._id).then(() => {
        
        closePopup(openPopupCardDeleteElement);
        document.removeEventListener("keydown", closeEsc);
        submitCardDelete.removeEventListener("click", cardDeleteSubmit);
        delButton.closest(".card").remove();
      });
    }
  } 