import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';

export default class Profile extends Component {

  submit = (event) => {
    event.preventDefault();
  }

  setValue(event) {
    console.log(event.target)
    window.t = event.target
  }

  render() {
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
                  value={ "first" }
                  onChange={ this.setValue }
                />
              </FormGroup>
              <FormGroup controlId="last_name">
                <ControlLabel>Last name</ControlLabel>
                <FormControl type="text" name="last_name"
                  value={ "last" }
                  onChange={ this.setValue }
                />
              </FormGroup>
              <FormGroup controlId="email">
                <ControlLabel>Email</ControlLabel>
                <FormControl type="email" name="email"
                  value={ "email" }
                  onChange={ this.setValue }
                />
              </FormGroup>
              <FormGroup controlId="gender">
                <ControlLabel>Gender</ControlLabel>
                <FormControl componentClass="text" name="gender"
                  value={ "gender" }
                  onChange={ this.setValue }
                />
              </FormGroup>
              <FormGroup controlId="current_password">
                <ControlLabel>Current password</ControlLabel>
                <FormControl type="password" name="current_password"
                  value={ "current_password" }
                  onChange={ this.setValue }
                />
              </FormGroup>
              <FormGroup controlId="password">
                <ControlLabel>Password</ControlLabel>
                <FormControl type="password" name="password"
                  onChange={ this.setValue }
                />
              </FormGroup>
              <FormGroup controlId="password_confirmation">
                <ControlLabel>Password Confirmation</ControlLabel>
                <FormControl type="password" name="password_confirmation"
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
