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

    constructor(row, column, color, count, label) {
        this.row = row;
        this.column = column;
        this.color = color;
        this.count = count;
        this.label = label;
    }

    location() {
        return new Coordinate(this.row, this.column);
    }

    copy() {
        let s = new Square(this.row, this.column, this.color, this.count, this.label)
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

    /**
     * initialize all squares as blank ones
     * @returns 
     */
    init() {
        var allSquares = [];
        for (let row = 0; row < this.rowNum; row++) {
            for (let col = 0; col < this.colNum; col++) {
                allSquares.push(new Square(row, col, "white", 0, ""));
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
        let neighbor = this.getNeighbor(dir);
        if (!neighbor) {return null;}
        if (this.canExtend(dir)) {
            neighbor.color = this.selected.color;
            neighbor.count = this.selected.count + 1;
            this.selected = neighbor;
        }
    }


    /**
     * check if we can extend or not, return true if the 
     * neighbor of the selected piece in the direction
     * has color white 
     * @param {*} dir MoveType
     */
    canExtend(dir) {
        let selected = this.selected;
        if (!selected || selected.color === "black") {return false;}
        let neighbor = this.getNeighbor(dir);
        if (!neighbor) {return false;}
        return neighbor.color === "white" && !(selected.color === "white") ;
    }


    /**
     * get the neighbor square of the selected square in given direction
     * @param {*} dir 
     */
    getNeighbor(dir) {
        let selected = this.selected;
        if (!selected) {return null;}
        if (selected.row === 0 && dir === Up) {return null;}
        if (selected.row === (this.rowNum - 1) && dir === Down) {return null;}
        if (selected.column === (this.colNum - 1) && dir === Right) {return null;}
        if (selected.column === 0 && dir === Left) {return null;}
        let r = selected.row + dir.deltar;
        let c = selected.column + dir.deltac;
        return this.squares[r * this.colNum + c];
    }

    isNeighbor(s1, s2) {
        let rowDiff = Math.abs(s1.row - s2.row);
        let colDiff = Math.abs(s1.column - s2.column);
        //console.log("diff: " + rowDiff + " " + colDiff);
        return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
    }

    /**
     * Get the two base squares of given color
     * For checking victory and see if base color 
     * neighbor is the one with highest count
     * @param {*} color 
     * @returns 
     */
    getBaseSquares(color) {
        let returnArr = [];
        for (let s of this.squares) {
            if (s.color === color && !(s.label === "")) {
                returnArr.push(s);
            }
        }
        return returnArr;
    }

    getColorCount(color, count) {
        for (let s of this.squares) {
            if (s.color === color && s.count === count) {
                return s;
            }
        }
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
            this.puzzle.squares[r*numCols+c].color = s.color;
            this.puzzle.squares[r*numCols+c].label = s.label;
        }
        for (let s of info.unusedSquares) {
            let r = parseInt(s.row);
            let c = parseInt(s.column);
            this.puzzle.squares[r*numCols+c].color = "black";
        }
        this.victory = false;
        this.level = parseInt(info.level);

    }

    copy() {
        let m = new Model(this.info);
        m.puzzle = this.puzzle.clone();
        m.victory = this.victory;
        m.level = this.level;
        return m;
    }

    isLevel(num) {
        return this.level === num;
    }

    isWin() {
        let redCount = [];
        let orangeCount = [];
        let blueCount = [];
        let yellowCount = [];
        const redBases = this.puzzle.getBaseSquares("red");
        const orangeBases = this.puzzle.getBaseSquares("orange");
        const blueBases = this.puzzle.getBaseSquares("blue");
        const yellowBases = this.puzzle.getBaseSquares("yellow");

        let redR = true;
        let blueR = true;
        let orangeR = true;
        let yellowR = true;

        for (let s of this.puzzle.squares) {
            //if there is any squares that is not filled, return false immediatly
            if (s.color === "white") {return false;}

            //skip the base squares
            if (!(s.label === "")) {continue;}

            //save the count for each color square in an array
            if (s.color === "red" && s.label === "") {
                //there should be no duplicate count number
                if (redCount.includes(s.count)) {
                    return false;
                }
                else {
                    redCount.push(s.count);
                }
            }
            else if (s.color === "orange" && s.label === "") {
                if (orangeCount.includes(s.count)) {
                    return false;
                }
                else {
                    orangeCount.push(s.count);
                }
            }
            else if (s.color === "blue" && s.label === "") {
                if (blueCount.includes(s.count)) {
                    return false;
                }
                else {
                    blueCount.push(s.count);
                }
            }
            else if (s.color === "yellow" && s.label === "") {
                if (yellowCount.includes(s.count)) {
                    return false;
                }
                else {
                    yellowCount.push(s.count);
                }
            }
        }
        //for array sorting 
        function compare(a, b) {
            return a-b;
        }

        //if base squares exist on board
        if (redBases.length > 0) {
            redCount.sort(compare);
            //check if the square with highest count is next to base square
            redR = (this.puzzle.isNeighbor(redBases[0], this.puzzle.getColorCount("red", redCount[redCount.length - 1])))
            || (this.puzzle.isNeighbor(redBases[1], this.puzzle.getColorCount("red", redCount[redCount.length - 1])))
        }
        if (orangeBases.length>0) {
            orangeCount.sort(compare);
            orangeR = (this.puzzle.isNeighbor(orangeBases[0], this.puzzle.getColorCount("orange", orangeCount[orangeCount.length - 1])))
            || (this.puzzle.isNeighbor(orangeBases[1], this.puzzle.getColorCount("orange", orangeCount[orangeCount.length - 1])))
        }
        if (blueBases.length > 0) {
            blueCount.sort(compare);
            blueR = (this.puzzle.isNeighbor(blueBases[0], this.puzzle.getColorCount("blue", blueCount[blueCount.length - 1])))
            || (this.puzzle.isNeighbor(blueBases[1], this.puzzle.getColorCount("blue", blueCount[blueCount.length - 1])))
        }
        if (yellowBases.length > 0) {
            yellowCount.sort(compare);
            yellowR = (this.puzzle.isNeighbor(yellowBases[0], this.puzzle.getColorCount("yellow", yellowCount[yellowCount.length - 1])))
            || (this.puzzle.isNeighbor(yellowBases[1], this.puzzle.getColorCount("yellow", yellowCount[yellowCount.length - 1])))
        }

        if (redR && orangeR && blueR && yellowR){
            this.victory = true;
            return true;
        }
        else return false;
            
    }
}