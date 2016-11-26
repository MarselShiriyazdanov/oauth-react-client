import React, { Component } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import {
  Grid,
  Row,
  Col,
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import { Lifecycle } from 'react-router';
import reactMixin from 'react-mixin';
import session from 'services/session';
import PasswordStore from 'stores/password';
import PasswordActions from 'actions/password';

@reactMixin.decorate(Lifecycle)
class PasswordComponent extends Component  {
  routerWillLeave(nextLocation) {
    if (session.isPasswordSet())
      return true;
    else {
      return false;
    };
  };
}

@connectToStores
export default class Password extends PasswordComponent {
  static getStores(props) {
    return [PasswordStore];
  }

  static getPropsFromStores(props) {
    return PasswordStore.getState();
  }

  submit = (event) => {
    event.preventDefault();
    if (this.isValidPassword()) {
      PasswordActions.setPassword(this.props.password);
    }
  }

  setValue(event) {
    PasswordActions.setValue(event.target.name, event.target.value);
  }

  isValidPassword() {
    return this.props.password.password.length >= 6 &&
      (this.props.password.password === this.props.password.password_confirmation);
  }

  passwordValidationState() {
    return this.isValidPassword() ? 'success' : 'error';
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={ 8 }>
            <h2>Set your password</h2>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col md={ 8 }>
            <form onSubmit={ this.submit }>
              <FormGroup controlId="password">
                <ControlLabel>Password</ControlLabel>
                <FormControl type="password" name="password"
                  value={ this.props.password.password }
                  onChange={ this.setValue }
                />
              </FormGroup>
              <FormGroup controlId="password_confirmation" validationState={ this.passwordValidationState() }>
                <ControlLabel>Password Confirmation</ControlLabel>
                <FormControl type="password" name="password_confirmation"
                  value={ this.props.password.password_confirmation }
                  onChange={ this.setValue }
                />
              </FormGroup>
              <Button bsStyle="primary" type="submit">
                Save
              </Button>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}
