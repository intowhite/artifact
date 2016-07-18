const low = require('lowdb')
const db = low('db.json')
const express = require('express')
const app = express()
const path = require('path')
const uuid = require('node-uuid')

app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname + '/src/index.html'))
})

app.get('/db', (req,res) => {
	res.send(db)
})

app.get('/artists', (req,res) => {
	let data = db.get('artists').value()
	res.send(data)
})

app.get('/add-artist', (req,res) => {
	let name = req.query.name;
	db.get('artists').push({ name: name, id: uuid() }).value()
	res.send('ok')
})

app.get('/add-album', (req,res) => {
	let name = req.query.name;
	let artist = req.query.artist;
	db.get('albums').push({ name: name, id: uuid(), artist: artist }).value()
	res.send('ok')
})

app.get('/img/:name', (req,res, next) => {
	let filename = req.params.name;
	var options = {
	    root: __dirname + '/img/',
	    dotfiles: 'deny',
	    headers: {
	        'x-timestamp': Date.now(),
	        'x-sent': true
    	}
  };
	res.sendFile(filename,options, function(err){
		if(err) {
			console.log(err);
		}
	});
})

app.listen(3000)