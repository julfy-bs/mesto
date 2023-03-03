export default class Profile {
  constructor({
                nameSelector,
                occupationSelector,
                avatarSelector,
              }) {
    this._profileNameElement = document.querySelector(nameSelector);
    this._profileAboutElement = document.querySelector(occupationSelector);
    this._profileAvatarElement = document.querySelector(avatarSelector);
  }

  setUserInfo(userData) {
    const { name, about, avatar, id } = userData;
    if (name) this._profileNameElement.textContent = name;
    if (about) this._profileAboutElement.textContent = about;
    if (avatar) this._profileAvatarElement.src = avatar;
    if (id) this._userId = id;
  }
}
