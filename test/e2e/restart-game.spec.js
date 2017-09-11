describe('Restart Game', () => {

    let restartButton = element(by.id('restart-game'));
    let profileScoreValues = element.all(by.className('scores-values'));
    let confirmRestartGamePanel = element(by.className('md-dialog-content'));
    let confirmRestartPanelButton = element(by.className('md-confirm-button'));

    beforeEach(() => {
        browser.get('/');
    });

    it('should display a confirmation panel before to restart', () => {
        restartButton.click().then(onRestartButtonClicked);

        function onRestartButtonClicked() {
            confirmRestartGamePanel.isDisplayed().should.become(true);
        }
    });

    it('should reset all the personal profile scores if you confirmed', () => {
        restartButton.click().then(onRestartButtonClicked);

        function onRestartButtonClicked() {
            confirmRestartPanelButton.click().then(onConfirmRestartPanelButtonClicked);

            function onConfirmRestartPanelButtonClicked() {
                profileScoreValues.getText().then(onGetProfileScoreValuesTexts);

                function onGetProfileScoreValuesTexts(data) {
                    let expectations = new Array(data.length);
                    expectations.fill('0');
                    data.should.be.eql(expectations);
                }
            }
        }
    });

});