//-----------------------------------------------Ai.js---------------------------------------------

//-----------------------------------------------Some Variables------------------------------------
let minNIAUnSorted = [];
let minNIA = [];
//-----------------------------------------------Some Variables------------------------------------

//-----------------------------------------------Height count--------------------------------------
function outputCountHeight(playfield) {
  const count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let col = 0; col <= 9; col++) {
    for (let row = 0; row <= 19; row++) {
      if (playfield[row][col] !== 0) {
        count[col] = 19 - row + 1;
        break;
      }
    }
  }

  return count;
}
//-----------------------------------------------Height count--------------------------------------

//-----------------------------------------------Divide by weight----------------------------------
function divideTetrominoByWidth(tetrominoName) {
  if (tetrominoName === '1' || tetrominoName === '3') {
    console.log("first container");
    return button1;
  } else {
    console.log("second container");
    return button2;
  }
}
//-----------------------------------------------Divide by weight----------------------------------

//-----------------------------------------------Moving--------------------------------------------
function checkTetrominoMoveAI(isValidMove, tetromino, playfield) {
  minNIA = [];
  const pFPositions = outputCountHeight(playfield);

  const minArray = [];

  const minNIA1 = sortArray(pFPositions);
  minNIA = outputCountHeight(playfield);
  minNIA.sort();

  minArray[1] = takeMinValueForOneByOne(pFPositions)[1];
  minArray[2] = takeMinValueForTwoByTwo(pFPositions)[1];
  minArray[3] = takeMinValueForThreeByThree(pFPositions)[1];
  minArray[4] = takeMinValueForFourByFour(pFPositions)[1];

  console.log('-------------------');
  /*console.log(pFPositions, 'colums')
  console.log(minArray, "positions");*/
  console.log(minNIA, 'sort method');
  console.log(minNIA1, 'my function');
  console.log('-------------------');

  if (tetromino.name === '1') {
    moveTetrominoAI(isValidMove, tetromino, minArray[1]);
  } else if (tetromino.name === '2') {
    moveTetrominoAI(isValidMove, tetromino, minArray[2]);
  } else if (tetromino.name === '3') {
    moveTetrominoAI(isValidMove, tetromino, minArray[3]);
  } else if (tetromino.name === '4') {
    moveTetrominoAI(isValidMove, tetromino, minArray[4]);
  }
}
//-----------------------------------------------Moving--------------------------------------------

//-----------------------------------------------Moving single tetromino---------------------------
function moveTetrominoAI(isValidMove, tetromino, nums) {
  const col = nums;

  if (isValidMove(tetromino.matrix, tetromino.row, col)) {
    tetromino.col = col;
  }
}
//-----------------------------------------------Moving single tetromino---------------------------

//-----------------------------------------------Min for 1 x 1-------------------------------------
function takeMinValueForOneByOne(pFPositions) { //*works*
  const result = [0, 0];

  for (let i = 0; i < 10; i++) {
    if (pFPositions[i] <= minNIA[0]) { //best conditional
      result[1] = i;
    }
  }

  return result;
}
//-----------------------------------------------Min for 1 x 1-------------------------------------

//-----------------------------------------------Min for 2 x 2-------------------------------------
function takeMinValueForTwoByTwo(pFPositions) {
  const result = [0, 0];

  for (let i = 1; i < 10; i++) {
    if (pFPositions[i] <= minNIA[0] && pFPositions[i - 1] === pFPositions[i]) { //best conditional *works*
      result[1] = i - 1;
    }
  }
  for (let i = 1; i < 10; i++) {
    if (pFPositions[i] <= minNIA[1] && pFPositions[i - 1] <= pFPositions[i]) { //works so ? so 
      result[1] = i - 1;
    } else if (pFPositions[i] <= minNIA[1] && pFPositions[i - 1] >= pFPositions[i]) { //works
      result[1] = i - 1;
    }
  }

  return result;
}
//-----------------------------------------------Min for 2 x 2-------------------------------------

//-----------------------------------------------Min for 3 x 3-------------------------------------
function takeMinValueForThreeByThree(pFPositions) {
  const result = [0, 0];

  for (let i = 2; i < 10; i++) {
    if (pFPositions[i] <= minNIA[0] && pFPositions[i - 1] === pFPositions[i] && pFPositions[i - 2] === pFPositions[i]) {
      result[1] = i - 2;
    }
  }

  return result;
}
//-----------------------------------------------Min for 3 x 3-------------------------------------

//-----------------------------------------------Min for 4 x 4-------------------------------------
function takeMinValueForFourByFour(pFPositions) {
  const result = [0, 0];

  for (let i = 3; i < 10; i++) {
    if (pFPositions[i] <= minNIA[0] && pFPositions[i - 1] === pFPositions[i] && pFPositions[i - 2] === pFPositions[i] && pFPositions[i - 3] === pFPositions[i]) {
      result[1] = i - 3;
    }
  }

  return result;
}
//-----------------------------------------------Min for 4 x 4-------------------------------------