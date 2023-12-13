export { escClose, openPopup, closePopup };



const openProfileEditButton = document.querySelector(".profile__edit-button");
const openPopupProfileElement = document.querySelector(".popup_type_edit");
const closePopupEditButton =
  openPopupProfileElement.querySelector(".popup__close");

const openCardAddButton = document.querySelector(".profile__add-button");
const openPopupAddElement = document.querySelector(".popup_type_new-card");
const closePopupAddButton = openPopupAddElement.querySelector(".popup__close");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profName = document.querySelector(".profile__title");
const profJobtitle = document.querySelector(".profile__description");

const openPopupElement = document.querySelector(".popup_type_image");
const closePopupButton = openPopupElement.querySelector(".popup__close");

function openPopup(evt) {
  if (evt.target === openProfileEditButton) {
    nameInput.value = profName.textContent;
    jobInput.value = profJobtitle.textContent;
    openPopupProfileElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", escClose);
  }
  if (evt.target === openCardAddButton) {
    openPopupAddElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", escClose);
  }
}

function closePopup(evt) {
  if (evt.target === closePopupEditButton) {
    openPopupProfileElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", escClose);
  }
  if (evt.target === closePopupAddButton) {
    openPopupAddElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", escClose);
  }
  if (evt.target === closePopupButton) {
    openPopupElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", escClose);
  }
}

function escClose(evt) {
    if (evt.key === "Escape") {
      console.log(evt);
      openPopupProfileElement.classList.remove("popup_is-opened");
      openPopupAddElement.classList.remove("popup_is-opened");
      openPopupElement.classList.remove("popup_is-opened");
      document.addEventListener("keydown", escClose);
    }
  }