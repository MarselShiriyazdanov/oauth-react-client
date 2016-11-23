import config from 'config';
import request from 'lib/request';

export default class GoogleSource {
  static url = `${config.target}/users/auth/google_oauth2/callback`;

  static auth(authRepsonse) {
    // fixes permission denied toJSON
    delete authRepsonse["g-oauth-window"];
    // fix POST error. more info: https://github.com/intridea/omniauth-oauth2/issues/66
    let authData = Object.keys(authRepsonse).map(function(key) {
      return key + '=' + authRepsonse[key];
    }).join('&');
    return request(`${this.url}?${authData}`, { method: 'GET' });
  }
}
