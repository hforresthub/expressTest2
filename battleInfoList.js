const setEditModal = (isbn) => {
	// Get information about the battle using isbn
	const xhttp = new XMLHttpRequest()

	xhttp.open("GET", `http://localhost:3000/battle/${isbn}`, false)
	xhttp.send()

	const battle = JSON.parse(xhttp.responseText)

	const {
		title,
		author,
		publisher,
		publish_date,
		numOfPages
	} = battle

	// Filling information about the battle in the form inside the modal
	document.getElementById('isbn').value = isbn
	document.getElementById('title').value = title
	// document.getElementById('author').value = author
	// document.getElementById('publisher').value = publisher
	// document.getElementById('publish_date').value = publish_date
	// document.getElementById('numOfPages').value = numOfPages

	// Setting up the action url for the battle
	document.getElementById('editForm').action = `http://localhost:3000/battle/${isbn}`
}

const deletebattle = (isbn) => {
	const xhttp = new XMLHttpRequest()

	xhttp.open("DELETE", `http://localhost:3000/battle/${isbn}`, false)
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
						<h6 class="card-subtitle mb-2 text-muted">${battle.isbn}</h6>

						<div>Author: ${battle.author}</div>
						<div>Publisher: ${battle.publisher}</div>
						<div>Number Of Pages: ${battle.numOfPages}</div>

						<hr>

						<button type="button" class="btn btn-danger" onClick="deletebattle(${battle.isbn})">Delete</button>
						<button types="button" class="btn btn-primary" data-toggle="modal"
							data-target="#editbattleModal" onClick="setEditModal(${battle.isbn})">
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