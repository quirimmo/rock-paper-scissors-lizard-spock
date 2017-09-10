(function() {
    'use strict';

    angular.module('myApp').controller('AvailableChoicesPanelController', AvailableChoicesPanelController);

    function AvailableChoicesPanelController(availableChoices, chooseAction) {

        var vm = this;

        vm.availableChoices = availableChoices;
        vm.chooseAction = chooseAction;
        
    }
})();