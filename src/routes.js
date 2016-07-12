import React from 'react';
import {Route} from 'react-router';

import MapPage from './components/map/MapPage';

export default (
	<Route path="/" component={MapPage}>
		<Route path="map" component={MapPage} />
	</Route>
);
