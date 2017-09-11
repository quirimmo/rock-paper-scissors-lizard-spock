/**
 * GAME CONSTANTS
 * An object which holds all the available actions you inside all your games
 * An action (so an available choice for the game) is an object composed by:
 * - id {String} The id of the current action. It is used for identifying the action. It is also used for retrieving the action icon. In the assets/images folder you provide an icon called with "id.png" name convention, and this will be automatically associated to this action
 * - label {String} The label to be shown for the action, when displayed in the choices or used when showing the result of the match
 * - winsAgainst {Array} An array of objects of all the actions that will loose against the current action. A winsAgainst object is so composed:
 *      - id: The id of the loosing action
 *      - term: The verb specifying how the current action wins against this element
 * - losesAgainst {Array} An array of objects of all the actions that will win against the current action. A losesAgainst object is so composed:
 *      - id: The id of the winning action
 *      - term: The verb specifying how the current actions loses against this element. The passive "has been ... by" will be automatically added by the system
 * 
 * As assumption, all the actions will draw against themselves. 
 * You could change this behavior adding a new drawsAgainst Array, but it actually makes totally no sense that an action doesn't draw against itself
 * 
 * At the moment 6 actions are supported:
 *  - Rock
 *  - Paper
 *  - Scissors
 *  - Lizard
 *  - Spock
 *  - Chuck Norris 
 */
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