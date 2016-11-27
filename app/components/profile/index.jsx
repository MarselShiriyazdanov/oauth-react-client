import React, { Component } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import {
  Grid,
  Row,
  Col,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Alert
} from 'react-bootstrap';

import ProfileActions from 'actions/profile';
import ProfileStore from 'stores/profile';
import Identity from 'components/identity';

@connectToStores
export default class Profile extends Component {

  static getStores(props) {
    return [ProfileStore];
  }

  static getPropsFromStores(props) {
    return ProfileStore.getState();
  }

  componentDidMount() {
    ProfileActions.get();
  }

  submit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      ProfileActions.update(this.props.current_user);
    }
  }

  setValue(event) {
    ProfileActions.setValue(event.target.name, event.target.value);
  }

  validatePassword(value) {
    return value.length >= 6 ? 'success' : 'error';
  }

  validateInput(value) {
    return value.length >= 1 ? 'success' : 'error';
  }

  isValidPassword() {
    return this.props.current_user.password.length == 0 ||
      (this.props.current_user.password === this.props.current_user.password_confirmation);
  }

  passwordValidationState(value) {
    return this.isValidPassword() ? 'success' : 'error';
  }

  isValid() {
    const user = this.props.current_user;

    return (
      user.first_name.length &&
      user.email.length >= 6 &&
      user.last_name.length &&
      user.current_password &&
      this.isValidPassword()
    );
  }


  loaded = () => {
    return Object.getOwnPropertyNames(this.props.current_user).length != 0;
  }

  clearError = () => {
    ProfileActions.clearMessage("error")
  }

  clearSuccess = () => {
    ProfileActions.clearMessage("success")
  }

  errorMessage = () => {
    if (this.props.errorMessage) {
      return <Alert bsStyle="danger" onDismiss={ this.clearError } >{ this.props.errorMessage }</Alert>;
    }
  }

  successMessage = () => {
    if (this.props.successMessage) {
      return <Alert bsStyle="success" onDismiss={ this.clearSuccess } >{ this.props.successMessage }</Alert>;
    }
  }

  render() {
    if (this.loaded()) {
      return (
        <Grid>
          <Row>
            <Col md={ 8 }>
              <h2>Profile</h2>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col md={ 7 }>
              {this.successMessage()}
              {this.errorMessage()}
              <form onSubmit={ this.submit }>
                <FormGroup controlId="first_name" validationState={ this.validateInput(this.props.current_user.first_name) }>
                  <ControlLabel>First name</ControlLabel>
                  <FormControl type="text" name="first_name"
                    value={ this.props.current_user.first_name }
                    onChange={ this.setValue }
                  />
                </FormGroup>
                <FormGroup controlId="last_name" validationState={ this.validateInput(this.props.current_user.last_name) }>
                  <ControlLabel>Last name</ControlLabel>
                  <FormControl type="text" name="last_name"
                    value={ this.props.current_user.last_name }
                    onChange={ this.setValue }
                  />
                </FormGroup>
                <FormGroup controlId="email" validationState={ this.validateInput(this.props.current_user.email) } >
                  <ControlLabel>Email</ControlLabel>
                  <FormControl type="email" name="email"
                    value={ this.props.current_user.email }
                    onChange={ this.setValue }
                  />
                </FormGroup>
                <FormGroup controlId="gender">
                  <ControlLabel>Gender</ControlLabel>
                  <FormControl type="gender" name="gender"
                    value={ this.props.current_user.gender }
                    onChange={ this.setValue }
                  />
                </FormGroup>
                <FormGroup controlId="current_password" validationState={ this.validatePassword(this.props.current_user.current_password) }>
                  <ControlLabel>Current password</ControlLabel>
                  <FormControl type="password" name="current_password"
                    value={ this.props.current_user.current_password }
                    onChange={ this.setValue }
                  />
                </FormGroup>
                <FormGroup controlId="password">
                  <ControlLabel>Password</ControlLabel>
                  <FormControl type="password" name="password"
                    value={ this.props.current_user.password }
                    onChange={ this.setValue }
                  />
                </FormGroup>
                <FormGroup controlId="password_confirmation" validationState = { this.passwordValidationState(this.props.current_user.password_confirmation) } >
                  <ControlLabel>Password Confirmation</ControlLabel>
                  <FormControl type="password" name="password_confirmation"
                    value={ this.props.current_user.password_confirmation }
                    onChange={ this.setValue }
                  />
                </FormGroup>
                <Button bsStyle="primary" type="submit">
                  Save
                </Button>
              </form>
            </Col>
            <Identity identities={ this.props.current_user.identities }/>
          </Row>
        </Grid>
      );
    } else {
      return(
        <Row>
          <Col md={ 8 } mdOffset={6}>
            <h2>Please wait</h2>
          </Col>
        </Row>
      );
    }
  }
}
