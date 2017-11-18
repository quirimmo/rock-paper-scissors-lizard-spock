(function() {
    'use strict';

    angular.module('myApp').controller('MainMenuController', MainMenuController);

    MainMenuController.$inject = ['$state', 'gameService', '$mdDialog'];

    function MainMenuController($state, gameService, $mdDialog) {

        // bindings
        // activeItem: '='

        var vm = this;

        vm.isPersonalProfileActive = isPersonalProfileActive;
        vm.isRockPaperScissorActive = isRockPaperScissorActive;
        vm.isRockPaperScissorLizardSpockActive = isRockPaperScissorLizardSpockActive;
        vm.isRockPaperScissorLizardSpockChuckActive = isRockPaperScissorLizardSpockChuckActive;
        vm.isEthanActive = isEthanActive;
        vm.openMobileMenu = openMobileMenu;
        vm.navigateTo = navigateTo;
        vm.restartGame = restartGame;
        vm.$onInit = onInit;

        // ==============================================================

        function onInit() {
            // init the current selected item of the menu based on the page you are actually in
            // lot of people hate ternary operator nested, but I actually love it when the operations you are going to do are simple assignments based on conditions
            vm.selectedItem =
                vm.isRockPaperScissorActive() ?
                'rock-paper-scissors' :
                vm.isRockPaperScissorLizardSpockActive() ?
                'rock-paper-scissors-lizard-spock' :
                vm.isRockPaperScissorLizardSpockChuckActive() ?
                'rock-paper-scissors-lizard-spock-chuck' : 
                vm.isEthanActive() ?
                'ethan' : 
                'personal-profile';
        }

        /**
         * A function used in order to know if you are in the Personal Profile Page. 
         * It is just for readability. I love to have boolean conditions expressed through functions in order to improve the readability of the code
         * It makes easier from reading the code where they are used, what you are expecting from that check simply reading the name of the functions, 
         * avoiding to focus on the expression they are checking
         * @returns {Boolean} True if the current page is the Personal Profile page 
         */
        function isPersonalProfileActive() {
            return vm.activeItem === 'Personal Profile';
        }

        /**
         * A function used in order to know if you are in the Rock Paper Scissors Page. 
         * @returns {Boolean} True if the current page is the Rock Paper Scissors page 
         */
        function isRockPaperScissorActive() {
            return vm.activeItem === 'Rock Paper Scissors';
        }

        /**
         * A function used in order to know if you are in the Rock Paper Scissors Lizard Spock Page. 
         * @returns {Boolean} True if the current page is the Rock Paper Scissors Lizard Spock page 
         */
        function isRockPaperScissorLizardSpockActive() {
            return vm.activeItem === 'Rock Paper Scissors Lizard Spock';
        }

        /**
         * A function used in order to know if you are in the Rock Paper Scissors Lizard Spock Chuck Norris Page. 
         * @returns {Boolean} True if the current page is the Rock Paper Scissors Lizard Spock Chuck Norris page 
         */
        function isRockPaperScissorLizardSpockChuckActive() {
            return vm.activeItem === 'Rock Paper Scissors Lizard Spock Chuck Norris';
        }

        /**
         * A function used in order to know if you are in the Ethan Page. 
         * @returns {Boolean} True if the current page is the Ethan page 
         */
        function isEthanActive() {
            return vm.activeItem === 'Ethan';
        }

        /**
         * Navigate to the page corresponding to the provided state
         * @param {String} state The name of the state where you want to go  
         */
        function navigateTo(state) {
            $state.go(state);
        }

        /**
         * Open the mobile menu
         * @param {Object} $mdMenu Instance of the $mdMenu component of Angular Material
         * @param {Object} ev The firing event 
         */
        function openMobileMenu($mdMenu, ev) {
            $mdMenu.open(ev);
        }

        /**
         * Action performed when you click on the Restart button of the menu
         * It shows a confirmation dialog and if confirmed, it calls the gameService.restartGame method in order to perform a restart
         * @param {Object} ev The firing event 
         */
        function restartGame(ev) {
            // create a confirm dialog through $mdDialog of angular material passing all the options of the dialog
            var confirm = $mdDialog.confirm()
                .title('Do you really want to restart the game?')
                .textContent('Restarting the game you will loose all your current saved progresses and scores')
                .ariaLabel('Restart Game')
                .targetEvent(ev)
                .ok('Yes I do')
                .cancel('Nope I don\'t');

            $mdDialog.show(confirm).then(() => {
                // call the restart game method on the game service
                gameService.restartGame();
                // if you are already in the personal profile page, reload the state in order to reflect changes
                if ($state.current.name === 'home') {
                    $state.reload();
                }
            });
        }

    }
})();