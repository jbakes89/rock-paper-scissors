/* Imports */
import * as model from '/rps-model.js';

/* Core functions */
function startGame (event) {
    const nav = event.target.parentElement;
    nav.classList.add('fade-out');

    model.start();
    // Wait for user input
}

function pressRpsButton (event) {
    const pressedButton = event.target;
    const buttonId = pressedButton.id;

    if (model.isStarted()) {
        playRound(capitalize(buttonId));
    }
}

function playRound (buttonId) {
    model.incrementRound();
    console.log(`Starting round ${model.currentRound} (${model.numRounds - model.currentRound} rounds left)`);
    let roundResult = model.processInput(buttonId);
    displayRoundResult(roundResult);

    if (model.currentRound >= model.numRounds) {
        console.log(`Game over.`);
        displayGameResult();
        model.end();
    }
}

/* Helper Functions */
function displayRoundResult (result) {
    console.log(`You ${result}`);
    console.log(`The score is Player ${model.score.playerScore} - ${model.score.computerScore} CPU`);
}

function displayGameResult () {
    if (model.score.playerScore > model.score.computerScore) {
        console.log(`Congratulations, you WON!`);
    } else if (model.score.playerScore < model.score.computerScore) {
        console.log(`Comiserations, you LOST.`);
    } else {
        console.log(`Oh, a DRAW... How boring.`);
    }
}

/* Utility functions */
function capitalize (s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}


/* Main */
const playButton = document.querySelector("button.play-button");
playButton.addEventListener("click", startGame);

const rpsButtons = document.querySelectorAll("button.rps-option");
rpsButtons.forEach((button) => {
    button.addEventListener("click", pressRpsButton);
});