describe('MainMenuComponent', () => {

    let $componentController, controller, $state, gameService, $mdDialog, $q, $scope;

    let mocked$alertCancel = () => {};
    let mocked$alertOK = () => ({ cancel: mocked$alertCancel });
    let mocked$targetEvent = () => ({ ok: mocked$alertOK });
    let mocked$alertAriaLabel = () => ({ targetEvent: mocked$targetEvent });
    let mocked$alertTextContent = () => ({ ariaLabel: mocked$alertAriaLabel });
    let mocked$alertTitle = () => ({ textContent: mocked$alertTextContent });
    let mocked$confirm = { title: mocked$alertTitle };

    beforeEach(module('myApp'));
    beforeEach(module('partials'));

    beforeEach(module(($provide) => {
        $provide.value(gameService, {
            restartGame: () => {}
        });
        $provide.value($mdDialog, {
            show: () => {},
            confirm: () => {}
        });
    }));

    beforeEach(inject((_$rootScope_, _$componentController_, _$state_, _gameService_, _$mdDialog_, _$q_) => {
        $scope = _$rootScope_.$new();
        $state = _$state_;
        $componentController = _$componentController_;
        gameService = _gameService_;
        $mdDialog = _$mdDialog_;
        $q = _$q_;
    }));

    describe('init', () => {

        beforeEach(() => {
            controller = $componentController('mainMenu', null, {
                activeItem: 'blablabla'
            });
        });

        it('should init the bindings', () => {
            expect(controller.activeItem).toEqual('blablabla');
        });

        it('should init the exposed functions', () => {
            expect(controller.isPersonalProfileActive).toEqual(jasmine.any(Function));
            expect(controller.isRockPaperScissorActive).toEqual(jasmine.any(Function));
            expect(controller.isRockPaperScissorLizardSpockActive).toEqual(jasmine.any(Function));
            expect(controller.openMobileMenu).toEqual(jasmine.any(Function));
            expect(controller.navigateTo).toEqual(jasmine.any(Function));
            expect(controller.restartGame).toEqual(jasmine.any(Function));
        });

    });

    describe('restartGame', () => {

        beforeEach(() => {
            controller = $componentController('mainMenu', null, {
                activeItem: 'Personal Profile'
            });
            spyOn($mdDialog, 'confirm').and.returnValue(mocked$confirm);
            spyOn(gameService, 'restartGame').and.callThrough();
        });

        it('should show the confirm dialog', () => {
            spyOn($mdDialog, 'show').and.callThrough();
            controller.restartGame();
            $scope.$apply();
            expect($mdDialog.confirm).toHaveBeenCalled();
            expect($mdDialog.show).toHaveBeenCalled();
        });

        it('should not call the gameService.restartGame method if you didn\'t confirm the dialog', () => {
            spyOn($mdDialog, 'show').and.callThrough();
            controller.restartGame();
            $scope.$apply();
            expect(gameService.restartGame).not.toHaveBeenCalled();
        });

        it('should call the gameService.restartGame method if you confirmed the dialog', () => {
            spyOn($mdDialog, 'show').and.returnValue($q.resolve());
            controller.restartGame();
            $scope.$apply();
            expect(gameService.restartGame).toHaveBeenCalled();
        });

    });

    describe('Personal Profile', () => {

        beforeEach(() => {
            controller = $componentController('mainMenu', null, {
                activeItem: 'Personal Profile'
            });
        });

        describe('activeItem', () => {
            it('should be equal to Personal Profile', () => {
                expect(controller.activeItem).toEqual('Personal Profile');
            });
        });

        describe('isPersonalProfileActive', () => {
            it('should be true', () => {
                expect(controller.isPersonalProfileActive()).toEqual(true);
            });
        });

        describe('isRockPaperScissorActive', () => {
            it('should be false', () => {
                expect(controller.isRockPaperScissorActive()).toEqual(false);
            });
        });

        describe('isRockPaperScissorLizardSpockActive', () => {
            it('should be false', () => {
                expect(controller.isRockPaperScissorLizardSpockActive()).toEqual(false);
            });
        });

    });

    describe('Rock Paper Scissors', () => {

        beforeEach(() => {
            controller = $componentController('mainMenu', null, {
                activeItem: 'Rock Paper Scissors'
            });
        });

        describe('activeItem', () => {
            it('should be equal to Rock Paper Scissors', () => {
                expect(controller.activeItem).toEqual('Rock Paper Scissors');
            });
        });

        describe('isPersonalProfileActive', () => {
            it('should be false', () => {
                expect(controller.isPersonalProfileActive()).toEqual(false);
            });
        });

        describe('isRockPaperScissorActive', () => {
            it('should be true', () => {
                expect(controller.isRockPaperScissorActive()).toEqual(true);
            });
        });

        describe('isRockPaperScissorLizardSpockActive', () => {
            it('should be false', () => {
                expect(controller.isRockPaperScissorLizardSpockActive()).toEqual(false);
            });
        });

    });

    describe('Rock Paper Scissors Lizard Spock', () => {

        beforeEach(() => {
            controller = $componentController('mainMenu', null, {
                activeItem: 'Rock Paper Scissors Lizard Spock'
            });
        });

        describe('activeItem', () => {
            it('should be equal to Rock Paper Scissors Lizard Spock', () => {
                expect(controller.activeItem).toEqual('Rock Paper Scissors Lizard Spock');
            });
        });

        describe('isPersonalProfileActive', () => {
            it('should be false', () => {
                expect(controller.isPersonalProfileActive()).toEqual(false);
            });
        });

        describe('isRockPaperScissorActive', () => {
            it('should be false', () => {
                expect(controller.isRockPaperScissorActive()).toEqual(false);
            });
        });

        describe('isRockPaperScissorLizardSpockActive', () => {
            it('should be true', () => {
                expect(controller.isRockPaperScissorLizardSpockActive()).toEqual(true);
            });
        });

    });

    describe('Rock Paper Scissors Lizard Spock Chuck', () => {

        beforeEach(() => {
            controller = $componentController('mainMenu', null, {
                activeItem: 'Rock Paper Scissors Lizard Spock Chuck'
            });
        });

        describe('activeItem', () => {
            it('should be equal to Rock Paper Scissors Lizard Spock Chuck', () => {
                expect(controller.activeItem).toEqual('Rock Paper Scissors Lizard Spock Chuck');
            });
        });

        describe('isPersonalProfileActive', () => {
            it('should be false', () => {
                expect(controller.isPersonalProfileActive()).toEqual(false);
            });
        });

        describe('isRockPaperScissorActive', () => {
            it('should be false', () => {
                expect(controller.isRockPaperScissorActive()).toEqual(false);
            });
        });

        describe('isRockPaperScissorLizardSpockActive', () => {
            it('should be false', () => {
                expect(controller.isRockPaperScissorLizardSpockActive()).toEqual(false);
            });
        });

        describe('isRockPaperScissorLizardSpockChuckActive', () => {
            it('should be true', () => {
                expect(controller.isRockPaperScissorLizardSpockChuckActive()).toEqual(true);
            });
        });

    });

    describe('openMobileMenu', () => {

        let menuInstance = {
            open: () => {}
        };

        beforeEach(() => {
            controller = $componentController('mainMenu', null, {
                activeItem: 'Personal Profile'
            });
            spyOn(menuInstance, 'open');
            controller.openMobileMenu(menuInstance, 'event');
        });

        it('should trigger the $mdMenu.open method', () => {
            expect(menuInstance.open).toHaveBeenCalledWith('event');
        });

    });

    describe('navigateTo', () => {

        beforeEach(() => {
            controller = $componentController('mainMenu', null, {
                activeItem: 'Personal Profile'
            });
            spyOn($state, 'go');
            controller.navigateTo('mystate');
        });

        it('should trigger the $state.go method', () => {
            expect($state.go).toHaveBeenCalledWith('mystate');
        });

    });

});