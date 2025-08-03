/* DOM elements */

const startButton = document.getElementById("startButton");
const startScreen = document.getElementById("startScreen");
const gameContainer = document.getElementById("escapeDungeonContainer");
const storyText = document.getElementById("storyDialogue");
const optionsContainer = document.getElementById("storyOptions");
const puzzleContainer = document.getElementById("puzzleGameContainer");

/* Hides the start screen and shows the game */
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
        showStory(option.next);
      });
      optionsContainer.appendChild(button);
    });

    /* Launches puzzle game if chosen option */
    if (story.puzzle) {
      launchPuzzle(story.puzzle);
    }

  } catch (error) {
    // If an error occurs, display an error message in the story text.
    storyText.textContent = "Oops! Something went wrong in the story.";
    console.error(error); // Log the error to the console for debugging.
  }
}

/* Function to launch the puzzle game */
function launchPuzzle(puzzleType) {
  try {
    switch (puzzleType) {
      case "hangman":
        startHangman(); /* Starts the Hangman game hangman.js */
        break;
      case "memory":
        startMemory(); /* Starts the Memory game memory.js */
        break;
      case "rps":
        startRPS(); /* Starts the Rock-Paper-Scissors game rps.js */
        break;
      case "scramble":
        startScramble(); /* Starts the Scramble game scramble.js */
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