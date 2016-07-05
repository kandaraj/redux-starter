import React from 'react';
import { render } from 'react-dom';
import L from 'leaflet';
import { Map, MapControl, Marker, Popup, TileLayer, LayersControl,LayerGroup, Circle,FeatureGroup, Rectangle } from 'react-leaflet';
const { BaseLayer, Overlay } = LayersControl;
import CustomControl from '../search/CustomControl';
import $ from 'jquery';
import 'jquery-ui';
import 'leaflet/dist/leaflet.css';
import { Button, Modal } from 'react-bootstrap';
import 'jquery-ui/themes/smoothness/jquery-ui.css';
import '../../styles/style.css';



import Autosuggest from 'react-autosuggest';

const languages = [
  {
    name: '25 lucknow street, Mitcham',
    coord: [47.505, -0.09]
  },
  {
    name: '29 lucknow street, Mitcham',
    coord: [37.78, -0.09]
  }
];

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {return [];}
  const regex = new RegExp('^' + escapedValue, 'i');
  return languages.filter(language => regex.test(language.name));
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}




export default class MapPage extends MapControl  {

  constructor(){
    super();
    this.state = {
      showModal : false,
      value: '',
      suggestions: getSuggestions(''),
      coord: [51.505, -0.09]
    }
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
  }


  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  }

  onSuggestionsUpdateRequested({ value }) {
    this.setState({
      suggestions: getSuggestions(value)
    });
  }

  onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }){
    this.setState({
      coord: suggestion.coord
    });
    this.close();
  }

	componentWillMount() {

	}

	componentDidMount(){

	}

  open() {
    this.setState({ showModal: true });
  }

  close(){
    this.setState({showModal: false});
  }

	render(){
		const center = this.state.coord;
    const position = {};
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Type \'c\'',
      value,
      onChange: this.onChange
    };

		return(

      <div>
        <Modal show={this.state.showModal} onHide={this.close} className='ui-front'>
          <Modal.Header closeButton>
            <Modal.Title>Search</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Autosuggest suggestions={suggestions}
                         onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                         getSuggestionValue={getSuggestionValue}
                         renderSuggestion={renderSuggestion}
                         inputProps={inputProps}
                         onSuggestionSelected={this.onSuggestionSelected}
            />

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Map center={center} zoom={13}>
          <TileLayer
            attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <Marker position={center}>
            <Popup>
              <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
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


