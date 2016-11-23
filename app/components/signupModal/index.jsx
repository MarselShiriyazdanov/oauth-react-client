import React, { Component, PropTypes } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Alert,
  Col
} from 'react-bootstrap';
import SignupActions from 'actions/signup';
import ApplicationActions from 'actions/application';
import SignupStore from 'stores/signup';
import ApplicationStore from 'stores/application';
import SocialLinks from 'components/socialLinks';

@connectToStores
export default class SignupModal extends Component {
  static propTypes = {
    isModalOpen: PropTypes.bool,
    user: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string,
      password_confirmation: PropTypes.string
    })
  }

  static getStores(props) {
    return [SignupStore, ApplicationStore];
  }

  static getPropsFromStores(props) {
    return {
      ...SignupStore.getState(),
      ...ApplicationStore.getState()
    };
  }

  setValue(event) {
    SignupActions.setValue(event.target.name, event.target.value);
  }

  signUp = (event) => {
    event.preventDefault();

    if (this.isValid()) {
      SignupActions.create(this.props.user);
      ApplicationActions.closeModal();
    }
  }

  isValid() {
    const user = this.props.user;

    return (
      user.first_name.trim().length &&
      user.email.length >= 6 &&
      user.password.length >= 6 &&
      user.password_confirmation.length >= 6 &&
      this.isValidPassword()
    );
  }

  isValidPassword() {
    return this.props.user.password === this.props.user.password_confirmation;
  }

  validationState(value) {
    return value.length >= 6 ? 'success' : 'error';
  }

  nameValidationState(value) {
    return value.trim().length ? 'success' : 'error';
  }

  passwordValidationState(value) {
    return (this.isValidPassword() && value.length >= 6) ? 'success' : 'error';
  }

  render() {
    if (this.props.modalOptions.error) {
      let messages = [];
      for (let key of Object.keys(this.props.modalOptions.error.validations)) {
        messages.push(<li>{ key } { this.props.modalOptions.error.validations[key] }</li>)
      }
      this.errors =
        <Alert bsStyle="danger">
          <ul>
            { messages }
          </ul>
        </Alert>;
    }

    return (
      <Modal
        bsSize="small"
        show={ this.props.isModalOpen }
        onHide={ ApplicationActions.closeModal }
      >
        <Modal.Header closeButton>
          <h3 className="modal-title">Sign Up</h3>
        </Modal.Header>

        {this.errors}

        <form onSubmit={ this.signUp }>
          <Modal.Body>
            <FormGroup
              controlId="First name"
              validationState={ this.nameValidationState(this.props.user.first_name) }
            >
              <ControlLabel>First Name</ControlLabel>
              <FormControl
                type="text"
                name="first_name"
                onChange={ this.setValue }
              />
            </FormGroup>
            <FormGroup
              controlId="Last name"
              validationState={ this.nameValidationState(this.props.user.last_name) }
            >
              <ControlLabel>Last Name</ControlLabel>
              <FormControl
                type="text"
                name="last_name"
                onChange={ this.setValue }
              />
            </FormGroup>
            <FormGroup
              controlId="email"
              validationState={ this.validationState(this.props.user.email) }
            >
              <ControlLabel>Email</ControlLabel>
              <FormControl
                type="text"
                name="email"
                onChange={ this.setValue }
              />
            </FormGroup>
            <FormGroup
              controlId="password"
              validationState={ this.validationState(this.props.user.password) }
            >
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                name="password"
                onChange={ this.setValue }
              />
            </FormGroup>
            <FormGroup
              controlId="password_confirmation"
              validationState={ this.passwordValidationState(this.props.user.password_confirmation) }
            >
              <ControlLabel>Password Confirmation</ControlLabel>
              <FormControl
                type="password"
                name="password_confirmation"
                onChange={ this.setValue }
              />
            </FormGroup>
          </Modal.Body>

          <Modal.Footer>
            <SocialLinks googleLinkText="SignUp with Google" facebookLinkText="SignUp with Facebook"/>
            <Col md={ 4 } >
              <Button
                bsStyle="primary"
                type="submit"
                className="pull-right"
              >
                Submit
              </Button>
            </Col>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
