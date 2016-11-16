import config from 'config';
import requestAuth from 'lib/requestAuth';

export default class ProfileSource {
  static url = `${config.apiTarget}/users/me`;

  static get() {
    return requestAuth(this.url, { method: 'GET' });
  }
}
