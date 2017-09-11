/**
 * Controller associated to the Personal Profile page, responsible for showing all the personal scores achieved so far
 */
(function() {
    'use strict';

    angular.module('myApp').controller('PersonalProfileController', PersonalProfileController);

    PersonalProfileController.$inject = ['gameService'];        

    function PersonalProfileController(gameService) {

        var vm = this;

        // using the reveal patter defining at the beginning all the used variables inside the view
        vm.numOfMatches;
        vm.numOfVictories;
        vm.numOfLoses;
        vm.numOfDraws;
        vm.numOfConsecutiveVictories;
        vm.numOfConsecutiveLoses;
        vm.numOfConsecutiveDraws;

        vm.$onInit = onInit;
        
        // =================================================================================

        /**
         * Init all the values to be shown on the page retrieving the data through the gameService methods
         */
        function onInit() {
            vm.numOfMatches = gameService.getNumOfMatches();
            vm.numOfVictories = gameService.getNumOfVictories();
            vm.numOfLoses = gameService.getNumOfLoses();
            vm.numOfDraws = gameService.getNumOfDraws();
            vm.numOfConsecutiveVictories = gameService.getNumOfConsecutiveVictories();
            vm.numOfConsecutiveLoses = gameService.getNumOfConsecutiveLoses();
            vm.numOfConsecutiveDraws = gameService.getNumOfConsecutiveDraws();
        }

    }
})();