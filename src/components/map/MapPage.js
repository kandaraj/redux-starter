import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map, MapControl, Marker, Popup, TileLayer } from 'react-leaflet';
import CustomControl from '../search/CustomControl';
import ModalControl from '../search/ModalControl';
import SearchControl from '../search/SearchControl';
import SearchHistory from '../search/SearchHistory';
import { Button } from 'react-bootstrap';
import * as MapAction from '../../actions/mapActions';

class MapPage extends MapControl  {

  constructor(){
    super();
    this.state = {showModal : false }
    this.open = this.open.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount(){}

  open() {
    this.setState({ showModal: true });
  }

  onSelect(suggestion){
    this.setState({ showModal: false} );
    this.props.actions.mapPinned({info: suggestion.name, coord: suggestion.coord});
  }

	render(){
		const center = this.props.geoLocation.coord;
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
        <div>
          <SearchHistory geoLocation={this.props.geoLocation}/>
        </div>
      </div>
		);
	}
}

const mapStateToProps = function(state, ownProps){
  "use strict";

  return {
    geoLocation: state.maps.geoLocation
  };
};

const mapDispatchToProps = function(dispatch){
  "use strict";
  return {
    actions: bindActionCreators(MapAction, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);

