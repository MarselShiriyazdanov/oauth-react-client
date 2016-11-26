import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import Storage from 'lib/storage';
import SessionActions from 'actions/session';
import config from 'config';

const STORAGE_KEY = config.storageKey;

@createStore(Alt)
export default class SessionStore {
  static displayName = 'SessionStore'

  constructor() {
    this.currentUser = Storage.get(STORAGE_KEY) || {};

    this.bindListeners({
      create: SessionActions.CREATE,
      delete: SessionActions.DELETE,
      login: SessionActions.LOGIN,
      deleteResetPasswordToken: SessionActions.DELETE_RESET_PASSWORD_TOKEN
    });
  }

  create(user) {
    this.currentUser = user;
  }

  login(user) {
    this.currentUser = user;
  }

  delete() {
    this.currentUser = {};
  }

  deleteResetPasswordToken() {
    this.currentUser.reset_password_token = null;
    Storage.set(STORAGE_KEY, this.currentUser);
  }
}
