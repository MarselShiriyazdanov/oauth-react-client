import config from 'config';
import request from 'lib/request';

export default class emailConfirmationSource {
  static url = `${config.target}/users/confirmation`;

  static confirm(token) {
    return request(this.url, { method: 'GET' }, { confirmation_token: token });
  }
}
