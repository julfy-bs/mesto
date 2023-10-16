type SectionProps = {
  renderer: (element: any) => void;
  containerSelector: string;
}

export default class Section {
  private readonly _renderer: (element: any) => void;
  private _container: Element | null;
  constructor({ renderer, containerSelector }: SectionProps) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  render(items: any[]) {
    items.forEach((element) => this._renderer(element));
  }

  prepend(element: any) {
    this._container?.prepend(element);
  }
}
