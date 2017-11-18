describe('EthanController', () => {

    let controller, gameEngineService, $scope;

    let defaultSubset = ['ethan'];

    beforeEach(() => {
        // injecting the needed modules
        module('myApp');
        module('templates');
        // mocking the injected dependencies
        module(($provide) => {
            $provide.value('gameEngineService', {
                getEthanSubset: () => {}
            });
        });
        // injecting the needed dependencies
        inject((_$rootScope_, _$controller_, _gameEngineService_) => {
            $scope = _$rootScope_.$new();
            gameEngineService = _gameEngineService_;
            controller = _$controller_('EthanController', { $scope: $scope });
            spyOn(gameEngineService, 'getEthanSubset').and.returnValue(defaultSubset);
            controller.$onInit();
        });
    });

    describe('initialization', () => {

        it('should define the exposed variables', () => {
            expect(controller.gameTitle).toEqual('Ethan');
            expect(controller.availableChoices).toEqual(defaultSubset);
        });

        it('should call the gameEngineService.getEthanSubset method', () => {
            expect(gameEngineService.getEthanSubset).toHaveBeenCalled();
        });

    });

});