import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import profileSource from 'sources/profile';

@createActions(Alt)
export default class ProfileActions {
  setValue(name, value) {
    return { name, value };
  }

  get() {
    return (dispatch) => {
      profileSource.get().then(response => {
        if (response.status == 200) {
          response.json().then(user => { dispatch(user); });
        } else {
          console.log("failed");
        }
      });
    };
  }

  update(user) {
    return profileSource.update(user).then(response => {
      if (response.status == 200) {
        this.updated(response);
      } else {
        this.updateFailed(response);
      }
    });
  }

  updated(response) {
    return (dispatch) => {
      response.json().then(user => dispatch(user));
    }
  }

  updateFailed(response) {
    return (dispatch) => {
      response.json().then(json => dispatch(json["rails_api_format/error"]));
    }
  }

  clearMessage(messageType) {
    return (dispatch) => {
      dispatch(messageType);
    }
  }

  reset() {
    return {};
  }
}
