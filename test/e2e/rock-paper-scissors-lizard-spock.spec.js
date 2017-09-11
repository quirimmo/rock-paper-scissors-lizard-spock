let GamePage = require('./page-objects/game.page.objects.js');
let gamePage = new GamePage();

describe('Rock Paper Scissors Lizard Spock', () => {

    beforeEach(() => {
        browser.get('#!/rock-paper-scissors-lizard-spock');
    });

    describe('start button', () => {
        it('should display the start button', () => {
            gamePage.startGame.isDisplayed().should.become(true);
        });

        it('should hide the start game button after clicked', () => {
            gamePage.startGame.click().then(() => {
                gamePage.startGame.isDisplayed().should.become(false);
            });
        });
    });

    describe('simulate button', () => {
        it('should display the simulate button', () => {
            gamePage.simulateGame.isDisplayed().should.become(true);
        });

        it('should hide the simulate game button after clicked', () => {
            gamePage.simulateGame.click().then(() => {
                gamePage.simulateGame.isDisplayed().should.become(false);
            });
        });
    });

    describe('human vs computer', () => {

        describe('makeChoice button', () => {

            it('should hide the makeChoice button if you didn\'t start the game yet', () => {
                gamePage.makeChoice.isDisplayed().should.become(false);
            });

            it('should display the makeChoice button after started the game', () => {
                gamePage.startGame.click().then(() => {
                    gamePage.makeChoice.isDisplayed().should.become(true);
                });
            });

            it('should hide the makeChoice button if you made your choice', () => {
                gamePage.startGame.click().then(() => {
                    gamePage.makeChoice.click().then(() => {
                        gamePage.rockItem.click().then(() => {
                            gamePage.makeChoice.isDisplayed().should.become(false);
                        });
                    });
                });
            });
        });

        describe('choicesItems', () => {
            it('should display 5 choicesItems clicking on the make choice button', () => {
                gamePage.startGame.click().then(() => {
                    gamePage.makeChoice.click().then(() => {
                        gamePage.choicesItemsIcons.count().should.become(10);
                    });
                });
            });

            it('should display the right choicesItems', () => {
                gamePage.startGame.click().then(() => {
                    gamePage.makeChoice.click().then(() => {
                        gamePage.choicesItemsIcons.getAttribute('ng-src').should.become([
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
                gamePage.chosenIcon.isDisplayed().should.become(false);
            });

            it('should display the chosen icon if you made your choice', () => {
                gamePage.startGame.click().then(() => {
                    gamePage.makeChoice.click().then(() => {
                        gamePage.rockItem.click().then(() => {
                            gamePage.chosenIcon.isDisplayed().should.become(true);
                            gamePage.chosenIcon.getAttribute('ng-src').should.become('assets/images/rock.png');
                        });
                    });
                });
            });
        });

        describe('computerNotChosenIcon', () => {
            it('should hide the computer chosen icon if you didn\'t start the game yet', () => {
                gamePage.computerNotChosenIcon.isDisplayed().should.become(false);
            });

            it('should display the computer chosen icon if you started the game', () => {
                gamePage.startGame.click().then(() => {
                    gamePage.computerNotChosenIcon.isDisplayed().should.become(true);
                });
            });

            it('should display the still not chosen icon before you make your choice', () => {
                gamePage.startGame.click().then(() => {
                    gamePage.computerNotChosenIcon.getAttribute('ng-src').should.become('assets/images/not-chosen-yet.png');
                });
            });

            it('should hide the computer not chosen icon after you make your choice', () => {
                gamePage.startGame.click().then(() => {
                    gamePage.makeChoice.click().then(() => {
                        gamePage.rockItem.click().then(() => {
                            gamePage.computerNotChosenIcon.isDisplayed().should.become(false);
                        });
                    });
                });
            });
        });

        describe('computerChosenIcon', () => {

            it('should hide the computer chosen icon if you didn\'t start the game yet', () => {
                gamePage.computerChosenIcon.isDisplayed().should.become(false);
            });

            it('should display the computer chosen icon after you make your choice', () => {
                gamePage.startGame.click().then(() => {
                    gamePage.makeChoice.click().then(() => {
                        gamePage.rockItem.click().then(() => {
                            gamePage.computerChosenIcon.isDisplayed().should.become(true);
                        });
                    });
                });
            });
        });

        describe('simulate match', () => {

            it('should perform a complete match', () => {
                gamePage.startGame.click().then(() => {
                    gamePage.makeChoice.click().then(() => {
                        gamePage.rockItem.click().then(() => {
                            gamePage.computerChosenIcon.getAttribute('ng-src').then(chosenValue => {
                                gamePage.resultPanel.isDisplayed().should.become(true);
                                if (chosenValue.includes('scissors')) {
                                    gamePage.mainResultMessage.getText().should.become('YOU WON!');
                                    gamePage.contentResultMessage.getText().should.become('Rock crushes Scissors');
                                } else if (chosenValue.includes('lizard')) {
                                    gamePage.mainResultMessage.getText().should.become('YOU WON!');
                                    gamePage.contentResultMessage.getText().should.become('Rock crushes Lizard');
                                } else if (chosenValue.includes('rock')) {
                                    gamePage.mainResultMessage.getText().should.become('DRAW!');
                                    gamePage.contentResultMessage.getText().should.become('draw');
                                } else if (chosenValue.includes('spock')) {
                                    gamePage.mainResultMessage.getText().should.become('YOU LOST!');
                                    gamePage.contentResultMessage.getText().should.become('Rock has been vaporized by Spock');
                                } else {
                                    gamePage.mainResultMessage.getText().should.become('YOU LOST!');
                                    gamePage.contentResultMessage.getText().should.become('Rock has been covered by Paper');
                                }
                                gamePage.closeResultPanelButton.click().then(() => {
                                    gamePage.startGame.isDisplayed().should.become(true);
                                    gamePage.makeChoice.isDisplayed().should.become(false);
                                    gamePage.chosenIcon.isDisplayed().should.become(false);
                                    gamePage.computerChosenIcon.isDisplayed().should.become(false);
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
                gamePage.chosenIcon.isDisplayed().should.become(false);
            });

            it('should display the chosen icon if you started the simulation', () => {
                gamePage.simulateGame.click().then(() => {
                    gamePage.chosenIcon.isPresent().should.become(true);
                });
            });
        });

        describe('computerChosenIcon', () => {

            it('should hide the computer chosen icon if you didn\'t start the game yet', () => {
                gamePage.computerChosenIcon.isDisplayed().should.become(false);
            });

            it('should display the computer chosen icon after you started the simulation', () => {
                gamePage.simulateGame.click().then(() => {
                    gamePage.computerChosenIcon.isPresent().should.become(true);
                });
            });
        });

        describe('simulate match', () => {

            it('should perform a complete simulated match between computers', () => {
                gamePage.simulateGame.click().then(() => {
                    let promisesList = [gamePage.chosenIcon.getAttribute('ng-src'), gamePage.computerChosenIcon.getAttribute('ng-src')];
                    protractor.promise.all(promisesList).then(images => {
                        let computer1Choice = images[0];
                        let computer2Choice = images[1];
                        gamePage.resultPanel.isDisplayed().should.become(true);
                        // if it's draw
                        if (computer1Choice === computer2Choice) {
                            gamePage.mainResultMessage.getText().should.become('DRAW!');
                            gamePage.contentResultMessage.getText().should.become('draw');
                        } else {
                            // random computer 1 chose scissors
                            if (computer1Choice.includes('scissors')) {
                                if (computer2Choice.includes('rock')) {
                                    gamePage.mainResultMessage.getText().should.become('COMPUTER 1 LOST!');
                                    gamePage.contentResultMessage.getText().should.become('Scissors has been crushed by Rock');
                                } else if (computer2Choice.includes('spock')) {
                                    gamePage.mainResultMessage.getText().should.become('COMPUTER 1 LOST!');
                                    gamePage.contentResultMessage.getText().should.become('Scissors has been smashed by Spock');
                                } else if (computer2Choice.includes('lizard')) {
                                    gamePage.mainResultMessage.getText().should.become('COMPUTER 1 WON!');
                                    gamePage.contentResultMessage.getText().should.become('Scissors decapitates Lizard');
                                } else {
                                    gamePage.mainResultMessage.getText().should.become('COMPUTER 1 WON!');
                                    gamePage.contentResultMessage.getText().should.become('Scissors cuts Paper');
                                }
                            }
                            //  random computer 1 chose paper
                            else if (computer1Choice.includes('paper')) {
                                if (computer2Choice.includes('scissors')) {
                                    gamePage.mainResultMessage.getText().should.become('COMPUTER 1 LOST!');
                                    gamePage.contentResultMessage.getText().should.become('Paper has been cut by Scissors');
                                } else if (computer2Choice.includes('lizard')) {
                                    gamePage.mainResultMessage.getText().should.become('COMPUTER 1 LOST!');
                                    gamePage.contentResultMessage.getText().should.become('Paper has been eaten by Lizard');
                                } else if (computer2Choice.includes('spock')) {
                                    gamePage.mainResultMessage.getText().should.become('COMPUTER 1 WON!');
                                    gamePage.contentResultMessage.getText().should.become('Paper disproves Lizard');
                                } else {
                                    gamePage.mainResultMessage.getText().should.become('COMPUTER 1 WON!');
                                    gamePage.contentResultMessage.getText().should.become('Paper covers Rock');
                                }
                            }
                            // random computer 1 chose lizard
                            else if (computer1Choice.includes('lizard')) {
                                if (computer2Choice.includes('scissors')) {
                                    gamePage.mainResultMessage.getText().should.become('COMPUTER 1 LOST!');
                                    gamePage.contentResultMessage.getText().should.become('Lizard has been decapitated by Scissors');
                                } else if (computer2Choice.includes('rock')) {
                                    gamePage.mainResultMessage.getText().should.become('COMPUTER 1 LOST!');
                                    gamePage.contentResultMessage.getText().should.become('Lizard has been crushed by Rock');
                                } else if (computer2Choice.includes('spock')) {
                                    gamePage.mainResultMessage.getText().should.become('COMPUTER 1 WON!');
                                    gamePage.contentResultMessage.getText().should.become('Lizard poisons Spock');
                                } else {
                                    gamePage.mainResultMessage.getText().should.become('COMPUTER 1 WON!');
                                    gamePage.contentResultMessage.getText().should.become('Lizard eats Paper');
                                } 
                            }
                            // random computer 1 chose spock
                            else if (computer1Choice.includes('spock')) {
                                if (computer2Choice.includes('paper')) {
                                    gamePage.mainResultMessage.getText().should.become('COMPUTER 1 LOST!');
                                    gamePage.contentResultMessage.getText().should.become('Spock has been disproved by Paper');
                                } else if (computer2Choice.includes('lizard')) {
                                    gamePage.mainResultMessage.getText().should.become('COMPUTER 1 LOST!');
                                    gamePage.contentResultMessage.getText().should.become('Spock has been poisoned by Lizard');
                                } else if (computer2Choice.includes('scissors')) {
                                    gamePage.mainResultMessage.getText().should.become('COMPUTER 1 WON!');
                                    gamePage.contentResultMessage.getText().should.become('Spock smashes Scissors');
                                } else {
                                    gamePage.mainResultMessage.getText().should.become('COMPUTER 1 WON!');
                                    gamePage.contentResultMessage.getText().should.become('Spock vaporizes Rock');
                                }
                            }
                            // random computer 1 chose rock
                            else {
                                if (computer2Choice.includes('paper')) {
                                    gamePage.mainResultMessage.getText().should.become('COMPUTER 1 LOST!');
                                    gamePage.contentResultMessage.getText().should.become('Rock has been covered by Paper');
                                } else if (computer2Choice.includes('spock')) {
                                    gamePage.mainResultMessage.getText().should.become('COMPUTER 1 LOST!');
                                    gamePage.contentResultMessage.getText().should.become('Rock has been vaporized by Spock');
                                } else if (computer2Choice.includes('lizard')) {
                                    gamePage.mainResultMessage.getText().should.become('COMPUTER 1 WON!');
                                    gamePage.contentResultMessage.getText().should.become('Rock crushes Lizard');
                                } else {
                                    gamePage.mainResultMessage.getText().should.become('COMPUTER 1 WON!');
                                    gamePage.contentResultMessage.getText().should.become('Rock crushes Scissors');
                                }
                            }
                        }
                        gamePage.closeResultPanelButton.click().then(() => {
                            gamePage.startGame.isDisplayed().should.become(true);
                            gamePage.simulateGame.isDisplayed().should.become(true);
                            gamePage.chosenIcon.isDisplayed().should.become(false);
                            gamePage.computerChosenIcon.isDisplayed().should.become(false);
                        });
                    });
                });
            });

        });

    });

});