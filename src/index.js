require('../src/scss/main.scss')

import {observable} from 'mobx'
import {observer} from 'mobx-react'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import _ from 'lodash'
import App from '../src/components/App.js'
import appState from '../src/stores/appStore.js'
import uiState from '../src/stores/uiStore.js'


appState.getData = function() {
	uiState.loading = ++uiState.loading;
	axios.get('/db')
		.then(function (res) {
			let artists = res.data.artists;
			let sorted_by_name = _.sortBy(artists,(o) => { return o.name; });
			let sorted_by_starred = _.sortBy(sorted_by_name,(o) => { return o.starred; });
			appState.artists = sorted_by_starred;
			
			let albums = res.data.albums;
			let albums_sorted_by_name = _.sortBy(albums,(o) => { return o.name; });
			let albums_sorted_by_starred = _.sortBy(albums_sorted_by_name,(o) => { return o.starred; });
			appState.albums = albums_sorted_by_starred;

			uiState.loading = --uiState.loading;
		})
		.catch(function (err) {
			console.log(err);
		});
}

ReactDOM.render(<App/>, document.querySelector('#app'));
var loader = document.querySelector('#loader');
loader.remove();

// appState.resetTimer = function() {
//     appState.timer = 0;
// };

// appState.getData = function() {
// 	axios.get('/db')
// 		.then(function (res) {
// 			console.log(res.data.artists[0]);
// 			appState.artists = res.data.artists[0];
// 		})
// 		.catch(function (err) {
// 			console.log(err);
// 		});
// }

// setInterval(function() {
//     appState.timer += 1;
// }, 1000);

// @observer
// class App extends React.Component {
//     render() {
//         return (
//         	<div>
// 	        	<button onClick={this.onReset.bind(this)}>
// 	                Seconds passed: {this.props.appState.timer}
// 	            </button>
// 	            <button onClick={this.onGetData.bind(this)}>
// 	                Get
// 	            </button>
// 	            	Data: {this.props.appState.artists.name}
//             </div>
//     	);
//     }

//     onReset () {
//         this.props.appState.resetTimer();
//     }

//     onGetData () {
//     	this.props.appState.getData();
//     }
// };