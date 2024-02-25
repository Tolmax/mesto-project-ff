export { isValid, enableValidation, clearValidation };

// Функция, которая проверяет валидность поля

const isValid = (formElement, inputElement, config) => {
  // Функция, которая добавляет класс с ошибкой
  const showInputError = (formElement, inputElement, errorMessage, config) => {
    inputElement.classList.add(config.inputErrorClass);
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    formError.textContent = errorMessage;
    formError.classList.add(config.errorClass);
  };

  // Функция, которая удаляет класс с ошибкой
  const hideInputError = (formElement, inputElement, config) => {
    // console.log(config.inputErrorClass);
    inputElement.classList.remove(config.inputErrorClass);
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    formError.classList.remove(config.errorClass);
    formError.textContent = "";
  };

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
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
    // console.log("not valid");
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, config);
    // console.log("valid");
  }
};

const setEventListeners = (formElement, config) => {
  // Находим все поля внутри формы, сделаем из них массив методом Array.from
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement, config);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, config);
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement, config);
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

const toggleButtonState = (inputList, buttonElement, config) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactivButton);
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactivButton);
  }
};

//Функция очистки полей после валидации

const clearValidation = (formElement, config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      config.submitButtonSelector
    );

    // Функция, которая удаляет класс с ошибкой
    const hideInputError = (formElement, inputElement, config) => {
      // console.log(config.inputErrorClass);
      inputElement.classList.remove(config.inputErrorClass);
      const formError = formElement.querySelector(`.${inputElement.id}-error`);
      formError.classList.remove(config.errorClass);
      formError.textContent = "";
    };

    inputList.forEach((inputElement) => {
      inputElement.value = "";
      hideInputError(formElement, inputElement, config);
      inputElement.setCustomValidity("");

      toggleButtonState(inputList, buttonElement, config);
    });
  });
};
