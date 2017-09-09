describe('RockPaperScissorsController', function() {

    let controller, gameEngineService, $scope;

    beforeEach(function() {
        module('myApp');
        module('templates');

        module(function($provide) {
            $provide.value('gameEngineService', {
                getRockPaperScissorsSubset: function() {},
                calculateResult: function() {}
            });
        });

        inject(function(_$rootScope_, _$controller_, _gameEngineService_) {
            $scope = _$rootScope_.$new();
            gameEngineService = _gameEngineService_;
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
            expect(controller.availableChoices).toEqual(['rock', 'paper', 'scissors']);
            expect(controller.chosenIconSrc).toBeUndefined();
            expect(controller.computerChosenIconSrc).to.contain('not-chosen-yet');
        });

        it('should call the gameEngineService.getRockPaperScissorsSubset', () => {
            spyOn(gameEngineService, 'getRockPaperScissorsSubset').and.callThrough();
            controller.$onInit();
            expect(gameEngineService.getRockPaperScissorsSubset).toHaveBeenCalled();
        });

    });

    describe('startGame', () => {

        it('should display and hide the right elements', () => {
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

        it('should display and hide the right elements', () => {
            controller.startGame();
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

        it('should display and hide the right elements', () => {
            controller.startGame();
            controller.makeChoice();
            controller.chooseAction({
                id: 'rock'
            });
            $scope.$apply();
            expect(controller.isGameStartedDisplayed).toEqual(false);
            expect(controller.isMakeYourChoiceDisplayed).toEqual(false);
            expect(controller.isChoicesPanelDisplayed).toEqual(false);
            expect(controller.isChosenIconDisplayed).toEqual(true);
            expect(controller.isComputerChosenIconDisplayed).toEqual(true);
            expect(controller.isResultMessageDisplayed).toEqual(true);
        });

    });

});