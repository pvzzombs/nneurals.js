const { nn } = require("../../nneurals.js");

describe("Let see if this works", function(){
  var a = require("../../nneurals.js");
  var test = [[1,0],[0,1],[0,0],[1,1]];
  var output = [[1],[1],[0],[0]];
  var ai, result;

  it("must be here", function(){
    expect(a.nn).toBeDefined();
    expect(a.m).toBeDefined();
  });

  it("must create an object", function(){
    ai = new nn();
    expect(ai).toBeInstanceOf(nn);
    ai.input = a.m(test);
    ai.output = a.m(output);
    ai.train(1000);
    //console.log(ai);
  });

  it("must be a 2d array", function(){
    result = ai.think(a.m([[1,0]])).value;
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toBeInstanceOf(Array);
    expect(result[0][0]).toBeInstanceOf(Number);
  });

  it("must be accurate", function(){
    expect(result[0][0]).toBeGreaterThan(0.90);
  });
});