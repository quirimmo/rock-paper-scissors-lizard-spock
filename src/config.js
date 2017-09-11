/**
 * Defining all the states of the application
 */
(function() {

    'use strict';

    angular.module('myApp').run(mainRun).config(config);

    function mainRun($rootScope, $transitions) {
        $transitions.onSuccess({ to: '*' }, function(trans) {
			$rootScope.pageTitle = trans._targetState._definition.data.title;
        });
    }

    function config($stateProvider, $urlRouterProvider) {
        // defining the personal profile page state
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
        // defining the rock paper scissors page state
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
        // defining the rock paper scissors lizard spock page state
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
        // defining the rock paper scissors lizard spock chuck state
        let rockPaperScissorsLizardSpockChuckState = {
            name: 'rock-paper-scissors-lizard-spock-chuck',
            url: '/rock-paper-scissors-lizard-spock-chuck',
            data: {
                title: 'Rock Paper Scissors Lizard Spock Chuck Norris'
            },
            templateUrl: 'src/templates/rock-paper-scissors-lizard-spock-chuck.html',
            controller: 'RockPaperScissorsLizardSpockChuckController',
            controllerAs: 'vm'
        };
        // registering all the defined states
        $stateProvider.state(mainState).state(rockPaperScissorsState).state(rockPaperScissorsLizardSpockState).state(rockPaperScissorsLizardSpockChuckState);
        // if you type some wrong URL in the browser, redirecting to the personal profile page
        $urlRouterProvider.otherwise('/');
    }

})();