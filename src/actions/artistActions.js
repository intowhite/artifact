import uiState from '../stores/uiStore.js'
import appState from '../stores/appStore.js'
import axios from 'axios';

function addArtist(artist) {
	uiState.loading = ++uiState.loading;
	let url = '/add-artist?name=' + artist;
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

module.exports = addArtist;