import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import ApplicationActions from 'actions/application';
import session from 'services/session';
import appHistory from 'services/history';
import IdentityActions from 'actions/identity';
import FacebookSource from 'sources/facebook';

@createActions(Alt)
export default class FacebookActions {
  auth(authResponse) {
    return (dispatch) => {
      FacebookSource.auth(authResponse).then(response => {
        if (response.status == 200) {
          response.json().then(user => {
            session.login(user);
            // adds identities after connect account click
            IdentityActions.setIdentities(user.user);
            if (!session.isPasswordSet()) {
              appHistory.push('/password');
            };
          });
        } else if (response.status == 403) {
          ApplicationActions.openModal({ name: 'signIn', error: "Please, confirm email address" });
        };
      });
    };
  }
}
