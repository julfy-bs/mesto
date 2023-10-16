import Popup from './Popup.ts';

type PopupOpenArgs = {
  name?: string;
  link?: string;
  callback?: Function | undefined;
}

export default class PopupWithImage extends Popup {
  private _image: any;
  private _title: any;

  constructor(
    popupSelector: string,
    imageSelector: string,
    titleSelector: string
    ) {
    super(popupSelector);
    this._image = document.querySelector(imageSelector);
    this._title = document.querySelector(titleSelector);
  }

  open({
    name,
    link,
  }: PopupOpenArgs) {
    super.open({
      callback: () => {},
    });
    this._image.src = link;
    this._image.alt = name;
    this._title.textContent = name;
  }
}
