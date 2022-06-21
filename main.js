const sudoL = require("./sudukoLogic.js");

const printBoard = (board) => {
  topCell = " --- ";
  bottomCell = " --- ";
  leftCell = "| ";
  rightCell = " |";
  newLine = "\n";

  outLine = "";

  for (i = 0; i <= 18; i++) {
    outLine = "";
    for (j = 0; j < 9; j++) {
      if (i % 2 == 0) {
        outLine = outLine + topCell;
      } else {
        let index = `${(i + 1) / 2}-${j + 1}`;
        outLine = outLine + leftCell;
        if (board.get(index) == " ") {
          outLine = outLine + " ";
        } else {
          outLine = outLine + board.get(index);
        }

        outLine = outLine + rightCell;
      }
    }
    console.log(outLine);
  }
};

const createBoard = (board, startingInput) => {
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      let index = `${i + 1}-${j + 1}`;
      if (typeof startingInput[index] != "undefined") {
        board.set(index, startingInput[index]);
      } else {
        board.set(index, " ");
      }
    }
  }
};
// where program starts
let board = new Map();
let startingInput = {
  "1-8": 7,
  "2-3": 4,
  "2-4": 8,
  "3-1": 1,
  "3-3": 9,
  "3-4": 4,
  "3-5": 6,
  "3-8": 3,
  "4-1": 4,
  "4-5": 1,
  "5-2": 5,
  "5-5": 2,
  "6-2": 1,
  "6-4": 3,
  "6-6": 6,
  "6-7": 4,
  "7-8": 9,
  "7-9": 8,
  "8-1": 5,
  "8-7": 6,
  "8-9": 7,
  "9-1": 2,
  "9-4": 1,
};
let tries = 10;
updatedCells = 0;
let cellsUpdatedRecord = new Map();



createBoard(board, startingInput);
printBoard(board);

for (let l = 0; l < tries; l++) {
  firstMethodFoundNothing = false;
  // on off killer
  // for every number check for one off and update.
  for (let i = 0; i < 9; i++) {
    //get a possible cells for number
    let allPosResult = sudoL.checkAllPossibleCells(board, i + 1);
    // out od possible cells, check to see if a row, col, or tri cell can has only
    // one place for that number, if so return location because that where the number needs to go.
    let oneOff = sudoL.checkOneOffs(allPosResult, i + 1, board);
    if (oneOff.length != 0) {
      for (let j = 0; j < oneOff.length; j++) {
        board = sudoL.updateBoard(board, oneOff[j], i + 1);
        cellsUpdatedRecord.set(oneOff[j], i + 1);
        updatedCells++;
      }
      printBoard(board);
    } else {
     
    }
  }
   let map = new Map();
  for (let i = 0; i < 9; i++) {
    //get a possible cells for number
    let allPosResult = sudoL.checkAllPossibleCells(board, i + 1);
    console.log("checking "+(i+1))
   map =  sudoL.inputPossibleValues(allPosResult,i+1,map);
    
  }
  console.log(map);
  map.clear();

  printBoard(board);
}

console.log(cellsUpdatedRecord.size + " cells have been updated");
console.log(cellsUpdatedRecord);
