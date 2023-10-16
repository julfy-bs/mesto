import { CardType } from '../types/card.ts';
import { CustomError } from '../types/error.ts';
import { CustomResponse } from '../types/response.ts';
import { User } from '../types/user.ts';

type ApiHeaders = {
  'Authorization': string,
  'Content-Type': string;
}

type ApiProps = {
  headers: ApiHeaders;
  baseUrl: string;
}

type ApiAvailableData = User | User[] | CardType | CardType[];

export default class Api {
  _headers: ApiHeaders;
  _baseUrl: string;

  constructor({ headers, baseUrl }: ApiProps) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _checkResponse(res: CustomResponse<ApiAvailableData>) {
    return (res.ok)
      ? res.json()
      : res.json().then((error: Error & CustomError) => Promise.reject({
        ...error
      }));
  };

  _checkSuccess(res: CustomResponse<ApiAvailableData>) {
    return res.success
      ? res
      : Promise
        .reject(res)
        .then((r: Response) => r.json());
  }

  _request(url: string, options = {}) {
    const computedUrl = `${ this._baseUrl }/${ url }`;
    return fetch(computedUrl, { headers: this._headers, ...options })
      .then(res => this._checkResponse(res as CustomResponse<ApiAvailableData>))
      .then(res => this._checkSuccess(res));
  }

  getUser(): Promise<CustomResponse<User>> {
    return this._request(`users/me`);
  }

  getCards(): Promise<CustomResponse<CardType[]>> {
    return this._request(`cards`);
  }

  getAppData(): Promise<[CustomResponse<User>, CustomResponse<CardType[]>]> {
    return Promise.all([this.getUser(), this.getCards()]);
  }

  updateUserAvatar({ avatar }: Pick<User, 'avatar'>): Promise<CustomResponse<User>> {
    return this._request(`users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({ avatar }),
    });
  }

  updateUser({ name, about }: Pick<User, 'name' | 'about'>): Promise<CustomResponse<User>> {
    return this._request(`users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  addCard({ name, link }: Pick<CardType, 'name' | 'link'>): Promise<CustomResponse<CardType>> {
    return this._request(`cards`, {
      method: 'POST',
      body: JSON.stringify({ name, link }),
    });
  }

  removeCard({ _id }: Pick<CardType, '_id'>): Promise<CustomResponse<CardType>> {
    return this._request(`cards/${ _id }`, {
      method: 'DELETE',
    });
  }

  toggleLike({ cardId, hasOwnerLike }: {
    cardId: string,
    hasOwnerLike: boolean
  }): Promise<CustomResponse<CardType>> {
    return this._request(`cards/${ cardId }/likes`, {
      method: hasOwnerLike
        ? 'DELETE'
        : 'PUT',
    });
  }
}
