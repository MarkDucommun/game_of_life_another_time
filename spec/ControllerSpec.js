describe("Controller", function(){
  var Controller = require('../lib/Controller.js');

  it("should be able to initialize with a particular state", function(){
    controller = new Controller(3);
  });

  it("should be able to tell whether a cell at a position is alive or dead", function(){
    controller = new Controller(3, '111000000');
    expect(controller.isPositionAlive(0,0)).toBe(false);
    expect(controller.isPositionAlive(0,2)).toBe(true);
  });

  it("should be able to tick", function() {
    controller = new Controller(3, '111000000');
    expect(controller.isPositionAlive(1,1)).toBe(false);
    controller.tick();
    expect(controller.isPositionAlive(1,1)).toBe(true);
  })
});
