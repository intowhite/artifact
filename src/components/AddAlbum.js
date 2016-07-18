import {observer} from 'mobx-react'
import React from 'react'
import appState from '../stores/appStore.js'
import uiState from '../stores/uiStore.js'
import Artist from '../components/Artist.js'
import addAlbum from '../actions/albumActions.js'

@observer
class AddAlbum extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			artist: "",
			visible: false
		};
	}
	componentDidMount() {
		setTimeout(() => {
			this.setState({visible: true});
		},10);
	}
	render () {
		return (
			<div className={(this.state.visible) ? "AddAlbum visible" : "AddAlbum hidden" }>
				<div className="PickArtist">
					<div className="select-group">
						<h3 onClick={this.handleOnclick}>Choose an artist:</h3>
						<ul>
							{appState.artists.map(function(artist){
								return (
									<li key={artist.id} 
										onClick={() => this.handleOnclick(artist)}
										className={(this.state.artist == artist.id) ? "selected" : ""}>
										{artist.name}
									</li>
								)
							},this)}
						</ul>
					</div>
				</div>
				<div className={(uiState.addAlbumFocused == true) ? "focused group" : "group"}>
					<div className="input">
						<input type="text" onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange.bind(this)} onKeyPress={this.checkEnter.bind(this)} value={this.state.name} placeholder="Album Name" />
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
			addAlbum({name: this.state.name, artist: this.state.artist})
			this.setState({name: "", artist: null})
		}
	}
	handleFocus () {
		uiState.addAlbumFocused = true;
	}
	handleBlur () {
		uiState.addAlbumFocused = false;
	}
	checkEnter (e) {
		if(e.charCode == 13) {
			this.handleSubmit()
		}
	}
	handleOnclick (artist) {
		this.setState({artist: artist.id})
	}

}

module.exports = AddAlbum;