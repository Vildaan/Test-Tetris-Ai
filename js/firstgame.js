//-----------------------------------------------Firstgame.js--------------------------------------



//-----------------------------------------------Variables-----------------------------------------
var firtGameField = [];
var secondGameField = [];
var firsttetromino;
var firststart = [];
var timeoutForTetromino = -3;
var numOfStartes = 0;
var checkends = 0;
var active = true;
var activeAi = false;
var positionS = 0;
var contCount = 0;
const colors = {
  '1': 'cyan',
  '2': 'orange',
  '3': 'yellow',
  '4': 'green'
};
//-----------------------------------------------Variables-----------------------------------------



//-----------------------------------------------Html Objects--------------------------------------
var canvasfirst = document.getElementById('game');
var canvassecond = document.getElementById("secondgame");
const TriangleImage = document.getElementById("triangle");
const AiIndicator = document.getElementById("Ai-Led");
//-----------------------------------------------Html Objects--------------------------------------



//-----------------------------------------------Buttons-------------------------------------------
const buttonS = document.getElementById("btn-test");
const button1 = document.getElementById('btn-9');
const button2 = document.getElementById('btn-Q');
const buttonRestart = document.getElementById("btn-R");
const buttonAi = document.getElementById('btn-I');
//-----------------------------------------------Buttons-------------------------------------------



//-----------------------------------------------Another Code--------------------------------------
firtGameField = CreateGameField(firtGameField);
secondGameField = CreateGameField(secondGameField);
firststart[2] = true;
//-----------------------------------------------Another Code--------------------------------------

