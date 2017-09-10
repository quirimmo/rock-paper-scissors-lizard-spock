describe('gameService', function() {

    let gameService, $localStorage;

    beforeEach(function() {
        module('myApp');

        module(function($provide) {
            $provide.value('$localStorage', {
                numOfMatches: 1,
                numOfVictories: 2,
                numOfLoses: 3,
                numOfDraws: 4,
                numOfConsecutiveVictories: 5,
                numOfConsecutiveLoses: 6,
                numOfConsecutiveDraws: 7
            });
        });

        inject(function(_gameService_, _$localStorage_) {
            gameService = _gameService_;
            $localStorage = _$localStorage_;
        });

    });


    describe('init', function() {

        it('should be defined', function() {
            expect(gameService).toBeDefined();
        });

        it('should define the exposed getter methods', () => {
            expect(gameService.getNumOfMatches).toEqual(jasmine.any(Function));
            expect(gameService.getNumOfVictories).toEqual(jasmine.any(Function));
            expect(gameService.getNumOfLoses).toEqual(jasmine.any(Function));
            expect(gameService.getNumOfDraws).toEqual(jasmine.any(Function));
            expect(gameService.getNumOfConsecutiveVictories).toEqual(jasmine.any(Function));
            expect(gameService.getNumOfConsecutiveLoses).toEqual(jasmine.any(Function));
            expect(gameService.getNumOfConsecutiveDraws).toEqual(jasmine.any(Function));
        });

        it('should define the exposed increment methods', () => {
            expect(gameService.incrementNumOfMatches).toEqual(jasmine.any(Function));
            expect(gameService.incrementNumOfVictories).toEqual(jasmine.any(Function));
            expect(gameService.incrementNumOfLoses).toEqual(jasmine.any(Function));
            expect(gameService.incrementNumOfDraws).toEqual(jasmine.any(Function));
            expect(gameService.incrementNumOfConsecutiveVictories).toEqual(jasmine.any(Function));
            expect(gameService.incrementNumOfConsecutiveLoses).toEqual(jasmine.any(Function));
            expect(gameService.incrementNumOfConsecutiveDraws).toEqual(jasmine.any(Function));
        });

        it('should define the exposed restartGame method', () => {
            expect(gameService.restartGame).toEqual(jasmine.any(Function));
        });

    });

    describe('restartGame', () => {

        it('should reset all the stored values', () => {
            expect($localStorage.numOfMatches).toEqual(1);
            expect($localStorage.numOfVictories).toEqual(2);
            expect($localStorage.numOfLoses).toEqual(3);
            expect($localStorage.numOfDraws).toEqual(4);
            expect($localStorage.numOfConsecutiveVictories).toEqual(5);
            expect($localStorage.numOfConsecutiveLoses).toEqual(6);
            expect($localStorage.numOfConsecutiveDraws).toEqual(7);

            gameService.restartGame();

            expect($localStorage.numOfMatches).toEqual(0);
            expect($localStorage.numOfVictories).toEqual(0);
            expect($localStorage.numOfLoses).toEqual(0);
            expect($localStorage.numOfDraws).toEqual(0);
            expect($localStorage.numOfConsecutiveVictories).toEqual(0);
            expect($localStorage.numOfConsecutiveLoses).toEqual(0);
            expect($localStorage.numOfConsecutiveDraws).toEqual(0);
        });

    });

    describe('increment matches, wins, loses and draws methods', () => {

        describe('incrementNumOfMatches', function() {
            it('should increment the value in the service and the storage', function() {
                let beforeLocalStorageValue = $localStorage.numOfMatches;
                expect(gameService.getNumOfMatches()).toEqual(beforeLocalStorageValue);
                gameService.incrementNumOfMatches();
                expect(gameService.getNumOfMatches()).toEqual(beforeLocalStorageValue + 1);
            });
        });

        describe('incrementNumOfVictories', function() {
            it('should increment the value in the service and the storage', function() {
                let beforeLocalStorageValue = $localStorage.numOfVictories;
                expect(gameService.getNumOfVictories()).toEqual(beforeLocalStorageValue);
                gameService.incrementNumOfVictories();
                expect(gameService.getNumOfVictories()).toEqual(beforeLocalStorageValue + 1);
            });
        });

        describe('incrementNumOfLoses', function() {
            it('should increment the value in the service and the storage', function() {
                let beforeLocalStorageValue = $localStorage.numOfLoses;
                expect(gameService.getNumOfLoses()).toEqual(beforeLocalStorageValue);
                gameService.incrementNumOfLoses();
                expect(gameService.getNumOfLoses()).toEqual(beforeLocalStorageValue + 1);
            });
        });

        describe('incrementNumOfDraws', function() {
            it('should increment the value in the service and the storage', function() {
                let beforeLocalStorageValue = $localStorage.numOfDraws;
                expect(gameService.getNumOfDraws()).toEqual(beforeLocalStorageValue);
                gameService.incrementNumOfDraws();
                expect(gameService.getNumOfDraws()).toEqual(beforeLocalStorageValue + 1);
            });
        });

    });

    describe('increment consecutive wins, loses and draws methods', () => {

        describe('incrementNumOfConsecutiveVictories', function() {
            it('should increment the value if the number of current consecutive victories is greater than the one in the local storage', function() {
                let beforeLocalStorageValue = $localStorage.numOfConsecutiveVictories;
                expect(gameService.getNumOfConsecutiveVictories()).toEqual(beforeLocalStorageValue);
                for (let i = 0; i < beforeLocalStorageValue + 1; i++) {
                    gameService.incrementNumOfVictories();
                }
                gameService.incrementNumOfConsecutiveVictories();
                expect(gameService.getNumOfConsecutiveVictories()).toEqual(beforeLocalStorageValue + 1);
            });

            it('should not increment the value if the number of current consecutive victories is lower than the one in the local storage', function() {
                let beforeLocalStorageValue = $localStorage.numOfConsecutiveVictories;
                expect(gameService.getNumOfConsecutiveVictories()).toEqual(beforeLocalStorageValue);
                for (let i = 0; i < beforeLocalStorageValue - 1; i++) {
                    gameService.incrementNumOfVictories();
                }
                gameService.incrementNumOfConsecutiveVictories();
                expect(gameService.getNumOfConsecutiveVictories()).toEqual(beforeLocalStorageValue);
            });

        });

        describe('incrementNumOfConsecutiveLoses', function() {
            it('should increment the value if the number of current consecutive loses is greater than the one in the local storage', function() {
                let beforeLocalStorageValue = $localStorage.numOfConsecutiveLoses;
                expect(gameService.getNumOfConsecutiveLoses()).toEqual(beforeLocalStorageValue);
                for (let i = 0; i < beforeLocalStorageValue + 1; i++) {
                    gameService.incrementNumOfLoses();
                }
                gameService.incrementNumOfConsecutiveLoses();
                expect(gameService.getNumOfConsecutiveLoses()).toEqual(beforeLocalStorageValue + 1);
            });

            it('should not increment the value if the number of current consecutive loses is lower than the one in the local storage', function() {
                let beforeLocalStorageValue = $localStorage.numOfConsecutiveLoses;
                expect(gameService.getNumOfConsecutiveLoses()).toEqual(beforeLocalStorageValue);
                for (let i = 0; i < beforeLocalStorageValue - 1; i++) {
                    gameService.incrementNumOfLoses();
                }
                gameService.incrementNumOfConsecutiveLoses();
                expect(gameService.getNumOfConsecutiveLoses()).toEqual(beforeLocalStorageValue);
            });
        });

        describe('incrementNumOfConsecutiveDraws', function() {
            it('should increment the value if the number of current consecutive draws is greater than the one in the local storage', function() {
                let beforeLocalStorageValue = $localStorage.numOfConsecutiveDraws;
                expect(gameService.getNumOfConsecutiveDraws()).toEqual(beforeLocalStorageValue);
                for (let i = 0; i < beforeLocalStorageValue + 1; i++) {
                    gameService.incrementNumOfDraws();
                }
                gameService.incrementNumOfConsecutiveDraws();
                expect(gameService.getNumOfConsecutiveDraws()).toEqual(beforeLocalStorageValue + 1);
            });

            it('should not increment the value if the number of current consecutive draws is lower than the one in the local storage', function() {
                let beforeLocalStorageValue = $localStorage.numOfConsecutiveDraws;
                expect(gameService.getNumOfConsecutiveDraws()).toEqual(beforeLocalStorageValue);
                for (let i = 0; i < beforeLocalStorageValue - 1; i++) {
                    gameService.incrementNumOfDraws();
                }
                gameService.incrementNumOfConsecutiveDraws();
                expect(gameService.getNumOfConsecutiveDraws()).toEqual(beforeLocalStorageValue);
            });
        });

    });

    describe('getters methods', () => {
        describe('getNumOfMatches', function() {
            it('should return the value stored in the local storage', function() {
                expect(gameService.getNumOfMatches()).toEqual($localStorage.numOfMatches);
            });
        });

        describe('getNumOfVictories', function() {
            it('should return the value stored in the local storage', function() {
                expect(gameService.getNumOfVictories()).toEqual($localStorage.numOfVictories);
            });
        });

        describe('getNumOfLoses', function() {
            it('should return the value stored in the local storage', function() {
                expect(gameService.getNumOfLoses()).toEqual($localStorage.numOfLoses);
            });
        });

        describe('getNumOfDraws', function() {
            it('should return the value stored in the local storage', function() {
                expect(gameService.getNumOfDraws()).toEqual($localStorage.numOfDraws);
            });
        });

        describe('getNumOfConsecutiveVictories', function() {
            it('should return the value stored in the local storage', function() {
                expect(gameService.getNumOfConsecutiveVictories()).toEqual($localStorage.numOfConsecutiveVictories);
            });
        });

        describe('getNumOfConsecutiveLoses', function() {
            it('should return the value stored in the local storage', function() {
                expect(gameService.getNumOfConsecutiveLoses()).toEqual($localStorage.numOfConsecutiveLoses);
            });
        });

        describe('getNumOfConsecutiveDraws', function() {
            it('should return the value stored in the local storage', function() {
                expect(gameService.getNumOfConsecutiveDraws()).toEqual($localStorage.numOfConsecutiveDraws);
            });
        });
    });

});