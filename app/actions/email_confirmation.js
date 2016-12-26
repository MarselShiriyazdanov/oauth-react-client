import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import emailConfirmationSource from 'sources/email_confirmation';

@createActions(Alt)
export default class EmailConfirmationActions {
  confirm(token) {
    return (dispatch) => {
      emailConfirmationSource.confirm(token).then(response => {
        dispatch(response.status == 200);
      });
    }
  }
}
