(function() {

    'use strict';

    angular.module('myApp').config(config);
	
	function config($stateProvider, $urlRouterProvider) {
		let mainState = {
            name: 'home',
            url: '/'
            // templateUrl: 'src/templates/main.html',
            // controller: 'HomeController',
            // controllerAs: 'vm'
        };
        $stateProvider.state(mainState);
        $urlRouterProvider.otherwise('/');
	}

})();