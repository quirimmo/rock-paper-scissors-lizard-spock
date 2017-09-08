(function() {
    'use strict';

    angular.module('myApp').controller('PersonalProfileController', PersonalProfileController);

    function PersonalProfileController(gameService) {

        var vm = this;

        // using the reveal patter defining at the beginning all the used variables inside the view
        vm.numOfMatches;
        vm.numOfVictories;
        vm.numOfLoses;
        vm.numOfDraws;
        vm.consecutiveNumOfVictories;
        vm.consecutiveNumOfLoses;
        vm.consecutiveNumOfDraws;

        vm.$onInit = onInit;

        function onInit() {
            vm.numOfMatches = gameService.getNumOfMatches() || 0;
            vm.numOfVictories = gameService.getNumOfVictories() || 0;
            vm.numOfLoses = gameService.getNumOfLoses() || 0;
            vm.numOfDraws = gameService.getNumOfDraws() || 0;
            vm.consecutiveNumOfVictories = gameService.getNumOfConsecutiveVictories() || 0;
            vm.consecutiveNumOfLoses = gameService.getNumOfConsecutiveLoses() || 0;
            vm.consecutiveNumOfDraws = gameService.getNumOfConsecutiveDraws() || 0;
        }

    }
})();