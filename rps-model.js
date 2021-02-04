/* Enums */
const GAME_STATE = {"Dormant": 1, "Started": 2};
const END_CONDITION = {
    "BestOf": {asString: "Best of"},
    "FirstTo": {asString: "First to"}
};
const ROUND_OUTCOME = {"Draw": "Draw", "Win": "Win", "Lose": "Lose"};


/* Public Properties */
export let currentRound;
export let gameState;
export let score = {"playerScore": 0, "computerScore": 0};

/* Private Properties */
let endCondition;
let endpoint;

/* Public Core Methods */
export function playRoundWithInput (playerInput) {
    let computerInput = getComputerInput();
    console.log(`${playerInput} vs. ${computerInput}`);

    // Initialize results variable (default = draw)
    let result = ROUND_OUTCOME.Draw;

    // If not a draw
    if (playerInput != computerInput) {
        switch (playerInput) {
            case "Rock":
                result = computerInput === "Scissors" ? ROUND_OUTCOME.Win : ROUND_OUTCOME.Lose;
                break;
            case "Paper":
                result = computerInput === "Rock" ? ROUND_OUTCOME.Win : ROUND_OUTCOME.Lose;
                break;
            case "Scissors":
                result = computerInput === "Paper" ? ROUND_OUTCOME.Win : ROUND_OUTCOME.Lose;
                break;
            default:
                console.log(`Invalid player input: ${playerInput}`);
        }
    }

    currentRound += 1;

    updateScore(result);
    return result;
}


/* Public Helper Methods */
export function incrementRound () {
    currentRound += 1;
}

export function isStarted () {
    return gameState === GAME_STATE.Started;
}

export function start (endConditionParameter = END_CONDITION.FirstTo, endpointParameter = 5) {
    if (endpoint < 1) {
        console.log(`Invalid endpoint: ${endpoint}`)
        return;
    }
    endCondition = endConditionParameter;
    endpoint = endpointParameter;
    currentRound = 1;

    console.log(`Starting game. ${endCondition.asString} ${endpoint} ${endCondition === END_CONDITION.BestOf ? "rounds" : "wins"}`);
    gameState = GAME_STATE.Started;
}

export function end () {
    gameState = GAME_STATE.Dormant;
}

export function meetsEndCondition () {
    console.log(`Checking end condition: ${endCondition.asString}. Endpoint is ${endpoint}.`)
    switch (endCondition) {
        case END_CONDITION.BestOf:
            return currentRound > endpoint;
        case END_CONDITION.FirstTo:
            return (score.playerScore >= endpoint) || (score.computerScore >= endpoint);
    }
}


/* Private Methods */
function getComputerInput () {
    return ["Rock", "Paper", "Scissors"][Math.floor(Math.random() * 3)];
}

function updateScore (result) {
    switch (result) {
        case ROUND_OUTCOME.Win:
            score.playerScore += 1;
            break;
        case ROUND_OUTCOME.Lose:
            score.computerScore += 1;
            break;
        case ROUND_OUTCOME.Draw:
            break;
        default:
            console.log(`Invalid round outcome: ${result}`);
    }
}