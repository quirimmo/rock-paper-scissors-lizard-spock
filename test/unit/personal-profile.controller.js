describe('MainController', function() {

    let controller, gameService;

    beforeEach(function() {
        module('myApp');
        module('templates');

        module(function($provide) {
            $provide('gameService', {
                getNumOfVictories: function() {},
                getNumOfLoses: function() {},
                getNumOfDraws: function() {},
                getNumOfConsecutiveVictories: function() {},
                getNumOfConsecutiveLoses: function() {},
                getNumOfConsecutiveDraws: function() {}
            });
        });

        inject(function(_$rootScope_, _$controller_, _gameService_) {
            let $scope = _$rootScope_.$new();
            gameService = _gameService_;
            controller = _$controller_('PersonalProfileController', { $scope: $scope });
        });
    });

    describe('initialization', () => {

        it('should define the exposed variables', () => {
            controller.$onInit();
            expect(controller.numOfVictories).toBeDefined();
            expect(controller.numOfLoses).toBeDefined();
            expect(controller.numOfDraws).toBeDefined();
            expect(controller.consecutiveNumOfVictories).toBeDefined();
            expect(controller.consecutiveNumOfLoses).toBeDefined();
            expect(controller.consecutiveNumOfDraws).toBeDefined();
        });

        it('should call the methods in order to retrieve the stored values in the local storage', () => {
            spyOn(gameService, 'getNumOfVictories').and.callThrough();
            spyOn(gameService, 'getNumOfLoses').and.callThrough();
            spyOn(gameService, 'getNumOfDraws').and.callThrough();
            spyOn(gameService, 'getNumOfConsecutiveVictories').and.callThrough();
            spyOn(gameService, 'getNumOfConsecutiveLoses').and.callThrough();
            spyOn(gameService, 'getNumOfConsecutiveDraws').and.callThrough();

            controller.$onInit();

            expect(gameService.getNumOfVictories).toHaveBeenCalled();
            expect(gameService.getNumOfLoses).toHaveBeenCalled();
            expect(gameService.getNumOfDraws).toHaveBeenCalled();
            expect(gameService.getNumOfConsecutiveVictories).toHaveBeenCalled();
            expect(gameService.getNumOfConsecutiveLoses).toHaveBeenCalled();
            expect(gameService.getNumOfConsecutiveDraws).toHaveBeenCalled();
        });

    });

    describe('numOfVictories', () => {

        beforeAll(() => {
            controller.$onInit();
        });

        it('should be 0 if there are no stored values yet in the local storage', () => {
            expect(controller.numOfVictories).toEqual(0);
        });

        it('should be equal to the value presents in the local storage', () => {
            spyOn(gameService, 'getNumOfVictories').and.returnValue(5);
            expect(controller.numOfVictories).toEqual(5);
        });

    });

    describe('numOfLoses', () => {

        beforeAll(() => {
            controller.$onInit();
        });

        it('should be 0 if there are no stored values yet in the local storage', () => {
            expect(controller.numOfLoses).toEqual(0);
        });

        it('should be equal to the value presents in the local storage', () => {
            spyOn(gameService, 'getNumOfLoses').and.returnValue(5);
            expect(controller.numOfLoses).toEqual(5);
        });

    });

    describe('numOfDraws', () => {

        beforeAll(() => {
            controller.$onInit();
        });

        it('should be 0 if there are no stored values yet in the local storage', () => {
            expect(controller.numOfDraws).toEqual(0);
        });

        it('should be equal to the value presents in the local storage', () => {
            spyOn(gameService, 'getNumOfDraws').and.returnValue(5);
            expect(controller.numOfDraws).toEqual(5);
        });

    });

    describe('numOfConsecutiveVictories', () => {

        beforeAll(() => {
            controller.$onInit();
        });

        it('should be 0 if there are no stored values yet in the local storage', () => {
            expect(controller.numOfConsecutiveVictories).toEqual(0);
        });

        it('should be equal to the value presents in the local storage', () => {
            spyOn(gameService, 'getNumOfConsecutiveVictories').and.returnValue(5);
            expect(controller.numOfConsecutiveVictories).toEqual(5);
        });

    });

    describe('numOfConsecutiveLoses', () => {

        beforeAll(() => {
            controller.$onInit();
        });

        it('should be 0 if there are no stored values yet in the local storage', () => {
            expect(controller.numOfConsecutiveLoses).toEqual(0);
        });

        it('should be equal to the value presents in the local storage', () => {
            spyOn(gameService, 'getNumOfConsecutiveLoses').and.returnValue(5);
            expect(controller.numOfConsecutiveLoses).toEqual(5);
        });

    });

    describe('numOfConsecutiveDraws', () => {

        beforeAll(() => {
            controller.$onInit();
        });

        it('should be 0 if there are no stored values yet in the local storage', () => {
            expect(controller.numOfConsecutiveDraws).toEqual(0);
        });

        it('should be equal to the value presents in the local storage', () => {
            spyOn(gameService, 'getNumOfConsecutiveDraws').and.returnValue(5);
            expect(controller.numOfConsecutiveDraws).toEqual(5);
        });

    });

});