import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import EmailConfirmationActions from 'actions/email_confirmation';

@createStore(Alt)
export default class EmailConfirmationStore {
  static displayName = 'EmailConfirmationStore';

  constructor() {
    this.bindListeners({
      confirmationFailed: EmailConfirmationActions.CONFIRMATION_FAILED,
      confirmationSuccess: EmailConfirmationActions.CONFIRMATION_SUCCESS
    });
  }

  confirmationFailed() {
    this.confirmed = false;
    this.unconfirmed = true;
  }

  confirmationSuccess() {
    this.confirmed = true;
    this.unconfirmed = false;
  }
}
