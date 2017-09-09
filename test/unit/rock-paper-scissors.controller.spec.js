fdescribe('RockPaperScissorsController', function() {

    let controller, gameEngineService, $scope, $mdBottomSheet, $mdDialog;

    beforeEach(function() {
        module('myApp');
        module('templates');

        module(function($provide) {
            $provide.value('gameEngineService', {
                getRockPaperScissorsSubset: function() {},
                calculateResult: function() {}
            });
            $provide.value('$mdBottomSheet', {
                show: function() {},
                hide: function() {}
            });
            $provide.value('$mdDialog', {
                alert: function() {
                    return {
                        parent: function() {},
                        clickOutsideToClose: function() {},
                        title: function() {},
                        textContent: function() {},
                        ariaLabel: function() {},
                        ok: function() {},
                        targetEvent: function() {}
                    };
                },
                show: function() {},
                cancel: function() {}
            });
        });

        inject(function(_$rootScope_, _$controller_, _gameEngineService_, _$mdBottomSheet_, _$mdDialog_) {
            $scope = _$rootScope_.$new();
            gameEngineService = _gameEngineService_;
            $mdBottomSheet = _$mdBottomSheet_;
            $mdDialog = _$mdDialog_;
            controller = _$controller_('RockPaperScissorsController', { $scope: $scope });
        });
    });

    describe('initialization', () => {

        it('should define the exposed variables', () => {
            controller.$onInit();
            expect(controller.isGameStartedDisplayed).toBeDefined();
            expect(controller.isMakeYourChoiceDisplayed).toBeDefined();
            expect(controller.isChoicesPanelDisplayed).toBeDefined();
            expect(controller.isChosenIconDisplayed).toBeDefined();
            expect(controller.isComputerChosenIconDisplayed).toBeDefined();
            expect(controller.isResultMessageDisplayed).toBeDefined();
            expect(controller.availableChoices).toBeDefined();
            expect(controller.choseIconSrc).toBeDefined();
            expect(controller.computerChosenIconSrc).toBeDefined();
        });

        it('should define the exposed methods', () => {
            controller.$onInit();
            expect(controller.startGame).toEqual(jasmine.any(Function));
            expect(controller.makeChoice).toEqual(jasmine.any(Function));
            expect(controller.chooseAction).toEqual(jasmine.any(Function));
            expect(controller.closeResultMessage).toEqual(jasmine.any(Function));
        });

        it('should init the exposed variables correctly', () => {
            spyOn(gameEngineService, 'getRockPaperScissorsSubset').and.returnValue(['rock', 'paper', 'scissors']);
            controller.$onInit();
            expect(controller.isGameStartedDisplayed).toEqual(true);
            expect(controller.isMakeYourChoiceDisplayed).toEqual(false);
            expect(controller.isChoicesPanelDisplayed).toEqual(false);
            expect(controller.isChosenIconDisplayed).toEqual(false);
            expect(controller.isComputerChosenIconDisplayed).toEqual(false);
            expect(controller.isResultMessageDisplayed).toEqual(false);
            expect(controller.chosenIconSrc).toBeUndefined();
            expect(controller.computerChosenIconSrc).to.contain('not-chosen-yet');
            expect(gameEngineService.getRockPaperScissorsSubset).toHaveBeenCalled();
            expect(controller.availableChoices).toEqual(['rock', 'paper', 'scissors']);
        });

        it('should call the gameEngineService.getRockPaperScissorsSubset', () => {
            spyOn(gameEngineService, 'getRockPaperScissorsSubset').and.callThrough();
            controller.$onInit();
            expect(gameEngineService.getRockPaperScissorsSubset).toHaveBeenCalled();
        });

    });

    describe('startGame', () => {

        it('should display and hide the right elements', () => {
            controller.$onInit();
            controller.startGame();
            $scope.$apply();
            expect(controller.isGameStartedDisplayed).toEqual(false);
            expect(controller.isMakeYourChoiceDisplayed).toEqual(true);
            expect(controller.isChoicesPanelDisplayed).toEqual(false);
            expect(controller.isChosenIconDisplayed).toEqual(false);
            expect(controller.isComputerChosenIconDisplayed).toEqual(true);
            expect(controller.isResultMessageDisplayed).toEqual(false);
        });

    });

    describe('makeChoice', () => {

        beforeEach(() => {
            controller.$onInit();
            spyOn($mdBottomSheet, 'show').and.callThrough();
        });

        it('should call the $mdBottomSheet.show method', () => {
            controller.makeChoice();
            $scope.$apply();
            expect($mdBottomSheet.show).toHaveBeenCalled();
        });

        it('should display and hide the right elements', () => {
            controller.makeChoice();
            $scope.$apply();
            expect(controller.isGameStartedDisplayed).toEqual(false);
            expect(controller.isMakeYourChoiceDisplayed).toEqual(false);
            expect(controller.isChoicesPanelDisplayed).toEqual(true);
            expect(controller.isChosenIconDisplayed).toEqual(false);
            expect(controller.isComputerChosenIconDisplayed).toEqual(true);
            expect(controller.isResultMessageDisplayed).toEqual(false);
        });

    });

    describe('chooseAction', () => {

        let defaultChoice = {
            id: 'rock'
        };
        
        beforeEach(() => {
            controller.$onInit();
            spyOn($mdBottomSheet, 'show').and.callThrough();
            spyOn($mdBottomSheet, 'hide').and.callThrough();
            spyOn($mdDialog, 'alert').and.callThrough();
            spyOn(gameEngineService, 'calculateResult').and.callThrough();
        });

        it('should call the $mdBottomSheet.hide method', () => {
            controller.chooseAction(defaultChoice);
            $scope.$apply();
            expect($mdBottomSheet.hide).toHaveBeenCalled();
        });

        it('should display and hide the right elements', () => {
            controller.chooseAction(defaultChoice);
            $scope.$apply();
            expect(controller.isGameStartedDisplayed).toEqual(false);
            expect(controller.isMakeYourChoiceDisplayed).toEqual(false);
            expect(controller.isChoicesPanelDisplayed).toEqual(false);
            expect(controller.isChosenIconDisplayed).toEqual(true);
            expect(controller.isComputerChosenIconDisplayed).toEqual(true);
            expect(controller.isResultMessageDisplayed).toEqual(true);
        });

        it('should call the $mdDialog.alert method', () => {
            controller.chooseAction(defaultChoice);
            $scope.$apply();
            expect($mdDialog.alert).toHaveBeenCalled();
        });

        it('should call the gameEngineService.calculateResult method', () => {
            controller.chooseAction(defaultChoice);
            $scope.$apply();
            expect(gameEngineService.calculateResult).toHaveBeenCalled();
        });

    });

    describe('closeResultMessage', () => {
        beforeEach(() => {
            controller.$onInit();
            spyOn($mdDialog, 'cancel').and.callThrough();
        });

        it('should call the $mdDialog.cancel method', () => {
            controller.closeResultMessage();
            expect($mdDialog.cancel).toHaveBeenCalled();
        });

        it('should set the visibility of the elements', () => {
            controller.closeResultMessage();
            expect(controller.isGameStartedDisplayed).toEqual(true);
            expect(controller.isMakeYourChoiceDisplayed).toEqual(false);
            expect(controller.isChoicesPanelDisplayed).toEqual(false);
            expect(controller.isChosenIconDisplayed).toEqual(false);
            expect(controller.isComputerChosenIconDisplayed).toEqual(false);
            expect(controller.isResultMessageDisplayed).toEqual(false);
        });
    });

});