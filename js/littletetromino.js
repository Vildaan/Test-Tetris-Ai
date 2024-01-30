//-----------------------------------------------LittleTetromino.js--------------------------------



//-----------------------------------------------Variables-----------------------------------------
var littlecanvas = document.getElementById('littlecanvas')
const context = littlecanvas.getContext('2d');
//-----------------------------------------------Variables-----------------------------------------



//-----------------------------------------------Little Window image-------------------------------
function FillPlayField(tetromino){
    context.clearRect(0,0,littlecanvas.width,littlecanvas.height);

    context.fillStyle = colors[tetromino.name];
    if(tetromino.matrix.length == 4){
        context.fillRect(25, 25, 100, 100);

    }
    if(tetromino.matrix.length == 3){
        context.fillRect(38, 38, 75, 75);
        //drawBoard(tetromino.matrix.length, tetromino.matrix.length, 40, context);
    }
    if(tetromino.matrix.length == 2){
        context.fillRect(50, 48, 50, 50);
        //drawBoard(tetromino.matrix.length, tetromino.matrix.length, 30);
    }
    if(tetromino.matrix.length == 1){
        context.fillRect(60, 60, 25, 25);
        //drawBoard(tetromino.matrix.length, tetromino.matrix.length);
    }
}
//-----------------------------------------------Little Window image-------------------------------



//---------------------------------Create GameField--------------------------------------------------
function CreateGameField(playfield){
    for (let row = timeoutForTetromino; row < 20; row++) {
      playfield[row] = [];
    
      for (let col = 0; col < 10; col++) {
        playfield[row][col] = 0;
      }
    }
    return playfield;
  }
//---------------------------------Create GameField--------------------------------------------------