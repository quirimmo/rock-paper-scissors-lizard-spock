describe('MainController', () => {

    let controller, gameService, $scope;

    beforeEach(() => {
        // injecting the needed modules
        module('myApp');
        module('templates');
        // mocking the injected dependencies
        module(($provide) => {
            $provide.value('gameService', {
                getNumOfMatches: () => 0,
                getNumOfVictories: () => 0,
                getNumOfLoses: () => 0,
                getNumOfDraws: () => 0,
                getNumOfConsecutiveVictories: () => 0,
                getNumOfConsecutiveLoses: () => 0,
                getNumOfConsecutiveDraws: () => 0
            });
        });
        // injecting needed dependencies        
        inject((_$rootScope_, _$controller_, _gameService_) => {
            $scope = _$rootScope_.$new();
            gameService = _gameService_;
            controller = _$controller_('PersonalProfileController', { $scope: $scope });
        });
    });

    describe('initialization', () => {

        it('should define the exposed variables', () => {
            controller.$onInit();
            expect(controller.numOfMatches).toEqual(0);
            expect(controller.numOfVictories).toEqual(0);
            expect(controller.numOfLoses).toEqual(0);
            expect(controller.numOfDraws).toEqual(0);
            expect(controller.numOfConsecutiveVictories).toEqual(0);
            expect(controller.numOfConsecutiveLoses).toEqual(0);
            expect(controller.numOfConsecutiveDraws).toEqual(0);
        });

        it('should call the methods in order to retrieve the stored values in the local storage', () => {
            spyOn(gameService, 'getNumOfMatches').and.callThrough();
            spyOn(gameService, 'getNumOfVictories').and.callThrough();
            spyOn(gameService, 'getNumOfLoses').and.callThrough();
            spyOn(gameService, 'getNumOfDraws').and.callThrough();
            spyOn(gameService, 'getNumOfConsecutiveVictories').and.callThrough();
            spyOn(gameService, 'getNumOfConsecutiveLoses').and.callThrough();
            spyOn(gameService, 'getNumOfConsecutiveDraws').and.callThrough();

            controller.$onInit();

            expect(gameService.getNumOfMatches).toHaveBeenCalled();
            expect(gameService.getNumOfVictories).toHaveBeenCalled();
            expect(gameService.getNumOfLoses).toHaveBeenCalled();
            expect(gameService.getNumOfDraws).toHaveBeenCalled();
            expect(gameService.getNumOfConsecutiveVictories).toHaveBeenCalled();
            expect(gameService.getNumOfConsecutiveLoses).toHaveBeenCalled();
            expect(gameService.getNumOfConsecutiveDraws).toHaveBeenCalled();
        });

    });

    describe('numOfMatches', () => {

        it('should be 0 if there are no stored values yet in the local storage', () => {
            controller.$onInit();
            expect(controller.numOfMatches).toEqual(0);
        });

        it('should be equal to the value presents in the local storage', () => {
            spyOn(gameService, 'getNumOfMatches').and.returnValue(5);
            controller.$onInit();
            expect(controller.numOfMatches).toEqual(5);
        });

    });

    describe('numOfVictories', () => {

        it('should be 0 if there are no stored values yet in the local storage', () => {
            controller.$onInit();
            expect(controller.numOfVictories).toEqual(0);
        });

        it('should be equal to the value presents in the local storage', () => {
            spyOn(gameService, 'getNumOfVictories').and.returnValue(5);
            controller.$onInit();
            expect(controller.numOfVictories).toEqual(5);
        });

    });

    describe('numOfLoses', () => {

        it('should be 0 if there are no stored values yet in the local storage', () => {
            controller.$onInit();
            expect(controller.numOfLoses).toEqual(0);
        });

        it('should be equal to the value presents in the local storage', () => {
            spyOn(gameService, 'getNumOfLoses').and.returnValue(5);
            controller.$onInit();
            expect(controller.numOfLoses).toEqual(5);
        });

    });

    describe('numOfDraws', () => {

        it('should be 0 if there are no stored values yet in the local storage', () => {
            controller.$onInit();
            expect(controller.numOfDraws).toEqual(0);
        });

        it('should be equal to the value presents in the local storage', () => {
            spyOn(gameService, 'getNumOfDraws').and.returnValue(5);
            controller.$onInit();
            expect(controller.numOfDraws).toEqual(5);
        });

    });

    describe('numOfConsecutiveVictories', () => {

        it('should be 0 if there are no stored values yet in the local storage', () => {
            controller.$onInit();
            expect(controller.numOfConsecutiveVictories).toEqual(0);
        });

        it('should be equal to the value presents in the local storage', () => {
            spyOn(gameService, 'getNumOfConsecutiveVictories').and.returnValue(5);
            controller.$onInit();
            expect(controller.numOfConsecutiveVictories).toEqual(5);
        });

    });

    describe('numOfConsecutiveLoses', () => {

        it('should be 0 if there are no stored values yet in the local storage', () => {
            controller.$onInit();
            expect(controller.numOfConsecutiveLoses).toEqual(0);
        });

        it('should be equal to the value presents in the local storage', () => {
            spyOn(gameService, 'getNumOfConsecutiveLoses').and.returnValue(5);
            controller.$onInit();
            expect(controller.numOfConsecutiveLoses).toEqual(5);
        });

    });

    describe('numOfConsecutiveDraws', () => {

        it('should be 0 if there are no stored values yet in the local storage', () => {
            controller.$onInit();
            expect(controller.numOfConsecutiveDraws).toEqual(0);
        });

        it('should be equal to the value presents in the local storage', () => {
            spyOn(gameService, 'getNumOfConsecutiveDraws').and.returnValue(5);
            controller.$onInit();
            expect(controller.numOfConsecutiveDraws).toEqual(5);
        });

    });

});