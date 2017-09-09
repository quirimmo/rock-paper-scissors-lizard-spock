(function() {
    'use strict';

    angular.module('myApp').controller('AvailableChoicesPanelController', AvailableChoicesPanelController);

    function AvailableChoicesPanelController(availableChoices) {

        var vm = this;

        vm.availableChoices = availableChoices;

    }
})();