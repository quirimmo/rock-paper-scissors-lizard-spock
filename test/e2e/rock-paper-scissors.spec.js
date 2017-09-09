fdescribe('Rock Paper Scissors', () => {

    let makeChoice = element(by.id('make-choices'));
    let choicesPanel = element(by.id('choices-panel'));
    let choicesItems = element.all(by.className('choice-item'));
    let startGame = element(by.id('start-game'));
    let rockItem = element(by.id('choice-item-rock'));
    let chosenIcon = element(by.id('chosen-icon'));
    let computerChosenIcon = element(by.id('computer-chosen-icon'));
    let resultMessage = element(by.id('result-message'));
    let mainResultMessage = element(by.id('main-result-message'));
    let contentResultMessage = element(by.id('content-result-message'));
    let closeResultMessage = element(by.id('close-result-message'));

    beforeAll(() => {
        browser.get('#!/rock-paper-scissors');
    });

    describe('makeChoice button', () => {
        it('should display the makeChoice button after started the game', () => {
            startGame.click().then(() => {
                makeChoice.isDisplayed().should.become(true);
            });
        });

        it('should hide the makeChoice button if you didn\'t start the game yet', () => {
            makeChoice.isDisplayed().should.become(false);
        });

        it('should hide the makeChoice button if you made your choice', () => {
            startGame.click().then(() => {
                makeChoice.click().then(() => {
                    rockItem.click().then(() => {
                        makeChoice.isDisplayed().should.become(false);
                    });
                });
            });
        });
    });

    describe('choicesPanel button', () => {
        it('should display the choicesPanel clicking on the makeChoice button', () => {
            startGame.click().then(() => {
                makeChoice.click().then(() => {
                    choicesPanel.isDisplayed().should.become(true);
                });
            });
        });

        it('should hide the choicesPanel if you started the game but you didn\'t click on the makeChoice button', () => {
            startGame.click().then(() => {
                choicesPanel.isDisplayed().should.become(false);
            });
        });

        it('should hide the choicesPanel if you didn\'t start the game yet', () => {
            choicesPanel.isDisplayed().should.become(false);
        });
    });

    describe('start button', () => {
        it('should display the start button', () => {
            startGame.isDisplayed().should.become(true);
        });

        it('should hide the start game button after clicked', () => {
            startGame.click().then(() => {
                startGame.isDisplayed().should.become(false);
            });
        });
    });

    describe('choicesItems', () => {
        it('should display 3 choicesItems clicking on the make choice button', () => {
            startGame.click().then(() => {
                makeChoice.click().then(() => {
                    choicesItems.count().should.become(3);
                });
            });
        });

        it('should display the right choicesItems', () => {
            startGame.click().then(() => {
                makeChoice.click().then(() => {
                    choicesItems.getAttribute('src').should.contain(['rock', 'paper', 'scissors']);
                });
            });
        });

        it('should hide the choicesItems if you didn\'t start the game yet', () => {
            choicesItems.isDisplayed().should.become(false);
        });

        it('should hide the choicesItems if you started the game but you didn\'t click on the makeChoice button', () => {
            startGame.click().then(() => {
                choicesItems.isDisplayed().should.become(false);
            });
        });
    });

    describe('chosenIcon', () => {
        it('should hide the chosen icon if you didn\'t start the game yet', () => {
            chosenIcon.isDisplayed().should.become(false);
        });

        it('should display the chosen icon if you made your choice', () => {
            startGame.click().then(() => {
                makeChoice.click().then(() => {
                    rockItem.click().then(() => {
                        chosenIcon.isDisplayed().should.become(true);
                        chosenIcon.getAttribute('src').should.contain('rock');
                    });
                });
            });
        });
    });

    describe('computerChosenIcon', () => {
        it('should hide the computer chosen icon if you didn\'t start the game yet', () => {
            computerChosenIcon.isDisplayed().should.become(false);
        });

        it('should display the computer chosen icon if you started the game', () => {
            startGame.click().then(() => {
                computerChosenIcon.isDisplayed().should.become(true);
            });
        });

        it('should display the still not chosen icon before you make your choice', () => {
            startGame.click().then(() => {
                computerChosenIcon.isDisplayed().should.become(true);
                computerChosenIcon.getAttribute('src').should.contain('not-chosen-yet');
            });
        });

        it('should display the computer chosen icon after you make your choice', () => {
            startGame.click().then(() => {
                makeChoice.click().then(() => {
                    rockItem.click().then(() => {
                        computerChosenIcon.getAttribute('src').should.not.contain('not-chosen-yet');
                    });
                });
            });
        });
    });

    describe('simulate match', () => {

        it('should perform a complete match', () => {
            startGame.click().then(() => {
                makeChoice.click().then(() => {
                    rockItem.click().then(() => {
                        computerChosenIcon.getAttribute('src').then(chosenValue => {
                            resultMessage.isDisplayed().should.become(true);
                            if (chosenValue.contain('scissors')) {
                                mainResultMessage.getText().should.become('YOU WON');
                                contentResultMessage.getText().should.become('Paper covers Rock');
                            }
                            else if (chosenValue.contain('rock')) {
                                mainResultMessage.getText().should.become('DRAW');
                                contentResultMessage.getText().should.become('draw');
                            }
                            // just paper is missing
                            else {
                                mainResultMessage.getText().should.become('YOU LOST');
                                contentResultMessage.getText().should.become('Paper has been cut by Scissors');
                            }
                            closeResultMessage.click().then(() => {
                                choicesPanel.isDisplayed().should.become(false);
                                makeChoice.isDisplayed().should.become(false);
                                chosenIcon.isDisplayed().should.become(false);
                                computerChosenIcon.isDisplayed().should.become(false);
                                startGame.isDisplayed().should.become(true);
                            });
                        });
                    });
                });
            });
        });

    });

});