//-----------------------------------------------Ai.js---------------------------------------------



//-----------------------------------------------Some Variables------------------------------------
var minNIAUnSorted = [];
var minNIA = [];
//-----------------------------------------------Some Variables------------------------------------



//-----------------------------------------------Height count--------------------------------------
function OutputCountHeight(playfield){

    var count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for(col = 0; col <= 9; col++){
      for(row = 0; row <= 19; row++){
        if(playfield[row][col] != 0){
          count[col] = 19 - row + 1;
          break;
        }
      }
    }

    return count

  }
//-----------------------------------------------Height count--------------------------------------



//-----------------------------------------------Divede by weight----------------------------------
function ChangeCont(button){
  button.click();
}
//-----------------------------------------------Divede by weight----------------------------------



//-----------------------------------------------Moving--------------------------------------------
function CheckTetrominoMoveAi(isValidMove, tetromino, firstplayfield, secondplayfield, button1, button2){
  minNIA = [];
  var firstGood = OutputCountHeight(firstplayfield);
  var secondGood = OutputCountHeight(secondplayfield);
  var pFPositions = firstGood.concat(secondGood);
  var minArray = [];


  minNIA = SortArray(pFPositions);//works 
  if(tetromino.name == '1'){
    minArray[1] = TakeMinValueForOnexOne(pFPositions)[1];

    if(minArray[1] > 9){
      ChangeCont(button2);
      MoveTetrominoAi(isValidMove, tetromino, minArray[1] - 10);
    }
    else{
      ChangeCont(button1);
      MoveTetrominoAi(isValidMove, tetromino, minArray[1]);
    }
  }
  else if(tetromino.name == '2'){
    minArray[2] = TakeMinValueForTwoxTwo(pFPositions)[1];
    if(minArray[2] > 9){
      ChangeCont(button2);
      MoveTetrominoAi(isValidMove, tetromino, minArray[2] - 10);
    }
    else{
      ChangeCont(button1);
      MoveTetrominoAi(isValidMove, tetromino, minArray[2]);
    }
  }
  else if(tetromino.name == '3'){
    minArray[3] = TakeMinValueForThreexThree(pFPositions)[1];
    if(minArray[3] > 9){
      ChangeCont(button2);
      MoveTetrominoAi(isValidMove, tetromino, minArray[3] - 10);
    }
    else{
      ChangeCont(button1);
      MoveTetrominoAi(isValidMove, tetromino, minArray[3]);
    }
  }
  else if(tetromino.name == '4'){
    minArray[4] = TakeMinValueForFourxFour(pFPositions)[1];
    if(minArray[4] > 9){
      ChangeCont(button2);
      MoveTetrominoAi(isValidMove, tetromino, minArray[4] - 10);
    }
    else{
      ChangeCont(button1);
      MoveTetrominoAi(isValidMove, tetromino, minArray[4]);
    }
  }
}
//-----------------------------------------------Moving--------------------------------------------



//-----------------------------------------------Moving single tetromino---------------------------
function MoveTetrominoAi(isValidMove, tetromino, nums){
  const col = nums;

  if (isValidMove(tetromino.matrix, tetromino.row, col)) {
    tetromino.col = col;
  }
}
//-----------------------------------------------Moving single tetromino---------------------------




//-----------------------------------------------Ai brain------------------------------------------


//-----------------------------------------------Min for 1 x 1-------------------------------------
function TakeMinValueForOnexOne(pFPositions){//*works*

  var result = [0, 0];

  for(i = 0; i < 20; i++){
    if(pFPositions[i] <= minNIA[0]){//best conditional
      result[1] = i;
    }
  }

  return result;
}
//-----------------------------------------------Min for 1 x 1-------------------------------------



//-----------------------------------------------Min for 2 x 2-------------------------------------
function TakeMinValueForTwoxTwo(pFPositions){//works

  result = [0, 0];

  if(result[0] == 0){
    for(i = 1; i < 20; i++){
      if(pFPositions[i] <= minNIA[0] && pFPositions[i - 1] == pFPositions[i]){//best conditional *works*
        result[1] = i - 1;
        result[0] = 1;
      }
    }
  }
  if(result[0] == 0){
    for(i = 1; i < 20; i++){
      if(pFPositions[i] <= minNIA[1]  && pFPositions[i - 1] <= pFPositions[i]){//works 
        result[1] = i - 1;
      }
      else if(pFPositions[i] <= minNIA[1] && pFPositions[i - 1] >= pFPositions[i] && pFPositions[i - 1] <= minNIA[4]){//works
        result[1] = i - 1;
      }
    }
  }


  return result;

}
//-----------------------------------------------Min for 2 x 2-------------------------------------



//-----------------------------------------------Min for 3 x 3-------------------------------------
function TakeMinValueForThreexThree(pFPositions){

  var result = [0, 0];

  if(result[0] == 0){
    for(i = 2; i < 20; i++){
        if(pFPositions[i] <= minNIA[2] && pFPositions[i - 1] == pFPositions[i] && pFPositions[i - 2] == pFPositions[i]){//all three cols in one height
          result[1] = i - 2;
          result[0] = 1;
        }
      }
  }
  if(result[0] == 0){
    for(let i = 2; i < 20; i++){//add all conditionals 
        if(pFPositions[i] <= minNIA[2] && pFPositions[i - 1] <= pFPositions[i] && pFPositions[i - 2] <= pFPositions[i]){
          result[1] = i - 2;
          result[0] = 1;
        }
        else if(pFPositions[i] <= minNIA[2] && pFPositions[i - 1] >= pFPositions[i] && pFPositions[i - 2] <= pFPositions[i] && pFPositions[i - 1] <= minNIA[5]){
          result[1] = i - 2;
          result[0] = 1;
        }
        else if(pFPositions[i] <= minNIA[2] && pFPositions[i - 1] <= pFPositions[i] && pFPositions[i - 2] >= pFPositions[i] && pFPositions[i - 2] <= minNIA[5]){
          result[1] = i - 2;
          result[0] = 1;
        }
        else if(pFPositions[i] <= minNIA[2] && pFPositions[i - 1] >= pFPositions[i] && pFPositions[i - 2] >= pFPositions[i] && pFPositions[i - 2] <= minNIA[5] && pFPositions[i - 1] <= minNIA[5]){
          result[1] = i - 2;
          result[0] = 1;
        }
    }
  }


  return result;

}
//-----------------------------------------------Min for 3 x 3-------------------------------------



//-----------------------------------------------Min for 4 x 4-------------------------------------
function TakeMinValueForFourxFour(pFPositions){
  var f = 4;
  var s = 6;
  var result = [0, 0];

  if(result[0] == 0){
    for(i = 3; i < 20; i++){
      if(pFPositions[i] <= minNIA[3] && pFPositions[i - 1] == pFPositions[i] && pFPositions[i - 2] == pFPositions[i] && pFPositions[i - 3] == pFPositions[i]){
        result[1] = i - 3;
        result[0] = 1;
        console.log('best conditionals')
      }
    }
  }
  if(result[0] == 0){
    for(i = 3; i < 20; i++){//000
      if(pFPositions[i] <= minNIA[f] && pFPositions[i - 1] <= pFPositions[i] && pFPositions[i - 2] <= pFPositions[i] && pFPositions[i - 3] <= pFPositions[i]){
        result[1] = i - 3;
        result[0] = 1;
      }//100
      else if(pFPositions[i] <= minNIA[f] && pFPositions[i - 1] >= pFPositions[i] && pFPositions[i - 2] <= pFPositions[i] && pFPositions[i - 3] <= pFPositions[i] && pFPositions[i - 1] <= minNIA[s]){
        result[1] = i - 3;
        result[0] = 1;
      }//110
      else if(pFPositions[i] <= minNIA[f] && pFPositions[i - 1] >= pFPositions[i] && pFPositions[i - 2] >= pFPositions[i] && pFPositions[i - 3] <= pFPositions[i] && pFPositions[i - 1] <= minNIA[s] && pFPositions[i - 2] <= minNIA[s]){
        result[1] = i - 3;
        result[0] = 1;
      }//111
      else if(pFPositions[i] <= minNIA[f] && pFPositions[i - 1] >= pFPositions[i] && pFPositions[i - 2] >= pFPositions[i] && pFPositions[i - 3] >= pFPositions[i] && pFPositions[i - 1] <= minNIA[s] && pFPositions[i - 2] <= minNIA[s] && pFPositions[i - 3] <= minNIA[s]){
        result[1] = i - 3;
        result[0] = 1;
      }//011
      else if(pFPositions[i] <= minNIA[f] && pFPositions[i - 1] <= pFPositions[i] && pFPositions[i - 2] >= pFPositions[i] && pFPositions[i - 3] >= pFPositions[i] && pFPositions[i - 3] <= minNIA[s] && pFPositions[i - 2] <= minNIA[s]){
        result[1] = i - 3;
        result[0] = 1;
      }//001
      else if(pFPositions[i] <= minNIA[f] && pFPositions[i - 1] <= pFPositions[i] && pFPositions[i - 2] <= pFPositions[i] && pFPositions[i - 3] >= pFPositions[i] && pFPositions[i - 3] <= minNIA[s]){
        result[1] = i - 3;
        result[0] = 1;
      }//101
      else if(pFPositions[i] <= minNIA[f] && pFPositions[i - 1] >= pFPositions[i] && pFPositions[i - 2] <= pFPositions[i] && pFPositions[i - 3] >= pFPositions[i] && pFPositions[i - 3] <= minNIA[s] && pFPositions[i - 1] <= minNIA[s]){
        result[1] = i - 3;
        result[0] = 1;
      }//010
      else if(pFPositions[i] <= minNIA[f] && pFPositions[i - 1] <= pFPositions[i] && pFPositions[i - 2] >= pFPositions[i] && pFPositions[i - 3] <= pFPositions[i] && pFPositions[i - 2] <= minNIA[s]){
        result[1] = i - 3;
        result[0] = 1;
      }
    }
  }


  return result;

}
//-----------------------------------------------Min for 4 x 4-------------------------------------

//-----------------------------------------------Ai brain------------------------------------------