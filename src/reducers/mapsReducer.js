
let geoLocation = {name: 'Londone',  coord: [51.505, -0.09]};

export default function mapsReducer(state = {geoLocation}, action) {
	"use strict";


	switch(action.type) {

		case 'MAP_PINNED':
      let a = Object.assign({}, {geoLocation: action.geoLocation} );
			return a;

		default:
			return state;

	}
}
