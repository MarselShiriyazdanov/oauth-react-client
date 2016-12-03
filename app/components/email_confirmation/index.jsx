import React, { Component } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import {
  Col,
  Row,
  Grid,
  Alert
} from 'react-bootstrap';
import EmailConfirmationActions from 'actions/email_confirmation';
import EmailConfirmationStore from 'stores/email_confirmation';

@connectToStores
export default class EmailConfirmation extends Component {

  static getStores(props) {
    return [EmailConfirmationStore];
  }

  static getPropsFromStores(props) {
    return EmailConfirmationStore.getState();
  }

  componentDidMount() {
    if (this.token().length) {
      EmailConfirmationActions.confirm(this.token())
    }
  }

  token = () => {
    return this.props.location.query.confirmation_token;
  }

  render() {
    if (this.props.confirmed) {
      return (
        <Alert bsStyle="success">
          Email succesfully confirmed.
        </Alert>      );
    } else if (this.props.unconfirmed) {
      return (
        <Alert bsStyle="danger">
          Could not confirm email: email already confirmed or token is invalid.
        </Alert>
      );
    } else if (this.token().length) {
      return (
        <Grid>
          <Row>
            <Col md={ 8 }>
              <h2>Confirming email, please wait...</h2>
            </Col>
          </Row>
        </Grid>
      );
    } else {
      return (
        <h3>Please, follow the link in the confirmation email.</h3>
      );
    }
  }
}
