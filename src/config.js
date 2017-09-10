(function() {

    'use strict';

    angular.module('myApp').run(mainRun).config(config);

    function mainRun($rootScope, $transitions) {
        $transitions.onSuccess({ to: '*' }, function(trans) {
			$rootScope.pageTitle = trans._targetState._definition.data.title;
        });
    }

    function config($stateProvider, $urlRouterProvider) {
        let mainState = {
            name: 'home',
            url: '/',
            data: {
                title: 'Personal Profile Page'
            },
            templateUrl: 'src/templates/personal-profile.html',
            controller: 'PersonalProfileController',
            controllerAs: 'vm'
        };
        let rockPaperScissorsState = {
            name: 'rock-paper-scissors',
            url: '/rock-paper-scissors',
            data: {
                title: 'Rock Paper Scissors'
            },
            templateUrl: 'src/templates/rock-paper-scissors.html',
            controller: 'RockPaperScissorsController',
            controllerAs: 'vm'
		};
		let rockPaperScissorsLizardSpockState = {
            name: 'rock-paper-scissors-lizard-spock',
            url: '/rock-paper-scissors-lizard-spock',
            data: {
                title: 'Rock Paper Scissors Lizard Spock'
            },
            templateUrl: 'src/templates/rock-paper-scissors-lizard-spock.html',
            controller: 'RockPaperScissorsLizardSpockController',
            controllerAs: 'vm'
        };
        $stateProvider.state(mainState).state(rockPaperScissorsState).state(rockPaperScissorsLizardSpockState);
        $urlRouterProvider.otherwise('/');
    }



})();