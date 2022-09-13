export class Coordinate {
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }
}

export class MoveType {
    constructor(deltar, deltac) {
        this.deltar = deltar;
        this.deltac = deltac;
    }
}

export class Square {
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
    constructor(info) {
        this.initialize(info);
    }

    initialize(info) {
        let numRows = parseInt(info.board.rows);
        let numCols = parseInt(info.board.cols);

        this.puzzle = new Puzzle(numRows, numCols);
        this.victory = false;
        this.level = parseInt(info.board.level);
    }
}