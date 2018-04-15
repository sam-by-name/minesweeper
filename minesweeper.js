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
var board = {
  cells:[]
}
function initGrid () {
  var grid = 6;
  for (var x = 0; x < grid; x++) {
    for (var y = 0; y < grid; y ++) {
      board.cells.push ({
        row: x,
        col: y, 
        isMine: "", 
        isMarked: false, 
        hidden: true 
      })
    }
  }
}

function initBooms ()  {
  for (var i = 0; i < Math.floor(board.cells.length / 4); i++)  {
    board.cells[Math.floor(Math.random() * board.cells.length)].isMine = true;
  }
}



function startGame () {
  initGrid ()
  initBooms()
  for (let i = 0; i < board.cells.length; i++) {
  board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);  
  } 
  lib.initBoard();
  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);
}

function checkForWin () {
  for (let i = 0; i < board.cells.length; i++) {
    let check = board.cells[i];
    if (check.isMine && !check.isMarked){
      return;
    }
    else if (!check.isMine && check.hidden) {
      return;
    } 
  }
  lib.displayMessage('You win!');
}
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

