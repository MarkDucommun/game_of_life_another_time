function Board(dimension, initialStates) {
  this.dimension = dimension;
  this.grid = {}

  if (initialStates && initialStates.indexOf('1') != -1 )
    this.setInitialState(initialStates);
}

Board.prototype.isPositionAlive = function (xPos, yPos) {
  return Boolean(this.grid[this.createKey(xPos, yPos)]);
};

Board.prototype.makeDead = function (xPos, yPos) {
  this.setPositionState(xPos, yPos, false);
};

Board.prototype.makeAlive = function (xPos, yPos) {
  this.setPositionState(xPos, yPos, true);
};

Board.prototype.willPositionBeAlive = function (xPos, yPos) {
  var aliveNeighborCount = this.aliveNeighborCount(xPos, yPos);
  if (aliveNeighborCount === 3) {
    return true;
  } else if (aliveNeighborCount === 2) {
    return this.isPositionAlive(xPos, yPos);
  } else {
    return false;
  };
};

// PRIVATE

Board.prototype.aliveNeighborCount = function (xPos, yPos) {
  var transformationRules = [
    {
      xTransform: -1,
      yTransform: -1
    },
    {
      xTransform: 0,
      yTransform: -1
    },
    {
      xTransform: 1,
      yTransform: -1
    },
    {
      xTransform: -1,
      yTransform: 0
    },
    {
      xTransform: 1,
      yTransform: 0
    },
    {
      xTransform: -1,
      yTransform: 1
    },
    {
      xTransform: 0,
      yTransform: 1
    },
    {
      xTransform: 1,
      yTransform: 1
    }
  ];

  var aliveCount = 0;

  for (var i = 0; i < transformationRules.length; i++) {
    var rule = transformationRules[i];
    var neightborXPos = xPos + rule.xTransform;
    var neightborYPos = yPos + rule.yTransform;
    if (this.isPositionAlive(neightborXPos, neightborYPos)) aliveCount++;
  }

  return aliveCount;
};

Board.prototype.setPositionState = function (xPos, yPos, state) {
  this.grid[this.createKey(xPos, yPos)] = state;
};

Board.prototype.createKey = function (xPos, yPos) {
  return xPos + "," + yPos;
};

Board.prototype.setInitialState = function (initialStates) {
  var array = initialStates.split('');
  var splitIterations = array.length / this.dimension;
  var arrayOfRows = [];

  for (var counter = 0; counter < splitIterations; counter++) {
    var shiftAmount = counter * this.dimension;
    var row = array.slice(shiftAmount, shiftAmount + this.dimension);
    arrayOfRows.unshift(row);
  };

  for (var rowIndex = 0; rowIndex < arrayOfRows.length; rowIndex++) {
    var row = arrayOfRows[rowIndex]

    for (var columnIndex = 0; columnIndex < row.length; columnIndex++) {
      if (row[columnIndex] === '1')
        this.makeAlive(columnIndex, rowIndex);
    }
  };
};

module.exports = Board;
