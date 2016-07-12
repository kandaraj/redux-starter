import * as actionTypes from '../actions/actionTypes';

export function mapPinned(geoLocation) {
	"use strict";
	return {
		type: actionTypes.MAP_PINNED,
    geoLocation
	};
}
