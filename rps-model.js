/* Enums */
const GAME_STATE = {"Dormant": 0, "Started": 1};
export const ROUND_OUTCOME = {"Draw": "Draw", "Win": "Win", "Lose": "Lose"};


/* Public Properties */
export let numRounds;
export let currentRound = 0;
export let gameState;
export let score = {"playerScore": 0, "computerScore": 0};

/* Private Properties */


/* Public Core Methods */
export function processInput (playerInput) {
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

    // Declare result of round
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

export function start (gameLengthInRounds = 5) {
    if (gameLengthInRounds < 1) {
        console.log(`Invalid number of rounds: ${gameLengthInRounds}`)
        return;
    }
    console.log(`Starting game with length of ${gameLengthInRounds} rounds`);
    gameState = GAME_STATE.Started;
    numRounds = gameLengthInRounds;
}

export function end () {
    gameState = GAME_STATE.Dormant;
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