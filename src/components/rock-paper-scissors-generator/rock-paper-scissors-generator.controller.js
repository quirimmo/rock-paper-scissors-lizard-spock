(function() {
    'use strict';

    angular.module('myApp').controller('RockPaperScissorsGeneratorController', RockPaperScissorsGeneratorController);

    RockPaperScissorsGeneratorController.$inject = ['gameEngineService', '$mdBottomSheet', '$mdDialog', '$document'];

    function RockPaperScissorsGeneratorController(gameEngineService, $mdBottomSheet, $mdDialog, $document) {

        // I usually list the bindings variables at the beginning of the controller so that, if you open the controller, you immediately know which parameters
        // this controller of the component is expecting to be passed in

        // bindings
        // pageTitle: '='
        // availableChoices: '='

        // I usually bind all my exposed variables to be called in the view in the vm object
        // It's a pattern which avoids to injects all your variables directly inside the $scope, messing up it
        var vm = this;
        
        // using the reveal pattern defining at the beginning all the used variables inside the view
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
            // init all the variables for the base state of the game instance, showing only the main two buttons: start and simulate game
            vm.isGameSimulation = false;
            vm.isGameStartedDisplayed = true;
            vm.isGameSimulatedDisplayed = true;
            vm.isMakeYourChoiceDisplayed = false;
            vm.isComputerChosenIconDisplayed = false;
        }

        /**
         * Function called when you click on the start game button for starting a human vs computer match
         * It hides the buttons and it shows the UI elements needed for making a human vs computer match
         */
        function startGame() {
            vm.isGameSimulation = false;
            vm.isGameStartedDisplayed = false;
            vm.isGameSimulatedDisplayed = false;
            vm.isMakeYourChoiceDisplayed = true;
            vm.isComputerChosenIconDisplayed = true;
        }

        /**
         * Function triggered when you click on the simulate game button for starting a computer vs computer match
         * It's the entry point for managing completely a computer vs computer match, showing and hiding the related elements, and calling the needed methods
         * @param {Object} $event The firing event 
         */
        function simulateGame($event) {
            vm.isGameSimulation = true;
            vm.isGameStartedDisplayed = false;
            vm.isGameSimulatedDisplayed = false;
            // get the random choice of Computer 1
            vm.chosenAction = gameEngineService.getComputerRandomChoice(vm.availableChoices);
            // get the random choice of Computer 2
            vm.computerChosenAction = gameEngineService.getComputerRandomChoice(vm.availableChoices);
            // calculate the result of the match
            vm.result = gameEngineService.calculateResult(vm.chosenAction, vm.computerChosenAction, vm.isGameSimulation);
            // show a dialog with the result
            openResultDialog($event);
        }

        /**
         * Function triggered when you click on the Make Choice button during a human vs computer match
         * It shows a panel through the $mdBottomSheet component of Angular Material which is responsible for providing you all the choices you have in this
         * particular instance of the game (parameter availableChoices of this component)
         * The controller associated to this panel receives the following parameters:  
         *  - availableChoices {Array} An array of objects representing the availableChoices passed in the current component 
         *  - chooseAction: {Function} A callback to be performed when you click on one of the available choices 
         */
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

        /**
         * Callback passed to the $mdBottomSheet panel which will be performed when you have clicked on one of the available choices
         * Hide the Make Your Choice button, because you already made your choice
         * Hide the $mdBottomSheet panel, because you already made your choice
         * Triggers all the code in order to complete the match
         * @param {Object} item The item of the availableChoices array of objects you chose 
         * @param {String} $event The firing event
         */
        function chooseAction(item, $event) {
            vm.isMakeYourChoiceDisplayed = false;
            vm.chosenAction = item;
            $mdBottomSheet.hide();
            // get the random computer choice
            vm.computerChosenAction = gameEngineService.getComputerRandomChoice(vm.availableChoices);
            // elaborate the result
            vm.result = gameEngineService.calculateResult(vm.chosenAction, vm.computerChosenAction);
            // open a dialog which shows the result of the match
            openResultDialog($event);
        }

        /**
         * Callback performed when you close the panel of the result of the match
         * It is responsible to reset all the variables to the starting point, in order to perform a new match
         */
        function closeResultMessage() {
            vm.chosenAction = undefined;
            vm.computerChosenAction = undefined;
            vm.isGameStartedDisplayed = true;
            vm.isGameSimulatedDisplayed = true;
            vm.isGameSimulation = false;
            vm.isMakeYourChoiceDisplayed = false;
            vm.isComputerChosenIconDisplayed = false;
        }

        /**
         * Elaborate the title to be displayed in the result dialog, depending on the result of the current match 
         * @returns {String} The main text to be shown in the result dialog, specifying if it is a victory, lose or draw
         */
        function getMainTextResult() {
            let subject = vm.isGameSimulation ? 'COMPUTER 1' : 'YOU';
            return vm.result.result === 1 ?
                `${subject} WON!` :
                vm.result.result === -1 ?
                `${subject} LOST!` :
                'DRAW!';
        }

        /**
         * Open a result dialog through the $mdDialog component of Angular Material which shows the result of the current match
         * @param {Object} $event The firing event 
         */
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
            // binding the closeResultMessage method to the closure of the dialog so that this method will be triggered when closing the result dialog
            $mdDialog.show(dialog).then(closeResultMessage);
        }

    }
})();