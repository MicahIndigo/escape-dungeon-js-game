/* Memory Game implementation */

/* Images array */
const memoryImages = [
    '🗝️', '❤️', '🔒', '🧩',
    '🗝️', '❤️', '🔒', '🧩' // Each symbols appear twice
];
let shuffledCards = [];
let flippedCards = [];
let matchedPairs = 0;
let attemptsLeft = 3;
let memoryTimer = null;
let timeRemaining = 45;

/* Dom References */
const puzzleGameContainer = document.getElementById("puzzleGameContainer");

/* Function to start the Memory game called in story.js */
function startMemory(onSuccess, onFail) {
    // Store the callbacks so puzzleResult can use them later
    window.memoryOnSuccess = onSuccess;
    window.memoryOnFail = onFail;

    resetMemoryState();
    buildMemoryUI();
    startMemoryTimer();
}

/* Resets Game Variables and clears the UI */
function resetMemoryState() {
    shuffledCards = shuffle([memoryImages]);
    flippedCards = [];
    matchedPairs = 0;
    attemptsLeft = 3;
    timeRemaining = 45;
    puzzleGameContainer.innerHTML = '';
}