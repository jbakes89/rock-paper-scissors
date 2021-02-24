export class RPSViewController {
    /* Init */
    constructor() {

    }

    updateEndpointCounter(endCondition) {
        // Consider making ViewController, binding endpointCounter as property.
        const endpointCounterSpan = document.querySelector(".js-endpoint-counter");
        switch (endCondition) {
            case END_CONDITION.FirstTo:
                endpointCounterSpan.textContent = " wins.";
                break;
            case END_CONDITION.BestOf:
                endpointCounterSpan.textContent = " rounds.";
                break;
            default:
                console.log(`Invalid end condition: ${endCondition}`);
        }
    }
}