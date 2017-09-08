fdescribe('config.js', function() {

    let $state, $rootScope, $httpBackend, $location;

    beforeEach(function() {
        module('myApp');

        module(function($provide) {});

        inject(function(_$state_, _$rootScope_, _$httpBackend_, _$location_) {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
            $location = _$location_;
            $httpBackend.whenGET(/(.*)/).respond(200, 'aaaaaaa');
        });

    });

    describe('Home State', function() {

        it('should load the URL', function() {
            expect($state.href('home')).toEqual('#!/');
            $httpBackend.flush();
        });

        it('should go the state', function() {
            $location.url('/');
            $rootScope.$apply();
            $httpBackend.flush();
            expect($state.current.name).toEqual('home');
        });

        it('should return the URL as default if wrong url has been provided', function() {
            $location.url('nomatchedurl');
            $rootScope.$apply();
            $httpBackend.flush();
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
            $httpBackend.flush();
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
            $httpBackend.flush();
            expect($state.current.name).toEqual('rock-paper-scissors-lizard-spock');
        });

    });

});