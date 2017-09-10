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