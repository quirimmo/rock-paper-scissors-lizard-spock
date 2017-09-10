describe('Main Menu', () => {

    let mainMenu = element(by.id('main-menu'));
    let mainMenuItems = element.all(by.className('main-menu-items'));


    describe('General', () => {

        beforeAll(() => {
            browser.get('/');
        });

        it('should be displayed', () => {
            mainMenu.isDisplayed().should.become(true);
        });

        it('should show the 4 menu items', () => {
            mainMenuItems.isDisplayed().should.become([true, true, true, true]);
        });

        it('should show the 4 menu labels', () => {
            mainMenuItems.getText().should.become(['PERSONAL PROFILE', 'ROCK PAPER SCISSORS', 'ROCK PAPER SCISSORS LIZARD SPOCK', 'ROCK PAPER SCISSORS LIZARD SPOCK CHUCK']);
        });

        it('should navigate to the Personal Profile page', (done) => {
            mainMenuItems.get(0).click().then(() => {
                browser.getCurrentUrl().should.become('http://localhost:3000/#!/');
                done();
            });
        });

        it('should navigate to the Rock Paper Scissors page', (done) => {
            mainMenuItems.get(1).click().then(() => {
                browser.getCurrentUrl().should.become('http://localhost:3000/#!/rock-paper-scissors');
                done();
            });
        });

        it('should navigate to the Rock Paper Scissors Lizard Spock page', (done) => {
            mainMenuItems.get(2).click().then(() => {
                browser.getCurrentUrl().should.become('http://localhost:3000/#!/rock-paper-scissors-lizard-spock');
                done();
            });
        });

        it('should navigate to the Rock Paper Scissors Lizard Spock Chuck page', (done) => {
            mainMenuItems.get(3).click().then(() => {
                browser.getCurrentUrl().should.become('http://localhost:3000/#!/rock-paper-scissors-lizard-spock-chuck');
                done();
            });
        });

    });

    describe('Personal Profile Page', () => {

        beforeAll(() => {
            browser.get('/');
        });

        it('should be displayed', () => {
            mainMenu.isDisplayed().should.become(true);
        });

        it('should active the item corresponding to the personal profile page', () => {
            mainMenuItems.getAttribute('aria-selected').should.become(['true', 'false', 'false', 'false']);
        });

    });

    describe('RockPaperScissors Page', () => {

        beforeAll(() => {
            browser.get('#!/rock-paper-scissors');
        });

        it('should be displayed', () => {
            mainMenu.isDisplayed().should.become(true);
        });

        it('should active the item corresponding to the rock paper scissors page', () => {
            mainMenuItems.getAttribute('aria-selected').should.become(['false', 'true', 'false', 'false']);
        });

    });

    describe('RockPaperScissorsLizardSpock Page', () => {

        beforeAll(() => {
            browser.get('#!/rock-paper-scissors-lizard-spock');
        });

        it('should be displayed', () => {
            mainMenu.isDisplayed().should.become(true);
        });

        it('should active the item corresponding to the rock paper scissors lizard spock page', () => {
            mainMenuItems.getAttribute('aria-selected').should.become(['false', 'false', 'true', 'false']);
        });

    });

    describe('RockPaperScissorsLizardSpockChuck Page', () => {

        beforeAll(() => {
            browser.get('#!/rock-paper-scissors-lizard-spock-chuck');
        });

        it('should be displayed', () => {
            mainMenu.isDisplayed().should.become(true);
        });

        it('should active the item corresponding to the rock paper scissors lizard spock chuck page', () => {
            mainMenuItems.getAttribute('aria-selected').should.become(['false', 'false', 'false', 'true']);
        });

    });

});