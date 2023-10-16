type ValidationElementsProps = {
  inputSelector: string;
  buttonSelector: string;
  errorSelector: string;
  inputErrorClass: string;
  buttonDisabledClass: string;
  errorActiveClass: string;
}

export default class Validation {
  private readonly _form: HTMLFormElement | null;
  private readonly _inputSelector: string;
  private readonly _buttonSelector: string;
  private readonly _errorSelector: string;
  private readonly _inputErrorClass: string;
  private readonly _buttonDisabledClass: string;
  private readonly _errorActiveClass: string;

  constructor(
    formSelector: string,
    {
      inputSelector,
      buttonSelector,
      errorSelector,
      inputErrorClass,
      buttonDisabledClass,
      errorActiveClass,
    }: ValidationElementsProps) {
    this._form = document.querySelector(formSelector);
    this._inputSelector = inputSelector;
    this._buttonSelector = buttonSelector;
    this._errorSelector = errorSelector;
    this._inputErrorClass = inputErrorClass;
    this._buttonDisabledClass = buttonDisabledClass;
    this._errorActiveClass = errorActiveClass;
  }

  _showInputError(
    inputElement: HTMLInputElement,
    errorElement: HTMLSpanElement,
    errorMessage: string,
  ) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorActiveClass);
    inputElement.classList.add(this._inputErrorClass);
    inputElement.setAttribute('aria-describedby', `${ this._errorActiveClass }`);
  };

  _hideInputError(
    inputElement: HTMLInputElement,
    errorElement: HTMLSpanElement,
  ) {
    errorElement.classList.remove(this._errorActiveClass);
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
    inputElement.removeAttribute('aria-describedby');
  };

  _checkInputValidity(inputElement: HTMLInputElement) {
    if (
      inputElement
      && inputElement.parentNode
      && inputElement.dataset.invalidMessage
      && inputElement.validationMessage
    ) {
      const errorElement =
        inputElement.parentNode.querySelector(this._errorSelector) as HTMLSpanElement;

      inputElement.validity.patternMismatch
        ? inputElement.setCustomValidity(inputElement.dataset.invalidMessage)
        : inputElement.setCustomValidity('');

      !inputElement.validity.valid
        ? this._showInputError(inputElement, errorElement, inputElement.validationMessage)
        : this._hideInputError(inputElement, errorElement);
    }
  };

  _hasInvalidInput(inputsList: HTMLInputElement[]) {
    return inputsList.some(inputElement =>
      !inputElement.validity.valid);
  };

  _toggleButtonState(
    inputList: HTMLInputElement[],
    buttonElement: HTMLButtonElement,
  ) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._buttonDisabledClass);
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(this._buttonDisabledClass);
      buttonElement.removeAttribute('disabled');
    }
  };

  _setFormEventListeners(formElement: HTMLFormElement) {
    const inputsList = Array.from(formElement.querySelectorAll(this._inputSelector)) as HTMLInputElement[];
    const buttonElement = formElement.querySelector(this._buttonSelector) as HTMLButtonElement;
    this._toggleButtonState(inputsList, buttonElement);
    inputsList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputsList, buttonElement);
      });
    });
    formElement.addEventListener('reset', () => {
      setTimeout(() => this._toggleButtonState(inputsList, buttonElement), 0);
    });
  };

  enableValidation() {
    if (this._form) this._setFormEventListeners(this._form);
  };
}
