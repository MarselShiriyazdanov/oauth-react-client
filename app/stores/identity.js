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
    let without_deleted = identities.filter(item => item.id != identity.id);
    this.setIdentities(without_deleted);
  }
}
