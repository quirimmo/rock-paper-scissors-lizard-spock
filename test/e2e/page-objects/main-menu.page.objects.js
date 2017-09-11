/**
 * Class which holds all the main menu objects in order to be shared across the e2e spec files
 */
'use strict';  

module.exports = class MainMenuPage {

    constructor() {
        this.mainMenu = element(by.id('main-menu'));
        this.mainMenuItems = element.all(by.className('main-menu-items'));
    }

};