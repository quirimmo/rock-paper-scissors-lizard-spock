describe('trainInfoItem', function() {

    let $componentController, controller, $state;

    beforeEach(module('myApp'));
    beforeEach(module('partials'));

    beforeEach(module(function($provide) {}));

    beforeEach(inject(function(_$componentController_, _$state_) {
        $state = _$state_;
        $componentController = _$componentController_;
    }));

    describe('init', function() {

        beforeEach(() => {
            controller = $componentController('mainMenu', null, {
                activeItem: 'blablabla'
            });
        });

        it('should init the bindings', function() {
            expect(controller.activeItem).toEqual('blablabla');
        });

        it('should init the exposed functions', function() {
            expect(controller.isPersonalProfileActive).toEqual(jasmine.any(Function));
            expect(controller.isRockPaperScissorActive).toEqual(jasmine.any(Function));
            expect(controller.isRockPaperScissorLizardSpockActive).toEqual(jasmine.any(Function));
            expect(controller.openMobileMenu).toEqual(jasmine.any(Function));
            expect(controller.navigateTo).toEqual(jasmine.any(Function));
        });

    });

    describe('Personal Profile', function() {

        beforeEach(() => {
            controller = $componentController('mainMenu', null, {
                activeItem: 'Personal Profile'
            });
        });

        describe('activeItem', () => {
            it('should be equal to Personal Profile', function() {
                expect(controller.activeItem).toEqual('Personal Profile');
            });
        });

        describe('isPersonalProfileActive', () => {
            it('should be true', function() {
                expect(controller.isPersonalProfileActive()).toEqual(true);
            });
        });

        describe('isRockPaperScissorActive', () => {
            it('should be false', function() {
                expect(controller.isRockPaperScissorActive()).toEqual(false);
            });
        });

        describe('isRockPaperScissorLizardSpockActive', () => {
            it('should be false', function() {
                expect(controller.isRockPaperScissorLizardSpockActive()).toEqual(false);
            });
        });

    });

    describe('Rock Paper Scissors', function() {

        beforeEach(() => {
            controller = $componentController('mainMenu', null, {
                activeItem: 'Rock Paper Scissors'
            });
        });

        describe('activeItem', () => {
            it('should be equal to Rock Paper Scissors', function() {
                expect(controller.activeItem).toEqual('Rock Paper Scissors');
            });
        });

        describe('isPersonalProfileActive', () => {
            it('should be false', function() {
                expect(controller.isPersonalProfileActive()).toEqual(false);
            });
        });

        describe('isRockPaperScissorActive', () => {
            it('should be true', function() {
                expect(controller.isRockPaperScissorActive()).toEqual(true);
            });
        });

        describe('isRockPaperScissorLizardSpockActive', () => {
            it('should be false', function() {
                expect(controller.isRockPaperScissorLizardSpockActive()).toEqual(false);
            });
        });

    });

    describe('Rock Paper Scissors Lizard Spock', function() {

        beforeEach(() => {
            controller = $componentController('mainMenu', null, {
                activeItem: 'Rock Paper Scissors Lizard Spock'
            });
        });

        describe('activeItem', () => {
            it('should be equal to Rock Paper Scissors Lizard Spock', function() {
                expect(controller.activeItem).toEqual('Rock Paper Scissors Lizard Spock');
            });
        });

        describe('isPersonalProfileActive', () => {
            it('should be false', function() {
                expect(controller.isPersonalProfileActive()).toEqual(false);
            });
        });

        describe('isRockPaperScissorActive', () => {
            it('should be false', function() {
                expect(controller.isRockPaperScissorActive()).toEqual(false);
            });
        });

        describe('isRockPaperScissorLizardSpockActive', () => {
            it('should be true', function() {
                expect(controller.isRockPaperScissorLizardSpockActive()).toEqual(true);
            });
        });

    });

    describe('openMobileMenu', function() {

        beforeEach(() => {
            controller = $componentController('mainMenu', null, {
                activeItem: 'Personal Profile'
            });
        });

        it('should trigger the $mdMenu.open method', () => {
            let menuInstance = {
                open: function() {}
            };
            spyOn(menuInstance, 'open');
            controller.openMobileMenu(menuInstance, 'event');
            expect(menuInstance.open).toHaveBeenCalledWith('event');
        });

    });

    describe('navigateTo', function() {

        beforeEach(() => {
            controller = $componentController('mainMenu', null, {
                activeItem: 'Personal Profile'
            });
        });

        it('should trigger the $state.go method', () => {
            spyOn($state, 'go');
            controller.navigateTo('mystate');
            expect($state.go).toHaveBeenCalledWith('mystate');
        });

    });

});