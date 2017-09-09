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

        function calculateResult() {
            
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
        
        // private methods
        // ============================================================

        function areInputsCorrect(item1, item2) {
            // if given items are not objects, return empty string
            if (!angular.isObject(item1) || !angular.isObject(item1)) {
                return false;
            }
            // if the item1.winsAgainst property is not an array, return empty string
            if (angular.isUndefined(item1.winsAgainst) || angular.isUndefined(item1.winsAgainst.length)) {
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
            return isRockPaperScissors(element) || element.id === 'lizard'  || element.id === 'spock';
        }

        function isRockPaperScissorsLizardSpockChuck(element) {
            // here we could simply use the following, but this will make the code not easy to increase, because if you add new elements,
            // for a new game, also the rock paper scissors lizard spock chuck game will break 
            // return GAME_CONSTANTS.actions;
            return isRockPaperScissorsLizardSpock(element) || element.id === 'chuck';
        }

    }
})();