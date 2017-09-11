/**
 * Main Menu Component
 * Component used in order to show the main menu of the application
 * It manages both the menus: the one for bigger devices and the one for smaller devices
 * It is responsible also for marking the current active item on the menu based on the page you are 
 */
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