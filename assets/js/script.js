/* Access the DOM elements */

const startButton = document.getElementById("startButton");
const startScreen = document.getElementById("startScreen");
const gameContainer = document.getElementById("escapeDungeonContainer");
const storyText = document.getElementById("storyText");
const optionsContainer = document.getElementById("optionsContainer");
const puzzleContainer = document.getElementById("puzzleGameContainer");

/* Hides the start screen and shows the game */
startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    gameContainer.style.display = "block";
    showStory("start");
});