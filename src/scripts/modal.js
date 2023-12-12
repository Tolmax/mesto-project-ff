//export {openProfileEdit, closeProfileEdit, escClose, handleFormSubmit, generatePopup, openCard, closeCard};
export {escClose, generatePopup, openCard, closeCard, openProfileEdit, closeProfileEdit, 
    openProfileAdd, closeProfileAdd};



//ФУНКЦИЯ ОТКРЫТИЯ КАРТОЧКИ ПО КЛИКУ НА НЕЙ
const openPopupElement = document.querySelector(".popup_type_image");
const openPopupElementImage = openPopupElement.querySelector(".popup__image");
const openPopupElementCaption = openPopupElement.querySelector(".popup__caption");

function generatePopup(initialCardsLink, initialCardsName) {
    openPopupElementImage.src = initialCardsLink; //вставляем ссылку из карточки
    openPopupElementCaption.textContent = initialCardsName; //вставляем название карточки
    openPopupElementImage.alt = initialCardsName; //вставляем название карточки
    openCard(openPopupElement);
  }
  
function openCard() {
    openPopupElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", escClose);
  }
  
function closeCard() {
    openPopupElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", escClose);
  }

//ФУНКЦИЯ ОТКРЫТИЯ/РЕДАКТИРОВАНИЯ КАРТОЧКИ ПРОФАЙЛ 

const openPopupProfileElement = document.querySelector(".popup_type_edit");

function openProfileEdit() { //функция вставки значений полей импут
    let profName = document.querySelector(".profile__title");
    let profJobtitle = document.querySelector(".profile__description");
    let nameInput = document.querySelector(".popup__input_type_name");
    let jobInput = document.querySelector(".popup__input_type_description");

    nameInput.value = profName.textContent;
    jobInput.value = profJobtitle.textContent;
    openPopupProfileElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", escClose);
  }
function closeProfileEdit() {
    openPopupProfileElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", escClose);
  }

// ДОБАВЛЯЕМ НОВУЮ КАРТОЧКУ

const openPopupAddElement = document.querySelector(".popup_type_new-card");
function openProfileAdd() {
    openPopupAddElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", escClose);
  }
function closeProfileAdd() {
    openPopupAddElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", escClose);
  }

function escClose(evt) {
    if (evt.key === "Escape") {
      console.log(evt);
      closeProfileEdit();
      closeProfileAdd();
      closeCard();
    }
  }

  //openPopupAddElement.classList.add("popup_is-animated");