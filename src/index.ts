import './styles/pages/index.css';
import Api from './components/Api';
import { CardType } from './types/card';
import { CustomError } from './types/error';
import { CustomResponse } from './types/response';
import Loader from './components/Loader';
import Profile from './components/Profile';
import Section from './components/Section';
import Card from './components/Card';
import Validation from './components/Validation.ts';
import DefaultError from './components/DefaultError';
import PopupWithImage from './components/PopupWithImage';
import PopupWithForm from './components/PopupWithForm';

import Config from './vendor/config';

type listenerConfig = {
  selector: string;
  handleClick: () => void;
}

document.addEventListener('DOMContentLoaded', () => {
  const api: Api = new Api(Config.apiConfig);

  const ProfileAvatarForm = new Validation('.form_type_avatar', Config.validationConfig);
  ProfileAvatarForm.enableValidation();
  const ProfileEditForm = new Validation(
    '.form_type_edit',
    Config.validationConfig,
  );
  ProfileEditForm.enableValidation();
  const ProfileAddCardForm = new Validation(
    '.form_type_add',
    Config.validationConfig,
  );
  ProfileAddCardForm.enableValidation();
  const popupImageDetail = new PopupWithImage(
    Config.Popup.TYPE_PHOTO,
    Config.Popup.IMAGE,
    Config.Popup.TITLE,
  );
  popupImageDetail.setEventListeners();
  const popupCardDelete = new PopupWithForm(
    Config.Popup.TYPE_DELETE,
  );
  popupCardDelete.setEventListeners();
  const popupEditAvatar = new PopupWithForm(
    Config.Popup.TYPE_AVATAR,
  );
  popupEditAvatar.setEventListeners();
  const popupEditProfile = new PopupWithForm(
    Config.Popup.TYPE_PROFILE,
  );
  popupEditProfile.setEventListeners();
  const popupAddCard = new PopupWithForm(
    Config.Popup.TYPE_CARD,
  );
  popupAddCard.setEventListeners();
  const saveSessionData = (popup: PopupWithForm) => {
    const values = popup.getInputValues();
    if (values?.name && values?.occupation) {
      const { name, occupation } = values;
      sessionStorage.setItem('userData', JSON.stringify({
        name: name,
        about: occupation,
      }));
    }
  };
  const deleteSubmitHandler = async (card: Card, popup: PopupWithForm) => {
    try {
      const { _id } = card.getData();
      await api.removeCard({ _id });
      card.remove();
      popup.close();
    } catch (e) {
      throwUserError();
    }
  };
  const handleLike = async (card: Card) => {
    try {
      const cardData = card.getData();
      if (cardData) {
        const { _id, hasOwnerLike } = cardData;
        const response = await api.toggleLike({ cardId: _id, hasOwnerLike });
        const { data: newCardData } = response;
        newCardData && card.toggleLike(newCardData);
      }
    } catch (e: unknown) {
      const { name, hasOwnerLike } = card.getData();
      let verb;
      (hasOwnerLike) ? verb = 'снять' : verb = 'добавить';
      const { error } = <CustomResponse<CustomError>> e;
      throwUserError(
        error?.statusCode,
        error?.message || `Произошла ошибка при попытке ${ verb } лайк карточке \u00ab${ name }\u00bb.`,
      );
    }
  };
  const handleDelete = (card: Card) => {
    popupCardDelete.open({});
    popupCardDelete.updateSubmitHandler(() => deleteSubmitHandler(card, popupCardDelete));
  };
  const handleImage = (card: Card) => {
    const { name, link } = card.getData();
    popupImageDetail.open({
      name,
      link,
    });
  };
  const renderCards = (
    section: Section,
    user: Profile,
    cards: CardType,
  ) => {
    const userData = user.getUserInfo();
    if (userData) {
      let createdItem: HTMLElement | null = null;
      if (cards) {
        const cardClone: Card = new Card({
          selector: Config.Card.TEMPLATE,
          card: {
            _id: cards._id,
            likes: cards.likes,
            link: cards.link,
            name: cards.name,
            owner: cards.owner,
            createdAt: cards.createdAt,
          },
          userId: userData._id,
          handleLikeBtnClick: () => handleLike(cardClone),
          handleDeleteBtnClick: () => handleDelete(cardClone),
          handleImageClick: () => handleImage(cardClone),
        });
        createdItem = cardClone.generate();
      }
      createdItem && section.prepend(createdItem);
    }
  };

  const createUser = () => {
    return new Profile({
      nameSelector: Config.Profile.CONTENT_NAME,
      occupationSelector: Config.Profile.CONTENT_OCCUPATION,
      avatarSelector: Config.Profile.CONTENT_AVATAR,
    });
  };

  const createCardsFeed = (user: Profile) => {
    const section: Section = new Section(
      {
        renderer: (card: CardType) => renderCards(section, user, card),
        containerSelector: Config.Card.WRAPPER,
      },
    );
    return section;
  };

  const renderErrors = (
    section: Section,
    error: CustomError,
  ) => section.prepend(error);

  const createErrorsFeed = () => {
    const section: Section = new Section({
      renderer: (error: CustomError) => renderErrors(section, error),
      containerSelector: Config.Error.LIST,
    });
    return section;
  };

  const errorList = createErrorsFeed();

  const throwUserError = (code?: number, body?: string) => {
    const errorItem = new DefaultError(code, body);
    errorList.prepend(errorItem.createError());
  };

  const handleProfileAvatarSubmit = async (popup: PopupWithForm, user: Profile) => {
    try {
      const values = popup.getInputValues();
      if (values?.link) {
        const { link } = values;
        const response = await api.updateUserAvatar({ avatar: link });
        const { data } = response;
        data && user.setUserInfo(data);
        popup.close();
        popup.resetForm();
      }
    } catch (e: unknown) {
      const { error } = <CustomResponse<CustomError>> e;
      throwUserError(error?.statusCode, error?.message);
    }
  };
  const handleProfileAvatarButtonClick = (user: Profile) => {
    popupEditAvatar.open({});
    popupEditAvatar.updateSubmitHandler(() => handleProfileAvatarSubmit(popupEditAvatar, user));
  };
  const handleProfileEditSubmit = async (popup: PopupWithForm, user: Profile) => {
    try {
      const values = popup.getInputValues();
      if (values?.name && values?.occupation) {
        const { name, occupation } = values;
        const response = await api.updateUser({ name: name, about: occupation });
        const { data } = response;
        data && user.setUserInfo(data);
        popup.close();
        popup.resetForm();
      }
    } catch (e: unknown) {
      const { error } = <CustomResponse<CustomError>> e;
      throwUserError(error?.statusCode, error?.message);
    }
  };
  const handleProfileEditButtonClick = (user: Profile) => {
    // const { name, about } = JSON.parse(sessionStorage.userData);
    const userData = user.getUserInfo();
    userData && popupEditProfile.fillInputs(userData);
    popupEditProfile.updateSubmitHandler(() => handleProfileEditSubmit(popupEditProfile, user));
    popupEditProfile.open({
      callback: () => saveSessionData(popupEditProfile),
    });
  };
  const handleAddCardSubmit = async (popup: PopupWithForm, user: Profile, cardsFeed: Section) => {
    try {
      const userData = user.getUserInfo();
      const values = popup.getInputValues();

      if (values?.link && values?.title && userData) {
        const { title, link } = values;
        const { _id } = userData;
        const response = await api.addCard({ name: title, link: link });
        const { data: cardData } = response;
        if (cardData) {
          const card: Card = new Card({
            selector: Config.Card.TEMPLATE,
            card: {
              _id: cardData._id,
              likes: cardData.likes,
              link: cardData.link,
              name: cardData.name,
              owner: cardData.owner,
              createdAt: cardData.createdAt,
            },
            userId: _id,
            handleLikeBtnClick: () => handleLike(card),
            handleDeleteBtnClick: () => handleDelete(card),
            handleImageClick: () => handleImage(card),
          });
          const cardItem = card.generate();
          if (cardItem) {
            cardsFeed.prepend(cardItem);
            popup.close();
            popup.resetForm();
          } else {
            throwUserError(400, 'Ошибка при создании карточки')
          }
        }
      }
    } catch (e: unknown) {
      const { error } = <CustomResponse<CustomError>> e;
      throwUserError(error?.statusCode, error?.message);
    }
  };
  const handleAddCardButtonClick = (user: Profile, cardsFeed: Section) => {
    popupAddCard.open({});
    popupAddCard.updateSubmitHandler(async () => handleAddCardSubmit(
      popupAddCard,
      user,
      cardsFeed,
    ));
  };
  const setProfileButtonsListeners = (config: listenerConfig[]) => {
    config.forEach(
      (element) => {
        document
          .querySelector(element.selector)
          ?.addEventListener(Config.Event.CLICK, element.handleClick);
      });
  };
  const startApp = async () => {
    try {
      const loader = new Loader({
        selector: Config.Loader.SELECTOR,
        textElements: [
          Config.Profile.CONTENT_NAME,
          Config.Profile.CONTENT_OCCUPATION,
        ],
        imageElements: [
          Config.Profile.AVATAR,
        ],
      });
      loader.startLoader();
      let user: Profile;
      let cardsFeed: Section;
      const [userResponse, cardsResponse] = await api.getAppData();
      const userData = userResponse.data;
      const cardsData = cardsResponse.data;
      if (userData) {
        sessionStorage.setItem('userData', JSON.stringify(userData));
        user = createUser();
        user.setUserInfo(userData);
        cardsFeed = createCardsFeed(user);
        if (cardsData) cardsFeed.render(cardsData);
      }

      setProfileButtonsListeners([
        {
          selector: Config.Profile.AVATAR,
          handleClick: () => handleProfileAvatarButtonClick(user),
        },
        {
          selector: Config.Profile.BUTTON_EDIT_PROFILE,
          handleClick: () => handleProfileEditButtonClick(user),
        },
        {
          selector: Config.Profile.BUTTON_ADD_CARD,
          handleClick: () => handleAddCardButtonClick(user, cardsFeed),
        },
      ]);
      loader.endLoader();
    } catch (e: unknown) {
      const { error } = <CustomResponse<CustomError>> e;
      throwUserError(error?.statusCode, error?.message);
    }
  };
  void startApp();
});
