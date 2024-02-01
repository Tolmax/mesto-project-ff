export { closeEsc, openPopup, closePopup };
import {
  // cardsOnline,
  // openProfileEditButton,
  openPopupProfileElement,
  // closePopupEditButton,
  // submitForm,
  // openAvatarButton,
  openPopupAvatarElement,
  // closePopupAvatarButton,
  // submitAvatar,
  // nameInput,
  // jobInput,
  // avatarInput,
  // profName,
  // profJobtitle,
  // profAvatar,
  //isMyId,
  // openCardAddButton,
  openPopupAddElement,
  // closePopupAddButton,
  // submitCard,
  openPopupElement,
  // closePopupButton,
  // openPopupElementImage,
  // openPopupElementCaption,
  form,
  //button,
  config,
  openPopupCardDeleteElement,
  //closePopupCardDeleteButton
} from "./constants.js";
import { clearValidation } from "./validation.js";
//../scripts/validation


const popups = document.querySelectorAll(".popup");

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEsc);
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

popups.forEach(function (item) {
  item.addEventListener("click", function (evt) {
    if (evt.target === item) {
      clearValidation(form, config);
      closePopup(openPopupProfileElement);
      closePopup(openPopupAddElement);
      closePopup(openPopupElement);
      closePopup(openPopupAvatarElement);
      closePopup(openPopupCardDeleteElement);
    }
  });
});
