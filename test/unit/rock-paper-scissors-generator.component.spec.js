describe('RockPaperScissorsGeneratorComponent', () => {

    let $componentController, controller, gameEngineService, $mdBottomSheet, $mdDialog, $scope;

    let defaultPage = 'my-page';
    let defaultAvailableChoices = ['choice1', 'choice2', 'choice3'];
    let defaultResult = {
        result: 1,
        text: 'blablabla'
    };

    let mocked$alertTargetEvent = () => {};
    let mocked$alertOK = () => ({ targetEvent: mocked$alertTargetEvent });
    let mocked$alertAriaLabel = () => ({ ok: mocked$alertOK });
    let mocked$alertTextContent = () => ({ ariaLabel: mocked$alertAriaLabel });
    let mocked$alertTitle = () => ({ textContent: mocked$alertTextContent });
    let mocked$alertClickOutsideToClose = () => ({ title: mocked$alertTitle });
    let mocked$alertParent = () => ({ clickOutsideToClose: mocked$alertClickOutsideToClose });
    let mocked$alert = { parent: mocked$alertParent };

    // injecting the needed modules
    beforeEach(module('myApp'));
    beforeEach(module('partials'));
    // mocking the injected dependencies
    beforeEach(module(($provide) => {
        $provide.value('gameEngineService', {
            getRockPaperScissorsSubset: () => {},
            calculateResult: () => {},
            getComputerRandomChoice: () => {}
        });
        $provide.value('$mdBottomSheet', {
            show: () => {},
            hide: () => {}
        });
        $provide.value('$mdDialog', {
            alert: () => {},
            show: () => {},
            cancel: () => {}
        });
    }));
    // injecting the needed dependencies
    beforeEach(inject((_$rootScope_, _$componentController_, _gameEngineService_, _$mdBottomSheet_, _$mdDialog_) => {
        $scope = _$rootScope_.$new();
        $componentController = _$componentController_;
        gameEngineService = _gameEngineService_;
        $mdBottomSheet = _$mdBottomSheet_;
        $mdDialog = _$mdDialog_;
        controller = $componentController('rockPaperScissorsGenerator', null, {
            pageTitle: defaultPage,
            availableChoices: defaultAvailableChoices
        });
        controller.$onInit();
        spyOn($mdBottomSheet, 'show').and.callThrough();
        spyOn($mdBottomSheet, 'hide').and.callThrough();
        spyOn($mdDialog, 'show').and.returnValue({
            then: () => {}
        });
        spyOn($mdDialog, 'alert').and.returnValue(mocked$alert);
        spyOn(gameEngineService, 'calculateResult').and.returnValue(defaultResult);
        spyOn(gameEngineService, 'getComputerRandomChoice').and.returnValue('paper');
    }));

    describe('init', () => {

        it('should init the bindings', () => {
            expect(controller.pageTitle).toEqual(defaultPage);
            expect(controller.availableChoices).toEqual(defaultAvailableChoices);
        });

        it('should define the exposed variables', () => {
            expect(controller.isGameStartedDisplayed).toBeDefined();
            expect(controller.isGameSimulatedDisplayed).toBeDefined();
            expect(controller.isGameSimulation).toBeDefined();
            expect(controller.isComputerChosenIconDisplayed).toBeDefined();
            expect(controller.isMakeYourChoiceDisplayed).toBeDefined();
            expect(controller.chosenAction).toBeUndefined();
            expect(controller.computerChosenAction).toBeUndefined();
            expect(controller.result).toBeUndefined();
        });

        it('should define the exposed methods', () => {
            expect(controller.startGame).toEqual(jasmine.any(Function));
            expect(controller.simulateGame).toEqual(jasmine.any(Function));
            expect(controller.makeChoice).toEqual(jasmine.any(Function));
            expect(controller.chooseAction).toEqual(jasmine.any(Function));
            expect(controller.closeResultMessage).toEqual(jasmine.any(Function));
        });

        it('should init the exposed variables correctly', () => {
            expect(controller.isGameStartedDisplayed).toEqual(true);
            expect(controller.isGameSimulatedDisplayed).toEqual(true);
            expect(controller.isGameSimulation).toEqual(false);
            expect(controller.isComputerChosenIconDisplayed).toBeDefined(false);
            expect(controller.isMakeYourChoiceDisplayed).toEqual(false);
        });

    });

    describe('startGame', () => {

        it('should display and hide the right elements', () => {
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
            controller.simulateGame();
            $scope.$apply();
        });

        it('should display and hide corresponding elements', () => {
            expect(controller.isGameSimulation).toEqual(true);
            expect(controller.isGameSimulatedDisplayed).toEqual(false);
            expect(controller.isGameStartedDisplayed).toEqual(false);
            expect(controller.isMakeYourChoiceDisplayed).toEqual(false);
            expect(controller.isComputerChosenIconDisplayed).toEqual(false);
        });

        it('should set the corresponding elements', () => {
            expect(controller.chosenAction).toBeDefined();
            expect(controller.computerChosenAction).toBeDefined();
            expect(controller.result).toBeDefined();
        });

        it('should call the gameEngineService.getComputerRandomChoice twice', () => {
            expect(gameEngineService.getComputerRandomChoice.calls.count()).toBe(2);
        });

        it('should display the result', () => {
            expect($mdDialog.alert).toHaveBeenCalled();
        });

    });

    describe('makeChoice', () => {

        beforeEach(() => {
            controller.startGame();
            controller.makeChoice();
            $scope.$apply();
        });

        it('should call the $mdBottomSheet.show method with the right parameters', () => {
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
            controller.startGame();
            controller.makeChoice();
            controller.chooseAction(defaultChoice);
            $scope.$apply();
        });

        it('should call the $mdBottomSheet.hide method', () => {
            expect($mdBottomSheet.hide).toHaveBeenCalled();
        });

        it('should hide the isMakeYourChoiceDisplayed', () => {
            expect(controller.isMakeYourChoiceDisplayed).toEqual(false);
        });

        it('should init the chosenAction', () => {
            expect(controller.chosenAction).toEqual(defaultChoice);
        });

        it('should init call the gameEngineService.getComputerRandomChoice', () => {
            expect(gameEngineService.getComputerRandomChoice).toHaveBeenCalledWith(controller.availableChoices);
        });

        it('should init the computerChosenAction with the returned value', () => {
            expect(controller.computerChosenAction).toEqual('paper');
        });

        it('should call the gameEngineService.calculateResult method', () => {
            expect(gameEngineService.calculateResult).toHaveBeenCalled();
        });

        it('should define the result property', () => {
            expect(controller.result).toEqual(defaultResult);
        });

        it('should call the $mdDialog.alert', () => {
            expect($mdDialog.alert).toHaveBeenCalled();
        });

        it('should call the $mdDialog.show', () => {
            expect($mdDialog.alert).toHaveBeenCalled();
        });

    });

    describe('closeResultMessage', () => {

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