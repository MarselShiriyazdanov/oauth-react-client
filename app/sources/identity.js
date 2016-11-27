import config from 'config';
import requestAuth from 'lib/requestAuth';

export default class IdentitySource {
  static urlRoot = `${config.apiTarget}/identities`

  static delete(identity) {
    return requestAuth(`${this.urlRoot}/${identity.id}`, {
      method: 'DELETE'
    });
  }
}
