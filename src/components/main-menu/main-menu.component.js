(function() {
    'use strict';

    angular.module('myApp').component('mainMenu', {
        // templateUrl: 'src/components/train-info-item/train-info-item.html',
        controller: 'MainMenuController',
        controllerAs: 'vm',
        bindings: {
            activeItem: '='
        }
    });

})();