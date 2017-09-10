describe('Rock Paper Scissors Lizard Spock', () => {

    let startGame = element(by.id('start-game'));
    let simulateGame = element(by.id('simulate-game'));
    let makeChoice = element(by.id('make-choices'));
    let choicesItemsIcons = element.all(by.className('choice-item-icons'));
    let chosenIcon = element(by.id('chosen-icon'));
    let rockItem = element(by.id('choice-item-rock'));
    let computerNotChosenIcon = element(by.id('computer-not-chosen-icon'));
    let computerChosenIcon = element(by.id('computer-chosen-icon'));
    let resultPanel = element(by.className('md-dialog-content'));
    let mainResultMessage = element(by.css('.md-dialog-content .md-title'));
    let contentResultMessage = element(by.css('.md-dialog-content .md-dialog-content-body'));
    let closeResultPanelButton = element(by.className('md-confirm-button'));


    beforeEach(() => {
        browser.get('#!/rock-paper-scissors-lizard-spock');
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

    describe('simulate button', () => {
        it('should display the simulate button', () => {
            simulateGame.isDisplayed().should.become(true);
        });

        it('should hide the simulate game button after clicked', () => {
            simulateGame.click().then(() => {
                simulateGame.isDisplayed().should.become(false);
            });
        });
    });

    describe('human vs computer', () => {

        describe('makeChoice button', () => {

            it('should hide the makeChoice button if you didn\'t start the game yet', () => {
                makeChoice.isDisplayed().should.become(false);
            });

            it('should display the makeChoice button after started the game', () => {
                startGame.click().then(() => {
                    makeChoice.isDisplayed().should.become(true);
                });
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

        describe('choicesItems', () => {
            it('should display 5 choicesItems clicking on the make choice button', () => {
                startGame.click().then(() => {
                    makeChoice.click().then(() => {
                        choicesItemsIcons.count().should.become(10);
                    });
                });
            });

            it('should display the right choicesItems', () => {
                startGame.click().then(() => {
                    makeChoice.click().then(() => {
                        choicesItemsIcons.getAttribute('ng-src').should.become([
                            'assets/images/rock.png',
                            'assets/images/paper.png',
                            'assets/images/scissors.png',
                            'assets/images/lizard.png',
                            'assets/images/spock.png',
                            'assets/images/rock.png',
                            'assets/images/paper.png',
                            'assets/images/scissors.png',
                            'assets/images/lizard.png',
                            'assets/images/spock.png'
                        ]);
                    });
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
                            chosenIcon.getAttribute('ng-src').should.become('assets/images/rock.png');
                        });
                    });
                });
            });
        });

        describe('computerNotChosenIcon', () => {
            it('should hide the computer chosen icon if you didn\'t start the game yet', () => {
                computerNotChosenIcon.isDisplayed().should.become(false);
            });

            it('should display the computer chosen icon if you started the game', () => {
                startGame.click().then(() => {
                    computerNotChosenIcon.isDisplayed().should.become(true);
                });
            });

            it('should display the still not chosen icon before you make your choice', () => {
                startGame.click().then(() => {
                    computerNotChosenIcon.getAttribute('ng-src').should.become('assets/images/not-chosen-yet.png');
                });
            });

            it('should hide the computer not chosen icon after you make your choice', () => {
                startGame.click().then(() => {
                    makeChoice.click().then(() => {
                        rockItem.click().then(() => {
                            computerNotChosenIcon.isDisplayed().should.become(false);
                        });
                    });
                });
            });
        });

        describe('computerChosenIcon', () => {

            it('should hide the computer chosen icon if you didn\'t start the game yet', () => {
                computerChosenIcon.isDisplayed().should.become(false);
            });

            it('should display the computer chosen icon after you make your choice', () => {
                startGame.click().then(() => {
                    makeChoice.click().then(() => {
                        rockItem.click().then(() => {
                            computerChosenIcon.isDisplayed().should.become(true);
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
                            computerChosenIcon.getAttribute('ng-src').then(chosenValue => {
                                resultPanel.isDisplayed().should.become(true);
                                if (chosenValue.includes('scissors')) {
                                    mainResultMessage.getText().should.become('YOU WON!');
                                    contentResultMessage.getText().should.become('Rock crushes Scissors');
                                } else if (chosenValue.includes('lizard')) {
                                    mainResultMessage.getText().should.become('YOU WON!');
                                    contentResultMessage.getText().should.become('Rock crushes Lizard');
                                } else if (chosenValue.includes('rock')) {
                                    mainResultMessage.getText().should.become('DRAW!');
                                    contentResultMessage.getText().should.become('draw');
                                } else if (chosenValue.includes('spock')) {
                                    mainResultMessage.getText().should.become('YOU LOST!');
                                    contentResultMessage.getText().should.become('Rock has been vaporized by Spock');
                                } else {
                                    mainResultMessage.getText().should.become('YOU LOST!');
                                    contentResultMessage.getText().should.become('Rock has been covered by Paper');
                                }
                                closeResultPanelButton.click().then(() => {
                                    startGame.isDisplayed().should.become(true);
                                    makeChoice.isDisplayed().should.become(false);
                                    chosenIcon.isDisplayed().should.become(false);
                                    computerChosenIcon.isDisplayed().should.become(false);
                                });
                            });
                        });
                    });
                });
            });

        });

    });


    describe('computer vs computer', () => {


        describe('computerPlayerChosenIcon', () => {
            it('should hide the chosen icon if you didn\'t start the game yet', () => {
                chosenIcon.isDisplayed().should.become(false);
            });

            it('should display the chosen icon if you started the simulation', () => {
                simulateGame.click().then(() => {
                    chosenIcon.isPresent().should.become(true);
                });
            });
        });

        describe('computerChosenIcon', () => {

            it('should hide the computer chosen icon if you didn\'t start the game yet', () => {
                computerChosenIcon.isDisplayed().should.become(false);
            });

            it('should display the computer chosen icon after you started the simulation', () => {
                simulateGame.click().then(() => {
                    computerChosenIcon.isPresent().should.become(true);
                });
            });
        });

        describe('simulate match', () => {

            it('should perform a complete simulated match between computers', () => {
                simulateGame.click().then(() => {
                    let promisesList = [chosenIcon.getAttribute('ng-src'), computerChosenIcon.getAttribute('ng-src')];
                    protractor.promise.all(promisesList).then(images => {
                        let computer1Choice = images[0];
                        let computer2Choice = images[1];
                        resultPanel.isDisplayed().should.become(true);
                        // if it's draw
                        if (computer1Choice === computer2Choice) {
                            mainResultMessage.getText().should.become('DRAW!');
                            contentResultMessage.getText().should.become('draw');
                        } else {
                            // random computer 1 chose scissors
                            if (computer1Choice.includes('scissors')) {
                                if (computer2Choice.includes('rock')) {
                                    mainResultMessage.getText().should.become('COMPUTER 1 LOST!');
                                    contentResultMessage.getText().should.become('Scissors has been crushed by Rock');
                                } else if (computer2Choice.includes('spock')) {
                                    mainResultMessage.getText().should.become('COMPUTER 1 LOST!');
                                    contentResultMessage.getText().should.become('Scissors has been smashed by Spock');
                                } else if (computer2Choice.includes('lizard')) {
                                    mainResultMessage.getText().should.become('COMPUTER 1 WON!');
                                    contentResultMessage.getText().should.become('Scissors decapitates Lizard');
                                } else {
                                    mainResultMessage.getText().should.become('COMPUTER 1 WON!');
                                    contentResultMessage.getText().should.become('Scissors cuts Paper');
                                }
                            }
                            //  random computer 1 chose paper
                            else if (computer1Choice.includes('paper')) {
                                if (computer2Choice.includes('scissors')) {
                                    mainResultMessage.getText().should.become('COMPUTER 1 LOST!');
                                    contentResultMessage.getText().should.become('Paper has been cut by Scissors');
                                } else if (computer2Choice.includes('lizard')) {
                                    mainResultMessage.getText().should.become('COMPUTER 1 LOST!');
                                    contentResultMessage.getText().should.become('Paper has been eaten by Lizard');
                                } else if (computer2Choice.includes('spock')) {
                                    mainResultMessage.getText().should.become('COMPUTER 1 WON!');
                                    contentResultMessage.getText().should.become('Paper disproves Lizard');
                                } else {
                                    mainResultMessage.getText().should.become('COMPUTER 1 WON!');
                                    contentResultMessage.getText().should.become('Paper covers Rock');
                                }
                            }
                            // random computer 1 chose lizard
                            else if (computer1Choice.includes('lizard')) {
                                if (computer2Choice.includes('scissors')) {
                                    mainResultMessage.getText().should.become('COMPUTER 1 LOST!');
                                    contentResultMessage.getText().should.become('Lizard has been decapitated by Scissors');
                                } else if (computer2Choice.includes('rock')) {
                                    mainResultMessage.getText().should.become('COMPUTER 1 LOST!');
                                    contentResultMessage.getText().should.become('Lizard has been crushed by Rock');
                                } else if (computer2Choice.includes('spock')) {
                                    mainResultMessage.getText().should.become('COMPUTER 1 WON!');
                                    contentResultMessage.getText().should.become('Lizard poisons Spock');
                                } else {
                                    mainResultMessage.getText().should.become('COMPUTER 1 WON!');
                                    contentResultMessage.getText().should.become('Lizard eats Paper');
                                } 
                            }
                            // random computer 1 chose spock
                            else if (computer1Choice.includes('spock')) {
                                if (computer2Choice.includes('paper')) {
                                    mainResultMessage.getText().should.become('COMPUTER 1 LOST!');
                                    contentResultMessage.getText().should.become('Spock has been disproved by Paper');
                                } else if (computer2Choice.includes('lizard')) {
                                    mainResultMessage.getText().should.become('COMPUTER 1 LOST!');
                                    contentResultMessage.getText().should.become('Spock has been poisoned by Lizard');
                                } else if (computer2Choice.includes('scissors')) {
                                    mainResultMessage.getText().should.become('COMPUTER 1 WON!');
                                    contentResultMessage.getText().should.become('Spock smashes Scissors');
                                } else {
                                    mainResultMessage.getText().should.become('COMPUTER 1 WON!');
                                    contentResultMessage.getText().should.become('Spock vaporizes Rock');
                                }
                            }
                            // random computer 1 chose rock
                            else {
                                if (computer2Choice.includes('paper')) {
                                    mainResultMessage.getText().should.become('COMPUTER 1 LOST!');
                                    contentResultMessage.getText().should.become('Rock has been covered by Paper');
                                } else if (computer2Choice.includes('spock')) {
                                    mainResultMessage.getText().should.become('COMPUTER 1 LOST!');
                                    contentResultMessage.getText().should.become('Rock has been vaporized by Spock');
                                } else if (computer2Choice.includes('lizard')) {
                                    mainResultMessage.getText().should.become('COMPUTER 1 WON!');
                                    contentResultMessage.getText().should.become('Rock crushes Lizard');
                                } else {
                                    mainResultMessage.getText().should.become('COMPUTER 1 WON!');
                                    contentResultMessage.getText().should.become('Rock crushes Scissors');
                                }
                            }
                        }
                        closeResultPanelButton.click().then(() => {
                            startGame.isDisplayed().should.become(true);
                            simulateGame.isDisplayed().should.become(true);
                            chosenIcon.isDisplayed().should.become(false);
                            computerChosenIcon.isDisplayed().should.become(false);
                        });
                    });
                });
            });

        });

    });

});