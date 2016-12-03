import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import emailConfirmationSource from 'sources/email_confirmation';

@createActions(Alt)
export default class EmailConfirmationActions {
  confirm(token) {
    emailConfirmationSource.confirm(token).then(response => {
      if (response.status == 200) {
        this.confirmationSuccess();
      } else {
        this.confirmationFailed();
      };
    });
  }

  confirmationFailed() {
    return true;
  }

  confirmationSuccess() {
    return true;
  }
}
