(function() {
    'use strict';

    angular.module('myApp').controller('RockPaperScissorsController', RockPaperScissorsController);

    function RockPaperScissorsController(gameEngineService, $mdBottomSheet, $mdDialog) {

        var vm = this;

        // using the reveal patter defining at the beginning all the used variables inside the view
        vm.isGameStartedDisplayed;
        vm.isMakeYourChoiceDisplayed;
        vm.isChoicesPanelDisplayed;
        vm.isChosenIconDisplayed;
        vm.isComputerChosenIconDisplayed;
        vm.isResultMessageDisplayed;
        vm.availableChoices;
        vm.choseIconSrc;
        vm.computerChosenIconSrc;

        vm.startGame = startGame;
        vm.makeChoice = makeChoice;
        vm.chooseAction = chooseAction;
        vm.closeResultMessage = closeResultMessage;

        // ==========================================================

        function onInit() {
            
        }

        function startGame() {
            
        }

        function makeChoice() {
            
        }

        function chooseAction() {
            
        }

        function closeResultMessage() {
            
        }

    }
})();