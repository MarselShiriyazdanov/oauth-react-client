import config from 'config';
import requestAuth from 'lib/requestAuth';

export default class ProfileSource {
  static url = `${config.apiTarget}/users/me`;
  static updateUrl = `${config.apiTarget}/users`;

  static get() {
    return requestAuth(this.url, { method: 'GET' });
  }

  static update(user) {
    return requestAuth(this.updateUrl, { method: 'PUT', body: JSON.stringify(user) });
  }
}
