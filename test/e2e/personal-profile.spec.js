describe('Personal Profile', () => {

    let numOfMatches = element(by.id('num-of-matches'));
    let numOfVictories = element(by.id('num-of-victories'));
    let numOfLoses = element(by.id('num-of-loses'));
    let numOfDraws = element(by.id('num-of-draws'));
    let consecutiveNumOfVictories = element(by.id('consecutive-num-of-victories'));
    let consecutiveNumOfLoses = element(by.id('consecutive-num-of-loses'));
    let consecutiveNumOfDraws = element(by.id('consecutive-num-of-draws'));

    beforeAll(() => {
        browser.get('/');
    });

    it('should display the number of matches', () => {
        numOfMatches.isDisplayed().should.become(true);
    });

    it('should display the number of victories', () => {
        numOfVictories.isDisplayed().should.become(true);
    });

    it('should display the number of loses', () => {
        numOfLoses.isDisplayed().should.become(true);
    });

    it('should display the number of draws', () => {
        numOfDraws.isDisplayed().should.become(true);
    });

    it('should display the maximum number of consecutive victories', () => {
        consecutiveNumOfVictories.isDisplayed().should.become(true);
    });

    it('should display the maximum number of consecutive loses', () => {
        consecutiveNumOfLoses.isDisplayed().should.become(true);
    });

    it('should display the maximum number of consecutive draws', () => {
        consecutiveNumOfDraws.isDisplayed().should.become(true);
    });

});