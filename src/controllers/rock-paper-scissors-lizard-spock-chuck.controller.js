/**
 * Controller associated to the Rock Paper Scissors Lizard Spock Chuck Norris page
 * It is responsible for assigning two main parameters:
 *  - gameTitle {String} The name of the game to be generated
 *  - availableChoices {Array} An array of the actions to be used for generating this current game instance
 */
(function() {
    'use strict';

    angular.module('myApp').controller('RockPaperScissorsLizardSpockChuckController', RockPaperScissorsLizardSpockChuckController);

    RockPaperScissorsLizardSpockChuckController.$inject = ['gameEngineService'];            

    function RockPaperScissorsLizardSpockChuckController(gameEngineService) {

        var vm = this;

        // using the reveal patter defining at the beginning all the used variables inside the view
        vm.gameTitle;
        vm.availableChoices;

        vm.$onInit = onInit;

        // ==========================================================

        function onInit() {
            // set the game title
            vm.gameTitle = 'Rock Paper Scissors Lizard Spock Chuck Norris';
            // retrieve the available choices for this game passing through the gameEngineService.getRockPaperScissorsLizardSpockChuckSubset method
            vm.availableChoices = gameEngineService.getRockPaperScissorsLizardSpockChuckSubset();
        }
        
    }
})();