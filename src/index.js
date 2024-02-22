import "./pages/index.css";
import {
  httpChangeProfileData,
  httpGetProfileData,
  httpGetCardsData,
  httpAddNewCard,
  httpChangeAvatarImage,
} from "./scripts/api.js";
import { createCard, onLikeCard, onDeleteCard } from "./scripts/card.js";
import { openPopup, closePopup } from "./scripts/modal.js";
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
} from "./scripts/constants.js";

//СОЗДАНИЕ КАРТОЧЕК

let isMyId;

function renderCards(cardsData) {
  for (const cardData of cardsData) {
    const cardNew = createCard(
      cardData,
      generatePopup,
      isMyId,
      onLikeCard,
      onDeleteCard
    );
    cardsOnline.append(cardNew);
  }
}

function renderProfileInfo(profileData) {
  profName.textContent = profileData.name;
  profJobtitle.textContent = profileData.about;
  profAvatar.style.backgroundImage = `url(${profileData.avatar})`;
}

function getInitialData() {
  Promise.all([httpGetProfileData(), httpGetCardsData()]).then(
    ([profileData, cardsData]) => {
      isMyId = profileData._id;
      renderProfileInfo(profileData);
      renderCards(cardsData);
    }
  );
}

getInitialData();

// Ф-Я ОТКРЫВАНИЯ КАРТОЧКИ ПРИ КЛИКЕ

function generatePopup(initialCardsLink, initialCardsName) {
  openPopupElementImage.src = initialCardsLink;
  openPopupElementCaption.textContent = initialCardsName;
  openPopupElementImage.alt = initialCardsName;
  openPopup(openPopupElement);
}

// ЗАКРЫВАЕМ КАРТОЧКУ (ОТКРЫТА ПРИ НАЖАТИИ НА НЕЁ generatePopup)

closePopupButton.addEventListener("click", closeGenerateCard);
function closeGenerateCard() {
  closePopup(openPopupElement);
}

// ВКЛЮЧЕНИЕ ВАЛИДАЦИИ

enableValidation(config);

//ОТКРЫТИЯ/ЗАКРЫТИЕ КАРТОЧКИ ПРОФАЙЛ

openProfileEditButton.addEventListener("click", openProfile);
function openProfile() {
  nameInput.value = profName.textContent;
  jobInput.value = profJobtitle.textContent;
  openPopup(openPopupProfileElement);
}
closePopupEditButton.addEventListener("click", closeProfile);
function closeProfile() {
  clearValidation(form, config);
  closePopup(openPopupProfileElement);
}

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ И ОТПРАВКА //СОРАНЯЕМ ИЗМЕНЕНИЯ В ПРОФАЙЛЕ

submitForm.addEventListener("submit", handleProfileFormSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  button.textContent = "Сохранить...";

  httpChangeProfileData()
    .then((data) => {
      profName.textContent = data.name;
      profJobtitle.textContent = data.about;
      closePopup(openPopupProfileElement);
      clearValidation(form, config);
      button.textContent = "Сохранить";
    })
    .catch((errorRes) => {
      console.error(`Что-то пошло не так: ${errorRes.status}`);
    });
}

// ДОБАВЛЯЕМ/ЗАКРЫВАЕМ НОВУЮ КАРТОЧКУ

openCardAddButton.addEventListener("click", opencardAdd);
function opencardAdd() {
  openPopup(openPopupAddElement);
}
closePopupAddButton.addEventListener("click", closecardAdd);
function closecardAdd() {
  clearValidation(form, config);
  closePopup(openPopupAddElement);
}

// СОРАНЯЕМ НОВУЮ КАРТОЧКУ

submitCard.addEventListener("submit", handlecardSubmit);

function handlecardSubmit(evt) {
  evt.preventDefault();
  button.textContent = "Сохранить...";

  httpAddNewCard()
    .then((cardData) => {
      // const createdCard = createCard(data, generatePopup);
      // isMyId = cardData._id;
      const createdCard = createCard(
        cardData,
        generatePopup,
        isMyId,
        onLikeCard,
        onDeleteCard
      );
      cardsOnline.prepend(createdCard);
      evt.target.reset();
      closePopup(openPopupAddElement);
      button.textContent = "Сохранить";
    })
    .catch((errorRes) => {
      console.error(`Что-то пошло не так: ${errorRes.status}`);
    });
}

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

  httpChangeAvatarImage(evt)
    .then((data) => {
      profAvatar.style.backgroundImage = `url(${data.avatar})`;
      closePopup(openPopupAvatarElement);
      clearValidation(form, config);
      button.textContent = "Сохранить";
    })
    .catch((errorRes) => {
      console.error(`Что-то пошло не так: ${errorRes.status}`);
    });
}
/////////////////// ЗАКРЫТИЕ ПОПАПА ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ КАРТОЧКИ

closePopupCardDeleteButton.addEventListener("click", function () {
  clearValidation(form, config);
  closePopup(openPopupCardDeleteElement);
});
