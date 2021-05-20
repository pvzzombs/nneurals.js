# nneurals.js  [![DeepScan grade](https://deepscan.io/api/teams/5260/projects/8690/branches/109008/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5260&pid=8690&bid=109008) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/pvzzombs/nneurals.js.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/pvzzombs/nneurals.js/context:javascript)  
A simple three layer neural network perceptron in javascript
  
  
### What is nneurals.js  
**nneurals.js** is a simple three layer neural network perceptron in javascript.  
  
  
### Usage
Get a copy of ``nneurals.js`` first.
Then use it as follows (see example below)  
  
  
### Examples
1.) Creating a 3-5-2 neural network:  
```javascript
//create a new instance of ai
var ai = new nn(3,5,2);

//input the training set to ai
ai.input = m(/*INPUT_2D_ARRAY*/);

//input the output set to ai
ai.output = m(/*OUTPUT_2D_ARRAY*/);

//train the ai
ai.train(10000);
/*****/

//ask the ai 
var result = ai.think(m(/*INPUT_2D_ARRAY*/)).value;
```   
2.) Creating an automatic neural network (will base its neuron sizes to the inputs):  
```javascript
//create a new instance of ai
var ai = new nn();

//input the training set to ai
ai.input = m(/*INPUT_2D_ARRAY*/);

//input the output set to ai
ai.output = m(/*OUTPUT_2D_ARRAY*/);

//train the ai
ai.train(10000);
/*****/

//ask the ai 
var result = ai.think(m(/*INPUT_2D_ARRAY*/)).value;
```   
**REAL example**
```javascript
//lets create a test data (XOR test)
var test = [[1,0],[0,1],[0,0],[1,1]];
var output = [[1],[1],[0],[0]];

//create a new instance of ai
var ai = new nn();

//input the training set to ai
ai.input = m(test);

//input the output set to ai
ai.output = m(output);

//train the ai
ai.train(10000);
/*****/

//ask the ai for the result of (1,0)
var result = ai.think(m([[1,0]])).value;

//log the result to the console
console.log(result[0]);
```   
