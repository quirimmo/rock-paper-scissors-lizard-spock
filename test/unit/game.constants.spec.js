describe('GAME_CONSTANTS', () => {

    let GAME_CONSTANTS;

    beforeEach(() => {
        // injecting app module
        module('myApp');
        // injecting needed dependencies
        inject((_GAME_CONSTANTS_) => {
            GAME_CONSTANTS = _GAME_CONSTANTS_;
        });
    });

    describe('general', () => {

        it('should be defined', () => {
            expect(GAME_CONSTANTS).toBeDefined();
        });

        it('should be an object', () => {
            expect(GAME_CONSTANTS).toEqual(jasmine.any(Object));
        });

        describe('actions', () => {

            it('should be defined', () => {
                expect(GAME_CONSTANTS.actions).toBeDefined();
            });

            it('should be an array', () => {
                expect(GAME_CONSTANTS.actions).toEqual(jasmine.any(Array));
            });

            it('should have length 6', () => {
                expect(GAME_CONSTANTS.actions.length).toEqual(7);
            });

            describe('rock', () => {

                let rock;

                beforeEach(() => {
                    rock = GAME_CONSTANTS.actions.find(action => action.id === 'rock');
                });

                it('should be defined', () => {
                    expect(rock).toBeDefined();
                });

                it('should define its label', () => {
                    expect(rock.label).toEqual('Rock');
                });

                it('should define the winsAgainst', () => {
                    expect(rock.winsAgainst).toEqual([{
                        id: 'scissors',
                        term: 'crushes'
                    }, {
                        id: 'lizard',
                        term: 'crushes'
                    }]);
                });

                it('should define the losesAgainst', () => {
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

            describe('paper', () => {

                let paper;

                beforeEach(() => {
                    paper = GAME_CONSTANTS.actions.find(action => action.id === 'paper');
                });

                it('should be defined', () => {
                    expect(paper).toBeDefined();
                });

                it('should define its label', () => {
                    expect(paper.label).toEqual('Paper');
                });

                it('should define the winsAgainst', () => {
                    expect(paper.winsAgainst).toEqual([{
                        id: 'rock',
                        term: 'covers'
                    }, {
                        id: 'spock',
                        term: 'disproves'
                    }]);
                });

                it('should define the losesAgainst', () => {
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

            describe('scissors', () => {

                let scissors;

                beforeEach(() => {
                    scissors = GAME_CONSTANTS.actions.find(action => action.id === 'scissors');
                });

                it('should be defined', () => {
                    expect(scissors).toBeDefined();
                });

                it('should define its label', () => {
                    expect(scissors.label).toEqual('Scissors');
                });

                it('should define the winsAgainst', () => {
                    expect(scissors.winsAgainst).toEqual([{
                        id: 'paper',
                        term: 'cuts'
                    }, {
                        id: 'lizard',
                        term: 'decapitates'
                    }]);
                });

                it('should define the losesAgainst', () => {
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

            describe('lizard', () => {

                let lizard;

                beforeEach(() => {
                    lizard = GAME_CONSTANTS.actions.find(action => action.id === 'lizard');
                });

                it('should be defined', () => {
                    expect(lizard).toBeDefined();
                });

                it('should define its label', () => {
                    expect(lizard.label).toEqual('Lizard');
                });

                it('should define the winsAgainst', () => {
                    expect(lizard.winsAgainst).toEqual([{
                        id: 'spock',
                        term: 'poisons'
                    }, {
                        id: 'paper',
                        term: 'eats'
                    }]);
                });

                it('should define the losesAgainst', () => {
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

            describe('spock', () => {

                let spock;

                beforeEach(() => {
                    spock = GAME_CONSTANTS.actions.find(action => action.id === 'spock');
                });

                it('should be defined', () => {
                    expect(spock).toBeDefined();
                });

                it('should define its label', () => {
                    expect(spock.label).toEqual('Spock');
                });

                it('should define the winsAgainst', () => {
                    expect(spock.winsAgainst).toEqual([{
                        id: 'scissors',
                        term: 'smashes'
                    }, {
                        id: 'rock',
                        term: 'vaporizes'
                    }]);
                });

                it('should define the losesAgainst', () => {
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

            describe('chuck', () => {

                let chuck;

                beforeEach(() => {
                    chuck = GAME_CONSTANTS.actions.find(action => action.id === 'chuck');
                });

                it('should be defined', () => {
                    expect(chuck).toBeDefined();
                });

                it('should define its label', () => {
                    expect(chuck.label).toEqual('Chuck Norris');
                });

                it('should define the winsAgainst', () => {
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

                it('should define the losesAgainst', () => {
                    expect(chuck.losesAgainst).toEqual([]);
                });

            });

            describe('ethan', () => {

                let ethan;

                beforeEach(() => {
                    ethan = GAME_CONSTANTS.actions.find(action => action.id === 'ethan');
                });

                it('should be defined', () => {
                    expect(ethan).toBeDefined();
                });

                it('should define its label', () => {
                    expect(ethan.label).toEqual('Ethan');
                });

                it('should define the winsAgainst', () => {
                    expect(ethan.winsAgainst).toEqual([]);
                });

                it('should define the losesAgainst', () => {
                    expect(ethan.losesAgainst).toEqual([]);
                });

            });

        });

    });

});