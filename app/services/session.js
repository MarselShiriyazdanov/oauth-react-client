import SessionActions from 'actions/session';
import SessionStore from 'stores/session';
import config from 'config';

export default class Session {
  static store() {
    return SessionStore;
  }

  static currentUser() {
    return this.store().getState().currentUser;
  }

  static loggedIn() {
    return Object.keys(this.currentUser()).length !== 0;
  }

  static create(user) {
    SessionActions.create(user);
  }

  static login(user) {
    SessionActions.login(user);
  }

  static isPasswordSet() {
    return (this.currentUser() && this.currentUser().reset_password_token == null);
  }

  static delete() {
    SessionActions.delete(this.currentUser());
  }

  static get token() {
    return this.currentUser()[config.session.tokenKey];
  }

  static get email() {
    return this.currentUser()[config.session.emailKey];
  }
}
