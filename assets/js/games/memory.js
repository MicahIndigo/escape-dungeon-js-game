/* Memory Game implementation */
(() => {

  /* Images array (pairs already included) */
  const memoryImages = ['🗝️', '❤️', '🔒', '🧩', '🗝️', '❤️', '🔒', '🧩'];
  let shuffledCards = [];
  let flippedCards = [];
  let matchedPairs = 0;
  let attemptsLeft = 3;
  let memoryTimer = null;
  let timeRemaining = 45;

  /* Private DOM ref — avoids global collisions */
  const container = document.getElementById("puzzleGameContainer");

  /**
   * Starts the Memory game.
   * @param {function} onSuccess - callback for success
   * @param {function} onFail - callback for failure
   */
  function startMemory(onSuccess, onFail) {
    window.memoryOnSuccess = onSuccess;
    window.memoryOnFail = onFail;
    resetMemoryState();
    buildMemoryUI();
    startMemoryTimer();
  }

  /**
   * Resets the memory game state, including shuffling cards,
   * resetting attempts and timer, and clearing the board.
   */
  function resetMemoryState() {
    shuffledCards = shuffle(memoryImages.slice()); // shuffle a copy
    flippedCards = [];
    matchedPairs = 0;
    attemptsLeft = 3;
    timeRemaining = 45;
    clearInterval(memoryTimer);
    container.innerHTML = '';
  }

  /**
   * Shuffles an array using the Fisher-Yates algorithm.
   * @param {array} array - the array to shuffle.
   * @returns {array} The shuffled array.
   */
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /**
   * Builds the game UI for memory, including the card grid
   * and status display.
   */
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
    status.textContent = `Attempts Left: ${attemptsLeft} | Time Remaining: ${timeRemaining}s`;
    container.appendChild(board);
    container.appendChild(status);
  }

  /**
   * Starts the countdown timer for the memory game.
   * If time runs out, the player loses.
   */
  function startMemoryTimer() {
    memoryTimer = setInterval(() => {
      timeRemaining--;
      updateMemoryStatus();
      if (timeRemaining <= 0) {
        endMemoryGame(false);
      }
    }, 1000);
  }

  /**
   * Handles the logic when a card is clicked.
   * Reveals the card, checks for matches,
   * and deducts attempts if cards do not match.
   * @param {event} e - The click event from the card.
   */
  function handleCardClick(e) {
    const card = e.currentTarget;
    if (card.classList.contains('matched') || flippedCards.includes(card) || flippedCards.length >= 2) return;
    card.textContent = card.dataset.symbol;
    flippedCards.push(card);
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (first.dataset.symbol === second.dataset.symbol) {
        first.classList.add('matched');
        second.classList.add('matched');
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === memoryImages.length / 2) {
          endMemoryGame(true);
        }
      } else {
        attemptsLeft--;
        updateMemoryStatus();
        setTimeout(() => {
          first.textContent = '?';
          second.textContent = '?';
          flippedCards = [];
          if (attemptsLeft <= 0) {
            endMemoryGame(false);
          }
        }, 800);
      }
    }
  }

  /**
   * Updates the status display for attempts left and time remaining.
   */
  function updateMemoryStatus() {
    const status = document.getElementById('memoryStatus');
    if (status) {
      status.textContent = `Attempts Left: ${attemptsLeft} | Time Remaining: ${timeRemaining}s`;
    }
  }

  /**
   * Ends the memory game.
   * Clears the timer, resets the board,
   * and calls the appropriate callback based on success/failure.
   * @param {boolean} success - Whether the player won (true) or lost (false).
   */
  function endMemoryGame(success) {
    clearInterval(memoryTimer);
    container.innerHTML = '';
    if (success && typeof window.memoryOnSuccess === 'function') {
      window.memoryOnSuccess();
    } else if (!success && typeof window.memoryOnFail === 'function') {
      window.memoryOnFail();
    }
  }

  // Export only the start function
  window.startMemory = startMemory;
})();
