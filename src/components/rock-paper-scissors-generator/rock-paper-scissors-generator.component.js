/**
 * Rock Paper Scissors Generator Component
 * It is used in order to generate automatically an instance of a kind of game like rock-paper-scissors
 * It exposes two parameters to be passed when instantiating the component:
 * - pageTitle {String}: The title you want to show for your game instance
 * - availableChoices {Array}: An array of objects which represents all the actions you have in this instance of the game  
 */
(function() {
    'use strict';

    angular.module('myApp').component('rockPaperScissorsGenerator', {
        templateUrl: 'src/components/rock-paper-scissors-generator/rock-paper-scissors-generator.html',
        controller: 'RockPaperScissorsGeneratorController',
        controllerAs: 'vm',
        bindings: {
            pageTitle: '=',
            availableChoices: '='
        }
    });

})();