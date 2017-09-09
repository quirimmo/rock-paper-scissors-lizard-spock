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
        vm.$onInit = onInit;

        // to remove
        $mdBottomSheet;
        $mdDialog;

        // ==========================================================

        function onInit() {
            vm.isGameStartedDisplayed = true;
            vm.isMakeYourChoiceDisplayed = false;
            vm.isChoicesPanelDisplayed = false;
            vm.isChosenIconDisplayed = false;
            vm.isComputerChosenIconDisplayed = false;
            vm.isResultMessageDisplayed = false;
            vm.chosenIconSrc = undefined;
            vm.computerChosenIconSrc = 'not-chosen-yet';
            vm.availableChoices = gameEngineService.getRockPaperScissorsSubset();
        }

        function startGame() {
            vm.isGameStartedDisplayed = false;
            vm.isMakeYourChoiceDisplayed = true;
            vm.isComputerChosenIconDisplayed = true;
        }

        function makeChoice() {
            vm.isChoicesPanelDisplayed = true;
            $mdBottomSheet.show({
                templateUrl: 'src/templates/available-choices-panel.html'
            });
        }

        function chooseAction() {
            // 
        }

        function closeResultMessage() {
            // 
        }

    }
})();