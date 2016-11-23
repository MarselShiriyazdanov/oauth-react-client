import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import ApplicationActions from 'actions/application';
import GoogleActions from 'actions/google';

export default class SocialLinks extends Component {
  authThroughGoogle = () => {
    ApplicationActions.closeModal();
    gapi.auth.authorize({
      immediate: false,
      response_type: 'code',
      cookie_policy: 'single_host_origin',
      client_id: "client_id",
      scope: 'email profile'
    }, GoogleActions.auth);
  }

  render() {
    return(
      <Col md={ 8 } className="text-left">
        <a href="#google" onClick={ this.authThroughGoogle }>{ this.props.googleLinkText }</a>
        <br></br>
        <a href="#facebook" onClick={ this.authThroughGoogle }>{ this.props.facebookLinkText }</a>
      </Col>
    );
  }
}
