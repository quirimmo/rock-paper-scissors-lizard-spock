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

        let currentConsecutiveVictories = 0;
        let currentConsecutiveLoses = 0;
        let currentConsecutiveDraws = 0;

        // list of the methods implementations
        // ============================================================

        function getNumOfMatches() {
            return $localStorage.numOfMatches || 0;
        }

        function getNumOfVictories() {
            return $localStorage.numOfVictories || 0;
        }

        function getNumOfLoses() {
            return $localStorage.numOfLoses || 0;
        }

        function getNumOfDraws() {
            return $localStorage.numOfDraws || 0;
        }

        function getNumOfConsecutiveVictories() {
            return $localStorage.numOfConsecutiveVictories || 0;
        }

        function getNumOfConsecutiveLoses() {
            return $localStorage.numOfConsecutiveLoses || 0;
        }

        function getNumOfConsecutiveDraws() {
            return $localStorage.numOfConsecutiveDraws || 0;
        }

        function incrementNumOfMatches() {
            $localStorage.numOfMatches = $localStorage.numOfMatches ? $localStorage.numOfMatches + 1 : 1;
        }

        function incrementNumOfVictories() {
            currentConsecutiveVictories++;
            currentConsecutiveLoses = 0;
            currentConsecutiveDraws = 0;
            $localStorage.numOfVictories = $localStorage.numOfVictories ? $localStorage.numOfVictories + 1 : 1;
            this.incrementNumOfConsecutiveVictories();
        }

        function incrementNumOfLoses() {
            currentConsecutiveVictories = 0;
            currentConsecutiveLoses++;
            currentConsecutiveDraws = 0;
            $localStorage.numOfLoses = $localStorage.numOfLoses ? $localStorage.numOfLoses + 1 : 1;
            this.incrementNumOfConsecutiveLoses();
        }

        function incrementNumOfDraws() {
            currentConsecutiveVictories = 0;
            currentConsecutiveLoses = 0;
            currentConsecutiveDraws++;
            $localStorage.numOfDraws = $localStorage.numOfDraws ? $localStorage.numOfDraws + 1 : 1;
            this.incrementNumOfConsecutiveDraws();
        }

        function incrementNumOfConsecutiveVictories() {
            $localStorage.numOfConsecutiveVictories = currentConsecutiveVictories > this.getNumOfConsecutiveVictories() ? currentConsecutiveVictories : $localStorage.numOfConsecutiveVictories;
        }

        function incrementNumOfConsecutiveLoses() {
            $localStorage.numOfConsecutiveLoses = currentConsecutiveLoses > this.getNumOfConsecutiveLoses() ? currentConsecutiveLoses : $localStorage.numOfConsecutiveLoses;
        }

        function incrementNumOfConsecutiveDraws() {
            $localStorage.numOfConsecutiveDraws = currentConsecutiveDraws > this.getNumOfConsecutiveDraws() ? currentConsecutiveDraws : $localStorage.numOfConsecutiveDraws;
        }

    }
})();