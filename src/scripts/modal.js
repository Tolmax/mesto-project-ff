export { closeEsc, openPopup, closePopup };
import { form, config } from "../index";
import { clearValidation } from "../scripts/validation";

const openPopupProfileElement = document.querySelector(".popup_type_edit");

const openPopupAddElement = document.querySelector(".popup_type_new-card");

const openPopupElement = document.querySelector(".popup_type_image");

const openPopupAvatarElement = document.querySelector(".popup_type_avatar");

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
    }
  });
});
