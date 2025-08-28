/* Word Scramble Game Implementation */
(() => {
    //  Game state
    let currentWord = "";
    let scrambledWord = "";
    let attemptsLeft = 3;
    let timeLeft = 45; // seconds
    let timerInterval = null;

    // Private DOM ref (no global collision)
    const container = document.getElementById("puzzleGameContainer");

    // Word bank for the scramble game
    const wordBank = ["sword", "dungeon", "escape", "magic", "dragon", "puzzle", "torch", "shield", "castle", "riddle"];

    /**
     * Starts the Word Scramble game.
     * @param {function} onSuccess - success callback
     * @param {function} onFail - failure callback
     */
    function startScramble(onSuccess,onFail) {
        // Store callbacks on globally like other puzzles
        window.scrambleOnSuccess = onSuccess;
        window.scrambleOnFail = onFail;

        // Reset state
        attemptsLeft = 3;
        timeLeft = 45;
        clearInterval(timerInterval);
        container.innerHTML = "";

        // Pick Random Word and Scramble it
        currentWord = getRandomWord();
        scrambledWord = shuffleWord(currentWord);

        buildScrambleUI();
        startTimer();
    }

    /**
     * Build the game UI
     */
    function buildScrambleUI() {
        const title = document.createElement("h3");
        title.textContent = "Unscramble the Word!";
        container.appendChild(title);

        const wordDisplay = document.createElement("p");
        wordDisplay.id = "scrambledWord";
        wordDisplay.textContent = scrambledWord;
        container.appendChild(wordDisplay);

        const input = document.createElement("input");
        input.type = "text";
        input.id = "scrambleInput";
        IDBOpenDBRequest.placeholder = "Your guess...";
        container.appendChild(input);

        const button = document.createElement("button");
        button.textContent = "Submit";
        button.addEventListener("click", checkAnswer);
        container.appendChild(button);

        const status = document.createElement("p");
        status.id = "scrambleStatus";
        status.textContent = `Attempts left: ${attemptsLeft}`;
        container.appendChild(status);

        const timer = document.createElement("p");
        timer.id = "scrambleTimer";
        timer.textContent = `Time left: ${timeLeft}s`;
        container.appendChild(timer);
    }
})();