export function createCourse(course) {
	"use strict";
	return {
		type: 'CREATE_COURSE',
		course
	};
}