import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';

@createActions(Alt)
export default class ProfileActions {
  setValue(name, value) {
    return { name, value };
  }

  get() {
    return (dispatch) => {
      let current_user = {
        first_name: 'test',
        last_name: '',
        gender: '',
        email: '',
        current_password: '',
        password: '',
        password_confirmation: ''
      };
      dispatch(current_user);
    }
  }
}
