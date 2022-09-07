export  class Square {
    constructor(row, column, color) {
        this.row = row;
        this.column = column;
        this.color = color;
        this.count = 0;
    }
}

export class Puzzle {
    constructor(rowNum, colNum) {
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.selected = null;
    }
}

export default class Model {

}