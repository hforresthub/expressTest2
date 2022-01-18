const site = 'https://battle-test-express.herokuapp.com/'

const setEditModal = (battleId) => {
	// Get information about the battle using battleId
	const xhttp = new XMLHttpRequest()

	xhttp.open("GET", `${site}${battleId}`, false)
	xhttp.send()

	const battle = JSON.parse(xhttp.responseText)

	const {
		title,
		player,
		playerTroops,
		enemyTroops,
		imageLink
	} = battle

	// Filling information about the battle in the form inside the modal
	document.getElementById('battleId').value = battleId
	document.getElementById('title').value = title
	// document.getElementById('player').value = player

	// Setting up the action url for the battle
	document.getElementById('editForm').action = `${site}${battleId}`
}

const deletebattle = (battleId) => {
	const xhttp = new XMLHttpRequest()

	xhttp.open("DELETE", `${site}${battleId}`, false)
	xhttp.send();

	// Reloading the page
	location.reload()
}

const loadbattles = () => {
	const xhttp = new XMLHttpRequest()

	xhttp.open("GET", `${site}battles`, false)
	xhttp.send()

	const battles = JSON.parse(xhttp.responseText)

	for (let battle of battles) {
		const x = `
					<div class="battle">
						<h2>${battle.title}</h2>
						<h3>${battle.battleId}</h3>
						<p>player: ${battle.player}</p>
						<p>Player troops: ${battle.playerTroops}</p>
						<p>Enemy troops: ${battle.enemyTroops}</p>
						<div>Image of battle results: ${battle.imageLink}</div>
					</div>
		`
		document.getElementById('battles').innerHTML = document.getElementById('battles').innerHTML + x
	}
}

loadbattles();