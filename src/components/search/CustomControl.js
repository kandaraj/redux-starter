import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { MapControl } from 'react-leaflet';

export default class CustomControl extends MapControl {

	componentWillMount() {
		const legend = L.control({position: this.props.position});
		const jsx = (
			<div {...this.props}>
				{this.props.children}
			</div>
		);

		legend.onAdd = function (map) {
			let div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
			ReactDOM.render(jsx, div);
			return div;
		};

		this.leafletElement = legend;
	}
}
