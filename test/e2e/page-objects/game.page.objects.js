/**
 * Class which holds all the game pages objects in order to be shared across the e2e spec files
 */
'use strict';  

module.exports = class GamePage {

    constructor() {
        this.startGame = element(by.id('start-game'));
        this.simulateGame = element(by.id('simulate-game'));
        this.makeChoice = element(by.id('make-choices'));
        this.choicesItemsIcons = element.all(by.className('choice-item-icons'));
        this.chosenIcon = element(by.id('chosen-icon'));
        this.rockItem = element(by.id('choice-item-rock'));
        this.computerNotChosenIcon = element(by.id('computer-not-chosen-icon'));
        this.computerChosenIcon = element(by.id('computer-chosen-icon'));
        this.resultPanel = element(by.className('md-dialog-content'));
        this.mainResultMessage = element(by.css('.md-dialog-content .md-title'));
        this.contentResultMessage = element(by.css('.md-dialog-content .md-dialog-content-body'));
        this.closeResultPanelButton = element(by.className('md-confirm-button'));
    }

};