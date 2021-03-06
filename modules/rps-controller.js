/* Imports */
import { RPSGame, END_CONDITION, ROUND_OUTCOME } from '/modules/rps-model.js';
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
        this.#startGame();
    }


    /* UI Actions */
    // pressStart(event) {
    //     const nav = document.querySelector(".js-start-screen");
    //     nav.classList.add('is-faded-out');
    
    //     this.#startGame();
    // }
    
    pressRpsButton(event) {
        const pressedButton = event.target;
        const buttonId = pressedButton.dataset.choice;
    
        if (this.#game.isStarted()) {
            this.#playRound(capitalize(buttonId));
        }
    }

    pressRestart(event) {
        console.log("Restarting...");
        this.#startGame();
    }

    changeEndCondition(event) {
        const endConditionSelector = event.target;
        this.#endCondition = this.#getEndConditionFromHTML(endConditionSelector.value);

        this.#viewController.updateEndpointCounter(this.#endCondition);

        console.log(`End condition has been set to ${this.#endCondition.asString}. Restarting...`);
        this.#startGame();
    }

    changeEndpoint(event) {
        const endpointInput = event.target;
        this.#endpoint = endpointInput.value;

        // this.#viewController.updateEndpointCounter(this.#endpoint);

        console.log(`Endpoint has been set to ${this.#endpoint}. Restarting...`);
        this.#startGame()
    }

    
    /* Private Core Methods */
    #startGame() {
        this.#game = new RPSGame(this.#endCondition, this.#endpoint);
        this.#viewController.resetCommentary();
        this.#viewController.clearGameOutcomeAnimation();
        this.#viewController.updateScore(this.#game.score.playerScore, this.#game.score.computerScore);
    }

    #playRound(buttonId) {
        this.#updateRoundResult(this.#game.playRoundWithInput(buttonId));
    
        if (this.#game.meetsEndCondition()) {
            console.log(`Game over.`);
            const gameOutcome = this.#game.getGameOutcome();
            this.#displayGameResult(gameOutcome);
            this.#viewController.playGameOutcomeAnimation(gameOutcome.toLowerCase());
            this.#game.end();
        }
    }


    /* Private Helper Methods */
    #updateRoundResult(result) {
        this.#viewController.updateScore(this.#game.score.playerScore, this.#game.score.computerScore);
        let commentaryString = `R${result.roundNumber}: Your ${result.playerInput} ${
            {
                [ROUND_OUTCOME.Win]: `beats`,
                [ROUND_OUTCOME.Draw]: `ties with`,
                [ROUND_OUTCOME.Lose]: `loses to`
            }[result.outcome]
        } computer's ${result.computerInput}`;
        this.#viewController.addCommentary(commentaryString);
        console.log(`You ${result}`);
        console.log(`The score is Player ${this.#game.score.playerScore} - ${this.#game.score.computerScore} CPU`);
        this.#viewController.playRoundOutcomeAnimation(result.outcome.toLowerCase());
    }
    
    #displayGameResult(gameOutcome) {
        this.#viewController.addCommentary('Game over.');
        if (gameOutcome == ROUND_OUTCOME.Win) {
            this.#viewController.addCommentary(`Congratulations, you WON!`);
        } else if (gameOutcome == ROUND_OUTCOME.Lose) {
            this.#viewController.addCommentary(`Comiserations, you LOST.`);
        } else {
            this.#viewController.addCommentary(`Oh, a DRAW... How boring.`);
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

        // const startButton = document.querySelector(".js-start-button");
        // startButton.addEventListener("click", (e) => {controller.pressStart(e)});

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

        // Prevent form submitting on 'Enter' press
        const optionsForm = document.querySelector(".js-options-form");
        optionsForm.addEventListener("submit", (e) => {e.preventDefault()});
    }
}


/* Utility functions */
function capitalize (s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}