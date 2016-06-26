import * as actionTypes from '../actions/actionTypes';

export function createCourse(course) {
	"use strict";
	return {
		type: actionTypes.CREATE_COURSE,
		course
	};
}