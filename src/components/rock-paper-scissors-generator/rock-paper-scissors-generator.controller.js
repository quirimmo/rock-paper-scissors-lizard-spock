(function() {
    'use strict';

    angular.module('myApp').controller('RockPaperScissorsGeneratorController', RockPaperScissorsGeneratorController);

    function RockPaperScissorsGeneratorController(gameEngineService, $mdBottomSheet, $mdDialog, $document) {

        // bindings
        // pageTitle: '='
        // availableChoices: '='

        var vm = this;
        
        // using the reveal patter defining at the beginning all the used variables inside the view
        vm.isGameStartedDisplayed;
        vm.isGameSimulatedDisplayed;
        vm.isGameSimulation;
        vm.isMakeYourChoiceDisplayed;
        vm.isComputerChosenIconDisplayed;
        vm.availableChoices;
        vm.chosenAction;
        vm.computerChosenAction;
        vm.result;

        vm.startGame = startGame;
        vm.simulateGame = simulateGame;
        vm.makeChoice = makeChoice;
        vm.chooseAction = chooseAction;
        vm.closeResultMessage = closeResultMessage;
        vm.$onInit = onInit;


        // ==========================================================

        function onInit() {
            vm.isGameSimulation = false;
            vm.isGameStartedDisplayed = true;
            vm.isGameSimulatedDisplayed = true;
            vm.isMakeYourChoiceDisplayed = false;
            vm.isComputerChosenIconDisplayed = false;
        }

        function startGame() {
            vm.isGameSimulation = false;
            vm.isGameStartedDisplayed = false;
            vm.isGameSimulatedDisplayed = false;
            vm.isMakeYourChoiceDisplayed = true;
            vm.isComputerChosenIconDisplayed = true;
        }

        function simulateGame($event) {
            vm.isGameSimulation = true;
            vm.isGameStartedDisplayed = false;
            vm.isGameSimulatedDisplayed = false;
            vm.chosenAction = gameEngineService.getComputerRandomChoice(vm.availableChoices);
            vm.computerChosenAction = gameEngineService.getComputerRandomChoice(vm.availableChoices);
            vm.result = gameEngineService.calculateResult(vm.chosenAction, vm.computerChosenAction, vm.isGameSimulation);
            openResultDialog($event);
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
            openResultDialog($event);
        }

        function closeResultMessage() {
            vm.chosenAction = undefined;
            vm.computerChosenAction = undefined;
            vm.isGameStartedDisplayed = true;
            vm.isGameSimulatedDisplayed = true;
            vm.isGameSimulation = false;
            vm.isMakeYourChoiceDisplayed = false;
            vm.isComputerChosenIconDisplayed = false;
        }

        function getMainTextResult() {
            let subject = vm.isGameSimulation ? 'COMPUTER 1' : 'YOU';
            return vm.result.result === 1 ?
                `${subject} WON!` :
                vm.result.result === -1 ?
                `${subject} LOST!` :
                'DRAW!';
        }

        function openResultDialog($event) {
            let titleText = getMainTextResult();
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

    }
})();