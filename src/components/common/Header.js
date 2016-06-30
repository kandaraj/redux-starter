import React from 'react';
import {Link, IndexLink} from 'react-router';

const Header = () => {
	"use strict";
	return (
		<nav>
			<IndexLink to="/" activeClassName="active">Home</IndexLink>
			{" | "}
			<Link to="courses" activeClassName="active">Courses</Link>
			{" | "}
			<Link to="about" activeClassName="active">About</Link>
			{" | "}
			<Link to="map" activeClassName="active">Map</Link>
		</nav>
	);
};

export default Header;