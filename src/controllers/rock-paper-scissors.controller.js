(function() {
    'use strict';

    angular.module('myApp').controller('RockPaperScissorsController', RockPaperScissorsController);

    function RockPaperScissorsController(gameEngineService, $mdBottomSheet, $mdDialog, $document) {

        var vm = this;

        // using the reveal patter defining at the beginning all the used variables inside the view
        vm.isGameStartedDisplayed;
        vm.isMakeYourChoiceDisplayed;
        vm.isComputerChosenIconDisplayed;
        vm.isResultMessageDisplayed;
        vm.availableChoices;
        vm.chosenAction;
        vm.computerChosenAction;
        vm.result;

        vm.startGame = startGame;
        vm.makeChoice = makeChoice;
        vm.chooseAction = chooseAction;
        vm.closeResultMessage = closeResultMessage;
        vm.$onInit = onInit;

        // to remove
        $mdDialog;

        // ==========================================================

        function onInit() {
            vm.isGameStartedDisplayed = true;
            vm.isMakeYourChoiceDisplayed = false;
            vm.isComputerChosenIconDisplayed = false;
            vm.isResultMessageDisplayed = false;
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

        function chooseAction(item, $event) {
            vm.isMakeYourChoiceDisplayed = false;
            vm.chosenAction = item;
            $mdBottomSheet.hide();
            vm.computerChosenAction = gameEngineService.getComputerRandomChoice(vm.availableChoices);
            vm.result = gameEngineService.calculateResult(vm.chosenAction, vm.computerChosenAction);
            let titleText =
                vm.result.result === 1 ?
                'YOU WON!' :
                vm.result.result === -1 ?
                'YOU LOST!' :
                'DRAW!';
            let dialog = $mdDialog.alert()
                .parent(angular.element($document[0].body))
                .clickOutsideToClose(true)
                .title(titleText)
                .textContent(vm.result.text)
                .ariaLabel(titleText)
                .ok('Continue')
                .targetEvent($event);

            $mdDialog.show(dialog).then(closeResultMessage);
        }

        function closeResultMessage() {
            vm.chosenAction = undefined;
            vm.computerChosenAction = undefined;
            vm.isGameStartedDisplayed = true;
            vm.isMakeYourChoiceDisplayed = false;
            vm.isComputerChosenIconDisplayed = false;
            vm.isResultMessageDisplayed = false;
        }

    }
})();