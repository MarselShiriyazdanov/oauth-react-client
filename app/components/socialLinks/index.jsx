import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import ApplicationActions from 'actions/application';
import GoogleActions from 'actions/google';
import FacebookActions from 'actions/facebook';

export default class SocialLinks extends Component {
  authThroughGoogle = () => {
    ApplicationActions.closeModal();
    gapi.auth.authorize({
      immediate: false,
      response_type: 'code',
      cookie_policy: 'single_host_origin',
      client_id: "173494777873-fpeo1ej4tb5p3k5h13asnbb559o14u1k.apps.googleusercontent.com",
      scope: 'email profile'
    }, GoogleActions.auth);
  }

  authThroughFacebook = () => {
    ApplicationActions.closeModal();
    FB.getLoginStatus((response) => {
      if (response.status === 'connected' || response.status === 'not_authorized') {
        FB.logout(() => {
          FB.login(FacebookActions.auth);
        })
      } else {
        FB.login(FacebookActions.auth);
      }
    });
  }

  render() {
    return(
      <Col md={ 8 } className="text-left">
        <a href="#google" onClick={ this.authThroughGoogle }>{ this.props.googleLinkText }</a>
        <br></br>
        <a href="#facebook" onClick={ this.authThroughFacebook }>{ this.props.facebookLinkText }</a>
      </Col>
    );
  }
}
