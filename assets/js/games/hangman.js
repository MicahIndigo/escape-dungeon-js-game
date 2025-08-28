/* Hangman Game Implementation */
(() => {
    
    /* Word bank for hangman game */
    const hangmanWords = ['torch', 'dungeon', 'glove', 'escape', 'riddle', 'symbols', 'puzzle', 'adventure', 'challenge'];

    /* Game state variables */
    let selectedWord = ''; // The word to guess
    let guessedLetters = []; // Letters guessed by the player
    const maxMistakes = 6; // Maximum number of incorrect guesses allowed
    let mistakes = 0; // Current number of incorrect guesses
    let hintUsed = false; // Flag to check if hint has been used


    /* Private DOM ref (no global collision) */
    const container = document.getElementById("puzzleGameContainer");


    /**
     * Starts the Hangman game.
     * @param {function} onSuccess - callback for success
     * @param {function} onFail - callback for failure
     */
    function startHangman(onSuccess, onFail) {
      // Store the callbacks so puzzleResult can use them later
      window.hangmanOnSuccess = onSuccess;
      window.hangmanOnFail = onFail;

      resetHangmanState();
      selectedWord = pickRandomWord();
      renderHangmanUI();
      updateWordDisplay();
      updateHangmanVisual(); // show initial gallows
    }
    
    /**
     * Picks a random word from the hangmanWords array.
     * @returns {string} - randomly selected word
     */
    function pickRandomWord() {
      return hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
    }

    /**
     * Resets the game state for a new game
     */
    function resetHangmanState() {
      guessedLetters = [];
      mistakes = 0;
      hintUsed = false;
      container.innerHTML = ''; // Clears the container before render.
    }

    /**
     * Renders the Hangman game UI.
     */
    function renderHangmanUI() {
      const html = `
        <h3>Hangman Puzzle</h3>
        <pre id="hangmanVisual" class="hangman-visual"></pre>
        <p id="hangmanWordDisplay"></p>
        <input type="text" id="hangmanInput" maxlength="1" placeholder="Guess a letter" />
        <button id="hangmanGuessBtn">Guess</button>
        <button id="hangmanHintBtn">Hint</button>
        <p id="hangmanStatus"></p>
      `;

      container.innerHTML = html;

      // Attach event listeners after rendering UI
      document.getElementById("hangmanGuessBtn").addEventListener("click", handleGuess);
      document.getElementById("hangmanHintBtn").addEventListener("click", showHint);
    }

    /**
     * Updates the displayed word with guessed letters and underscores.
     */
    function updateWordDisplay() {
      const display = selectedWord
        .split('')
        .map(letter => guessedLetters.includes(letter) ? letter : '_')
        .join(' ');
      document.getElementById('hangmanWordDisplay').textContent = display;
    }

    /**
     * Handles the player's letter guess input.
     */
    function handleGuess() {
      const input = document.getElementById("hangmanInput");
      const guess = (input.value || '').toLowerCase();
      input.value = '';

      // Validate input
      if (!/^[a-z]$/.test(guess)) {
        setStatus('Enter a valid single letter.');
        return;
      }

      // Prevent duplicate guesses
      if (guessedLetters.includes(guess)) {
        setStatus('You already guessed that letter.');
        return;
      }

      // Process the guess
      guessedLetters.push(guess);
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

    /** 
     * Reveal a random unguessed letter as a hint.
    */
    function showHint() {
      if (hintUsed) {
        setStatus('You have already used your hint.');
        return;
      }

      // Pick a random unguessed letter
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

    /**
     * Updates the ASCII hangman drawing based on mistke count.
     */
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
    |      \\|
    |       |
    |       
  __|__
  `,
  ` 
     _______
    |/      |
    |      (_)
    |      \\|/
    |       |
    |      
  __|__
  `,
  ` 
     _______
    |/      |
    |      (_)
    |      \\|/
    |       |
    |      / \\
  __|__
  `
      ];

      document.getElementById('hangmanVisual').textContent = stages[mistakes];
    }

    /**
     * Sets the status message shown to the player.
     * @param {string} message - Text to display
     */
    function setStatus(message) {
      document.getElementById('hangmanStatus').textContent = message;
    }

    /**
     * Checks if the game is won or lost and triggers puzzleResult accordingly.
     */
    function checkGameState() {
      const isComplete = selectedWord.split('').every(letter => guessedLetters.includes(letter));
      if (isComplete) {
        setStatus('Congratulations! You escaped this trap!');
        setTimeout(() => puzzleResult(true), 1200);
      } else if (mistakes >= maxMistakes) {
        setStatus('You failed to solve the puzzle.');
        setTimeout(() => puzzleResult(false), 1200);
      }
    }

    /**
     * Resolves the puzzle and calls the success or fail callbacks.
     * @param {boolean} success - Whether the puzzle is solved
     */
    function puzzleResult(success) {
      container.innerHTML = '';
      if (success && typeof window.hangmanOnSuccess === 'function') {
        window.hangmanOnSuccess();
      } else if (!success && typeof window.hangmanOnFail === 'function') {
        window.hangmanOnFail();
      }
    }

    // Export only the start function
    window.startHangman = startHangman;
  })();