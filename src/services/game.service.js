(function() {
    'use strict';

    angular.module('myApp').service('gameService', gameService);

    function gameService($localStorage) {

        // list of the exposed methods
        // ============================================================
        
        this.getNumOfMatches = getNumOfMatches;
        this.getNumOfVictories = getNumOfVictories;
        this.getNumOfLoses = getNumOfLoses;
        this.getNumOfDraws = getNumOfDraws;
        this.getNumOfConsecutiveVictories = getNumOfConsecutiveVictories;
        this.getNumOfConsecutiveLoses = getNumOfConsecutiveLoses;
        this.getNumOfConsecutiveDraws = getNumOfConsecutiveDraws;

        this.incrementNumOfMatches = incrementNumOfMatches;
        this.incrementNumOfVictories = incrementNumOfVictories;
        this.incrementNumOfLoses = incrementNumOfLoses;
        this.incrementNumOfDraws = incrementNumOfDraws;
        this.incrementNumOfConsecutiveVictories = incrementNumOfConsecutiveVictories;
        this.incrementNumOfConsecutiveLoses = incrementNumOfConsecutiveLoses;
        this.incrementNumOfConsecutiveDraws = incrementNumOfConsecutiveDraws;


        // list of the methods implementations
        // ============================================================

        function getNumOfMatches() {
            return $localStorage.numOfMatches;
        }

        function getNumOfVictories() {
            return $localStorage.numOfVictories;
        }

        function getNumOfLoses() {
            return $localStorage.numOfLoses;
        }

        function getNumOfDraws() {
            return $localStorage.numOfDraws;
        }

        function getNumOfConsecutiveVictories() {
            return $localStorage.numOfConsecutiveVictories;
        }

        function getNumOfConsecutiveLoses() {
            return $localStorage.numOfConsecutiveLoses;
        }

        function getNumOfConsecutiveDraws() {
            return $localStorage.numOfConsecutiveDraws;
        }

        function incrementNumOfMatches() {
            $localStorage.numOfMatches++;
        }

        function incrementNumOfVictories() {
            $localStorage.numOfVictories++;
        }

        function incrementNumOfLoses() {
            $localStorage.numOfLoses++;
        }

        function incrementNumOfDraws() {
            $localStorage.numOfDraws++;
        }

        function incrementNumOfConsecutiveVictories() {
            $localStorage.numOfConsecutiveVictories++;
        }

        function incrementNumOfConsecutiveLoses() {
            $localStorage.numOfConsecutiveLoses++;
        }

        function incrementNumOfConsecutiveDraws() {
            $localStorage.numOfConsecutiveDraws++;
        }

    }
})();