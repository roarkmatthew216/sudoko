//does number exist in row
const csColors = require("./consoleColors")

const checkArray = (number, array) => {

    for (arrayIndex = 0; arrayIndex < array.length; arrayIndex++) {
        // console.log(`does ${number} ==${array[i]}`)
        if (array[arrayIndex] == number) {
            return true;
        }
    }
    // console.log("\n")
    return false;
}

const getTriCellNumber = (row,col)=>{
 
    if (1 <= row && row <= 3) {

        if (1 <= col && col <= 3) {
            return  1;
        }
        if (4 <= col && col <= 6) {
            return  2;
        }
        if (7 <= col && col <= 9) {
            return 3;
        }
    }
    if (4 <= row && row <= 6) {

        if (1 <= col && col <= 3) {
            return  4;
        }
        if (4 <= col && col <= 6) {
            return  5;
        }
        if (7 <= col && col <= 9) {
            return 6;
        }
    }
    if (7 <= row && row <= 9) {

        if (1 <= col && col <= 3) {
            return  7;
        }
        if (4 <= col && col <= 6) {
            return  8;
        }
        if (7 <= col && col <= 9) {
            return 9;
        }
    }
    

}




const checkCellIfGood = (board, index, number) => {

    // if num exist in row return false;
    if (board.get(index) != " ") {

        return false;
    }

    //does number exist in row 
    const doesNumExistRow = (number, array) => {

            return checkArray(number, array);
        }
        //does number exist in colmb 
    const doesNumExistCol = (number, array) => {

            return checkArray(number, array);
        }
        //does number exist in triCell
    const doesNumExistTir = (number, array) => {
        return checkArray(number, array);
    }


    // 1-1,2-2,3-4
    let row = Number(index.substring(0, 1));
    let col = Number(index.substring(2, 3));

    // console.log(`row is ${row} and col is ${col}`)
    rowArray = new Array();
    colArray = new Array();
    triArray = new Array();

    for (val = 0; val < 9; val++) {
        rowArray[val] = board.get(`${row}-${val+1}`);
        colArray[val] = board.get(`${val+1}-${col}`);
    }
    // for (i = 0; i < 9; i++) {

    // }

    //lets make a ary of the tri cells
    let tirRow = -1;
    let triCol = -1;

    if (1 <= row && row <= 3) {

        tirRow = 1;
    }
    if (4 <= row && row <= 6) {

        tirRow = 4;
    }
    if (7 <= row && row <= 9) {

        tirRow = 7;
    }
    if (1 <= col && col <= 3) {
        triCol = 1;
    }
    if (4 <= col && col <= 6) {
        triCol = 4;
    }
    if (7 <= col && col <= 9) {
        triCol = 7;
    }

    let indexCount = 0;
    for (rowVal = tirRow - 1; rowVal < tirRow + 2; rowVal++) {
        for (colVal = triCol - 1; colVal < triCol + 2; colVal++) {
            triArray[indexCount] = board.get(`${rowVal+1}-${colVal+1}`);
            indexCount++;
        }
    }

    //&& doesNumExistTir(number, );s
    let rowResult = doesNumExistRow(number, rowArray);
    let colResult = doesNumExistCol(number, colArray);
    let triCelResult = doesNumExistTir(number, triArray);
    //if number exist in row col or tri then the number is not allowed;
    let numAllowedInCell = !rowResult && !colResult && !triCelResult;
    return numAllowedInCell;
}

const checkAllPossibleCells = (board, number) => {
    console.log(`checking one offs for :${number} `)
    let indexCount = 0;
    let allPossibleCells = new Array();
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            //board.get(`${i+1}-${j+1}`);
            // checkCellIfGood(board, `${i+1}-${j+1}`, number);

            if (checkCellIfGood(board, `${i+1}-${j+1}`, number)) {
                allPossibleCells[indexCount] = `${i+1}-${j+1}`;
                indexCount++;
            }


        }
    }

    return allPossibleCells;

}
const checkOneOffs=(array,number)=>{
    // how many instance where only one number can fit in a row, col or tirCell
    let rowMap = new Map();
    let colMap = new Map();
    let triMap = new Map();

    const setValue = (map,tag)=>{
        let outputMap  = map;
        if(typeof(outputMap.get(`${tag}`))=="undefined"){
            outputMap.set(`${tag}`,1)
          
        }else{
            outputMap.set(`${tag}`,Number(outputMap.get(`${tag}`))+1)
        }
        return outputMap;
    }

    for(let i =0 ;i<array.length;i++){
        //gets index
        index = array[i];
        row = index.substring(0,1);
        col = index.substring(2,3);

        rowMap = setValue(rowMap,row);
        colMap = setValue(colMap,col);
        if(typeof(triMap.get(getTriCellNumber(row,col)))=="undefined"){
            triMap.set(getTriCellNumber(row,col),1);
        }else{
            triMap.set(getTriCellNumber(row,col),Number(triMap.get(getTriCellNumber(row,col)))+1);
        }
        
    }
  
 
    rowMap.forEach((value, key, map) => {
        if(value ==1){
            console.log(csColors.FgYellow,`row ${key} has ${map.get(key)} locations where ${number} can go`)
            console.log(csColors.FgWhite)
        }
        // else{
        //     console.log(`row ${key} has ${map.get(key)} locations where ${number} can go`)
        // }
    } )
    colMap.forEach((value, key, map) => {
        if(value ==1){
            console.log(csColors.FgYellow,`col ${key} has ${map.get(key)} locations where ${number} can go`)
            console.log(csColors.FgWhite)
        }
        // else{
        //     console.log(`col ${key} has ${map.get(key)} locations where ${number} can go`)
        // }
    } )
    triMap.forEach((value, key, map) => {
        if(value ==1){
            console.log(csColors.FgYellow,`Tri ${key} has ${map.get(key)} locations where ${number} can go`)
            console.log(csColors.FgWhite)
        }
        // else{
        //     console.log(`Tri ${key} has ${map.get(key)} locations where ${number} can go`)
        // }
    } )
   
}


module.exports = { checkCellIfGood, checkOneOffs,checkAllPossibleCells };