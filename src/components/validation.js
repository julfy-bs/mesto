const showInputError = (formElement, inputElement, errorElement, errorMessage, inputErrorClass, errorActiveClass) => {
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorActiveClass);
  inputElement.classList.add(inputErrorClass);
  inputElement.setAttribute('aria-describedby', `${errorActiveClass}`);
};

const hideInputError = (formElement, inputElement, errorElement, inputErrorClass, errorActiveClass) => {
  errorElement.classList.remove(errorActiveClass);
  errorElement.textContent = '';
  inputElement.classList.remove(inputErrorClass);
  inputElement.removeAttribute('aria-describedby');
};

const checkInputValidity = (formElement, inputElement, errorClass, inputErrorClass, errorActiveClass) => {
  const errorElement = inputElement.parentNode.querySelector(errorClass);

  inputElement.validity.patternMismatch
    ? inputElement.setCustomValidity(inputElement.dataset.invalidMessage)
    : inputElement.setCustomValidity('');

  !inputElement.validity.valid
    ? showInputError(formElement, inputElement, errorElement, inputElement.validationMessage, inputErrorClass, errorActiveClass)
    : hideInputError(formElement, inputElement, errorElement, inputErrorClass, errorActiveClass);
};

// Совет по выносу логики блокировки кнопки в функцию взаимодействия с закрытием попапа дал наставник со словами "подстраивать код под логику, а не наоборот. 😊"
const hasInvalidInput = (inputsList) => {
  return inputsList.some(inputElement => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled', 'disabled');
  }
};

const setFormEventListeners = (formElement, inputSelector, buttonSelector, errorSelector, inputErrorClass, buttonInactiveClass, errorActiveClass) => {
  const inputsList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(buttonSelector);
  toggleButtonState(inputsList, buttonElement, buttonInactiveClass);
  inputsList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, errorSelector, inputErrorClass, errorActiveClass);
      toggleButtonState(inputsList, buttonElement, buttonInactiveClass);
    });
  });
  formElement.addEventListener('reset', () => {
    setTimeout(() => toggleButtonState(inputsList, buttonElement, buttonInactiveClass), 0);
  });
};

const enableValidation = (validationConfig) => {
  const formsList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formsList.forEach(form => setFormEventListeners(
    form,
    validationConfig.inputSelector,
    validationConfig.buttonSelector,
    validationConfig.errorSelector,
    validationConfig.inputErrorClass,
    validationConfig.buttonDisabledClass,
    validationConfig.errorActiveClass,
  ));
};

export {
  enableValidation
};
