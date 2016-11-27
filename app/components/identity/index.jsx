import React, { Component } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import SocialLinks from 'components/socialLinks';
import IdentityActions from 'actions/identity';
import IdentityStore from 'stores/identity';

@connectToStores
export default class Identity extends Component {
  static getStores(props) {
    return [IdentityStore];
  }

  static getPropsFromStores(props) {
    return IdentityStore.getState();
  }

  delete = (identity) => {
    return function(event) {
      IdentityActions.delete(identity, this.props.identities);
    }.bind(this);
  }

  render() {
    return (
      <Col md={ 3 } mdOffset={ 1 }>
        <Row>
          <b>Connected accounts:</b>
          {
            this.props.identities.map(identity => {
              return <p key={ identity.id }>{identity.provider} {identity.uid} <a href="#unlink" onClick={ this.delete(identity) }>delete</a></p>;
            })
          }
        </Row>
        <Row>
          <SocialLinks googleLinkText="add Google account" facebookLinkText="add Facebook account"/>
        </Row>
      </Col>
    );
  }
}
