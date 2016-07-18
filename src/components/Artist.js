import React from 'react'

class Artist extends React.Component {
	render () {
		return (
			<li className={((this.props.artist.starred == true) ? 'starred' : '')}>{(this.props.artist.starred == true) ? '♥' : ''} {this.props.artist.name}</li>
		)
	}
}

module.exports = Artist;