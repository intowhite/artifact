import React from 'react'
import {observer} from 'mobx-react'
import uiState from '../stores/uiStore.js'
import Album from '../components/Album.js'
import AddAlbum from '../components/AddAlbum.js'

@observer
class AlbumList extends React.Component {
	render () {
		var albums = this.props.albums.map((album) => {
			return (
				<Album album={album} key={album.id}/>
			)
		})
		return (
			<div>
				{uiState.addAlbumActive && <AddAlbum/>}
				<div className="AlbumList">
					<h2>
						<span className="title">Albums</span>
						{uiState.addAlbumActive && <span onClick={this.handleOnclick} className="add">-</span> || <span onClick={this.handleOnclick} className="add">+</span>}
						<span className="remove">×</span>
					</h2>
					<ul>
						{albums}
					</ul>
				</div>
			</div>
		)
	}
	handleOnclick () {
		uiState.addAlbumActive = !uiState.addAlbumActive;
	}
}

module.exports = AlbumList;