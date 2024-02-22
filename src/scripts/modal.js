export { closeEsc, openPopup, closePopup };
import { cardDeleteSubmit } from "./card.js";
import {
  openPopupProfileElement,
  openPopupAvatarElement,
  openPopupAddElement,
  openPopupElement,
  form,
  config,
  openPopupCardDeleteElement,
  submitCardDelete,
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
  submitCardDelete.removeEventListener("click", cardDeleteSubmit);
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
  // console.log(item);
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
