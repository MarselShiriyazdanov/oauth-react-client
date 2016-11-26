import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import passwordSource from 'sources/password';
import appHistory from 'services/history';
import SessionActions from 'actions/session'

@createActions(Alt)
export default class PasswordActions {
  setValue(name, value) {
    return { name, value };
  }

  setPassword(password) {
    return passwordSource.update(password).then(response => {
      if (response.status == 200) {
        SessionActions.deleteResetPasswordToken();
        appHistory.push('/');
      } else {
        alert("Something went wrong!");
      };
    });
  }
}
