import Config from '../vendor/config/index.js';

type LoaderProps = {
  selector: string;
  textElements: string[];
  imageElements: string[];
}

export default class Loader {
  _loader: HTMLElement | null;
  _textElements: HTMLElement[];
  _imageElements: HTMLImageElement[];

  constructor({
    selector,
    textElements,
    imageElements
  }: LoaderProps) {
    this._loader = document.querySelector(selector);
    this._textElements = Array.from(
      document.querySelectorAll(textElements.join(', '))
    );
    this._imageElements = Array.from(
      document.querySelectorAll(imageElements.join(', '))
    );
  }

  _showSpinner() {
    this._loader?.classList.add(Config.Loader.ACTIVE_CLASS);
  }

  _hideSpinner() {
    this._loader?.classList.remove(Config.Loader.ACTIVE_CLASS);
  }

  _addImageEffect() {
    this._imageElements.forEach(element => {
      element.classList.add(Config.Loader.SKELETON);
    });
  }

  _removeImageEffect() {
    this._imageElements.forEach(element => {
      element.classList.remove(Config.Loader.SKELETON);
    });
  }

  _addTextEffect() {
    this._textElements.forEach(element => {
      element.classList.add(Config.Loader.SKELETON);
      element.classList.add(Config.Loader.SKELETON_TEXT);
    });
  }

  _removeTextEffect() {
    this._textElements.forEach(element => {
      element.classList.remove(Config.Loader.SKELETON);
      element.classList.remove(Config.Loader.SKELETON_TEXT);
    });
  }

  startLoader() {
    this._addTextEffect();
    this._addImageEffect();
    this._showSpinner();
  }

  endLoader() {
    this._removeTextEffect();
    this._removeImageEffect();
    this._hideSpinner();
  }
}
