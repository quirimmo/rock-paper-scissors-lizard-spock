(function() {
    'use strict';

    angular.module('myApp').constant('GAME_CONSTANTS', {
        actions: [{
            id: 'rock',
            label: 'Rock',
            winsAgainst: [{
                id: 'scissors',
                term: 'crushes'
            }, {
                id: 'lizard',
                term: 'crushes'
            }],
            losesAgainst: [{
                id: 'paper',
                term: 'covered'
            }, {
                id: 'spock',
                term: 'vaporized'
            }, {
                id: 'chuck',
                term: 'killed'
            }]
        }, {
            id: 'paper',
            label: 'Paper',
            winsAgainst: [{
                id: 'rock',
                term: 'covers'
            }, {
                id: 'spock',
                term: 'disproves'
            }],
            losesAgainst: [{
                id: 'lizard',
                term: 'eaten'
            }, {
                id: 'scissors',
                term: 'cut'
            }, {
                id: 'chuck',
                term: 'killed'
            }]
        }, {
            id: 'scissors',
            label: 'Scissors',
            winsAgainst: [{
                id: 'paper',
                term: 'cuts'
            }, {
                id: 'lizard',
                term: 'decapitates'
            }],
            losesAgainst: [{
                id: 'rock',
                term: 'crushed'
            }, {
                id: 'spock',
                term: 'smashed'
            }, {
                id: 'chuck',
                term: 'killed'
            }]
        }, {
            id: 'lizard',
            label: 'Lizard',
            winsAgainst: [{
                id: 'spock',
                term: 'poisons'
            }, {
                id: 'paper',
                term: 'eats'
            }],
            losesAgainst: [{
                id: 'scissors',
                term: 'decapitated'
            }, {
                id: 'rock',
                term: 'crushed'
            }, {
                id: 'chuck',
                term: 'killed'
            }],
        }, {
            id: 'spock',
            label: 'Spock',
            winsAgainst: [{
                id: 'scissors',
                term: 'smashes'
            }, {
                id: 'rock',
                term: 'vaporizes'
            }],
            losesAgainst: [{
                id: 'paper',
                term: 'disproved'
            }, {
                id: 'lizard',
                term: 'poisoned'
            }, {
                id: 'chuck',
                term: 'killed'
            }]
        }, {
            id: 'chuck',
            label: 'Chuck Norris',
            winsAgainst: [{
                id: 'rock',
                term: 'kills'
            }, {
                id: 'paper',
                term: 'kills'
            }, {
                id: 'scissors',
                term: 'kills'
            }, {
                id: 'lizard',
                term: 'kills'
            }, {
                id: 'spock',
                term: 'kills'
            }],
            losesAgainst: []
        }]
    });

})();