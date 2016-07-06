import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';

import 'jquery-ui/themes/smoothness/jquery-ui.css';
import 'leaflet/dist/leaflet.css';
import './styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();

// Provider connects store with React components
// 		but providing the store to all the containers and components

render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes}/>
	</Provider>,
	document.getElementById('app')
);
