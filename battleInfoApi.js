const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')

const app = express()
const port = 3000
const battleFile = './battleData.json'

//data
let battles = [{ "battleId": "1", "title": "tesla" }, { "battleId": "2", "title": "teslb" }, { "battleId": "3", "title": "teslc" }]

fs.readFile(battleFile, 'utf8', (err, data) => {
	if (err) {
		console.error(err)
		return
	}
	battles = JSON.parse(data)
	console.log(battles)
})

const updateBattleFile = () => {
	fs.writeFile(battleFile, JSON.stringify(battles), { flag: 'w+'}, err => {
		if (err) {
			console.error(err)
			return
		}
		console.log('updated json file')
	})
}


app.use(cors())

//configure body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/battle', (req, res) => {
	const battle = req.body

	console.log(battle)
	battles.push(battle)
	updateBattleFile()
})

app.post('/battle/:battleId', (req, res) => {
	// Reading battleId from the URL
	const battleId = req.params.battleId
	const newbattle = req.body

	// Remove item from the battles array
	for (let i = 0; i < battles.length; i++) {
		let battle = battles[i]
		if (battle.battleId === battleId) {
			battles[i] = newbattle;
		}
	}
	updateBattleFile()

	res.send('battle is edited')
})

app.get('/battles', (req, res) => {
	res.json(battles)
})

app.get('/battle/:battleId', (req, res) => {
	// Reading battleId from the URL
	const battleId = req.params.battleId

	// Searching battles for the battleId
	for (let battle of battles) {
		if (battle.battleId === battleId) {
			res.json(battle)
			return
		}
	}

	// Sending 404 when not found something is a good practice
	res.status(404).send('battle not found');
})

app.delete('/battle/:battleId', (req, res) => {
	// Reading battleId from the URL
	const battleId = req.params.battleId

	// Remove item from the battles array
	battles = battles.filter(i => {
		if (i.battleId !== battleId) {
			return true;
		}
		return false;
	})
	updateBattleFile()

	res.send('battle is deleted')
})

app.listen(port, () => {
	console.log(`battles app is listening on port ${port}`)
})