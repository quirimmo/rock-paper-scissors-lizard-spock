(function() {
    'use strict';

    angular.module('myApp').controller('MainMenuController', MainMenuController);

    function MainMenuController($state) {

        // bindings
        // activeItem: '='

        var vm = this;

        vm.isPersonalProfileActive = isPersonalProfileActive;
        vm.isRockPaperScissorActive = isRockPaperScissorActive;
        vm.isRockPaperScissorLizardSpockActive = isRockPaperScissorLizardSpockActive;
        vm.openMobileMenu = openMobileMenu;
        vm.navigateTo = navigateTo;
        vm.$onInit = onInit;


        function onInit() {
            vm.selectedItem =
                vm.isRockPaperScissorActive() ?
                'rock-paper-scissors' :
                vm.isRockPaperScissorLizardSpockActive() ? 
                'rock-paper-scissors-lizard-spock' :
                'personal-profile';
        }

        function isPersonalProfileActive() {
            return vm.activeItem === 'Personal Profile';
        }

        function isRockPaperScissorActive() {
            return vm.activeItem === 'Rock Paper Scissors';
        }

        function isRockPaperScissorLizardSpockActive() {
            return vm.activeItem === 'Rock Paper Scissors Lizard Spock';
        }

        function navigateTo(state) {
            $state.go(state);
        }

        function openMobileMenu($mdMenu, ev) {
            $mdMenu.open(ev);
        }

    }
})();