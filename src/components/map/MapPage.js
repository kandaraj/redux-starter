import React from 'react';
import { render } from 'react-dom';
import L from 'leaflet';
import { Map, MapControl, Marker, Popup, TileLayer, LayersControl,LayerGroup, Circle,FeatureGroup, Rectangle } from 'react-leaflet';
const { BaseLayer, Overlay } = LayersControl;
import SearchMap from '../search/SearchMap';

import 'leaflet/dist/leaflet.css';

export default class MapPage extends MapControl  {

	componentWillMount() {
 
	}

	componentDidMount(){
 
	}

	render(){
		const center = [51.505, -0.09];
		const rectangle = [
			[51.49, -0.08],
			[51.5, -0.06],
		];
		return(

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
				<SearchMap className="supportLegend">
					<input />
				</SearchMap>
			</Map>

		);
	}
}