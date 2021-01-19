
    /* Enums */
    let roundOutcome = {"Draw": 1, "Win": 2, "Lose": 3};
    let validChoices = ["Rock", "Paper", "Scissors", "R", "P", "S"];

    /* Utility functions */
    function capitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    }


    /* ----- */


    /* Main game loop functions */
    function playRound (playerSelection, computerSelection) {
        // Format strings into Capital case
        // computerSelection should be formatted properly in computerPlay function, but we ensure correct format here in case computerPlay function is changed
        playerSelection = processInput(playerSelection);
        computerSelection = processInput(computerSelection);

        // Declare results variable (default = draw)
        let result = roundOutcome.Draw;

        // If not a draw
        if (playerSelection != computerSelection) {
            // Set results variable depending on player and computer selections
            switch (playerSelection) {
                case "Rock":
                    result = computerSelection === "Scissors" ? roundOutcome.Win : roundOutcome.Lose;
                    break;
                case "Paper":
                    result = computerSelection === "Rock" ? roundOutcome.Win : roundOutcome.Lose;
                    break;
                case "Scissors":
                    result = computerSelection === "Paper" ? roundOutcome.Win : roundOutcome.Lose;
                    break;
                default:
                    alert("You did not enter a valid choice!");
            }
        }

        // Declare result of round
        return {"outcome": result, "message": getRoundResultString(result, playerSelection, computerSelection)};
    }

    function game () {
        // Initialize score
        let score = {"playerScore": 0, "computerScore": 0};
        // round variable stores results of latest round
        let round;
        // Loop through five rounds
        for (let roundNum = 1; roundNum < 6; roundNum++) {
            // Add some flavour to the prompt message
            let leadingMessage = (
                (round ? (round.message + "\n\n") : "") + 
                "Round #" + roundNum +
                " - Current score is " +
                "Player " + score.playerScore + "-" + score.computerScore + " CPU."
                );
            playerSelection = getPlayerInput(leadingMessage);
            // End game if player did not enter valid input
            if (!playerSelection) {
                return undefined;
            } else {
                round = playRound(playerSelection, computerPlay());
                console.log("Round #" + roundNum + "\n" + round.message);
                score = updateScore(score, round.outcome);
            }
        }
        declareWinner(score);
    }


    /* ----- */

    
    /* Helper functions */
    function processInput(inputString) {
        // User can enter "rock", "paper", "scissors", "r, "p", or "s" (all case-insensitive)
        inputString = capitalize(inputString);
        if (!validChoices.includes(inputString)) {
            return undefined;
        } else {
            if (["R", "P", "S"].includes(inputString)) {
                inputString = {"R": "Rock", "P": "Paper", "S": "Scissors"}[inputString];
            }
            return inputString;
        }
    }

    function getPlayerInput(leadingMessage = "") {
        if (leadingMessage) { leadingMessage += "\n" };
        let promptMessage = "Choose your move (Rock, Paper, Scissors)...";
        let attempts = 0;
        let playerSelection = processInput(prompt(leadingMessage + promptMessage));
        while (!playerSelection) {
            playerSelection = processInput(prompt(
                "Not a valid choice!\n" + 
                promptMessage +
                " (Remaining attempts: " + (3 - attempts) + ")"
                ));
            attempts++;
            if (attempts > 2) {
                alert("I don't think you're getting this. Let's try again next time");
                return undefined;
            }
        }
        return playerSelection;
    }

    function computerPlay () {
        return ["Rock", "Paper", "Scissors"][Math.floor(Math.random() * 3)];
    }

    function getRoundResultString (result, playerSelection, computerSelection) {
        if (result == roundOutcome.Lose) {
            return "You lose! " + computerSelection + " beats " + playerSelection + ".";
        } else if (result == roundOutcome.Win) {
            return "You win! " + playerSelection + " beats " + computerSelection + ".";
        } else {
            return "Tie! You both selected " + playerSelection + ". Try again.";
        }
    }

    function updateScore (score, outcome) {
        if (outcome == roundOutcome.Win) {
            score.playerScore++;
        } else if (outcome == roundOutcome.Lose) {
            score.computerScore++;
        }
        return score;
    }

    function declareWinner (score) {
        let message = "";
        let scoreString = "(score: Player " + score.playerScore + "-" + score.computerScore + " Computer)";
        if (score.playerScore > score.computerScore) {
            message = "Congratulations! You won";
        } else if (score.playerScore < score.computerScore) {
            message = "Comiserations! You lost";
        } else {
            message = "How boring... The game ended in a draw";
        }
        console.log(message + " " + scoreString);
    }