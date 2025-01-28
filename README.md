- Memory Game

This project is a simple browser-based memory game where players flip cards to find matching pairs. It demonstrates the use of JavaScript, HTML, and CSS to create an interactive and fun game.

- Features:

Players can enter their name, which is displayed during the game. If no name is entered, the default name "Unknown" is used.

A grid of cards is shuffled and displayed. Players click on cards to flip them and find matching pairs.

Matching pairs remain revealed, while non-matching pairs flip back after a delay.

The game keeps track of the number of tries.

Audio feedback is provided for successful matches and failed attempts.

File Overview

- HTML

Contains the structure of the game, including:

A control screen with a button to start the game.

A grid container (.memory-game-blocks) with card blocks.

A section to display the player's name and the number of tries.

- CSS

Defines the visual styling of the game, including:

Card animations.

Layout of the game grid.

Styling for flipped and matched cards.

- JavaScript

The logic of the game is implemented in JavaScript:

-- Key Components

-- Start Game and Name Prompt

-- Prompts the player to enter their name.

-- Updates the displayed name or sets it to "Unknown" if left blank.

-- Removes the control screen after starting the game.

document.querySelector(".control-buttons span").onclick = function() {
    let yourName = prompt("What is your name?");
    document.querySelector(".name span").innerHTML = yourName || "Unknown";
    document.querySelector(".control-buttons").remove();
};

-- Shuffle Function

Randomizes the order of the cards at the start of the game.

function shuffle(array) {
    let current = array.length, temp, random;
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array;
}

-- Flip Cards

Adds an is-flipped class to a card when clicked.

Keeps track of flipped cards and checks for matches when two cards are flipped.

function flipBlock(selectedBlock) {
    selectedBlock.classList.add("is-flipped");
    let allFlippedBlocks = blocks.filter(block => block.classList.contains("is-flipped"));
    if (allFlippedBlocks.length === 2) {
        stopClicking();
        checkMatchBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

-- Check Matches

Compares two flipped cards to determine if they match.

If they match, the has-match class is added.

If they don’t match, the cards flip back after a delay.

Updates the number of tries and plays audio feedback.

function checkMatchBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector('.tries span');
    if (firstBlock.dataset.cards === secondBlock.dataset.cards) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
        document.getElementById('success').play();
    } else {
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        document.getElementById('fail').play();
    }
}

-- Stop Clicking Temporarily

Prevents players from clicking on other cards while two cards are being compared.

function stopClicking() {
    blocksContainer.classList.add('no-clicking');
    setTimeout(() => {
        blocksContainer.classList.remove('no-clicking');
    }, duration);
}

- How to Run the Game

Clone or download the project files.

Open the HTML file in a browser.

Enter your name in the prompt to start the game.

Click on cards to flip them and find matching pairs.

- Dependencies

The game requires a browser that supports modern JavaScript (ES6+).

Audio files (success and fail) should be included in the project directory.

- Future Enhancements

Add difficulty levels (e.g., different grid sizes).

Implement a timer to track how long it takes to complete the game.

Add a leaderboard to save player scores.

Enhance animations and visual effects for better gameplay experience.

Enjoy playing the Memory Game!

