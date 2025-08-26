/* DOM elements */

const startButton = document.getElementById("startButton");
const startScreen = document.getElementById("startScreen");
const gameContainer = document.getElementById("escapeDungeonContainer");
const storyText = document.getElementById("storyDialogue");
const optionsContainer = document.getElementById("storyOptions");
const puzzleContainer = document.getElementById("puzzleGameContainer");


let playerLives = 5; // Player's lives for the game
/**
 * Updates player lives in UI
 */
function updateLivesDisplay() {
  const livesDisplay = document.getElementById("livesDisplay");
  if (livesDisplay) {
    livesDisplay.textContent = ` ${playerLives}`;
  }
}
updateLivesDisplay();


/**
 * Decreases player life by 1 and checks for game over
 * If lives reach 0, shows game over story
 */
function loseLife() {
  playerLives--;
  updateLivesDisplay();
  if (playerLives <= 0) {
    showStory("gameOver");
  }
}


/* Hides the start screen and starts the game */
startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    gameContainer.style.display = "block";
    showStory("start");
});

/**
 * Displays a story segment based on the provided story key.
 * Handles text, creates option buttons
 * and launches puzzles as needed.
 * Includes error handling for missing story keys or puzzle types.
 * 
 * @param {string} storyKey - The key identifying the story segment to display.
 */
function showStory(storyKey) {
  try {
    const story = storyData[storyKey];

    // If the story key does not exist, throw an error.
    if (!story) {
        throw new Error(`Story key "${storyKey}" not found in storyData.`);
    }

    /* show the story text */
    storyText.innerHTML = story.text;

    /* clear previous options and puzzle content. */
    optionsContainer.innerHTML = "";
    puzzleContainer.innerHTML = "";

    /* Only creates button if story option exists */
    if (story.options && Array.isArray(story.options)) {
      story.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option.text;
        button.addEventListener("click", () => {
          if (option.action) option.action();
          showStory(option.next);
        });
        optionsContainer.appendChild(button);
      });
    }
    
    /* Launches puzzle game if chosen option */
    if (story.puzzle) {
      launchPuzzle(
        story.puzzle,
        () => showStory(story.success), // onSuccess callback
        () => {
          loseLife(); // Decrease player life on failure
          showStory(story.failure); // onFail callback
        }
      );
    }
  } catch (error) {
    // If an error occurs, display an error message in the story text.
    storyText.textContent = "Oops! Something went wrong in the story.";
    console.error(error); // Log the error to the console for debugging.
  }
}

/**
 * Launches the specified puzzle type.
 * Calls onSuccess or onFail callbacks based on puzzle outcome.
 *  
 * @param {string} puzzleType - Type of puzzle to launch ("hangman", "memory")
 * @param {function} onSuccess - Callback when puzzle is solved.
 * @param {function} onFail - Callback when puzzle is failed.
 */
function launchPuzzle(puzzleType, onSuccess, onFail) {
  try {
    switch (puzzleType) {
      case "hangman":
        startHangman(onSuccess, onFail); /* Starts the Hangman game hangman.js */
        break;
      case "memory":
        startMemory(onSuccess, onFail); /* Starts the Memory game memory.js */
      default:
        // If the puzzle type is not recognized, throw an error.
        throw new Error(`Unknown puzzle type: "${puzzleType}"`);
    }
  } catch (error) {
    // If an error occurs, displays an error message in the puzzle container.
    puzzleContainer.innerHTML = `<p class="error">Puzzle failed to load.</p>`;
    console.error(error); // Log the error to the console for debugging.
  }
}