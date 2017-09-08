describe('config.js', function() {

    let $state, $rootScope, $location;

    beforeEach(function() {
        module('myApp');
        module('partials');

        module(function($provide) {});

        inject(function(_$state_, _$rootScope_, _$location_) {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $location = _$location_;
        });

    });

    describe('Home State', function() {

        it('should load the URL', function() {
            expect($state.href('home')).toEqual('#!/');
        });

        it('should go the state', function() {
            $location.url('/');
            $rootScope.$apply();
            expect($state.current.name).toEqual('home');
        });

        it('should return the URL as default if wrong url has been provided', function() {
            $location.url('nomatchedurl');
            $rootScope.$apply();
            expect($state.current.url).toEqual('/');
        });

    });

    describe('Rock Paper Scissors State', function() {

        it('should load the URL', function() {
            expect($state.href('rock-paper-scissors')).toEqual('#!/rock-paper-scissors');
        });

        it('should go the rock paper scissors state', function() {
            $location.url('/rock-paper-scissors');
            $rootScope.$apply();
            expect($state.current.name).toEqual('rock-paper-scissors');
        });

    });

    describe('Rock Paper Scissors Lizard Spock State', function() {

        it('should load the URL', function() {
            expect($state.href('rock-paper-scissors-lizard-spock')).toEqual('#!/rock-paper-scissors-lizard-spock');
        });

        it('should go the home state', function() {
            $location.url('/rock-paper-scissors-lizard-spock');
            $rootScope.$apply();
            expect($state.current.name).toEqual('rock-paper-scissors-lizard-spock');
        });

    });

});