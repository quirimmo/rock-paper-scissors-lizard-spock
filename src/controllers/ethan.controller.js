/**
 * Controller associated to the Ethan page
 * It is responsible for assigning two main parameters:
 *  - gameTitle {String} The name of the game to be generated
 *  - availableChoices {Array} An array of the actions to be used for generating this current game instance
 */
(function() {
    'use strict';

    angular.module('myApp').controller('EthanController', EthanController);

    EthanController.$inject = ['gameEngineService'];                    

    function EthanController(gameEngineService) {

        var vm = this;

        // using the reveal patter defining at the beginning all the used variables inside the view
        vm.gameTitle;
        vm.availableChoices;

        vm.$onInit = onInit;

        // ==========================================================

        function onInit() {
            // set the game title
            vm.gameTitle = 'Ethan';
            // retrieve the available choices for this game passing through the gameEngineService.getRockPaperScissorsSubset method
            vm.availableChoices= gameEngineService.getEthanSubset();
        }

    }
})();