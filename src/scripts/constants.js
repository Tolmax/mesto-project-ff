export {
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
    avatarInput,
    profName,
    profJobtitle,
    profAvatar,
    //isMyId,
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
  };

const cardsOnline = document.querySelector(".places__list");

const openProfileEditButton = document.querySelector(".profile__edit-button");
const openPopupProfileElement = document.querySelector(".popup_type_edit");
const closePopupEditButton =
  openPopupProfileElement.querySelector(".popup__close");
const submitForm = openPopupProfileElement.querySelector(".popup__form");

const openAvatarButton = document.querySelector(".profile__image");
const openPopupAvatarElement = document.querySelector(".popup_type_avatar");
const closePopupAvatarButton =
  openPopupAvatarElement.querySelector(".popup__close");
const submitAvatar = openPopupAvatarElement.querySelector(".popup__form");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const avatarInput = document.querySelector(".popup__input_type_urlavatar");

const profName = document.querySelector(".profile__title");
const profJobtitle = document.querySelector(".profile__description");
const profAvatar = document.querySelector(".profile__image");

const openCardAddButton = document.querySelector(".profile__add-button");
const openPopupAddElement = document.querySelector(".popup_type_new-card");
const closePopupAddButton = openPopupAddElement.querySelector(".popup__close");
const submitCard = openPopupAddElement.querySelector(".popup__form");

const openPopupElement = document.querySelector(".popup_type_image");
const closePopupButton = openPopupElement.querySelector(".popup__close");



const openPopupElementImage = openPopupElement.querySelector(".popup__image");
const openPopupElementCaption =
  openPopupElement.querySelector(".popup__caption");

const form = document.querySelector(".popup__form");
//const formInput = form.querySelector('.popup__input');
//const formError = form.querySelector('.popup__input-error');
const button = form.querySelector(".popup__button");

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_active",
};

const openPopupCardDeleteElement = document.querySelector('.popup_type_confirm');
const closePopupCardDeleteButton =
openPopupCardDeleteElement.querySelector(".popup__close");
const submitCardDelete = openPopupCardDeleteElement.querySelector(".popup__button");