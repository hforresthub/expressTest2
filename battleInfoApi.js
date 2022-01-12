const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3000

//data
let battles = [{ "isbn": "1", "title": "tesla" }, { "isbn": "2", "title": "teslb" }, { "isbn": "3", "title": "teslc" }]

app.use(cors())

//configure body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/battle', (req, res) => {
	const battle = req.body

	console.log(battle)
	battles.push(battle)
})

app.post('/battle/:isbn', (req, res) => {
	// Reading isbn from the URL
	const isbn = req.params.isbn
	const newbattle = req.body

	// Remove item from the battles array
	for (let i = 0; i < battles.length; i++) {
		let battle = battles[i]
		if (battle.isbn === isbn) {
			battles[i] = newbattle;
		}
	}

	res.send('battle is edited')
})

app.get('/battles', (req, res) => {
	res.json(battles)
})

app.get('/battle/:isbn', (req, res) => {
	// Reading isbn from the URL
	const isbn = req.params.isbn

	// Searching battles for the isbn
	for (let battle of battles) {
		if (battle.isbn === isbn) {
			res.json(battle)
			return
		}
	}

	// Sending 404 when not found something is a good practice
	res.status(404).send('battle not found');
})

app.delete('/battle/:isbn', (req, res) => {
	// Reading isbn from the URL
	const isbn = req.params.isbn

	// Remove item from the battles array
	battles = battles.filter(i => {
		if (i.isbn !== isbn) {
			return true;
		}
		return false;
	})

	res.send('battle is deleted')
})

app.listen(port, () => {
	console.log(`hi world app is listening on port ${port}`)
})