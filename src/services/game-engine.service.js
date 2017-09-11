/**
 * Game Engine Service
 * Services in AngularJS are Singleton objects that you can inject in controller, other services, and so on
 * They are used in order to share code among all the app and to perform all the actions that should not be in the controllers of the views.
 * Controllers of the views must show only the relevant methods/variables associated to the view, and no performing also logic operations independent from the view
 * This service is responsible for: 
 *  - Retrieving all the subsets corresponding to the generated games
 *  - Calculating the result of two actions
 *  - Composing the victory, draw or lose text to be displayed
 *  - Get the computer random choices     
 */
(function() {
    'use strict';

    angular.module('myApp').service('gameEngineService', gameEngineService);

    gameEngineService.$inject = ['GAME_CONSTANTS', 'gameService'];                

    function gameEngineService(GAME_CONSTANTS, gameService) {

        // list of the exposed methods
        // ============================================================

        this.getRockPaperScissorsSubset = getRockPaperScissorsSubset;
        this.getRockPaperScissorsLizardSpockSubset = getRockPaperScissorsLizardSpockSubset;
        this.getRockPaperScissorsLizardSpockChuckSubset = getRockPaperScissorsLizardSpockChuckSubset;
        this.calculateResult = calculateResult;
        this.getWinText = getWinText;
        this.getLoseText = getLoseText;
        this.getComputerRandomChoice = getComputerRandomChoice;

        // list of the private variables used within the service
        // ============================================================
        // constant draw object to be returned as result
        const DRAW_TEXT = 'draw';
        const DRAW_RESULT_OBJECT = {
            result: 0,
            text: DRAW_TEXT
        };

        // list of the methods implementations
        // ============================================================

        /**
         * Return all the choices you have in the Rock Paper Scissors game
         * @returns {Array} An array with all the action objects of the rock paper scissors game 
         */
        function getRockPaperScissorsSubset() {
            // Passing external function in filter Array method
            // I don't love too much inner functions in these methods, even if they are completely allowed
            // They destroy readability of the code, and they cannot be shared in other filter conditions if you need to use the same one again
            return GAME_CONSTANTS.actions.filter(isRockPaperScissors);
        }

        /**
         * Return all the choices you have in the Rock Paper Scissors Lizard Spock game
         * @returns {Array} An array with all the action objects of the rock paper scissors lizard spock game 
         */
        function getRockPaperScissorsLizardSpockSubset() {
            // Passing external function in filter Array method
            // I don't love too much inner functions in these methods, even if they are completely allowed
            // They destroy readability of the code, and they cannot be shared in other filter conditions if you need to use the same one again
            return GAME_CONSTANTS.actions.filter(isRockPaperScissorsLizardSpock);
        }

        function getRockPaperScissorsLizardSpockChuckSubset() {
            // Passing external function in filter Array method
            // I don't love too much inner functions in these methods, even if they are completely allowed
            // They destroy readability of the code, and they cannot be shared in other filter conditions if you need to use the same one again
            return GAME_CONSTANTS.actions.filter(isRockPaperScissorsLizardSpockChuck);
        }

        /**
         * Return the result of the current match, based on the given parameters
         * It calls also the methods used in order to store the scores, if the isGameSimulation is false. We don't want to track personal scores if the game is a simulation
         * Check if the provided inputs are correct
         * Return a result object which represents the result of the two chosen/given actions
         * @param {Object} item1 Action 1 chosen 
         * @param {Object} item2 Action 2 chosen
         * @param {Boolean} [isGameSimulation=false] Optional parameter for specifying if it is a simulated game. By default a not simulated game is considered. With a simulated game, the personal scores will not be tracked
         * @returns {Object} An object which represents the current result. It returns 1 if item1 won, -1 if item2 lost, 0 if draw. It also returns the text representing the current victory, lost or draw based on the given choices
         */
        function calculateResult(item1, item2, isGameSimulation = false) {
            // check if inputs are correct, otherwise returns a draw 
            if (!areInputsCorrect(item1, item2)) {
                return DRAW_RESULT_OBJECT;
            }
            // if it is not game simulation 
            if (!isGameSimulation) {
                // increment the number of matches
                gameService.incrementNumOfMatches();
            }
            // if item1 won
            if (hasWon(item1, item2)) {
                // if is not game simulation
                if (!isGameSimulation) {
                    // increment the number of victories
                    gameService.incrementNumOfVictories();
                }
                // return a result win object with 1 as result and the right win text
                return {
                    result: 1,
                    text: this.getWinText(item1, item2)
                };
            }
            // else if item1 lost
            else if (hasLost(item1, item2)) {
                // if is not game simulation
                if (!isGameSimulation) {
                    // increment the number of loses
                    gameService.incrementNumOfLoses();
                }
                // return a result lost object with -1 as result and the right lost text
                return {
                    result: -1,
                    text: this.getLoseText(item1, item2)
                };
            } else {
                // if is not game simulation
                if (!isGameSimulation) {
                    // increment number of draws
                    gameService.incrementNumOfDraws();
                }
                // return a result draw object defined above as constant, with 0 as result and the draw text
                return DRAW_RESULT_OBJECT;
            }
        }

        /**
         * Given the two actions, compose the win text to be returned reading the parameters of the actions objects
         * @param {Object} item1 Winning action object
         * @param {Object} item2 Losing action object
         * @returns {String} The final win text 
         */
        function getWinText(item1, item2) {
            // if inputs are not correct, return an empty string
            if (!areInputsCorrect(item1, item2)) {
                return '';
            }
            let item1Label = item1.label;
            let item2Label = item2.label;
            // retrieve from the first action object, the loosing second action object in order to access the label and the term defined in the constants where you define all your actions objects
            let winsAgainstRef = item1.winsAgainst.find(element => element.id === item2.id);
            // return a text composed by the winning action label, the winning term and the losing action label
            return `${item1Label} ${winsAgainstRef.term} ${item2Label}`;
        }

        /**
         * Given the two actions, compose the lose text to be returned reading the parameters of the actions objects
         * @param {Object} item1 Losing action object
         * @param {Object} item2 Winning action object
         * @returns {String} The final lose text 
         */
        function getLoseText(item1, item2) {
            // if the inputs are not correct, return an empty string
            if (!areInputsCorrect(item1, item2)) {
                return '';
            }
            let item1Label = item1.label;
            let item2Label = item2.label;
            // retrieve from the first action object, the winning second action object in order to access the label and the term defined in the constants where you define all your actions objects            
            let losesAgainstRef = item1.losesAgainst.find(element => element.id === item2.id);
            // return a text composed by the losing action label, a transitive form "has been by", the losing term and the winning action label            
            return `${item1Label} has been ${losesAgainstRef.term} by ${item2Label}`;
        }

        /**
         * Pick up and return random action from the given actions list provided
         * @param {Array} gameActions Array of action objects to be used for picking up a random choice for the computer 
         * @returns {Object|undefined} The action picked up randomly from the given gameActions. Undefined if some error occurred. 
         */
        function getComputerRandomChoice(gameActions) {
            // return undefined if the input parameter is not correct
            // again using a function for improving readability and maintainability of the code
            if (isComputerRandomActionsListInvalid(gameActions)) {
                return undefined;
            }
            // pick up a random value between 0 and 1, round to two decimal digits and convert that to a number through the + operator
            let randomValue = +Math.random().toFixed(2);
            // retrieve the list of thresholds based on the current given game actions
            let thresholdsList = getThresholds(gameActions);
            // init the computer random choice as undefined
            let computerChoice = undefined;
            // using some so it will stop when the first condition will be true, avoiding to cycle for all the array
            // using again a function avoiding inner functions to improve readability
            thresholdsList.some(onSome);
            return computerChoice;

            function onSome(element, index) {
                // if the generated random value is lower than the current threshold value
                if (randomValue < element) {
                    // set the computer choice to the corresponding action
                    computerChoice = gameActions[index];
                    // return true stopping the loop 
                    return true;
                }
                // return false going on with the loop
                return false;
            }
        }

        // private methods
        // ============================================================

        /**
         * Check if the provided gameActions is a defined array
         * @param {Array} gameActions Array of game action objects
         * @returns {Boolean} If the provided gameActions is invalid
         */
        function isComputerRandomActionsListInvalid(gameActions) {
            return angular.isUndefined(gameActions) || angular.isUndefined(gameActions.length);
        }

        /**
         * Calculate a list of thresholds associated to the provided game actions
         * @param {Array} gameActions List of all the current action objects
         * @returns {Array} List of all the thresholds based on the number of the provided game actions
         */
        function getThresholds(gameActions) {
            // list of thresholds to be returned
            let list = [];
            // considering that Math.random returns elements within the range [0, 1), I calculate the single unit depending on the number of elements of the provided actions list
            // this makes it dynamics and it will work passing how many actions as you want
            let unit = 1 / gameActions.length;
            // round the unit to two decimal digits and cast it to a number through the + operator 
            unit = +unit.toFixed(2);
            // composing the threshold list to be returned
            // avoiding again an inner function
            gameActions.forEach(forEachGameAction);
            return list;

            function forEachGameAction(element, index) {
                // push the current unit multiplied per the index + 1 value, in order to obtain all the valid thresholds for all the elements
                list.push(unit * (index + 1));
            }
        }

        /**
         * Check if the provided actions objects are correct
         * @param {Object} item1 Choice 1 action object
         * @param {any} item2 Choice 2 action object
         * @returns {Boolean} Boolean representing if the provided item action choices are valid
         */
        function areInputsCorrect(item1, item2) {
            // if given items are not objects, return false
            if (!angular.isObject(item1) || !angular.isObject(item2)) {
                return false;
            }
            // if the given items have not winsAgainst property or this property is not an array, return false
            if (angular.isUndefined(item1.winsAgainst) || angular.isUndefined(item1.winsAgainst.length) || 
                angular.isUndefined(item2.winsAgainst) || angular.isUndefined(item2.winsAgainst.length)) {
                return false;
            }
            // if the given items have not winsAgainst property or this property is not an array, return false
            if (angular.isUndefined(item1.losesAgainst) || angular.isUndefined(item1.losesAgainst.length) || 
                angular.isUndefined(item2.losesAgainst) || angular.isUndefined(item2.losesAgainst.length)) {
                return false;
            }
            // otherwise they are valid inputs
            return true;
        }

        /**
         * Check if the given action object is one of the subsets. Used for filtering all the defined actions and retrieving just the expected ones (rock paper scissors)
         * @param {Object} element The action Object
         * @returns {Boolean} A boolean which says if the current element belongs to the current subset
         */
        function isRockPaperScissors(element) {
            return element.id === 'rock' || element.id === 'paper' || element.id === 'scissors';
        }

        /**
         * Check if the given action object is one of the subsets. Used for filtering all the defined actions and retrieving just the expected ones (rock paper scissors lizard spock)
         * @param {Object} element The action Object
         * @returns {Boolean} A boolean which says if the current element belongs to the current subset
         */
        function isRockPaperScissorsLizardSpock(element) {
            // here we could simply use the following condition considering all the current defined actions:
            // return element.id !== 'chuck';
            // Although it's simpler/shorter, this code will break if you will add new actions, making the code not reusable easily and hard to increase, 
            // because if you add new elements for a new game, also the current will break 
            return isRockPaperScissors(element) || element.id === 'lizard' || element.id === 'spock';
        }
        
        /**
         * Check if the given action object is one of the subsets. Used for filtering all the defined actions and retrieving just the expected ones (rock paper scissors lizard spock chuck norris)
         * @param {Object} element The action Object
         * @returns {Boolean} A boolean which says if the current element belongs to the current subset
         */
        function isRockPaperScissorsLizardSpockChuck(element) {
            // here we could simply use the following condition considering all the current defined actions:
            // return GAME_CONSTANTS.actions;
            // Although it's simpler/shorter, this code will break if you will add new actions, making the code not reusable easily and hard to increase, 
            // because if you add new elements for a new game, also the current will break 
            return isRockPaperScissorsLizardSpock(element) || element.id === 'chuck';
        }

        /**
         * Check if the item1 wins against item 2
         * @param {Object} item1 Game action object 
         * @param {Object} item2 Game action object
         * @returns {Boolean} A boolean representing if item1 wins against item2
         */
        function hasWon(item1, item2) {
            // avoiding again inner functions to improve readability and reusability of code
            return !!item1.winsAgainst.find(findActionsById.bind(null, item2));
        }

        /**
         * Check if the item1 loses against item 2
         * @param {Object} item1 Game action object 
         * @param {Object} item2 Game action object
         * @returns {Boolean} A boolean representing if item1 loses against item2
         */
        function hasLost(item1, item2) {
            // avoiding again inner functions to improve readability and reusability of code            
            return !!item1.losesAgainst.find(findActionsById.bind(null, item2));
        }

        /**
         * Functions used for finding the current action object in the list which is equal the provided action object to compare
         * @param {Object} item2 Action object to compare
         * @param {Object} element Current action object of the array
         * @returns {Boolean} Boolean representing if the current element id is equal to the provided element id
         */
        function findActionsById(item2, element) {
            return element.id === item2.id;
        }

    }
})();