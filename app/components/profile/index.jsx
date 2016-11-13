import React, { Component, PropTypes } from 'react';
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

import ProfileActions from 'actions/profile';
import ProfileStore from 'stores/profile';

@connectToStores
export default class Profile extends Component {

  static propTypes = {
    current_user: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      gender: PropTypes.string,
      email: PropTypes.string,
      current_password: PropTypes.string,
      password: PropTypes.string,
      password_confirmation: PropTypes.string
    })
  }

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
  }

  setValue(event) {
    ProfileActions.setValue(event.target.name, event.target.value);
  }

  validationState(value) {
    return value.length >= 6 ? 'success' : 'error';
  }

  loaded = () => {
    return Object.getOwnPropertyNames(this.props.current_user).length != 0;
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
            <Col md={ 8 }>
              <form onSubmit={ this.submit }>
                <FormGroup controlId="first_name">
                  <ControlLabel>First name</ControlLabel>
                  <FormControl type="text" name="first_name"
                    value={ this.props.current_user.first_name }
                    onChange={ this.setValue }
                  />
                </FormGroup>
                <FormGroup controlId="last_name">
                  <ControlLabel>Last name</ControlLabel>
                  <FormControl type="text" name="last_name"
                    value={ this.props.current_user.last_name }
                    onChange={ this.setValue }
                  />
                </FormGroup>
                <FormGroup controlId="email">
                  <ControlLabel>Email</ControlLabel>
                  <FormControl type="email" name="email"
                    value={ this.props.current_user.email }
                    onChange={ this.setValue }
                  />
                </FormGroup>
                <FormGroup controlId="gender">
                  <ControlLabel>Gender</ControlLabel>
                  <FormControl componentClass="text" name="gender"
                    value={ this.props.current_user.gender }
                    onChange={ this.setValue }
                  />
                </FormGroup>
                <FormGroup controlId="current_password" validationState={ this.validationState(this.props.current_user.current_password) }>
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
                <FormGroup controlId="password_confirmation">
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
