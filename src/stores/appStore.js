import {observable} from 'mobx'

var appState = observable({
    timer: 0,
    artists: [],
    albums: []
});

module.exports = appState;