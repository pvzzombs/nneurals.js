if(!Math.seedrandom){
  Math.seedrandom = function(seed){
    seed = seed || 1;
    this._seed = seed % 2147483647;
    
    if(this._seed <= 0){
      this._seed += 2147483646;
    }
  };

  Math._random = Math.random;

  Math.random = function(){
    this._seed = this._seed * 16807 % 2147483647;
    return (this._seed - 1) / 2147483646;
  };

  Math.deleteRandom = function(){
    this._seed = undefined;
    this.seedrandom = undefined;
    this.random = this._random;
    this._random = undefined;
  };

  Math.seedrandom(1);
}

function Matrix(width, length) {
  this.width = width;
  this.length = length;
  this.is2d = true;
  this.shape = [width, length];
  this.value = [];
  this.seed = function(n){
    Math.seedrandom(n);
  };
  this.change = function (array) {
    this.value = array;
    this.width = array[0].length;
    this.length = array.length;
    this.shape = [array[0].length, array.length];
  };

  /* ChHECKING... */
  if (Array.isArray(width)) {
    this.change(width);
  }

  //inputs
  this.input = function (array) {
    var t = [];
    var output = [];
    var k = 0;
    for (var i = 0; i < this.length; i++) {
      t = [];
      for (var j = 0; j < this.width; j++) {
        t.push(array[k]);
        k++;
      }
      output.push(t);
    }
    this.value = output.slice();
    return output;
  };
}

Matrix.prototype = {
  //create
  create: function (array) {
    return (new Matrix(array));
  },
  //add
  add: function (array, x) {
    var output = [];
    var t = [];
    for (var i = 0; i < this.length; i++) {
      t = [];
      for (var j = 0; j < this.width; j++) {
        t.push(this.value[i][j] + array.value[i][j]);
      }
      output.push(t);
    }
    if (!x) {
      return this.create(output);
    }
    this.change(output);
    return this;
  },
  //subtract
  subtract: function (array, x) {
    var output = [];
    var t = [];
    for (var i = 0; i < this.length; i++) {
      t = [];
      for (var j = 0; j < this.width; j++) {
        t.push(this.value[i][j] - array.value[i][j]);
      }
      output.push(t);
    }
    if (!x) {
      return this.create(output);
    }
    this.change(output);
    return this;
  },
  //scalar multiplication
  sMultiply: function (num, x) {
    var output = [];
    var t = [];
    for (var i = 0; i < this.length; i++) {
      t = [];
      for (var j = 0; j < this.width; j++) {
        t.push(this.value[i][j] * num);
      }
      output.push(t);
    }
    if (!x) {
      return this.create(output);
    }
    this.change(output);
    return this;
  },
  //scalar division
  sDivide: function (num, x) {
    var output = [];
    var t = [];
    for (var i = 0; i < this.length; i++) {
      t = [];
      for (var j = 0; j < this.width; j++) {
        t.push(this.value[i][j] / num);
      }
      output.push(t);
    }
    if (!x) {
      return this.create(output);
    }
    this.change(output);
    return this;
  },
  //multiply matrices
  multiply: function (array, x) {
    var temp = [];
    var output = [];
    var num = 0;
    for (var i = 0; i < this.length; i++) {
      temp = [];
      for (var j = 0; j < array.width; j++) {
        num = 0;
        for (var k = 0; k < this.width; k++) {
          num += this.value[i][k] * array.value[k][j];
        }
        temp.push(num);
      }
      output.push(temp);
    }
    if (!x) {
      return this.create(output);
    }
    this.change(output);
    return this;
  },
  //divide matrices
  divide: function (array, x) {
    var temp = [];
    var output = [];
    var num = 0;
    for (var i = 0; i < this.length; i++) {
      temp = [];
      for (var j = 0; j < array.width; j++) {
        num = 0;
        for (var k = 0; k < this.width; k++) {
          num += this.value[i][k] / array.value[k][j];
        }
        temp.push(num);
      }
      output.push(temp);
    }
    if (!x) {
      return this.create(output);
    }
    this.change(output);
    return this;
  },
  //transpose
  transpose: function (x) {
    var output = [];
    for (var a = 0; a < this.width; a++) {
      output.push([]);
    }
    for (var i = 0; i < this.length; i++) {
      //temp = [];
      for (var j = 0; j < this.width; j++) {
        //temp.push(this.value[j][i]);
        output[j][i] = this.value[i][j];
      }
      //output.push(temp)
    }
    if (!x) {
      return this.create(output);
    }
    this.change(output);
    return this;
  },

  //sigmoid
  sigmoid: function (x) {
    var output = [];
    var t = [];
    for (var i = 0; i < this.length; i++) {
      t = [];
      for (var j = 0; j < this.width; j++) {
        t.push(1 / (1 + Math.pow(Math.E, -this.value[i][j])));
      }
      output.push(t);
    }
    if (!x) {
      return this.create(output);
    }
    this.change(output);
    return this;
  },
  //random
  random: function (x) {
    var t = [];
    var output = [];
    var k = 0;
    for (var i = 0; i < this.length; i++) {
      t = [];
      for (var j = 0; j < this.width; j++) {
        t.push(Math.random());
        k++;
      }
      output.push(t);
    }
    if (!x) {
      return this.create(output);
    }
    this.change(output.slice());
    return this;
  },
  //fAdd
  fAdd: function (num, x) {
    var output = [];
    var t = [];
    for (var i = 0; i < this.length; i++) {
      t = [];
      for (var j = 0; j < this.width; j++) {
        t.push(num + this.value[i][j]);
      }
      output.push(t);
    }
    if (!x) {
      return this.create(output);
    }
    this.change(output);
    return this;
  },
  //fSub
  fSub: function (num, x) {
    var output = [];
    var t = [];
    for (var i = 0; i < this.length; i++) {
      t = [];
      for (var j = 0; j < this.width; j++) {
        t.push(num - this.value[i][j]);
      }
      output.push(t);
    }
    if (!x) {
      return this.create(output);
    }
    this.change(output);
    return this;
  },
  //fillZero
  zero: function (x) {
    var t = [];
    var output = [];
    var k = 0;
    for (var i = 0; i < this.length; i++) {
      t = [];
      for (var j = 0; j < this.width; j++) {
        t.push(0);
        k++;
      }
      output.push(t);
    }
    if (!x) {
      return this.create(output);
    }
    this.change(output.slice());
    return this;
  },
  //fillOnes
  one: function (x) {
    var t = [];
    var output = [];
    var k = 0;
    for (var i = 0; i < this.length; i++) {
      t = [];
      for (var j = 0; j < this.width; j++) {
        t.push(1);
        k++;
      }
      output.push(t);
    }
    if (!x) {
      return this.create(output);
    }
    this.change(output.slice());
    return this;
  },
  //fillAnything
  fill: function (num, x) {
    var t = [];
    var output = [];
    var k = 0;
    for (var i = 0; i < this.length; i++) {
      t = [];
      for (var j = 0; j < this.width; j++) {
        t.push(num);
        k++;
      }
      output.push(t);
    }
    if (!x) {
      return this.create(output);
    }
    this.change(output.slice());
    return this;
  },
  //add elems
  eAdd: function (x) {
    var k = 0;
    for (var i = 0; i < this.length; i++) {
      k += this.value[i][0];
    }
    if (!x) {
      return this.create(output);
    }
    this.change([
      [k]
    ]);
    return this;
  },
  //dot
  dot: function (a, b) {
    if (typeof a === "number") {
      return this.sMultiply(a, b);
    }
    return this.multiply(a, b);
  },
  //transpose
  T: function (a) {
    return this.transpose(a);
  },
  //linear multiply 1dimesion like
  lDot: function (array, x) {
    var output = [];
    var t = [];
    for (var i = 0; i < this.length; i++) {
      t = [];
      for (var j = 0; j < this.width; j++) {
        t.push(this.value[i][j] * array.value[i][j]);
      }
      output.push(t);
    }
    if (!x) {
      return this.create(output);
    }
    this.change(output);
    return this;
  },
  //linear multiply 1dimesion like
  lDivide: function (array, x) {
    var output = [];
    var t = [];
    for (var i = 0; i < this.length; i++) {
      t = [];
      for (var j = 0; j < this.width; j++) {
        t.push(this.value[i][j] / array.value[i][j]);
      }
      output.push(t);
    }
    if (!x) {
      return this.create(output);
    }
    this.change(output);
    return this;
  }
};
/* version 1.0.1 */
function m(a, b) {
  return (new Matrix(a, b));
}

function nn(nI, nH, nO) {
  this.input = null;
  this.output1 = null;
  this.output2 = null;
  this.output = null;

  this.bias = 1;

  this.error1 = null;
  this.errorD1 = null;

  this.error2 = null;
  this.errorD2 = null;

  this.takeInput = function(arr){
    this.input = m(arr);
  };

  this.takeOutput = function(arr){
    this.output = m(arr);
  };

  this.think1 = function () {
    return this.input.dot(this.weight1).fAdd(this.bias).sigmoid();
  };

  this.think2 = function () {
    return this.output1.dot(this.weight2).sigmoid();
  };

  this.think = function (arr) {
    return arr.dot(this.weight1).sigmoid().dot(this.weight2).sigmoid();
  };

  this.feedForward = function(arr){
    var mt = m(arr);
    return mt.dot(this.weight1).sigmoid().dot(this.weight2).sigmoid().value;
  };

  this.sigmoidDerivative = function (arr) {
    return arr.lDot(arr.fSub(1));
  };

  this.train = function (iterations) {
    //initialize number of inputs
    nI = nI || this.input.width;
    //initialize number of hiddens
    nH = nH || nI;
    //initialize number of outputs
    nO = nO || this.output.width;
    //load weight1
    this.weight1 = this.weight1 || m(nH, nI).random();
    //load weight2
    this.weight2 = this.weight2 || m(nO, nH).random();

    var adjustment1;
    var adjustment2;
    //start
    for (var i = 0; i < iterations; i++) {
      this.output1 = this.think1();
      this.output2 = this.think2();

      //calculate error for output weight2

      this.error2 = this.output.subtract(this.output2).sMultiply(2);
      this.errorD2 = this.error2.lDot(this.sigmoidDerivative(this.output2));

      //calculate error 1
      this.error1 = this.errorD2.dot(this.weight2.T()).sMultiply(2);
      this.errorD1 = this.error1.lDot(this.sigmoidDerivative(this.output1));

      //adjustments
      adjustment1 = this.input.T().dot(this.errorD1);
      adjustment2 = this.output1.T().dot(this.errorD2);

      //adjust
      this.weight1.add(adjustment1, 1);
      this.weight2.add(adjustment2, 1);
    }
  };
}