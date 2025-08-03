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
function startHangman(onSuccess, onFail) {
    // Store the callbacks so puzzleResult can use them later
    window.hangmanOnSuccess = onSuccess;
    window.hangmanOnFail = onFail;
  
    resetHangmanState();
    selectedWord = pickRandomWord();
    renderHangmanUI();
    updateWordDisplay();
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

/* Updates the displayed word with correct guesses */
function updateWordDisplay () {
    const display = selectedWord
        .split('')
        .map(letter => guessedLetters.includes(letter) ? letter : '_')
        .join(' ');
    document.getElementById('hangmanWordDisplay').textContent = display;
}

/* Proccesses the players letter input */
function handleGuess() {
    const input = document.getElementById("hangmanInput");
    const guess = input.value.toLowerCase();
    input.value = '';

    // Validate the input
    if (!guess || guessedLetters.length !== !/[a-z]/.test(guess)) {
        setStatus('Enter a valid single letter.');
        return;
    }

    // Check if the letter has already been guessed
    if (guessedLetters.includes(guess)) {
        setStatus('You already guessed that letter.');
        return;
    }

    guessedLetters.push(guess);

    // Check if the guessed letter is correct
    if (selectedWord.includes(guess)) {
        setStatus('Correct!');
    } else {
        mistakes++;
        setStatus(`Incorrect! mistakes: ${mistakes}/${maxMistakes}`);
    }

    updateWordDisplay();
    updateHangmanVisual();
    checkGameState();
}

/* Function to show a hint */
function showHint() {
    if (hintUsed) {
        setStatus('You have already used your hint.');
        return;
    }

    const unguessed = selectedWord.split('').filter(l => !guessedLetters.includes(l));
    if (unguessed.length > 0) {
        const hintLetter = unguessed[Math.floor(Math.random() * unguessed.length)];
        guessedLetters.push(hintLetter);
        hintUsed = true;
        setStatus(`Hint Revealed: ${hintLetter}`);
        updateWordDisplay();
        updateHangmanVisual();
        checkGameState();
    }
}

/* Updates the hangman visual based on mistakes */
function updateHangmanVisual() {
    const stages = [
` 
   _______
  |/      
  |        
  |       
  |       
  |      
__|__
`,
` 
   _______
  |/      |
  |        
  |        
  |        
  |       
__|__
`,
` 
   _______
  |/      |
  |      (_)
  |        
  |        
  |       
__|__
`,
` 
   _______
  |/      |
  |      (_)
  |       |
  |       |
  |       
__|__
`,
` 
   _______
  |/      |
  |      (_)
  |      \|
  |       |
  |       
__|__
`,
` 
   _______
  |/      |
  |      (_)
  |      \|/
  |       |
  |      
__|__
`,
` 
   _______
  |/      |
  |      (_)
  |      \|/
  |       |
  |      / \
__|__
`
    ];

    document.getElementById('hangmanVisual').textContent = stages[mistakes];
}

/* Displays status message below the puzzle */
function setStatus(message) {
    document.getElementById('hangmanStatus').textContent = message;
}

/* Checks the game state to determine win/loss and end puzzle */
function checkGameState() {
    const isComplete = selectedWord.split('').every(letter => guessedLetters.includes(letter));

    if (isComplete) {
        setStatus('Congratulations! You escaped this trap!');
        setTimeout(() => puzzleResult(true), 1500);
    } else if (mistakes >= maxMistakes) {
        setStatus('You failed to solve the puzzle.');
        setTimeout(() => puzzleResult(false), 1500);
    }
}

/* Sends result back to story logic */
function puzzleResult(success) {
    puzzleGameContainer.innerHTML = '';

    if (success && typeof window.hangmanOnSuccess === 'function') {
        window.hangmanOnSuccess();
    } else if (!success && typeof window.hangmanOnFail === 'function') {
        window.hangmanOnFail();
    }
}
