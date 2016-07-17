const low = require('lowdb')
const db = low('db.json')

db.defaults({ artists: [], user: {} })
  .value()

db.get('artists')
  .push({ id: 1, name: 'Burial'})
  .value()

db.set('user.name', 'typicode')
  .value()

var res = db.get('artists')
  .find({ id: 1 })
  .value()

console.log(res)