document.addEventListener('DOMContentLoaded', startGame)

// This is a static 6x6 grid with static mines 
// The six lines below declare my first row of six segments (col:0,1,2,3,4,5)
/*var board = {
  cells:[
    { row: 0, col: 0, isMine: "", isMarked: "", hidden: true },
    { row: 0, col: 1, isMine: "", isMarked: "", hidden: true },
    { row: 0, col: 2, isMine: "", isMarked: "", hidden: true },
    { row: 0, col: 3, isMine: "", isMarked: "", hidden: true },
    { row: 0, col: 4, isMine: "", isMarked: "", hidden: true },
    { row: 0, col: 5, isMine: "", isMarked: "", hidden: true },
// The six lines below declare my second row of six segments (col:0,1,2,3,4,5)
    { row: 1, col: 0, isMine: "", isMarked: "", hidden: true },
    { row: 1, col: 1, isMine: "", isMarked: "", hidden: true },
    { row: 1, col: 2, isMine: "", isMarked: "", hidden: true },
    { row: 1, col: 3, isMine: "", isMarked: "", hidden: true },
    { row: 1, col: 4, isMine: "", isMarked: "", hidden: true },
    { row: 1, col: 5, isMine: "", isMarked: "", hidden: true },
// The six lines below declare my third row of six segments (col:0,1,2,3,4,5)
    { row: 2, col: 0, isMine: "", isMarked: "", hidden: true },
    { row: 2, col: 1, isMine: "", isMarked: "", hidden: true },
    { row: 2, col: 2, isMine: "", isMarked: "", hidden: true },
    { row: 2, col: 3, isMine: "", isMarked: "", hidden: true },
    { row: 2, col: 4, isMine: "", isMarked: "", hidden: true },
    { row: 2, col: 5, isMine: "", isMarked: "", hidden: true },
// The six lines below declare my forth row of six segments (col:0,1,2,3,4,5)
    { row: 3, col: 0, isMine: "", isMarked: "", hidden: true },
    { row: 3, col: 1, isMine: "", isMarked: "", hidden: true },
    { row: 3, col: 2, isMine: "", isMarked: "", hidden: true },
    { row: 3, col: 3, isMine: "", isMarked: "", hidden: true },
    { row: 3, col: 4, isMine: "", isMarked: "", hidden: true },
    { row: 3, col: 5, isMine: "", isMarked: "", hidden: true },
// The six lines below declare my fifth row of six segments (col:0,1,2,3,4,5)
    { row: 4, col: 0, isMine: "", isMarked: "", hidden: true },
    { row: 4, col: 1, isMine: "", isMarked: "", hidden: true },
    { row: 4, col: 2, isMine: "", isMarked: "", hidden: true },
    { row: 4, col: 3, isMine: "", isMarked: "", hidden: true },
    { row: 4, col: 4, isMine: "", isMarked: "", hidden: true },
    { row: 4, col: 5, isMine: "", isMarked: "", hidden: true },
// The six lines below declare my sixth row of six segments (col:0,1,2,3,4,5)
    { row: 5, col: 0, isMine: "", isMarked: "", hidden: true },
    { row: 5, col: 1, isMine: "", isMarked: "", hidden: true },
    { row: 5, col: 2, isMine: "", isMarked: "", hidden: true },
    { row: 5, col: 3, isMine: "", isMarked: "", hidden: true },
    { row: 5, col: 4, isMine: "", isMarked: "", hidden: true },
    { row: 5, col: 5, isMine: "", isMarked: "", hidden: true },
  ]}*/
  //var userChoice = prompt("How easy do you want Life to be? 2-12");
  var board;
  var grid = 6;

function initGrid () {
  board = {
    cells:[]
  }
  for (var x = 0; x < grid; x++) {
    for (var y = 0; y < grid; y ++) {
      board.cells.push ({
        row: x,
        col: y, 
        isMine: Math.floor(Math.random()*1.3), 
        isMarked: false, 
        hidden: true 
      })
    }
  }
}
/* I used this until i found the easier way above 
function initBooms ()  {
  for (var i = 0; i < Math.floor(board.cells.length / 4); i++)  {
    board.cells[Math.floor(Math.random() * board.cells.length)].isMine = true;
  }
}*/


function startGame () {
  initGrid ()
  for (let i = 0; i < board.cells.length; i++) {
  board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);  
  }
  lib.initBoard();
  document.addEventListener('contextmenu', contextSound);
  document.addEventListener('click', theEnd, checkForWin);
  document.addEventListener('contextmenu', checkForWin);
  updateCounts();
}
function checkForWin () {
  for (let i = 0; i < board.cells.length; i++) {
    let check = board.cells[i];
    if (check.isMine && !check.isMarked){
      return;
    } else if (!check.isMine && check.hidden) {
      return;
    } 
  }
  lib.displayMessage('You win!');
  winSound();
}

// Game Over function below.

function theEnd () {
  for (let i = 0; i < board.cells.length; i++) {
    let check = board.cells[i];
    if (!check.isMine && !check.hidden && !check.marked) {
      clickSound();
    } else if (check.isMine && !check.hidden) {
    lostSound();
    }
  }
}

// Check for surrounding mine count below.

function countSurroundingMines (cell) {

  var surrounding = lib.getSurroundingCells(cell.row, cell.col) 
  var count = 0;
  for (let i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine == true) {
      count++
    }
  }
  return count;
}

//Board refresh function below.

function retry () {
  removeListeners ();
  restart ();
  startGame ();
  document.getElementById('ready').play(); 
}

function restart () {
  let board = document.getElementsByClassName('board')[0];
  board.innerHTML = '';
}

//Board resize functions below.

function retryEasy () {
  removeListeners ();
  restart ();
  grid = 3;
  document.getElementById('body').style.background = 'url(./images/cloud.jpeg) 100%'; 
  startGame ();
  startSound(); 
}
function retryMed () {
  removeListeners ();
  restart ();
  grid = 6;
  document.getElementById('body').style.background = 'url(./images/ff7Toon.jpg)'; 
  startGame ();
  startSound(); 
}
function retryHard () {
  removeListeners ();
  restart ();
  grid = 9;
  document.getElementById('body').style.background = 'url(./images/Mc.jpg)'; 
  startGame ();
  startSound();  
}
function retryVeryHard () {
  removeListeners ();
  restart ();
  grid = 12;
  document.getElementById('body').style.background = 'url(./images/suicide.jpg)';
  startGame ();
  startSound(); 
}

//Audio functions below.

function clickSound (){
  let audio = new Audio('./sound/onClick.mp3');
  audio.play();
}
function contextSound (){
  let audio = new Audio('./sound/onContext.mp3');
  audio.play();
}
function lostSound (){
  let audio = new Audio('./sound/gameOver.mp3');
  audio.play();
}
function winSound (){
  let audio = new Audio('./sound/victory.mp3');
  audio.play();
}
function startSound (){
  let audio = new Audio('./sound/restart.mp3');
  audio.play();
}


function updateCounts () {
  let mine = document.getElementsByClassName('board')[0].children
  let totals = {
    isMine: 0,
  }
  for (let i = 0; i < mine.length; i++) {
    if (mine[i].classList.contains('isMine')) totals.mine++
  }
  displayTotals(totals)
}

function displayTotals (totals) {
  for (var key in totals) {
    document.getElementById(key + '-total').innerHTML = totals[key]
  }
}
function displayTotals (totals) {
  for (var key in totals) {
    document.getElementById(key + '-total').innerHTML = totals[key]
  }
}

