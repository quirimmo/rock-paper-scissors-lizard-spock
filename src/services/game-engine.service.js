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

        function getWinText() {
            
        }

        function getLoseText() {
            
        }
        
    }
})();