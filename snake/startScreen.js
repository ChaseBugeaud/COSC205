const startButton = document.getElementById("startButton");
const startScreen = document.getElementById("startScreen");
const gameCanvas = document.getElementById("canvas");

startButton.addEventListener("click", () => {
	startScreen.style.display = "none";
	gameCanvas.style.display = "block";
	
	init();
});