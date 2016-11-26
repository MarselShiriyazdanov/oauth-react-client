import session from 'services/session';
import ApplicationActions from 'actions/application';

export const paths = {
  home() { return '/'; },
  about() { return '/about'; },
  aboutExtended(id) { return `/about/extended/${id}`; },
  profile() { return '/profile'; },
  password() { return '/password'; }
};

export function requireAuth(nextState, replace) {
  if (!session.loggedIn()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};

export function checkPassword(nextState, replace) {
  if (!session.isPasswordSet() && nextState.location.pathname != '/password' ) {
    replace({
      pathname: '/password',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};
