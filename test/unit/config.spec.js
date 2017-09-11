describe('config.js', () => {

    let $state, $rootScope, $location;

    beforeEach(() => {
        // injecting the needed modules
        module('myApp');
        module('partials');
        // injecting the needed dependencies
        inject((_$state_, _$rootScope_, _$location_) => {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $location = _$location_;
        });
    });

    describe('Home State', () => {

        it('should load the URL', () => {
            expect($state.href('home')).toEqual('#!/');
        });

        it('should go the state', () => {
            $location.url('/');
            $rootScope.$apply();
            expect($state.current.name).toEqual('home');
        });

        it('should return the URL as default if wrong url has been provided', () => {
            $location.url('nomatchedurl');
            $rootScope.$apply();
            expect($state.current.url).toEqual('/');
        });

    });

    describe('Rock Paper Scissors State', () => {

        it('should load the URL', () => {
            expect($state.href('rock-paper-scissors')).toEqual('#!/rock-paper-scissors');
        });

        it('should go the rock paper scissors state', () => {
            $location.url('/rock-paper-scissors');
            $rootScope.$apply();
            expect($state.current.name).toEqual('rock-paper-scissors');
        });

    });

    describe('Rock Paper Scissors Lizard Spock State', () => {

        it('should load the URL', () => {
            expect($state.href('rock-paper-scissors-lizard-spock')).toEqual('#!/rock-paper-scissors-lizard-spock');
        });

        it('should go the rock paper scissors lizard spock state', () => {
            $location.url('/rock-paper-scissors-lizard-spock');
            $rootScope.$apply();
            expect($state.current.name).toEqual('rock-paper-scissors-lizard-spock');
        });

    });

    describe('Rock Paper Scissors Lizard Spock Chuck State', () => {

        it('should load the URL', () => {
            expect($state.href('rock-paper-scissors-lizard-spock-chuck')).toEqual('#!/rock-paper-scissors-lizard-spock-chuck');
        });

        it('should go the rock paper scissors lizard spock chuck state', () => {
            $location.url('/rock-paper-scissors-lizard-spock-chuck');
            $rootScope.$apply();
            expect($state.current.name).toEqual('rock-paper-scissors-lizard-spock-chuck');
        });

    });

});