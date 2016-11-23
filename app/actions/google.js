import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import GoogleSource from 'sources/google';
import ApplicationActions from 'actions/application';
import session from 'services/session';

@createActions(Alt)
export default class GoogleActions {
  auth(authResponse) {
    return (dispatch) => {
      GoogleSource.auth(authResponse).then(response => {
        if (response.status == 200) {
          response.json().then(user => { session.login(user); });
        } else if (response.status == 403) {
          ApplicationActions.openModal({ name: 'signIn', error: "Please, confirm email address" });
        };
      });
    };
  }
}
