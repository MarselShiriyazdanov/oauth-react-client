import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

export default class LoggedInHome extends Component {
  render() {
    return(
      <Grid>
        <Row>
          <Col md={ 8 }>
            <h2>Welcome!</h2>
          </Col>
        </Row>
      </Grid>
    );
  }
}
