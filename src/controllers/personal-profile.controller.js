(function() {
    'use strict';

    angular.module('myApp').controller('PersonalProfileController', PersonalProfileController);

    function PersonalProfileController() {

        var vm = this;

        // using the reveal patter defining at the beginning all the used variables inside the view
        vm.numOfMatches;
        vm.numOfVictories;
        vm.numOfLoses;
        vm.numOfDraws;
        vm.consecutiveNumOfVictories;
        vm.consecutiveNumOfLoses;
        vm.consecutiveNumOfDraws;

        vm.$onInit = onInit;

        function onInit() {
            
        }

    }
})();