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
}
