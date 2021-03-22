export class RPSViewController {

    /* Properties */
    #endpointCounterLabel;
    #gameScoreElement;
    #gameContainer;
    #buttonContainer;
    #gameButtons = [];
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

    #BUTTON_LAYOUT = {
        relativeDiameter: 0.66, // as % of shortest axis of game panel
        startingPositioninDegrees: 0
    }

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

    resizeWindow(event) {
        this.#repositionButtons();
    }


    #repositionButtons() {
        const minorAxisLength = Math.min(this.#gameContainer.offsetHeight, this.#gameContainer.offsetWidth);
        const buttonContainerWidth = this.#BUTTON_LAYOUT.relativeDiameter * minorAxisLength;

        this.#buttonContainer.style.height = `${buttonContainerWidth}px`;
        this.#buttonContainer.style.width = `${buttonContainerWidth}px`;

        let centerOfButtonContainer, buttonRadius;
        centerOfButtonContainer = buttonRadius = (buttonContainerWidth * 0.5);

        const buttonIntervalInDegrees = 360/this.#gameButtons.length;

        for (let i = 0; i<this.#gameButtons.length; i++) {
            const button = this.#gameButtons[i];

            const angleInRadians = (this.#BUTTON_LAYOUT.startingPositioninDegrees + (i * buttonIntervalInDegrees)) * Math.PI/180;

            const x = centerOfButtonContainer + (Math.sin(angleInRadians) * buttonRadius) - (button.offsetWidth * 0.5);
            const y = centerOfButtonContainer - (Math.cos(angleInRadians) * buttonRadius) - (button.offsetHeight * 0.5);

            button.style.left = `${x}px`;
            button.style.top = `${y}px`;
        }
    }

    #bindUI() {
        const viewController = this;

        this.#endpointCounterLabel = document.querySelector(".js-endpoint-counter");
        
        this.#gameScoreElement = document.querySelector(".js-game-score");
        this.updateScore(0, 0);
        
        this.#commentaryList = document.querySelector(".js-commentary-list");
        if (this.#commentaryList.children.length > 0) {
            this.#commentaryLineClasses = this.#commentaryList.children[0].classList;
        }

        this.#gameButtons = document.querySelectorAll(".js-game-button");
        
        this.#gameContainer = document.querySelector(".js-game-container");
        this.#buttonContainer = document.querySelector(".js-button-container");

        window.addEventListener("resize", (e) => viewController.resizeWindow(e));
        this.resizeWindow();
    }
}