// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  inputElement.classList.add("popup__input_type_error");
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  formError.textContent = errorMessage;
  formError.classList.add("popup__input-error_active");
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  inputElement.classList.remove("popup__input_type_error");
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  formError.classList.remove("popup__input-error_active");
  formError.textContent = "";
};

// Функция, которая проверяет валидность поля

export const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    // если передать пустую строку, то будут доступны стандартные браузерные сообщения
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
    console.log("not valid");
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
    console.log("valid");
  }
};

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы, сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));

  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(".popup__button");

  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(".popup__form"));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement);
  });
};

//  Блокируем кнопку отправки формы

// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  });
};

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button_inactive");
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button_inactive");
  }
};

//Функция очистки полей после валидации

export const clearValidation = (formElement, config) => {
  //console.log(config);
  const formList = Array.from(document.querySelectorAll(".popup__form"));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    //console.log(formElement);
    //console.log(inputList, 'inputList');
    const buttonElement = formElement.querySelector(
      config.submitButtonSelector
    );

    inputList.forEach((inputElement) => {
      //console.log(inputElement);
      inputElement.value = "";
      hideInputError(formElement, inputElement);
      inputElement.setCustomValidity("");

      toggleButtonState(inputList, buttonElement);
    });
  });
};
