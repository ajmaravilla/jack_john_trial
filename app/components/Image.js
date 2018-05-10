// ----------------------------
// import dependencies
// ----------------------------
import React, {Component} from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';


// ----------------------------
// Static Bars
// ----------------------------
import data from '../../data.json';

// defining the variable
class Image extends Component (props) {
	// image source revceives the parent React component as a property
	let source { '../../data.json' + props.source;}

	// defining a style for our images that will be ported to the dashboard
	style {
		width: '500px',
    	margin: '10px 5px 0px 5px'
	};

	return (
		<img src = { source } style = { style } />
	);
};

export default Image;