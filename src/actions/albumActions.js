import appState from '../stores/appStore.js'
import uiState from '../stores/uiStore.js'
import axios from 'axios'

function addAlbum(album) {
	uiState.loading = ++uiState.loading;
	let url = '/add-album?name=' + album.name + '&artist=' + album.artist;
	axios.get(url)
		.then(function (res) {
			if(res.data == "ok") {
				appState.getData();
			}
			uiState.loading = --uiState.loading;
		})
		.catch(function (err) {
			uiState.loading = --uiState.loading;
		});
}

module.exports = addAlbum;