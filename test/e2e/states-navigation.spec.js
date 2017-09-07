describe('Navigation Between States', () => {

    describe('Home State', () => {

        it('should be loaded by default', () => {
            browser.get('/');
            browser.getCurrentUrl().should.become('http://localhost:3000/');
        });

        it('should be loaded if the URL you provide is not registered as valid state', () => {
            browser.get('/dsadasdsadsadsa');
            browser.getCurrentUrl().should.become('http://localhost:3000/');
        });

        it('should display the right title of the page', () => {
            browser.get('/');
            browser.getTitle().should.become('Personal Profile Page');
        });

    });

    describe('RockPaperScissors State', () => {

        beforeAll(() => {
            browser.get('/rock-paper-scissors');
        });

        it('should be loaded typing the right address', () => {
            browser.getCurrentUrl().should.become('http://localhost:3000/rock-paper-scissors');
        });

        it('should display the right title of the page', () => {
            browser.getTitle().should.become('Rock Paper Scissors');
        });

    });

    describe('RockPaperScissorsLizardSpock State', () => {

        beforeAll(() => {
            browser.get('/rock-paper-scissors-lizard-spock');
        });

        it('should be loaded typing the right address', () => {
            browser.getCurrentUrl().should.become('http://localhost:3000/rock-paper-scissors-lizard-spock');
        });

        it('should display the right title of the page', () => {
            browser.getTitle().should.become('Rock Paper Scissors Lizard Spock');
        });

    });


});