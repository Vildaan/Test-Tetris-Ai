<!DOCTYPE html>
<html>
<head>
  <title>Tetris - AI - Game</title>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="/styles/styles.css">
</head>

<body id="gameBody">

<h1 style="color: var(--text-color); position: absolute; margin-left: 42%; font-size: 190;">Choose Container</h1>
<h1 style="color: var(--text-color); position: absolute; margin-left: 77%; margin-top: 6%; font-size: 100;">Current Tetromino</h1>

<canvas width="320" height="640" style="position: absolute; margin-left: 25%; margin-top: 5%" id="game"></canvas>
<canvas width="320" height="640" style="position: absolute; margin-left: 50%; margin-top: 5%;" id="secondgame"></canvas>
<canvas width="150" height="150" style="position: absolute; margin-top: 10%; margin-left: 80%;" id="littlecanvas"></canvas>

<button class="btn-test" id="btn-test">S</button>
<p3 class="btn-test-write"> - To start or pause the app</p3>

<button class="btn-9" id="btn-9">1</button>
<p3 class="btn-9-write"> - Change to first container</p3>

<button class="btn-Q" id="btn-Q">2</button>
<p3 class="btn-Q-write"> - Change to second container</p3>

<button class="btn-R" id="btn-R">R</button>
<p3 class="btn-R-write"> - To restart app</p3>

<button class="btn-I" id="btn-I">I</button>
<p3 class="btn-I-write"> - To start Ai working</p3>

<img src="/styles/trangle.png" class="while-triangle" id="triangle">

<img src="/styles/trangle.png" class="little-afk-triangle">
<p3 class="triangle"> - Which container is selected</p3>

<img src="/styles/step22_pixian_ai (1).png" class="Ai-Led" id="Ai-Led">
<p3 class="Ai-Led-Text"> - Ai Active Indicator</p3>

<p3 class="Cont-Full"></p3>
<p3 class="Cont-Full-text"> - Full containers</p3>


<script src="/js/littletetromino.js"></script>
<script src="/js/firstgame.js"></script>
<script src="/js/ai.js"></script>
<script src="/js/consumables.js"></script>

</body>
</html>
