const storyData = {
    start: {
        text: "After waking up in a dark room, you find yourself in a mysterioius dungeon. There's a strange inscription on the wall, you must find a way to escape!",
        options: [
            { text: "Enter the room", next: "room1" }
        ]
    },

    room1: {
        text: "A locked door blocks your way. Solve the puzzle to unlock it.",
        puzzle: "hangman",
        success: "room2",
        failure: "hangmanFail"
    },
    
    hangmanFail: {
        text: "The puzzle got the best of you. You feel weak and lose a life. Try again while you still can!",
        options: [
            { text: "Try again", next: "room1" }
        ]
    },

    room2: {
        text: "The door unlocks and you advance into a chamber filled with floating rocks.",
        puzzle: "memory",
        success: "room3",
        failure: "memoryFail"
    },

    memoryFail: {
        text: "The rocks suddenly fall, you feel you strength fading. You lose a life. Try again if you want to escape!",
        options: [
            { text: "Try again", next: "room2"}
        ]
    },

    room3: {
        text: 'A strange presence fills the room and you see a white glove "Beat me in a game of rock, paper, scissors to escape!" it whispers.',
        puzzle: "rps",
        success: "room4",
        failure: "rpsFail"
    },

    rpsFail: {
        text: '"HAHA WRONG! You do not really wanna escape, do you?" the glove laughs. You feel your strength fading and lose a life.',
        options: [
            { text: "Challenge the glove again", next: "room3" }
        ]
    },

    room4: {
        text: "After defeating the glove, you make it to the next room. A final puzzle stands in the way of your escape.",
        puzzle: "scramble",
        success: "escape",
        failure: "scrambleFail"
    },

    scrambleFail: {
        text: "You have fumbled the symbols. You are getting weaker. Try again before the time runs out!",
        options: [
            { text: "Retry", next: "room4" }
        ]
    },

    escape: {
        text: "The dungeon doors creak open and you can see the light. You are free! Congratulations!",
        options: [
            { text: "Play Again", next: "start", action: () => { playerLives = 5; updateLivesDisplay(); } }
        ]
    },

    gameOver: {
        text: "You collapse from exhaustion. The dungeon has claimed another victim. Game Over!",
        options: [
            { text: "Restart", next: "start", action: () => { playerLives = 5; updateLivesDisplay(); } }
        ]
    },
}