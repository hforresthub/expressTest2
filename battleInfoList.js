const setEditModal = (battleId) => {
	// Get information about the battle using battleId
	const xhttp = new XMLHttpRequest()

	xhttp.open("GET", `http://localhost:3000/battle/${battleId}`, false)
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
	// document.getElementById('publisher').value = publisher
	// document.getElementById('publish_date').value = publish_date
	// document.getElementById('numOfPages').value = numOfPages

	// Setting up the action url for the battle
	document.getElementById('editForm').action = `http://localhost:3000/battle/${battleId}`
}

const deletebattle = (battleId) => {
	const xhttp = new XMLHttpRequest()

	xhttp.open("DELETE", `http://localhost:3000/battle/${battleId}`, false)
	xhttp.send();

	// Reloading the page
	location.reload()
}

const loadbattles = () => {
	const xhttp = new XMLHttpRequest()

	xhttp.open("GET", "http://localhost:3000/battles", false)
	xhttp.send()

	const battles = JSON.parse(xhttp.responseText)

	for (let battle of battles) {
		const x = `
			<div class="col-4">
				<div class="card">
					<div class="card-body">
						<h5 class="card-title">${battle.title}</h5>
						<h6 class="card-subtitle mb-2 text-muted">${battle.battleId}</h6>

						<div>player: ${battle.player}</div>
						<div>Player troops: ${battle.playerTroops}</div>
						<div>Enemy troops: ${battle.enemyTroops}</div>
						<div>Image of battle results: ${battle.imageLink}</div>

						<hr>

						<button type="button" class="btn btn-danger" onClick="deletebattle(${battle.battleId})">Delete</button>
						<button types="button" class="btn btn-primary" data-toggle="modal"
							data-target="#editbattleModal" onClick="setEditModal(${battle.battleId})">
							Edit
						</button>
					</div>
				</div>
			</div>
		`

		document.getElementById('battles').innerHTML = document.getElementById('battles').innerHTML + x
	}
}

loadbattles();