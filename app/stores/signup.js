import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import SignupActions from 'actions/signup';
import ApplicationActions from 'actions/application';

@createStore(Alt)
export default class SignupStore {
  static displayName = 'SignupStore'

  defaultProps = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: ''
  }

  constructor() {
    this.user = Object.assign({}, this.defaultProps);

    this.bindListeners({
      setValue: SignupActions.SET_VALUE,
      reset: ApplicationActions.CLOSE_MODAL
    });
  }

  setValue(obj) {
    this.user[obj.name] = obj.value;
  }

  reset() {
    this.user = Object.assign({}, this.defaultProps);
  }
}
