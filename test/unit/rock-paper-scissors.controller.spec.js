describe('RockPaperScissorsController', () => {

    let controller, gameEngineService, $scope;

    let defaultSubset = ['rock', 'paper', 'scissors'];

    beforeEach(() => {
        // injecting the needed modules
        module('myApp');
        module('templates');
        // mocking the injected dependencies
        module(($provide) => {
            $provide.value('gameEngineService', {
                getRockPaperScissorsSubset: () => {}
            });
        });
        // injecting the needed dependencies
        inject((_$rootScope_, _$controller_, _gameEngineService_) => {
            $scope = _$rootScope_.$new();
            gameEngineService = _gameEngineService_;
            controller = _$controller_('RockPaperScissorsController', { $scope: $scope });
            spyOn(gameEngineService, 'getRockPaperScissorsSubset').and.returnValue(defaultSubset);
            controller.$onInit();
        });
    });

    describe('initialization', () => {

        it('should define the exposed variables', () => {
            expect(controller.gameTitle).toEqual('Rock Paper Scissors');
            expect(controller.availableChoices).toEqual(defaultSubset);
        });

        it('should call the gameEngineService.getRockPaperScissorsSubset method', () => {
            expect(gameEngineService.getRockPaperScissorsSubset).toHaveBeenCalled();
        });

    });

});