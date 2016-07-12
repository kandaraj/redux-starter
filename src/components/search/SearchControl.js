import React from 'react';
import 'jquery-ui';
import {Tab, Row, Col, Nav, NavItem} from 'react-bootstrap';
import AddressSearch from './AddressSearchControl';

export default class SearchControl extends React.Component {

  render(){
    return(
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row className="clearfix">
          <Col sm={4}>
            <Nav bsStyle="pills" stacked>
              <NavItem eventKey="first">
                Search by address
              </NavItem>
              <NavItem eventKey="second">
                Search by SLID
              </NavItem>
            </Nav>
          </Col>
          <Col sm={8}>
            <Tab.Content animation>
              <Tab.Pane eventKey="first">
                <AddressSearch onSelect={this.props.onSelect} placeHolder="Enter address" />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <AddressSearch onSelect={this.props.onSelect} placeHolder="Enter SLID" />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    )
  }
}
