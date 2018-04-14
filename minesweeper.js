document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells:[
// This is a 6x6 grid
// The six lines below declare my first "row" of six segments (col:0,1,2)
    { row: 0, col: 0, isMine: true , isMarked: "",  hidden: true },
    { row: 0, col: 1, isMine: false, isMarked: "", hidden: true },
    { row: 0, col: 2, isMine: false, isMarked: "", hidden: true },
    { row: 0, col: 3, isMine: false, isMarked: "", hidden: true },
    { row: 0, col: 4, isMine: false, isMarked: "", hidden: true },
    { row: 0, col: 5, isMine: false, isMarked: "", hidden: true },
// The six lines below declare my second row of six segments (col:0,1,2)
    { row: 1, col: 0, isMine: true, isMarked: "", hidden: true },
    { row: 1, col: 1, isMine: false, isMarked: "", hidden: true },
    { row: 1, col: 2, isMine: false, isMarked: "", hidden: true },
    { row: 1, col: 3, isMine: false, isMarked: "", hidden: true },
    { row: 1, col: 4, isMine: false, isMarked: "", hidden: true },
    { row: 1, col: 5, isMine: false, isMarked: "", hidden: true },
// The six lines below declare my third row of six segments (col:0,1,2)
    { row: 2, col: 0, isMine: false, isMarked: "", hidden: true },
    { row: 2, col: 1, isMine: false, isMarked: "", hidden: true },
    { row: 2, col: 2, isMine: false, isMarked: "", hidden: true },
    { row: 2, col: 3, isMine: false, isMarked: "", hidden: true },
    { row: 2, col: 4, isMine: false, isMarked: "", hidden: true },
    { row: 2, col: 5, isMine: false, isMarked: "", hidden: true },
// The six lines below declare my forth row of six segments (col:0,1,2)
    { row: 3, col: 0, isMine: false, isMarked: "", hidden: true },
    { row: 3, col: 1, isMine: false, isMarked: "", hidden: true },
    { row: 3, col: 2, isMine: false, isMarked: "", hidden: true },
    { row: 3, col: 3, isMine: false, isMarked: "", hidden: true },
    { row: 3, col: 4, isMine: false, isMarked: "", hidden: true },
    { row: 3, col: 5, isMine: false, isMarked: "", hidden: true },
// The six lines below declare my fifth row of six segments (col:0,1,2)
    { row: 4, col: 0, isMine: false, isMarked: "", hidden: true },
    { row: 4, col: 1, isMine: false, isMarked: "", hidden: true },
    { row: 4, col: 2, isMine: false, isMarked: "", hidden: true },
    { row: 4, col: 3, isMine: false, isMarked: "", hidden: true },
    { row: 4, col: 4, isMine: false, isMarked: "", hidden: true },
    { row: 4, col: 5, isMine: false, isMarked: "", hidden: true },
// The six lines below declare my sixth row of six segments (col:0,1,2)
    { row: 5, col: 0, isMine: false, isMarked: "", hidden: true },
    { row: 5, col: 1, isMine: false, isMarked: "", hidden: true },
    { row: 5, col: 2, isMine: false, isMarked: "", hidden: true },
    { row: 5, col: 3, isMine: false, isMarked: "", hidden: true },
    { row: 5, col: 4, isMine: false, isMarked: "", hidden: true },
    { row: 5, col: 5, isMine: false, isMarked: "", hidden: true },
  ]}



function startGame () {
  for (let i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);  
  } // Don't remove this function call: it makes the game work!
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
//  let success = board.cells.every;
//  if (success.isMine == true && success.isMarked == true && success.hidden == false)
//  lib.displayMessage('You win!') 

  //   lib.displayMessage('You win!')


// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
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

