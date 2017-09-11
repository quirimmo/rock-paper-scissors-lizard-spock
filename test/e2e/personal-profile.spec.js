let PersonalProfilePage = require('./page-objects/personal-profile.page.objects.js');
let personalProfilePage = new PersonalProfilePage();

describe('Personal Profile', () => {

    beforeAll(() => {
        browser.get('/');
    });

    it('should display the number of matches', () => {
        personalProfilePage.numOfMatches.isDisplayed().should.become(true);
    });

    it('should display the number of victories', () => {
        personalProfilePage.numOfVictories.isDisplayed().should.become(true);
    });

    it('should display the number of loses', () => {
        personalProfilePage.numOfLoses.isDisplayed().should.become(true);
    });

    it('should display the number of draws', () => {
        personalProfilePage.numOfDraws.isDisplayed().should.become(true);
    });

    it('should display the maximum number of consecutive victories', () => {
        personalProfilePage.consecutiveNumOfVictories.isDisplayed().should.become(true);
    });

    it('should display the maximum number of consecutive loses', () => {
        personalProfilePage.consecutiveNumOfLoses.isDisplayed().should.become(true);
    });

    it('should display the maximum number of consecutive draws', () => {
        personalProfilePage.consecutiveNumOfDraws.isDisplayed().should.become(true);
    });

});