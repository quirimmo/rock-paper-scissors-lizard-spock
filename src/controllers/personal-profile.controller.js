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
        vm.numOfConsecutiveVictories;
        vm.numOfConsecutiveLoses;
        vm.numOfConsecutiveDraws;

        vm.$onInit = onInit;

        function onInit() {
            vm.numOfMatches = gameService.getNumOfMatches() || 0;
            vm.numOfVictories = gameService.getNumOfVictories() || 0;
            vm.numOfLoses = gameService.getNumOfLoses() || 0;
            vm.numOfDraws = gameService.getNumOfDraws() || 0;
            vm.numOfConsecutiveVictories = gameService.getNumOfConsecutiveVictories() || 0;
            vm.numOfConsecutiveLoses = gameService.getNumOfConsecutiveLoses() || 0;
            vm.numOfConsecutiveDraws = gameService.getNumOfConsecutiveDraws() || 0;
        }

    }
})();