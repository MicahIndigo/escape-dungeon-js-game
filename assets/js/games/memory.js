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

/* Build and render the Memory puzzle UI */
function buildMemoryUI() {
    const board = document.createElement('div');
    board.className = 'memory-board';

    shuffledCards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.textContent = '?';
        card.addEventListener('click', handleCardClick);
        board.appendChild(card);
    });

    const status = document.createElement('p');
    status.id = 'memoryStatus';
    status.textContent = `Attempts Left: ${attemptsLeft}, Time Remaining: ${timeRemaining}s`;

    puzzleGameContainer.appendChild(board);
    puzzleGameContainer.appendChild(status);
}