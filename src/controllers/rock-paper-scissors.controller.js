(function() {
    'use strict';

    angular.module('myApp').controller('RockPaperScissorsController', RockPaperScissorsController);

    function RockPaperScissorsController(gameEngineService, $mdBottomSheet, $mdDialog) {

        var vm = this;

        // using the reveal patter defining at the beginning all the used variables inside the view
        vm.isGameStartedDisplayed;
        vm.isMakeYourChoiceDisplayed;
        vm.isComputerChosenIconDisplayed;
        vm.isResultMessageDisplayed;
        vm.availableChoices;
        vm.computerChosenIconSrc;
        vm.chosenAction;
        vm.computerChosenAction;

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
            $mdBottomSheet.show({
                templateUrl: 'src/templates/available-choices-panel.html',
                controller: 'AvailableChoicesPanelController',
                controllerAs: 'vm',
                locals: {
                    availableChoices: vm.availableChoices,
                    chooseAction: chooseAction
                }
            });
        }

        function chooseAction(item) {
            vm.isMakeYourChoiceDisplayed = false;
            vm.chosenAction = item;
            $mdBottomSheet.hide();
            triggerComputerChoice();
        }

        function triggerComputerChoice() {
            vm.computerChosenAction = vm.chosenAction;
        }

        function closeResultMessage() {
            // 
        }

    }
})();