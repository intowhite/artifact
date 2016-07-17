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

app.listen(3000)