import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { MapControl } from 'react-leaflet';
import { Button, Modal } from 'react-bootstrap';

export default class ModalControl extends React.Component {

  constructor(){
    super();
    this.state = {showModal: false}
    this.close = this.close.bind(this);
  }

  componentWillReceiveProps (nextProps){
    this.setState(nextProps);
  }

  close(){
    this.setState({showModal: false});
  }

  render(){
    return(
      <Modal show={this.state.showModal} onHide={this.close} className='ui-front'>
        <Modal.Header closeButton>
          <Modal.Title>Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.children}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
