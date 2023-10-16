import Config from '../vendor/config/index.js';

type PopupOpenArgs = {
  callback?: Function | undefined;
}

export default class Popup {
  _popup: HTMLElement | null;

  constructor(selector: string) {
    this._popup = document.querySelector(selector);
  }

  _handleMouseEvent(e: MouseEvent) {
    const closeCondition = (<HTMLElement> e.target)?.classList.contains(Config.Popup.CLASSNAME)
      || (<HTMLElement> e.target)?.classList.contains(Config.Popup.CLOSE_CLASSNAME);
    if (closeCondition) this.close();
  };

  _handleKeyboardEvent(e: KeyboardEvent) {
    if (e.key === Config.Key.ESCAPE) this.close();
  };

  setEventListeners() {
    this._popup?.addEventListener(Config.Event.MOUSEDOWN, (e) => this._handleMouseEvent(e));
  }

  open({ callback }: PopupOpenArgs): void {
    if (callback) callback();
    this._popup?.classList.add(Config.Popup.ACTIVE_CLASS);
    this._popup?.addEventListener(Config.Event.KEYDOWN, (e) => this._handleKeyboardEvent(e));
    setTimeout(() => this._popup?.focus(), Config.Popup.ANIMATION_DURATION);
  }

  close() {
    this._popup?.classList.remove(Config.Popup.ACTIVE_CLASS);
    this._popup?.removeEventListener(Config.Event.KEYDOWN, this._handleKeyboardEvent);
  }
}
