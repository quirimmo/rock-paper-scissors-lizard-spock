describe('trainInfoItem', function() {

    let $componentController, controller;

    beforeEach(module('myApp'));
    beforeEach(module('templates'));

    beforeEach(module(function($provide) {}));

    beforeEach(inject(function(_$componentController_) {
        $componentController = _$componentController_;
    }));

    describe('init', function() {

        beforeAll(() => {
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
        });

    });

    describe('Personal Profile', function() {

        beforeAll(() => {
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

        beforeAll(() => {
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

        beforeAll(() => {
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

});