/**
 * Controller associated to the $mdBottomSheet panel 
 * It is just responsible for holding the passed values into the corresponding template of the panel.
 * Parameters are: 
 *  - availableChoices {Array} An array of Objects with the current actions to be shown to the user to be picked
 *  - chooseAction {Function} A callback to be triggered when the user selects one of these actions
 */
(function() {
    'use strict';

    angular.module('myApp').controller('AvailableChoicesPanelController', AvailableChoicesPanelController);

    AvailableChoicesPanelController.$inject = ['availableChoices', 'chooseAction'];    

    function AvailableChoicesPanelController(availableChoices, chooseAction) {

        var vm = this;

        vm.availableChoices = availableChoices;
        vm.chooseAction = chooseAction;
        
    }
})();