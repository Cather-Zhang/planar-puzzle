export class Coordinate {
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }
}

export class MoveType {
    constructor(dr, dc) {
        this.deltar = dr;
        this.deltac = dc;
    }  
}

export const Down = new MoveType(1, 0, "down");
export const Up = new MoveType(-1, 0, "up");
export const Left = new MoveType(0, -1, "left");
export const Right = new MoveType(0, 1, "right");
export const NoMove = new MoveType(0, 0, "*");  // no move is possible

export class Square {

    constructor(row, column, color, count) {
        this.row = row;
        this.column = column;
        this.color = color;
        this.count = count;
    }

    location() {
        return new Coordinate(this.row, this.column);
    }

    copy() {
        let s = new Square(this.row, this.column, this.color, this.count)
        return s;
    }
}

export class Puzzle {
    constructor(rowNum, colNum) {
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.selected = null;
        this.squares = this.init();
    }
    select(piece) {
        this.selected = piece;
    }

    isSelected(piece) {
        return this.selected === piece;
    }

    initialize(squares) {
        // make sure to create NEW Piece objects
        this.squares = squares.map(s => s.copy());
    }

    init() {
        var allSquares = [];
        for (let row = 0; row < this.rowNum; row++) {
            for (let col = 0; col < this.colNum; col++) {
                allSquares.push(new Square(row, col, "white", 0));
            }
        }
        return allSquares;
    }

    /**
     * clone the puzzle to pass into the new model created for setModel
     * @returns 
     */
    clone() {
        let copy = new Puzzle(this.rowNum, this.colNum);
        copy.squares = [];
        for (let s of this.squares) {
            let dup = s.copy();
            copy.squares.push(dup);
            if (s === this.selected) {
                copy.selected = dup;
            }
        }
        return copy;
    }

    /**
     * Extend color of the selected piece to neighbor square in given direction
     * @param {*} dir 
     */
    extend(dir) {

    }


    /**
     * check if we can extend or not, return true if the 
     * neighbor of the selected piece in the direction
     * has color white 
     * @param {*} dir MoveType
     */
    canExtend(dir) {

    }


    /**
     * get the neighbor square of the selected square in given direction
     * @param {*} dir 
     */
    getNeighbor(dir) {

    }

}

export default class Model {
    //info is the json strings in Puzzle.js for different configurations
    constructor(info) {
        this.initialize(info);
        this.info = info;
    }

    initialize(info) {
        let numRows = parseInt(info.numRows);
        let numCols = parseInt(info.numCols);
        
        
        this.puzzle = new Puzzle(numRows, numCols);
        
        for (let s of info.baseSquares) {
            let r = parseInt(s.row);
            let c = parseInt(s.column);
            this.puzzle.squares[r*numRows+c].color = s.color;
        }
        for (let s of info.unusedSquares) {
            let r = parseInt(s.row);
            let c = parseInt(s.column);
            this.puzzle.squares[r*numRows+c].color = "black";
        }
        this.victory = false;
        this.level = parseInt(info.level);

        this.showLabels = false;
    }

    copy() {
        let m = new Model(this.info);
        m.puzzle = this.puzzle.clone();
        m.showLabels = this.showLabels;
        m.victory = this.victory;
        m.level = this.level;
        return m;
    }
}