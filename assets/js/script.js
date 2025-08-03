/* DOM elements */

const startButton = document.getElementById("startButton");
const startScreen = document.getElementById("startScreen");
const gameContainer = document.getElementById("escapeDungeonContainer");
const storyText = document.getElementById("storyText");
const optionsContainer = document.getElementById("optionsContainer");
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
    if (!story) {
        throw new Error(`Story key "${storyKey}" not found in storyData.`);
    }

    /* show the story text */
    storyText.innerHTML = story.text;

    /* clear options buttons */
    optionsContainer.innerHTML = "";

    /* clear puzzle game container */
    puzzleContainer.innerHTML = "";

    /* Displays each story option as a button */
    story.options.forEach(option => {
      const button = document.createElement("button");
      button.textContent = option.text;
      button.addEventListener("click", () => {
        showStory(option.next); /* Moves story to the next step */
      });
      optionsContainer.appendChild(button);
    });

    /* Launches puzzle game if chosen option */
    if (story.puzzle) {
      launchPuzzle(story.puzzle);
    }

  } catch (error) {
    storyText.textContent = "Oops! Something went wrong in the story.";
    console.error(error);
  }
}