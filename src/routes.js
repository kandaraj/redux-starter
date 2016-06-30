import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/courses/CoursesPage';
import MapPage from './components/map/MapPage';

export default (
	<Route path="/" component={MapPage}>
		<IndexRoute component={HomePage}/>
		<Route path="courses" component={CoursesPage} />
		<Route path="about" component={AboutPage} />
		<Route path="map" component={MapPage} />
	</Route>
);