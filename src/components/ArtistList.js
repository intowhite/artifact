import {observer} from 'mobx-react'
import React from 'react'
import uiState from '../stores/uiStore.js'
import Artist from '../components/Artist.js'
import AddArtist from '../components/AddArtist.js'

@observer
class ArtistList extends React.Component {
	render() {
		var artists = this.props.artists.map((artist) => {
			return (
				<Artist artist={artist} key={artist.id}/>
			)
		})
		return (
			<div>
				{uiState.addArtistActive && <AddArtist/>}
				<div className="ArtistList">
					<h2>
						<span className="title">Artists</span>
						{uiState.addArtistActive && <span onClick={this.handleOnclick} className="add">-</span> || <span onClick={this.handleOnclick} className="add">+</span>}
						<span className="remove">×</span>
					</h2>
					<ul>
						{artists}
					</ul>
				</div>
			</div>
		)
	}
	handleOnclick () {
		uiState.addArtistActive = !uiState.addArtistActive;
	}
}

module.exports = ArtistList;