export { closeEsc, openPopup, closePopup };

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
    closePopup(openPopupProfileElement);
    closePopup(openPopupAddElement);
    closePopup(openPopupElement);
  }
}
//ЗАКРЫВАЕМ ПО КЛИКУ ПО ПОЛЮ OVERLAY И КРЕСТИКУ

popups.forEach(function (item) {
  item.addEventListener("click", function (evt) {
    if (evt.target === item) {
      closePopup(openPopupProfileElement);
      closePopup(openPopupAddElement);
      closePopup(openPopupElement);
    }
  });
});

//АЛЬТЕРНАТИВА ЗАКРЫТИЮ КЛИКУ ПО ПОЛЮ

//document.addEventListener('click', function(evt) {
//  const closepopupsOverley = evt.target;
//  if (popupOverley.matches('.popup')) {
//  openPopupProfileElement.classList.remove("popup_is-opened");
//  openPopupAddElement.classList.remove("popup_is-opened");
//  openPopupElement.classList.remove("popup_is-opened");
//  document.addEventListener("keydown", escClose);
//  }
//})

//popups.forEach((popup) => {
//  popup.addEventListener("mousedown", (evt) => {
//    if (evt.target.classList.contains("popup_is-opened")) {
//      closePopup(popup);
//    }
//    if (evt.target.classList.contains("popup__close")) {
//      closePopup(popup);
//    }
//  });
//});

    //openPopupProfileElement.classList.remove("popup_is-opened");
    //openPopupAddElement.classList.remove("popup_is-opened");
    //openPopupElement.classList.remove("popup_is-opened");
