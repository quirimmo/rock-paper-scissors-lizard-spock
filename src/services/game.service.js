(function() {
    'use strict';

    angular.module('myApp').service('gameService', distanceService);

    function distanceService(sessionStorage) {

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
            return sessionStorage.numOfMatches;
        }

        function getNumOfVictories() {
            return sessionStorage.numOfVictories;
        }

        function getNumOfLoses() {
            return sessionStorage.numOfLoses;
        }

        function getNumOfDraws() {
            return sessionStorage.numOfDraws;
        }

        function getNumOfConsecutiveVictories() {
            return sessionStorage.numOfConsecutiveVictories;
        }

        function getNumOfConsecutiveLoses() {
            return sessionStorage.numOfConsecutiveLoses;
        }

        function getNumOfConsecutiveDraws() {
            return sessionStorage.numOfConsecutiveDraws;
        }

        function incrementNumOfMatches() {
            sessionStorage.numOfMatches++;
        }

        function incrementNumOfVictories() {
            sessionStorage.numOfVictories++;
        }

        function incrementNumOfLoses() {
            sessionStorage.numOfLoses++;
        }

        function incrementNumOfDraws() {
            sessionStorage.numOfDraws++;
        }

        function incrementNumOfConsecutiveVictories() {
            sessionStorage.numOfConsecutiveVictories++;
        }

        function incrementNumOfConsecutiveLoses() {
            sessionStorage.numOfConsecutiveLoses++;
        }

        function incrementNumOfConsecutiveDraws() {
            sessionStorage.numOfConsecutiveDraws++;
        }

    }
})();