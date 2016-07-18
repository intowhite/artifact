import {observer} from 'mobx-react'
import React from 'react'
import uiState from '../stores/uiStore.js'
import addArtist from '../actions/artistActions.js'

@observer
class AddArtist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
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
			<div className={(this.state.visible) ? "AddArtist visible" : "AddArtist hidden" }>
				<div className={(uiState.addArtistFocused == true) ? "focused group" : "group"}>
					<div className="input">
						<input type="text" onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange.bind(this)} onKeyPress={this.checkEnter.bind(this)} value={this.state.name} placeholder="Artist Name"/>
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
	handleFocus () {
		uiState.addArtistFocused = true;
	}
	handleBlur () {
		uiState.addArtistFocused = false;
	}
	checkEnter (e) {
		if(e.charCode == 13) {
			this.handleSubmit()
		}
	}
}

module.exports = AddArtist;