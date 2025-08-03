/* Hangman Game Implementation */

/* Word list for Hangman */
const hangmanWords = ['torch', 'dungeon', 'glove', 'escape', 'riddle', 'symbols', 'puzzle', 'adventure', 'challenge',];

/* Variables for Hangman game */
let selectedWord = ''; // The word to guess
let guessedLetters = []; // Letters guessed by the player
let maxMistakes = 6; // Maximum number of incorrect guesses allowed
let mistakes = 0; // Current number of incorrect guesses
let hintUsed = false; // Flag to check if hint has been used

/* Dom references */
const puzzleGameContainer = document.getElementById("puzzleGameContainer");

/* Function to start the Hangman game called in story.js */
function startHangmanPuzzle(callback) {
    resetHangmanState();
    selectedWord = pickRandomWord();
    renderHangmanUI();
    updateWordDisplay();
    if (callback) callback('hangman');
}

/* Randomly picks a word from the hangmanWords array */
function pickRandomWord() {
    return hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
}

/* Resets Variables and clears container */
function resetHangmanState() {
    guessedLetters = [];
    mistakes = 0;
    hintUsed = false;
    puzzleGameContainer.innerHTML = '';
}

/* Builds the Hangman UI and renders in the container */
function renderHangmanUI() {
    const html = `
        <h3>Hangman Puzzle</h3>
        <pre id="hangmanVisual" cladss="hangman-visual"></pre> <!-- ASCII art for hangman -->
        <p id="hangmanWordDisplay"></p>
        <input type="text" id="hangmanInput" maxlength="1" placeholder="Guess a letter" />
        <button id="hangmanGuessBtn">Guess</button>
        <button id="hangmanHintBtn">Hint</button>
        <p id="hangmanStatus"></p>
        `;
        puzzleGameContainer.innerHTML = html;

        // Add event listeners for buttons
        document.getElementById("hangmanGuessBtn").addEventListener("click", handleGuess);
        document.getElementById("hangmanHintBtn").addEventListener("click", showHint);
}