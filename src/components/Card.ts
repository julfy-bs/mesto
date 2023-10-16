import Config from '../vendor/config/index.js';
import { CardType } from '../types/card.ts';

type CardProps = {
  selector: string;
  card: CardType;
  userId: string;
  handleLikeBtnClick: (target: Card) => void;
  handleDeleteBtnClick: (target: Card) => void;
  handleImageClick: (target: Card) => void;
}

export default class Card {
  _owner: string;
  _likes: string[];
  _name: string;
  _link: string;
  _id: string;
  _userId: string;
  _hasOwnerLike: boolean;
  _handleLikeBtnClick: (target: this) => void;
  _handleDeleteBtnClick: (target: this) => void;
  _handleImageClick: (target: this) => void;
  _cardTemplate: HTMLElement | null;
  _cardItem: HTMLElement | null = null;
  _cardArticle: HTMLElement | null;
  _cardImage: HTMLElement | null;
  _cardTitle: HTMLElement | null;
  _cardLikeNumber: HTMLElement | null;
  _cardLikeButton: HTMLElement | null;
  _cardDelete: HTMLElement | null;

  constructor(
    {
      selector,
      card: { name, link, owner, likes, _id },
      userId,
      handleLikeBtnClick,
      handleDeleteBtnClick,
      handleImageClick,
    }: CardProps,
  ) {
    this._owner = owner;
    this._likes = likes;
    this._name = name;
    this._link = link;
    this._id = _id;
    this._userId = userId;
    this._hasOwnerLike = this._likes.includes(userId);
    this._handleLikeBtnClick = handleLikeBtnClick;
    this._handleDeleteBtnClick = handleDeleteBtnClick;
    this._handleImageClick = handleImageClick;
    this._cardTemplate =
      (<HTMLTemplateElement> document.querySelector(selector))
        .content.querySelector(Config.Card.ITEM);
    this._cardItem = (<HTMLTemplateElement> this._cardTemplate)
      .cloneNode(true) as HTMLElement;
    this._cardArticle = (<HTMLElement> this._cardItem)
      .querySelector(Config.Card.ARTICLE);
    this._cardImage = (<HTMLElement> this._cardArticle)
      .querySelector(Config.Card.IMAGE);
    this._cardTitle = (<HTMLElement> this._cardArticle)
      .querySelector(Config.Card.TITLE);
    this._cardLikeNumber = (<HTMLElement> this._cardArticle)
      .querySelector(Config.Card.LIKE_NUMBER);
    this._cardLikeButton = (<HTMLElement> this._cardArticle)
      .querySelector(Config.Card.LIKE_BUTTON);
    this._cardDelete = (<HTMLElement> this._cardArticle)
      .querySelector(Config.Card.DELETE);
  }

  _setCardContent() {
    if (this._cardTitle && this._cardImage) {
      this._cardTitle.textContent = this._name;
      this._cardImage.setAttribute('src', this._link);
      this._cardImage.setAttribute('alt', this._name);
    }
  }

  toggleLike(card: CardType) {
    this._likes = card.likes;
    this.updateOwnersLike();
    this._setLikesQuantity();
    this._toggleLikesClass();
  };

  _setLikesQuantity() {
    if (this._cardLikeButton && this._cardLikeNumber) {
      switch (this._likes.length) {
      case 0:
        this._cardLikeButton.classList.remove(Config.Card.LIKE_BUTTON_IS_LIKED);
        this._cardLikeNumber.textContent = '';
        break;
      default:
        this._cardLikeButton.classList.add(Config.Card.LIKE_BUTTON_IS_LIKED);
        this._cardLikeNumber.textContent = this._likes.length.toString();
        break;
      }
    }
  };

  updateOwnersLike() {

    this._hasOwnerLike = this._likes.includes(this._userId);
    return this._likes.includes(this._userId);
  };

  getData() {
    return {
      name: this._name,
      link: this._link,
      owner: this._owner,
      likes: this._likes,
      _id: this._id,
      hasOwnerLike: this._hasOwnerLike,
    };
  }

  remove() {
    this._cardItem?.remove();
  }

  generate() {
    // this._hasOwnerLike = this.updateOwnersLike();
    this._setCardContent();
    this._setLikesQuantity();
    this._toggleLikesClass();
    this._setEventListeners();
    return this._cardItem;
  };

  _toggleLikesClass() {
    switch (this._hasOwnerLike) {
    case true:
      this._cardLikeButton?.classList.add(Config.Card.LIKE_BUTTON_ACTIVE);
      this._cardLikeButton?.setAttribute('aria-label', 'Убрать отметку \"Понравилось\"');
      break;
    case false:
      this._cardLikeButton?.classList.remove(Config.Card.LIKE_BUTTON_ACTIVE);
      this._cardLikeButton?.setAttribute('aria-label', 'Добавить отметку \"Понравилось\"');
      break;
    }
  }

  _setEventListeners() {
    this._cardLikeButton?.addEventListener(Config.Event.CLICK, () => this._handleLikeBtnClick(this));
    this._cardImage?.addEventListener(Config.Event.CLICK, () => this._handleImageClick(this));
    this._owner === this._userId
      ? this._cardDelete?.addEventListener(Config.Event.CLICK, () => this._handleDeleteBtnClick(this))
      : this._cardDelete?.remove();
  }
}
