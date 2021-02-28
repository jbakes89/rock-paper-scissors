/* Imports */
import { RPSGame, END_CONDITION } from '/modules/rps-model.js';
import { RPSViewController } from '/modules/rps-view-controller.js';

export class RPSController {
    /* Private Properties */
    #game;
    #endCondition;
    #endpoint;
    #viewController;

    /* Init */
    constructor() {
        this.#viewController = new RPSViewController();
        this.#bindHTML()
    }


    /* UI Actions */
    pressStart(event) {
        const nav = document.querySelector(".js-start-screen");
        nav.classList.add('is-faded-out');
    
        this.#startGame();
    }
    
    pressRpsButton(event) {
        const pressedButton = event.target;
        const buttonId = pressedButton.dataset.choice;
    
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

        this.#viewController.updateEndpointCounter();

        console.log(`End condition has been set to ${this.#endCondition.asString}. Restarting...`);
        this.#startGame();
    }

    changeEndpoint(event) {
        const endpointInput = event.target;
        this.#endpoint = endpointInput.value;

        this.#viewController.updateEndpointCounter(this.#endpoint);

        console.log(`Endpoint has been set to ${this.#endpoint}. Restarting...`);
        this.#startGame()
    }

    
    /* Private Core Methods */
    #startGame() {
        this.#game = new RPSGame(this.#endCondition, this.#endpoint);
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
        this.#viewController.updateScore(this.#game.score.playerScore, this.#game.score.computerScore);
        this.#viewController.addCommentary(`You ${result}`);
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

    #bindHTML() {
        const controller = this;

        const startButton = document.querySelector(".js-start-button");
        startButton.addEventListener("click", (e) => {controller.pressStart(e)});

        const rpsButtons = document.querySelectorAll(".js-game-button");
        rpsButtons.forEach((button) => {
            button.addEventListener("click", (e) => {controller.pressRpsButton(e)});
        });

        const restartButton = document.querySelector(".js-restart-button");
        restartButton.addEventListener("click", (e) => {controller.pressRestart(e)});

        const endConditionSelector = document.querySelector(".js-end-condition-selector");
        this.#endCondition = this.#getEndConditionFromHTML(endConditionSelector.value);
        endConditionSelector.addEventListener("change", (e) => {controller.changeEndCondition(e)});

        const endpointInput = document.querySelector(".js-endpoint-input");
        this.#endpoint = endpointInput.value;
        endpointInput.addEventListener("change", (e) => {controller.changeEndpoint(e)});
    }
}


/* Utility functions */
function capitalize (s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}