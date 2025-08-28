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

    
})();