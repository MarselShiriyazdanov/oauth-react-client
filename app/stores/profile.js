import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import ProfileActions from 'actions/profile';

@createStore(Alt)
export default class ProfileStore {
  static displayName = 'ProfileStore'

  constructor() {
    this.current_user = {};

    this.bindListeners({
      setValue: ProfileActions.SET_VALUE,
      get: ProfileActions.GET
    });
  }

  setValue(obj) {
    this.current_user[obj.name] = obj.value;
  }

  get(user) {
    this.current_user = user;
  }
}
