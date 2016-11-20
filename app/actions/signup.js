import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import signupSource from 'sources/signup';
import session from 'services/session';
import ApplicationActions from 'actions/application';

@createActions(Alt)
export default class SignupActions {
  setValue(name, value) {
    return { name, value };
  }

  create(user) {
    return (dispatch) => {
      signupSource.create(user).then((result) => {
        if (result["rails_api_format/error"]) {
          ApplicationActions.openModal({ name: 'signUp', error: result["rails_api_format/error"] });
        } else {
          session.login(result);
        }
      });
    };
  }
}
