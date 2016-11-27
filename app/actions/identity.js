import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import identitySource from 'sources/identity';

@createActions(Alt)
export default class IdentityActions {
  setIdentities(user) {
    return (dispatch) => {
      dispatch(user.identities);
    };
  }

  delete(identity, identities) {
    return (dispatch) => {
      identitySource.delete(identity).then(response => {
        if (response.status == 200) {
          dispatch({ identity: identity, identities: identities });
        } else {
          return identities;
        };
      })
    }
  }
}
