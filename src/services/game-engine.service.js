(function() {
    'use strict';

    angular.module('myApp').service('gameEngineService', gameEngineService);

    function gameEngineService(GAME_CONSTANTS) {

        // list of the exposed methods
        // ============================================================
        this.getRockPaperScissorsSubset = getRockPaperScissorsSubset;
        this.getRockPaperScissorsLizardSpockSubset = getRockPaperScissorsLizardSpockSubset;
        this.getRockPaperScissorsLizardSpockChuckSubset = getRockPaperScissorsLizardSpockChuckSubset;
        this.calculateResult = calculateResult;
        this.getWinText = getWinText;
        this.getLoseText = getLoseText;
        this.getComputerRandomChoice = getComputerRandomChoice;
        

        const DRAW_TEXT = 'draw';
        const DRAW_RESULT_OBJECT = {
            result: 0,
            text: DRAW_TEXT
        };

        // list of the methods implementations
        // ============================================================

        function getRockPaperScissorsSubset() {
            return GAME_CONSTANTS.actions.filter(isRockPaperScissors);
        }

        function getRockPaperScissorsLizardSpockSubset() {
            return GAME_CONSTANTS.actions.filter(isRockPaperScissorsLizardSpock);
        }

        function getRockPaperScissorsLizardSpockChuckSubset() {
            return GAME_CONSTANTS.actions.filter(isRockPaperScissorsLizardSpockChuck);
        }

        function calculateResult(item1, item2) {
            if (!areInputsCorrect(item1, item2)) {
                return DRAW_RESULT_OBJECT;
            }
            // if item1 won
            if (hasWon(item1, item2)) {
                return {
                    result: 1,
                    text: this.getWinText(item1, item2)
                };
            }
            // else if item1 lost
            else if (hasLost(item1, item2)) {
                return {
                    result: -1,
                    text: this.getLoseText(item1, item2)
                };
            }
            else {
                return DRAW_RESULT_OBJECT;
            }
        }

        function getWinText(item1, item2) {
            if (!areInputsCorrect(item1, item2)) {
                return '';
            }
            let item1Label = item1.label;
            let item2Label = item2.label;
            let winsAgainstRef = item1.winsAgainst.find(element => element.id === item2.id);
            return `${item1Label} ${winsAgainstRef.term} ${item2Label}`;
        }

        function getLoseText(item1, item2) {
            if (!areInputsCorrect(item1, item2)) {
                return '';
            }
            let item1Label = item1.label;
            let item2Label = item2.label;
            let losesAgainstRef = item1.losesAgainst.find(element => element.id === item2.id);
            return `${item1Label} has been ${losesAgainstRef.term} by ${item2Label}`;
        }

        function getComputerRandomChoice(gameActions) {
            if (angular.isUndefined(gameActions) || angular.isUndefined(gameActions.length)) {
                return undefined;
            }
            let randomValue = +Math.random().toFixed(2);
            let thresholdsList = getThresholds(gameActions);
            let computerChoice = undefined;
            // using some so it will stop when the first condition will be true, 
            // avoiding to cycle for all the array
            thresholdsList.some((element, index) => {
                if (randomValue < element) {
                    computerChoice = gameActions[index]; 
                    return true;
                }
                return false;
            });
            return computerChoice;
        }

        // private methods
        // ============================================================

        function getThresholds(gameActions) {
            let list = [];
            let unit = 1 / gameActions.length;
            unit = +unit.toFixed(2);
            gameActions.forEach((element, index) => {
                list.push(unit * (index + 1));
            });
            return list;
        }

        function areInputsCorrect(item1, item2) {
            // if given items are not objects, return empty string
            if (!angular.isObject(item1) || !angular.isObject(item1)) {
                return false;
            }
            // if the item1.winsAgainst property is not an array, return empty string
            if (angular.isUndefined(item1.winsAgainst) || angular.isUndefined(item1.winsAgainst.length)) {
                return false;
            }
            // if the item1.losesAgainst property is not an array, return empty string
            if (angular.isUndefined(item1.losesAgainst) || angular.isUndefined(item1.losesAgainst.length)) {
                return false;
            }
            return true;
        }

        function isRockPaperScissors(element) {
            return element.id === 'rock' || element.id === 'paper' || element.id === 'scissors';
        }

        function isRockPaperScissorsLizardSpock(element) {
            // here we could simply use the following, but this will make the code not easy to increase, because if you add new elements,
            // for a new game, also the rock paper scissors lizard spock game will break 
            // return element.id !== 'chuck';
            return isRockPaperScissors(element) || element.id === 'lizard' || element.id === 'spock';
        }

        function isRockPaperScissorsLizardSpockChuck(element) {
            // here we could simply use the following, but this will make the code not easy to increase, because if you add new elements,
            // for a new game, also the rock paper scissors lizard spock chuck game will break 
            // return GAME_CONSTANTS.actions;
            return isRockPaperScissorsLizardSpock(element) || element.id === 'chuck';
        }

        function hasWon(item1, item2) {
            return !!item1.winsAgainst.find(element => element.id === item2.id);
        }

        function hasLost(item1, item2) {
            return !!item1.losesAgainst.find(element => element.id === item2.id);
        }

    }
})();