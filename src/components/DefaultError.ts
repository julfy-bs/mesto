import Config from '../vendor/config/index.js';

export default class DefaultError {
  _errorTemplate: HTMLTemplateElement | null;
  _wrapperElement: HTMLTemplateElement | null;
  code: number;
  body: string;

  constructor(code?: number, body?: string) {
    this._errorTemplate =
      (<HTMLTemplateElement> document.querySelector(Config.Error.TEMPLATE))
        .content.querySelector(Config.Error.SELECTOR);
    this._wrapperElement = document.querySelector(Config.Error.WRAPPER);
    this.code = code || 400;
    this.body = body || 'Критическая ошибка приложения.';
  }

  _addErrorActiveClass(errorElement: HTMLElement) {
    if (this._wrapperElement) {
      errorElement.classList.add(Config.Error.ACTIVE_CLASS);
      this._wrapperElement.classList.add('error_active');
    }
  }

  _removeErrorActiveClass(errorElement: HTMLElement) {
    if (this._wrapperElement) {
      errorElement.classList.remove(Config.Error.ACTIVE_CLASS);
      this._wrapperElement.classList.remove('error_active');
    }
  };

  _closeButtonListener = (errorElement: HTMLElement) => {
    this._removeErrorActiveClass(errorElement);
    setTimeout(() => errorElement.remove(), 500);
  };

  createError() {
    const errorItem = this._errorTemplate?.cloneNode(true) as HTMLElement;
    const errorItemTitle = errorItem.querySelector(Config.Error.TITLE);
    const errorItemBody = errorItem.querySelector(Config.Error.DESCRIPTION);
    const errorItemButton = errorItem.querySelector(Config.Error.BUTTON);
    if (errorItemButton && errorItemTitle && errorItemBody) {
      this._addErrorActiveClass(errorItem);
      errorItemButton.addEventListener(Config.Event.CLICK, () => this._closeButtonListener(errorItem));
      errorItemTitle.textContent = `Код ${ this.code }`;
      errorItemBody.textContent = this.body;
      setTimeout(() => this._closeButtonListener(errorItem), 5000);
    }
    return errorItem;
  }
}

