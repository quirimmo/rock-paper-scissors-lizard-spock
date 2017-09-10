describe('gameEngineService', function() {

    let gameEngineService, gameService, GAME_CONSTANTS;

    const DRAW_TEXT = 'draw';
    const DRAW_RESULT_OBJECT = {
        result: 0,
        text: DRAW_TEXT
    };
    let rock, paper, scissors, lizard, spock, chuck;
    let rockPaperScissorsSubset, rockPaperScissorsLizardSpockSubset, rockPaperScissorsLizardSpockChuckSubset;

    beforeEach(function() {
        module('myApp');

        module(function($provide) {
            $provide.value('gameService', {
                incrementNumOfMatches: function() {},
                incrementNumOfVictories: function() {},
                incrementNumOfLoses: function() {},
                incrementNumOfDraws: function() {}
            });
        });

        inject(function(_gameEngineService_, _GAME_CONSTANTS_, _gameService_) {
            gameEngineService = _gameEngineService_;
            gameService = _gameService_;
            GAME_CONSTANTS = _GAME_CONSTANTS_;
            rock = GAME_CONSTANTS.actions.find(element => element.id === 'rock');
            paper = GAME_CONSTANTS.actions.find(element => element.id === 'paper');
            scissors = GAME_CONSTANTS.actions.find(element => element.id === 'scissors');
            lizard = GAME_CONSTANTS.actions.find(element => element.id === 'lizard');
            spock = GAME_CONSTANTS.actions.find(element => element.id === 'spock');
            chuck = GAME_CONSTANTS.actions.find(element => element.id === 'chuck');
            rockPaperScissorsSubset = GAME_CONSTANTS.actions.filter(element => element.id === 'rock' || element.id === 'paper' || element.id === 'scissors');
            rockPaperScissorsLizardSpockSubset = GAME_CONSTANTS.actions.filter(element => element.id === 'rock' || element.id === 'paper' || element.id === 'scissors' || element.id === 'lizard' || element.id === 'spock');
            rockPaperScissorsLizardSpockChuckSubset = GAME_CONSTANTS.actions.filter(element => element.id === 'rock' || element.id === 'paper' || element.id === 'scissors' || element.id === 'lizard' || element.id === 'spock' || element.id === 'chuck');
        });

    });


    describe('init', function() {

        it('should be defined', function() {
            expect(gameEngineService).toBeDefined();
        });

        it('should define the exposed methods for getting games subsets', function() {
            expect(gameEngineService.getRockPaperScissorsSubset).toEqual(jasmine.any(Function));
            expect(gameEngineService.getRockPaperScissorsLizardSpockSubset).toEqual(jasmine.any(Function));
            expect(gameEngineService.getRockPaperScissorsLizardSpockChuckSubset).toEqual(jasmine.any(Function));
        });

        it('should define the exposed methods for managing victories, loses or draws', function() {
            expect(gameEngineService.calculateResult).toEqual(jasmine.any(Function));
            expect(gameEngineService.getWinText).toEqual(jasmine.any(Function));
            expect(gameEngineService.getLoseText).toEqual(jasmine.any(Function));
        });

        it('should define the getComputerRandomChoice', function() {
            expect(gameEngineService.getComputerRandomChoice).toEqual(jasmine.any(Function));
        });

    });

    describe('getRockPaperScissorsSubset', function() {

        it('should return an array', function() {
            expect(gameEngineService.getRockPaperScissorsSubset()).toEqual(jasmine.any(Array));
        });

        it('should return 3 elements', function() {
            expect(gameEngineService.getRockPaperScissorsSubset().length).toEqual(3);
        });

        it('should return the right elements', function() {
            expect(gameEngineService.getRockPaperScissorsSubset()).toEqual(rockPaperScissorsSubset);
        });

    });

    describe('getRockPaperScissorsLizardSpockSubset', function() {

        it('should return an array', function() {
            expect(gameEngineService.getRockPaperScissorsLizardSpockSubset()).toEqual(jasmine.any(Array));
        });

        it('should return 5 elements', function() {
            expect(gameEngineService.getRockPaperScissorsLizardSpockSubset().length).toEqual(5);
        });

        it('should return the right elements', function() {
            // here we could simply use the following, but this will make the code not easy to increase, because if you add new elements,
            // for a new game, also the unit tests for the game rock paper scissors lizard spock will break 
            // let rockPaperScissorsLizardSpockSubset = GAME_CONSTANTS.actions.filter(element => element.id !== 'chuck');
            expect(gameEngineService.getRockPaperScissorsLizardSpockSubset()).toEqual(rockPaperScissorsLizardSpockSubset);
        });

    });

    describe('getRockPaperScissorsLizardSpockChuckSubset', function() {

        it('should return an array', function() {
            expect(gameEngineService.getRockPaperScissorsLizardSpockChuckSubset()).toEqual(jasmine.any(Array));
        });

        it('should return 6 elements', function() {
            expect(gameEngineService.getRockPaperScissorsLizardSpockChuckSubset().length).toEqual(6);
        });

        it('should return the right elements', function() {
            // here we could simply use the following, but this will make the code not easy to increase, because if you add new elements,
            // for a new game, also the unit tests for the game rock paper scissors lizard spock chuck will break 
            // let rockPaperScissorsLizardSpockChuckSubset = GAME_CONSTANTS.actions;
            expect(gameEngineService.getRockPaperScissorsLizardSpockChuckSubset()).toEqual(rockPaperScissorsLizardSpockChuckSubset);
        });

    });

    describe('getWinText', function() {

        it('should return a string', function() {
            expect(gameEngineService.getWinText({}, {})).toEqual(jasmine.any(String));
        });

        it('should return an empty string if the inputs are not correct', function() {
            expect(gameEngineService.getWinText({}, {})).toEqual('');
        });

        it('should return the composed right text', function() {
            expect(gameEngineService.getWinText(rock, scissors)).toEqual(`${rock.label} ${rock.winsAgainst.find(element => element.id === scissors.id).term} ${scissors.label}`);
        });

    });

    describe('getLoseText', function() {

        it('should return a string', function() {
            expect(gameEngineService.getLoseText({}, {})).toEqual(jasmine.any(String));
        });

        it('should return an empty string if the inputs are not correct', function() {
            expect(gameEngineService.getLoseText({}, {})).toEqual('');
        });

        it('should return the composed lose text', function() {
            expect(gameEngineService.getLoseText(rock, paper)).toEqual(
                `${rock.label} has been ${rock.losesAgainst.find(element => element.id === paper.id).term} by ${paper.label}`
            );
        });

    });

    describe('getComputerRandomChoice', function() {

        it('should return an Object', function() {
            expect(gameEngineService.getComputerRandomChoice(rockPaperScissorsSubset)).toEqual(jasmine.any(Object));
        });

        it('should return undefined with invalid input', function() {
            expect(gameEngineService.getComputerRandomChoice()).toBeUndefined();
        });

        it('should return the computer random action for Rock Paper Scissors', function() {
            spyOn(Math, 'random').and.returnValue(0.1);
            expect(gameEngineService.getComputerRandomChoice(rockPaperScissorsSubset)).toEqual(rock);
        });

        it('should return the computer random action for Rock Paper Scissors Lizard Spock', function() {
            spyOn(Math, 'random').and.returnValue(0.7);
            expect(gameEngineService.getComputerRandomChoice(rockPaperScissorsLizardSpockSubset)).toEqual(lizard);
        });

        it('should return the computer random action for Rock Paper Scissors Lizard Spock Chuck', function() {
            spyOn(Math, 'random').and.returnValue(0.18);
            expect(gameEngineService.getComputerRandomChoice(rockPaperScissorsLizardSpockChuckSubset)).toEqual(paper);
        });

    });

    describe('calculateResult', function() {

        beforeEach(() => {
            spyOn(gameService, 'incrementNumOfMatches').and.callThrough();
            spyOn(gameService, 'incrementNumOfVictories').and.callThrough();
            spyOn(gameService, 'incrementNumOfLoses').and.callThrough();
            spyOn(gameService, 'incrementNumOfDraws').and.callThrough();
        });

        it('should return an object with two properties defined', function() {
            let result = gameEngineService.calculateResult({}, {});
            expect(result.result).toBeDefined();
            expect(result.text).toBeDefined();
        });

        it('should return a draw if values are not the right ones', function() {
            expect(gameEngineService.calculateResult({}, {})).toEqual(DRAW_RESULT_OBJECT);
        });

        describe('increment values', () => {

            it('should not call the increment values if inputs are not correct', function() {
                gameEngineService.calculateResult({}, {});
                expect(gameService.incrementNumOfMatches).not.toHaveBeenCalled();
                expect(gameService.incrementNumOfVictories).not.toHaveBeenCalled();
                expect(gameService.incrementNumOfLoses).not.toHaveBeenCalled();
                expect(gameService.incrementNumOfDraws).not.toHaveBeenCalled();
            });

            it('should call the gameService.incrementNumOfMatches', function() {
                gameEngineService.calculateResult(rock, scissors);
                expect(gameService.incrementNumOfMatches).toHaveBeenCalled();
            });
    
            it('should call the gameService.incrementNumOfVictories', function() {
                gameEngineService.calculateResult(rock, scissors);
                expect(gameService.incrementNumOfVictories).toHaveBeenCalled();
            });
    
            it('should call the gameService.incrementNumOfLoses', function() {
                gameEngineService.calculateResult(scissors, rock);
                expect(gameService.incrementNumOfLoses).toHaveBeenCalled();
            });
    
            it('should call the gameService.incrementNumOfDraws', function() {
                gameEngineService.calculateResult(rock, rock);
                expect(gameService.incrementNumOfDraws).toHaveBeenCalled();
            });

        });

        describe('rock', () => {

            describe('draw', () => {
                it('should return draw if both chose rock', () => {
                    expect(gameEngineService.calculateResult(rock, rock)).toEqual(DRAW_RESULT_OBJECT);
                });
            });

            describe('win', () => {
                it('should return win if the other chose scissors', () => {
                    expect(gameEngineService.calculateResult(rock, scissors)).toEqual({
                        result: 1,
                        text: gameEngineService.getWinText(rock, scissors)
                    });
                });

                it('should return win if the other chose lizard', () => {
                    expect(gameEngineService.calculateResult(rock, lizard)).toEqual({
                        result: 1,
                        text: gameEngineService.getWinText(rock, lizard)
                    });
                });
            });

            describe('lose', () => {
                it('should return lose if the other chose paper', () => {
                    expect(gameEngineService.calculateResult(rock, paper)).toEqual({
                        result: -1,
                        text: gameEngineService.getLoseText(rock, paper)
                    });
                });

                it('should return lose if the other chose spock', () => {
                    expect(gameEngineService.calculateResult(rock, spock)).toEqual({
                        result: -1,
                        text: gameEngineService.getLoseText(rock, spock)
                    });
                });

                it('should return lose if the other chose chuck', () => {
                    expect(gameEngineService.calculateResult(rock, chuck)).toEqual({
                        result: -1,
                        text: gameEngineService.getLoseText(rock, chuck)
                    });
                });
            });

        });

        describe('paper', () => {

            describe('draw', () => {
                it('should return draw if both chose paper', () => {
                    expect(gameEngineService.calculateResult(paper, paper)).toEqual(DRAW_RESULT_OBJECT);
                });
            });

            describe('win', () => {
                it('should return win if the other chose rock', () => {
                    expect(gameEngineService.calculateResult(paper, rock)).toEqual({
                        result: 1,
                        text: gameEngineService.getWinText(paper, rock)
                    });
                });

                it('should return win if the other chose spock', () => {
                    expect(gameEngineService.calculateResult(paper, spock)).toEqual({
                        result: 1,
                        text: gameEngineService.getWinText(paper, spock)
                    });
                });
            });

            describe('lose', () => {
                it('should return lose if the other chose scissors', () => {
                    expect(gameEngineService.calculateResult(paper, scissors)).toEqual({
                        result: -1,
                        text: gameEngineService.getLoseText(paper, scissors)
                    });
                });

                it('should return lose if the other chose lizard', () => {
                    expect(gameEngineService.calculateResult(paper, lizard)).toEqual({
                        result: -1,
                        text: gameEngineService.getLoseText(paper, lizard)
                    });
                });

                it('should return lose if the other chose chuck', () => {
                    expect(gameEngineService.calculateResult(paper, chuck)).toEqual({
                        result: -1,
                        text: gameEngineService.getLoseText(paper, chuck)
                    });
                });
            });

        });

        describe('paper', () => {

            describe('draw', () => {
                it('should return draw if both chose scissors', () => {
                    expect(gameEngineService.calculateResult(scissors, scissors)).toEqual(DRAW_RESULT_OBJECT);
                });
            });

            describe('win', () => {
                it('should return win if the other chose paper', () => {
                    expect(gameEngineService.calculateResult(scissors, paper)).toEqual({
                        result: 1,
                        text: gameEngineService.getWinText(scissors, paper)
                    });
                });

                it('should return win if the other chose lizard', () => {
                    expect(gameEngineService.calculateResult(scissors, lizard)).toEqual({
                        result: 1,
                        text: gameEngineService.getWinText(scissors, lizard)
                    });
                });
            });

            describe('lose', () => {
                it('should return lose if the other chose spock', () => {
                    expect(gameEngineService.calculateResult(scissors, spock)).toEqual({
                        result: -1,
                        text: gameEngineService.getLoseText(scissors, spock)
                    });
                });

                it('should return lose if the other chose rock', () => {
                    expect(gameEngineService.calculateResult(scissors, rock)).toEqual({
                        result: -1,
                        text: gameEngineService.getLoseText(scissors, rock)
                    });
                });

                it('should return lose if the other chose chuck', () => {
                    expect(gameEngineService.calculateResult(lizard, chuck)).toEqual({
                        result: -1,
                        text: gameEngineService.getLoseText(lizard, chuck)
                    });
                });
            });

        });

        describe('lizard', () => {

            describe('draw', () => {
                it('should return draw if both chose lizard', () => {
                    expect(gameEngineService.calculateResult(lizard, lizard)).toEqual(DRAW_RESULT_OBJECT);
                });
            });

            describe('win', () => {
                it('should return win if the other chose spock', () => {
                    expect(gameEngineService.calculateResult(lizard, spock)).toEqual({
                        result: 1,
                        text: gameEngineService.getWinText(lizard, spock)
                    });
                });

                it('should return win if the other chose paper', () => {
                    expect(gameEngineService.calculateResult(lizard, paper)).toEqual({
                        result: 1,
                        text: gameEngineService.getWinText(lizard, paper)
                    });
                });
            });

            describe('lose', () => {
                it('should return lose if the other chose rock', () => {
                    expect(gameEngineService.calculateResult(lizard, rock)).toEqual({
                        result: -1,
                        text: gameEngineService.getLoseText(lizard, rock)
                    });
                });

                it('should return lose if the other chose scissors', () => {
                    expect(gameEngineService.calculateResult(lizard, scissors)).toEqual({
                        result: -1,
                        text: gameEngineService.getLoseText(lizard, scissors)
                    });
                });

                it('should return lose if the other chose chuck', () => {
                    expect(gameEngineService.calculateResult(lizard, chuck)).toEqual({
                        result: -1,
                        text: gameEngineService.getLoseText(lizard, chuck)
                    });
                });
            });

        });

        describe('spock', () => {

            describe('draw', () => {
                it('should return draw if both chose spock', () => {
                    expect(gameEngineService.calculateResult(spock, spock)).toEqual(DRAW_RESULT_OBJECT);
                });
            });

            describe('win', () => {
                it('should return win if the other chose scissors', () => {
                    expect(gameEngineService.calculateResult(spock, scissors)).toEqual({
                        result: 1,
                        text: gameEngineService.getWinText(spock, scissors)
                    });
                });

                it('should return win if the other chose rock', () => {
                    expect(gameEngineService.calculateResult(spock, rock)).toEqual({
                        result: 1,
                        text: gameEngineService.getWinText(spock, rock)
                    });
                });
            });

            describe('lose', () => {
                it('should return lose if the other chose lizard', () => {
                    expect(gameEngineService.calculateResult(spock, lizard)).toEqual({
                        result: -1,
                        text: gameEngineService.getLoseText(spock, lizard)
                    });
                });

                it('should return lose if the other chose paper', () => {
                    expect(gameEngineService.calculateResult(spock, paper)).toEqual({
                        result: -1,
                        text: gameEngineService.getLoseText(spock, paper)
                    });
                });

                it('should return lose if the other chose chuck', () => {
                    expect(gameEngineService.calculateResult(spock, chuck)).toEqual({
                        result: -1,
                        text: gameEngineService.getLoseText(spock, chuck)
                    });
                });
            });

        });

        describe('chuck', () => {

            describe('draw', () => {
                it('should return draw if the other chose chuck', () => {
                    expect(gameEngineService.calculateResult(chuck, chuck)).toEqual(DRAW_RESULT_OBJECT);
                });
            });

            describe('win', () => {
                it('should return win if the other chose rock', () => {
                    expect(gameEngineService.calculateResult(chuck, rock)).toEqual({
                        result: 1,
                        text: gameEngineService.getWinText(chuck, rock)
                    });
                });

                it('should return win if the other chose paper', () => {
                    expect(gameEngineService.calculateResult(chuck, paper)).toEqual({
                        result: 1,
                        text: gameEngineService.getWinText(chuck, paper)
                    });
                });

                it('should return win if the other chose scissors', () => {
                    expect(gameEngineService.calculateResult(chuck, scissors)).toEqual({
                        result: 1,
                        text: gameEngineService.getWinText(chuck, scissors)
                    });
                });

                it('should return win if the other chose lizard', () => {
                    expect(gameEngineService.calculateResult(chuck, lizard)).toEqual({
                        result: 1,
                        text: gameEngineService.getWinText(chuck, lizard)
                    });
                });

                it('should return win if the other chose spock', () => {
                    expect(gameEngineService.calculateResult(chuck, spock)).toEqual({
                        result: 1,
                        text: gameEngineService.getWinText(chuck, spock)
                    });
                });
            });

        });

    });

});