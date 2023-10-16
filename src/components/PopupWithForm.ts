import Popup from './Popup.ts';
import Config from '../vendor/config/index.js';

type FormNames = keyof NonNullable<UserData>;

type UserData = {
  name?: string;
  occupation?: string;
  link?: string;
  title?: string;
  // [key: string]: string;
}

export default class PopupWithForm extends Popup {
  private readonly _form: HTMLFormElement | null = null;
  private readonly _submitter: HTMLButtonElement | null = null;
  private _submitHandler: () => void;

  constructor(selector: string) {
    super(selector);
    this._form = document.querySelector(selector)
      ?.querySelector(Config.Form.SELECTOR) ?? null;
    this._submitter = this._form?.querySelector(Config.Validation.BUTTON_SELECTOR) ?? null;
    this._submitHandler = () => {
    };
  }

  getInputValues(): UserData | null {
    if (this._form) {
      const formData = new FormData(this._form);
      return Object.fromEntries(formData);
    } else {
      return null;
    }
  }

  fillInputs(userData: NonNullable<UserData>) {
    this._submitter?.setAttribute('disabled', 'disabled');
    this._submitter?.classList.add(Config.Validation.BUTTON_DISABLED_CLASS);
    const keys = Object.keys(userData) as FormNames[];
    keys.forEach((input) => {
      if (this._form?.elements.namedItem(input)) {
        (<HTMLInputElement> this._form?.elements.namedItem(input)).value
          = userData[input] as string;
      }
    });
  }

  updateSubmitHandler(handleSubmit: () => void): void {
    this._submitHandler = handleSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form?.addEventListener(Config.Event.SUBMIT, (e: SubmitEvent) => {
      e.preventDefault();
      this._submitHandler();
    });
  }

  resetForm() {
    this._form?.reset();
  }

  close() {
    super.close();
    this._submitHandler = () => {
    };
  }
}
