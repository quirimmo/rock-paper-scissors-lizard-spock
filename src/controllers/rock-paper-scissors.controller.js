(function() {
    'use strict';

    angular.module('myApp').controller('RockPaperScissorsController', RockPaperScissorsController);

    function RockPaperScissorsController(gameEngineService) {

        var vm = this;

        // using the reveal patter defining at the beginning all the used variables inside the view
        vm.gameTitle;
        vm.availableChoices;
        vm.$onInit = onInit;


        // ==========================================================

        function onInit() {
            vm.gameTitle = 'Rock Paper Scissors';
            vm.availableChoices= gameEngineService.getRockPaperScissorsSubset();
        }

    }
})();