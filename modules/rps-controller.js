/* Imports */
import { RPSGame, END_CONDITION } from '/modules/rps-model.js';

export class RPSController {
    /* Private Properties */
    #game;
    #endCondition;
    #endpoint;

    /* Init */
    constructor() {
        this.#bindUIElements()
    }


    /* UI Actions */
    pressPlay(event) {
        const nav = event.target.parentElement;
        nav.classList.add('fade-out');
    
        this.#startGame();
    }
    
    pressRpsButton(event) {
        const pressedButton = event.target;
        const buttonId = pressedButton.id;
    
        if (this.#game.isStarted()) {
            this.#playRound(capitalize(buttonId));
        }
    }

    pressRestart(event) {
        console.log("Restarting...")
        this.#startGame()
    }

    changeEndCondition(event) {
        const endConditionSelector = event.target;
        this.#endCondition = this.#getEndConditionFromHTML(endConditionSelector.value);

        this.#updateEndpointCounter();

        console.log(`End condition has been set to ${this.#endCondition.asString}. Restarting...`);
        this.#startGame();
    }

    changeEndpoint(event) {
        const endpointInput = event.target;
        this.#endpoint = endpointInput.value;

        console.log(`Endpoint has been set to ${this.#endpoint}. Restarting...`);
        this.#startGame()
    }

    
    /* Private Core Methods */
    #startGame() {
        this.#game = new RPSGame(this.#endCondition, this.#endpoint)
    }

    #playRound(buttonId) {
        this.#updateRoundResult(this.#game.playRoundWithInput(buttonId));
    
        if (this.#game.meetsEndCondition()) {
            console.log(`Game over.`);
            this.#displayGameResult();
            this.#game.end();
        }
    }


    /* Private Helper Methods */
    #updateRoundResult(result) {
        console.log(`You ${result}`);
        console.log(`The score is Player ${this.#game.score.playerScore} - ${this.#game.score.computerScore} CPU`);
    }
    
    #displayGameResult() {
        if (this.#game.score.playerScore > this.#game.score.computerScore) {
            console.log(`Congratulations, you WON!`);
        } else if (this.#game.score.playerScore < this.#game.score.computerScore) {
            console.log(`Comiserations, you LOST.`);
        } else {
            console.log(`Oh, a DRAW... How boring.`);
        }
    }

    #getEndConditionFromHTML(value) {
        return {
            "first-to": END_CONDITION.FirstTo,
            "best-of": END_CONDITION.BestOf
        }[value];
    }

    #updateEndpointCounter() {
        const endpointCounterSpan = document.getElementById("endpoint-counter");
        switch (this.#endCondition) {
            case END_CONDITION.FirstTo:
                endpointCounterSpan.textContent = " wins.";
                break;
            case END_CONDITION.BestOf:
                endpointCounterSpan.textContent = " rounds.";
                break;
            default:
                console.log(`Invalid end condition: ${this.#endCondition}`);
        }
    }

    #bindUIElements() {
        const controller = this;

        const playButton = document.querySelector("button.play-button");
        playButton.addEventListener("click", (e) => {controller.pressPlay(e)});

        const rpsButtons = document.querySelectorAll("button.rps-option");
        rpsButtons.forEach((button) => {
            button.addEventListener("click", (e) => {controller.pressRpsButton(e)});
        });

        const restartButton = document.getElementById("restart-button");
        restartButton.addEventListener("click", (e) => {controller.pressRestart(e)});

        const endConditionSelector = document.getElementById("end-condition-selector");
        this.#endCondition = this.#getEndConditionFromHTML(endConditionSelector.value);
        endConditionSelector.addEventListener("change", (e) => {controller.changeEndCondition(e)});

        const endpointInput = document.getElementById("endpoint-input");
        this.#endpoint = endpointInput.value;
        endpointInput.addEventListener("change", (e) => {controller.changeEndpoint(e)});
    }
}


/* Utility functions */
function capitalize (s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}