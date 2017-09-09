describe('RockPaperScissorsController', function() {

    let controller, gameEngineService, $scope, $mdBottomSheet, $mdDialog, $q;

    beforeEach(function() {
        module('myApp');
        module('templates');

        module(function($provide) {
            $provide.value('gameEngineService', {
                getRockPaperScissorsSubset: function() {},
                calculateResult: function() {},
                getComputerRandomChoice: function() {}
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

        inject(function(_$rootScope_, _$controller_, _gameEngineService_, _$mdBottomSheet_, _$mdDialog_, _$q_) {
            $scope = _$rootScope_.$new();
            gameEngineService = _gameEngineService_;
            $q = _$q_;
            $mdBottomSheet = _$mdBottomSheet_;
            $mdDialog = _$mdDialog_;
            controller = _$controller_('RockPaperScissorsController', { $scope: $scope });
        });
    });

    describe('initialization', () => {

        it('should define the exposed variables', () => {
            spyOn(gameEngineService, 'getRockPaperScissorsSubset').and.returnValue(['rock', 'paper', 'scissors']);
            controller.$onInit();
            expect(controller.isGameStartedDisplayed).toBeDefined();
            expect(controller.isMakeYourChoiceDisplayed).toBeDefined();
            expect(controller.isResultMessageDisplayed).toBeDefined();
            expect(controller.availableChoices).toBeDefined();
            expect(controller.chosenAction).toBeUndefined();
            expect(controller.computerChosenAction).toBeUndefined();
            expect(controller.result).toBeUndefined();
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
            expect(controller.isComputerChosenIconDisplayed).toEqual(false);
            expect(controller.isResultMessageDisplayed).toEqual(false);
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
            expect(controller.isComputerChosenIconDisplayed).toEqual(true);
            expect(controller.isResultMessageDisplayed).toEqual(false);
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
            spyOn($mdDialog, 'alert').and.returnValue({
                parent: function() { 
                    return {
                        clickOutsideToClose: function() {
                            return {
                                title: function() {
                                    return {
                                        textContent: function() {
                                            return {
                                                ariaLabel: function() {
                                                    return {
                                                        ok: function() {
                                                            return {
                                                                targetEvent: function() {
                                                                    return {};
                                                                }
                                                            };
                                                        }
                                                    };
                                                }
                                            };
                                        }
                                    };
                                }
                            };
                        }
                    }; 
                }
            });
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
            expect(controller.isResultMessageDisplayed).toEqual(false);
        });
    });

});