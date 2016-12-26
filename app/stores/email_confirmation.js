import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import EmailConfirmationActions from 'actions/email_confirmation';

@createStore(Alt)
export default class EmailConfirmationStore {
  static displayName = 'EmailConfirmationStore';

  constructor() {
    this.bindListeners({
      confirm: EmailConfirmationActions.CONFIRM
    });
  }

  confirm(value) {
    this.confirmed = value;
    this.unconfirmed = !value;
  }
}
