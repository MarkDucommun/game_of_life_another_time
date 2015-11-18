describe("Board", function() {
  var Board = require('../lib/Board');

  //  2 o o o
  //  1 o o o
  //  0 o o o
  //    0 1 2

  beforeEach(function() {
    board = new Board();
  });

  it("there should be a board", function() {
    board = new Board();
  });

  it("should initialize with a specified (square) dimension", function(){
    oneSizeBoard = new Board(1);
    twoSizeBoard = new Board(2);

    expect(oneSizeBoard.dimension).toEqual(1);
    expect(twoSizeBoard.dimension).toEqual(2);
  });

  it("initializes all cells as dead", function(){
    expect(board.isPositionAlive(0,0)).toBe(false);
  });

  it("can set cell states on init", function() {
    //  o x
    //  x o
    newBoard = new Board(2, "0110");
    expect(newBoard.isPositionAlive(0,0)).toBe(true)
    expect(newBoard.isPositionAlive(1,0)).toBe(false)
    expect(newBoard.isPositionAlive(0,1)).toBe(false)
    expect(newBoard.isPositionAlive(1,1)).toBe(true);
  });

  it("can make a cell at a position alive", function(){
    expect(board.isPositionAlive(0,0)).toBe(false);

    board.makeAlive(0,0);
    expect(board.isPositionAlive(0,0)).toBe(true);
  });

  it("can make a cell at a position dead", function(){
    board.makeAlive(0,0);
    expect(board.isPositionAlive(0,0)).toBe(true);

    board.makeDead(0,0);
    expect(board.isPositionAlive(0,0)).toBe(false);
  });

  describe("knows whether a cell at a position will be alive or dead next turn", function() {
    describe("alive cell at a position", function() {
      it("stays alive with 3 alive neighbors", function(){
        var allAliveBoard = new Board(2, '1111');
        expect(allAliveBoard.willPositionBeAlive(0,0)).toBe(true);
      });

      it("stays alive with 2 alive neighbors", function() {
        var almostAllAliveBoard = new Board(2, '1110');
        expect(almostAllAliveBoard.willPositionBeAlive(0,0)).toBe(true);
      });

      it("dies without exactly 2 or 3 neighbors", function() {
        var almostDeadBoard = new Board(2, '0110');
        expect(almostDeadBoard.willPositionBeAlive(0,0)).toBe(false);

        var allAliveBoard = new Board(3, '111111111');
        expect(allAliveBoard.willPositionBeAlive(1,1)).toBe(false);
      });
    });

    describe("dead cell at a position", function() {
      it("stays dead unless it has 3 alive neighbors", function() {
        var allDeadBoard = new Board(2);
        var almostDeadBoard = new Board(2, '0100');
        var lessAlmostDeadBoard = new Board(2, '1100');

        expect(allDeadBoard.willPositionBeAlive(0,0)).toBe(false);
        expect(almostDeadBoard.willPositionBeAlive(1,1)).toBe(false);
        expect(lessAlmostDeadBoard.willPositionBeAlive(0,0)).toBe(false);
      });

      it("comes to life with 3 alive neighbors", function() {
        var partialAliveBoard = new Board(2, '1110');
        expect(partialAliveBoard.willPositionBeAlive(1,0)).toBe(true);
      });
    });
  });
});


// Any live cell with fewer than two live neighbours dies, as if by needs caused by underpopulation.
// Any live cell with more than three live neighbours dies, as if by overcrowding.
// Any live cell with two or three live neighbours lives, unchanged, to the next generation.
// Any dead cell with exactly three live neighbours cells will come to life.
