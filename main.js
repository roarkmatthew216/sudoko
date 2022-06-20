const sudoL = require("./sudukoLogic.js");


const printBoard = (board) => {
    topCell = " --- ";
    bottomCell = " --- ";
    leftCell = "| ";
    rightCell = " |"
    newLine = "\n";

    outLine = "";

    for (i = 0; i <= 18; i++) {
        outLine = "";
        for (j = 0; j < 9; j++) {
            if (i % 2 == 0) {
                outLine = outLine + topCell;
            } else {
                let index = `${(i+1)/2}-${j+1}`;
                outLine = outLine + leftCell;
                if (board.get(index) == " ") {
                    outLine = outLine + " ";
                } else {
                    outLine = outLine + board.get(index);
                }


                outLine = outLine + rightCell;
            }


        }
        console.log(outLine)
    }

}

const createBoard = (board, startingInput) => {
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            let index = `${i+1}-${j+1}`
            if (typeof(startingInput[index]) != "undefined") {
                board.set(index, startingInput[index])
            } else {
                board.set(index, " ")
            }


        }
    }
}







const board = new Map();
let startingInput = {
    '1-8': 7,
    '2-3': 4,
    '2-4': 8,
    '3-1': 1,
    '3-3': 9,
    '3-4': 4,
    '3-5': 6,
    '3-8': 3,
    '4-1': 4,
    '4-5': 1,
    '5-2': 5,
    '5-5': 2,
    '6-2': 1,
    '6-4': 3,
    '6-6': 6,
    '6-7': 4,
    '7-8': 9,
    '7-9': 8,
    '8-1': 5,
    '8-7': 6,
    '8-9': 7,
    '9-1': 2,
    '9-4': 1,
};

createBoard(board, startingInput)
printBoard(board);

for (let i = 0; i < 9; i++) {
    console.log(sudoL.checkAllPossibleCells(board, i + 1));
}