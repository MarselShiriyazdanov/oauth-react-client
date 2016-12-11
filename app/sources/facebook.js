import config from 'config';
import requestAuth from 'lib/requestAuth';
import cookie from 'js-cookie';

export default class GoogleSource {
  static url = `${config.target}/users/auth/facebook/callback`;

  static auth(authRepsonse) {
    // fix POST error. more info: https://github.com/intridea/omniauth-oauth2/issues/66
    let authData = Object.keys(authRepsonse.authResponse).map(function(key) {
      return key + '=' + authRepsonse.authResponse[key];
    }).join('&');
    cookie.set('fbsr_1793836750887956', authRepsonse.authResponse.signedRequest, {domain: '.globuskazan.ru'});
    return requestAuth(`${this.url}?${authData}`, { method: 'GET', credentials: 'include' });
  }
}
