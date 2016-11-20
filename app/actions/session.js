import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import Storage from 'lib/storage';
import sessionSource from 'sources/session';
import config from 'config';
import ApplicationActions from 'actions/application';

const STORAGE_KEY = config.storageKey;

@createActions(Alt)
export default class SessionActions {
  create(user) {
    return (dispatch) => {
      sessionSource.create(user).then(result => {
        if (result.error) {
          ApplicationActions.openModal({ name: 'signIn', error: result.error.error });
        } else {
          Storage.set(STORAGE_KEY, result);
          dispatch(result);
        }
      });
    };
  }

  login(user) {
    return (dispatch) => {
      Storage.set(STORAGE_KEY, user);
      dispatch(user);
    };
  }

  delete(user) {
    return (dispatch) => {
      sessionSource.delete(user);
      Storage.remove(STORAGE_KEY);
      dispatch(user);
    };
  }
}
