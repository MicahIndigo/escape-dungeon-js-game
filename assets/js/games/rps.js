/* Rock-Paper-Scissors Game Implementation */
(() => {
    "use strict";
    
    /* Private Game state (no global collision) */
    let playerScore = 0;
    let computerScore = 0;
    let roundsPlayed = 0;

    /* Private DOM ref (no global collision) */
    const container = document.getElementById("puzzleGameContainer");

    /**
     * Starts Rock-Paper-Scissors game.
     * @param {function} onSuccess - callback for success
     * @param {function} onFail - callback for failure
     */
    function startRPS(onSuccess, onFail) {
        // Store callbacks on window like other puzzles
        window.rpsOnSuccess = onSuccess;
        window.rpsOnFail = onFail;

        // Reset State
        playerScore = 0;
        computerScore = 0;
        roundsPlayed = 0;
        container.innerHTML = '';

        // Build RPS UI
        buildRPSUI();
    }

    /**
     * Build and render the RPS game UI.
     */
    function buildRPSUI() {
        const title = document.createElement('h3');
        title.textContent = 'Rock, Paper, Scissors - Best of 3!';
        container.appendChild(title);

        const status = document.createElement('div');
        status.id = 'rpsStatus';
        status.textContent = "Choose your move:";
        container.appendChild(status);

        // Create choice buttons for RPS
        const choices = ["Rock", "Paper", "Scissors"];
        const buttonContainer = document.createElement('div');
        buttonContainer.className = "rps-buttons";

        choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.textContent = choice;
            btn.className = "rps-btn";
            btn.addEventListener('click', () => handlePlayerChoice(choice));
            buttonContainer.appendChild(btn);
        });

        container.appendChild(buttonContainer);

        // Scoreboard
        const score = document.createElement('p');
        score.id = "rpsScore";
        score.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
        container.appendChild(score);
    }

    /**
     * Handle the player's choice and determine round results.
     * @param {string} playerChoice - Player's selected move.
     */
    function handlePlayerChoice(playerChoice) {
        const computerChoice = getComputerChoice();
        const result = determineWinner(playerChoice, computerChoice);

        roundsPlayed++;

        if (result === "win") {
            playerScore++;
        } else if (result === "lose") {
            computerScore++;
        }

        updateStatus(playerChoice, computerChoice, result);
        updateScore();

        // End condition: best of 3
        if (playerScore === 2 || computerScore === 2 || roundsPlayed === 3) {
            endRPSGame(playerScore > computerScore);
        }
    }

    /**
     * Randomly selects computer's choice.
     * @returns {string} - "Rock", "Paper", or "Scissors"
     */
    function getComputerChoice() {
        const choices = ["Rock", "Paper", "Scissors"];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    /**
     * Determines winner of the round.
     * @param {string} player - Player's move.
     * @param {string} computer - Computer's move.
     * @returns {string} - "win", "lose", or "draw".
     */
    function determineWinner(player, computer) {
        if (player === computer) return "draw";
        if (
            (player === "Rock" && computer === "Scissors") ||
            (player === "Paper" && computer === "Rock") ||
            (player === "Scissors" && computer === "Paper")
        ) {
            return "win";
        }
        return "lose";
    }

    /**
     * Update status message with round results.
     * @param {string} player - Player's move.
     * @param {string} computer - Computer's move.
     * @param {string} result - "win", "lose", or "draw".
     */
    function updateStatus(player, computer, result) {
        const status = document.getElementById('rpsStatus');
        if (!status) return;
        let message = ` You chose ${player}, Computer chose ${computer}. `;
        if (result === "win") {
            message += "You win this round!";
        } else if (result === "lose") {
            message += "You lose this round!";
        } else {
            message += "Its a draw!";
        }
        status.textContent = message;
    }

    /**
     * Update the scoreboard.
     */
    function updateScore() {
        const score = document.getElementById('rpsScore');
        if (score) {
            score.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
        }
    }

    /**
     * End the game and call appropriate callback.
     * @param {boolean} success - Whether player won overall.
     */
    function endRPSGame(success) {
        container.innerHTML = '';
        if (success && typeof window.rpsOnSuccess === 'function') {
            window.rpsOnSuccess();
        } else if (!success && typeof window.rpsOnFail === 'function') {
            window.rpsOnFail();
        }
    }

    // Export start function
    window.startRPS = startRPS;
})();