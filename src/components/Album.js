import React from 'react'

class Album extends React.Component {
	render () {
		return (
			<li className={(this.props.album.starred == true) ? 'starred' : ''}>{(this.props.album.starred == true) ? '♥' : ''} {this.props.album.name}</li>
		)
	}
}

module.exports = Album;