import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import IdentityActions from 'actions/identity';

@createStore(Alt)
export default class IdentityStore {
  static displayName = 'IdentityStore';

  constructor() {
    this.bindListeners({
      setIdentities: IdentityActions.SET_IDENTITIES,
      delete: IdentityActions.DELETE
    });
  }

  setIdentities(identities) {
    this.identities = identities;
  }

  delete(params) {
    let identity = params.identity;
    let identities = params.identities;
    identities.splice(identities.findIndex(item => item === identity.id), 1);
    this.setIdentities(identities);
  }
}
