import React from 'react';
import 'jquery-ui';
import {Tab, Row, Col, Nav, NavItem} from 'react-bootstrap';
import AddressSearch from './AddressSearchControl';

export default class SearchHistory extends React.Component {
  constructor(){
    super();
    this.state = {history: []};
  }

  componentWillReceiveProps(nextProps){
    this.state.history.push({
      geoLocation: this.props.geoLocation
    });
  }

  render(){
    return(
      <div className="status">
        Testing
      </div>
    )
  }
}


