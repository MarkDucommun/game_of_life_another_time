var Board = require('./Board');

function Controller(dimension, initialStates) {
  this.present = new Board(dimension, initialStates);
};

Controller.prototype.tick = function () {
  var newBoard = new Board();

  this.present.grid

  for (var pos in this.present.grid) {
    if (this.present.grid.hasOwnProperty(pos)) {
      pos.split(',')
    }
  }
};

Controller.prototype.isPositionAlive = function (xPos, yPos) {
  return this.present.isPositionAlive(xPos, yPos);
};

module.exports = Controller;
