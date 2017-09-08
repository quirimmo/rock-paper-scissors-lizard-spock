(function() {
    'use strict';

    angular.module('myApp').controller('PersonalProfileController', PersonalProfileController);

    function PersonalProfileController() {

        var vm = this;
        vm.$onInit = onInit;

        function onInit() {
            console.log('Init of personal profile controller');
        }

    }
})();