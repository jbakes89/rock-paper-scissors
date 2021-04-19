import { END_CONDITION } from '/modules/rps-model.js';

export class RPSViewController {

    /* Properties */
    #endpointCounterLabel;
    #gameScoreElement;
    #gameContainer;
    #buttonContainer;
    #statusBox;
    #gameButtons = [];
    #settingsForm;
    #commentaryToggle;
    #settingsToggle;
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
        relativeDiameter: 0.90, // as % of shortest axis of game panel
        startingPositioninDegrees: -30,
        relativeHeight: 0.10 // as % of circular container diameter
    }

    /* Init */
    constructor() {
        this.#bindUI();
    }

    toggleCommentary(event) {
        this.#commentaryList.style.display = this.#commentaryList.style.display == "none" ? "inline" : "none";
        event.target.classList.toggle("--js-toggle-off");
    }

    toggleSettings(event) {
        this.#settingsForm.style.display = this.#settingsForm.style.display == "none" ? "inline" : "none";
        event.target.classList.toggle("--js-toggle-off");
    }


    updateUI() {
        this.#repositionButtons();
        this.#resizeStatusBox();
    }


    updateEndpointCounter(endCondition) {
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
        const newCommentaryElement = this.#commentaryList.children[0].cloneNode(true);
        newCommentaryElement.textContent = message;
        if (line === undefined || line >= this.#commentaryList.children.length) {
            this.#commentaryList.appendChild(newCommentaryElement)
        } else {
            this.#commentaryList.insertBefore(newCommentaryElement, this.#commentaryList.children[line])
        }
    }

    resetCommentary() {
        while (this.#commentaryList.children.length > 1) {
            this.#commentaryList.removeChild(this.#commentaryList.lastChild);
        }
    }

    playOutcomeAnimation(outcome) {
        for (const cl of ["win-round", "lose-round", "draw-round"]) {
            this.#buttonContainer.classList.remove(cl);
        }
        void this.#buttonContainer.offsetWidth;
        this.#buttonContainer.classList.add(`${outcome}-round`);
    }

    #repositionButtons() {
        const minorAxisLength = Math.min(this.#gameContainer.offsetHeight, this.#gameContainer.offsetWidth);
        const buttonContainerWidth = this.#BUTTON_LAYOUT.relativeDiameter * minorAxisLength;

        this.#buttonContainer.style.height = `${buttonContainerWidth}px`;
        this.#buttonContainer.style.width = `${buttonContainerWidth}px`;

        let centerOfButtonContainer, buttonContainerRadius;
        centerOfButtonContainer = buttonContainerRadius = (this.#buttonContainer.offsetHeight * 0.5);

        const buttonIntervalInDegrees = 360/this.#gameButtons.length;

        for (let i = 0; i<this.#gameButtons.length; i++) {
            const button = this.#gameButtons[i];

            // Resize box
            const buttonHeight = button.style.width = buttonContainerRadius * 2 * this.#BUTTON_LAYOUT.relativeHeight;
            button.style.height = button.style.width = `${buttonHeight}px`;

            // Reposition box
            const angleInRadians = (this.#BUTTON_LAYOUT.startingPositioninDegrees + (i * buttonIntervalInDegrees)) * Math.PI/180;

            const x = centerOfButtonContainer + (Math.sin(angleInRadians) * buttonContainerRadius) - (button.offsetWidth * 0.5);
            const y = centerOfButtonContainer - (Math.cos(angleInRadians) * buttonContainerRadius) - (button.offsetHeight * 0.5);

            button.style.left = `${x}px`;
            button.style.top = `${y}px`;
        }
    }

    #resizeStatusBox() {
        const circleRadius = this.#buttonContainer.offsetHeight * 0.5;
        const squareHeight = Math.sqrt(2 * circleRadius * circleRadius);

        this.#statusBox.style.height = `${squareHeight}px`;
        this.#statusBox.style.width = `${squareHeight}px`;
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

        // this.#commentaryList = document.querySelector(".js-commentary-table");

        this.#gameButtons = document.querySelectorAll(".js-game-button");
        
        this.#gameContainer = document.querySelector(".js-game-container");
        this.#buttonContainer = document.querySelector(".js-button-container");

        this.#statusBox = document.querySelector(".js-status-box");

        this.#settingsForm = document.querySelector(".js-options-form");

        this.#commentaryToggle = document.querySelector(".js-commentary-toggle");
        this.#commentaryToggle.addEventListener("click", (e) => {viewController.toggleCommentary(e)});
        this.#settingsToggle = document.querySelector(".js-settings-toggle");
        this.#settingsToggle.addEventListener("click", (e) => {viewController.toggleSettings(e)});

        window.addEventListener("resize", (e) => viewController.updateUI(e));
        this.updateUI();
    }
}