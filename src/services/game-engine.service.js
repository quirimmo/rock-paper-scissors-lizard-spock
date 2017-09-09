(function() {
    'use strict';

    angular.module('myApp').service('gameEngineService', gameEngineService);

    function gameEngineService() {

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

        }

        function getRockPaperScissorsLizardSpockSubset() {
            
        }
        
        function getRockPaperScissorsLizardSpockChuckSubset() {
            
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

    }
})();