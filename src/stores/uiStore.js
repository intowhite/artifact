import {observable} from 'mobx'

var uiState = observable({
	loading: 0,
	addArtistFocused: false,
	addArtistActive: false,
	addAlbumFocused: false,
	addAlbumActive: false
});

module.exports = uiState;