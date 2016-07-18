import React from 'react'
import {observer} from 'mobx-react'
import appState from '../stores/appStore.js'
import uiState from '../stores/uiStore.js'
import Topbar from  '../components/Topbar.js'
import ArtistList from  '../components/ArtistList.js'
import AlbumList from  '../components/AlbumList.js'

@observer
class App extends React.Component {
	componentDidMount() {
		appState.getData();
	}

	render() {
		return (
			<div className={ (uiState.loading > 0) ? "loading app" : "loaded app"}>
				<Topbar/>
				<div className="WelcomeArea">
					<h1>Welcome back, Josh:</h1>
					<div className="stats">
						You are tracking <span>{appState.artists.length}</span> artists, <span>{appState.albums.length}</span> albums, and <span>3258</span> songs.
					</div>
					<div className="NewShows">
						<h2>Artists on tour:</h2>
						<ul>
							<li>Joanna Newsom - 7/16, Detroit USA, Royal Oak Music Theatre</li>
							<li>Burial - 9/3, Las Vegas USA, Container Park</li>
						</ul>
					</div>
				</div>
				<ArtistList artists={appState.artists}/>
				<AlbumList albums={appState.albums}/>
			</div>
		)
	}
}

module.exports = App;