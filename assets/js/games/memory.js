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
    clearInterval(memoryTimer);
    puzzleGameContainer.innerHTML = '';
}

/* Shuffle the cards(symbols) using Fisher-Yates algorithm */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}