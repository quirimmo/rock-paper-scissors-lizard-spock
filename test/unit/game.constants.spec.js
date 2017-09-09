describe('GAME_CONSTANTS', function() {

    let GAME_CONSTANTS;

    beforeEach(function() {
        module('myApp');

        inject(function(_GAME_CONSTANTS_) {
            GAME_CONSTANTS = _GAME_CONSTANTS_;
        });
    });

    describe('general', function() {

        it('should be defined', function() {
            expect(GAME_CONSTANTS).toBeDefined();
        });

        it('should be an object', function() {
            expect(GAME_CONSTANTS).toEqual(jasmine.any(Object));
        });

        describe('actions', function() {

            it('should be defined', function() {
                expect(GAME_CONSTANTS.actions).toBeDefined();
            });

            it('should be an array', function() {
                expect(GAME_CONSTANTS.actions).toEqual(jasmine.any(Array));
            });

            it('should have length 6', function() {
                expect(GAME_CONSTANTS.actions.length).toEqual(6);
            });

            describe('rock', function() {

                let rock;

                beforeEach(() => {
                    rock = GAME_CONSTANTS.actions.find(action => action.id === 'rock');
                });

                it('should be defined', function() {
                    expect(rock).toBeDefined();
                });

                it('should define its label', function() {
                    expect(rock.label).toEqual('Rock');
                });

                it('should define the winsAgainst', function() {
                    expect(rock.winsAgainst).toEqual([{
                        id: 'scissors',
                        term: 'crushes'
                    }, {
                        id: 'lizard',
                        term: 'crushes'
                    }]);
                });

                it('should define the losesAgainst', function() {
                    expect(rock.losesAgainst).toEqual([{
                        id: 'paper',
                        term: 'covered'
                    }, {
                        id: 'spock',
                        term: 'vaporized'
                    }, {
                        id: 'chuck',
                        term: 'killed'
                    }]);
                });

            });

            describe('paper', function() {

                let paper;

                beforeEach(() => {
                    paper = GAME_CONSTANTS.actions.find(action => action.id === 'paper');
                });

                it('should be defined', function() {
                    expect(paper).toBeDefined();
                });

                it('should define its label', function() {
                    expect(paper.label).toEqual('Paper');
                });

                it('should define the winsAgainst', function() {
                    expect(paper.winsAgainst).toEqual([{
                        id: 'rock',
                        term: 'covers'
                    }, {
                        id: 'spock',
                        term: 'disproves'
                    }]);
                });

                it('should define the losesAgainst', function() {
                    expect(paper.losesAgainst).toEqual([{
                        id: 'lizard',
                        term: 'eaten'
                    }, {
                        id: 'scissors',
                        term: 'cut'
                    }, {
                        id: 'chuck',
                        term: 'killed'
                    }]);
                });

            });

            describe('scissors', function() {

                let scissors;

                beforeEach(() => {
                    scissors = GAME_CONSTANTS.actions.find(action => action.id === 'scissors');
                });

                it('should be defined', function() {
                    expect(scissors).toBeDefined();
                });

                it('should define its label', function() {
                    expect(scissors.label).toEqual('Scissors');
                });

                it('should define the winsAgainst', function() {
                    expect(scissors.winsAgainst).toEqual([{
                        id: 'paper',
                        term: 'cuts'
                    }, {
                        id: 'lizard',
                        term: 'decapitates'
                    }]);
                });

                it('should define the losesAgainst', function() {
                    expect(scissors.losesAgainst).toEqual([{
                        id: 'rock',
                        term: 'crushed'
                    }, {
                        id: 'spock',
                        term: 'smashed'
                    }, {
                        id: 'chuck',
                        term: 'killed'
                    }]);
                });

            });

            describe('lizard', function() {

                let lizard;

                beforeEach(() => {
                    lizard = GAME_CONSTANTS.actions.find(action => action.id === 'lizard');
                });

                it('should be defined', function() {
                    expect(lizard).toBeDefined();
                });

                it('should define its label', function() {
                    expect(lizard.label).toEqual('Lizard');
                });

                it('should define the winsAgainst', function() {
                    expect(lizard.winsAgainst).toEqual([{
                        id: 'spock',
                        term: 'poisons'
                    }, {
                        id: 'paper',
                        term: 'eats'
                    }]);
                });

                it('should define the losesAgainst', function() {
                    expect(lizard.losesAgainst).toEqual([{
                        id: 'scissors',
                        term: 'decapitated'
                    }, {
                        id: 'rock',
                        term: 'crushed'
                    }, {
                        id: 'chuck',
                        term: 'killed'
                    }]);
                });

            });

            describe('spock', function() {

                let spock;

                beforeEach(() => {
                    spock = GAME_CONSTANTS.actions.find(action => action.id === 'spock');
                });

                it('should be defined', function() {
                    expect(spock).toBeDefined();
                });

                it('should define its label', function() {
                    expect(spock.label).toEqual('Spock');
                });

                it('should define the winsAgainst', function() {
                    expect(spock.winsAgainst).toEqual([{
                        id: 'scissors',
                        term: 'smashes'
                    }, {
                        id: 'rock',
                        term: 'vaporizes'
                    }]);
                });

                it('should define the losesAgainst', function() {
                    expect(spock.losesAgainst).toEqual([{
                        id: 'paper',
                        term: 'disproved'
                    }, {
                        id: 'lizard',
                        term: 'poisoned'
                    }, {
                        id: 'chuck',
                        term: 'killed'
                    }]);
                });

            });

            describe('chuck', function() {

                let chuck;

                beforeEach(() => {
                    chuck = GAME_CONSTANTS.actions.find(action => action.id === 'chuck');
                });

                it('should be defined', function() {
                    expect(chuck).toBeDefined();
                });

                it('should define its label', function() {
                    expect(chuck.label).toEqual('Chuck Norris');
                });

                it('should define the winsAgainst', function() {
                    expect(chuck.winsAgainst).toEqual([{
                        id: 'rock',
                        term: 'kills'
                    }, {
                        id: 'paper',
                        term: 'kills'
                    }, {
                        id: 'scissors',
                        term: 'kills'
                    }, {
                        id: 'lizard',
                        term: 'kills'
                    }, {
                        id: 'spock',
                        term: 'kills'
                    }]);
                });

                it('should define the losesAgainst', function() {
                    expect(chuck.losesAgainst).toEqual([{
                        id: 'chuck',
                        term: 'killed'
                    }]);
                });

            });

        });

    });

});