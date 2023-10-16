import { User } from '../types/user.ts';

type ProfileArgs = {
  nameSelector: string;
  occupationSelector: string;
  avatarSelector: string;
}

export default class Profile {
  private readonly _profileNameElement: HTMLHeadingElement | null;
  private readonly _profileAboutElement: HTMLParagraphElement | null;
  private readonly _profileAvatarElement: HTMLImageElement | null;
  private _profileData: User | null;

  constructor({
    nameSelector,
    occupationSelector,
    avatarSelector,
  }: ProfileArgs) {
    this._profileNameElement = document.querySelector(nameSelector);
    this._profileAboutElement = document.querySelector(occupationSelector);
    this._profileAvatarElement = document.querySelector(avatarSelector);
    this._profileData = null;
  }

  setUserInfo(userData: User) {
    this._profileData = userData;
    if (this._profileData.name && this._profileNameElement) this._profileNameElement.textContent = this._profileData.name;
    if (this._profileData.about && this._profileAboutElement) this._profileAboutElement.textContent = this._profileData.about;
    if (this._profileData.avatar && this._profileAvatarElement) this._profileAvatarElement.src = this._profileData.avatar;
  }

  getUserInfo() {
    if (this._profileData) return this._profileData;
  }
}
