export { closeEsc, openPopup, closePopup };
// import { cardDeleteSubmit } from "./card.js";
import {
  openPopupProfileElement,
  openPopupAvatarElement,
  openPopupAddElement,
  openPopupElement,
  form,
  config,
  openPopupCardDeleteElement,
  // submitCardDelete,
  popups
} from "./constants.js";
import { clearValidation } from "./validation.js";

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEsc);
  // submitCardDelete.removeEventListener("click", cardDeleteSubmit);
}

function closeEsc(evt) {
  if (evt.key === "Escape") {
    clearValidation(form, config);
    closePopup(openPopupProfileElement);
    closePopup(openPopupAddElement);
    closePopup(openPopupElement);
    closePopup(openPopupAvatarElement);
    closePopup(openPopupCardDeleteElement);
  }
}
//ЗАКРЫВАЕМ ПО КЛИКУ ПО ПОЛЮ OVERLAY

popups.forEach(function(popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target === popup) {
      clearValidation(form, config);
      closePopup(openPopupProfileElement);
      closePopup(openPopupAddElement);
      closePopup(openPopupElement);
      closePopup(openPopupAvatarElement);
      closePopup(openPopupCardDeleteElement);
    }
  });
});


// // const popups = document.querySelectorAll('.popup'); //Ищем все попапы
// popups.forEach((popup) => {
// popup.addEventListener('click', (evt) => {
// //Благодаря всплытию при клике на крестик мы поймаем событие на элементе попапа.
// //Проверяем что кликнули на оверлей или на крестик.
// if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')){
// //В currentTarget у нас всегда будет элемент на котором мы поймали событие, т.е. попап.
// clearValidation(form, config);  // не забыть удалить!!
// closePopup(popup);
// }
// });
// });
