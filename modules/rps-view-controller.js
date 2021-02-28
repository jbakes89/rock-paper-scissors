export class RPSViewController {

    /* Properties */
    #endpointCounterLabel;
    #gameScoreElement;
    #commentaryLineClasses = [];

    #commentaryList

    #gameScore = {
        playerLabel: "Player",
        computerLabel: "CPU",
        playerScore: 0,
        computerScore: 0,
        asString: function() {
            return `${this.playerLabel} ${this.playerScore} : ${this.computerScore} ${this.computerLabel}`;
        }
    };

    /* Init */
    constructor() {
        this.#bindUI();
    }

    updateEndpointCounter(endCondition) {
        // Consider making ViewController, binding endpointCounter as property.
        switch (endCondition) {
            case END_CONDITION.FirstTo:
                this.#endpointCounterLabel.textContent = " wins.";
                break;
            case END_CONDITION.BestOf:
                this.#endpointCounterLabel.textContent = " rounds.";
                break;
            default:
                console.log(`Invalid end condition: ${endCondition}`);
        }
    }

    updateScore(playerScore, computerScore) {
        this.#gameScore.playerScore = playerScore;
        this.#gameScore.computerScore = computerScore;
        this.#gameScoreElement.textContent = this.#gameScore.asString();
    }

    addCommentary(message, line) {
        const newCommentaryElement = document.createElement("li");
        newCommentaryElement.classList = this.#commentaryLineClasses;
        newCommentaryElement.textContent = message;
        if (line === undefined || line >= this.#commentaryList.children.length) {
            this.#commentaryList.appendChild(newCommentaryElement)
        } else {
            this.#commentaryList.insertBefore(newCommentaryElement, this.#commentaryList.children[line])
        }
    }

    #bindUI() {
        this.#endpointCounterLabel = document.querySelector(".js-endpoint-counter");
        
        this.#gameScoreElement = document.querySelector(".js-game-score");
        this.updateScore(0, 0);
        
        this.#commentaryList = document.querySelector(".js-commentary-list");
        if (this.#commentaryList.children.length > 0) {
            this.#commentaryLineClasses = this.#commentaryList.children[0].classList;
        }
    }
}