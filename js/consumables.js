//---------------------------------Consumables.js--------------------------------------------------*works*



//---------------------------------Game Function-----------------------------------------------------
function startGaming(canvas, playfield, first, position){
  positionS = position;
  document.querySelector('.Cont-Full').innerText = contCount;

  //-------------------------------Triangle move-----------------------------------------------------
    if(first){
      TriangleImage.style.marginLeft= "36%";
      TriangleImage.style.marginTop= "51%";
    }
    else{
      TriangleImage.style.marginLeft= "60%";
      TriangleImage.style.marginTop= "51%";
    }
  //-------------------------------Triangle move-----------------------------------------------------


  // https://tetris.fandom.com/wiki/Tetris_Guideline
  // get a random integer between the range of [min,max]
  // @see https://stackoverflow.com/a/1527820/2124254


  //-------------------------------Some Variables--------------------------------------------------
    numOfStartes++;
    let rAF = null;
    var tetrominoSequence = [];
  //-------------------------------Some Variables--------------------------------------------------
  
  
  // generate a new tetromino sequence
  // @see https://tetris.fandom.com/wiki/Random_Generator

  
  //-------------------------------GenerateSequence-------------------------------------------------
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
    
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    function generateSequence() {
      if(firststart[0]){
        tetrominoSequence.push(firsttetromino[0])
        firststart[0] = false;
      }else{
      const sequence = ['1', '2', '3', '4'];
      const rand = getRandomInt(0, sequence.length - 1);
      const name = sequence.splice(rand, 1)[0];
      tetrominoSequence.push(name);
      firsttetromino = name;
      }
    }
  //-----------------------------GenerateSequence--------------------------------------------------


  //-----------------------------GetNextTetromino--------------------------------------------------
    function getNextTetromino() {
      if (tetrominoSequence.length === 0) {
        generateSequence();
      }

      const name = tetrominoSequence.pop();

      const matrix = tetrominos[name];
    
      // I and O start centered, all others start in left-middle
      const col = playfield[0].length / 2 - Math.ceil(matrix[0].length / 2);
    
      // I starts on row 21 (-1), all others start on row 22 (-2)
      const row = timeoutForTetromino;
      
      return {
        name: name,      // name of the piece (L, O, etc.)
        matrix: matrix,  // the current rotation matrix
        row: row,        // current row (starts offscreen)
        col: col         // current col
      };
    }
  //-----------------------------GetNextTetromino--------------------------------------------------


    // rotate an NxN matrix 90deg
    // @see https://codereview.stackexchange.com/a/186834

    
  //-----------------------------Rotate------------------------------------------------------------
    function rotate(matrix) {
      const N = matrix.length - 1;
      const result = matrix.map((row, i) =>
        row.map((val, j) => matrix[N - j][i])
      );
    
      return result;
    }
  //-----------------------------Rotate------------------------------------------------------------
    

    // check to see if the new matrix/row/col is valid


  //-----------------------------IsValidMove-------------------------------------------------------
    function isValidMove(matrix, cellRow, cellCol) {
      for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
          if (matrix[row][col] && (
              // outside the game bounds
              cellCol + col < 0 ||
              cellCol + col >= playfield[0].length ||
              cellRow + row >= playfield.length ||
              // collides with another piece
              playfield[cellRow + row][cellCol + col])
            ) {
            return false;
          }
        }
      }
    
      return true;
    }
  //-----------------------------IsValidMove-------------------------------------------------------

    
    // place the tetromino on the playfield


  //-----------------------------Place Tetromino---------------------------------------------------
    function placeTetromino() {
      for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
          if (tetromino.matrix[row][col]) {
    
            // game over if piece has any part offscreen
            if (tetromino.row + row < 0) {
              showgameOver(); 
            }
            playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
          }
        }
      }
        tetromino = getNextTetromino();
        FillPlayField(tetromino);

        //-------------------------Ai connecting---------------------------------------------------
        /*if(checkends <= 1 && activeAi){
          console.log(tetromino.name);
          var changeButton = DevideTetrominoByWidht(tetromino.name);
          try{
              changeButton.click();
          } catch{
              console.log("works");
          }
        }*/
        if(activeAi && firststart[2] == false){
          CheckTetrominoMoveAi(isValidMove, tetromino, firtGameField, secondGameField, button1, button2);
        }
        //-------------------------Ai connecting---------------------------------------------------

    }
  //-----------------------------Place Tetromino---------------------------------------------------

    
    // show the gameover screen


  //-----------------------------Game Over Screen--------------------------------------------------
    function showgameOver() {
        SaveGame();
        context.fillStyle = 'rgb(158, 158, 158)';
        context.globalAlpha = 0.75;
        context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
      
        context.globalAlpha = 1;
        context.fillStyle = 'rgb(0, 0, 29)';
        context.font = '36px monospace';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('Container Full', canvas.width / 2, canvas.height / 2);  
        if(position == 0 && checkends <= 1){
          contCount++;
          button2.click();
          checkends++;
        }else if(position != 0 && checkends <= 1){
          contCount++;
          button1.click();
          checkends++;
        }else{
          activeAi = false;
        }
    }
  //-----------------------------Game Over Screen--------------------------------------------------
  
    
  //-------------------------------Some Variables----------------------------------------------------
    const context = canvas.getContext('2d');
    const grid = 32;
  //-------------------------------Some Variables----------------------------------------------------
    
    
    // keep track of what is in every cell of the game using a 2d array
    // tetris playfield is 10x20, with a few rows offscreen
    //const playfield = [];
    
    // populate the empty state
    
    // how to draw each tetromino
    // @see https://tetris.fandom.com/wiki/SRS


  //-----------------------------Tetrominos in 2d--------------------------------------------------
    const tetrominos = {
      '1': [
        [1]
      ],
      '2': [
      [1,1],
      [1,1]
      ],
      '3': [
      [1,1,1],
      [1,1,1],
      [1,1,1]
      ],
      '4': [
      [1,1,1,1],
      [1,1,1,1],
      [1,1,1,1],
      [1,1,1,1]
      ],
    };
  //-----------------------------Tetrominos in 2d--------------------------------------------------
  
  
  //-----------------------------Some Variables----------------------------------------------------
    let count = 0;
      //keep track of the animation frame so we can cancel it
    let gameOver = false;
    var  tetromino = getNextTetromino();
    if(activeAi && firststart[2] == true){
      CheckTetrominoMoveAi(isValidMove, tetromino, firtGameField, secondGameField, button1, button2);
      firststart[2] = false;
    }
  //-----------------------------Some Variables----------------------------------------------------


  //-----------------------------Requare Little Screen---------------------------------------------
    FillPlayField(tetromino);
  //-----------------------------Requare Little Screen---------------------------------------------

    
  //-----------------------------Game loop---------------------------------------------------------
    function loop() {
      rAF = requestAnimationFrame(loop);
      context.clearRect(0,0,canvas.width,canvas.height);
    
      // draw the playfield
      for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 10; col++) {
          if (playfield[row][col]) {
            const name = playfield[row][col];
            context.fillStyle = colors[name];
    
            // drawing 1 px smaller than the grid creates a grid effect
            context.fillRect(col * grid, row * grid, grid-1, grid-1);
          }
        }
      }

      //draw the active tetromino
      if (tetromino) {
        
          if (++count > 35) {
            tetromino.row++;
            count = 0;
    
          // place piece if it runs into anything
          if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
            tetromino.row--;
            placeTetromino();
            tetrominoInFieldChange = tetromino      
          }
        }
        // tetromino falls every 35 frames
    
        context.fillStyle = colors[tetromino.name];
        
    
        for (let row = 0; row < tetromino.matrix.length; row++) {
          for (let col = 0; col < tetromino.matrix[row].length; col++) {
            if (tetromino.matrix[row][col]) {
              
              // drawing 1 px smaller than the grid creates a grid effect
              context.fillRect((tetromino.col + col) * grid, (tetromino.row + row) * grid, grid-1, grid-1);
            }
          }
        }
      }
    }
  //-----------------------------Game loop---------------------------------------------------------


  //-------------------------------Buttons---------------------------------------------------------
    document.addEventListener('keydown', function(e) {
      if (gameOver) return;
    
      // left and right arrow keys (move)
      if (e.which === 37 || e.which === 39) {
        const col = e.which === 37
          ? tetromino.col - 1
          : tetromino.col + 1;
    
        if (isValidMove(tetromino.matrix, tetromino.row, col)) {
          tetromino.col = col;
        }
      }
    
      // up arrow key (rotate)
      if (e.which === 38) {
        const matrix = rotate(tetromino.matrix);
        if (isValidMove(matrix, tetromino.row, tetromino.col)) {
          tetromino.matrix = matrix;
        }
      }
    
      // down arrow key (drop)
      if(e.which === 40) {
        const row = tetromino.row + 1;
    
        if (!isValidMove(tetromino.matrix, row, tetromino.col)) {
          tetromino.row = row - 1;
    
          placeTetromino();
          return;
        }
    
        tetromino.row = row;
      }
  
      if(e.which == 49){ //1
        if(checkends <= 1){
            SaveGame();
            start(0);
        }
      }
  
      if(e.which == 50){//2
        if(checkends <= 1){
            SaveGame();
            start(1);
        }
      }

      if(e.which == 83){
        if(!active){
          SaveGame();
          active = true;
        }
      }
    });
  
    button1.onclick = function(){
      SaveGame();
      start(0);
    }
    button2.onclick = function(){
      SaveGame();
      start(1);
    }
  //-------------------------------Buttons---------------------------------------------------------


  //-------------------------------Save Game-------------------------------------------------------
    function SaveGame(){
      cancelAnimationFrame(rAF);
      gameOver = true;
      first ? firtGameField = playfield : secondGameField = playfield;
      first ? canvasfirst = canvas : canvassecond = canvas;
    }
    rAF = requestAnimationFrame(loop);
  //-------------------------------Save Game-------------------------------------------------------
  }
//---------------------------------Game Function---------------------------------------------------



//---------------------------------Start-----------------------------------------------------------
function start(position){
    if(numOfStartes > 0){
      firststart[0] = true;
      firststart[2] = true;
    }
  
    if(position == 0){
      startGaming(canvasfirst, firtGameField, true, position);
    }else{
      startGaming(canvassecond, secondGameField, false, position);
    }
  }
//---------------------------------Start-----------------------------------------------------------



//---------------------------------Sort Array------------------------------------------------------
function SortArray(arr) {
  // Создаем копию исходного массива
  var sortedArr = arr.slice();

  // Используем функцию сравнения для сортировки
  sortedArr.sort(function(a, b) {
    return a - b;
  });

  // Возвращаем отсортированный массив
  return sortedArr;
}
//---------------------------------Sort Array------------------------------------------------------



//---------------------------------Buttons---------------------------------------------------------
document.addEventListener('keydown', function(e) {
    if(e.which == 83){//S
      if(active){
        if(positionS == 0){
          start(0);
        }
        else{
          start(1);
        }
        active = false;
      }
    }
    if(e.which == 82){//R
      window.location.reload()
    }
    if(e.which == 73){//I
      if(activeAi){
        activeAi = false;
        AiIndicator.style.filter = 'invert(25%) sepia(100%) saturate(10000%) hue-rotate(8deg) brightness(90%) contrast(200%)';
      }
      else{
        activeAi = true;
        AiIndicator.style.filter = 'invert(10%) sepia(80%) saturate(600%) hue-rotate(45deg) brightness(90%) contrast(300%)';
      }
    }
  });

buttonRestart.onclick = function(){
    window.location.reload()
}
  
buttonS.onclick = function(){
  if(active){
    start(0);
    active = false;
  }
}

buttonAi.onclick = function(){
  if(activeAi){
    activeAi = false;
    AiIndicator.style.filter = 'invert(25%) sepia(100%) saturate(10000%) hue-rotate(8deg) brightness(90%) contrast(200%)';
  }
  else{
    activeAi = true;
    AiIndicator.style.filter = 'invert(10%) sepia(80%) saturate(600%) hue-rotate(45deg) brightness(90%) contrast(300%)';
  }
}
//---------------------------------Buttons---------------------------------------------------------