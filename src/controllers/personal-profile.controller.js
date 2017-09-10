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