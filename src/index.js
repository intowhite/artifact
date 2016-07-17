require('../src/scss/main.scss')

import {observable} from 'mobx'
import {observer} from 'mobx-react'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

var appState = observable({
    timer: 0,
    artists: []
});

var uiState = observable({
	loading: 0
});

appState.getData = function() {
	uiState.loading = ++uiState.loading;
	axios.get('/db')
		.then(function (res) {
			appState.artists = res.data.artists;
			uiState.loading = --uiState.loading;
		})
		.catch(function (err) {
			console.log(err);
		});
}

function addArtist(artist) {
	uiState.loading = ++uiState.loading;
	let name = artist ? artist : 'The Unicorns';
	let url = '/add-artist?name=' + name;
	axios.get(url)
		.then(function (res) {
			if(res.data == "ok") {
				appState.getData();
			}
			uiState.loading = --uiState.loading;
		})
		.catch(function (err) {
			console.log(err);
			uiState.loading = --uiState.loading;
		});
}

@observer
class App extends React.Component {
	componentDidMount() {
		appState.getData();
	}

	render() {
		return (
			<div className={ (uiState.loading > 0) ? "loading app" : "loaded app"}>
				<Topbar/>
				<AddArtist/>
				<ArtistList artists={appState.artists}/>
			</div>
		)
	}
}

class Topbar extends React.Component {
	render () {
		return (
			<div className="Topbar">
				<div className="logo">
					ARTIFACT
				</div>
				<div className="user">
				</div>
			</div>
		)
	}
}

class AddArtist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {name: ""};
	}
	render () {
		return (
			<div className="AddArtist">
				<div className="group">
					<div className="input">
						<input type="text" onChange={this.handleChange.bind(this)} onKeyPress={this.checkEnter.bind(this)} value={this.state.name} />
					</div>
					<div className="button">
						<button onClick={this.handleSubmit.bind(this)}>Submit</button>
					</div>
				</div>
			</div>
		)
	}
	handleChange (e) {
		this.setState({name: e.target.value})
	}
	handleSubmit (e) {
		if(this.state.name.length){
			addArtist(this.state.name)
			this.setState({name: ""})
		}
	}
	checkEnter (e) {
		if(e.charCode == 13) {
			this.handleSubmit()
		}
	}
}

class ArtistList extends React.Component {
	render() {
		var artists = this.props.artists.map(function(artist){
			return (
				<Artist artist={artist} key={artist.id}/>
			)
		});
		return (
			<div className="ArtistList">
				<h2>Artists</h2>
				<ul>
					{artists}
				</ul>
			</div>
		)
	}
}

class Artist extends React.Component {
	render () {
		return (
			<li>{this.props.artist.name}</li>
		)
	}
}

ReactDOM.render(<App/>, document.querySelector('#app'));

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