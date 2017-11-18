let MainMenuPage = require('./page-objects/main-menu.page.objects.js');
let mainMenuPage = new MainMenuPage();

fdescribe('Main Menu', () => {

    fdescribe('General', () => {

        beforeAll(() => {
            browser.get('/');
        });

        it('should be displayed', () => {
            mainMenuPage.mainMenu.isDisplayed().should.become(true);
        });

        it('should show the 5 menu items', () => {
            mainMenuPage.mainMenuItems.isDisplayed().should.become([true, true, true, true, true]);
        });

        it('should show the 5 menu labels', () => {
            mainMenuPage.mainMenuItems.getText().should.become(['MY PROFILE', 'ROCK PAPER SCISSORS', 'ROCK PAPER SCISSORS LIZARD SPOCK', 'CHUCK NORRIS', 'ETHAN']);
        });

        it('should navigate to the Personal Profile page', (done) => {
            mainMenuPage.mainMenuItems.get(0).click().then(() => {
                browser.getCurrentUrl().should.become('http://localhost:3000/#!/');
                done();
            });
        });

        it('should navigate to the Rock Paper Scissors page', (done) => {
            mainMenuPage.mainMenuItems.get(1).click().then(() => {
                browser.getCurrentUrl().should.become('http://localhost:3000/#!/rock-paper-scissors');
                done();
            });
        });

        it('should navigate to the Rock Paper Scissors Lizard Spock page', (done) => {
            mainMenuPage.mainMenuItems.get(2).click().then(() => {
                browser.getCurrentUrl().should.become('http://localhost:3000/#!/rock-paper-scissors-lizard-spock');
                done();
            });
        });

        it('should navigate to the Rock Paper Scissors Lizard Spock Chuck page', (done) => {
            mainMenuPage.mainMenuItems.get(3).click().then(() => {
                browser.getCurrentUrl().should.become('http://localhost:3000/#!/rock-paper-scissors-lizard-spock-chuck');
                done();
            });
        });

        it('should navigate to the Ethan page', (done) => {
            mainMenuPage.mainMenuItems.get(4).click().then(() => {
                browser.getCurrentUrl().should.become('http://localhost:3000/#!/ethan');
                done();
            });
        });

    });

    describe('Personal Profile Page', () => {

        beforeAll(() => {
            browser.get('/');
        });

        it('should be displayed', () => {
            mainMenuPage.mainMenu.isDisplayed().should.become(true);
        });

        it('should active the item corresponding to the personal profile page', () => {
            mainMenuPage.mainMenuItems.getAttribute('aria-selected').should.become(['true', 'false', 'false', 'false']);
        });

    });

    describe('RockPaperScissors Page', () => {

        beforeAll(() => {
            browser.get('#!/rock-paper-scissors');
        });

        it('should be displayed', () => {
            mainMenuPage.mainMenu.isDisplayed().should.become(true);
        });

        it('should active the item corresponding to the rock paper scissors page', () => {
            mainMenuPage.mainMenuItems.getAttribute('aria-selected').should.become(['false', 'true', 'false', 'false']);
        });

    });

    describe('RockPaperScissorsLizardSpock Page', () => {

        beforeAll(() => {
            browser.get('#!/rock-paper-scissors-lizard-spock');
        });

        it('should be displayed', () => {
            mainMenuPage.mainMenu.isDisplayed().should.become(true);
        });

        it('should active the item corresponding to the rock paper scissors lizard spock page', () => {
            mainMenuPage.mainMenuItems.getAttribute('aria-selected').should.become(['false', 'false', 'true', 'false']);
        });

    });

    describe('RockPaperScissorsLizardSpockChuck Page', () => {

        beforeAll(() => {
            browser.get('#!/rock-paper-scissors-lizard-spock-chuck');
        });

        it('should be displayed', () => {
            mainMenuPage.mainMenu.isDisplayed().should.become(true);
        });

        it('should active the item corresponding to the rock paper scissors lizard spock chuck page', () => {
            mainMenuPage.mainMenuItems.getAttribute('aria-selected').should.become(['false', 'false', 'false', 'true']);
        });

    });

});