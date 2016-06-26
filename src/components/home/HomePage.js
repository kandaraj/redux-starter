import React from 'react';
import {Link} from 'react-router';

const HomePage = () => {
	return (
		<div className="jumbotron">
			<h1>Home page header</h1>
			<Link to="about">About</Link>
		</div>
	);
};

export default HomePage;