const startScreen = document.getElementById("startScreen");
const playAgainButton = document.getElementById("playAgainButton");
const endScreen = document.getElementById("endScreen");
const gameCanvas = document.getElementById("canvas");

playAgainButton.addEventListener("click", () => {
	endScreen.style.display = "none";
	startScreen.style.display = "block";
});