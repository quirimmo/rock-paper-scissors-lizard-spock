describe('RockPaperScissorsLizardSpockChuckController', () => {

    let controller, gameEngineService, $scope;

    let defaultSubset = ['rock', 'paper', 'scissors', 'lizard', 'spock', 'chuck'];

    beforeEach(() => {
        // injecting the needed modules
        module('myApp');
        module('templates');
        // mocking the injected dependencies
        module(($provide) => {
            $provide.value('gameEngineService', {
                getRockPaperScissorsLizardSpockChuckSubset: () => {}
            });
        });
        // injecting the needed dependencies
        inject((_$rootScope_, _$controller_, _gameEngineService_) => {
            $scope = _$rootScope_.$new();
            gameEngineService = _gameEngineService_;
            controller = _$controller_('RockPaperScissorsLizardSpockChuckController', { $scope: $scope });
            spyOn(gameEngineService, 'getRockPaperScissorsLizardSpockChuckSubset').and.returnValue(defaultSubset);
            controller.$onInit();
        });
    });

    describe('initialization', () => {

        it('should define the exposed variables', () => {
            expect(controller.gameTitle).toEqual('Rock Paper Scissors Lizard Spock Chuck Norris');
            expect(controller.availableChoices).toEqual(defaultSubset);
        });

        it('should call the gameEngineService.getRockPaperScissorsLizardSpockChuckSubset method', () => {
            expect(gameEngineService.getRockPaperScissorsLizardSpockChuckSubset).toHaveBeenCalled();
        });

    });

});