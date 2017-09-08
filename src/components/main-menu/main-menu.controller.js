(function() {
    'use strict';

    angular.module('myApp').controller('MainMenuController', MainMenuController);

    function MainMenuController() {

        // bindings
        // activeItem: '='

        var vm = this;

        vm.isPersonalProfileActive = isPersonalProfileActive;
        vm.isRockPaperScissorActive = isRockPaperScissorActive;
        vm.isRockPaperScissorLizardSpockActive = isRockPaperScissorLizardSpockActive;
        

        function isPersonalProfileActive() {
            return vm.activeItem === 'Personal Profile';
        }
        
        function isRockPaperScissorActive() {
            return vm.activeItem === 'Rock Paper Scissors';
        }

        function isRockPaperScissorLizardSpockActive() {
            return vm.activeItem === 'Rock Paper Scissors Lizard Spock';
        }

    }
})();