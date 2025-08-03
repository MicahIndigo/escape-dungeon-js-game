/* DOM elements */

const startButton = document.getElementById("startButton");
const startScreen = document.getElementById("startScreen");
const gameContainer = document.getElementById("escapeDungeonContainer");
const storyText = document.getElementById("storyDialogue");
const optionsContainer = document.getElementById("storyOptions");
const puzzleContainer = document.getElementById("puzzleGameContainer");

let playerLives = 5; // Player's lives for the game

/* Show lives in UI */

function updateLivesDisplay() {
  const livesDisplay = document.getElementById("livesDisplay");
  if (livesDisplay) {
    livesDisplay.textContent = ` ${playerLives}`;
  }
}

/* function when player loses a life */
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

/* Function to show story based on specific story key */

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

    /* Creates button for each story option */
    story.options.forEach(option => {
      const button = document.createElement("button");
      button.textContent = option.text;

      /*When option is clicked, go the next story step */
      button.addEventListener("click", () => {
        if (option.action) option.action();
        showStory(option.next);
      });
      optionsContainer.appendChild(button);
    });
    
    /* Launches puzzle game if chosen option */
    if (story.puzzle) {
      launchPuzzle(
        story.puzzle,
        storyKey,
        () => {
          loseLife();
          showStory(story.failure);
        }
      );
    }
  } catch (error) {
    // If an error occurs, display an error message in the story text.
    storyText.textContent = "Oops! Something went wrong in the story.";
    console.error(error); // Log the error to the console for debugging.
  }
}

/* Function to launch the puzzle game */
function launchPuzzle(puzzleType, storyKey, onFail) {
  try {
    switch (puzzleType) {
      case "hangman":
        startHangman(
          () => showStory(storyData[storyKey].success), // onSuccess
          onFail
        ); /* Starts the Hangman game hangman.js */
        break;
      case "memory":
        startMemory(
          () => showStory(storyData[storyKey].success),
          onFail
        ); /* Starts the Memory game memory.js */
        break;
      case "rps":
        startRPS(
          () => showStory(storyData[storyKey].success),
          onFail         
        ); /* Starts the Rock-Paper-Scissors game rps.js */
        break;
      case "scramble":
        startScramble(
          () => showStory(storyData[storyKey].success),
          onFail       
        ); /* Starts the Scramble game scramble.js */
        break;
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