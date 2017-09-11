/**
 * Game Service
 * Services in AngularJS are Singleton objects that you can inject in controller, other services, and so on
 * They are used in order to share code among all the app and to perform all the actions that should not be in the controllers of the views.
 * Controllers of the views must show only the relevant methods/variables associated to the view, and no performing also logic operations independent from the view
 * This service is responsible for: 
 *  - Retrieving all the scores information from the local storage
 *  - Storing all the stores information in the local storage
 *  - Managing the logic of consecutive victories, loses and draws
 *  - Restarting the game     
 */
(function() {
    'use strict';

    angular.module('myApp').service('gameService', gameService);

    gameService.$inject = ['$localStorage'];                    

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
        this.restartGame = restartGame;

        // list of private variables used within the service
        // ============================================================

        let currentConsecutiveVictories = 0;
        let currentConsecutiveLoses = 0;
        let currentConsecutiveDraws = 0;

        // list of the methods implementations
        // ============================================================

        /**
         * Get the number of total matches or 0 if not defined yet
         * @returns {Number} Number of total matches 
         */
        function getNumOfMatches() {
            return $localStorage.numOfMatches || 0;
        }

        /**
         * Get the number of total matches or 0 if not defined yet
         * @returns {Number} Number of total victories 
         */
        function getNumOfVictories() {
            return $localStorage.numOfVictories || 0;
        }

        /**
         * Get the number of total loses or 0 if not defined yet
         * @returns {Number} Number of total loses 
         */
        function getNumOfLoses() {
            return $localStorage.numOfLoses || 0;
        }

        /**
         * Get the number of total draws or 0 if not defined yet
         * @returns {Number} Number of total draws 
         */
        function getNumOfDraws() {
            return $localStorage.numOfDraws || 0;
        }

        /**
         * Get the number of consecutive victories or 0 if not defined yet
         * @returns {Number} Number of consecutive victories
         */
        function getNumOfConsecutiveVictories() {
            return $localStorage.numOfConsecutiveVictories || 0;
        }

        /**
         * Get the number of consecutive loses or 0 if not defined yet
         * @returns {Number} Number of consecutive loses
         */
        function getNumOfConsecutiveLoses() {
            return $localStorage.numOfConsecutiveLoses || 0;
        }

        /**
         * Get the number of consecutive draws or 0 if not defined yet
         * @returns {Number} Number of consecutive draws
         */
        function getNumOfConsecutiveDraws() {
            return $localStorage.numOfConsecutiveDraws || 0;
        }

        /**
         * Increment the number of total matches storing them in the local storage
         */
        function incrementNumOfMatches() {
            $localStorage.numOfMatches = $localStorage.numOfMatches ? $localStorage.numOfMatches + 1 : 1;
        }

        /**
         * Increment the number of victories storing them in the local storage
         */
        function incrementNumOfVictories() {
            // increment the current consecutive victories
            currentConsecutiveVictories++;
            // considering you won, reset the number consecutive loses
            currentConsecutiveLoses = 0;
            // considering you won, reset the number consecutive draws            
            currentConsecutiveDraws = 0;
            // store the new num of victories
            $localStorage.numOfVictories = $localStorage.numOfVictories ? $localStorage.numOfVictories + 1 : 1;
            // call the increment num of consecutive victories
            this.incrementNumOfConsecutiveVictories();
        }
        
        /**
         * Increment the number of loses storing them in the local storage
         */
        function incrementNumOfLoses() {
            // increment the current consecutive loses
            currentConsecutiveLoses++;
            // considering you lost, reset the number consecutive victories            
            currentConsecutiveVictories = 0;
            // considering you lost, reset the number consecutive draws
            currentConsecutiveDraws = 0;
            // store the new num of loses
            $localStorage.numOfLoses = $localStorage.numOfLoses ? $localStorage.numOfLoses + 1 : 1;
            // call the increment num of consecutive loses
            this.incrementNumOfConsecutiveLoses();
        }

        /**
         * Increment the number of draws storing them in the local storage
         */
        function incrementNumOfDraws() {
            // increment the current consecutive draws
            currentConsecutiveDraws++;
            // considering you draw, reset the number of consecutive victories
            currentConsecutiveVictories = 0;
            // considering you draw, reset the number of consecutive loses
            currentConsecutiveLoses = 0;
            // store the new num of draws
            $localStorage.numOfDraws = $localStorage.numOfDraws ? $localStorage.numOfDraws + 1 : 1;
            // call the increment num of consecutive draws
            this.incrementNumOfConsecutiveDraws();
        }

        /**
         * Store the new value of consecutive victories it it's greater than the already stored one
         */
        function incrementNumOfConsecutiveVictories() {
            $localStorage.numOfConsecutiveVictories = currentConsecutiveVictories > this.getNumOfConsecutiveVictories() ? currentConsecutiveVictories : $localStorage.numOfConsecutiveVictories;
        }

        /**
         * Store the new value of consecutive loses it it's greater than the already stored one
         */
        function incrementNumOfConsecutiveLoses() {
            $localStorage.numOfConsecutiveLoses = currentConsecutiveLoses > this.getNumOfConsecutiveLoses() ? currentConsecutiveLoses : $localStorage.numOfConsecutiveLoses;
        }

        /**
         * Store the new value of consecutive draws it it's greater than the already stored one
         */
        function incrementNumOfConsecutiveDraws() {
            $localStorage.numOfConsecutiveDraws = currentConsecutiveDraws > this.getNumOfConsecutiveDraws() ? currentConsecutiveDraws : $localStorage.numOfConsecutiveDraws;
        }

        /**
         * Reset all the values stored in the local storage and the variables for counting the consecutive victories, loses and draws
         */
        function restartGame() {
            $localStorage.numOfMatches = 0;
            $localStorage.numOfVictories = 0;
            $localStorage.numOfLoses = 0;
            $localStorage.numOfDraws = 0;
            $localStorage.numOfConsecutiveVictories = 0;
            $localStorage.numOfConsecutiveLoses = 0;
            $localStorage.numOfConsecutiveDraws = 0;
            currentConsecutiveVictories = 0;
            currentConsecutiveLoses = 0;
            currentConsecutiveDraws = 0;
        }

    }
})();