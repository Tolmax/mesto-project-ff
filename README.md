###Проект **МЕСТО** это  практическая работа по использованию большинства знаний, полученных во время занятий на курсах *"ФронтЕнд Разработчик"* от *"Яндекс Практикум"* во время шестоо спринта.### 

###*HTML* и *CSS* файлы были сделаны заранее###

###Больше всего мне понравились задания по реализации функционала *POPUP* с помощью элементов и методов языка *JavaScript*. Это позволяет сайту интерактивно общаться с пользователем. редактировать названия. вставлять и удалять новые карточки, выбирать понравившиеся.###

###Самое сложное было разобраться с написанием команд в *JavaScript*. Понять какие именно методы нужны и как их применить. Как написать функцию открытия окна или закрытия, которая выполняет сразу несколько действий. Правильно выбрать Слушателей по управлению кликами мышкой и нажатием клавиатуры.###

###При написании проекта использовались языки *html*, *css* и *JavaScript*, а также проект структурирован по *БЭМ*. Сам проект упакован в программе *WEBPACK*, а разные по действиям функции вынесены разные модули, а потом экспортированы в один.###

###После сдачи проекта я хочу более внимательно повторить 6 спринт и почитать побольше о применении *JavaScript* на практике. ###
```JavaScript
function generatePopup(initialCardsLink, initialCardsName) {
    openPopupElementImage.src = initialCardsLink; //вставляем ссылку из карточки
    openPopupElementCaption.textContent = initialCardsName; //вставляем название карточки
    openPopupElementImage.alt = initialCardsName; //вставляем название карточки
    openCard(openPopupElement);
  }  
```
##Ссылка на проект https://tolmax.github.io/mesto/ ##


