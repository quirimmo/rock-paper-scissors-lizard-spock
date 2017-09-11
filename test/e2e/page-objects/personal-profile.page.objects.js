'use strict';  

module.exports = class PersonalProfilePage {

    constructor() {
        this.numOfMatches = element(by.id('num-of-matches'));
        this.numOfVictories = element(by.id('num-of-victories'));
        this.numOfLoses = element(by.id('num-of-loses'));
        this.numOfDraws = element(by.id('num-of-draws'));
        this.consecutiveNumOfVictories = element(by.id('consecutive-num-of-victories'));
        this.consecutiveNumOfLoses = element(by.id('consecutive-num-of-loses'));
        this.consecutiveNumOfDraws = element(by.id('consecutive-num-of-draws'));
    }

};