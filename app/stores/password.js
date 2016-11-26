import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import PasswordActions from 'actions/password';

@createStore(Alt)
export default class PasswordStore {
  static displayName = 'PasswordStore';

  constructor() {
    this.password = {
      password: '',
      password_confirmation: ''
    };

    this.bindListeners({
      setValue: PasswordActions.SET_VALUE,
      setPassword: PasswordActions.SET_PASSWORD
    });
  }

  setValue(obj) {
    this.password[obj.name] = obj.value;
  }

  setPassword() {
    this.password = {
      password: '',
      password_confirmation: ''
    };
  }
}
