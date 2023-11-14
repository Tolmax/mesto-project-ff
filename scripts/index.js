// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsOnline = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(initialCardsLink, initialCardsName, deleteCard) {

    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = initialCardsLink;
    cardElement.querySelector('.card__image').alt = 'фотография ' + initialCardsName;
    cardElement.querySelector('.card__title').textContent = initialCardsName;
    
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);

    return cardElement;
};

// @todo: Функция удаления карточки
    function deleteCard(evt) {
        evt.target.parentElement.remove();
    }
   
// @todo: Вывести карточки на страницу
    initialCards.forEach(function({link, name}) {
    
        const cardNew = createCard(link, name, deleteCard);
        cardsOnline.append(cardNew);
        
        console.log(cardsOnline);
    });
    
   /*function deleteCard() {
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
        const deleteButton = cardElement.querySelector('.card__delete-button');
        const listItem = deleteButton.closest('.card');
        listItem.remove();
    }*/  