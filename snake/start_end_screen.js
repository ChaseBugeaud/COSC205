const startScreen = document.getElementById("startScreen");
const endScreen = document.getElementById("endScreen");

const gameCanvas = document.getElementById("canvas");

const startButton = document.getElementById("startButton");
const playAgainButton = document.getElementById("playAgainButton");

function loadStart() {
	endScreen.style.display = "none";
	startScreen.style.display = "block";
	gameCanvas.style.display = "none";
}

playAgainButton.addEventListener("click", () => {
	endScreen.style.display = "none";
	startScreen.style.display = "block";
	gameCanvas.style.display = "none";
});

startButton.addEventListener("click", () => {
	startScreen.style.display = "none";
	endScreen.style.display = "none";
	gameCanvas.style.display = "block";
	//Starts Game
	init();
});

//Need to change how we are transitioning to end
gameCanvas.addEventListener("click", () => {
	//Will need to populate h4 tag with Final Score
	endScreen.style.display = "block";
	startScreen.style.display = "none";
	gameCanvas.style.display = "none";
});
