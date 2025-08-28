/*global storyData, startHangman, startMemory, startRPS, startScramble*/
"use strict";

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

/**
 * Decreases player life by 1 and checks for game over.
 * If lives reach 0, shows game over story.
 * @returns {boolean} True if game over, false otherwise.
 */
function loseLife() {
    playerLives--;
    updateLivesDisplay();
    if (playerLives <= 0) {
        showStory("gameOver");
        return true;
    }
    return false;
}

/* Hides the start screen and starts the game */
startButton.addEventListener("click", function () {
    startScreen.style.display = "none";
    gameContainer.style.display = "block";
    showStory("start");
});

/**
 * Displays a story segment based on the provided story key.
 * Handles text, creates option buttons, and launches puzzles as needed.
 * @param {string} storyKey - The key identifying the story segment.
 */
function showStory(storyKey) {
    try {
        const story = storyData[storyKey];

        if (!story) {
            throw new Error("Story key \"" + storyKey + "\" not found in storyData.");
        }

        /* show the story text */
        storyText.innerHTML = story.text;

        /* clear previous options and puzzle content */
        optionsContainer.innerHTML = "";
        puzzleContainer.innerHTML = "";

        /* create buttons for options */
        if (story.options && Array.isArray(story.options)) {
            story.options.forEach(function (option) {
                const button = document.createElement("button");
                button.textContent = option.text;
                button.addEventListener("click", function () {
                    if (option.action) {
                        option.action();
                    }
                    showStory(option.next);
                });
                optionsContainer.appendChild(button);
            });
        }

        /* Launch puzzle if defined */
        if (story.puzzle) {
            launchPuzzle(
                story.puzzle,
                function () {
                    showStory(story.success);
                },
                function () {
                    if (!loseLife()) {
                        showStory(story.failure);
                    }
                }
            );
        }

    } catch (error) {
        storyText.textContent = "Oops! Something went wrong in the story.";
    }
}

/**
 * Launches the specified puzzle type.
 * @param {string} puzzleType - "hangman", "memory", "rps", "scramble"
 * @param {function} onSuccess - Callback for puzzle success.
 * @param {function} onFail - Callback for puzzle failure.
 */
function launchPuzzle(puzzleType, onSuccess, onFail) {
    try {
        switch (puzzleType) {
        case "hangman":
            startHangman(onSuccess, onFail);
            break;
        case "memory":
            startMemory(onSuccess, onFail);
            break;
        case "rps":
            startRPS(onSuccess, onFail);
            break;
        case "scramble":
            startScramble(onSuccess, onFail);
            break;
        default:
            throw new Error("Unknown puzzle type: \"" + puzzleType + "\"");
        }
    } catch (error) {
        puzzleContainer.innerHTML = "<p class='error'>Puzzle failed to load.</p>";
    }
}
