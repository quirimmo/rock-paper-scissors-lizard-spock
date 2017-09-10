(function() {
    'use strict';

    angular.module('myApp').controller('MainMenuController', MainMenuController);

    function MainMenuController($state, gameService, $mdDialog) {

        // bindings
        // activeItem: '='

        var vm = this;

        vm.disableInkBar;

        vm.isPersonalProfileActive = isPersonalProfileActive;
        vm.isRockPaperScissorActive = isRockPaperScissorActive;
        vm.isRockPaperScissorLizardSpockActive = isRockPaperScissorLizardSpockActive;
        vm.isRockPaperScissorLizardSpockChuckActive = isRockPaperScissorLizardSpockChuckActive;
        vm.openMobileMenu = openMobileMenu;
        vm.navigateTo = navigateTo;
        vm.restartGame = restartGame;
        vm.$onInit = onInit;

        // ==============================================================

        function onInit() {
            vm.selectedItem =
                vm.isRockPaperScissorActive() ?
                'rock-paper-scissors' :
                vm.isRockPaperScissorLizardSpockActive() ?
                'rock-paper-scissors-lizard-spock' :
                vm.isRockPaperScissorLizardSpockChuckActive() ?
                'rock-paper-scissors-lizard-spock-chuck' : 
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

        function isRockPaperScissorLizardSpockChuckActive() {
            return vm.activeItem === 'Rock Paper Scissors Lizard Spock Chuck';
        }

        function navigateTo(state) {
            $state.go(state);
        }

        function openMobileMenu($mdMenu, ev) {
            $mdMenu.open(ev);
        }

        function restartGame(ev) {
            gameService;
            var confirm = $mdDialog.confirm()
                .title('Do you really want to restart the game?')
                .textContent('Restarting the game you will loose all your current saved progresses and scores')
                .ariaLabel('Restart Game')
                .targetEvent(ev)
                .ok('Yes I do')
                .cancel('Nope I don\'t');

            $mdDialog.show(confirm).then(() => {
                gameService.restartGame();
            });
        }

    }
})();