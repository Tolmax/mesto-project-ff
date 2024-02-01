import "./pages/index.css";
//import { initialCards } from "./scripts/cards.js";
import {
  initApp,
  httpChangeProfileData,
  httpAddNewCard,
  getMyId,
  httpChangeAvatarImage,
  httpDeleteMyCard
} from "./scripts/api.js";
import { createCard } from "./scripts/card.js";
import { openPopup, closePopup, closeEsc } from "./scripts/modal.js";
import { enableValidation } from "./scripts/validation.js";
import { clearValidation } from "./scripts/validation.js";
export { generatePopup, isMyId };
import {
  cardsOnline,
  openProfileEditButton,
  openPopupProfileElement,
  closePopupEditButton,
  submitForm,
  openAvatarButton,
  openPopupAvatarElement,
  closePopupAvatarButton,
  submitAvatar,
  nameInput,
  jobInput,
  //avatarInput,
  profName,
  profJobtitle,
  profAvatar,
  openCardAddButton,
  openPopupAddElement,
  closePopupAddButton,
  submitCard,
  openPopupElement,
  closePopupButton,
  openPopupElementImage,
  openPopupElementCaption,
  form,
  button,
  config,
  openPopupCardDeleteElement,
  closePopupCardDeleteButton,
  submitCardDelete
} from "./scripts/constants.js";

//СОЗДАНИЕ КАРТОЧЕК

// initialCards.forEach(function ({ link, name }) {
//   const cardNew = createCard(link, name, deleteCard, generatePopup, likeCard);
//   cardsOnline.append(cardNew);
// });

const isMyId = await getMyId();
console.log(isMyId);
initApp();

// Ф-Я ОТКРЫВАНИЯ КАРТОЧКИ ПРИ КЛИКЕ

function generatePopup(initialCardsLink, initialCardsName) {
  openPopupElementImage.src = initialCardsLink;
  openPopupElementCaption.textContent = initialCardsName;
  openPopupElementImage.alt = initialCardsName;
  openPopupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEsc);
}

// включение валидации вызовом enableValidation все настройки передаются при вызове

enableValidation(config, form);

//ОТКРЫТИЯ/ЗАКРЫТИЕ КАРТОЧКИ ПРОФАЙЛ

openProfileEditButton.addEventListener("click", function () {
  nameInput.value = profName.textContent;
  jobInput.value = profJobtitle.textContent;
  openPopup(openPopupProfileElement);
});
closePopupEditButton.addEventListener("click", function () {
  clearValidation(form, config);
  closePopup(openPopupProfileElement);
});

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ И ОТПРАВКА //СОРАНЯЕМ ИЗМЕНЕНИЯ В ПРОФАЙЛЕ

submitForm.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(evt) {
  evt.preventDefault();
  button.textContent = "Сохранить...";
  //console.log(button);

  httpChangeProfileData().then((data) => {
    profName.textContent = data.name;
    profJobtitle.textContent = data.about;
    closePopup(openPopupProfileElement);
    document.removeEventListener("keydown", closeEsc);
    clearValidation(form, config);
    button.textContent = "Сохранить";
  });
}

// ДОБАВЛЯЕМ/ЗАКРЫВАЕМ НОВУЮ КАРТОЧКУ

openCardAddButton.addEventListener("click", function () {
  openPopup(openPopupAddElement);
});
closePopupAddButton.addEventListener("click", function () {
  clearValidation(form, config);
  closePopup(openPopupAddElement);
});

// СОРАНЯЕМ НОВУЮ КАРТОЧКУ

submitCard.addEventListener("submit", handlecardSubmit);

function handlecardSubmit(evt) {
  evt.preventDefault();
  button.textContent = "Сохранить...";

  httpAddNewCard().then((data) => {
    const createdCard = createCard(data, generatePopup);
    cardsOnline.prepend(createdCard);
    evt.target.reset();
    closePopup(openPopupAddElement);
    document.removeEventListener("keydown", closeEsc);
    button.textContent = "Сохранить";
  });
}
//
// ЗАКРЫВАЕМ КАРТОЧКУ (ОТКРЫТА ПРИ НАЖАТИИ НА НЕЁ)

closePopupButton.addEventListener("click", function () {
  closePopup(openPopupElement);
});

////////////////////////  МЕНЯЕМ АВАТАР //////////////////////

openAvatarButton.addEventListener("click", function () {
  openPopup(openPopupAvatarElement);
});
closePopupAvatarButton.addEventListener("click", function () {
  clearValidation(form, config);
  closePopup(openPopupAvatarElement);
});

////////////////////////  СОХРАНЯЕМ НОВЫЙ АВАТАР //////////////////////

submitAvatar.addEventListener("submit", avatarSubmit);

function avatarSubmit(evt) {
  evt.preventDefault();

  httpChangeAvatarImage(evt).then((data) => {
    profAvatar.style.backgroundImage = `url(${data.avatar})`;
    closePopup(openPopupAvatarElement);
    document.removeEventListener("keydown", closeEsc);
    clearValidation(form, config);
    button.textContent = "Сохранить";
  });
}
/////////////////// ЗАКРЫТИЕ ПОПАПА ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ КАРТОЧКИ

closePopupCardDeleteButton.addEventListener("click", function () {
  clearValidation(form, config);
  closePopup(openPopupCardDeleteElement);
});

// submitCardDelete.addEventListener("click", cardDeleteSubmit);
  
//   function cardDeleteSubmit(evt) {
//     evt.preventDefault();

//         httpDeleteMyCard(cardData._id)
//           .then((res) => {
//           if (res.ok) return res.json();
//           return Promise.reject(`Ошибка: ${res.status}`);
//           })
          // .then(() => {
          //   console.log(cardData._id)
          //   closePopup(openPopupCardDeleteElement);
          //   document.removeEventListener("keydown", closeEsc);
          //   document.querySelector(".card").cardData._id.remove();
          //   if (res = ok) {
          //     console.log(event)
          //     deleteCard(event);
          //   }
          // })
          //  .then(() => {
          //   deleteCard(event);
          // })
          // .catch(() => {
          //   console.error("Не удалось удалить карточку");
          // });
      //}
