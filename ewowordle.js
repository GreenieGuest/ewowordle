//stuff and thangs -rick grimes
//pls forgive me im kinda bad at this
const textbox = document.getElementById("input");
const lifecount = document.getElementById("lives");
const subtext = document.getElementById("status");

var lives = 10;

var answer, answerLives, answerNRs, answerR1, answerR2, answerR3;

fetch('ewowordle.json')
    .then(response => response.json())
    .then(jsonData => {
		const randomIndex = Math.floor(Math.random() * jsonData.length);

		answer = jsonData[randomIndex].name;
		answerLives = jsonData[randomIndex].lives;
		answerNRs = jsonData[randomIndex].rrs;
		answerR1 = jsonData[randomIndex].r1;
		answerR2 = jsonData[randomIndex].r2;
		answerR3 = jsonData[randomIndex].r3;
    });

function symbol(value, answer, rank) {
	if (value < answer) {
		let emoji = rank == true ? "🔽" : "🔼";
		return emoji;
	} else if (value > answer) {
		let emoji = rank == true ? "🔼" : "🔽";
		return emoji;
	} else {
		return "✅";
	}
}

function giveHints() {
	let guess = textbox.value;

	fetch('ewowordle.json')
	.then(response => response.json())
	.then(jsonData => {
		const match = jsonData.find(item => item.name === guess);

		if (!match) {
			subtext.innerHTML = "Not a living EWOWer (case sensitive)";
		} else {
			const tableBody = document.querySelector("#hint tbody");

			const row = document.createElement("tr");

			const nameCell = document.createElement("td");
			let emoji = match.name == answer ? "✅" : "❌";
			nameCell.textContent = match.name + emoji;

			const livesCell = document.createElement("td");
			livesCell.textContent = match.lives + symbol(match.lives, answerLives, false);

			const rrsCell = document.createElement("td");
			rrsCell.textContent = match.rrs + symbol(match.rrs, answerNRs, false);

			const r1Cell = document.createElement("td");
			r1Cell.textContent = match.r1 + symbol(match.r1, answerR1, true);

			const r2Cell = document.createElement("td");
			r2Cell.textContent = match.r2 + symbol(match.r2, answerR2, true);

			const r3Cell = document.createElement("td");
			r3Cell.textContent = match.r3 + symbol(match.r3, answerR3, true);

			row.appendChild(nameCell);
			row.appendChild(livesCell);
			row.appendChild(rrsCell);
			row.appendChild(r1Cell);
			row.appendChild(r2Cell);
			row.appendChild(r3Cell);
			tableBody.appendChild(row);
		}
	});
}

function check() {
	let guess = textbox.value;

	fetch('ewowordle.json')
	.then(response => response.json())
	.then(jsonData => {
		const exactMatch = jsonData.find(item => item.name === guess);

		if (!exactMatch) {
		subtext.innerHTML = "Not a living EWOWer (case sensitive)";
		} else {


			//If it's right, umm... you get wisdom? If it's wrong... the player DIES. If they don't die yet, they get a helpful hint (to be done later)
			if (guess == answer) {
				// Good Ending
				setTimeout(function () {
					subtext.innerHTML = "You won!";
					giveHints(guess);
					alert("You're Winner! 🏆 You Get Wisdom \n\n\n the answer was: "+answer);
				}, 0);
			} else {
				// Bad Ending
				if (lives > 1) {
					lives -= 1;
					subtext.innerHTML = "You lost a life!";
					lifecount.innerHTML = "Lives: " + "❤️".repeat(lives);
					giveHints(guess);
				} else {
					setTimeout(function () {
						alert("You Lost The Game! 💀 \n\n\n the answer was: "+answer);
						location.reload();
					}, 0);
				}
			}


		}
	});
}
