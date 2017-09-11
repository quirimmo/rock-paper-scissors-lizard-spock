(function() {
    'use strict';

    angular.module('myApp').controller('RockPaperScissorsLizardSpockChuckController', RockPaperScissorsLizardSpockChuckController);

    function RockPaperScissorsLizardSpockChuckController(gameEngineService) {

        var vm = this;

        // using the reveal patter defining at the beginning all the used variables inside the view
        vm.gameTitle;
        vm.availableChoices;
        vm.$onInit = onInit;


        // ==========================================================

        function onInit() {
            vm.gameTitle = 'Rock Paper Scissors Lizard Spock Chuck Norris';
            vm.availableChoices = gameEngineService.getRockPaperScissorsLizardSpockChuckSubset();
        }
        
    }
})();