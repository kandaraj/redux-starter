import React from 'react';
import { render } from 'react-dom';
import { Map, MapControl, Marker, Popup, TileLayer, LayersControl,LayerGroup, Circle,FeatureGroup, Rectangle } from 'react-leaflet';
import CustomControl from '../search/CustomControl';
import ModalControl from '../search/ModalControl';
import SearchControl from '../search/SearchControl';
import { Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

class MapPage extends MapControl  {

  constructor(){
    super();
    this.state = {showModal : false, info: 'London', coord: [51.505, -0.09] }
    this.open = this.open.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount(){}

  open() {
    this.setState({ showModal: true });
  }

  onSelect(suggestion){
    this.setState({ showModal: false, info: suggestion.name, coord: suggestion.coord });
  }

	render(){
		const center = this.state.coord;
		return(
      <div>
        <ModalControl showModal={this.state.showModal}>
          <SearchControl onSelect={this.onSelect}></SearchControl>
        </ModalControl>
        <Map center={center} zoom={13}>
          <TileLayer attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
          <Marker position={center}>
            <Popup>
              <span>{this.state.info}</span>
            </Popup>
          </Marker>
          <CustomControl className="supportLegend tab" position="topleft">
            <Button bsStyle="warning" onClick={this.open}>Search</Button>
          </CustomControl>
        </Map>
      </div>
		);
	}
}

export default MapPage;

