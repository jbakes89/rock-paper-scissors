/* Enums */
const GAME_STATE = {"Dormant": 1, "Started": 2};
export const END_CONDITION = {
    "BestOf": {asString: "Best of"},
    "FirstTo": {asString: "First to"}
};
export const ROUND_OUTCOME = {"Draw": "Draw", "Win": "Win", "Lose": "Lose"};


export class RPSGame {
    /* Public Properties */
    score = {"playerScore": 0, "computerScore": 0};

    /* Private Properties */
    currentRound;
    #gameState;
    #endCondition;
    #endpoint;


    /* Init */
    constructor(endCondition = END_CONDITION.FirstTo, endpoint = 5) {
        if (endpoint < 1) {
            console.log(`Invalid endpoint: ${endpoint}`)
            return;
        }
        this.#endCondition = endCondition;
        this.#endpoint = endpoint;
        this.currentRound = 1;
    
        console.log(`Starting game. ${this.#endCondition.asString} ${this.#endpoint} ${this.#endCondition === END_CONDITION.BestOf ? "rounds" : "wins"}`);
        this.#gameState = GAME_STATE.Started;
    }


    /* Public Core Methods */
    playRoundWithInput(playerInput) {
        console.log(`Starting round ${this.currentRound}`);

        let computerInput = this.#getComputerInput();
        console.log(`${playerInput} vs. ${computerInput}`);
    
        // Initialize results variable (default = draw)
        let result = {
            roundNumber: this.currentRound,
            playerInput: playerInput,
            computerInput: computerInput,
            outcome: ROUND_OUTCOME.Draw
        }
    
        // If not a draw
        if (playerInput != computerInput) {
            switch (playerInput) {
                case "Rock":
                    result.outcome = computerInput === "Scissors" ? ROUND_OUTCOME.Win : ROUND_OUTCOME.Lose;
                    break;
                case "Paper":
                    result.outcome = computerInput === "Rock" ? ROUND_OUTCOME.Win : ROUND_OUTCOME.Lose;
                    break;
                case "Scissors":
                    result.outcome = computerInput === "Paper" ? ROUND_OUTCOME.Win : ROUND_OUTCOME.Lose;
                    break;
                default:
                    console.log(`Invalid player input: ${playerInput}`);
            }
            this.#updateScore(result.outcome);
        }
    
        this.currentRound += 1;   
        return result;
    }


    /* Public Helper Methods */
    incrementRound() {
        this.currentRound += 1;
    }
    
    isStarted() {
        return this.#gameState === GAME_STATE.Started;
    }
    
    end() {
        this.#gameState = GAME_STATE.Dormant;
    }
    
    meetsEndCondition() {
        console.log(`Checking end condition: ${this.#endCondition.asString}. Endpoint is ${this.#endpoint}.`)
        switch (this.#endCondition) {
            case END_CONDITION.BestOf:
                return this.currentRound > this.#endpoint;
            case END_CONDITION.FirstTo:
                return (this.score.playerScore >= this.#endpoint) || (this.score.computerScore >= this.#endpoint);
        }
    }

    getGameOutcome() {
        if (this.score.playerScore > this.score.computerScore) {
            return ROUND_OUTCOME.Win;
        } else if (this.score.playerScore < this.score.computerScore) {
            return ROUND_OUTCOME.Lose;
        } else {
            return ROUND_OUTCOME.Draw;
        }
    }

    /* Private Methods */
    #getComputerInput() {
        return ["Rock", "Paper", "Scissors"][Math.floor(Math.random() * 3)];
    }
    
    #updateScore(result) {
        switch (result) {
            case ROUND_OUTCOME.Win:
                this.score.playerScore += 1;
                break;
            case ROUND_OUTCOME.Lose:
                this.score.computerScore += 1;
                break;
            case ROUND_OUTCOME.Draw:
                break;
            default:
                console.log(`Invalid round outcome: ${result}`);
        }
    }
}