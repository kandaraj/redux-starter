import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

var webpackMiddleware = require("webpack-dev-middleware");

app.use(
	webpackMiddleware(
		// webpack options
		compiler,
		// all other optional options
		{
			noInfo: true,
			publicPath: config.output.publicPath
		}
	)
);

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
	res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
	if (err) {
		console.log(err);
	} else {
		open(`http://localhost:${port}`);
	}
});