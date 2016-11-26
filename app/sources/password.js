import config from 'config';
import requestAuth from 'lib/requestAuth';

export default class passwordSource {
  static url = `${config.apiTarget}/passwords`;

  static update(password) {
    return requestAuth(this.url, { method: 'PUT', body: JSON.stringify(password) });
  }
}
