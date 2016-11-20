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
      get: ProfileActions.GET,
      updated: ProfileActions.UPDATED,
      updateFailed: ProfileActions.UPDATE_FAILED,
      clearMessage: ProfileActions.CLEAR_MESSAGE
    });
  }

  setValue(obj) {
    this.current_user[obj.name] = obj.value;
  }

  get(response) {
    this.current_user = response.user;
  }

  updated(response) {
    this.successMessage = "Profile successfuly updated";
  }

  updateFailed(response) {
    window.res = response;
    let messages = [];
    for (let key of Object.keys(response.validations)) {
      messages.push(key + " " + response.validations[key])
    }
    this.errorMessage = messages;
  }

  clearMessage(messageType) {
    if (messageType == "success") {
      this.successMessage = undefined;
    } else {
      this.errorMessage = undefined;
    }
  }
}
