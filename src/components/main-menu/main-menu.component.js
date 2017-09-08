(function() {
    'use strict';

    angular.module('myApp').component('mainMenu', {
        templateUrl: 'src/components/main-menu/main-menu.html',
        controller: 'MainMenuController',
        controllerAs: 'vm',
        bindings: {
            activeItem: '='
        }
    });

})();