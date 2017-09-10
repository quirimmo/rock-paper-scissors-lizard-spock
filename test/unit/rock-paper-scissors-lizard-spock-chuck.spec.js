describe('RockPaperScissorsLizardSpockChuckController', function() {

    let controller, gameEngineService, $scope, $mdBottomSheet, $mdDialog;

    let mocked$alertTargetEvent = function() {};
    let mocked$alertOK = function() { return { targetEvent: mocked$alertTargetEvent }; };
    let mocked$alertAriaLabel = function() { return { ok: mocked$alertOK }; };
    let mocked$alertTextContent = function() { return { ariaLabel: mocked$alertAriaLabel }; };
    let mocked$alertTitle = function() { return { textContent: mocked$alertTextContent }; };
    let mocked$alertClickOutsideToClose = function() { return { title: mocked$alertTitle }; };
    let mocked$alertParent = function() { return { clickOutsideToClose: mocked$alertClickOutsideToClose }; };
    let mocked$alert = { parent: mocked$alertParent };


    beforeEach(function() {
        module('myApp');
        module('templates');

        module(function($provide) {
            $provide.value('gameEngineService', {
                getRockPaperScissorsLizardSpockChuckSubset: function() {},
                calculateResult: function() {},
                getComputerRandomChoice: function() {}
            });
            $provide.value('$mdBottomSheet', {
                show: function() {},
                hide: function() {}
            });
            $provide.value('$mdDialog', {
                alert: function() {},
                show: function() {},
                cancel: function() {}
            });
        });

        inject(function(_$rootScope_, _$controller_, _gameEngineService_, _$mdBottomSheet_, _$mdDialog_) {
            $scope = _$rootScope_.$new();
            gameEngineService = _gameEngineService_;
            $mdBottomSheet = _$mdBottomSheet_;
            $mdDialog = _$mdDialog_;
            controller = _$controller_('RockPaperScissorsLizardSpockChuckController', { $scope: $scope });
        });
    });

    describe('initialization', () => {

        it('should define the exposed variables', () => {
            spyOn(gameEngineService, 'getRockPaperScissorsLizardSpockChuckSubset').and.returnValue(['rock', 'paper', 'scissors', 'lizard', 'spock', 'chuck']);
            controller.$onInit();
            expect(controller.isGameStartedDisplayed).toBeDefined();
            expect(controller.isGameSimulatedDisplayed).toBeDefined();
            expect(controller.isGameSimulation).toBeDefined();
            expect(controller.isComputerChosenIconDisplayed).toBeDefined();
            expect(controller.isMakeYourChoiceDisplayed).toBeDefined();
            expect(controller.availableChoices).toBeDefined();
            expect(controller.chosenAction).toBeUndefined();
            expect(controller.computerChosenAction).toBeUndefined();
            expect(controller.result).toBeUndefined();
        });

        it('should define the exposed methods', () => {
            controller.$onInit();
            expect(controller.startGame).toEqual(jasmine.any(Function));
            expect(controller.simulateGame).toEqual(jasmine.any(Function));
            expect(controller.makeChoice).toEqual(jasmine.any(Function));
            expect(controller.chooseAction).toEqual(jasmine.any(Function));
            expect(controller.closeResultMessage).toEqual(jasmine.any(Function));
        });

        it('should init the exposed variables correctly', () => {
            spyOn(gameEngineService, 'getRockPaperScissorsLizardSpockChuckSubset').and.returnValue(['rock', 'paper', 'scissors', 'lizard', 'spock', 'chuck']);
            controller.$onInit();
            expect(controller.isGameStartedDisplayed).toEqual(true);
            expect(controller.isGameSimulatedDisplayed).toEqual(true);
            expect(controller.isGameSimulation).toEqual(false);
            expect(controller.isComputerChosenIconDisplayed).toBeDefined(false);
            expect(controller.isMakeYourChoiceDisplayed).toEqual(false);
            expect(gameEngineService.getRockPaperScissorsLizardSpockChuckSubset).toHaveBeenCalled();
            expect(controller.availableChoices).toEqual(['rock', 'paper', 'scissors', 'lizard', 'spock', 'chuck']);
            expect(controller.chosenAction).toBeUndefined();
            expect(controller.computerChosenAction).toBeUndefined();
            expect(controller.result).toBeUndefined();
        });

        it('should call the gameEngineService.getRockPaperScissorsLizardSpockChuckSubset', () => {
            spyOn(gameEngineService, 'getRockPaperScissorsLizardSpockChuckSubset').and.callThrough();
            controller.$onInit();
            expect(gameEngineService.getRockPaperScissorsLizardSpockChuckSubset).toHaveBeenCalled();
        });

    });

    describe('startGame', () => {

        it('should display and hide the right elements', () => {
            controller.$onInit();
            controller.startGame();
            $scope.$apply();
            expect(controller.isGameStartedDisplayed).toEqual(false);
            expect(controller.isGameSimulatedDisplayed).toEqual(false);
            expect(controller.isMakeYourChoiceDisplayed).toEqual(true);
            expect(controller.isComputerChosenIconDisplayed).toEqual(true);
            expect(controller.isGameSimulation).toEqual(false);
            expect(controller.chosenAction).toBeUndefined();
            expect(controller.computerChosenAction).toBeUndefined();
            expect(controller.result).toBeUndefined();
        });

    });

    describe('simulateGame', () => {

        beforeEach(() => {
            spyOn($mdBottomSheet, 'show').and.callThrough();
            spyOn($mdBottomSheet, 'hide').and.callThrough();
            spyOn($mdDialog, 'show').and.returnValue({
                then: function() {}
            });
            spyOn($mdDialog, 'alert').and.returnValue(mocked$alert);
            spyOn(gameEngineService, 'calculateResult').and.returnValue({
                result: 1,
                text: 'blablabla'
            });
            spyOn(gameEngineService, 'getComputerRandomChoice').and.returnValue('paper');
            controller.$onInit();
        });

        it('should display and hide corresponding elements', () => {
            controller.simulateGame();
            $scope.$apply();
            expect(controller.isGameSimulation).toEqual(true);
            expect(controller.isGameSimulatedDisplayed).toEqual(false);
            expect(controller.isGameStartedDisplayed).toEqual(false);
            expect(controller.isMakeYourChoiceDisplayed).toEqual(false);
            expect(controller.isComputerChosenIconDisplayed).toEqual(false);
        });

        it('should set the corresponding elements', () => {
            controller.simulateGame();
            $scope.$apply();
            expect(controller.chosenAction).toBeDefined();
            expect(controller.computerChosenAction).toBeDefined();
            expect(controller.result).toBeDefined();
        });

        it('should call the gameEngineService.getComputerRandomChoice twice', () => {
            controller.simulateGame();
            $scope.$apply();
            expect(gameEngineService.getComputerRandomChoice.calls.count()).toBe(2);
        });

        it('should display the result', () => {
            controller.simulateGame();
            $scope.$apply();
            expect($mdDialog.alert).toHaveBeenCalled();
        });

    });

    describe('makeChoice', () => {

        beforeEach(() => {
            spyOn($mdBottomSheet, 'show').and.callThrough();
            controller.$onInit();
            controller.startGame();
        });

        it('should call the $mdBottomSheet.show method with the right parameters', () => {
            controller.makeChoice();
            $scope.$apply();
            expect($mdBottomSheet.show).toHaveBeenCalledWith({
                templateUrl: 'src/templates/available-choices-panel.html',
                controller: 'AvailableChoicesPanelController',
                controllerAs: 'vm',
                locals: {
                    availableChoices: controller.availableChoices,
                    chooseAction: controller.chooseAction
                }
            });
        });

    });

    describe('chooseAction', () => {

        let defaultChoice = {
            id: 'rock'
        };

        beforeEach(() => {
            spyOn($mdBottomSheet, 'show').and.callThrough();
            spyOn($mdBottomSheet, 'hide').and.callThrough();
            spyOn($mdDialog, 'show').and.returnValue({
                then: function() {}
            });
            spyOn($mdDialog, 'alert').and.returnValue(mocked$alert);
            spyOn(gameEngineService, 'calculateResult').and.returnValue('result');
            controller.$onInit();
            controller.startGame();
            controller.makeChoice();
        });

        it('should call the $mdBottomSheet.hide method', () => {
            controller.chooseAction(defaultChoice);
            $scope.$apply();
            expect($mdBottomSheet.hide).toHaveBeenCalled();
        });

        it('should hide the isMakeYourChoiceDisplayed', () => {
            controller.chooseAction(defaultChoice);
            $scope.$apply();
            expect(controller.isMakeYourChoiceDisplayed).toEqual(false);
        });

        it('should init the chosenAction', () => {
            controller.chooseAction(defaultChoice);
            $scope.$apply();
            expect(controller.chosenAction).toEqual(defaultChoice);
        });

        it('should init call the gameEngineService.getComputerRandomChoice', () => {
            spyOn(gameEngineService, 'getComputerRandomChoice').and.callThrough();
            controller.chooseAction(defaultChoice);
            $scope.$apply();
            expect(gameEngineService.getComputerRandomChoice).toHaveBeenCalledWith(controller.availableChoices);
        });

        it('should init the computerChosenAction with the returned value', () => {
            spyOn(gameEngineService, 'getComputerRandomChoice').and.returnValue('paper');
            controller.chooseAction(defaultChoice);
            $scope.$apply();
            expect(controller.computerChosenAction).toEqual('paper');
        });

        it('should call the gameEngineService.calculateResult method', () => {
            controller.chooseAction(defaultChoice);
            $scope.$apply();
            expect(gameEngineService.calculateResult).toHaveBeenCalled();
        });

        it('should define the result property', () => {
            controller.chooseAction(defaultChoice);
            $scope.$apply();
            expect(controller.result).toEqual('result');
        });

        it('should call the $mdDialog.alert', () => {
            controller.chooseAction(defaultChoice);
            $scope.$apply();
            expect($mdDialog.alert).toHaveBeenCalled();
        });

        it('should call the $mdDialog.show', () => {
            controller.chooseAction(defaultChoice);
            $scope.$apply();
            expect($mdDialog.alert).toHaveBeenCalled();
        });

    });

    describe('closeResultMessage', () => {
        beforeEach(() => {
            controller.$onInit();
        });

        it('should reset the variables', () => {
            controller.closeResultMessage();
            expect(controller.chosenAction).toBeUndefined();
            expect(controller.computerChosenAction).toBeUndefined();
            expect(controller.isGameStartedDisplayed).toEqual(true);
            expect(controller.isMakeYourChoiceDisplayed).toEqual(false);
            expect(controller.isComputerChosenIconDisplayed).toEqual(false);
        });
    });

});